// Cada producto que vende el super es creado con esta clase
class Producto {
    sku;            // Identificador único del producto
    nombre;         // Su nombre
    categoria;      // Categoría a la que pertenece este producto
    precio;         // Su precio
    stock;          // Cantidad disponible en stock

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        // Si no me definen stock, pongo 10 por default
        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}


// Creo todos los productos que vende mi super
const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);

// Genero un listado de productos. Simulando base de datos
const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon];


// Cada cliente que venga a mi super va a crear un carrito
class Carrito {
    productos;      // Lista de productos agregados
    categorias;     // Lista de las diferentes categorías de los productos en el carrito
    precioTotal;    // Lo que voy a pagar al finalizar mi compra

    // Al crear un carrito, empieza vació
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

    /**
     * función que agrega @{cantidad} de productos con @{sku} al carrito
     */
    async agregarProducto(sku, cantidad) {
        try {
    
            // Busco el producto en la "base de datos"
            const producto = await findProductBySku(sku);
    
            console.log("Producto encontrado", producto);
    
            const productoExistente = this.productos.find((p) => {
                return p.sku === sku;
            });
    
            if (productoExistente) {
                // Aumenta la cantidad del producto existente
                productoExistente.cantidad += cantidad;
            } else {
                // Crear un nuevo producto y lo agrega al carrito
                const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
                this.productos.push(nuevoProducto);
    
                // Verificar si la categoría ya existe en la lista
                const categoriaExistente = this.categorias.find((cat) => cat === producto.categoria);
                if (!categoriaExistente) {
                    this.categorias.push(producto.categoria);
                }
            }
    
            this.precioTotal += producto.precio * cantidad;
        } catch (error) {
            console.log("Error: No se pudo agregar el producto al carrito.");
            console.error(error);
        }
    }
    

    /**
     * Función que elimina @{cantidad} de productos con @{sku} del carrito
     * @param {string} sku - SKU del producto a eliminar
     * @param {number} cantidad - Cantidad del producto a eliminar
     * @returns {Promise} - Promesa que indica el resultado de la eliminación
     */
    async eliminarProducto(sku, cantidad) {
        return new Promise((resolve, reject) => {
            const productoExistente = this.productos.find((p) => p.sku === sku);

            if (!productoExistente) {
                // reject(`El producto ${sku} no existe en el carrito.`);
                return reject(`El producto ${sku} no existe en el carrito.`);
            }

            if (cantidad < productoExistente.cantidad) {
                productoExistente.cantidad -= cantidad;
            } else {
                // Eliminar el producto del carrito
                const index = this.productos.indexOf(productoExistente);
                this.productos.splice(index, 1);
                // Eliminar la categoría si no hay más productos de esa categoría en el carrito
                const productosMismaCategoria = this.productos.filter((p) => p.categoria === productoExistente.categoria);
                if (productosMismaCategoria.length === 0) {
                    const categoriaIndex = this.categorias.indexOf(productoExistente.categoria);
                    this.categorias.splice(categoriaIndex, 1);
                }
            }

            this.precioTotal -= productoExistente.precio * cantidad;

            resolve(`Se eliminaron ${cantidad} ${sku} del carrito.`);
        });
    }
}

// Cada producto que se agrega al carrito es creado con esta clase
class ProductoEnCarrito {
    sku;       // Identificador único del producto
    nombre;    // Su nombre
    cantidad;  // Cantidad de este producto en el carrito

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

// Función que busca un producto por su sku en "la base de datos"
function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1500);
    });
}

const carrito = new Carrito();
await carrito.agregarProducto('XX92LKq', 4);
await carrito.agregarProducto('UI999TY', 3);
await carrito.eliminarProducto('XX92LKI', 1)
    .then((resultado) => {
        console.log("hola");
        console.log(resultado);
    })
    .catch((error) => {
        console.log("hola2");
        console.error(error);
    });
console.log(carrito.productos);
console.log(carrito.categorias);