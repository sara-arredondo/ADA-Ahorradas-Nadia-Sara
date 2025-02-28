// ---------------------------------------------inicio funcion para leer LS ---------------------------------------------------

let datosTodasLasOperaciones = JSON.parse(localStorage.getItem("operaciones")) || [];


// panel balance y operacion

function leerLocalStorage(key) {
    const datos = JSON.parse(localStorage.getItem(key)) || [];
    datosTodasLasOperaciones = datos;
    return datos;
}

function guardarLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
}

function agregarOperacion(objetoNuevaOperacion) {
    datosTodasLasOperaciones.push(objetoNuevaOperacion)
    guardarLocalStorage("operaciones", datosTodasLasOperaciones)
}

function filtrarPorTipo(tipo) {
    const datos =leerLocalStorage ("operaciones")
    return datos.filter(elem => elem.type === tipo)
  }

function eliminarOperacion(idOperacion) {
    datosTodasLasOperaciones = datosTodasLasOperaciones.filter(operacion => operacion.id !== idOperacion);
    console.log("perroo")
    guardarLocalStorage("operaciones", datosTodasLasOperaciones);
}


function editarOperacion (idOperacion, nuevosDatos){
    const operacionesActualizadas = leerLocalStorage("operaciones");
    const indiceBuscado = operacionesActualizadas.findIndex((operacion) => operacion.id === idOperacion)
    operacionesActualizadas.splice(indiceBuscado, 1, {...nuevosDatos, id: idOperacion})

    guardarLocalStorage("operaciones", operacionesActualizadas)
    
    datosTodasLasOperaciones = operacionesActualizadas

    return operacionesActualizadas;
}

// panel categoria



function cargarCategorias() {
    const categorias = funciones.iniciarCategorias(categoriasPredeterminadas);
    pintarCategorias(categorias); // ✅ Pinta las categorías en la UI
    actualizarCategoriasFormCreate(categorias); // ✅ Actualiza el select de categorías
}


function obtenerCategorias(categoriasPredeterminadas) {
    let categoriasGuardadas = JSON.parse(localStorage.getItem("categorias")) || [];

    // 📌 Si `localStorage` está vacío, inicializamos con las categorías predeterminadas
    if (categoriasGuardadas.length === 0) {
        categoriasGuardadas = [...categoriasPredeterminadas];
        localStorage.setItem("categorias", JSON.stringify(categoriasGuardadas));
    }

    return categoriasGuardadas;
}

function guardarCategorias(categorias) {
    localStorage.setItem("categorias", JSON.stringify(categorias));
}

function agregarCategoria(nombre, categoriasPredeterminadas) {
    let categorias = obtenerCategorias(categoriasPredeterminadas);
    
    if (!categorias.includes(nombre)) {
        categorias.push(nombre);
        guardarCategorias(categorias);
    }
}

function eliminarCategoria(index, categoriasPredeterminadas) {
    let categorias = obtenerCategorias(categoriasPredeterminadas);
    categorias.splice(index, 1);
    guardarCategorias(categorias);
}

function editarCategoria(index, nuevoNombre, categoriasPredeterminadas) {
    let categorias = obtenerCategorias(categoriasPredeterminadas);
    
    if (!categorias.includes(nuevoNombre)) {
        categorias[index] = nuevoNombre;
        guardarCategorias(categorias);
    }

}

// ---------------------------------------------inicio funcion para exportar datos ---------------------------------------------------


export default {
    leerLocalStorage,
    guardarLocalStorage,
    agregarOperacion,
    eliminarOperacion,
    editarOperacion,
    filtrarPorTipo,
    obtenerCategorias,
    agregarCategoria,
    eliminarCategoria,
    editarCategoria,
    datosTodasLasOperaciones,
}

