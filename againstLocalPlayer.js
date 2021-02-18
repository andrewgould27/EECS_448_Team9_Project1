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

let canvas = document.querySelector('#notifications').querySelector('canvas');
let notifications= canvas.getContext('2d');

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
function localIsReady()//if player 1 is ready for attack phase
{
    let boardDiv = document.querySelector('#board');
    if(p1NumShips === 0 && whosTurn === 1)
    {
        document.querySelector('#ready').disabled = true;
        document.querySelector('#reset').disabled = true;
        
        while(boardDiv.firstChild)//deletes p1's board from screen
        {
            boardDiv.removeChild(boardDiv.lastChild);
        }

        whosTurn = 2;
        setTimeout(() => {
            loadSelectionGrid(p2shipArr);//loads ship selection screen
            document.querySelector('#ready').disabled = false;
            document.querySelector('#reset').disabled = false;
            canSelect = true;
        }, 3000);//pauses to allow player switching
        
    }
    else if(p2NumShips === 0 && whosTurn === 2)//if player 2 is ready for attack phase
    {
        //p1 and p2 should have already selected ships --> load actual game board configuration
        while(boardDiv.firstChild)
        {
            boardDiv.removeChild(boardDiv.lastChild);
        }
        whosTurn = 1;
        setTimeout(3000, () => {alert('Switch to P1')});
        document.querySelector('#ready').remove();
        document.querySelector('#reset').remove();
        canSelect = true;
        notifications.clearRect(0,0,500,100);
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Red';
        notifications.fillText('P1\'s turn to attack', 0, 50);
        loadPlayGrid(p1shipArr, p1attackArr);
    }
    else
    {
        console.log('Not Ready');
    }
}
function attackLocal(row, col, attackArr, el)
{
    //test
    let boardDiv = document.querySelector('#board');

    if(whosTurn === 1)
    {
        if(p2shipArr[row][col] !== 0 )
        {
            p1NumHits++;
            attackArr[row][col] = 1;
            el.className = 'successfulAttack';
            if(p1NumHits === hitsToWin)
            {
                notifications.clearRect(0,0,500,100);
                notifications.font = '30px Arial';
                notifications.fillStyle = 'Red';
                notifications.fillText('P1 YOU WIN!', 0, 50);
            }
            else
            {
                whosTurn = 2;
                window.setTimeout(3000, () => {alert('Switch to P2');});
                notifications.clearRect(0,0,500,100);
                notifications.font = '30px Arial';
                notifications.fillStyle = 'Blue';
                notifications.fillText('P2\'s turn to attack', 0, 50);
                while(boardDiv.firstChild)
                {
                    boardDiv.removeChild(boardDiv.lastChild);
                }
                loadPlayGrid(p2shipArr, p2attackArr);
                canSelect = true;
            }
        }
        else
        {
            attackArr[row][col] = -1;
            el.className = 'missedAttack';
            whosTurn = 2;
            window.setTimeout(3000, () => {alert('Switch to P2')});
            notifications.clearRect(0,0,500,100);
            notifications.font = '30px Arial';
            notifications.fillStyle = 'Blue';
            notifications.fillText('P2\'s turn to attack', 0, 50);
            while(boardDiv.firstChild)
            {
                boardDiv.removeChild(boardDiv.lastChild);
            }
            loadPlayGrid(p2shipArr, p2attackArr);
            canSelect = true;
        }
    }
    else
    {
        if(p1shipArr[row][col] !== 0 )
        {
            p2NumHits++;
            attackArr[row][col] = 1;
            el.className = 'successfulAttack';
            if(p2NumHits === hitsToWin)
            {
                notifications.clearRect(0,0,500,100);
                notifications.font = '30px Arial';
                notifications.fillStyle = 'Blue';
                notifications.fillText('P2 YOU WIN!', 0, 50);
            }
            else
            {
                whosTurn = 1;
                window.setTimeout(3000, () => {alert('Switch to P1')});
                notifications.clearRect(0,0,500,100);
                notifications.font = '30px Arial';
                notifications.fillStyle = 'Red';
                notifications.fillText('P1\'s turn to attack', 0, 50);
                while(boardDiv.firstChild)
                {
                    boardDiv.removeChild(boardDiv.lastChild);
                }
                loadPlayGrid(p1shipArr, p1attackArr);
                canSelect = true;
            }
        }
        else
        {
            attackArr[row][col] = -1;
            el.className = 'missedAttack';
            whosTurn = 1;
            window.setTimeout(3000, () => {alert('Switch to P1')});
            notifications.clearRect(0,0,500,100);
            notifications.font = '30px Arial';
            notifications.fillStyle = 'Red';
            notifications.fillText('P1\'s turn to attack', 0, 50);
            while(boardDiv.firstChild)
            {
                boardDiv.removeChild(boardDiv.lastChild);
            }
            loadPlayGrid(p1shipArr, p1attackArr);
            canSelect = true;
        }
    }
}

function loadPlayGrid(shipArr, attackArr)
{
    if(whosTurn === 1)
    {
        notifications.clearRect(0,0,500,100);
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Red';
        notifications.fillText('Choose your attack position (P1)', 0, 50);
    }
    else
    {
        notifications.clearRect(0,0,500,100);
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Blue';
        notifications.fillText('Choose your attack position (P2)', 0, 50);
    }
    var gameBoard = document.querySelector('#board');
    var shipBoard = document.createElement('table');
    var attackBoard = document.createElement('table');

    gameBoard.appendChild(shipBoard);
    gameBoard.appendChild(attackBoard);
    shipBoard.className = 'grid';
    attackBoard.className = 'grid';
    for(let i=0; i<10; i++)
    {
        let row = shipBoard.insertRow(i);
        let cell;
        for(let j=0; j<10; j++)
        {
            shipBtn = document.createElement('button');
            switch(shipArr[i][j]){
                case 1:
                    shipBtn.className = 'ship_1';
                    break;
                case 2:
                    shipBtn.className = 'ship_2';
                    break;
                case 3:
                    shipBtn.className = 'ship_3';
                    break;
                case 4:
                    shipBtn.className = 'ship_4';
                    break;
                case 5:
                    shipBtn.className = 'ship_5';
                    break;        
                case 6:
                    shipBtn.className = 'ship_6';
                    break;
                case -1:
                    shipBtn.className = 'attackedShip';
                    break;
                case 0:
                    shipBtn.className = 'unselectedShip';
                    break;
            }
            cell = row.insertCell(j);
            cell.appendChild(shipBtn);
        }
        

        
        row = attackBoard.insertRow(i);
        for(let k=0; k<10; k++)
        {
            var atkBtn = document.createElement('button');
            switch(attackArr[i][k]){
                case 1:
                    atkBtn.className = 'successfulAttack';
                    break;
                case 0:
                    atkBtn.className = 'attackChoice';
                    break;
                case -1:
                    atkBtn.className = 'missedAttack';
                    break;
            }
            atkBtn.addEventListener("click", function(){
                let row = this.parentNode.parentNode.rowIndex;
                let col = this.parentNode.cellIndex;
                if(attackArr[row][col] === 0 && canSelect === true)
                {
                    canSelect = false;
                    attackLocal(row, col, attackArr, this);

                }
            });

            cell = row.insertCell(k);
            cell.appendChild(atkBtn);
        }
        
    }
}
function loadSelectionGrid(playerShipArray)
{
    if(whosTurn === 1)
    {
        notifications.clearRect(0,0,500,100);
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
        switch(p1NumShips%7){//modified to use css styling
            case 1:
                el.className = 'ship_1';
                break;
            case 2:
                el.className = 'ship_2';
                break;
            case 3:
                el.className = 'ship_3';
                break;
            case 4:
                el.className = 'ship_4';
                break;
            case 5:
                el.className = 'ship_5';
                break;        
            case 6:
                el.className = 'ship_6';
                break;
        }
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
        switch(p2NumShips%7){//modified to use css styling
            case 1:
                el.className = 'ship_1';
                break;
            case 2:
                el.className = 'ship_2';
                break;
            case 3:
                el.className = 'ship_3';
                break;
            case 4:
                el.className = 'ship_4';
                break;
            case 5:
                el.className = 'ship_5';
                break;        
            case 6:
                el.className = 'ship_6';
                break;
        }
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
function resetShipGrid()
{
    console.log('reset button selected');
    document.querySelectorAll('.ship_6, .ship_5, .ship_4, .ship_3, .ship_2, .ship_1').forEach(function(el){
        el.className = 'unselectedShip';
    });
    canSelect = true;
    shipOrientation = 0;
    if(whosTurn === 1)
    {
        p1NumShips=numShipsChoice;
        p1NumPieces=p1NumShips;
    }
    if(whosTurn === 2)
    {
        p2NumShips=numShipsChoice;
        p2NumPieces=p2NumShips;
    }
    

    for(let i=0; i<10; i++)
    {
        if(whosTurn === 1)
        {
            for(let j=0; j<10; j++)
            {
                p1shipArr[i][j]=0;
            }
        }
        else
        {
            for(let j=0; j<10; j++)
            {
                p2shipArr[i][j]=0;
            }
        }
        
    }
}