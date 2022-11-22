//Creación de base de datos

class Person {
    constructor(nombre, apellido, email) {
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
    aux += `<p class="resultado"> ${person.nombre} bienvenido/a a la tienda online de los mejores disfraces importados de EEUU. </p>`

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

const spiderman = new Product(1, "Spiderman", 15, "img/imagenDisfrazSpiderman.png");
const superman = new Product(2, "Superman", 17, "img/imagenDisfrazSuperman.png");
const alien = new Product(3, "Alien", 13, "img/imagenDisfrazAlien.png");
const pumpkin = new Product(4, "Pumpkin", 16, "img/imagenDisfrazPumpkin.png");
const oldman = new Product(5, "OldMan", 18, "img/imagenDisfrazOldman.png");
const barney = new Product(6, "Barney", 19, "img/imagenDisfrazBarney.png");
const powerRanger = new Product(7, "Power Ranger", 17, "img/imagenDisfrazPower.png");
const frozen = new Product(8, "Frozen", 15, "img/imagenDisfrazFrozen.png");

//Array Productos

const Products = [spiderman, superman, alien, pumpkin, oldman, barney, powerRanger, frozen];

//Carrito de compras

let carrito = [];

if (localStorage.getItem("carrito")) {
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
                <p class= "card-text tamanoFuente"> USD ${Product.price} </p>
                <button class="btn colorBoton btn-dark my-2" id="boton${Product.id}"> Agregar al carrito 🎃</button>     
                </div>
            </div>
        `
        containerProducts.appendChild(card);

        const boton = document.getElementById(`boton${Product.id}`);
        boton.addEventListener("click", () => {
            Toastify({
                text: "Disfraz agregado al carrito",
                duration: 5000,
                gravity: "bottom",
                position: "right",
                style:
                {
                    background: "black"
                }
            }).showToast();
            agregarAlCarrito(Product.id);
        })

    })
}

const agregarAlCarrito = (id) => {
    const Product = Products.find((Product) => Product.id === id);
    const productInCarrito = carrito.find((Product) => Product.id === id);
    if (productInCarrito) {
        productInCarrito.quantity++;
    } else {
        carrito.push(Product);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }
    calcularTotal();
}

showProducts();


const contenedorCarrito = document.getElementById("contenedorCarrito");

const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((Product) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card imgProducts border-dark">
                <img src="${Product.image}" class="card-img-top imgProducts1 tamanoFuente" alt="${Product.nameCostume}"></img>
                <div class="card-body">
                <h2 class= "card-title tamanoFuente"> ${Product.nameCostume} </h2>
                <p class= "card-text tamanoFuente"> USD ${Product.price} </p>
                <p class= "card-text tamanoFuente"> Cant. ${Product.quantity} </p>
                <button class="btn colorBoton btn-dark" id="eliminar${Product.id}"> Eliminar del carrito 🗑️</button>     
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

    localStorage.setItem("carrito", JSON.stringify(carrito))
}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    Toastify({
        text: "Carrito Vacio",
        duration: 5000,
        gravity: "bottom",
        position: "left",
        style:
        {
            background: "black"
        }
    }).showToast();
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
        totalCompra += (Product.price * Product.quantity);
    })
    total.innerHTML = `USD: ${totalCompra}
    <button class="btn colorBoton btn-dark" id="botonComprar"> Comprar </button>`;

    const botonComprar = document.getElementById("botonComprar");

    botonComprar.addEventListener("click", () => {
    Swal.fire( {
        title: '¡Gracias por elegirnos!',
        text: 'a continuación realizará el pago correspondiente ',
        imageAlt: 'Custom image',
        confirmButtonText: "Aceptar",
        confirmButtonColor:"black",
        background: "orange",
    })
});
}







const oscuro = document.getElementById("oscuro");

oscuro.addEventListener("click", () => {
    document.body.classList.toggle("oscuro");
})

/** API CRYPTO YA **/

const criptoYa = "https://criptoya.com/api/dolar";

const divDolar = document.getElementById("dolarSol");

setInterval(() => {
    fetch(criptoYa)
        .then(response => response.json())
        .then(({ solidario }) => {
            dolarSol.innerHTML = `
            <h3>Cotización Dolar Tarjeta Solidario:$ ${solidario} </h3>
            `;
            dolarSol= `${solidario};`;
        })
        .catch(error => console.error(error))

}, 5000)