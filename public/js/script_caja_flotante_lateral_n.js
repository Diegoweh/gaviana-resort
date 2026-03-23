var datosHotel = datosHotel || (function () {
    var _args = {};
    return {
        init: function (Args) {
            _args = Args;

        },
        valor: function (i) {
            return _args[i];
        }
    };


}());

// Variable to prevent double initialization
var _cajaFlotanteInicializada = false;

function inicializarCajaFlotante() {
    // Prevent running twice
    if (_cajaFlotanteInicializada) return;
    _cajaFlotanteInicializada = true;

    // Check if datosHotel has been configured
    if (!datosHotel.valor(0)) {
        // Not yet configured, reset flag and exit - will be called again
        _cajaFlotanteInicializada = false;
        return;
    }


    function crearElemento(elementType, styles, appendTo) {
        const element = document.createElement(elementType);
        if (styles) {
            for (let style in styles) {
                element[style] = styles[style];
            }
        }
        if (appendTo) {
            appendTo.appendChild(element);
        } else {
            document.body.appendChild(element);
        }
        return element;
    }

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function isMobileDevice() {
        return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth <= 800;
    }

    function rowColForm(enableRow = false, enableCol = false, enableForm = false, styles = {}, appendTo) {
        let lastElement = appendTo;
        let lastReturn;

        if (enableRow) {
            const elementRow = crearElemento('div', styles.row || { 'classList': 'booking-rd2k-row' }, lastElement);
            lastElement = elementRow;
            lastReturn = elementRow;
        }

        if (enableCol) {
            const elementCol = crearElemento('div', styles.col || { 'classList': 'booking-rd2k-col-md-12' }, lastElement);
            lastElement = elementCol;
            lastReturn = elementCol;
        }

        if (enableForm) {
            const elementForm = crearElemento('div', styles.form || { 'classList': 'booking-rd2k-form-group' }, lastElement);
            lastReturn = elementForm;
        }

        return lastReturn;
    }


    function loadFiles(fileUrls) {
        let promises = [];

        for (let url of fileUrls) {
            if (url.endsWith('.js')) {
                let promise = new Promise((resolve, reject) => {
                    let script = document.createElement('script');
                    script.src = url;
                    script.onload = () => {
                        resolve();
                    };
                    script.onerror = () => {
                        reject(new Error(`Failed to load script file: ${url}`));
                    };
                    document.head.appendChild(script);
                });
                promises.push(promise);
            }
            else if (url.endsWith('.css')) {
                let promise = new Promise((resolve, reject) => {
                    let link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = url;
                    link.onload = () => {
                        resolve();
                    };
                    link.onerror = () => {
                        reject(new Error(`Failed to load stylesheet file: ${url}`));
                    };
                    document.head.appendChild(link);
                });
                promises.push(promise);
            }
        }

        return Promise.all(promises);
    }
    function crearStyle(cssRules) {
        var nuevaRegla = cssRules;
        var styleElement = document.getElementById('custom-style-element');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.setAttribute('id', 'custom-style-element');
            document.head.appendChild(styleElement);
        } else {
            nuevaRegla = styleElement.innerHTML + cssRules;
        }
        styleElement.innerHTML = nuevaRegla;
    }
    function crearStyle2(cssRules) {
        var nuevaRegla = '';
        var styleElement = document.getElementById('custom-style-element');

        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.setAttribute('id', 'custom-style-element');
            document.head.appendChild(styleElement);
        } else {
            nuevaRegla = styleElement.innerHTML;
        }

        for (var selector in cssRules) {
            if (cssRules.hasOwnProperty(selector)) {
                nuevaRegla += selector + " { " + cssRules[selector] + " }\n";
            }
        }

        styleElement.innerHTML = nuevaRegla;
    }
    function existeProp(ObjValidar, propValidar) {
        let valorDefecto = '';
        if (ObjValidar.hasOwnProperty(propValidar)) {
            if (Object.keys(ObjValidar[propValidar]).length !== 0) {
                valorDefecto = ObjValidar[propValidar][0];
            }
        }
        return valorDefecto;
    }
    function pasarReglas(nombreR, reglas) {
        if (reglas != '' && nombreR != '') {
            crearStyle('' + nombreR + ' { ' + reglas + ' }');
        }
    }


    function labelInput(elementInput, extraInput = { valor: 0, inicio: 0 }, enableLabel, stylesLabel, stylesInput, appendTo) {
        if (enableLabel == 1) {
            const elementLabel = crearElemento('label', stylesLabel, appendTo);
        }

        const elementInputC = crearElemento(elementInput, stylesInput, appendTo);

        if (extraInput.valor != 0) {
            if (enableLabel == 2) {
                const elementOptionI = document.createElement('option');
                elementOptionI.value = '';
                if (lng == 'es') {
                    var textE = 'Seleccionar edad';
                } else {
                    var textE = 'Select age';
                }
                elementOptionI.selected = true;
                elementOptionI.text = textE;
                elementInputC.appendChild(elementOptionI);
            }
            for (let index = extraInput.inicio; index <= extraInput.valor; index++) {
                const elementOption = document.createElement('option');
                elementOption.value = index;
                elementOption.text = index;
                elementInputC.appendChild(elementOption);
            }
        }
    }

    function cambiarClase(className, text) {
        var items = document.getElementsByClassName(className);
        for (var i = 0; i < items.length; i++) {
            items[i].textContent = text;
        }
    }

    function contarPersonas(tipoCajaV = 'lateral') {
        var cantidadPersonas = 0;
        var numero_habitaciones = parseInt(document.getElementById("n_" + tipoCajaV + "_habitaciones").value);
        for (let index = 1; index <= numero_habitaciones; index++) {
            cantidadPersonas += parseInt(document.getElementById("adulto_" + tipoCajaV + "_hab_" + index).value);
            cantidadPersonas += parseInt(document.getElementById("menor_" + tipoCajaV + "_hab_" + index).value);
        }
        document.getElementById("cantidad_" + tipoCajaV + "_personas").value = cantidadPersonas;
    }

    function contarAdultos(tipoCajaV = 'lateral') {
        var cantidadPersonas = 0;
        var numero_habitaciones = parseInt(document.getElementById("n_" + tipoCajaV + "_habitaciones").value);
        for (let index = 1; index <= numero_habitaciones; index++) {
            cantidadPersonas += parseInt(document.getElementById("adulto_" + tipoCajaV + "_hab_" + index).value);
        }
        if (cantidadPersonas == 0) {
            return false;
        }
        return true;
    }
    function seleccionSelect(id, valueToSelect) {
        let element = document.getElementById(id);
        element.value = valueToSelect;
    }
    function muestra_habitaciones(numero_habitaciones, tipoCajaV = 'lateral') {
        var max_habitaciones = habsMaximaHotel;

        for (i = 1; i <= max_habitaciones; i++) {
            if (document.getElementById("hab_" + tipoCajaV + "_" + i).classList.contains('ocultar') && i <= numero_habitaciones) {
                seleccionSelect("adulto_" + tipoCajaV + "_hab_" + i, 1);
                seleccionSelect("menor_" + tipoCajaV + "_hab_" + i, 0);
                document.getElementById("hab_" + tipoCajaV + "_" + i).classList.remove('ocultar');

            } else {
                if (i > numero_habitaciones) {
                    document.getElementById("hab_" + tipoCajaV + "_" + i).classList.add('ocultar');
                    document.getElementById("div_" + tipoCajaV + "_menor_hab_" + i).classList.add('ocultar');
                }
            }
        }
        esconde_titulo(numero_habitaciones, tipoCajaV);
        esconde_titulo2(numero_habitaciones, tipoCajaV);
    }

    function esVisible(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
    }
    function muestra_menores(id_habitacion, num_menores, tipoCajaV = 'lateral') {
        var max_menores = menoresMaximoHotel;

        if (!esVisible(document.getElementById("div_" + tipoCajaV + "_menor_hab_" + id_habitacion + ""))) {
            //   console.log('Muestra div Men');
            try {
                document.querySelector("#div_" + tipoCajaV + "_menor_hab_" + id_habitacion).classList.remove('ocultar');
            } catch (e) { }
        }
        if (!esVisible(document.querySelector(".menores_" + tipoCajaV + "_titulo_" + id_habitacion + ""))) {
            //   console.log('Muestra titulo Men');
            document.querySelector(".menores_" + tipoCajaV + "_titulo_" + id_habitacion).style.display = "block";
            try {
                document.querySelector(".menores_" + tipoCajaV + "_titulo_" + id_habitacion).classList.remove('ocultar');
            } catch (e) { }
        }

        for (i = 1; i <= max_menores; i++) {
            if (!esVisible(document.querySelector("#div" + tipoCajaV + "habitacion-" + id_habitacion + "-menor-" + i + "")) && i <= num_menores) {
                seleccionSelect("habitacion-" + tipoCajaV + "-" + id_habitacion + "-menor-" + i, '');
                try {
                    document.querySelector("#div" + tipoCajaV + "habitacion-" + id_habitacion + "-menor-" + i).classList.remove('ocultar');
                } catch (e) { }
            } else {
                if (i > num_menores) {
                    document.querySelector("#div" + tipoCajaV + "habitacion-" + id_habitacion + "-menor-" + i).classList.add('ocultar');
                }
            }
        }
    }

    function esconde_menores(id_habitacion, tipoCajaV = 'lateral') {
        var max_menores = parseInt(menoresMaximoHotel, 10);
        var num_habitaciones = parseInt(adultosMaximoHotel, 10);
        document.querySelector("#div_" + tipoCajaV + "_menor_hab_" + id_habitacion).classList.add('ocultar');

        for (i = 1; i <= max_menores; i++) {
            seleccionSelect("habitacion-" + tipoCajaV + "-" + id_habitacion + "-menor-" + i, '');
        }

        esconde_titulo(num_habitaciones, tipoCajaV);
        esconde_titulo2(num_habitaciones, tipoCajaV);
    }



    function esconde_tituloxhab(id_habitacion, tipoCajaV = 'lateral') {
        document.querySelectorAll(".menores_" + tipoCajaV + "_titulo_" + id_habitacion).forEach(function (element) {
            element.classList.add('ocultar');
        });
    }

    function esconde_titulo(num_habitaciones, tipoCajaV = 'lateral') {
        var retorno = true;
        for (i = 1; i <= num_habitaciones; i++) {
            var temp = parseInt(document.querySelector("#menor_" + tipoCajaV + "_hab_" + i).value, 10);
            if (temp != 0) {
                retorno = false
            }
        }
        if (retorno) {
            document.querySelectorAll(".menores" + tipoCajaV + "_titulo").forEach(function (element) {
                element.classList.add('ocultar');
            });
        }
    }

    function esconde_titulo2(num_habitaciones, tipoCajaV = 'lateral') {
        var hab = habsMaximaHotel;
        var retorno = true;
        for (i = 1; i <= hab; i++) {
            var temp = parseInt(document.querySelector("#menor_" + tipoCajaV + "_hab_" + i).value, 10);
            if (i > num_habitaciones) {
                document.querySelectorAll(".menores" + tipoCajaV + "_titulo_" + i).forEach(function (element) {
                    element.classList.add('ocultar');
                });
            }
            if (temp != 0) {
                retorno = false
            }
        }
        if (retorno) {
            document.querySelectorAll(".menores" + tipoCajaV + "_titulo").forEach(function (element) {
                element.classList.add('ocultar');
            });
        }
    }





    function validarEdades(tipoCajaV = 'lateral') {
        var pasarValidacion = true;
        for (let index = 1; index <= document.getElementById('n_' + tipoCajaV + '_habitaciones').value; index++) {
            var max_menores = document.getElementById('menor_' + tipoCajaV + '_hab_' + index).value;
            for (i = 1; i <= max_menores; i++) {
                if (document.getElementById('habitacion-' + tipoCajaV + '-' + index + '-menor-' + i).value == '') {
                    pasarValidacion = false;
                }
            }
        }
        return pasarValidacion;
    }

    function validarFormulario(tipoCajaV = 'lateral') {
        var mensajeError = '';
        var errorReportado = 0;
        if (validarEdades(tipoCajaV) == false) {
            mensajeError = mensajeError + mensajeMenores + '\n';
            errorReportado = 1;

        }
        if (contarAdultos(tipoCajaV) == false) {
            mensajeError = mensajeError + mensajeAdultos + '\n';
            errorReportado = 1;
        }


        if (document.getElementById('fechas_' + tipoCajaV).value == '') {
            mensajeError = mensajeError + mensajeFechas + '\n';
            errorReportado = 1;
        }

        if (errorReportado == 1) {
            alert(mensajeError)
            return false;
        }
        return true;
    }

    function armarCajaReservacion(USource, UCampaign, UMedium) {
        let promises = [];
        let promise = new Promise((resolve, reject) => {
            try {

                if (datosHotel.valor(4)) {
                    if (datosHotel.valor(4) == 1) {
                        const contenedorMobil = crearElemento('div', { 'classList': 'reservar-mobil' });
                        const rowMobil = crearElemento('div', { 'classList': 'booking-rd2k-row' }, contenedorMobil);
                        const sideAMobil = crearElemento('div', { 'classList': 'booking-rd2k-col-sm-6 booking-rd2k-col-6 fondoa hotel-nombre', 'textContent': hotelNombre }, rowMobil);
                        const sideBMobil = crearElemento('div', { 'classList': 'booking-rd2k-col-sm-6 booking-rd2k-col-6 fondob' }, rowMobil);
                        const botonMobil = crearElemento('a', { 'classList': 'reservar-btn activar-menu-mobil', 'title': etiquetaBoton, 'text': etiquetaBoton }, sideBMobil);
                    }
                } else {
                    const contenedorMobil = crearElemento('div', { 'classList': 'reservar-mobil' });
                    const rowMobil = crearElemento('div', { 'classList': 'booking-rd2k-row' }, contenedorMobil);
                    const sideAMobil = crearElemento('div', { 'classList': 'booking-rd2k-col-sm-6 booking-rd2k-col-6 fondoa hotel-nombre', 'textContent': hotelNombre }, rowMobil);
                    const sideBMobil = crearElemento('div', { 'classList': 'booking-rd2k-col-sm-6 booking-rd2k-col-6 fondob' }, rowMobil);
                    const botonMobil = crearElemento('a', { 'classList': 'reservar-btn activar-menu-mobil', 'title': etiquetaBoton, 'text': etiquetaBoton }, sideBMobil);
                }


                var hoy = new Date();


                var siguiente = new Date(hoy);
                siguiente.setDate(hoy.getDate() + 1);


                var diaActual = ("0" + hoy.getDate()).slice(-2);
                var mesActual = ("0" + (hoy.getMonth() + 1)).slice(-2);
                var anioActual = hoy.getFullYear();

                var diaSeguiente = ("0" + siguiente.getDate()).slice(-2);
                var mesSiguiente = ("0" + (siguiente.getMonth() + 1)).slice(-2);
                var anioSiguiente = siguiente.getFullYear();


                var diaActualF = diaActual + "/" + mesActual + "/" + anioActual;
                var diaSiguienteF = diaSeguiente + "/" + mesSiguiente + "/" + anioSiguiente;


                var fechasFinal = diaActualF + "-" + diaSiguienteF;

                var Llegada = getParameterByName('llegada');
                var Salida = getParameterByName('salida');
                if ((Llegada !== '') && (Salida !== '')) {
                    fechasFinal = Llegada + "-" + Salida;
                }


                const contenedorCarritoLateral = crearElemento('div', { 'id': 'contenedor-carrito-lateral' });
                const carritoLateral = crearElemento('div', { 'id': 'carrito-lateral' }, contenedorCarritoLateral);

                const rowTitulo = crearElemento('div', { 'classList': 'booking-rd2k-row booking-rd2k-mt-3 booking-rd2k-text-center', 'style': 'margin-left:0px;margin-right:0px;' }, carritoLateral);
                const colTitulo1 = crearElemento('div', { 'classList': 'booking-rd2k-col-xl-10 booking-rd2k-col-lg-10 booking-rd2k-col-md-10 booking-rd2k-col-sm-10 booking-rd2k-col-10', 'style': 'padding: 0px' }, rowTitulo);
                const titulo = crearElemento('h3', { 'classList': 'titulo-reservacion' }, colTitulo1);
                const colTitulo2 = crearElemento('div', { 'classList': 'booking-rd2k-col-xl-2 booking-rd2k-col-lg-2 booking-rd2k-col-md-2 booking-rd2k-col-sm-2 booking-rd2k-col-2', 'style': 'padding: 0px' }, rowTitulo);
                const botonCerrar = crearElemento('button', { 'classList': 'cerrar-cart booking-rd2k-btn booking-rd2k-btn-danger ', 'style': 'border-radius: 22px;' }, colTitulo2);
                botonCerrar.textContent = 'x';

                const contenedorCajaReserva = crearElemento('div', { 'id': 'btnres', 'classList': 'caja-reserva' }, carritoLateral);
                const contCajareserva = crearElemento('div', { 'classList': 'container-fluid' }, contenedorCajaReserva);
                const formReservaLateral = crearElemento('form', { 'id': 'env_reserva_lateral', 'method': 'POST' }, contCajareserva);
                const rowReserva = crearElemento('div', { 'classList': 'booking-rd2k-row' }, formReservaLateral);
                const colReserva = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12', 'id': 'booking_lateral_col_principal' }, rowReserva);

                const reservaPersonas = crearElemento('input', { autocomplete: 'off', 'type': 'hidden', 'id': 'cantidad_lateral_personas' }, rowReserva);
                const reservaLenguaje = crearElemento('input', { autocomplete: 'off', 'type': 'hidden', 'name': 'lng', 'id': 'lenguaje_lateral' }, rowReserva);
                if (UCampaign !== '') {
                    const cajaFlotanteFormColUC = crearElemento('input', { 'type': 'hidden', 'id': 'utm_campaign_lateral', 'name': 'utm_campaign', 'value': UCampaign }, rowReserva);
                }
                if (USource !== '') {
                    const cajaFlotanteFormCol = crearElemento('input', { 'type': 'hidden', 'id': 'utm_source_lateral', 'name': 'utm_source', 'value': USource }, rowReserva);
                }
                if (UMedium !== '') {
                    const cajaFlotanteFormColUC = crearElemento('input', { 'type': 'hidden', 'id': 'utm_medium_lateral', 'name': 'utm_medium', 'value': UMedium }, rowReserva);
                }
                const reservaHotel = crearElemento('input', { 'type': 'hidden', 'name': 'hotel_id', 'value': datosHotel.valor(0) }, rowReserva);

                const contFechasLateral = rowColForm(1, 1, 1, {}, colReserva);
                labelInput('input', {}, 1, { 'id': 'etiqueta_lateral_fecha', 'for': 'fechas_lateral' }, { autocomplete: 'off', 'classList': 'booking-rd2k-form-control', 'id': 'fechas_lateral', 'name': 'fechas', 'type': 'text', 'value': fechasFinal }, contFechasLateral);

                const contPromoCodeLateral = rowColForm(1, 1, 1, {}, colReserva);
                labelInput('input', {}, 1, { 'id': 'etiqueta_lateral_codigo', 'for': '' }, { autocomplete: 'off', 'classList': 'booking-rd2k-form-control', 'name': 'promocode', 'id': 'promocode_lateral', 'type': 'text' }, contPromoCodeLateral);

                const contHabsLateral = rowColForm(1, 1, 1, {}, colReserva);
                labelInput('select', { valor: habsMaximaHotel, inicio: 1 }, 1, { 'id': 'etiqueta_lateral_hab', 'for': 'n_lateral_habitaciones' }, { 'id': 'n_lateral_habitaciones', 'classList': 'booking-rd2k-form-control', 'name': 'n_habitaciones' }, contHabsLateral);

                var habclase = '';
                for (let index = 1; index <= habsMaximaHotel; index++) {

                    if (index > 1) {
                        var habclase = 'ocultar';
                    }
                    const divContenedorHab = crearElemento('div', { 'id': 'hab_lateral_' + index + '', 'classList': habclase }, colReserva);
                    const rowHab = crearElemento('div', { 'classList': 'booking-rd2k-row' }, divContenedorHab);
                    const colHab = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12' }, rowHab);

                    const contLabelHabTitulo = rowColForm(1, 0, 0, {}, colHab);
                    const colHabTitulo = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12 booking-rd2k-text-center txt-blanco' }, contLabelHabTitulo);

                    const labelHabTitulo = crearElemento('label', { 'id': 'etiqueta_lateral_habitacion_' + index + '', classList: 'labels-carrito  titulos-habitaciones' }, colHabTitulo);

                    const rowPersonas = crearElemento('div', { 'classList': 'booking-rd2k-row' }, colHab);
                    const contHabsAdulto = rowColForm(0, 1, 1, { col: { 'classList': 'booking-rd2k-col-md-6' } }, rowPersonas);

                    labelInput('select', { valor: adultosMaximoHotel, inicio: 0 }, 1, { 'classList': 'etiqueta_lateral_adultos labels-carrito', 'for': 'adulto_lateral_hab_' + index + '' }, { 'id': 'adulto_lateral_hab_' + index + '', 'classList': 'booking-rd2k-form-control inputs-carrito num_adultos_habitacion', 'name': 'adulto_hab_' + index + '' }, contHabsAdulto);
                    const contHabsMenores = rowColForm(0, 1, 1, { col: { 'classList': 'booking-rd2k-col-md-6' } }, rowPersonas);
                    labelInput('select', { valor: menoresMaximoHotel, inicio: 0 }, 1, { 'classList': 'etiqueta_lateral_menores labels-carrito', 'for': 'menor_lateral_hab_' + index + '' }, { 'id': 'menor_lateral_hab_' + index + '', 'classList': 'booking-rd2k-form-control inputs-carrito num_menores', 'name': 'menor_hab_' + index + '' }, contHabsMenores);

                    // 
                    const rowMenores = rowColForm(1, 1, 0, { row: { 'classList': 'booking-rd2k-row' } }, colHab);

                    const contTituloMenores = rowColForm(1, 1, 0, { row: { 'classList': 'booking-rd2k-row labels-carrito booking-rd2k-text-center menores_lateral_titulo_' + index + ' ocultar', style: 'margin-bottom: 10px;' }, col: { 'classList': 'booking-rd2k-col-md-12 text-center txt-blanco' } }, rowMenores);
                    const tituloMenores = crearElemento('label', {}, contTituloMenores);
                    const tituloMenoresInt = crearElemento('span', { 'classList': 'etiqueta_lateral_edades labels-carrito ', 'textContent': etiquetaEdades + ' ' + index }, tituloMenores);

                    const contHabEdadesMenores = crearElemento('div', { 'id': 'div_lateral_menor_hab_' + index + '', 'classList': 'booking-rd2k-row  hab-menore' }, contTituloMenores);
                    for (let index2 = 1; index2 <= menoresMaximoHotel; index2++) {
                        const contEdadesMenores = crearElemento('div', { 'id': 'divlateralhabitacion-' + index + '-menor-' + index2 + '', 'classList': 'booking-rd2k-col-md-4 ocultar' }, contHabEdadesMenores);
                        labelInput('select', { valor: 17, inicio: 0 }, 2, {}, { 'id': 'habitacion-lateral-' + index + '-menor-' + index2 + '', 'classList': 'booking-rd2k-form-control inputs-carrito edades_menores', 'name': 'habitacion-' + index + '-menor-' + index2 + '' }, contEdadesMenores);
                    }

                }
                const contBotonLateralReserva = rowColForm(1, 1, 0, { row: { 'classList': 'booking-rd2k-row booking-rd2k-mt-3 booking-rd2k-text-center ', 'style': 'margin-left:0px;margin-right:0px;' }, col: { 'classList': 'booking-rd2k-col-xl-12 booking-rd2k-col-lg-12 booking-rd2k-col-md-12 booking-rd2k-col-sm-12 booking-rd2k-col-12 contenedor-boton-lateral' } }, carritoLateral);
                const botonLateralReserva = crearElemento('button', { 'id': 'buscar_reserva_lateral', 'type': 'button', 'classList': 'booking-rd2k-btn booking-rd2k-btn-info', 'disable': true, 'style': 'width:100%;' }, contBotonLateralReserva);

                const spanBotonLateralReserva = crearElemento('span', { 'id': 'label_buscar_reserva_lateral' }, botonLateralReserva);
                const imgBotonLateralReserva = crearElemento('img', { 'alt': 'loading', 'classList': '', 'id': 'loading_lateral', 'src': '' + urlBooking + '/img/loading.gif' }, botonLateralReserva);





                var estadoCaja = 1;
                if (localStorage.getItem('estadoCaja') !== null) {
                    estadoCaja = JSON.parse(localStorage.getItem('estadoCaja'));;
                } else {
                    localStorage.setItem('estadoCaja', estadoCaja);
                }



                var formLabel = existeProp(estilosCss, 'form-label');
                var buscadorCaja = existeProp(estilosCss, 'buscador-caja');
                var labelTituloHab = existeProp(estilosCss, 'label-titulo-habitacion');
                var contLabelTituloHab = existeProp(estilosCss, 'contenedor-label-hab-titulo');
                var buscarResCajaBoton = existeProp(estilosCss, 'buscar_reserva_cajaflotante');
                var buscarResCajaBotonHover = existeProp(estilosCss, 'buscar_reserva_cajaflotante:hover');
                var listadoHabEdades = existeProp(estilosCss, 'listado-habitaciones-edades');
                // console.log(buscarResCajaBoton);
                pasarReglas('#buscar_reserva_cajaflotante', buscarResCajaBoton);
                pasarReglas('#buscar_reserva_cajaflotante:hover', buscarResCajaBotonHover);
                // buscador-caja
                // console.log('Color Listado:'+listadoHabEdades);
                var claseCajaPrincipal = '';
                var claseBotonAbrir = 'ocultar';
                if (estadoCaja == 0) {
                    claseCajaPrincipal = 'ocultar';
                }
                if (posicion == 'normal') {
                    var cajaReservacion = crearElemento('div', { 'id': 'caja_reservacion', 'classList': 'caja-reservacion ' + claseCajaPrincipal });
                } else {

                    if (anclaPosicion == '') {
                        var cajaReservacion = crearElemento('div', { 'id': 'caja_reservacion', 'style': stylePosicion, 'classList': 'caja-reservacion ' + claseCajaPrincipal });
                    } else {
                        var anclaCaja = document.querySelector(anclaPosicion);

                        var cajaReservacion = crearElemento('div', { 'id': 'caja_reservacion', 'style': stylePosicion, 'classList': 'caja-reservacion ' + claseCajaPrincipal }, anclaCaja);
                    }

                }


                const contenedorCajaFlotante = crearElemento('div', { 'classList': 'booking-rd2k-container buscador-caja', 'style': buscadorCaja }, cajaReservacion);
                // 
                const cajaFlotante = crearElemento('div', { 'classList': 'booking-rd2k-row caja-reserva-book' }, contenedorCajaFlotante);

                const colCajaFlotante = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12 booking-rd2k-col-no-padding' }, cajaFlotante);
                const bookingForm = crearElemento('div', { 'classList': 'booking-form-r2k' }, colCajaFlotante);

                const cajaFlotanteForm = crearElemento('form', { 'id': 'env_reserva_cajaflotante', 'method': 'Get', 'action': urlEnvio }, bookingForm);

                const reservaHotelCaja = crearElemento('input', { autocomplete: 'off', 'type': 'hidden', 'name': 'hotel_id', 'value': datosHotel.valor(0) }, cajaFlotanteForm);

                const cajaFlotanteFormRow = crearElemento('div', { 'classList': 'booking-rd2k-row' }, cajaFlotanteForm);
                const cajaFlotanteFormCol1 = rowColForm(0, 1, 1, { row: {}, col: { 'classList': 'booking-rd2k-col-md-4' }, form: { 'classList': 'booking-rd2k-form-group' } }, cajaFlotanteFormRow);
                const cajaFlotanteFormCol1LI = labelInput('input', {}, 1, { 'classList': 'booking-rd2k-form-label txt-blanco', 'id': 'etiqueta_cajaflotante_fecha', 'textContent': etiquetaFecha, 'style': formLabel }, { autocomplete: 'off', 'classList': 'booking-rd2k-form-control cambios_cajaflotante', 'type': 'text', 'id': 'fechas_cajaflotante', 'name': 'fechas', 'required': '', 'value': fechasFinal }, cajaFlotanteFormCol1);

                const cajaFlotanteFormCol2 = rowColForm(0, 1, 1, { row: {}, col: { 'classList': 'booking-rd2k-col-md-2 booking-rd2k-col-sm-2 col-2' }, form: { 'classList': 'booking-rd2k-form-group' } }, cajaFlotanteFormRow);
                const cajaFlotanteFormCol2LI = labelInput('select', { 'valor': 4, 'inicio': 1 }, 1, { 'classList': 'booking-rd2k-form-label txt-blanco', 'id': 'etiqueta_cajaflotante_hab', 'textContent': etiquetaHab, 'style': formLabel }, { 'classList': 'booking-rd2k-form-control cambios_cajaflotante select-personas', 'id': 'n_cajaflotante_habitaciones', 'name': 'n_habitaciones' }, cajaFlotanteFormCol2);

                const cajaFlotanteFormCol3 = rowColForm(0, 1, 1, { row: {}, col: { 'classList': 'booking-rd2k-col-md-2 col-boton-res' }, form: { 'classList': 'booking-rd2k-form-group' } }, cajaFlotanteFormRow);
                const cajaFlotanteFormCol3LI = labelInput('input', {}, 1, { 'classList': 'booking-rd2k-form-label txt-blanco', 'id': 'etiqueta_cajaflotante_personas', 'textContent': etiquetaPersonas, 'style': formLabel }, { autocomplete: 'off', 'classList': 'booking-rd2k-form-control cambios_cajaflotante select-personas txt-blanco', 'type': 'text', 'id': 'cantidad_cajaflotante_personas', readOnly: 'true', autocomplete: 'off', 'value': '1', 'style': 'background-color: transparent;text-align: center;' }, cajaFlotanteFormCol3);

                const cajaFlotanteFormCol4 = rowColForm(0, 1, 1, { row: {}, col: { 'classList': 'booking-rd2k-col-md-2' }, form: { 'classList': 'booking-rd2k-form-group' } }, cajaFlotanteFormRow);
                const cajaFlotanteFormCol4LI = labelInput('input', {}, 1, { 'classList': 'booking-rd2k-form-label txt-blanco', 'id': 'etiqueta_cajaflotante_codigo', 'textContent': etiquetaCodigo, 'style': formLabel }, { autocomplete: 'off', 'classList': 'booking-rd2k-form-control cambios_cajaflotante', 'type': 'text', 'name': 'promocode', 'id': 'promocode_cajaflotante' }, cajaFlotanteFormCol4);


                const cajaFlotanteFormCol5 = crearElemento('div', { 'classList': ' contenedor-boton-flotante booking-rd2k-col-md-2 booking-rd2k-col-sm-2 booking-rd2k-col-2 booking-rd2k-col-boton-res' }, cajaFlotanteFormRow);
                // const cajaFlotanteCerrar = crearElemento('button', { 'id': 'cerrar_cajaflotante_principal', 'type': 'button', 'classList': 'booking-rd2k-btn booking-rd2k-btn-danger cerrar-cart', 'style': 'position: absolute;width: 40px;right: 0px;padding:0px;', 'textContent': 'X' }, cajaFlotanteFormRow);

                var extraClass = '';
                if (clasesActivar.length !== 0) {
                    // extraClass = ' no-mostrar';
                }

                if (estadoCaja == 0) {
                    claseBotonAbrir = '';
                }

                if (posicion == 'normal') {
                    var cajaFlotanteAbrir = crearElemento('button', { 'id': 'abrir_cajaflotante_principal', 'type': 'button', 'classList': 'booking-rd2k-btn booking-rd2k-btn-info ' + extraClass + ' ' + claseBotonAbrir, 'style': 'position: fixed;top: calc(100% - 86px);z-index: 9999!important;left: 50%;transform: translateX(-50%);', 'textContent': etiquetaBoton });
                } else {
                    var cajaFlotanteAbrir = crearElemento('button', { 'id': 'abrir_cajaflotante_principal', 'type': 'button', 'classList': 'booking-rd2k-btn booking-rd2k-btn-info ' + extraClass + ' ' + claseBotonAbrir, 'style': 'position: absolute;top: calc(100% - 200px);z-index: 9999!important;left: 50%;transform: translateX(-50%);', 'textContent': etiquetaBoton });
                }


                const cajaFlotanteFormCol5I = crearElemento('input', { 'type': 'hidden', 'id': 'lenguaje_cajaflotante', 'name': 'lng', 'value': lng }, cajaFlotanteFormCol5);

                if (UCampaign !== '') {
                    const cajaFlotanteFormColUC = crearElemento('input', { 'type': 'hidden', 'id': 'utm_campaign_cajaflotante', 'name': 'utm_campaign', 'value': UCampaign }, cajaFlotanteFormCol5);
                }
                if (USource !== '') {
                    const cajaFlotanteFormCol = crearElemento('input', { 'type': 'hidden', 'id': 'utm_source_cajaflotante', 'name': 'utm_source', 'value': USource }, cajaFlotanteFormCol5);
                }
                if (UMedium !== '') {
                    const cajaFlotanteFormColUC = crearElemento('input', { 'type': 'hidden', 'id': 'utm_medium_cajaflotante', 'name': 'utm_medium', 'value': UMedium }, cajaFlotanteFormCol5);
                }

                const cajaFlotanteFormCol5B = crearElemento('button', { 'classList': 'booking-rd2k-btn btn-buscar-reserva', 'id': 'buscar_reserva_cajaflotante', 'type': 'button' }, cajaFlotanteFormCol5);
                const cajaFlotanteFormCol5BSpan = crearElemento('span', { 'id': 'label_buscar_reserva_cajaflotante', 'classList': 'label-buscar-reserva', 'textContent': etiquetaBoton }, cajaFlotanteFormCol5B);
                const cajaFlotanteFormCol5BSpanImg = crearElemento('img', { 'classList': 'img-load ocultar', 'id': 'loading_cajaflotante', 'src': '' + urlBooking + '/img/loading.gif', 'alt': 'loading' }, cajaFlotanteFormCol5B);



                const listadoHabitaciones = crearElemento('div', { 'id': 'listado_habitaciones', 'classList': 'listado-habitaciones-edades ocultar', 'style': listadoHabEdades }, cajaFlotanteForm);
                const listadoHabitacionesRow = crearElemento('div', { 'style': 'border-top: 1px solid #fff;margin: 0 0px;padding: 10px 0 0px;', 'classList': 'booking-rd2k-row' }, listadoHabitaciones);
                const listadoHabitacionesDivCerrar = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12 booking-rd2k-col-no-padding' }, listadoHabitacionesRow);
                const listadoHabitacionesDivCerrarB = crearElemento('button', { 'type': 'button', 'id': 'cerrar_cajaflotante', 'classList': 'cerrar-cart booking-rd2k-mb-1 booking-rd2k-btn booking-rd2k-btn-danger ocultar', 'textContent': 'x' }, listadoHabitacionesDivCerrar);

                const listadoHabitacionesCont = crearElemento('div', { 'classList': 'booking-rd2k-container' }, listadoHabitaciones);
                const listadoHabitacionesContR = crearElemento('div', { 'classList': 'booking-rd2k-row' }, listadoHabitacionesCont);
                const listadoHabitacionesContRCol = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12 booking-rd2k-col-no-padding' }, listadoHabitacionesContR);


                var habclase = 'ocultar';
                for (let index = 1; index <= habsMaximaHotel; index++) {

                    if (index > 1) {
                        var habclase = 'ocultar';
                    }
                    const divContenedorHabCF = crearElemento('div', { 'id': 'hab_cajaflotante_' + index + '', 'classList': 'booking-rd2k-row ' + habclase }, listadoHabitacionesContRCol);
                    const colHab = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12 booking-rd2k-col-no-padding' }, divContenedorHabCF);
                    const rowHab = crearElemento('div', { 'classList': 'booking-rd2k-row booking-rd2k-justify-content-md-center' }, colHab);

                    const colHabTitulo = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12 booking-rd2k-col-no-padding contenedor-label-hab-titulo centrado-direcciones booking-rd2k-text-center', 'style': contLabelTituloHab }, rowHab);
                    const rowHabTitulo = rowColForm(1, 1, 0, { col: { 'classList': 'booking-rd2k-col-md-12' }, row: { 'classList': 'booking-rd2k-row booking-rd2k-justify-content-md-center' } }, colHabTitulo);
                    const labelHabTitulo = crearElemento('label', { 'textContent': etiquetaHabSingular + ' ' + index, 'id': 'etiqueta_cajaflotante_habitacion_' + index + '', 'classList': 'booking-rd2k-form-label txt-blanco label-titulo-habitacion', 'style': labelTituloHab }, rowHabTitulo);

                    const rowHabPersonas = crearElemento('div', { 'classList': 'booking-rd2k-row booking-rd2k-justify-content-md-center' }, colHab);
                    const contHabsAdulto = rowColForm(0, 1, 1, { col: { 'classList': 'booking-rd2k-col-md-6 booking-rd2k-col-sm-6 booking-rd2k-col-6' }, form: { 'classList': 'booking-rd2k-form-group booking-rd2k-text-center' } }, rowHabPersonas);

                    labelInput('select', { valor: adultosMaximoHotel, inicio: 1 }, 1, { 'classList': 'txt-blanco booking-rd2k-form-label etiqueta_cajaflotante_adultos ', 'for': 'adulto_cajaflotante_hab_' + index + '', 'textContent': etiquetaAdultos, 'style': formLabel }, { 'id': 'adulto_cajaflotante_hab_' + index + '', 'classList': 'booking-rd2k-form-control select-personas num_adultos_habitacion', 'name': 'adulto_hab_' + index + '' }, contHabsAdulto);
                    const contHabsMenores = rowColForm(0, 1, 1, { col: { 'classList': 'booking-rd2k-col-md-6 booking-rd2k-col-sm-6 booking-rd2k-col-6' }, form: { 'classList': ' booking-rd2k-form-group text-center' } }, rowHabPersonas);
                    labelInput('select', { valor: menoresMaximoHotel, inicio: 0 }, 1, { 'classList': 'txt-blanco booking-rd2k-form-label etiqueta_cajaflotante_menores', 'for': 'menor_cajaflotante_hab_' + index + '', 'textContent': etiquetaMenores, 'style': formLabel }, { 'id': 'menor_cajaflotante_hab_' + index + '', 'classList': 'booking-rd2k-form-control select-personas num_menores', 'name': 'menor_hab_' + index + '' }, contHabsMenores);


                    const rowHabMenores = crearElemento('div', { 'classList': 'booking-rd2k-row booking-rd2k-justify-content-md-center' }, colHab);
                    const colHabMenores = crearElemento('div', { 'classList': 'booking-rd2k-col-md-12 booking-rd2k-col-no-padding booking-rd2k-mb-3' }, rowHabMenores);
                    const contTituloMenores = rowColForm(1, 1, 0, { row: { 'classList': 'booking-rd2k-row booking-rd2k-text-center menores_cajaflotante_titulo_' + index + ' ocultar' }, col: { 'classList': 'booking-rd2k-col-md-12 booking-rd2k-col-no-padding booking-rd2k-text-center' } }, colHabMenores);
                    const tituloMenores = crearElemento('label', { 'classList': 'form-label txt-blanco etiqueta_cajaflotante_edades text-center', 'textContent': etiquetaEdades + ' ' + index, 'style': formLabel }, contTituloMenores);


                    const contHabEdadesMenores = crearElemento('div', { 'id': 'div_cajaflotante_menor_hab_' + index + '', 'classList': 'booking-rd2k-row booking-rd2k-justify-content-md-center hab-menores ocultar' }, contTituloMenores);
                    for (let index2 = 1; index2 <= menoresMaximoHotel; index2++) {
                        const contEdadesMenores = crearElemento('div', { 'id': 'divcajaflotantehabitacion-' + index + '-menor-' + index2 + '', 'classList': 'booking-rd2k-col-md-4 ocultar' }, contHabEdadesMenores);
                        labelInput('select', { valor: 17, inicio: 0 }, 2, {}, { 'id': 'habitacion-cajaflotante-' + index + '-menor-' + index2 + '', 'classList': 'booking-rd2k-form-control edades_menores', 'name': 'habitacion-' + index + '-menor-' + index2 + '' }, contEdadesMenores);
                    }

                }
                resolve();
            } catch (error) {
                reject(new Error('Error al crear caja reserva:' + error));
            }
        });
        promises.push(promise);

        return Promise.all(promises);
    }


    var buscarApi = 0;
    var posicion = 'normal';
    var stylePosicion = '';
    var anclaPosicion = '';
    var partesScript = null;
    var inicializacion = 0;
    var variablesInicializacion = null;
    if (datosHotel.valor(3)) {
        if (datosHotel.valor(3).hasOwnProperty('posicion')) {
            posicion = 'extra';
            // var tempPos = datosHotel.valor(3).split('@-@');
            if (datosHotel.valor(3).posicion.hasOwnProperty('relacion')) {
                anclaPosicion = datosHotel.valor(3).posicion.relacion;
            }
            stylePosicion = datosHotel.valor(3).posicion.style;
        }
        if (datosHotel.valor(3).hasOwnProperty('partes')) {
            partesScript = datosHotel.valor(3).partes;
        }
        if (datosHotel.valor(3).hasOwnProperty('inicializacion')) {
            inicializacion = datosHotel.valor(3).inicializacion;
            if (datosHotel.valor(3).inicializacion == 1) {
                if (datosHotel.valor(3).hasOwnProperty('inicializacion_vars')) {
                    variablesInicializacion = datosHotel.valor(3).inicializacion_vars;
                }
            }
        }
    }
    var lng = datosHotel.valor(2);
    var clasesActivar = datosHotel.valor(1);


    clasesActivar.push('.activar-menu-mobil');
    if (variablesInicializacion == null) {
        buscarApi = 1;
    }
    if (partesScript != null) {
        crearStyle2(partesScript);
    }

    var tipoCaja = 'lateral';
    var urlBooking = 'https://booking.red2000.mx';
    var urlBookingCss = 'https://nueva.gaviana.com';
    if (datosHotel.valor(3)) {
        if (datosHotel.valor(3).hasOwnProperty('subdominio')) {
            urlBooking = 'https://' + datosHotel.valor(3).subdominio;
        }
    }


    var habsMaximaHotel = 0;
    var adultosMaximoHotel = 0;
    var menoresMaximoHotel = 0;

    var hotelNombre = '';
    var diferenteMobil = 1;

    var etiquetaFecha = '';
    var etiquetaFechaL = '';
    var etiquetaFechaS = '';
    var etiquetaCodigo = '';
    var etiquetaHab = '';
    var etiquetaHabSingular = '';
    var etiquetaHabAbreviado = '';
    var etiquetaAdultos = '';
    var etiquetaMenores = '';
    var etiquetaEdades = '';
    var etiquetaEdad = '';
    var etiquetaBoton = '';
    var etiquetaPersonas = '';
    var tipoCajaMobil = '';
    var mensajeMenores = '';
    var mensajeAdultos = '';
    var mensajeFechas = '';



    var estilosCss = {};

    if (buscarApi == 0) {

        if (!(variablesInicializacion.hasOwnProperty('limite_habitaciones'))) {
            variablesInicializacion.limite_habitaciones = 4;
        }
        urlBooking = 'https://booking.red2000.mx';
        if (datosHotel.valor(3)) {
            if (datosHotel.valor(3).hasOwnProperty('subdominio')) {
                urlBooking = 'https://' + datosHotel.valor(3).subdominio;
            }
        }


        habsMaximaHotel = variablesInicializacion.limite_habitaciones;
        adultosMaximoHotel = variablesInicializacion.limite_adultos;
        menoresMaximoHotel = variablesInicializacion.limite_menores;

        hotelNombre = variablesInicializacion.hotel_nombre;
        etiquetaFecha = variablesInicializacion.texto.etiqueta_fecha;
        etiquetaFechaL = variablesInicializacion.texto.etiqueta_llegada;
        etiquetaFechaS = variablesInicializacion.texto.etiqueta_salida;
        etiquetaCodigo = variablesInicializacion.texto.etiqueta_codigo;
        etiquetaHab = variablesInicializacion.texto.etiqueta_habitacion;
        etiquetaHabSingular = variablesInicializacion.texto.eitqueta_hab_singular;
        etiquetaHabAbreviado = variablesInicializacion.texto.etiqueta_hab_abreviado;
        etiquetaAdultos = variablesInicializacion.texto.etiqueta_adultos;
        etiquetaMenores = variablesInicializacion.texto.etiqueta_menores;
        etiquetaEdades = variablesInicializacion.texto.etiqueta_edades;
        etiquetaEdad = variablesInicializacion.texto.etiqueta_edad;
        etiquetaBoton = variablesInicializacion.texto.etiqueta_boton;
        etiquetaPersonas = variablesInicializacion.texto.etiqueta_personas;

        mensajeMenores = variablesInicializacion.texto.mensaje_menores;
        mensajeAdultos = variablesInicializacion.texto.mensaje_adultos;
        mensajeFechas = variablesInicializacion.texto.mensaje_fechas;

        subdominio = variablesInicializacion.subdominio;



        if (subdominio != '') {
            urlEnvio = subdominio + '/listahab?normal=1';
        } else {
            urlEnvio = urlBooking + '/listahab?normal=1';
        }

        var USource = getParameterByName('utm_source');
        var UCampaign = getParameterByName('utm_campaign');
        var UMedium = getParameterByName('utm_medium');
        var PromoCode = getParameterByName('promocode');
        var AbrirMenu = getParameterByName('abrir_menu');

        var stylosP = '';
        var bootStrap = '';
        // https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css
        if (datosHotel.valor(0) == 3) {
            stylosP = urlBooking + '/caja_booking/css/promociones/styles_promo_gaviana.css';
        } else if (datosHotel.valor(0) == 5) {
            stylosP = urlBooking + '/caja_booking/css/hotel/style_lindamar.css';
        }
        if (datosHotel.valor(3).hasOwnProperty('bootStrap')) {
            if (datosHotel.valor(3).bootStrap == 0) {
                bootStrap = '';
            }
        }

        loadFiles([
            'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.umd.min.js',
             '/caja_booking/styles_booking_n.css',
            '' + bootStrap + '',
            '' + stylosP + '',
        ]).then(() => {
            armarCajaReservacion(USource, UCampaign, UMedium).then(() => {


                const today = new Date();
                const yyyy = today.getFullYear();
                let mm = today.getMonth() + 1; // Months start at 0!
                let dd = today.getDate();

                if (dd < 10) dd = '0' + dd;
                if (mm < 10) mm = '0' + mm;

                const formattedToday = dd + '/' + mm + '/' + yyyy;

                var lngCalendar = 'en-US';
                if (lng == 'es') {
                    var lngCalendar = 'es-MX';
                }
                const picker = new easepick.create({
                    element: document.getElementById('fechas_lateral'),
                    css: [
                        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
                    ],
                    lang: lngCalendar,
                    format: 'DD/MM/YYYY',
                    grid: 1,
                    zIndex: 1000000,
                    calendars: 1,
                    plugins: ['RangePlugin', 'LockPlugin'],
                    RangePlugin: {
                        delimiter: '-',
                    },
                    LockPlugin: {
                        minDate: formattedToday,
                    }

                });
                const picker2 = new easepick.create({
                    element: document.getElementById('fechas_cajaflotante'),
                    css: [
                        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
                    ],
                    lang: lngCalendar,
                    format: 'DD/MM/YYYY',
                    grid: 1,
                    zIndex: 1000000,
                    calendars: 1,
                    plugins: ['RangePlugin', 'LockPlugin'],
                    RangePlugin: {
                        delimiter: '-',
                    },
                    LockPlugin: {
                        minDate: formattedToday,
                    }

                });

                document.querySelectorAll('.cambios_cajaflotante').forEach(function (element) {

                    element.addEventListener('click', function (e) {

                        if (document.querySelector('#hab_cajaflotante_1').classList.contains('ocultar')) {
                            document.querySelector('#listado_habitaciones').classList.remove('ocultar');
                            if (posicion == 'normal') {
                                document.querySelector('#caja_reservacion').classList.add('activar-habitaciones');
                            }

                            muestra_habitaciones(document.querySelector('#n_cajaflotante_habitaciones').value, 'cajaflotante');
                            document.querySelector('#cerrar_cajaflotante').classList.remove('ocultar');
                            document.getElementById('listado_habitaciones').scrollIntoView(false);
                            // document.getElementById('env_reserva'+tipoCaja+'').scrollIntoView(false);
                        }
                        // $('#hab_'+tipoCaja+'1').removeClass('ocultar');
                        // alert($('#adulto'+tipoCaja+'hab_1').val());
                        // $('#adulto'+tipoCaja+'hab_1').focus();
                        // document.getElementById('#adulto'+tipoCaja+'hab'+$('#n_'+tipoCaja+'_habitaciones').val()+'').scrollIntoView(false);
                    });
                });


/*
                document.querySelector('#cerrar_cajaflotante_principal').addEventListener('click', function () {
                    // document.querySelector('#caja_reservacion').classList.add('ocultar');
                    document.querySelector('#abrir_cajaflotante_principal').classList.remove('ocultar');
                    estadoCaja = 0;
                    localStorage.setItem('estadoCaja', estadoCaja);
                });
*/


                clasesActivar.push('#abrir_cajaflotante_principal');
                var toggles2 = document.querySelectorAll(clasesActivar.join(","));

                toggles2.forEach(function (toggle) {
                    toggle.addEventListener("click", function (e) {
                        e.preventDefault();
                        // document.querySelector('#caja_reservacion').classList.remove('ocultar');
                        // document.getElementById('caja_reservacion').scrollIntoView(false);
                        document.querySelector('#abrir_cajaflotante_principal').classList.add('ocultar');
                        estadoCaja = 1;
                        localStorage.setItem('estadoCaja', estadoCaja);
                    });
                });



                // document.querySelector('#abrir_cajaflotante_principal').addEventListener('click', function() {
                //     document.querySelector('#caja_reservacion').classList.remove('ocultar');
                //     document.querySelector('#abrir_cajaflotante_principal').classList.add('ocultar');
                // });


                document.querySelector('#cerrar_cajaflotante').addEventListener('click', function () {
                    document.querySelector('#hab_cajaflotante_1').classList.add('ocultar');
                    document.querySelector('#hab_cajaflotante_2').classList.add('ocultar');
                    document.querySelector('#hab_cajaflotante_3').classList.add('ocultar');
                    document.querySelector('#hab_cajaflotante_4').classList.add('ocultar');
                    document.querySelector('#cerrar_cajaflotante').classList.add('ocultar');
                    document.querySelector('#listado_habitaciones').classList.add('ocultar');
                    document.querySelector('#caja_reservacion').classList.remove('activar-habitaciones');
                });

                // document.querySelector('#mostrar_cajaflotante').addEventListener('click', function() {
                //     document.querySelector('.buscador-caja').classList.remove('ocultar');
                //     document.querySelector('#mostrar_cajaflotante').classList.add('ocultar');
                // });



                if (PromoCode !== '') {
                    document.getElementById('promocode_' + tipoCaja).value = PromoCode;
                    document.getElementById('promocode_cajaflotante').value = PromoCode;

                }


                document.getElementById('etiqueta_' + tipoCaja + '_fecha').textContent = etiquetaFecha;
                document.getElementById('etiqueta_' + tipoCaja + '_codigo').textContent = etiquetaCodigo;
                document.getElementById('etiqueta_' + tipoCaja + '_hab').textContent = etiquetaHab;
                for (let index = 1; index <= habsMaximaHotel; index++) {
                    document.getElementById('etiqueta_' + tipoCaja + '_habitacion_' + index).textContent = etiquetaHabSingular + ' ' + index;

                }



                cambiarClase('etiqueta_' + tipoCaja + '_adultos', etiquetaAdultos);
                cambiarClase('etiqueta_' + tipoCaja + '_menores', etiquetaMenores);
                // cambiarClase('etiqueta_' + tipoCaja + '_edades', etiquetaEdades);
                document.getElementById('label_buscar_reserva_' + tipoCaja).textContent = etiquetaBoton;
                document.getElementById('buscar_reserva_' + tipoCaja).disabled = false;
                document.getElementById('loading_' + tipoCaja).classList.add('ocultar');


                document.getElementById("caja_reservacion").addEventListener("click", function () {
                    tipoCaja = 'cajaflotante';

                    document.getElementById("n_" + tipoCaja + "_habitaciones").addEventListener("change", function () {
                        document.getElementById("n_" + tipoCaja + "_habitaciones").value = this.value;
                        muestra_habitaciones(this.value, tipoCaja);
                        contarPersonas(tipoCaja);
                        // console.log(tipoCaja);
                    });

                    document.querySelectorAll(".num_adultos_habitacion").forEach(function (element) {
                        element.addEventListener("change", function () {
                            contarPersonas(tipoCaja);
                        });
                    });

                    document.querySelectorAll(".num_menores").forEach(function (element) {
                        element.addEventListener("change", function () {
                            var num_menores = this.value;
                            var comp_id_hab = this.id.split("_");
                            var id_hab = parseInt(comp_id_hab[3], 10);
                            if (num_menores != 0) {
                                // console.log(id_hab, num_menores);
                                muestra_menores(id_hab, num_menores, tipoCaja);
                            } else {
                                esconde_menores(id_hab, tipoCaja);
                                esconde_tituloxhab(id_hab, tipoCaja);
                            }
                            contarPersonas(tipoCaja);
                        });
                    });

                });

                document.getElementById("carrito-lateral").addEventListener("click", function () {
                    tipoCaja = 'lateral';

                    document.getElementById("n_" + tipoCaja + "_habitaciones").addEventListener("change", function () {
                        document.getElementById("n_" + tipoCaja + "_habitaciones").value = this.value;
                        muestra_habitaciones(this.value, tipoCaja);
                        contarPersonas(tipoCaja);
                        // console.log(tipoCaja);
                    });

                    document.querySelectorAll(".num_adultos_habitacion").forEach(function (element) {
                        element.addEventListener("change", function () {
                            contarPersonas(tipoCaja);
                        });
                    });

                    document.querySelectorAll(".num_menores").forEach(function (element) {
                        element.addEventListener("change", function () {
                            var num_menores = this.value;
                            var comp_id_hab = this.id.split("_");
                            var id_hab = parseInt(comp_id_hab[3], 10);
                            if (num_menores != 0) {
                                // console.log(id_hab, num_menores);
                                muestra_menores(id_hab, num_menores, tipoCaja);
                            } else {
                                esconde_menores(id_hab, tipoCaja);
                                esconde_tituloxhab(id_hab, tipoCaja);
                            }
                            contarPersonas(tipoCaja);
                        });
                    });
                });





                document.querySelector('#env_reserva_' + tipoCaja).action = urlEnvio;
                document.querySelector('#lenguaje_' + tipoCaja).value = lng;

                document.getElementById('loading_' + tipoCaja).classList.add('ocultar');
                document.getElementById('buscar_reserva_' + tipoCaja).disabled = false;
                document.getElementById('buscar_reserva_' + tipoCaja).addEventListener('click', function () {
                    document.getElementById('loading_' + tipoCaja).classList.remove('ocultar');
                    document.getElementById('buscar_reserva_' + tipoCaja).disabled = true;

                    if (validarFormulario() == true) {
                        document.getElementById('env_reserva_' + tipoCaja).submit();
                    } else {
                        document.getElementById('loading_' + tipoCaja).classList.add('ocultar');
                        document.getElementById('buscar_reserva_' + tipoCaja).disabled = false;
                    }
                });


                document.getElementById('buscar_reserva_cajaflotante').addEventListener('click', function () {

                    document.getElementById('loading_cajaflotante').classList.remove('ocultar');
                    document.getElementById('buscar_reserva_cajaflotante').disabled = true;

                    if (validarFormulario('cajaflotante') == true) {
                        document.getElementById('env_reserva_cajaflotante').submit();
                    } else {
                        document.getElementById('loading_cajaflotante').classList.add('ocultar');
                        document.getElementById('buscar_reserva_cajaflotante').disabled = false;
                    }
                });




                var clasesActivar2 = [`.activar-menu-mobil`];
                var toggles = document.querySelectorAll(clasesActivar2.join(","));

                toggles.forEach(function (toggle) {
                    toggle.addEventListener("click", function (e) {
                        e.preventDefault();
                        var tituloReservacion = document.querySelector('.titulo-reservacion');
                        if (tituloReservacion.textContent.trim() === '') {
                            tituloReservacion.textContent = hotelNombre;
                        }

                        if (this.dataset.codigo) {
                            document.getElementById('promocode_' + tipoCaja).value = this.dataset.codigo;
                            document.getElementById('promocode_cajaflotante').value = this.dataset.codigo;
                        }

                        e.preventDefault();

                        if (this.classList.contains("is-active")) {
                            this.classList.remove("is-active");
                            document.querySelector('#contenedor-carrito-lateral').style.display = 'none';
                            document.querySelector('#carrito-lateral').style.display = 'none';
                        } else {
                            this.classList.add("is-active");
                            document.querySelector('#contenedor-carrito-lateral').style.display = 'block';
                            document.querySelector('#carrito-lateral').style.display = 'block';
                        }
                    });
                });

                document.querySelectorAll('.cerrar-cart').forEach(function (closeBtn) {
                    closeBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        document.querySelectorAll('.carrito_detalle').forEach(function (detail) {
                            detail.classList.remove('is-active');
                        });
                        document.querySelectorAll(clasesActivar2.join(",")).forEach(function (clase) {
                            clase.classList.remove('is-active');
                        });
                        document.querySelector('#contenedor-carrito-lateral').style.display = 'none';
                        document.querySelector('#carrito-lateral').style.display = 'none';
                    });
                });

                document.querySelector("#contenedor-carrito-lateral").addEventListener("click", function (e) {
                    if (e.target === this) {
                        // if (document.querySelector('.' + clasesActivar2.join(",")).classList.contains('is-active')) {
                        document.querySelectorAll(clasesActivar2.join(",")).forEach(function (clase) {
                            clase.classList.remove('is-active');
                        });
                        document.querySelector('#contenedor-carrito-lateral').style.display = 'none';
                        document.querySelector('#carrito-lateral').style.display = 'none';
                        // }
                    }
                });


                if (isMobileDevice()) {
                    if (AbrirMenu !== '') {
                        if (AbrirMenu == 1) {
                            const elements = document.querySelectorAll('.activar-menu-mobil');
                            elements.forEach(element => {
                                // Create a new click event
                                const event = new MouseEvent('click', {
                                    bubbles: true,
                                    cancelable: true,
                                    view: window
                                });
                                // Dispatch the event on the element
                                element.dispatchEvent(event);
                            });
                        }
                    }
                }


            }).catch((error) => {
                console.error(error);
            });


        }).catch((error) => {
            console.error(error);
        });



    } else {

        var xhr = new XMLHttpRequest();
        // urlBooking = 'https://booking.hotelarcangel.com';
        xhr.open("POST", urlBooking + "/api/obtener-informacion-hotel?hotel_identificador=" + datosHotel.valor(0) + '&idioma=' + datosHotel.valor(2), true);
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState == 4 && this.status == 200) {
                var respuesta = JSON.parse(this.response);
                if (respuesta.limite_habitaciones == null) {
                    respuesta.limite_habitaciones = 4;
                }
                habsMaximaHotel = respuesta.limite_habitaciones;
                adultosMaximoHotel = respuesta.limite_adultos;
                menoresMaximoHotel = respuesta.limite_menores;
                hotelNombre = respuesta.hotel_nombre;
                diferenteMobil = 1;


                etiquetaFecha = respuesta.texto.etiqueta_fecha;
                etiquetaFechaL = respuesta.texto.etiqueta_llegada;
                etiquetaFechaS = respuesta.texto.etiqueta_salida;
                etiquetaCodigo = respuesta.texto.etiqueta_codigo;
                etiquetaHab = respuesta.texto.etiqueta_habitacion;
                etiquetaHabSingular = respuesta.texto.eitqueta_hab_singular;
                etiquetaHabAbreviado = respuesta.texto.etiqueta_hab_abreviado;
                etiquetaAdultos = respuesta.texto.etiqueta_adultos;
                etiquetaMenores = respuesta.texto.etiqueta_menores;
                etiquetaEdades = respuesta.texto.etiqueta_edades;
                etiquetaEdad = respuesta.texto.etiqueta_edad;
                etiquetaBoton = respuesta.texto.etiqueta_boton;
                etiquetaPersonas = respuesta.texto.etiqueta_personas;
                tipoCajaMobil = 'lateral';
                mensajeMenores = respuesta.texto.mensaje_menores;
                mensajeAdultos = respuesta.texto.mensaje_adultos;
                mensajeFechas = respuesta.texto.mensaje_fechas;

                subdominio = respuesta.subdominio;

                estilosCss = {};

                if (Object.keys(respuesta["css"]).length !== 0) {
                    estilosCss = respuesta.css;
                }

                if (subdominio != '') {
                    urlEnvio = subdominio + '/listahab?normal=1';
                } else {
                    urlEnvio = urlBooking + '/listahab?normal=1';
                }

                var USource = getParameterByName('utm_source');
                var UCampaign = getParameterByName('utm_campaign');
                var UMedium = getParameterByName('utm_medium');

                var PromoCode = getParameterByName('promocode');
                var AbrirMenu = getParameterByName('abrir_menu');
                versionCSS = '1.11';

                armarCajaReservacion(USource, UCampaign, UMedium).then(() => {

                    var stylosP = '';
                    var bootStrap = '';
                    // https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css
                    if (datosHotel.valor(0) == 3) {
                        stylosP = urlBooking + '/caja_booking/css/promociones/styles_promo_gaviana.css';

                    } else if (datosHotel.valor(0) == 5) {
                        stylosP = urlBooking + '/caja_booking/css/hotel/style_lindamar.css';
                    }
                    if (datosHotel.valor(3).hasOwnProperty('bootStrap')) {
                        if (datosHotel.valor(3).bootStrap == 0) {
                            bootStrap = '';
                        }
                    }

                    loadFiles([
                        '' + bootStrap + '',
                        'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.umd.min.js',
                         '/caja_booking/styles_booking_n.css',
                        '' + stylosP + '',
                    ]).then(() => {
                        const today = new Date();
                        const yyyy = today.getFullYear();
                        let mm = today.getMonth() + 1; // Months start at 0!
                        let dd = today.getDate();

                        if (dd < 10) dd = '0' + dd;
                        if (mm < 10) mm = '0' + mm;

                        const formattedToday = dd + '/' + mm + '/' + yyyy;

                        var lngCalendar = 'en-US';
                        if (lng == 'es') {
                            var lngCalendar = 'es-MX';
                        }
                        const picker = new easepick.create({
                            element: document.getElementById('fechas_lateral'),
                            css: [
                                'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
                            ],
                            lang: lngCalendar,
                            format: 'DD/MM/YYYY',
                            grid: 1,
                            zIndex: 1000000,
                            calendars: 1,
                            plugins: ['RangePlugin', 'LockPlugin'],
                            RangePlugin: {
                                delimiter: '-',
                            },
                            LockPlugin: {
                                minDate: formattedToday,
                            }

                        });
                        const picker2 = new easepick.create({
                            element: document.getElementById('fechas_cajaflotante'),
                            css: [
                                'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
                            ],
                            lang: lngCalendar,
                            format: 'DD/MM/YYYY',
                            grid: 1,
                            zIndex: 1000000,
                            calendars: 1,
                            plugins: ['RangePlugin', 'LockPlugin'],
                            RangePlugin: {
                                delimiter: '-',
                            },
                            LockPlugin: {
                                minDate: formattedToday,
                            }

                        });
                    }).catch((error) => {
                        console.error(error);
                    });

                    document.querySelectorAll('.cambios_cajaflotante').forEach(function (element) {

                        element.addEventListener('click', function (e) {

                            if (document.querySelector('#hab_cajaflotante_1').classList.contains('ocultar')) {
                                document.querySelector('#listado_habitaciones').classList.remove('ocultar');
                                if (posicion == 'normal') {
                                    document.querySelector('#caja_reservacion').classList.add('activar-habitaciones');
                                }

                                muestra_habitaciones(document.querySelector('#n_cajaflotante_habitaciones').value, 'cajaflotante');
                                document.querySelector('#cerrar_cajaflotante').classList.remove('ocultar');
                                document.getElementById('listado_habitaciones').scrollIntoView(false);
                                // document.getElementById('env_reserva'+tipoCaja+'').scrollIntoView(false);
                            }
                            // $('#hab_'+tipoCaja+'1').removeClass('ocultar');
                            // alert($('#adulto'+tipoCaja+'hab_1').val());
                            // $('#adulto'+tipoCaja+'hab_1').focus();
                            // document.getElementById('#adulto'+tipoCaja+'hab'+$('#n_'+tipoCaja+'_habitaciones').val()+'').scrollIntoView(false);
                        });
                    });


/*
                    document.querySelector('#cerrar_cajaflotante_principal').addEventListener('click', function () {
                        document.querySelector('#caja_reservacion').classList.add('ocultar');
                        document.querySelector('#abrir_cajaflotante_principal').classList.remove('ocultar');
                        estadoCaja = 0;
                        localStorage.setItem('estadoCaja', estadoCaja);
                    });
*/

                    clasesActivar.push('#abrir_cajaflotante_principal');
                    var toggles2 = document.querySelectorAll(clasesActivar.join(","));

                    toggles2.forEach(function (toggle) {
                        toggle.addEventListener("click", function (e) {
                            e.preventDefault();
                            // document.querySelector('#caja_reservacion').classList.remove('ocultar');
                            // document.getElementById('caja_reservacion').scrollIntoView(false);

                            document.querySelector('#abrir_cajaflotante_principal').classList.add('ocultar');
                            estadoCaja = 1;
                            localStorage.setItem('estadoCaja', estadoCaja);
                        });
                    });



                    // document.querySelector('#abrir_cajaflotante_principal').addEventListener('click', function() {
                    //     document.querySelector('#caja_reservacion').classList.remove('ocultar');
                    //     document.querySelector('#abrir_cajaflotante_principal').classList.add('ocultar');
                    // });


                    document.querySelector('#cerrar_cajaflotante').addEventListener('click', function () {
                        document.querySelector('#hab_cajaflotante_1').classList.add('ocultar');
                        document.querySelector('#hab_cajaflotante_2').classList.add('ocultar');
                        document.querySelector('#hab_cajaflotante_3').classList.add('ocultar');
                        document.querySelector('#hab_cajaflotante_4').classList.add('ocultar');
                        document.querySelector('#cerrar_cajaflotante').classList.add('ocultar');
                        document.querySelector('#listado_habitaciones').classList.add('ocultar');
                        document.querySelector('#caja_reservacion').classList.remove('activar-habitaciones');
                    });

                    // document.querySelector('#mostrar_cajaflotante').addEventListener('click', function() {
                    //     document.querySelector('.buscador-caja').classList.remove('ocultar');
                    //     document.querySelector('#mostrar_cajaflotante').classList.add('ocultar');
                    // });

                    if (PromoCode !== '') {
                        document.getElementById('promocode_' + tipoCaja).value = PromoCode;
                        document.getElementById('promocode_cajaflotante').value = PromoCode;
                    }
                    document.getElementById('etiqueta_' + tipoCaja + '_fecha').textContent = etiquetaFecha;
                    document.getElementById('etiqueta_' + tipoCaja + '_codigo').textContent = etiquetaCodigo;
                    document.getElementById('etiqueta_' + tipoCaja + '_hab').textContent = etiquetaHab;
                    for (let index = 1; index <= habsMaximaHotel; index++) {
                        document.getElementById('etiqueta_' + tipoCaja + '_habitacion_' + index).textContent = etiquetaHabSingular + ' ' + index;

                    }



                    cambiarClase('etiqueta_' + tipoCaja + '_adultos', etiquetaAdultos);
                    cambiarClase('etiqueta_' + tipoCaja + '_menores', etiquetaMenores);
                    // cambiarClase('etiqueta_' + tipoCaja + '_edades', etiquetaEdades);
                    document.getElementById('label_buscar_reserva_' + tipoCaja).textContent = etiquetaBoton;
                    document.getElementById('buscar_reserva_' + tipoCaja).disabled = false;
                    document.getElementById('loading_' + tipoCaja).classList.add('ocultar');


                    document.getElementById("caja_reservacion").addEventListener("click", function () {
                        tipoCaja = 'cajaflotante';

                        document.getElementById("n_" + tipoCaja + "_habitaciones").addEventListener("change", function () {
                            document.getElementById("n_" + tipoCaja + "_habitaciones").value = this.value;
                            muestra_habitaciones(this.value, tipoCaja);
                            contarPersonas(tipoCaja);
                            // console.log(tipoCaja);
                        });

                        document.querySelectorAll(".num_adultos_habitacion").forEach(function (element) {
                            element.addEventListener("change", function () {
                                contarPersonas(tipoCaja);
                            });
                        });

                        document.querySelectorAll(".num_menores").forEach(function (element) {
                            element.addEventListener("change", function () {
                                var num_menores = this.value;
                                var comp_id_hab = this.id.split("_");
                                var id_hab = parseInt(comp_id_hab[3], 10);
                                if (num_menores != 0) {
                                    // console.log(id_hab, num_menores);
                                    muestra_menores(id_hab, num_menores, tipoCaja);
                                } else {
                                    esconde_menores(id_hab, tipoCaja);
                                    esconde_tituloxhab(id_hab, tipoCaja);
                                }
                                contarPersonas(tipoCaja);
                            });
                        });

                    });

                    document.getElementById("carrito-lateral").addEventListener("click", function () {
                        tipoCaja = 'lateral';

                        document.getElementById("n_" + tipoCaja + "_habitaciones").addEventListener("change", function () {
                            document.getElementById("n_" + tipoCaja + "_habitaciones").value = this.value;
                            muestra_habitaciones(this.value, tipoCaja);
                            contarPersonas(tipoCaja);
                            // console.log(tipoCaja);
                        });

                        document.querySelectorAll(".num_adultos_habitacion").forEach(function (element) {
                            element.addEventListener("change", function () {
                                contarPersonas(tipoCaja);
                            });
                        });

                        document.querySelectorAll(".num_menores").forEach(function (element) {
                            element.addEventListener("change", function () {
                                var num_menores = this.value;
                                var comp_id_hab = this.id.split("_");
                                var id_hab = parseInt(comp_id_hab[3], 10);
                                if (num_menores != 0) {
                                    // console.log(id_hab, num_menores);
                                    muestra_menores(id_hab, num_menores, tipoCaja);
                                } else {
                                    esconde_menores(id_hab, tipoCaja);
                                    esconde_tituloxhab(id_hab, tipoCaja);
                                }
                                contarPersonas(tipoCaja);
                            });
                        });
                    });





                    document.querySelector('#env_reserva_' + tipoCaja).action = urlEnvio;
                    document.querySelector('#lenguaje_' + tipoCaja).value = lng;

                    document.getElementById('loading_' + tipoCaja).classList.add('ocultar');
                    document.getElementById('buscar_reserva_' + tipoCaja).disabled = false;
                    document.getElementById('buscar_reserva_' + tipoCaja).addEventListener('click', function () {
                        document.getElementById('loading_' + tipoCaja).classList.remove('ocultar');
                        document.getElementById('buscar_reserva_' + tipoCaja).disabled = true;

                        if (validarFormulario() == true) {
                            document.getElementById('env_reserva_' + tipoCaja).submit();
                        } else {
                            document.getElementById('loading_' + tipoCaja).classList.add('ocultar');
                            document.getElementById('buscar_reserva_' + tipoCaja).disabled = false;
                        }
                    });


                    document.getElementById('buscar_reserva_cajaflotante').addEventListener('click', function () {

                        document.getElementById('loading_cajaflotante').classList.remove('ocultar');
                        document.getElementById('buscar_reserva_cajaflotante').disabled = true;

                        if (validarFormulario('cajaflotante') == true) {
                            document.getElementById('env_reserva_cajaflotante').submit();
                        } else {
                            document.getElementById('loading_cajaflotante').classList.add('ocultar');
                            document.getElementById('buscar_reserva_cajaflotante').disabled = false;
                        }
                    });




                    var clasesActivar2 = [`.activar-menu-mobil`];
                    var toggles = document.querySelectorAll(clasesActivar2.join(","));

                    toggles.forEach(function (toggle) {
                        toggle.addEventListener("click", function (e) {
                            e.preventDefault();
                            var tituloReservacion = document.querySelector('.titulo-reservacion');
                            if (tituloReservacion.textContent.trim() === '') {
                                tituloReservacion.textContent = hotelNombre;
                            }

                            if (this.dataset.codigo) {
                                document.getElementById('promocode_' + tipoCaja).value = this.dataset.codigo;
                                document.getElementById('promocode_cajaflotante').value = this.dataset.codigo;
                            }

                            e.preventDefault();

                            if (this.classList.contains("is-active")) {
                                this.classList.remove("is-active");
                                document.querySelector('#contenedor-carrito-lateral').style.display = 'none';
                                document.querySelector('#carrito-lateral').style.display = 'none';
                            } else {
                                this.classList.add("is-active");
                                document.querySelector('#contenedor-carrito-lateral').style.display = 'block';
                                document.querySelector('#carrito-lateral').style.display = 'block';
                            }
                        });
                    });

                    document.querySelectorAll('.cerrar-cart').forEach(function (closeBtn) {
                        closeBtn.addEventListener('click', function (e) {
                            e.preventDefault();
                            document.querySelectorAll('.carrito_detalle').forEach(function (detail) {
                                detail.classList.remove('is-active');
                            });
                            document.querySelectorAll(clasesActivar2.join(",")).forEach(function (clase) {
                                clase.classList.remove('is-active');
                            });
                            document.querySelector('#contenedor-carrito-lateral').style.display = 'none';
                            document.querySelector('#carrito-lateral').style.display = 'none';
                        });
                    });

                    document.querySelector("#contenedor-carrito-lateral").addEventListener("click", function (e) {
                        if (e.target === this) {
                            // if (document.querySelector('.' + clasesActivar2.join(",")).classList.contains('is-active')) {
                            document.querySelectorAll(clasesActivar2.join(",")).forEach(function (clase) {
                                clase.classList.remove('is-active');
                            });
                            document.querySelector('#contenedor-carrito-lateral').style.display = 'none';
                            document.querySelector('#carrito-lateral').style.display = 'none';
                            // }
                        }
                    });


                    if (isMobileDevice()) {
                        if (AbrirMenu !== '') {
                            if (AbrirMenu == 1) {
                                const elements = document.querySelectorAll('.activar-menu-mobil');
                                elements.forEach(element => {
                                    // Create a new click event
                                    const event = new MouseEvent('click', {
                                        bubbles: true,
                                        cancelable: true,
                                        view: window
                                    });
                                    // Dispatch the event on the element
                                    element.dispatchEvent(event);
                                });
                            }
                        }
                    }




                }).catch((error) => {
                    console.error(error);
                });

            }

        });


        xhr.send();
    }
}

// Listen for readystatechange in case document is still loading
document.addEventListener('readystatechange', function () {
    if (document.readyState == "complete") {
        inicializarCajaFlotante();
    }
});

// If document is already complete (SPA scenario), run immediately
if (document.readyState === "complete") {
    inicializarCajaFlotante();
}

// Also expose the function globally so it can be called manually
window.inicializarCajaFlotante = inicializarCajaFlotante;