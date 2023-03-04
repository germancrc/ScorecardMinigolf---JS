//cambiar texto bienvenida
const texto = document.getElementById('welcome')
const idiomas = ['Bienvenido!', 'Welcome!']
let index = 0

setInterval(() => {
	texto.textContent = idiomas[index]
	index = (index + 1) % idiomas.length
}, 3000)

//cambiar texto lang picker
const texto_lang = document.getElementById('lang_picker')
const idiomas_picker = ['Please select your language', 'Por favor seleccione su idioma']
let indice = 0

setInterval(() => {
	texto_lang.textContent = idiomas_picker[index]
	indice = (indice + 1) % idiomas_picker.length
}, 3000)
