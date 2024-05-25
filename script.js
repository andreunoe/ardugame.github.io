//Implementamos el código para el buscador
//Primero, creamos la función en la que asignamos los ids a variables
document.addEventListener('DOMContentLoaded', function() { 
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  //Datos internos que podremos buscar
  const data = [
    { name: 'Flappy Bird Arduino', description: 'Juego del Flappy Bird controlado por Arduino' },
    { name: 'Pong Arduino', description: 'Juego del Pong controlado por Arduino' },
    { name: 'Space Ride', description: 'Juego de saltos realizado con Processing' },
    { name: 'Laberinto', description: 'Juego de laberinto realizado con Processing' },
  ];

  //Relacionamos los nombres internos con los archivos HTML
  const fileMap = {
    'Flappy Bird Arduino': 'Flappy_Arduino.html',
    'Pong Arduino': 'Pong_Arduino.html',
    'Space Ride': 'Spaceride-Videojuego.html',
    'Laberinto': 'Laberinto_Videojuego.html'
  };

  function performSearch(query) { //Función que admite la búsqueda
    console.log("Busqueda:", query);
    //Convertimos todos los parámetros a minúsculas (para que la comparación sea efectiva) y comparamos si existen
    const filteredResults = data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) || //Nombre
      item.description.toLowerCase().includes(query.toLowerCase()) //Descripción
    );
    displayResults(filteredResults); //Invocamos la función que muestra los resultados pasándole los resultados de la comparación
  }
 
  function displayResults(results) {
    console.log("Resultados:", results); //Imprimimos en la consola los resultados
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    results.forEach(result => {
        //Los diferentes resultados serán elementos y enlaces de una lista 
        const li = document.createElement('li');
        const link = document.createElement('a');
        //Obtenemos la URL del enlace desde el mapa
        const fileName = fileMap[result.name];
        if (fileName) {
            link.href = fileName; //Enlazamos cada resultado con su página
            link.textContent = `${result.name} - ${result.description}`; //Mostramos en un enlace los resultados en forma de nombre y descripción
            li.appendChild(link);
            searchResults.appendChild(li); //Añadimos los elementos a la lista de resultados
        }
    });
  } 

  //Creamos la función que registrará los valores que vayamos introduciendo
  document.getElementById('searchInput').addEventListener('input', function () {
    performSearch(this.value);
  });

  searchInput.addEventListener('input', function() { //Cada vez que introduzcamos un valor
    console.log("Activamos input");
    const query = this.value.trim(); //Almacenamos los valores introducidos
    console.log("Busqueda:", query);
      if (query.length > 0) { //Si hemos introducido algo en el input
        performSearch(query); //Invocamos a la función para comprobar los resultados
      } else {
        searchResults.innerHTML = '';
      }
  });
});

//Creamos la funcionalidad del traductor
function googleTranslateElementInit() {
  new google.translate.TranslateElement( //Establecemos una nueva traducción de google
    {
      pageLanguage: 'es', //Idioma de la página
      includedLanguages: 'en,fr,de', //Idiomas posibles
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    },
    'google_translate_element'
  );
}

document.addEventListener("DOMContentLoaded", function() {
  //Asignamos los ids a nuevas variables
  var translateElement = document.getElementById("google_translate_element");
  var selectIdiomas = document.getElementById("idiomas");
  //Añadimos un evento al hacer click
  document.getElementById("idiomas-traduccion").addEventListener("click", function(event) {
    event.preventDefault(); //Evitamos que el enlace sea #
    selectIdiomas.style.display = (selectIdiomas.style.display === "block") ? "none" : "block"; //La lista de idiomas semuestran en bloque
  });

  selectIdiomas.addEventListener("change", function() {
    var idiomaSeleccionado = selectIdiomas.value; //Asignamos a una nueva variable el idioma que se muestra
    translateElement.style.display = "block";
    var langSelector = document.querySelector(".goog-te-combo");
          if (langSelector) {
            langSelector.value = idiomaSeleccionado; //Asignamos el valor seleccionado al idioma que se muestra
            langSelector.dispatchEvent(new Event('change')); //Establecemos el cambio de idioma
          }
  });
});

//Creamos la clase usuario, que establecerá los parámetros necesarios y almacenará los diferentes usuarios que se registren
class Usuario {
  constructor(nombre, apellidos, fecha, email, dni, codigo, poblacion, usuario, contraseña){
      this.nombre = nombre; //Nombre del usuario
      this.apellidos = apellidos; //Apellidos del usuario
      this.fecha = fecha; //Fecha de nacimiento
      this.email = email; //Correo electrónico
      this.dni = dni; //DNI 
      this.codigo = codigo; //Código postal
      this.poblacion = poblacion; //Población
      this.usuario = usuario; //Nombre de usuario
      this.contraseña = contraseña; //Contraseña
  }
}

//Creamos una función con la que comprobaremos la validez de los dtos introducidos en el formulario de registro
function validarFormulario(){

  resetearForma(); //Invocamos a la función que nos muestra las casillas con el estilo normal para el caso de que haya habido algún fallo
  //Almacenamos en nuevas variables los valores actualizados de los diferentes parámetros haciendo referencias al HTML para que los muestre
  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;
  const fecha = document.getElementById('fecha').value;
  const email = document.getElementById('e-mail').value;
  const dni = document.getElementById('dni').value;
  const codigo = document.getElementById('codigo').value;
  const poblacion = poblacionCodigo(codigo); //En el caso del código postal, invocamos a la función que asigna una población a los diferentes códigos postales 
  const usuario = document.getElementById('usuario').value;
  const contraseña = document.getElementById('contraseña').value;
  const contraseña2 = document.getElementById('contraseña2').value;

  let errores = false; //Declaramos e inicializamos una variable con la que podamos establecer los datos como verdaderos o falsos
  //Realizamos las diferentes validaciones con las que comprobaremos los datos introducidos en el formulario

  //El nombre
  if (nombre === '' || /\d/.test(nombre)){ //Si la casilla del nombre está vacía o tiene números
      existeError('nombre'); //Resaltamos como error la casilla del nombre
      errores = true; //Decretamos el error
  }

  //Apellidos
  if (apellidos === '' || /\d/.test(apellidos)){ //Si la casilla de los apellidos está vacía o tiene números
      existeError('apellidos'); //Resaltamos como error la casilla de los apellidos
      errores = true; //Decretamos el error
  }

  //Fecha de nacimiento en formato dd/mm/aaaa y comprobamos si es mayor de edad
  const fechaNacimientoFormato = /^\d{2}\/\d{2}\/\d{4}$/; //Función Regex que usaremos para comprobar el formato de la fecha
  if (!fechaNacimientoFormato.test(fecha)){ //Si la fecha que introducimos no tiene ese formato
      existeError('fecha'); //Resaltamos en la casilla el error
      errores = true; //Decretamos el error
  } else{ //Por el contrario, si cumple el formato, comprobamos si es mayor de edad
      const fechaNacimientoParametros = fecha.split('/');
      const fechaNacimiento = new Date(fechaNacimientoParametros[2], fechaNacimientoParametros[1] - 1, fechaNacimientoParametros[0]); //Calculamos la fecha de nacimiento
      const hoy = new Date(); //Calculamos la fecha de hoy
      const edad = hoy.getFullYear() - fechaNacimiento.getFullYear(); //Restamos la fecha de nuestro nacimiento a la fecha de hoy

      //Corregimos los errores
      if (hoy.getMonth() < fechaNacimiento.getMonth() || (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())){
          edad--;
      }

      //Si es menor de 18 años
      if (edad < 18) {
          existeError('fecha'); //Resaltamos la casilla como error
          errores = true; //Decretamos el error
          alert("Los menores de edad no pueden registrarse.");
      }
  }

  //Correo electrónico
  const emailFormato = /@/; //Comprobaremos que el texto introducido tiene un @
  if (!emailFormato.test(email)){ //Si no tiene @
      existeError('e-mail'); //Resaltamos el error en la casilla
      errores = true; //Decretamos el error
  }
  //Ahora, comprobamos que el email que introducimos no esté registrado ya
  const emailInput = document.getElementById('email'); //Obtenemos el valor introducido en el campo del email
  const emailRegistrado = JSON.parse(localStorage.getItem('nuevoUsuario')); //Asignamos a una nueva variable la información de los usuarios registrados en el Local Storage
  if (emailRegistrado && emailInput === emailRegistrado.email){ //Si el email ya está registrado
      existeError('e-mail'); //Resaltamos el error en la casilla
      errores = true; //Decretamos el error
      alert("Email ya registrado."); //Mostramos mensaje de error
  }

  //DNI
  const dniFormato = /^\d{8}[a-zA-Z]$/; //Comprobaremos que está formado por 8 números seguidos de una letra
  if (!dniFormato.test(dni)){ //Si el DNI no cumple ese formato
      existeError('dni'); //Resaltamos el error en la casilla
      errores = true; //Decretamos el error
  }
  //Ahora, comprobamos que el dni que introducimos no esté registrado ya
  const dniInput = document.getElementById('dni'); //Obtenemos el valor introducido en el campo del dni
  const dniRegistrado = JSON.parse(localStorage.getItem('nuevoUsuario')); //Asignamos a una nueva variable la información de los usuarios registrados en el Local Storage
  if (dniRegistrado && dniInput === dniRegistrado.dni){ //Si el dni ya está registrado
      existeError('dni'); //Resaltamos el error en la casilla
      errores = true; //Decretamos el error
      alert("DNI ya registrado."); //Mostramos mensaje de error
  }

  //Código postal
  const CPFormato = /^\d{5}$/; //Establecemos el formato que tiene que tener, 5 números
  if (!CPFormato.test(codigo)){ //Si no está formado por los cinco números
      existeError('codigo'); //Resaltamos el error en la casilla 
      errores = true; //Decretamos el error
  }

  //Nombre de usuario 
  if (usuario === ''){ //Comprobamos si la casilla está o no vacía
      existeError('usuario'); //Si está vacía, resaltamos el error
      errores = true; //Decretamos el error
  }
  //Ahora, comprobamos que el usuario que introducimos no esté registrado ya
  const usuarioNombre = document.getElementById('usuario'); //Obtenemos el valor introducido en el campo del email
  const usuarioRegistrado = JSON.parse(localStorage.getItem('nuevoUsuario')); //Asignamos a una nueva variable la información de los usuarios registrados en el Local Storage
  if (usuarioRegistrado && usuarioNombre === usuarioRegistrado.usuario){ //Si el usuario ya está registrado
      existeError('usuario'); //Resaltamos el error en la casilla
      errores = true; //Decretamos el error
      alert("Nombre de usuario ya registrado."); //Mensaje de error
  }

  //Contraseña
  const contraseñaFormato = /^(?=.*\d.*\d)[0-9a-zA-Z]{8,}$/; //Establecemos la función Regex con la que validaremos que la contraseña tenga por lo menos 8 carácteres y 2 números
  if (!contraseñaFormato.test(contraseña)){ //Si la contraseña no está formada de esta forma
      existeError('contraseña'); //Resaltamos el error en la casilla
      errores = true; //Decretamos el error
  }

  //Confirmamos contraseña
  if (contraseña !== contraseña2){ //Si la segunda contraseña no es igual que la primera
      existeError('contraseña2'); //Resaltamos en la casilla el error
      errores = true; //Decretamos el error
  }

  //Finalmente, comprobamos si hemos encontrado algún error en el proceso
  if (errores){ //Si hay errores
      return alert("Se han encontrado errores en el formulario. Por favor, revisa los campos resaltados en rojo."); //Devolvemos un mensaje de alerta indicando el fallo
  }

  //En caso de que no haya errores, creamos una instancia de la clase Usuario con el nuevo usuario
  const nuevoUsuario = new Usuario(nombre, apellidos, fecha, email, dni, codigo, poblacion, usuario, contraseña);

  localStorage.setItem('nuevoUsuario', JSON.stringify(nuevoUsuario)); //Almacenamos la información del nuevo usuario en el localStorage
  alert("Te has registrado con éxito"); //Finalmente, mostramos una alerta de que el proceso ha ido correctamente
  window.location.href = 'Mi-Cuenta.html'; //Y redirigimos a la página principal

  //La verificación de los parámetros introducidos se hará al pulsar el botón aceptar
}

//Creamos una función que declare la población al código postal
function poblacionCodigo(codigoPostal) {
  //Creamos un array en el que establecemos algunos ejemplos de equivalencias entre códigos postales y poblaciones
  const poblaciones = {
      '12345': 'Población A',
      '67890': 'Población B',
      '54321': 'Población C',
      '98765': 'Población D',
      '01235': 'Población E',
  };
  //Nos devolverá el nombre de la población en caso de que hayamos introducido uno de esos códigos. En caso contrario, nos devuelve "Población ejemplo"
  return poblaciones[codigoPostal] || "Población Ejemplo"; 
}

//Ahora, creamos una función con la que asignaremos las poblaciones a los códigos introducidos
function asignarPoblacion(){
  const CPInput = document.getElementById('codigo'); //Asignamos a una nueva variable el valor de la población introducido en el HTML
  const poblacionInput = document.getElementById('poblacion'); //Asignamos a una nueva variable el valor del código introducido en el HTML
  const codigoPostal = CPInput.value.trim(); //Extraemos el valor actualizado del código del HTML, asegurándonos de que no haya espacios
  const poblacion = poblacionCodigo(codigoPostal); //Asignamos a una nueva variable de población el nombre correspodiente invocando a la función de obtener el código postal

  poblacionInput.value = poblacion; //El valor de la población será igual al valor proporcionado por la función
}

//Ahora, creamos una función para iniciar sesión
function iniciarSesion(){
  const usuarioInput = document.getElementById('usuario'); //Obtenemos y asignamos el valor introducido en el campo de nombre 
  const contraseñaInput = document.getElementById('contraseña'); //Obtenemos y asignamos el valor introducido en el campo de contraseña
  //Actualizamos los valores de estos campos y los asignamos a unas nuevas variables
  const usuario = usuarioInput.value.trim();
  const contraseña = contraseñaInput.value;
  
  const usuarioRegistrado = JSON.parse(localStorage.getItem('nuevoUsuario')); //Asignamos a una nueva variable la información de los usuarios registrados en el Local Storage
  resetearForma(); //Invocamos a la función para resetear el estilo de las casillas al corregir los errores

  if (usuarioRegistrado && usuario === usuarioRegistrado.usuario && contraseña === usuarioRegistrado.contraseña){ //Si el usuario y la contraseña que hemos introducido existen
      //Dirigimos a la página principal 
      window.location.href = 'Mi-Cuenta.html';
  } else if (usuarioRegistrado && usuario === usuarioRegistrado.usuario && contraseña !== usuarioRegistrado.contraseña){ //Si el usuario que hemos introducido existe pero la contraseña no
      alert("Error: Contraseña incorrecta"); //Mostramos un mensaje de error
      existeError('contraseña'); //Invocamos a la función para resaltar en rojo la contraseña
  } else if (usuarioRegistrado && usuario !== usuarioRegistrado.usuario && contraseña === usuarioRegistrado.contraseña){ //Si el usuario que hemos introducido no existe pero la contraseña si
      alert("Error: Usuario incorrecto"); //Mostramos un mensaje de error
      existeError('usuario'); //Invocamos a las funciones para resaltar el error en la casilla
  } else{ //Si el usuario o la contraseña no están registrados
      alert("Error: Usuario no registrado o datos incorrectos"); //Mostramos un mensaje de error
      //Invocamos a las funciones para resaltar los errores en las casillas
      existeError('usuario'); 
      existeError('contraseña');
  }
}

//Creamos la función que restaurará la apariencia de los inputs
function resetearForma(){
  const elementos = document.querySelectorAll('input'); //Asignamos a una nueva variable todos los inputs del HTML
  elementos.forEach(campo => campo.classList.remove('error')); //Eliminamos la clase error CSS de los elementos
}

//Creamos una función que nos servirá para resaltar las casillas en rojo en caso de error
function existeError(idCampo){
  const campo = document.getElementById(idCampo); //Asignamos a una nueva variable de campo los valores de todos los campos
  campo.classList.add('error'); //Añadimos en esa variable el estilo o la clase de error del CSS
}