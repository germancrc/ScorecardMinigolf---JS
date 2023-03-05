//VARIABLES GLOBALES

const players_form = document.getElementById('players_form')

let array_scores = []
let player_scores = []

//FUNCIONES

const crear_jugador = (nombre) => {
	let jugador = {
		nombre: nombre,
	}

	array_scores.push(jugador)

	return jugador
}

const guardar_jugador = () => {
	localStorage.setItem('jugador', JSON.stringify(array_scores))
}

if (document.getElementById('scores_table')) {
	const scores_table = document.getElementById('scores_table')
	const mostrar_tabla_jugadores = () => {
		scores_table.innerHTML = ''
		const holes = 18
		array_scores = JSON.parse(localStorage.getItem('jugador'))
		if (array_scores === null) {
			array_scores = []
		} else {
			let tableHtml = '<table class="table table-dark table-striped text-center table-sm"><thead><tr><th scope="col">HOLE</th>'

			for (let i = 0; i < array_scores.length; i++) {
				tableHtml += `<th scope="col" class="text-uppercase col-2">${array_scores[i].nombre}.slice(0,3)</th>`
			}

			tableHtml += '</tr></thead><tbody>'

			for (let i = 1; i <= holes; i++) {
				tableHtml += `<tr scope="row" id="row${i}"><td class="align-middle col-1 fw-bold">${i}</td>`

				for (let j = 0; j < array_scores.length; j++) {
                                        //tableHtml += `<td><input class="form-control text-center" type="number" id="player${j + 1}hole${i}" min="0" max="6" value=""></td>`
					tableHtml += `<td> <select class="form-select" aria-label="Player score select" id="player${j + 1}hole${i}" >
  <option selected>0</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
  <option value="4">4</option>
  <option value="5">5</option>
  <option value="6">6</option>
</select>
</td>`
				}

				tableHtml += '</tr>'
			}

			tableHtml += '<table class="table table-dark table-striped text-center table-sm my-4"><thead><tr><th scope="col">TOTAL</th>'

			for (let i = 0; i < array_scores.length; i++) {
				tableHtml += `<th scope="col"><td><input class="form-control text-center" id="${array_scores[i]}result" type="number" min="0" readonly></td></th>`
			}

			tableHtml += '</tbody></table>'
			scores_table.innerHTML = tableHtml

			// document.getElementById('row19').innerHTML = 'Total'

			// const tdElement = document.querySelector('#row19')
			// if (tdElement === '19') {
			// 	tdElement.textContent = 'Total'
			// }

			//get all input values
			// const inputElements = document.querySelectorAll('input')
			// const inputIds = []
			// inputElements.forEach((input) => {
			// 	const id = input.getAttribute('id')
			// 	// const value = input.value
			// 	if (id) {
			// 		inputIds.push(id)

			// 	}
			// })
			// console.log(inputIds)

			// Get all input elements on the page
			const inputs = document.querySelectorAll('input')
			const inputIds = []
			// Loop through each input element and retrieve its id and value attributes
			inputs.forEach((input) => {
				const id = input.id
				const value = input.value
				if (id) {
					inputIds.push(id + ' - ' + value)
					localStorage.setItem('score', JSON.stringify(inputIds))
				}
				console.log(`ID: ${id}, Value: ${value}`)
			})
		}
	}

	document.addEventListener('DOMContentLoaded', mostrar_tabla_jugadores)
}

//EVENT-LISTENERS
if (document.getElementById('players_form')) {
	players_form.addEventListener('submit', (e) => {
		e.preventDefault()
		let player_1 = document.getElementById('player_1').value
		let player_2 = document.getElementById('player_2').value
		let player_3 = document.getElementById('player_3').value
		let player_4 = document.getElementById('player_4').value
		let player_5 = document.getElementById('player_5').value

		if (player_1 != '') {
			crear_jugador(player_1)
		}
		if (player_2 != '') {
			crear_jugador(player_2)
		}
		if (player_3 != '') {
			crear_jugador(player_3)
		}
		if (player_4 != '') {
			crear_jugador(player_4)
		}
		if (player_5 != '') {
			crear_jugador(player_5)
		}

		guardar_jugador()

		players_form.reset()
	})
}
