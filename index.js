var N_SIZE;
var hoverWorks = false;
var lastId;
var connectedNumber;
var arrayColors = ["No-color"];
var currentColor = random_rgba();
var positionOriginalKey;
var modeForSave;
var easySave;
var MedSave;
var hardSave

	function init(N_SIZE,mode) {
        modeForSave = mode;
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
                cell.addEventListener("mousedown",onRightClick)
                cell.id = i + " " + j;
                cell.setAttribute('height', 50);
                cell.setAttribute('width', 50);
                cell.setAttribute('align', 'center');
                cell.setAttribute('valign', 'center');
                cell.style.backgroundColor = "white";
				row.appendChild(cell);
			}
        }
        document.getElementById("king-sneeze").appendChild(board);
        if(mode == "easy"){
            document.getElementById("0 3").innerText = "2";
            document.getElementById("1 1").innerText = "1";
            document.getElementById("2 2").innerText = "2";
            document.getElementById("3 0").innerText = "3";
            document.getElementById("4 0").innerText = "1";
            document.getElementById("3 3").innerText = "3";
        }else if(mode == "medium"){
            document.getElementById("0 0").innerText = "2";
            document.getElementById("0 3").innerText = "9";
            document.getElementById("0 7").innerText = "5";
            document.getElementById("1 0").innerText = "1";
            document.getElementById("1 3").innerText = "8";
            document.getElementById("1 5").innerText = "11";
            document.getElementById("1 8").innerText = "5";
            document.getElementById("2 1").innerText = "2";
            document.getElementById("2 4").innerText = "6";
            document.getElementById("2 6").innerText = "7";
            document.getElementById("3 5").innerText = "11";
            document.getElementById("3 7").innerText = "10";
            document.getElementById("4 3").innerText = "7";
            document.getElementById("5 3").innerText = "4";
            document.getElementById("6 7").innerText = "3";
            document.getElementById("6 8").innerText = "6";
            document.getElementById("7 1").innerText = "9";
            document.getElementById("7 3").innerText = "4";
            document.getElementById("7 4").innerText = "8";
            document.getElementById("8 1").innerText = "1";
            document.getElementById("8 7").innerText = "10";
            document.getElementById("8 8").innerText = "3";
        }else if(mode == "hard"){
            document.getElementById("0 0").innerText = "1";
            document.getElementById("0 4").innerText = "3";
            document.getElementById("0 6").innerText = "5";
            document.getElementById("0 8").innerText = "2";
            document.getElementById("1 6").innerText = "8";
            document.getElementById("1 7").innerText = "5";
            document.getElementById("2 0").innerText = "7";
            document.getElementById("2 1").innerText = "4";
            document.getElementById("2 3").innerText = "6";
            document.getElementById("3 6").innerText = "1";
            document.getElementById("4 8").innerText = "2";
            document.getElementById("5 2").innerText = "4";
            document.getElementById("7 1").innerText = "7";
            document.getElementById("7 6").innerText = "3";
            document.getElementById("8 3").innerText = "6";
            document.getElementById("8 8").innerText = "8";
        }
    }  
    
    function onUp(){
        if((this.innerText == connectedNumber) && positionOriginalKey != this.id && this.style.backgroundColor != "white"){
            arrayColors += currentColor;
            positionOriginalKey = "";
        }else{
            var table = document.getElementById("board");
            for (let row of table.rows) 
            {
                for(let cell of row.cells) 
                {
                   if(!(arrayColors.includes(cell.style.backgroundColor))){
                        cell.style.backgroundColor = "white";
                   }
                }
            }
        }

        connectedNumber = ""
        lastId = undefined;
        hoverWorks = false;
        currentColor = random_rgba();
        isWin()
    }
    
    function onHover(){
        var isMoveHor = Math.abs(Number(this.id[0]) - Number(lastId[0])) == 1 && this.id[2] == lastId[2];
        var isMoveVer = Math.abs(Number(this.id[2]) - Number(lastId[2])) == 1 && this.id[0] == lastId[0];
        var oneThingAtATime = true;
        if(hoverWorks){
            if( (isMoveVer || isMoveHor) && (this.innerText == "" || (this.innerText == connectedNumber)) && this.style.backgroundColor == "white"){
                this.style.backgroundColor = currentColor;
                lastId = this.id;
                oneThingAtATime = false
            }
            
            if(oneThingAtATime && (isMoveVer || isMoveHor) && (this.innerText == "" || (this.innerText == connectedNumber)) && document.getElementById(lastId).style.backgroundColor != "white" && this.style.backgroundColor != "white"){
                document.getElementById(lastId).style.backgroundColor = "white";
                lastId = this.id;
                console.log("HI")
            }
            
        }
    }

    function onclick(event) {
        if(event.button == 0){
            if(!(this.innerText == "") && this.style.backgroundColor == "white"){
                this.style.backgroundColor = currentColor;
                connectedNumber = this.innerText;
                hoverWorks = true;
                lastId = this.id;
                positionOriginalKey = this.id;
            }
        }
    }

    function random_rgba() {
        do{
        var o = Math.round, r = Math.random, s = 255;
        var color = 'rgba(' + o(r()*s) + ', ' + o(r()*s) + ', ' + o(r()*s) + ', ' + r().toFixed(1) + ')';
        }while(arrayColors.includes(color))
        return color;
    }
      

    function onRightClick(event){
        colorDel = this.style.backgroundColor;
        if(event.button == 2){
            var table = document.getElementById("board");
            for (let row of table.rows) 
            {
                for(let cell of row.cells) 
                {
                    if(cell.style.backgroundColor == colorDel){
                        cell.style.backgroundColor = "white";
                    }
                }
            }
        }
    }

function isWin(){
        var table = document.getElementById("board");
        var allColored = true;
        for (let row of table.rows) 
        {
            for(let cell of row.cells) 
            {
                if(cell.style.backgroundColor != "white"){
                    allColored = true;
                }else{
                    allColored = false;
                    break;
                }
                if(!allColored){
                    break;
                }
                
            }
        }
        if(allColored){
            alert("You won " + modeForSave + " level");
            modeForSave = undefined;         
        }
}
var buutonEasy = document.getElementById("Easy");
var buttonMid = document.getElementById("Medium");
var buttonHard = document.getElementById("Hard");
var buttonNewGame = document.getElementById("NewGame");

buutonEasy.addEventListener("click",onClickEasy);
buttonMid.addEventListener("click",onClickMid);
buttonHard.addEventListener("click",onClickHard);
buttonNewGame.addEventListener("click",onClickNewGame);

function onClickEasy() {
    if(modeForSave == undefined || modeForSave != "easy"){
        if(modeForSave == "medium"){
            MedSave = document.getElementById("board").innerHTML;
        }else if(modeForSave == "hard"){
            hardSave = document.getElementById("board").innerHTML;
        }

        if(document.getElementById("board")){
            document.getElementById("board").parentNode.removeChild(document.getElementById("board"));
        }
        if(easySave == undefined){
            init(5,"easy");
        }else{
            modeForSave = "easy";
            var board = document.createElement('table');
            board.id = "board";
            board.setAttribute("border", 1);
            board.setAttribute("cellspacing", 0);
            board.innerHTML = easySave;
            document.getElementById("king-sneeze").appendChild(board);
            var table = document.getElementById("board");
            for (let row of table.rows) 
            {
                for(let cell of row.cells) {
                    cell.addEventListener("mousedown",onclick);
                    cell.addEventListener("mouseover",onHover);
                    cell.addEventListener("mouseup",onUp);
                    cell.addEventListener("mousedown",onRightClick)
                }
            }
        }
    }
}
function onClickMid() {
    if(modeForSave == undefined || modeForSave != "medium"){
        if(modeForSave == "easy"){
            easySave = document.getElementById("board").innerHTML;
        }else if(modeForSave == "hard"){
            hardSave = document.getElementById("board").innerHTML;
        }

        if(document.getElementById("board")){
            document.getElementById("board").parentNode.removeChild(document.getElementById("board"));
        }
        if(MedSave == undefined){
            init(9,"medium");
        }else{
            modeForSave = "medium";
            var board = document.createElement('table');
            board.id = "board";
            board.setAttribute("border", 1);
            board.setAttribute("cellspacing", 0);
            board.innerHTML = MedSave;
            document.getElementById("king-sneeze").appendChild(board);
            var table = document.getElementById("board");
            for (let row of table.rows) 
            {
                for(let cell of row.cells) 
                {
                    cell.addEventListener("mousedown",onclick);
                    cell.addEventListener("mouseover",onHover);
                    cell.addEventListener("mouseup",onUp);
                    cell.addEventListener("mousedown",onRightClick)
                }
            }
        }
    }
}
function onClickHard() {
    if(modeForSave == undefined || modeForSave != "hard"){
        if(modeForSave == "easy"){
            easySave = document.getElementById("board").innerHTML;
        }else if(modeForSave == "medium"){
            MedSave = document.getElementById("board").innerHTML;
        }

        if(document.getElementById("board")){
            document.getElementById("board").parentNode.removeChild(document.getElementById("board"));
        }
        if(hardSave == undefined){
            init(9,"hard");
        }else{
            modeForSave = "hard";
            var board = document.createElement('table');
            board.id = "board";
            board.setAttribute("border", 1);
            board.setAttribute("cellspacing", 0);
            board.innerHTML = MedSave;
            document.getElementById("king-sneeze").appendChild(board);
            var table = document.getElementById("board");
            for (let row of table.rows) 
            {
                for(let cell of row.cells) 
                {
                    cell.addEventListener("mousedown",onclick);
                    cell.addEventListener("mouseover",onHover);
                    cell.addEventListener("mouseup",onUp);
                    cell.addEventListener("mousedown",onRightClick)
                }
            }
        }
    }
}

function onClickNewGame(){
    modeForSave = undefined;
    easySave = undefined;
    MedSave = undefined;
    hardSave = undefined;
    if(document.getElementById("board")){
        document.getElementById("board").parentNode.removeChild(document.getElementById("board"));
    }
}
