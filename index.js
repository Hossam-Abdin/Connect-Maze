var N_SIZE = 5;
        
	function init() {
		var board = document.createElement('table');
        board.setAttribute("border", 1);
        board.setAttribute("cellspacing", 0);    
		for (var i = 0; i < N_SIZE; i++) {
			var row = document.createElement('tr');
			board.appendChild(row);
			for (var j = 0; j < N_SIZE; j++) {
                var cell = document.createElement('td');
                cell.id = i + " " + j;
                cell.setAttribute('height', 80);
                cell.setAttribute('width', 80);
                cell.setAttribute('align', 'center');
                cell.setAttribute('valign', 'center');
				row.appendChild(cell);
			}
        }
        

        document.getElementById("king-sneeze").appendChild(board);
        document.getElementById("0 3").innerText = "2";
        document.getElementById("1 1").innerText = "1";
        document.getElementById("2 2").innerText = "2";
        document.getElementById("3 0").innerText = "3";
        document.getElementById("4 0").innerText = "1";
        document.getElementById("3 3").innerText = "3";

	}

init();