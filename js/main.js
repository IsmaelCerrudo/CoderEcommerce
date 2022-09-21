const stockProductos = [
    {id: 1, nombre: 'Heladera', precio: 19999},
    {id: 2, nombre: 'Heladera 2', precio: 39999},
    {id: 3, nombre: 'Heladera 3', precio: 59999},
    {id: 4, nombre: 'Horno ', precio: 29999},
    {id: 5, nombre: 'Horno 2', precio: 49999},
    {id: 6, nombre: 'Horno 3', precio:28900}
]


const container = document.querySelector(".container");
const carritoDiv = document.querySelector(".carrito");
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
//Funcion creadora de cards
function crearCards(){

    stockProductos.forEach(product => {
        container.innerHTML += `<div class="card">
        <h4>${product.nombre}</h4>
        <p>$${product.precio}</p>
        <button class="btn" id ="btn-agregar${product.id}">Agregar Al Carrito</button>
        </div>`
    })
    agregarFuncionAlBoton();
}
//Funcion al apretar cualquier boton se ejecute agregarAlCarrito
function agregarFuncionAlBoton(){
    stockProductos.forEach(product =>{
        document.querySelector(`#btn-agregar${product.id}`).addEventListener('click', ()=>{
            agregarAlCarrito(product);
        }) 
    })
}
//Funcion agregar al carrito 
function agregarAlCarrito(product){
    let existe = carrito.some(el => el.id === product.id);
    if (existe === false){
        product.cantidad = 1;
        carrito.push(product);
    }else{
        let prodFind = carrito.find(el => el.id === product.id);
        prodFind.cantidad++;
        //forma de sumar precio sin el map
        product.precio = product.precio + product.precio;

        // sumarPrecioCarrito();
    }
    console.log(carrito);
    renderCarrito();
    
}
function renderCarrito(){
    carritoDiv.innerHTML = ``;
    carrito.forEach(product =>{
        carritoDiv.innerHTML += `<ul class="filaCarrito d-flex flex-wrap justify-content-evenly mt-4">
        <li class="p-3">${product.nombre}</li>
        <li class="p-3">$${product.precio}</li>
        <li class="p-3">Cantidad: ${product.cantidad}</li>
        <button class="btn" id ="btn-eliminar${product.id}">Eliminar</button>
        </ul>`
    })
    localStorage.setItem("carrito", JSON.stringify(carrito))
    funcionEliminar();
}
 function funcionEliminar() {
     carrito.forEach(product =>{
         document.querySelector(`#btn-eliminar${product.id}`).addEventListener('click', ()=>{
             let indice = carrito.findIndex(el => el.id === product.id);
             carrito.splice(indice, 1);
             renderCarrito();
         })
     })
 }

//forma sumar precio con array nuevo para no modificar el precio original(En proceso)
// function sumarPrecioCarrito(){
//         carrito.map(producto => {
//         producto.precio = producto.precio + producto.precio;
//         console.log(producto.precio)
//     })
// }
renderCarrito();
crearCards();