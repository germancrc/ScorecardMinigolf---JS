//cambiar texto bienvenida
if (document.getElementById('welcome')) {
	const texto = document.getElementById('welcome')
	const idiomas = ['Bienvenido!', 'Welcome!']
	let index = 0

	setInterval(() => {
		texto.textContent = idiomas[index]
		index = (index + 1) % idiomas.length
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

//cambiar texto lang picker
if (document.getElementById('lang_picker')) {
	const texto_lang = document.getElementById('lang_picker')
	const idiomas_picker = ['Por favor seleccione su idioma', 'Please select your language']
	let indice = 0

	setInterval(() => {
		texto_lang.textContent = idiomas_picker[indice]
		indice = (indice + 1) % idiomas_picker.length
	}, 3000)
}

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

//HABILITAR BOTON START GAME
function enable_btngame() {
	player_1 = document.getElementById('player_1').value
	player_2 = document.getElementById('player_2').value
	player_3 = document.getElementById('player_3').value
	player_4 = document.getElementById('player_4').value
	// player_5 = document.getElementById('player_5').value
	btn_start = document.getElementById('start_game')

	if (player_1 === '' && player_2 === '' && player_3 === '' && player_4 === '') {
		btn_start.className = 'd-none'
	} else {
		btn_start.className = 'btn btn-primary col-6 fade_in'
	}
}

//ir  SCORES INGLES
function goto_scores_eng() {
	window.location.href = '/scores_eng.html'
	localStorage.clear()
}
//ir  SCORES ESP
function goto_scores_esp() {
	window.location.href = '/scores_esp.html'
	localStorage.clear()
}

//ir  PLAYERS ENG
function goto_players_eng() {
	window.location.href = '/players_eng.html'
}
//ir  PLAYERS ESP
function goto_players_esp() {
	window.location.href = '/players_esp.html'
}

let players_list = document.getElementById('players_list');
players_list.style.display = "none";

function updateInputs() {
	const inputContainer = document.getElementById('inputContainer');
    const selectedValue = document.getElementById('inputSelector').value;
	
    if(selectedValue == 0){
		players_list.style.display = "none";
		inputContainer.innerHTML = '';
	}else{
		players_list.style.display = "block";

		// Clear previous inputs
		inputContainer.innerHTML = '';
		
		// Create new inputs based on the selected value
		for (let i = 0; i < selectedValue; i++) {
			const inputGroup = document.createElement('div');
			inputGroup.className = 'input-group mb-3 fade_in';
			
			const inputLabel = document.createElement('span');
			inputLabel.className = 'input-group-text';
			
			// Reemplazar la palabra "PLAYER" con una imagen
			const img = document.createElement('img');
			img.src = '/img/golfer.png'; 
			img.alt = `Player ${i + 1}`;
			img.id = 'golfer'
			
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
			
			inputGroup.appendChild(inputLabel);
			inputGroup.appendChild(input);
			
			inputContainer.appendChild(inputGroup);
		}
	}
}
