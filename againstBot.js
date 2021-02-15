//separate methods for use in game against bot
//may be implemented in server later
var botHits = 0;
let prevRow;
let prevCol;
let botNumShips;

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

function attackBot(row, col, el)
{
    //test
    if(botArr[row][col] === 1 && attackArr[row][col] === 0)
    {
        numHits++;
        if(numHits == numPieces)
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
    //test
    botAttackRow =  Math.random()*10 | 0;
    botAttackCol = Math.random()*10 | 0;

    if(shipArr[botAttackRow][botAttackCol] !== 0)
    {
        console.log('bot hit');
        botHits++;
        botAttackRow =  Math.random()*10 | 0;
        botAttackCol = Math.random()*10 | 0;
        shipArr[botAttackRow][botAttackCol] = 6;
        document.querySelector('#boardDiv').querySelector('table').rows[botAttackRow].cells[botAttackCol].querySelector('.selectedShip').className = 'attackedShip';
        //change shipArr to reflect a hit
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

// function 
// {
//     for(let i=numShipsChoice; i>0; i++)
//     {
//         //fill a horizontal or vertical line in the 2d array with ones
//     }
// }