//this file should now be deprecated
//using for copy pasting functions to other files

var numShipsChoice;
var canSelect = true;
var numHits = 0;
var canAttack = false;
var shipOrientation = 0;
var numShips;  
var numPieces;
var hitsToWin = 0;


//main function calls loadgrid and passes the function used by the player for attacking
//also handles the player's choice for number of ships
function main(gameType)
{
    shipNumSelect = document.createElement('select');
    configButtons = document.querySelector('#configButtons');
    numShipsChoice=parseInt(document.querySelector('#chooseNumShips').value);
    for(let i=numShipsChoice; i>0; i--)
    {
        hitsToWin += i;
    }
    numShips=numShipsChoice;
    leftToPlace=numShips;
    configButtons.remove();
    document.querySelectorAll('.startButton').forEach(
            function(el){el.hidden = false;} );
    if(gameType.id === 'botGame')
    {
        loadGrid(attackBot);
        document.querySelector('#ready').onclick = botIsReady;
    }
    else if(gameType.id === 'local')
    {
        whosTurn = 1;
        p1NumShips = numShipsChoice;
        p1NumPieces = p1NumShips;
        p2NumShips = numShipsChoice;
        p2NumPieces = p2NumShips;
        
        loadSelectionGrid(p1shipArr);
        document.querySelector('#ready').onclick = localIsReady;
    }
    // else if(gameType.id === 'onlineGame')//for possible game against another player
    // {
    //     loadGrid(attackPlayer);
    // }
    console.log(numShips);
    console.log(leftToPlace);
}

function loadGrid(attackFunc)
{
    var gameBoard = document.querySelector('#board');
    var shipBoard = document.createElement('table');
    var attackBoard = document.createElement('table');
    var mouseDown = false;
    
    document.addEventListener("mouseup", function(){
        mouseDown = false;
    });

    gameBoard.appendChild(shipBoard);
    gameBoard.appendChild(attackBoard);

    shipBoard.className = 'grid';
    attackBoard.className = 'grid';

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
                    //console.log("d");
                    placeShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, shipArr);
                    mouseDown = true;
                }
            });
            shipBtn.addEventListener("mousemove", function(){
                if(canSelect === true)
                {
                    if(mouseDown === true && leftToPlace>0)
                    {
                        placeShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, shipArr);
                    }
                }
            });
            shipBtn.addEventListener("mouseup", function(){
                if(canSelect === true)
                {
                    placeShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, shipArr);
                    
                    mouseDown = false;
                }
            });
            var cell = row.insertCell(j);
            cell.appendChild(shipBtn);
        }
        
  
        row = attackBoard.insertRow(i);
        for(j=0; j<10; j++)
        {
            var atkBtn = document.createElement('button');
            atkBtn.className = 'attackChoice';
            atkBtn.addEventListener("click", function(){
                if(attackArr[this.parentNode.parentNode.rowIndex][this.parentNode.cellIndex] === 0 && canAttack)
                {
                    this.className = 'pendingAttack';
                    canAttack = false;
                    attackFunc(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this);
                }
            });

            cell = row.insertCell(j);
            cell.appendChild(atkBtn);
        }
    }
}

function resetShipGrid()
{
    console.log('reset button selected');
    document.querySelectorAll('.selectedShip').forEach(function(el){
        el.className = 'unselectedShip';
    });
    canSelect = true;
    shipOrientation = 0;
    numShips=numShipsChoice;
    leftToPlace=numShips;
    for(var i=0; i<10; i++)
    {
        for(var j=0; j<10; j++)
        {
            shipArr[i][j]=0;
        }
    }
}

function placeShipPiece(row, col, el, arr)
{
    if(canPlace(row, col, arr) && numPieces > 0 )
    {
        el.className = 'selectedShip';
        arr[row][col] = numShips;
        numPieces--;
        if(numPieces == 0)
        {
            numShips--;
            numPieces = numShips;
            shipOrientation = 0;
            console.log("ship selection over");
        }
    }
    else if(leftToPlace == 0 && numShips == 0)
    {
        console.log("selection phase over");
        canSelect = false;
    }
}

function canPlace(row, col, arr)
{
    if(arr[row][col] !== 0)
    {
        return false;
    }
    else if(leftToPlace === numShips)
    {
        return true;
    }
    else if(leftToPlace === (numShips - 1) )
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