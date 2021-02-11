//separate methods for use in game against bot
//may be implemented in server later
var botHits = 0;
let prevRow;
let prevCol;
var botArr = [
    [1, 1, 0, 0, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 1, 1, 0],
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
    botAttackRow =  0;
    botAttackCol = 0;

    if(shipArr[botAttackRow][botAttackCol] !== 0)
    {
        console.log('bot hit');
        botHits++;
        prevRow = botAttackRow;
        prevCol = botAttackCol;
        shipArr[botAttackRow][botAttackCol] = 6;
        document.querySelector('#boardDiv').querySelector('table').rows[botAttackRow].cells[botAttackCol].querySelector('.selectedShip').className = 'attackedShip';
        
        //change shipArr to reflect a hit
        canAttack = true;
    }
    else
    {
        console.log('bot missed');
        canAttack = true;
    }
}


function botIsReady()
{
    if(numShips == 0)
    {
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