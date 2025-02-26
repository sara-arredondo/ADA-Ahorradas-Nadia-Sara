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

const $menuIconMobile = $("#menu-icon-mobile");
const $containerButtonsMenu = $("#container-menu-buttons");

const $formCreate = $("#form-create")
const $buttonCancelarOperacion = $("#button-cancelar-operacion")

const $listOperaciones = $("#list-operaciones");

const $contenedorFilterCategory = $("#contenedor-filter-categoria")

const $inputFilterType = $("#filter-type")
const $inputFilterCategory = $("#filter-category")
const $inputFilterDate = $("#filter-date")
const $inputFilterSort = $("#filter-sort")

const $balanceGanancia = $("#balance-ganancia")
const $balanceGasto = $("#balance-gasto")
const $balanceTotal = $("#balance-total")

//---selecciones reportes---//
const $reporteComponente = $("#reporte-componente");
//---selecciones

const $$botonEditar = $$(".b")

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
    preventDefault(event);

    $agregarOperacionComponente.classList.add("hidden");

    $balanceComponente.classList.remove("hidden");
    $balanceComponente.classList.add("flex");


});

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


// ---------------------------------------------inicio codigo para atrapar datos del formulario de crear ---------------------------------------------------


$formCreate.addEventListener("submit", (event) => {
    event.preventDefault();

    const nuevaOperacion = {
        id: crypto.randomUUID(),
        name: event.target[0].value,
        quantity: Number(event.target[1].value),
        type: event.target[2].value,
        category: event.target[3].value,
        date: dayjs(event.target[4].value, "YYYY-MM-DD").format("DD-MM-YYYY"),

    }

    funciones.agregarOperacion(nuevaOperacion);
    pintarDatos(funciones.datosTodasLasOperaciones);

    $agregarOperacionComponente.classList.add("hidden");
    $balanceComponente.classList.remove("hidden");
    $balanceComponente.classList.add("flex");

})

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





// ---------------------------------------------inicio codigo para pintar datos ---------------------------------------------------


function pintarDatos(arrayOperaciones) {

    $listOperaciones.innerHTML = "";

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


    actualizarBalance(arrayOperaciones);
}


//-----------------------Actualizar Reporte-----------------------//



//---monto mes mayor gasto----//

const gastosPorMes = funciones.datosTodasLasOperaciones.reduce((acc, operacion) => {
    const mesAnio = dayjs(operacion.date, "YYYY-MM-DD").format("DD-MM-YYYY");
    if (!acc[mesAnio]) {
        acc[mesAnio] = 0;
    }
    acc[mesAnio] += operacion.quantity;

    return acc;
}, {});


const mesMayorGasto = Object.keys(gastosPorMes).reduce((maxMes, mesActual) => {
    if (gastosPorMes[mesActual] > gastosPorMes[maxMes]) {
        return mesActual;
    }
    return maxMes;
});

//----------------------//

const actualizarReportes = () => {
    const datos = funciones.leerLocalStorage("operaciones")
    const todasLasCategorias = datos.filter(elem => elem.type === "category")
    //-- Categoria con mayor ganancia- y su monto-//
    const Ganancia = datos.filter(elem => elem.type === "Ganancia");
    const totalGanancia = Ganancia.reduce((acc, curr) => acc + curr.quantity, 0)
    const categoriasGanancia = Ganancia.reduce((acc, curr) => {
        if (!acc[curr.category]) {
            acc[curr.category] = 0;
        }
        acc[curr.category] += curr.quantity;
        return acc;
    }, {});
    const categoriaMayorGanancia = Object.keys(categoriasGanancia).reduce((maxCategory, currentCategory) => {
        if (categoriasGanancia[currentCategory] > categoriasGanancia[maxCategory]) {
            return currentCategory;
        }
        return maxCategory;
    });

    const montoMayorGanancia = categoriasGanancia[categoriaMayorGanancia];

    //-- mes con mas  Gasto en Reporte-//
    const Gasto = datos.filter(elem => elem.type === "Gasto");

    const totalGasto = Gasto.reduce((acc, curr) => acc + curr.quantity, 0)
    const categoriasGasto = Gasto.reduce((acc, curr) => {
        if (!acc[curr.category]) {
            acc[curr.category] = 0;
        }
        acc[curr.category] += curr.quantity;
        return acc;
    }, {});
    //----categoria con mayor gasto y su monto---//

    const categoriaMayorGasto = Object.keys(categoriasGasto).reduce((maxCategory, currentCategory) => {
        if (categoriasGasto[currentCategory] > categoriasGasto[maxCategory]) {
            return currentCategory;
        }
        return maxCategory;
    });

    const montoMayorGasto = categoriasGasto[categoriaMayorGasto];

    //---balance por categoria--en Reporte//

    const totalBalance = totalGanancia - totalGasto

    const balances = Object.keys(categoriasGanancia).reduce((acc, category) => {

        const ganancia = categoriasGanancia[category] || 0;
        const gasto = categoriasGasto[category] || 0;
        acc[category] = ganancia - gasto;
        return acc;
    }, {});
    const categoriaMayorBalance = Object.keys(balances).reduce((maxCategory, currentCategory) => {
        if (balances[currentCategory] > balances[maxCategory]) {
            return currentCategory; // 
        }
        return maxCategory;
    });

    const mayorBalance = balances[categoriaMayorBalance];

    const gananciasPorMes = Ganancia.reduce((acc, curr) => {
        const mes = dayjs(curr.date, "DD-MM-YYYY").format("MM-YYYY");
        if (!acc[mes]) {
            acc[mes] = 0;
        }
        acc[mes] += curr.quantity;
        return acc;
    }, {});


    // mes con mayor  ganancia- en Reporte--//
    const operaciones = [];
    operaciones.filter(op => op.type === "Ganancia").forEach(op => {
        const mes = dayjs(op.date, "DD-MM-YYYY").format("YYYY-MM");

        if (!gananciasPorMes[mes]) {
            gananciasPorMes[mes] = 0;
        }
        gananciasPorMes[mes] += op.quantity;
    });
    // Mostrar el mes con la mayor ganancia en Reporte---//
    const GANANCIASMESES = {};
    operaciones.filter(op => op.type === "Ganancia").forEach(op => {
        const mes = dayjs(op.date, "DD-MM-YYYY").format("YYYY-MM");
        if (!GANANCIASMESES[mes]) {
            GANANCIASMESES[mes] = 0;
        }

        GANANCIASMESES[mes] += op.quantity;
    });


    const mesConMayorGanancia = Object.entries(GANANCIASMESES).reduce((acc, [mes, ganancia]) => {
        return ganancia > acc.ganancia ? { mes, ganancia } : acc;
    }, { mes: "", ganancia: 0 });


    const mesFormateado = dayjs(mesConMayorGanancia.mes + "-01", "YYYY-MM-DD").format("DD/MM/YYYY");
    //---------Pintar ---Reporte----------------//

    $reporteComponente.innerHTML = `<!-- componente de reportes cuando hay operaciones -->
 <section class="h-fit ">
 <!-- resumen --> 
     <article class="mb-24">

         <!-- título resumen --> 
         <div class="mb-8">
             <h2 class="text-2xl font-bold">
             ${mesMayorGasto}</h2>
         </div>

         <!-- categoria con mayor ganancia -->
         <div class="flex flex-rom justify-between mb-4">
             <p class="w-1/2 font-bold">Categoria con mayor ganancia</p>
             <div class="w-1/4 flex justify-end">
                 <span class="border border-azul p-2 rounded-full text-xs">${categoriaMayorGanancia}</span>
             </div>
             <span class="w-1/4 flex justify-end text-green-500">${montoMayorGanancia}</span>
         </div>
     
         <!-- categoria con mayor gasto -->
         <div class="flex flex-rom justify-between mb-4">
             <p class="w-1/2 font-bold">Categoria con mayor gasto</p>
             <div class="w-1/4 flex justify-end">
                 <span class="border border-azul p-2 rounded-full text-xs">${categoriaMayorGasto}</span>
             </div>         
             <span class="w-1/4 flex justify-end text-red-500">${montoMayorGasto}</span>
         </div>

         <!-- categoria con mayor balance -->
         <div class="flex flex-rom justify-between mb-4">
             <p class="w-1/2 font-bold">Categoria con mayor balance </p>
             <div class="w-1/4 flex justify-end">
                 <span class="border border-azul p-2 rounded-full text-xs">${categoriaMayorBalance}</span>
             </div>  
             <span class="w-1/4 flex justify-end">${mayorBalance}</span>
         </div>
        
         <!-- mes con mayor ganancia -->
         <div class="flex flex-rom justify-between mb-4">
             <p class="w-1/2 font-bold">Mes con mayor ganancia</p>
             <div class="w-1/4 flex justify-end">
                 <span>${mesFormateado}</span>
             </div>
             <span class="w-1/4 flex justify-end"></span>
         </div>
    
         <!-- mes con mayor gasto -->
         <div class="flex flex-rom justify-between mb-4">
             <p class="w-1/2 font-bold">Mes con mayor gasto</p>
             <div class="w-1/4 flex justify-end">
                 <span>DD/MM/AAAA</span>
             </div>
             <span class="w-1/4 flex justify-end">${gastosPorMes[mesMayorGasto]}</span>
         </div>
     
     </article>
     
     <!-- totales por categoria --> 
     <article class="mb-16">

         <!-- título Por categorias --> 
         <div class="mb-8">
             <h2 class="text-2xl font-bold">Totales por categoria</h2>
         </div>

         <!-- títulos columnas -->
         
         <div class="flex flex-row mb-4">
             <span class="w-1/4 flex justify-start font-bold"></span>
             <span class="w-1/4 flex justify-end font-bold ">Ganancias</span>
             <span class="w-1/4 flex justify-end font-bold">Gastos</span>
             <span class="w-1/4 flex justify-end font-bold">Balance</span>
         </div>
        
         <!-- fila para reemplazar -->
         <div class="flex flex-row mb-6">
             <div class="w-1/4 flex justify-start">
                 <span class="border border-azul p-2 rounded-full text-xs">trabajo</span>
             </div>
             <span class="w-1/4 flex justify-end text-green-500">${totalGanancia}</span>
             <span class="w-1/4 flex justify-end text-red-500">${totalGasto}</span>
             <span class="w-1/4 flex justify-end">${totalBalance}</span>
         </div>

     </article>    
 
     <!-- totales por mes --> 
     <article class="mb-16">

         <!-- título Por mes --> 
         <div class="mb-8">
             <h2 class="text-2xl font-bold">Totales por mes</h2>
         </div>

         <!-- títulos columnas -->
         <div class="flex flex-row mb-4">
             <span class="w-1/4 flex justify-start font-bold">Mes</span>
             <span class="w-1/4 flex justify-end font-bold">Ganancias</span>
             <span class="w-1/4 flex justify-end font-bold">Gastos</span>
             <span class="w-1/4 flex justify-end font-bold">Balance</span>
         </div>
        
         <!-- fila para reemplazar -->
         <div class="flex flex-row mb-6">
             <span class="w-1/4 flex justify-start"></span>
             <span class="w-1/4 flex justify-end"></span>
             <span class="w-1/4 flex justify-end">Gastos</span>
             <span class="w-1/4 flex justify-end">Balance</span>
         </div>

     </article>
     
 </section>

</section>`

}

//--- crear o eliminar categorias en Categorias--//

const categorias = [];

const $formCreateCategoria = document.getElementById("formCreateCategoria");
const $categoriaInput = document.getElementById("categoriaInput");
const $listaCategorias = document.getElementById("listaCategorias");

$formCreateCategoria.addEventListener("submit", (event) => {
    event.preventDefault();

    const nuevaCategoria = $categoriaInput.value.trim();
    if (nuevaCategoria !== "") {
        categorias.push(nuevaCategoria);
        $categoriaInput.value = "";
        pintarCategorias();
    } else {
        alert("Por favor, ingresa una categoría válida.");
    }

});

function pintarCategorias() {

    $listaCategorias.innerHTML = "";
    let htmlCategorias = "";
    categorias.forEach((categoria, index) => {
        htmlCategorias += `
            <li class="flex justify-between items-center border p-2 rounded mb-2">
                <span class="text-xl">${categoria}</span>
                <div class="flex gap-4">
                    <a href="#" class="editar" data-index="${index}">Editar</a>
                    <a href="#" class="eliminar" data-index="${index}">Eliminar</a>
                </div>
            </li>
        `;
    });

    $listaCategorias.innerHTML += htmlCategorias;

    agregarEventosCategorias();
}

//---agregar nueva categoria a filtro---//


// Función para editar una categoría en Categorias--//

function agregarEventosCategorias() {

    const botonesEditar = document.querySelectorAll('.editar');
    botonesEditar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const index = event.target.getAttribute('data-index');
            editarCategoria(index);
        });
    });
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (event) => {
            event.preventDefault();
            const index = event.target.getAttribute('data-index');
            eliminarCategoria(index);
        });
    });
}
function editarCategoria(index) {

    const nuevaCategoria = prompt("Editar categoría:", categorias[index]);
    if (nuevaCategoria !== null && nuevaCategoria.trim() !== "") {
        categorias[index] = nuevaCategoria.trim();
        pintarCategorias();
    }
}

// Función para eliminar una categoría//
function eliminarCategoria(index) {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
        categorias.splice(index, 1);
        pintarCategorias();
    }
}
pintarCategorias();



window.onload = () => {
    funciones.datosTodasLasOperaciones = funciones.leerLocalStorage("operaciones");

    pintarDatos(funciones.datosTodasLasOperaciones)
    actualizarReportes()

    pintarCategorias()
    agregarEventosCategorias()

}




