// ---------------------------------------------inicio funcion para leer LS ---------------------------------------------------

let datosTodasLasOperaciones = JSON.parse(localStorage.getItem("operaciones")) || [];

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

function eliminarOperacion(idOperacion) {
    datosTodasLasOperaciones = datosTodasLasOperaciones.filter(operacion => operacion.id !== idOperacion);
    console.log("perroo")
    guardarLocalStorage("operaciones", datosTodasLasOperaciones);
}

// ---------------------------------------------inicio funcion para exportar datos ---------------------------------------------------


export default {
    leerLocalStorage,
    guardarLocalStorage,
    agregarOperacion,
    eliminarOperacion,
    datosTodasLasOperaciones,
}

