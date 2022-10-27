//Creación de base de datos

class Person {
    constructor (nombre, apellido, email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    }
}

//Array de People

const People = [];

const idFormulario = document.getElementById("formulario");

idFormulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const email = document.getElementById("email").value;

    const person = new Person(nombre, apellido, email);

    People.push(person);

    localStorage.setItem("Person", JSON.stringify(People));

    idFormulario.reset();

    SaludoDeBienvenida(person)

})

const resultado = document.getElementById("saludoBienvenida"); 

const SaludoDeBienvenida = (person) => {
    let aux = "";
    aux += `<p class="resultado"> ${person.nombre} bienvenido a la mas grande tienda de disfraces de Almagro. </p>`

    resultado.innerHTML = aux;
}


// Creación de producto, Carrito de Compras

class Product {
    constructor(id, nameCostume, price, image) {
        this.id = id;
        this.nameCostume = nameCostume;
        this.price = price;
        this.image = image;
        this.quantity = 1;
    }
    
}

const spiderman = new Product (1, "Spiderman", 1500,"img/imagenDisfrazSpiderman.png");
const superman = new Product (2, "Superman", 1700, "img/imagenDisfrazSuperman.png");
const alien = new Product (3, "Alien", 1300,"img/imagenDisfrazAlien.png");
const pumpkin = new Product (4, "Pumpkin", 1600,"img/imagenDisfrazPumpkin.png");
const oldman = new Product (5, "OldMan", 1800,"img/imagenDisfrazOldman.png");
const barney = new Product (6, "Barney", 1900,"img/imagenDisfrazBarney.png");
const powerRanger = new Product (7, "Power Ranger", 1750,"img/imagenDisfrazPower.png");
const frozen = new Product (8, "Frozen", 1550,"img/imagenDisfrazFrozen.png");

//Array Productos

const Products = [spiderman, superman, alien, pumpkin, oldman, barney, powerRanger, frozen];

//Carrito de compras

let carrito = [];

if(localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));

}

//Modificación del DOM

const containerProducts = document.getElementById("containerProducts");

//Creación de función para mostrar productos

const showProducts = () => {
    Products.forEach((Product) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card imgProducts border-dark">
                <img src="${Product.image}" class="card-img-top imgProducts1" alt="${Product.nameCostume}"></img>
                <div class="card-body">
                <h2 class= "card-title tamanoCard tamanoFuente"> ${Product.nameCostume} </h2>
                <p class= "card-text tamanoFuente"> $ ${Product.price} </p>
                <button class="btn colorBoton btn-dark my-2" id="boton${Product.id}"> Agregar al carrito </button>     
                </div>
            </div>
        `
        containerProducts.appendChild(card);

        const boton = document.getElementById(`boton${Product.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(Product.id);
        })

    })
}

const agregarAlCarrito = (id) => {
    const Product = Products.find((Product) => Product.id === id);
    const productInCarrito = carrito.find((Product) => Product.id === id);
    if(productInCarrito){
        productInCarrito.quantity++;
    }else {
        carrito.push(Product);
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
    calcularTotal();
}

showProducts ();


const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML="";
    carrito.forEach((Product) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card imgProducts border-dark">
                <img src="${Product.image}" class="card-img-top imgProducts1 tamanoFuente" alt="${Product.nameCostume}"></img>
                <div class="card-body">
                <h2 class= "card-title tamanoFuente"> ${Product.nameCostume} </h2>
                <p class= "card-text tamanoFuente"> $ ${Product.price} </p>
                <p class= "card-text tamanoFuente"> Cant. ${Product.quantity} </p>
                <button class="btn colorBoton btn-dark" id="eliminar${Product.id}"> Eliminar del carrito </button>     
                </div>
            </div>
        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${Product.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(Product.id);
        })


    })

    calcularTotal();
}

const eliminarDelCarrito = (id) => {
    const Product = carrito.find((Product) => Product.id === id);
    const indice = carrito.indexOf(Product);
    carrito.splice(indice, 1);
    mostrarCarrito();

    localStorage.setItem("carrito",JSON.stringify(carrito))
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach((Product) => {
        totalCompra += Product.price * Product.quantity;
    })
    total.innerHTML = `Total: $${totalCompra}`;
} 

const oscuro = document.getElementById("oscuro");

oscuro.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
})