//functions for use in games with two-players using the same computer
var p1attackArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var p1shipArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var p2attackArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
var p2shipArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
let numShipsChoice;
let hitsToWin = 0;
let whosTurn = 1;
let canSelect = true;

let p1NumHits = 0;
let p1NumShips = numShipsChoice;
let p1NumPieces;

let p2NumHits = 0;
let p2NumShips = numShipsChoice;
let p2NumPieces;

onLoad();

function onLoad() //called as soon as script is loaded
{
    configButtons = document.querySelector('#configButtons');
    
    numShipsChoice=parseInt(document.querySelector('#chooseNumShips').value);
    configButtons.remove();
    for(let i=numShipsChoice; i>0; i--)
    {
        hitsToWin += i;
    }

    document.querySelectorAll('.startButton').forEach(
        function(el){el.hidden = false;} );

    p1NumShips = numShipsChoice;
    p1NumPieces = p1NumShips;
    p2NumShips = numShipsChoice;
    p2NumPieces = p2NumShips;
    loadSelectionGrid(p1shipArr);
    document.querySelector('#ready').onclick = localIsReady;
}
function localIsReady()
{
    let boardDiv = document.querySelector('#board');
    if(p1NumShips === 0 && whosTurn === 1)
    {
        document.querySelector('#ready').disabled = true;
        document.querySelector('#reset').disabled = true;
        //load selection grid for player2
        while(boardDiv.firstChild)//deletes p1's board from screen
        {
            boardDiv.removeChild(boardDiv.lastChild);
        }
        whosTurn = 2;
        alert('P2\'s turn for ship selection');//pauses to allow player switching
        loadSelectionGrid(p2shipArr);//loads ship selection screen
        document.querySelector('#ready').disabled = false;
        document.querySelector('#reset').disabled = false;
        canSelect = true;
    }
    else if(p2NumShips === 0 && whosTurn === 2)//if player 
    {
        //p1 and p2 should have already selected ships --> load actual game board configuration
        while(boardDiv.firstChild)
        {
            boardDiv.removeChild(boardDiv.lastChild);
        }
        whosTurn = 1;
        alert('P1\'s turn for attack phase');
        document.querySelector('#ready').remove();
        document.querySelector('#reset').remove();

    }
    else
    {
        console.log('Not Ready');
    }
}
function attackLocal(row, col, el)
{
    //test
    if(whosTurn === 1)
    {
        if(p2shipArr[row][col] !== 0 )
        {
            p1NumHits++;
            attackArr[row][col] = 1;
            el.className = 'successfulAttack';
            if(p1NumHits === hitsToWin)
            {
                //let winNotification = document.createElement();
            }
            else
            {
                alert('P2\'s turn to attack');
                loadGrid(attackLocal, p2shipArr,  p2attackArr);
            }
        }
    }
    else
    {
        el.className = 'missedAttack';
        loadGrid();
    }
}

function loadSelectionGrid(playerShipArray)
{
    let canvas = document.querySelector('#notifications').querySelector('canvas');
    let notifications= canvas.getContext('2d');

    alert("Place ships in order from largest to smallest");

    if(whosTurn === 1)
    {
        notifications.fillStyle = '#c2b280';
        notifications.fillRect(0,0,100,500);
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Red';
        notifications.fillText('Choose Your Ship Positions Player1', 0, 50);
    }
    else
    {
        notifications.clearRect(0,0,500,100);
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Blue';
        notifications.fillText('Choose Your Ship Positions Player2', 0, 50);
    }

    var gameBoard = document.querySelector('#board');
    var shipBoard = document.createElement('table');

    var mouseDown = false;
    document.addEventListener("mouseup", function(){
        mouseDown = false;
    });

    gameBoard.appendChild(shipBoard);
    shipBoard.className = 'grid';
    for(i=0; i<10; i++)
    {
        var row = shipBoard.insertRow(i);
        for(j=0; j<10; j++)
        {
            shipBtn = document.createElement('button');
            shipBtn.className = 'unselectedShip';
            shipBtn.addEventListener("mousedown", function(){
                
                if(canSelect === true)
                {
                    if(whosTurn === 1)
                    {
			console.log(playerShipArray);
                        p1PlaceShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                    }
                    else
                    {
                        p2PlaceShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                    }
                    mouseDown = true;
                }
            });
            shipBtn.addEventListener("mousemove", function(){
                if(canSelect === true)
                {
                    if(mouseDown === true )
                    {
                        if(whosTurn === 1)
                        {
                            p1PlaceShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                        }
                        else if(whosTurn === 2)
                        {
                            p2PlaceShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                        }
                    }
                }
            });
            shipBtn.addEventListener("mouseup", function(){
                if(canSelect === true)
                {
                    if(whosTurn === 1)
                    {
                        p1PlaceShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                    }
                    else
                    {
                        p2PlaceShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                    }
                    mouseDown = false;
                }
            });
            var cell = row.insertCell(j);
            cell.appendChild(shipBtn);
        }
    }
}
function p1PlaceShipPiece(row, col, el, arr)
{
    if(canPlace(row, col, arr, p1NumPieces, p1NumShips) && p1NumPieces > 0 )
    {
        el.className = 'selectedShip';
	
	let color1 = "red";	//A different color is assigned to each ship placed, based on number of ships left
	switch(p1NumShips%4){
		case 0:
		color1 = "CadetBlue";
		break;
		case 1:
		color1 = "Cyan";
		break;
		case 2:
		color1 = "DarkSeaGreen";
		break;
		case 3:
		color1 = "LightGreen";
		break;
	}
	el.style.backgroundColor = color1;
        arr[row][col] = p1NumShips;
	
        p1NumPieces--;
        if(p1NumPieces === 0)
        {
            p1NumShips--;
            p1NumPieces = p1NumShips;
            shipOrientation = 0;
            console.log("ship selection over");
        }
    }
    else if(p1NumPieces === 0 && p1NumShips === 0)
    {
        console.log("selection phase over");
        canSelect = false;
    }
}
function p2PlaceShipPiece(row, col, el, arr)
{
    if(canPlace(row, col, arr, p2NumPieces, p2NumShips) && p2NumPieces > 0 )
    {
        el.className = 'selectedShip';

	let color1 = "red";	//A different color is assigned to each ship placed, based on number of ships left
	switch(p1NumShips%4){
		case 0:
		color1 = "CadetBlue";
		break;
		case 1:
		color1 = "Cyan";
		break;
		case 2:
		color1 = "DarkSeaGreen";
		break;
		case 3:
		color1 = "LightGreen";
		break;
	}
	el.style.backgroundColor = color1;

        arr[row][col] = p2NumShips;
        p2NumPieces--;
        if(p2NumPieces === 0)
        {
            p2NumShips--;
            p2NumPieces = p2NumShips;
            shipOrientation = 0;
            console.log("ship selection over");
        }
    }
    else if(p2NumPieces === 0 && p2NumShips === 0)
    {
        console.log("selection phase over");
        canSelect = false;
    }
}
function canPlace(row, col, arr, numPieces, numShips)
{
    if(arr[row][col] !== 0)
    {
        return false;
    }
    else if(numPieces === numShips)
    {
        return true;
    }
    else if(numPieces === (numShips - 1) )
    {
        if( (row-1>=0 && arr[row-1][col] === numShips) || (row+1 <10 &&arr[row+1][col] === numShips))
        {
            shipOrientation = 1;
            return true;
        }
        else if ( (col-1>=0 && arr[row][col-1] === numShips) || (col+1 <10 && arr[row][col+1] === numShips) )
        {
            shipOrientation = 2;
            return true;
        }
        else
        {
            return false;
        }        
    }
    else if(shipOrientation === 1 && numPieces>0 && ((row-1>=0 && arr[row-1][col] === numShips) ||  (row+1 <10 &&arr[row+1][col] === numShips)))
    {
        return true;
    }
    else if(shipOrientation === 2 && numPieces>0 && ((col-1>=0 && arr[row][col-1] === numShips) || (col+1 <10 && arr[row][col+1] === numShips)) )
    {
        return true;
    }
    else
    {
        return false;
    }
}