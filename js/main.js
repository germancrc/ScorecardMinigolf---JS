//VARIABLES GLOBALES

// const players_form = document.getElementById('players_form')

let jugadores = []
let sumsByColumn = []

//ir  SCORES INGLES
function goto_scores_eng() {
	window.location.href = '/scores_eng.html'
}
//ir  SCORES ESP
function goto_scores_esp() {
	window.location.href = '/scores_esp.html'
	localStorage.clear()
}

//CREAR JUGADOR
function crear_jugador() {
    jugadores = [];

    const selectedValue = document.getElementById('inputSelector').value;

    for (let i = 0; i < selectedValue; i++) {
        const inputId = `player_${i + 1}`;
        const playerName = document.getElementById(inputId).value;

        // Crear un objeto con la propiedad 'nombre'
        const jugador = {
            nombre: playerName
        };

        jugadores.push(jugador);
    }

    console.log('Jugadores:', jugadores);

    guardar_jugador();
    goto_scores_eng();
}
  
//GUARDAR
function guardar_jugador(){
	localStorage.setItem('jugador', JSON.stringify(jugadores))
}

if (document.getElementById('scores_table')) {
	const scores_table = document.getElementById('scores_table')
	document.addEventListener('DOMContentLoaded', mostrar_tabla_jugadores)
}

//tabla jugadores
function mostrar_tabla_jugadores() {
    // Limpiar el contenido existente en la tabla
    scores_table.innerHTML = '';

    // Obtener la cantidad de hoyos
    const holes = 18;

    // Obtener la lista de jugadores desde el almacenamiento local
    jugadores = JSON.parse(localStorage.getItem('jugador'));

    console.log(jugadores);

    // Si no hay jugadores, inicializar el array
    if (jugadores === null) {
        jugadores = [];
    } else {
        // Construir la estructura de la tabla
        let tableHtml = '<div class="table-container"><table class="table table-dark table-striped text-center table-sm"><thead><tr><th scope="col">#</th>';

        // Crear las columnas de nombres de jugadores
        for (let i = 0; i < jugadores.length; i++) {
            tableHtml += `<th scope="col" class="text-uppercase col-2">${jugadores[i].nombre.slice(0, 4)}</th>`;
        }

        tableHtml += '</tr></thead><tbody>';

        // Crear las filas de hoyos y selectores
        for (let i = 1; i <= holes; i++) {
            tableHtml += `<tr scope="row" class="alto_score" id="row${i}"><td class="hole_numbers align-middle col-1 fw-bold">${i}</td>`;

            for (let j = 0; j < jugadores.length; j++) {
                tableHtml += `<td><select class="form-select px-2 my-2 player${j + 1}" aria-label="Player score select" id="player${j + 1}-hole${i}" >
                                <option selected value="0">-</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                            </td>`;
            }

            tableHtml += '</tr>';
        }

        tableHtml += '</tbody></table></div>';

        // Establecer el contenido HTML de la tabla
        scores_table.innerHTML = tableHtml;

        // Llamar a funciones adicionales para configurar los selectores
        getAllSellectElements();
        getSelectChanges();
    }
}



// Get all SELECT elements on the page
function getAllSellectElements(){
	scores_table.querySelectorAll('select').forEach((select) => {
		// Get the saved value from local storage and set the selected option
		const savedValue = localStorage.getItem(select.id)
		if (savedValue) {
			select.value = savedValue
		}

		getSelectChanges(select);

		totalSumas = JSON.parse(localStorage.getItem('sumsByColumn'))

		const results_table = document.getElementById('container_results')
		let table_results = '<table class="table table-dark text-center table-sm"><thead>'

		for (let i = 0; i < jugadores.length; i++) {
			table_results += `<th scope="col" class="text-uppercase col-2">${jugadores[i]}</th>`
		}

		table_results += '<tr>'

		for (let j = 0; j < jugadores.length; j++) {
			if (totalSumas === null || totalSumas === undefined) {
				table_results += `<td class="align-middle fs-2 final_scores" >-
					</td>`
			} else {
				table_results += `<td class="align-middle fs-2 final_scores" >${totalSumas[j]}
					</td>`
			}
		}

		table_results += '</tr></tbody></table>'
		getSelectChanges()
		results_table.innerHTML = table_results
	})
}

//EVENTO CAMBIOS SELECTIOR
function getSelectChanges(select) {
	if(select){
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
				sumsByColumn.push(parseInt(sum))
	
				if (sumsByColumn.length > jugadores.length) {
					sumsByColumn.shift()
				}
	
				localStorage.setItem('sumsByColumn', JSON.stringify(sumsByColumn))
	
				const results_table = document.getElementById('container_results');
				let table_results = '<table class="table table-dark text-center table-sm"><thead>';
				
				for (let i = 0; i < jugadores.length; i++) {
					table_results += `<th scope="col" class="text-uppercase col-2">${jugadores[i].nombre.slice(0, 4)}</th>`;
				}
				
				table_results += '<tr>';
				
				const minColumnValue = Math.min(...sumsByColumn);
				
				for (let j = 0; j < sumsByColumn.length; j++) {
					table_results += `<td class="align-middle fs-2 final_scores" >${sumsByColumn[j]}
					</td>`
				}
	
				table_results += '</tr></tbody></table>'
				results_table.innerHTML = table_results
			}
		})
	}

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
