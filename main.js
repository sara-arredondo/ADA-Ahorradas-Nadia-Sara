import funciones from "./funciones.js";

// ---------------------------------------------funciones selectoras de HTML  ---------------------------------------------------

function $(element) {
    return document.querySelector(element)
}

function $$(element) {
    return document.querySelectorAll(element)
}

// --------------------------------------------- selectores de HTML  ---------------------------------------------------

const $balanceButton = $("#balance-button");
const $categoriaButton = $("#categoria-button");
const $reporteButton = $("#reporte-button");
const $agregarOperacionButton = $("#agregrar-operacion-componente-button")
const $ocultarFiltros = $("#ocultar-filtros")

// seleccion de componentes
const $balanceComponente = $("#balance-componente");
const $agregarOperacionComponente = $("#agregar-operacion-componente");
const $categoriaComponente = $("#categoria-componente");
const $formFiltros = $("#form-filtros")
const $reporteComponente = $("#reporte-componente");

const $menuIconMobile = $("#menu-icon-mobile");
const $containerButtonsMenu = $("#container-menu-buttons");

const $formCreate = $("#form-create")
const $buttonCancelarOperacion = $("#button-cancelar-operacion")

const $formEdit = $("#form-edit")
const $inputNameEdit = $("#name-edit")
const $inputMontoEdit = $("#monto-edit")
const $inputTypeEdit = $("#type-edit")
const $inputDateEdit = $("#date-edit")
const $buttonCancelarEdit = $("#button-cancelar-edit")

const $listOperaciones = $("#list-operaciones");


const $inputFilterType = $("#filter-type")
const $inputFilterCategory = $("#filter-category")
const $inputFilterDate = $("#filter-date")
const $inputFilterSort = $("#filter-sort")

const $formCreateCategoria = $("#form-create-categoria");
const $inputCreateCategoria = $("#category")
const $listCategorias = $("#list-categorias")


const $balanceGanancia = $("#balance-ganancia")
const $balanceGasto = $("#balance-gasto")
const $balanceTotal = $("#balance-total")

const $panelSinOperaciones = $("#panel-sin-operaciones")
const $panelConOperaciones = $("#panel-con-operaciones")


// ---------------------------------------------inicio codigo para ocultar menu hamburguesa mobile y cambio de icono  ---------------------------------------------------


const menuIconSrc = "./assets/svg/menu.svg";  // Ícono de menú hamburguesa
const closeIconSrc = "./assets/svg/menu-close.svg"; // Ícono de cerrar

$menuIconMobile.addEventListener("click", () => {
    $containerButtonsMenu.classList.toggle("hidden");

    if ($containerButtonsMenu.classList.contains("hidden")) {
        $menuIconMobile.src = menuIconSrc;  // Muestra el icono de menú
    } else {
        $menuIconMobile.src = closeIconSrc; // Muestra el icono de cerrar
    }
})

// ---------------------------------------------inicio codigo para intercambio de componentes  ---------------------------------------------------

//Boton balance
$balanceButton.addEventListener("click", () => {
    $balanceComponente.classList.remove("hidden");
    $balanceComponente.classList.add("flex"); // Asegura que se muestre correctamente

    $agregarOperacionComponente.classList.add("hidden");
    $categoriaComponente.classList.add("hidden");
    $reporteComponente.classList.add("hidden");
});

//Boton mostrar panel crear operacion dentro del componente balance
$agregarOperacionButton.addEventListener("click", () => {
    $agregarOperacionComponente.classList.remove("hidden");
    $agregarOperacionComponente.classList.add("flex");

    $balanceComponente.classList.add("hidden");
    $categoriaComponente.classList.add("hidden");
    $reporteComponente.classList.add("hidden");
})

//Boton para cancelar la creacion de una nueva operacion redirge a panel balance
$buttonCancelarOperacion.addEventListener("click", (event) => {
    event.preventDefault();

    $agregarOperacionComponente.classList.add("hidden");

    $balanceComponente.classList.remove("hidden");
    $balanceComponente.classList.add("flex");


});

$buttonCancelarEdit.addEventListener("click", (event) => {
    event.preventDefault();

    $agregarOperacionComponente.classList.add("hidden");

    $balanceComponente.classList.remove("hidden");
    $balanceComponente.classList.add("flex");

    $formEdit.classList.remove("flex")
    $formEdit.classList.add("hidden")
})

//Boton categoria
$categoriaButton.addEventListener("click", () => {
    $categoriaComponente.classList.remove("hidden");
    $balanceComponente.classList.add("flex"); // Asegura que se muestre correctamente

    $agregarOperacionComponente.classList.add("hidden");
    $balanceComponente.classList.add("hidden");
    $reporteComponente.classList.add("hidden");
});

//Botonreporte
$reporteButton.addEventListener("click", () => {
    $reporteComponente.classList.remove("hidden");
    $reporteComponente.classList.add("flex");

    $agregarOperacionComponente.classList.add("hidden");
    $balanceComponente.classList.add("hidden");
    $categoriaComponente.classList.add("hidden");
})

$ocultarFiltros.addEventListener("click", (event) => {
    event.preventDefault();
    $formFiltros.classList.toggle("hidden");// Asegura que se esconda correctamente

    if ($formFiltros.classList.contains("hidden")) {
        $ocultarFiltros.textContent = "Mostrar filtros";
    } else {
        $ocultarFiltros.textContent = "Ocultar filtros";
    }

})


// ---------------------------------------------inicio codigo para atrapar datos del formulario de crear y editar ---------------------------------------------------


$formCreate.addEventListener("submit", (event) => {
    event.preventDefault();

    const nuevaOperacion = {
        id: crypto.randomUUID(),
        name: capitalize(event.target[0].value),
        quantity: Number(event.target[1].value),
        type: event.target[2].value,
        category: capitalize(event.target.category.value),
        date: dayjs(event.target[4].value, "YYYY-MM-DD").format("DD-MM-YYYY"),

    }

    funciones.agregarOperacion(nuevaOperacion);
    funciones.datosTodasLasOperaciones = funciones.leerLocalStorage("operaciones");
    pintarDatos(funciones.datosTodasLasOperaciones);

    $agregarOperacionComponente.classList.add("hidden");
    $balanceComponente.classList.remove("hidden");
    $balanceComponente.classList.add("flex");

    $formCreate.reset();
})

$formEdit.addEventListener("submit", (event) => {
    event.preventDefault();

    //const operacionesActualizadas = funciones.leerLocalStorage("operaciones");
    //const operacionBuscada = operacionesActualizadas.find(element => element.id === event.target.id)

    const operacionBuscada = $formEdit.id;

    const nuevosDatos = {
        name: event.target[0].value,
        quantity: Number(event.target[1].value),
        type: event.target[2].value,
        category: event.target[3].value,
        date: dayjs(event.target[4].value, "YYYY-MM-DD").format("DD-MM-YYYY"),
    };

    const datosModificados =  funciones.editarOperacion(operacionBuscada, nuevosDatos);
    pintarDatos(datosModificados);

    $agregarOperacionComponente.classList.add("hidden");
    
    $balanceComponente.classList.remove("hidden");
    $balanceComponente.classList.add("flex");

    $formEdit.classList.remove("flex")
    $formEdit.classList.add("hidden")

}); 

function actualizarBalance(operaciones) {
    let totalGanancia = 0;
    let totalGasto = 0;

    operaciones.forEach(operacion => {
        if (operacion.type === "Ganancia") {
            totalGanancia += operacion.quantity;
        } else if (operacion.type === "Gasto") {
            totalGasto += operacion.quantity;
        }
    });

    let totalBalance = totalGanancia - totalGasto;


    $balanceGanancia.textContent = `+${totalGanancia}`;
    $balanceGasto.textContent = `-${totalGasto}`;
    $balanceTotal.textContent = totalBalance >= 0 ? `+${totalBalance}` : `${totalBalance}`;
}

function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// ---------------------------------------------inicio codigo para filtrar ---------------------------------------------------


$inputFilterType.addEventListener("input", (event) => {

    if (event.target.value !== "Todos") {
        const operacionesFiltradasType = funciones.datosTodasLasOperaciones.filter(element => element.type === event.target.value)
        pintarDatos(operacionesFiltradasType)
    } else {
        pintarDatos(funciones.datosTodasLasOperaciones)
    }

})

$inputFilterDate.addEventListener("change", (event) => {

    const fechaSeleccionada = dayjs(event.target.value, "YYYY-MM-DD");
    console.log("Fecha seleccionada:", fechaSeleccionada.format("DD-MM-YYYY"));

    // Filtra las operaciones que sean de la fecha seleccionada o posteriores
    const operacionesFiltradasDate = funciones.datosTodasLasOperaciones.filter(operacion => {
        const fechaOperacion = dayjs(operacion.date, "DD-MM-YYYY");
        console.log("Comparando operación:", operacion.date, "->", fechaOperacion.format("DD-MM-YYYY"));

        // Retorna true si la fecha de la operación es igual o posterior a la fecha seleccionada
        return fechaOperacion.isSame(fechaSeleccionada) || fechaOperacion.isAfter(fechaSeleccionada);
    });

    // Actualiza el DOM con las operaciones filtradas
    pintarDatos(operacionesFiltradasDate);
});

$inputFilterSort.addEventListener("change", (event) => {

    const sortOperaciones = event.target.value;
    let nuevoArraySort = [...funciones.datosTodasLasOperaciones];

    if (sortOperaciones === "mas-reciente") {
        nuevoArraySort.sort((a, b) => {
            const fechaA = dayjs(a.date, "DD-MM-YYYY");
            const fechaB = dayjs(b.date, "DD-MM-YYYY");
            return fechaB - fechaA;
        });
    } else if (sortOperaciones === "menos-reciente") {
        nuevoArraySort.sort((a, b) => {
            const fechaA = dayjs(a.date, "DD-MM-YYYY");
            const fechaB = dayjs(b.date, "DD-MM-YYYY");
            return fechaA - fechaB;
        });
    } else if (sortOperaciones === "mayor-monto") {
        nuevoArraySort.sort((a, b) => b.quantity - a.quantity)
    } else if (sortOperaciones === "menor-monto") {
        nuevoArraySort.sort((a, b) => a.quantity - b.quantity)
    } else if (sortOperaciones === "ascendente") {
        nuevoArraySort.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortOperaciones === "descendente") {
        nuevoArraySort.sort((a, b) => b.name.localeCompare(a.name))
    }
    pintarDatos(nuevoArraySort);
});


// ---------------------------------------------inicio codigo para crear categorias ---------------------------------------------------

$formCreateCategoria.addEventListener("submit", (event) => {
    event.preventDefault();

    const nuevaCategoria = capitalize($inputCreateCategoria.value);
    
    if (nuevaCategoria !== "") {
        funciones.agregarCategoria(nuevaCategoria, categoriasPredeterminadas);
        
        pintarCategorias();
        actualizarCategoriasFormCreate();
        $inputCreateCategoria.value = ""; 
    }
});

const categoriasPredeterminadas = ["Trabajo", "Educación", "Transporte", "Comida", "Salida"];


function cargarCategorias() {
    const categorias = funciones.iniciarCategorias(categoriasPredeterminadas);
    pintarCategorias(categorias); // ✅ Pinta las categorías en la UI
    actualizarCategoriasFormCreate(categorias); // ✅ Actualiza el select de categorías
}

function pintarCategorias() {

    $listCategorias.innerHTML = "";

    const categoriasGuardadas = funciones.obtenerCategorias(categoriasPredeterminadas);

    $listCategorias.innerHTML = "";

    categoriasGuardadas.forEach((categoria, index) => {
        $listCategorias.innerHTML += `
            <div class="flex justify-between items-center border-b border-azul p-4">
                <span class="border border-azul p-2 rounded-full text-xs">${categoria}</span>
                <div class="flex gap-2">
                    <button class="text-blue-600 hover:underline btn-editar" data-index="${index}">Editar</button>
                    <button class="text-red-600 hover:underline btn-eliminar" data-index="${index}">Eliminar</button>
                </div>
            </div>
        `;
    });

    agregarEventosCategorias();
}

function actualizarCategoriasFormCreate(categorias) {
    $inputFilterCategory.innerHTML = "";
    const $categoryOperation = $("#category-operation"); 
    $categoryOperation.innerHTML = ""; 

    categorias.forEach(categoria => {
        const optionElement = `<option value="${categoria}">${categoria}</option>`;
        $inputFilterCategory.innerHTML += optionElement;
        $categoryOperation.innerHTML += optionElement; 
    });
}

// ---------------------------------------------inicio codigo para pintar datos ---------------------------------------------------

function pintarDatos(arrayOperaciones) {

    $listOperaciones.innerHTML = "";

    actualizarBalance(arrayOperaciones);

    if (arrayOperaciones.length === 0) {
        $panelSinOperaciones.classList.remove("hidden");
        $panelConOperaciones.classList.add("hidden");
        return; // Sale de la función sin pintar ninguna operación
    } else {
        // Si hay operaciones, asegúrate de ocultar el panel
        $panelSinOperaciones.classList.add("hidden");
        $panelConOperaciones.classList.remove("hidden");
    }

    for (const operacion of arrayOperaciones) {

        const colorMonto = operacion.type === "Ganancia" ? "text-green-500" : "text-red-500";
        const signoMonto = operacion.type === "Ganancia" ? "+" : "-"

        $listOperaciones.innerHTML +=

            `<div class="border-b border-azul pb-4 pt-4">           
                <div class="flex flex-col gap-2 lg:flex-row lg:items-center">
                              
                    <div class="flex items-center gap-3 lg:w-2/5 justify-between">
                        <p>${operacion.name}</p>
                        <span class="border border-azul p-2 rounded-full text-xs">${operacion.category}</span>
                    </div>
                        
                    <div class="flex items-center lg:w-3/5 md:justify-between sm:md:justify-between">
                        <span class="hidden w-1/3 lg:flex justify-end ">${operacion.date}</span>
                        <span class="w-1/3  font-bold flex lg:justify-end xl:justify-end md:justify-start ${colorMonto}">${signoMonto}${operacion.quantity}</span>
                        <div class="w-1/3 flex justify-end space-x-2">
                            <button id=${operacion.id} class="button-edit text-blue-600 hover:underline">Editar</button>
                            <button id=${operacion.id} class="button-delete text-blue-600 hover:underline">Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>`
    }


    const $$arrayButtonsEdit = $$(".button-edit")
    const $$arraybuttonsDelete = $$(".button-delete")


    function editarEliminarOperaciones() {
        $$arraybuttonsDelete.forEach(button => {
            button.addEventListener("click", (event) => {
                console.log("holaaaaaa")
                const idEliminar = event.target.id;
                funciones.eliminarOperacion(idEliminar); 
    
                const operacionesActualizadas = funciones.leerLocalStorage("operaciones");
                pintarDatos(operacionesActualizadas);
            });
        });
    
        $$arrayButtonsEdit.forEach(button => {
            button.addEventListener("click", (event)=> {
                console.log("chauuuuuu")
                $balanceComponente.classList.remove("flex")
                $balanceComponente.classList.add("hidden")
                
                $formEdit.classList.remove("hidden")
    
                const operacionesActualizadas = funciones.leerLocalStorage("operaciones");
                const operacionBuscada = operacionesActualizadas.find(element => element.id === event.target.id)

                $inputNameEdit.value = operacionBuscada.name
                $inputMontoEdit.value = operacionBuscada.quantity
                $inputTypeEdit.value = operacionBuscada.type
                $inputDateEdit.value = dayjs(operacionBuscada.date,"DD-MM-YYYY").format("YYYY-MM-DD")
                
                $formEdit.id = operacionBuscada.id
            })
        })
    }

   
    editarEliminarOperaciones()

    actualizarBalance(arrayOperaciones);


}

window.onload = () => {
    funciones.datosTodasLasOperaciones = funciones.leerLocalStorage("operaciones");
    
    pintarDatos(funciones.datosTodasLasOperaciones); 
    pintarCategorias(funciones.obtenerCategorias(categoriasPredeterminadas)); 
    actualizarCategoriasFormCreate(funciones.obtenerCategorias(categoriasPredeterminadas));  
    cargarCategorias()
    
}




