//const para el almacenamiento del contenedor donde se van a crear los articulos de forma dinamica
const contenedor = document.getElementById('productos');
//const donde se guarda el botoon vaciar carrito
const btnVaciar = document.getElementById("limpiar");
//const donde se guarda el contenedor de la tabla de productos en el carrito
const listaCarrito = document.getElementById("lista-carrito");
//const donde se almacena texto de la cantidad de productos en el carrito
const contador = document.getElementById("contador-productos");
//const donde se almacena texto de la cantidad de productos en los headers
const contador1 = document.getElementsByName("contador-productos1");
//Recuperar carrito almacenado en local store
const carritof = JSON.parse(localStorage.getItem('carrito')) || [];
 

// recuperar precio almacenado si no existe comienza en 0
let totalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

//recupera la cantidad total de productos si no existe comienza en 0
let count = parseInt(localStorage.getItem('totalCount')) || 0;



fetch('https://fakestoreapi.com/products')
//fetch('https://dummyjson.com/products')
   

.then((response) => {
    if (!response.ok) {
      throw new Error(`Error de servidor: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Mostrar productos normalmente
   if(contenedor) {
    
data.forEach(producto => {
const productoCard = `
<article class ="card">
<img class ="prod" src="${producto.image}" alt ="${producto.title}">
<h3>${producto.title}</h3>
<p>Precio: $${producto.price}</p>
<button class="agregar-carrito"  data-id='${producto.id}' data-nombre="${producto.title}" data-precio="${producto.price}"><img class="ico" src="../assets/ico/anadir-a-la-cesta.png" alt="logo carrito">Añadir
al carrito</button>
</div>
`;
contenedor.innerHTML += productoCard;
  })
}
cargarCarrito();
  });

// funcion cargar carrito toma un elemento del dom y crea una tabla dentro de la div carrito
//  agregando el producto en seleccionado en la section lista carrito

function cargarCarrito() {
listaCarrito.innerHTML = "";
// crea la tabla  
const tabla = document.createElement('table');
//agraga la clase
tabla.classList.add('name-class-tabla');
//encabezado de tabla
let encabezado =`<thead>
<tr>
<th>Nombre del producto</th>
<th>Precio</th>
<th>Cantidad</th>
</tr>
</thead>
`;
//Inicio de tabla
let cuerpo =`<tbody>`;
//cierre de tabla
cuerpo += `</tbody>`;

for (var i = 0; i < carritof.length; i++) {
    var producto = carritof[i];
    //cuerpo de la tabla
    cuerpo += `
    <tr>
<td>${producto.nombre}</td>
<td>$${producto.precio}</td>
<td>${producto.cantidad}</td>
</tr>
    `
//inserta el encabezado y cuerpo  de la tabla
tabla.innerHTML = encabezado + cuerpo;

//agrgar la tabla al contenedo
listaCarrito.appendChild(tabla);
}
// muestra la cantidad de productos en el carrito
contador.textContent = carritof.length;
//deberia mostrar la cantidad de productos en los headers
contador1.textContent = carritof.length;
}

//funcion agregarProducto crea un objeto  
function agregarProducto(event) {
   if (event.target.tagName === "BUTTON"){
    };
const producto = {
id: event.target.getAttribute("data-id"),
nombre: event.target.getAttribute("data-nombre"),
precio: event.target.getAttribute("data-precio"),
cantidad: 1
};
carritof.push(producto);
localStorage.setItem('carrito', JSON.stringify(carritof));
cargarCarrito();
};

//funcion vaciarCarrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    listaCarrito.remove("tabla");
    contador.textContent = "0";
    contador1.textContent = "0";
    window.location.reload();
    cargarCarrito();
}

//obtiene todo los botones "agregar" y le añade un escuchador de eventos "click" 
const botonesAgregar = document.querySelectorAll("#productos, #arti");
for (var i = 0; i < botonesAgregar.length; i++) {
botonesAgregar[i].addEventListener("click", agregarProducto);
};
// Obtiene el boton Vaciar carrito y agrega un escuchador de click 
// Remueve el carrito del localStore y vuelve a 0 el contador
// llama la funcion cargar carrito

btnVaciar.addEventListener("click", vaciarCarrito);
// contador de visitas a la pagina visto en el carrito almacena en localStore las visitas 
window.addEventListener('load',(event) => {
 let visitas = localStorage.getItem('contadorVisitas');
 if (visitas === null) {
    visitas = 0;
 }else{  
  visitas =  parseInt(visitas) + 1;
 }
 localStorage.setItem('contadorVisitas', visitas);
 document.getElementById('contador').textContent = visitas;

});
document.addEventListener('DOMContentLoaded', function() {
cargarCarrito();
});

