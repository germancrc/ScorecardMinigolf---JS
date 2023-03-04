//VARIABLES GLOBALES

const players_form = document.getElementById('players_form')

let array_scores = []

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
			let tableHtml = '<table class="table table-sm text-center table-striped"><thead><tr><th scope="col">Hole#</th>'

			for (let i = 0; i < array_scores.length; i++) {
				tableHtml += `<th scope="col">${array_scores[i].nombre}</th>`
			}

			tableHtml += '</tr></thead><tbody>'

			for (let i = 1; i <= holes; i++) {
				tableHtml += `<tr scope="row" id="row${i}"><td class="align-middle fw-bold">${i}</td>`

				for (let j = 0; j < array_scores.length; j++) {
					tableHtml += `<td><input class="form-control text-center" type="number" id="player${j + 1}hole${i}" min="0" max="6"></td>`
				}

				tableHtml += '</tr>'
			}

			tableHtml += '<table class="table table-sm text-center table-striped my-4"><thead><tr><th scope="col" class="align-middle">Total</th>'

			for (let i = 0; i < array_scores.length; i++) {
				tableHtml += `<th scope="col"><td><input class="form-control text-center" id="${array_scores[i]}" type="number"  min="0"></td></th>`
			}

			tableHtml += '</tbody></table>'
			scores_table.innerHTML = tableHtml

			// document.getElementById('row19').innerHTML = 'Total'

			// const tdElement = document.querySelector('#row19')
			// if (tdElement === '19') {
			// 	tdElement.textContent = 'Total'
			// }
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
