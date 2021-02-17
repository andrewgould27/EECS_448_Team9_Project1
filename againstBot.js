//separate methods for use in game against bot
var numShipsChoice;
var canSelect = true;
var numHits = 0;
var canAttack = false;
var shipOrientation = 0;
var numShips;  
var numPieces;
var hitsToWin = 0;
var botHits = 0;
// let prevRow;
// let prevCol;
let botNumShips;

var attackArr = [
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
var shipArr = [
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
var botArr = [
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
onLoad();
function onLoad()
{
    configButtons = document.querySelector('#configButtons');
    
    numShipsChoice=parseInt(document.querySelector('#chooseNumShips').value);
    configButtons.remove();
    for(let i=numShipsChoice; i>0; i--)
    {
        hitsToWin += i;
    }

    numShips = numShipsChoice;
    document.querySelectorAll('.startButton').forEach((el) => {el.hidden = false});
    loadGrid(attackBot);
    document.querySelector('#ready').onclick = botIsReady;
}
//bot related methods
function attackBot(row, col, el)
{
    if(botArr[row][col] === 1)
    {
        numHits++;
        attackArr[row][col] = 1;
        el.className = 'successfulAttack';
        if(numHits === hitsToWin)
        {
            //let winNotification = document.createElement();
        }
        botTurn();
    }
    else
    {
        el.className = 'missedAttack';
        botTurn();
    }
}

function botTurn()
{
    botAttackRow =  Math.random()*10 | 0;
    botAttackCol = Math.random()*10 | 0;

    if(shipArr[botAttackRow][botAttackCol] !== 0)
    {
        console.log('bot hit');
        botHits++;
        botAttackRow =  Math.random()*10 | 0;
        botAttackCol = Math.random()*10 | 0;
        shipArr[botAttackRow][botAttackCol] = 6;
        document.querySelector('#boardDiv').querySelector('table').rows[botAttackRow].cells[botAttackCol].querySelector('.selectedShip').className = 'attackedShip';//change shipArr to reflect a hit
        canAttack = true;
    }
    else
    {
        console.log('bot missed');
        botAttackRow =  Math.random()*10 | 0;
        botAttackCol = Math.random()*10 | 0;
        canAttack = true;
    }
}

function generateShips()
{
    let numPlacementTries = [0,0,0,0,0];
    for(let i = numShipsChoice; i>0; i--)
    {
        let startRow=Math.random()*10 | 0;
        let startCol=Math.random()*10 | 0;
        console.log('Trying to place ship at (', startRow, startCol, ')');
        while(!placeShip(startRow, startCol, i))
        {
            numPlacementTries[i]++;
            startRow=Math.random()*10 | 0;
            startCol=Math.random()*10 | 0;
            console.log('Trying to place ship of length ',i, ' at (', startRow, startCol, ')');
        }
    }
    //for testing
    console.log('number of tries for placing each ship:', numPlacementTries);
    console.log(botArr);
}

function placeShip(row, col, shipLength)//tries to place a ship using a given index of a double array, returns false if the ship could not be placed
{
    let orientation = Math.random()*2 | 0;
    let right;
    let up;
    if(orientation == 0)
    {
        let canPlaceHorizontalLeft = true;
        let canPlaceHorizontalRight = true;
        for(let i=shipLength; i>0; i--)
        {
            if(col-i+1<0 || botArr[row][col-i+1] !== 0)
            {
                canPlaceHorizontalLeft = false;
                break;
            }
        }
        for(let i=botNumShips; i>0; i--)
        {
            if(col+i-1<0 || botArr[row][col+i-1] !== 0)
            {
                canPlaceHorizontalRight = false;
                break;
            }
        }
        if(canPlaceHorizontalRight && canPlaceHorizontalLeft)
        {
            right = Math.random()*2 | 0;
        }
        else if(canPlaceHorizontalLeft === true)
        {
            right=0;
        }
        else if(canPlaceHorizontalRight === true)
        {
            right=1;
        }
        else
        {
            return false;
        }

        for(let i=shipLength; i>0; i--)
        {
            if(right===0)
            {
                botArr[row][col-i+1] = 1;
            }
            else
            {
                botArr[row][col+i-1] = 1;
            }
        }
        return true;
        
    }
    else
    {
        let canPlaceVerticalUp = true;
        let canPlaceVerticalDown = true;
        for(let i=shipLength; i>0; i--)
        {
            if(row-i+1<0 || botArr[row-i+1][col] !== 0)
            {
                canPlaceVerticalUp = false;
                break;
            }
        }
        for(let i=botNumShips; i>0; i--)
        {
            if(row+i-1>9 || botArr[row+i-1][col] !== 0)
            {
                canPlaceVerticalDown = false;
                break;
            }
        }
        if(canPlaceVerticalUp && canPlaceVerticalDown)
        {
            up = Math.random()*2 | 0;
        }
        else if(canPlaceVerticalDown === true)
        {
            up = 0;
        }
        else if(canPlaceVerticalUp === true)
        {
            up = 1;
        }
        else
        {
            return false;
        }
        
        for(let i=shipLength; i>0; i--)
        {
            if(up===0)
            {
                botArr[row+i-1][col] = 1;
            }
            else
            {
                botArr[row-i+1][col] = 1;
            }
        }
        return true;
    }
}

//player functions
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
                    if(mouseDown === true && numPieces>0)
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
    else if(numPieces == 0 && numShips == 0)
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
function botIsReady()
{
    if(numShips == 0)
    {
        generateShips();
        canAttack = true;
        document.querySelector('#ready').disabled = true;
        document.querySelector('#reset').disabled = true;
        
        //notify user they can now attack

    }
    else
    {
        console.log("No you are not.");
        //debugging
    }
}