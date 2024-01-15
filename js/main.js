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
}

//CREAR JUGADOR
function crear_jugador() {
    jugadores = [];
    sumsByColumn = [];

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

	localStorage.clear()
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
        let tableHtml = '<div class="table-container" id="table-container"><table class="table table-dark text-center table-sm"><thead><tr><th scope="col" id="score_flag"><img src="/img/hole.png"></th>';

        // Crear las columnas de nombres de jugadores
        for (let i = 0; i < jugadores.length; i++) {
            tableHtml += `<th scope="col" class="text-uppercase col_width">${jugadores[i].nombre.slice(0, 4)}</th>`;
        }

        tableHtml += '</tr></thead><tbody>';

        // Crear las filas de hoyos y selectores
        for (let i = 1; i <= holes; i++) {
            tableHtml += `<tr scope="row" class="alto_score" id="row${i}"><td class="hole_numbers align-middle col-1 fw-bold">${i}</td>`;

            for (let j = 0; j < jugadores.length; j++) {
                tableHtml += `<td><select class="form-select selector_width mx-auto player${j + 1}" aria-label="Player score select " id="player${j + 1}-hole${i}" >
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
		mostrar_tabla_resultados();
	})
}

function mostrar_tabla_resultados() {
    // Obtener datos del almacenamiento local
    jugadores = JSON.parse(localStorage.getItem('jugador'));
    totalSumas = JSON.parse(localStorage.getItem('sumsByColumn'));

    // Verificar si hay datos antes de proceder
    if (!jugadores || !Array.isArray(jugadores) || jugadores.length === 0 || !totalSumas ) {
        console.log("No hay datos válidos para mostrar.");
        return;
    }

    // Encontrar el índice del jugador con la puntuación más baja
    let indicePuntuacionMinima = 0;
    for (let i = 1; i < totalSumas.length; i++) {
        if (totalSumas[i] < totalSumas[indicePuntuacionMinima]) {
            indicePuntuacionMinima = i;
        }
    }

    const results_table = document.getElementById('container_results');
    let table_results = '<table class="table table-dark text-center table-sm">';

    // Encabezados de columna
    table_results += '<th scope="col" class="text-uppercase col-4 fs-5">JUGADOR</th>';
    table_results += '<th scope="col" class="text-uppercase col-4 fs-5">TOTAL</th>';
    table_results += '<th scope="col" class="text-uppercase col-4 fs-5">LIDER</th>';

    // Contenido de la tabla
    for (let i = 0; i < jugadores.length; i++) {
        table_results += '<tr>';
        // Columna de jugadores
        table_results += `<td class="align-middle fs-5 text-uppercase">${jugadores[i].nombre}</td>`;
        // Columna de sumas totales
        if (totalSumas === null || totalSumas === undefined) {
            table_results += `<td class="align-middle fs-5 final_scores">-</td>`;
        } else {
            table_results += `<td class="align-middle fs-5 final_scores">${totalSumas[i]}</td>`;
        }
        // Columna de LIDER con imagen
        table_results += `<td class="align-middle">${i === indicePuntuacionMinima ? '<img src="/img/trofeogolf.png" alt="LIDER" />' : ''}</td>`;
        table_results += '</tr>';
    }

    table_results += '</tbody></table>';
    results_table.innerHTML = table_results;
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
	
				mostrar_tabla_resultados();
			}
		})
	}

}




