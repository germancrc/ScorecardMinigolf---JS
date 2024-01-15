//Elegir idioma
function change_language() {
	let espanol = document.getElementById('btn_continue_esp')
	let ingles = document.getElementById('btn_continue_eng')
	let idioma = document.getElementById('lang_select').value

	if (idioma == 'español') {
		espanol.className = 'btn btn-primary btn-lg d-block fade_in'
		ingles.className = 'btn btn-primary d-none'
	} else if (idioma == 'english') {
		espanol.className = 'btn btn-primary d-none'
		ingles.className = 'btn btn-primary btn-lg d-block fade_in'
	} else {
		espanol.className = 'btn btn-primary d-none'
		ingles.className = 'btn btn-primary d-none'
	}
}

//cambiar texto bienvenida
if (document.getElementById('welcome')) {
	const texto = document.getElementById('welcome');
	const idiomas = ['Bienvenido!', 'Welcome!'];
	let index = 0;
  
	setInterval(() => {
	  texto.textContent = idiomas[index];
  
	  // Añade la clase de animación al elemento
	  texto.classList.add('text-focus-in');
  
	  // Elimina la clase de animación después de 1 segundo (1000 milisegundos)
	  setTimeout(() => {
		texto.classList.remove('text-focus-in');
	  }, 1000);
  
	  // Actualiza el índice para el siguiente idioma
	  index = (index + 1) % idiomas.length;
	}, 3000);
  }
  

//cambiar texto lang picker
if (document.getElementById('lang_picker')) {
	const texto_lang = document.getElementById('lang_picker')
	const idiomas_picker = ['Por favor seleccione su idioma', 'Please select your language']
	let indice = 0

	setInterval(() => {
		texto_lang.textContent = idiomas_picker[indice]
			  // Añade la clase de animación al elemento
			  texto_lang.classList.add('text-focus-in');
  
			  // Elimina la clase de animación después de 1 segundo (1000 milisegundos)
			  setTimeout(() => {
				texto_lang.classList.remove('text-focus-in');
			  }, 1000);
		  
		indice = (indice + 1) % idiomas_picker.length
	}, 3000)
}


//year footer
	let yearFooter = new Date().getFullYear();
	document.getElementById("yearFooter").innerHTML = '\u00A9 ' + yearFooter + ' - GermanCRC';

//FECHA
let objectDate = new Date()

let day = objectDate.getDate()
let month = objectDate.getMonth()
let year = objectDate.getFullYear()

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const mes_nombres = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const monthName = monthNames[month]

const mes_nomb = mes_nombres[month]

if (document.getElementById('fecha_eng')) {
	const fecha_eng = document.getElementById('fecha_eng')
	fecha_eng.textContent = monthName + ' ' + day + ' ' + year
}
if (document.getElementById('fecha_esp')) {
	const fecha_esp = document.getElementById('fecha_esp')
	fecha_esp.textContent = day + ' de ' + mes_nomb + ' ' + year
}





//HABILITAR BOTON REGLAS

if (document.getElementById('conf_rules_eng')) {
	let checkbox_rules = document.querySelector('#conf_rules_eng')
	let btn_continue_eng = document.querySelector('#btn_continue_modal_eng')
	checkbox_rules.addEventListener('change', function () {
		if (this.checked) {
			console.log('check')
			btn_continue_eng.disabled = false
		} else {
			btn_continue_eng.disabled = true
		}
	})
}
if (document.getElementById('conf_rules_esp')) {
	let checkbox_reglas = document.querySelector('#conf_rules_esp')
	let btn_continue_esp = document.querySelector('#btn_continue_modal_esp')
	checkbox_reglas.addEventListener('change', function () {
		if (this.checked) {
			console.log('check')
			btn_continue_esp.disabled = false
		} else {
			btn_continue_esp.disabled = true
		}
	})
}

// //HABILITAR BOTON START GAME
// function enable_btngame() {
// 	player_1 = document.getElementById('player_1').value
// 	player_2 = document.getElementById('player_2').value
// 	player_3 = document.getElementById('player_3').value
// 	player_4 = document.getElementById('player_4').value
// 	// player_5 = document.getElementById('player_5').value
// 	btn_start = document.getElementById('start_game')

// 	if (player_1 === '' && player_2 === '' && player_3 === '' && player_4 === '') {
// 		btn_start.className = 'd-none'
// 	} else {
// 		btn_start.className = 'btn btn-primary col-6 fade_in'
// 	}
// }



//ir  PLAYERS ENG
function goto_players_eng() {
	window.location.href = '/players_eng.html'
}
//ir  PLAYERS ESP
function goto_players_esp() {
	window.location.href = '/players_esp.html'
}

let players_list = document.getElementById('players_list');
if(players_list){
	players_list.style.display = "none";
}

function updateInputs() {
    const inputContainer = document.getElementById('inputContainer');
    const selectedValue = document.getElementById('inputSelector').value;
    const btnStartGame = document.getElementById('btn_start_game');

    if (selectedValue == 0) {
        players_list.style.display = "none";
        inputContainer.innerHTML = '';
        btnStartGame.disabled = true;
    } else {
        players_list.style.display = "block";

        // Clear previous inputs
        inputContainer.innerHTML = '';

        // Create new inputs based on the selected value
        for (let i = 0; i < selectedValue; i++) {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group mb-1 fade_in';

            const inputLabel = document.createElement('span');
            inputLabel.className = 'input-group-text';

            // Reemplazar la palabra "PLAYER" con una imagen
            const img = document.createElement('img');
            img.src = '/img/golfer.png';
            img.alt = `Player ${i + 1}`;
            img.id = 'golfer';

            inputLabel.appendChild(img);

            // Añadir el espacio y el número usando un span
            const numberSpan = document.createElement('span');
            numberSpan.className = 'number';
            numberSpan.textContent = `${i + 1}`;
            inputLabel.appendChild(numberSpan);

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control text-uppercase fw-bold';
            input.id = `player_${i + 1}`;
            //input.placeholder = `PLAYER ${i + 1}`;

            // Agregar evento input a cada campo de entrada
            input.addEventListener('input', checkInputs);

            inputGroup.appendChild(inputLabel);
            inputGroup.appendChild(input);

            inputContainer.appendChild(inputGroup);
        }

        // Desactivar el botón al principio
        btnStartGame.disabled = true;
    }
}

// Función para verificar si todos los campos están llenos
function checkInputs() {
    const inputContainer = document.getElementById('inputContainer');
    const btnStartGame = document.getElementById('btn_start_game');
    const inputs = inputContainer.querySelectorAll('input');
    let allInputsFilled = true;

    inputs.forEach((input) => {
        if (input.value.trim() === '') {
            allInputsFilled = false;
        }
    });

    // Habilitar o deshabilitar el botón según si todos los campos están llenos
    btnStartGame.disabled = !allInputsFilled;
}



