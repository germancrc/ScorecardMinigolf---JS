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
		espanol.className = 'btn btn-primary d-block btn_shadow'
		ingles.className = 'btn btn-primary d-none'
	} else if (idioma == 'english') {
		espanol.className = 'btn btn-primary d-none'
		ingles.className = 'btn btn-primary d-block btn_shadow'
	} else {
		espanol.className = 'btn btn-primary d-none'
		ingles.className = 'btn btn-primary d-none'
	}
}

//HABILITAR BOTON START GAME
function enable_btngame() {
	player_1 = document.getElementById('player_1').value
	player_2 = document.getElementById('player_2').value
	player_3 = document.getElementById('player_3').value
	player_4 = document.getElementById('player_4').value
	player_5 = document.getElementById('player_5').value
	btn_start = document.getElementById('start_game')

	if (player_1 === '' && player_2 === '' && player_3 === '' && player_4 === '' && player_5 === '') {
		btn_start.className = 'd-none'
	} else {
		btn_start.className = 'btn btn-primary col-6 btn_shadow'
	}
}
