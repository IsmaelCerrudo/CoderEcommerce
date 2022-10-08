// const stockProductos = [
//     {id: 1,tipo:'heladera', nombre: 'Heladera', precio: 19999, img: '../img/heladera.png'},
//     {id: 2,tipo:'heladera', nombre: 'Heladera 2', precio: 39999, img: '../img/heladera.png'},
//     {id: 3,tipo:'heladera', nombre: 'Heladera 3', precio: 59999, img: '../img/heladera.png'},
//     {id: 4,tipo:'horno', nombre: 'Horno ', precio: 29999, img: '../img/horno.png'},
//     {id: 5,tipo:'horno', nombre: 'Horno 2', precio: 49999, img: '../img/horno.png'},
//     {id: 6,tipo:'horno', nombre: 'Horno 3', precio:28900, img: '../img/horno.png'},
//     {id: 7,tipo:'tostadora', nombre: 'Tostadora', precio: 35000, img: '../img/tostadora.png'},
//     {id: 8,tipo:'tostadora', nombre: 'Tostadora 2', precio:39000, img: '../img/tostadora.png'},
//     {id: 9,tipo:'tostadora', nombre: 'Tostadora 3', precio:49999, img: '../img/tostadora.png'},
//     {id: 10,tipo:'cafetera', nombre: 'Cafetera', precio: 12000, img: '../img/cafetera.png'},
//     {id: 11,tipo:'cafetera', nombre: 'Cafetera 2', precio:10000, img: '../img/cafetera.png'},
//     {id: 12,tipo:'cafetera', nombre: 'Cafetera 3', precio:31200, img: '../img/cafetera.png'}
// ]


const container = document.querySelector(".container");
const carritoDiv = document.querySelector(".carrito");
const all = document.querySelector('.all');
const tostadoras = document.querySelector('.tostadoras');
const cafeteras = document.querySelector('.cafeteras');
const heladeras = document.querySelector('.heladeras');
const hornos = document.querySelector(".hornos");
const iconCart = document.querySelector('.iconCart');
const totalPagos = document.querySelector('.totalPagos');
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
//Funcion creadora de cards
function crearCards(array) {
    container.innerHTML = ''
    array.forEach(product => {
        container.innerHTML += `<div class="card d-flex flex-column ">
        <h4 class="text-center">${product.nombre}</h4>
        <p class="text-center">$${product.precio}</p>
        <img src="${product.img}" class="card-img m-auto">
        <button class="btn m-auto" id ="btn-agregar${product.id}">Agregar Al Carrito</button>
        </div>`
    })
    agregarFuncionAlBoton(array);
}
//Funcion al apretar cualquier boton se ejecute agregarAlCarrito
function agregarFuncionAlBoton(array) {
    array.forEach(product => {
        document.querySelector(`#btn-agregar${product.id}`).addEventListener('click', () => {
            Toastify({

                text: `Se agrego una unidad de ${product.nombre}`,

                duration: 1000

            }).showToast();
            agregarAlCarrito(product);
            
        })
    })
}
//Funcion agregar al carrito 
function agregarAlCarrito(product) {
    let existe = carrito.some(el => el.id === product.id);
    if (existe === false) {
        product.cantidad = 1;
        carrito.push(product);
    } else {
        let prodFind = carrito.find(el => el.id === product.id);
        prodFind.cantidad++;

        // sumarPrecioCarrito();
    }
    renderCarrito();

}
iconCart.addEventListener('click',()=>{
    carritoDiv.classList.toggle("active");
})



//Hacer Calculo Final con el monto total
function totalPago(carrito){
    let sum = 0;
    for (const producto of carrito) {
        producto.total = producto.precio * producto.cantidad
        sum += producto.total
    }
    totalPagos.innerHTML = `<ul class="filaCarrito d-flex flex-wrap justify-content-evenly mt-4">
    <li class="mt-3">$${sum}</li>
    <button class="btn-pago p-3">Pagar Total</button>
    </ul>`
    if(sum == 0){
        document.querySelector('.btn-pago').addEventListener('click', () => {
            Swal.fire({
                title: 'No selecciono ningun producto!',
                text: 'Agregue algo!',
                icon: 'error',
                confirmButtonText: 'Salir'
              })
        })
    }else{
        document.querySelector('.btn-pago').addEventListener('click', () => {
            Swal.fire({
                title: 'Pago Exitoso!',
                text: 'Gracias por su confianza',
                icon: 'success',
                confirmButtonText: 'Salir'
              })
        })
    }
}

//Recorrer el array del carrito y por cada producto crear las filas del carrito, tambien guardando en el storage los datos
function renderCarrito() {
    carritoDiv.innerHTML = ``;
    carrito.forEach(product => {
        carritoDiv.innerHTML += `<ul class="filaCarrito d-flex flex-wrap justify-content-evenly mt-4">
        <li class="p-3">${product.nombre}</li>
        <li class="p-3">$${product.precio}</li>
        <li class="p-3">Cantidad: ${product.cantidad}</li>
        <button class="btn" id ="btn-eliminar${product.id}">Eliminar</button>
        </ul>`
    })
    localStorage.setItem("carrito", JSON.stringify(carrito))
    funcionEliminar();
    totalPago(carrito);
    
}

function funcionEliminar() {
    carrito.forEach(product => {
        document.querySelector(`#btn-eliminar${product.id}`).addEventListener('click', () => {
            //LLamar a tostify
            Toastify({

                text: `Se elimino con exito el producto ${product.nombre}`,

                duration: 1000

            }).showToast();
            let indice = carrito.findIndex(el => el.id === product.id);
            carrito.splice(indice, 1);
            renderCarrito();
        })
    })
}




//Aplicando fetch para consumir el archivo json

const stockProductos = async () => {
    const response = await fetch('./js/data.json');
    const data = await response.json();
    crearCards(data);
    filtrar(data);
}

//Filtrados
function filtrar(data) {
    hornos.addEventListener('click', () => {
        const filtroHorno = data.filter(el => el.tipo === 'horno');
        crearCards(filtroHorno);
    })
    heladeras.addEventListener('click', () => {
        const filtroHeladeras = data.filter(el => el.tipo === 'heladera');
        crearCards(filtroHeladeras);
    })
    cafeteras.addEventListener('click', () => {
        const filtroCafeteras = data.filter(el => el.tipo === 'cafetera');
        crearCards(filtroCafeteras);
    })
    tostadoras.addEventListener('click', () => {
        const filtroTostadora = data.filter(el => el.tipo === 'tostadora');
        crearCards(filtroTostadora);
    })

    all.addEventListener('click', () => {
        crearCards(data);
    })
}
 


stockProductos();
renderCarrito();
