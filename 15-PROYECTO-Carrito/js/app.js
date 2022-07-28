//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos =  document.querySelector('#lista-cursos');
let articulosCarritos = [];

cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarritos = []; //Reseteamos el arreglo
        limpiarHTML(); //Eliminamos todo el HTML
    });

}


//Funciones

function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}
function  eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        // Elimina del arreglo de articulos por el data-id
        articulosCarritos = articulosCarritos.filter(curso => curso.id !== cursoId)
        
        carritoHTML();//Iterar sobre el carrito y mostrar su HTML
        
        
    }
}
//Lee el contenido del html al q dimos click y extrae la informacion del curso
function leerDatosCurso(curso){
//  crear un objeto con la informacion de curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO
    const existe = articulosCarritos.some((curso => curso.id === infoCurso.id));
    if(existe){
        // Actualizamos la cantidad
        const cursos =  articulosCarritos.map((curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso;  //Retorna los objetos que no son duplicados 
            }
        }));
        articulosCarritos = [...cursos];

    }else{
            //Agrega elementos al arreglo de carrito
        articulosCarritos = [...articulosCarritos, infoCurso]        
    }
    console.log(articulosCarritos);

    carritoHTML();
}

//Muestra el carrito de compras en HTML
function carritoHTML(){

    //Limpiar el html
    limpiarHTML()
    
    articulosCarritos.forEach( curso => {
        // curso.imagen;
        const { imagen, titulo, precio,cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src='${imagen}' width='100'></img>
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id=${id} >X</a>
            </td>
        
        
        `;
        //Agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })

}

//Elimina los curso del tbody
function limpiarHTML(){
    contenedorCarrito.innerHTML = "";
}

