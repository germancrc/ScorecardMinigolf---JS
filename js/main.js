//VARIABLES GLOBALES

const players_form = document.getElementById('players_form')

let array_scores = []
let sumsByColumn = []

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
			let tableHtml = '<table class="table table-dark table-striped text-center table-sm"><thead><tr><th scope="col">#</th>'

			for (let i = 0; i < array_scores.length; i++) {
				tableHtml += `<th scope="col" class="text-uppercase col-2">${array_scores[i].nombre.slice(0, 4)}</th>`
			}

			tableHtml += '</tr></thead><tbody class="height: 300px; overflow-y: scroll;">'

			for (let i = 1; i <= holes; i++) {
				tableHtml += `<tr scope="row" class="alto_score" id="row${i}"><td class="align-middle py-4 col-1 fw-bold">${i}</td>`

				for (let j = 0; j < array_scores.length; j++) {
					tableHtml += `<td > <select class="form-select text-center fw-bold mt-2 player${j + 1}" aria-label="Player score select" id="player${
						j + 1
					}-hole${i}" >
					<option selected></option>
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

			tableHtml += '</tbody></table>'
			scores_table.innerHTML = tableHtml
		}

		// Get all SELECT elements on the page
		scores_table.querySelectorAll('select').forEach((select) => {
			select.addEventListener('change', (event) => {
				// Get the ID of the select element
				const selectId = event.target.id

				// Get the selected value of the select element
				const selectValue = event.target.value

				// Save the value to local storage with a specific key
				localStorage.setItem(`${selectId}`, selectValue)

				//SUMAR SELECTORS
				const tbody = document.querySelector('tbody')

				// Loop through each column (excluding the first column with player names)

				for (let i = 1; i < tbody.rows[0].cells.length; i++) {
					let sum = 0

					// Loop through each row in the column and add up the value of the select element
					for (let j = 0; j < tbody.rows.length; j++) {
						const select = tbody.rows[j].cells[i].querySelector('select')
						sum += Number(select.value)
					}

					// Add the sum for the column to the array of sums

					// console.log(sum)

					sumsByColumn.push(parseInt(sum))
					if (sumsByColumn.length > array_scores.length) {
						sumsByColumn.shift()
					}

					localStorage.setItem('sumsByColumn', JSON.stringify(sumsByColumn))
					console.log(sumsByColumn)

					
					const results_table = document.getElementById('container_results')
					let table_results = '<table class="table table-dark table-striped text-center table-sm"><thead>'
					
					for (let i = 0; i < array_scores.length; i++) {
						table_results += `<th scope="col" class="text-uppercase col-2">${array_scores[i].nombre.slice(0, 4)}</th>`
					}
					
					table_results += '<tr>'
					
					// sumsByColumn = JSON.parse(localStorage.getItem('sumsByColumn'))
					
					for (let j = 0; j < sumsByColumn.length; j++) {
						console.log(sumsByColumn)
						table_results += `<td class="align-middle fs-2 final_scores" >${sumsByColumn[j]}
						</td>`
					}

					table_results += '</tr></tbody></table>'
					results_table.innerHTML = table_results
				}
			})
			// Get the saved value from local storage and set the selected option
			const savedValue = localStorage.getItem(select.id)
			if (savedValue) {
				select.value = savedValue
			}

			// sumsByColumn = JSON.parse(localStorage.getItem('sumsByColumn'))
			// console.log(sumsByColumn)

			const results_table = document.getElementById('container_results')
			let table_results = '<table class="table table-dark table-striped text-center table-sm"><thead>'

			for (let i = 0; i < array_scores.length; i++) {
				table_results += `<th scope="col" class="text-uppercase col-2">${array_scores[i].nombre.slice(0, 4)}</th>`
			}

			table_results += '<tr>'

			for (let j = 0; j < array_scores.length; j++) {
				table_results += `<td class="align-middle fs-2 final_scores" >${sumsByColumn[j]}
						</td>`
			}

			table_results += '</tr></tbody></table>'
			results_table.innerHTML = table_results
		})
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
