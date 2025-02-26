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
// ---------------------------------------------inicio funcion para exportar datos ---------------------------------------------------


export default {
    leerLocalStorage,
    guardarLocalStorage,
    agregarOperacion,
    eliminarOperacion,
    editarOperacion,
    filtrarPorTipo,
    datosTodasLasOperaciones,
}

