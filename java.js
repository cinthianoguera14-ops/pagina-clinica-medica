/* =========================================
   URL DE GOOGLE APPS SCRIPT
========================================= */

var URL_BACKEND =
    "https://script.google.com/macros/s/AKfycbxGVCeDIlb5Qbyos7BrZSd3gJe9Lu-DOh8V-7fgMK2sto34tTkru7uKVeABC-ii4OI9Nw/exec";


/* =========================================
   URL BACKEND FAQ CLÍNICA
========================================= */

var URL_FAQ =
    "https://script.google.com/macros/s/AKfycbyqC4lJNyEmUvPLOYuT7BAdrDznfYeWbxnCqFxNbbDOPwl5YQulWcB9rUL6lIPq15ZEUQ/exec";


/* =========================================
   PREGUNTAS FRECUENTES
========================================= */

function cargarFAQ() {

    var listaFAQ =
        document.getElementById("faq-list");

    var cargando =
        document.getElementById("faq-loading");

    var error =
        document.getElementById("faq-error");


    fetch(URL_FAQ)

        .then(function(respuesta) {

            return respuesta.json();

        })

        .then(function(preguntas) {

            cargando.style.display = "none";

            error.style.display = "none";

            listaFAQ.innerHTML = "";


            preguntas.forEach(function(item, indice) {

                var contenedor =
                    document.createElement("div");

                contenedor.className =
                    "faq-item";


                var boton =
                    document.createElement("button");

                boton.className =
                    "faq-question";

                boton.type = "button";


                var pregunta =
                    document.createElement("span");

                pregunta.textContent =
                    item.pregunta;


                var icono =
                    document.createElement("i");

                icono.className =
                    "fa-solid fa-chevron-down";


                boton.appendChild(pregunta);

                boton.appendChild(icono);


                var respuesta =
                    document.createElement("div");

                respuesta.className =
                    "faq-answer";

                respuesta.textContent =
                    item.respuesta;


                boton.addEventListener(
                    "click",
                    function() {

                        var estabaAbierto =
                            respuesta.classList.contains("active");


                        /* Cerrar todas las respuestas */

                        var respuestasAbiertas =
                            document.querySelectorAll(".faq-answer.active");

                        respuestasAbiertas.forEach(
                            function(elemento) {

                                elemento.classList.remove("active");

                            }
                        );


                        /* Quitar estado activo de todos los botones */

                        var botonesActivos =
                            document.querySelectorAll(".faq-question.active");

                        botonesActivos.forEach(
                            function(elemento) {

                                elemento.classList.remove("active");

                            }
                        );


                        /* Abrir la seleccionada */

                        if (!estabaAbierto) {

                            respuesta.classList.add("active");

                            boton.classList.add("active");

                        }

                    }
                );


                contenedor.appendChild(boton);

                contenedor.appendChild(respuesta);

                listaFAQ.appendChild(contenedor);

            });

        })

        .catch(function(errorCarga) {

            console.error(
                "Error al cargar las preguntas frecuentes:",
                errorCarga
            );


            cargando.style.display = "none";

            error.style.display = "block";

        });

}


/* =========================================
   CARGAR FAQ CUANDO LA PÁGINA ESTÁ LISTA
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        cargarFAQ();

    }
);


/* =========================================
   FORMULARIO
========================================= */

document
    .getElementById("formulario")
    .addEventListener(
        "submit",
        function(evento) {

            /* Evitar que la página se recargue */

            evento.preventDefault();


            /* =====================================
               OBTENER LOS DATOS DEL FORMULARIO
            ===================================== */

            var datos = {

                nombre:
                    document
                    .getElementById("nombre")
                    .value,

                email:
                    document
                    .getElementById("email")
                    .value,

                telefono:
                    document
                    .getElementById("telefono")
                    .value,

                mensaje:
                    document
                    .getElementById("mensaje")
                    .value

            };


            /* =====================================
               ELEMENTOS
            ===================================== */

            var boton =
                document.getElementById("boton");


            var estado =
                document.getElementById("estado");


            /* =====================================
               CAMBIAR BOTÓN
            ===================================== */

            boton.disabled = true;

            boton.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';


            estado.textContent = "";

            estado.className = "";


            /* =====================================
               ENVIAR DATOS A GOOGLE APPS SCRIPT
            ===================================== */

            fetch(
                URL_BACKEND,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "text/plain;charset=utf-8"

                    },

                    body:
                        JSON.stringify(datos)

                }
            )


            /* =====================================
               RECIBIR RESPUESTA
            ===================================== */

            .then(
                function(respuesta) {

                    return respuesta.json();

                }
            )


            /* =====================================
               ENVÍO CORRECTO
            ===================================== */

            .then(
                function(resultado) {

                    estado.textContent =
                        "¡Consulta enviada correctamente! Te enviaremos una confirmación por correo.";


                    estado.className =
                        "text-success";


                    /* Limpiar formulario */

                    document
                        .getElementById("formulario")
                        .reset();

                }
            )


            /* =====================================
               ERROR
            ===================================== */

            .catch(
                function(error) {

                    console.error(error);


                    estado.textContent =
                        "Hubo un error al enviar la consulta. Intentá nuevamente.";


                    estado.className =
                        "text-danger";

                }
            )


            /* =====================================
               FINALIZAR
            ===================================== */

            .finally(
                function() {

                    boton.disabled = false;


                    boton.innerHTML =
                        '<i class="fa-solid fa-paper-plane"></i> Enviar consulta';

                }
            );

        }
    );
