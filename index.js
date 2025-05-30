
const argumentos = process.argv.slice(2);

// Método GET
async function listadoDeProductos() {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const productos = await response.json();
    console.log(" ◽ Listado de Productos:",productos);
  } catch (error) {
    console.error(" ◽ Error al obtener los productos:", error);
  }
}

// Método POST
async function crearProducto(prd, precio, categ) {
  const config = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: prd,
      category: categ,
      price: precio,
    }),
  };

  try {
    const response = await fetch('https://fakestoreapi.com/products', config);
    const data = await response.json();
    //console.log(data);
    console.log(" ✅ Producto creado correctamente:", data);
  } catch (error) {
    console.error("Error:", error);
  } 
    
}

//Buscar producto por ID
async function obtenerProductoPorId(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const producto = await response.json();
    //console.log(producto);
    console.log(" ✅ Producto encontrado:",producto);
  } catch (error) {
    console.error(" ◽ Error al obtener el producto");
  }
}

//Metodo DELETE
async function eliminarProductoPorId(id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE'
    });
    const resultado = await response.json();
    console.log(" ❌ Producto eliminado:", resultado);
  } catch (error) {
    console.error(" ◽ Error al eliminar el producto:");
  }
}

//Comandos por consola(process.argv)
switch (argumentos[0]) {
  case 'GET':
    if (argumentos[1] === 'productos') {
      listadoDeProductos();
    } else if (argumentos[1] === 'productoId') {
      const id = argumentos[2];
      obtenerProductoPorId(id);
      
    } else {
      console.log(" ◽ Debe especificar el comando GET productos o GET productoId ID");
    }
    break;

  case 'POST':
    if (argumentos[1] === 'producto') {
      const nombre = argumentos[2];
      const precio = argumentos[3];
      const categoria = argumentos[4];
      crearProducto(nombre, precio, categoria);
    
    } else {
      console.log(" ◽ Debe especificar el comando POST producto \"Nombre\" Precio \"Categoría\"");
    }
    break;

  case 'DELETE':
    if (argumentos[1] === 'producto') {
      const id = argumentos[2];
      eliminarProductoPorId(id);
      
    } else {
      console.log(" ◽ Debe especificar el comando DELETE producto ID");
    }
    break;

}
