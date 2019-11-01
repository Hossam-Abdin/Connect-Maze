var N_SIZE = 5;
var hoverWorks = false;
var lastId;
var connectedNumber;
var currentColor = random_rgba();
        
	function init() {
        var board = document.createElement('table');
        board.id = "board";
        board.setAttribute("border", 1);
        board.setAttribute("cellspacing", 0);    
		for (var i = 0; i < N_SIZE; i++) {
			var row = document.createElement('tr');
			board.appendChild(row);
			for (var j = 0; j < N_SIZE; j++) {
                var cell = document.createElement('td');
                cell.addEventListener("mousedown",onclick);
                cell.addEventListener("mouseover",onHover);
                cell.addEventListener("mouseup",onUp);
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
    
    function onUp(){
        if(!(this.innerText == connectedNumber)){
            var table = document.getElementById("board");
            for (let row of table.rows) 
            {
                for(let cell of row.cells) 
                {
                    console.log(currentColor);
                    console.log(cell.style.backgroundColor);
                    console.log(cell.id);
                   if(cell.style.backgroundColor == currentColor){
                       cell.style.backgroundColor = "white";
                   }
                }
            }
        }

        connectedNumber = ""
        lastId = undefined;
        hoverWorks = false;
        currentColor = random_rgba();
    }
    
    function onHover(){
        var isMoveVer = Math.abs(Number(this.id[0]) - Number(lastId[0])) == 1 && this.id[2] == lastId[2];
        var isMoveHor = Math.abs(Number(this.id[2]) - Number(lastId[2])) && this.id[0] == lastId[0];
        if(hoverWorks){
            if( (isMoveVer || isMoveHor) && (this.innerText == "" || (this.innerText == connectedNumber)) && this.style.backgroundColor != "green"){                
                this.style.backgroundColor = currentColor;
                lastId = this.id;
            }
        }
    }

    function onclick() {
        if(!(this.innerText == "")){
            this.style.backgroundColor = currentColor;
            connectedNumber = this.innerText;
            hoverWorks = true;
            lastId = this.id;
        }
    }

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ', ' + o(r()*s) + ', ' + o(r()*s) + ', ' + r().toFixed(1) + ')';
    }
      
init();