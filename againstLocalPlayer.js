/**
 * @file Functions, methods, and DOM modifications for playing a local-two player game.
 * @author Team 9
 */

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

let numShipsChoice = 0;
let hitsToWin = 0;
let whosTurn;
let canSelect = true;

let p1NumHits = 0;
let p1NumShips = numShipsChoice;
let p1NumPieces;

let p2NumHits = 0;
let p2NumShips = numShipsChoice;
let p2NumPieces;

let canvas = document.querySelector('#notifications').querySelector('canvas');
let notifications= canvas.getContext('2d');
notifications.font = '30px Arial';
notifications.textAlign = 'center';

let rowLabelsCanvas = document.createElement('canvas');
let rowLabels = rowLabelsCanvas.getContext('2d');
rowLabels.font = '50px Arial';
rowLabels.textAlign = 'center';

let colLabelsCanvas = document.createElement('canvas');
let colLabels = colLabelsCanvas.getContext('2d');
colLabels.font = '50px Arial';
colLabels.textAlign = 'center';

let gameNumber = 1;

function playSound(src){
    this.playSound=document.createElement('audio')
    this.playSound.setAttribute('id', 'music')
    this.playSound.src=src
    this.playSound.setAttribute('preload','auto')
    this.playSound.style.display='none'
    document.body.appendChild(this.playSound)
    this.play=function(){
        this.playSound.play()
        let x=document.getElementById('music')
        x.loop=true
    }
    this.stop=function(){
        this.playSound.pause()
    }
}

onLoad();

/**
 * Configures variables for game counters and win conditions and removes configuration buttons. 
 * Loads the ship selection screen
 * for Player 1.
 */
function onLoad() //called as soon as script is loaded
{
    whosTurn = 1;
    canSelect = true;
    configButtons = document.querySelector('#configButtons');

    if(numShipsChoice===0)
    {
        numShipsChoice = parseInt(document.querySelector('#chooseNumShips').value);
        for(let i=numShipsChoice; i>0; i--)
        {
            hitsToWin += i;
        }
    }
    while(configButtons.firstChild)//deletes p1's board from screen
    {
        configButtons.removeChild(configButtons.lastChild);
    }
    
    document.querySelectorAll('.startButton').forEach(
        function(el){el.hidden = false;} );

    p1NumShips = numShipsChoice;
    p1NumPieces = p1NumShips;
    p1NumHits = 0;
    p2NumShips = numShipsChoice;
    p2NumPieces = p2NumShips;
    p2NumHits = 0;

    loadSelectionGrid(p1shipArr);
    document.querySelector('#ready').onclick = localIsReady;
}

/**
 * Called when player is done with ship selection or attack turn.
 * Removes all objects within board div and loads a button that must
 * be clicked before proceeding to the next player's turn. 
 * @param {Object} shipArr 
 * @param {Object} attackArr 
 */
function loadNextTurn(shipArr, attackArr)
{
    let boardDiv = document.querySelector('#board');
    let switchPlayerButton = document.createElement('button');

    notifications.clearRect(0,0, 500, 100);
    colLabels.clearRect(0,0, 1024, 50);
    while(boardDiv.firstChild)//deletes p1's board from screen
    {
        boardDiv.removeChild(boardDiv.lastChild);
    }
    
    switchPlayerButton.id = 'privacyButton';
    if(whosTurn === 1)
    {
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Blue';
        notifications.fillText('P2\'s Turn', 250, 75);
    }
    else
    {
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Red';
        notifications.fillText('P1\'s Turn', 250, 75);
    }
    switchPlayerButton.innerText = 'Click When Ready';
    switchPlayerButton.addEventListener('click',  () => {
        switchPlayerButton.remove();
        canSelect = true;
        whosTurn = (whosTurn%2) + 1;
        if(p1NumShips !== 0 || p2NumShips !== 0)
        {
            document.querySelector('#ready').disabled = false;
            document.querySelector('#reset').disabled = false;
            document.querySelector('#ready').hidden = false;
            document.querySelector('#reset').hidden = false;
            loadSelectionGrid(shipArr);
        }
        else
        {
            loadPlayGrid(shipArr,attackArr);
        }
    });
    document.querySelector('#boardDiv').appendChild(switchPlayerButton);
}
/**
 * Called when Ready Button is clicked by the user. If the ready button is selected by
 * Player 1, then Player 2's selection screen is loaded, otherwise Player 1's attack screen
 * is loaded allowing the beginning of the gameplay loop.
 */
function localIsReady()//if player 1 is ready for attack phase
{
    if(p1NumShips === 0 && whosTurn === 1)
    {
        ////music for turn
        game_music=new playSound('turn.mp3')
        game_music.play()
        document.querySelector('#ready').disabled = true;
        document.querySelector('#reset').disabled = true;
        document.querySelector('#ready').hidden = true;
        document.querySelector('#reset').hidden = true;
        setTimeout(() => {
            loadNextTurn(p2shipArr, p2attackArr);//loads privacy screen
        }, 1000);//pauses before loading privacy screen
        
    }
    else if(p2NumShips === 0 && whosTurn === 2)//if player 2 is ready for attack phase
    {
        ////music for turn
        game_music=new playSound('turn.mp3')
        game_music.play()
        //p1 and p2 should have already selected ships --> load actual game board configuration
        document.querySelector('#ready').hidden = true;
        document.querySelector('#reset').hidden = true;
        setTimeout(() => {
            loadNextTurn(p1shipArr, p1attackArr);
        }, 1000);
    }
    else
    {
        console.log('Not Ready');
    }
}

/**
 * Function is called when a player selects a square to attack. Depending on who's turn it is,
 * the opposing player's ship configuration is checked for the existence of a ship piece, marked with
 * a -1 on a hit, and the grid is modified to reflect the hit, by the coloring of a button.
 * If a ship is at the chosen location and all ship pieces have been hit, the player is notified of their victory.
 * Otherwise, the opposing player's screen is switched to after a 3 second timeout.
 * @param {number} row row of the opposing player's ship array
 * @param {number} col col of the opposing player's ship array
 * @param {Object} attackArr double array representing the attacking player's grid of attacks
 * @param {Object} button the button to modify after a miss or a hit
 */
function attackLocal(row, col, attackArr, button)
{
    if(whosTurn === 1)
    {
        if(p2shipArr[row][col] !== 0 )
        {
            let whichShip = p2shipArr[row][col];
            p1NumHits++;
            attackArr[row][col] = 1;
            p2shipArr[row][col] = -1;
            button.className = 'successfulAttack';
            ////hit music
            game_music=new playSound('hit_c.mp3')
            game_music.play()

            if(p1NumHits === hitsToWin)
            {
                ////win music
                game_music=new playSound('win.mp3')
                game_music.play()
                notifications.clearRect(0,0,500,100);
                notifications.font = '30px Arial';
                notifications.fillStyle = 'Red';
                notifications.fillText('P1 YOU WIN!', 250, 75);
                document.querySelectorAll('.endButton').forEach(
                    function(el){el.hidden = false;} );
            }
            else
            {
                let message;
                let shipSunk = true;
                for(let i=0; i<10; i++)
                {
                    for(let j=0; j<10; j++)
                    {
                        if(p2shipArr[i][j] === whichShip)
                        {
                            shipSunk = false;
                        }
                    }
                }
                if(shipSunk === true)
                {
                    ////sunk music
                    game_music=new playSound('sunk.mp3')
                    game_music.play()
                    message = 'Ship Sunk: '+ 1 + 'x' + whichShip + '!';
                }
                else
                {
                    ////hit music
                    game_music=new playSound('hit_c.mp3')
                    game_music.play()
                    message = 'Hit!';
                }
                notifications.clearRect(0,0,500,100);
                notifications.font = '30px Arial';
                notifications.fillStyle = 'Red';
                notifications.fillText(message, 250, 75);
                window.setTimeout(()=>{
                    loadNextTurn(p2shipArr, p2attackArr);
                }, 1000);
            }
        }
        else
        {
            ////miss music
            game_music=new playSound('missed.mp3')
            game_music.play()
            attackArr[row][col] = -1;
            button.className = 'missedAttack';
            notifications.clearRect(0,0,500,100);
            notifications.font = '30px Arial';
            notifications.fillStyle = 'Red';
            notifications.fillText('Miss', 250, 75);
            window.setTimeout(()=>{
                loadNextTurn(p2shipArr, p2attackArr);
            }, 1000);
        }
    }
    else
    {
        if(p1shipArr[row][col] !== 0 )
        {
            let whichShip = p1shipArr[row][col];
            p2NumHits++;
            attackArr[row][col] = 1;
            p1shipArr[row][col] = -1;
            button.className = 'successfulAttack';
            ////hit music
            game_music=new playSound('hit_c.mp3')
            game_music.play()
            if(p2NumHits === hitsToWin)
            {
                ////win music
                game_music=new playSound('win.mp3')
                game_music.play()
                notifications.clearRect(0,0,500,100);
                notifications.font = '30px Arial';
                notifications.fillStyle = 'Blue';
                notifications.fillText('P2 YOU WIN!', 250, 75);
                document.querySelectorAll('.endButton').forEach(
                    function(el){el.hidden = false;} );
            }
            else
            {
                let message;
                let shipSunk = true;
                for(let i=0; i<10; i++)
                {
                    for(let j=0; j<10; j++)
                    {
                        if(p1shipArr[i][j] === whichShip)
                        {
                            shipSunk = false;
                        }
                    }
                }
                if(shipSunk === true)
                {
                    ////sunk music
                    game_music=new playSound('sunk.mp3')
                    game_music.play()
                    message = 'Ship Sunk: '+ 1 + 'x' + whichShip + '!';
                }
                else
                {
                    ////hit music
                    game_music=new playSound('hit_c.mp3')
                    game_music.play()
                    message = 'Hit!';
                }
                notifications.clearRect(0,0,500,100);
                notifications.font = '30px Arial';
                notifications.fillStyle = 'Blue';
                notifications.fillText(message, 250, 75);
                window.setTimeout(()=>{
                    loadNextTurn(p1shipArr, p1attackArr);
                }, 1000);
            }
        }
        else
        {
            ////miss music
            game_music=new playSound('missed.mp3')
            game_music.play()
            attackArr[row][col] = -1;
            button.className = 'missedAttack';
            notifications.clearRect(0,0,500,100);
            notifications.font = '30px Arial';
            notifications.fillStyle = 'Blue';
            notifications.fillText('Miss', 250, 75);
            window.setTimeout(()=>{
                loadNextTurn(p1shipArr, p1attackArr);
            }, 1000);
        }
    }
}

/**
 * Loads ship grid and attack grid for current player. Since ship selection is ended, ship selection grid is no longer modifiable,
 * but attack selection grid is. On selection of a attack position, attackLocal function is called to allow necessary modifications
 * to be made to the opposing player's ship array and the current player's button grid
 * @param {Object} shipArr double array representing the attacking player's grid of ships
 * @param {Object} attackArr double array representing the attacking player's grid of misses and hits
 */
function loadPlayGrid(shipArr, attackArr)
{
    rowLabelsCanvas.width = 50;
    rowLabelsCanvas.height = 524;
    colLabelsCanvas.width = 1046.4;
    colLabelsCanvas.height = 50;
    document.querySelector('#board').appendChild(rowLabelsCanvas);
    document.querySelector('#colLabels').appendChild(colLabelsCanvas);

    if(whosTurn === 1)
    {
        ////remind music
        game_music=new playSound('scifi.mp3')
        game_music.play()
        notifications.clearRect(0,0,500,100);
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Red';
        notifications.fillText('Choose your attack position (P1)', 250, 75);

        rowLabels.fillStyle = 'Red';
        colLabels.fillStyle = 'Red';
        for(let i=0; i<10; i++)
        {
            rowLabels.fillText((i+1).toString(),25,(i*51)+26);
            colLabels.fillText(String.fromCharCode(i+97),(i*52)+50, 25);
        }
        for(let i=10; i<20; i++)
        {
            colLabels.fillText(String.fromCharCode(i+87),(i*52)+50, 25);
        }
    }
    else
    {
        ////remind music
        game_music=new playSound('scifi.mp3')
        game_music.play()
        notifications.clearRect(0,0,500,100);
        notifications.font = '30px Arial';
        notifications.fillStyle = 'Blue';
        notifications.fillText('Choose your attack position (P2)', 250, 75);

        rowLabels.fillStyle = 'Blue';
        colLabels.fillStyle = 'Blue';
        for(let i=0; i<10; i++)
        {
            rowLabels.fillText((i+1).toString(),25,(i*51)+26);
            colLabels.fillText(String.fromCharCode(i+97),(i*52)+50, 25);
        }
        for(let i=10; i<20; i++)
        {
            colLabels.fillText(String.fromCharCode(i+87),(i*52)+50, 25);
        }
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

/**
 * Loads ship selection grid for either player 1 or player 2 and modifies the array passed in
 * @param {Object} playerShipArray double array representing the attacking player's grid of ships
 */
function loadSelectionGrid(playerShipArray)
{
    rowLabelsCanvas.width = 50;
    rowLabelsCanvas.height = 524;
    colLabelsCanvas.width = 524;
    colLabelsCanvas.height = 50;
    document.querySelector('#board').appendChild(rowLabelsCanvas);
    document.querySelector('#colLabels').appendChild(colLabelsCanvas);

    if(whosTurn === 1)
    {
        ////choose position music
        game_music=new playSound('among.mp3')
        game_music.play()
        notifications.clearRect(0,0,500,100);
        notifications.fillStyle = 'Red';
        notifications.fillText('Choose Your Ship Positions Player1', 250, 75);
        
        rowLabels.fillStyle = 'Red';
        colLabels.fillStyle = 'Red';
        for(let i=0; i<10; i++)
        {
            rowLabels.fillText((i+1).toString(),25,(i*51)+26);
            colLabels.fillText(String.fromCharCode(i+97),(i*52)+50, 25);
        }
    }
    else
    {
        ////choose position music
        game_music=new playSound('among.mp3')
        game_music.play()
        notifications.clearRect(0,0,500,100);
        notifications.fillStyle = 'Blue';
        notifications.fillText('Choose Your Ship Positions Player2', 250, 75);

        rowLabels.fillStyle = 'Blue';
        colLabels.fillStyle = 'Blue';
        for(let i=0; i<10; i++)
        {
            rowLabels.fillText((i+1).toString(),25,(i*51)+26);
            colLabels.fillText(String.fromCharCode(i+97),(i*52)+50, 25);
        }
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
      console.log(playerShipArray);
                        p2PlaceShipPiece(this.parentNode.parentNode.rowIndex, this.parentNode.cellIndex, this, playerShipArray);
                    }
                    mouseDown = true;
                }
            });
            shipBtn.addEventListener("mousemove", function(){
                if(canSelect === true)
                {
                    if(mouseDown === true)
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

/**
 * Function is called when user attempts to click on a button on the ship selection grid.
 * If the user is allowed to select this position, the grid is updated with a color corresponding
 * to the piece of the ship they just placed
 * @param {number} row row of player 1's ship array
 * @param {number} col col of player 1's ship array
 * @param {Object} el the button the user attempted to place on
 * @param {Object} arr player 1's ship array
 */
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
        game_music.play()
        console.log("selection phase over");
        canSelect = false;
    }
}

/**
 * Function is called when user attempts to click on a button on the ship selection grid.
 * If the user is allowed to select this position, the grid is updated with a color corresponding
 * to the piece of the ship they just placed
 * @param {number} row row of player 2's ship array
 * @param {number} col col of player 2's ship array
 * @param {Object} el the button the user attempted to place on
 * @param {Object} arr player 2's ship array
 */
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
        ////selection end music
        console.log("selection phase over");
        canSelect = false;
    }
}

/**
 * Function is called when user attempts to click on a button on the ship selection grid.
 * If the user is allowed to select this position, true is returned, otherwise false.
 * Function checks number of ship pieces remaining to be placed in order to determine the
 * orientation of the ship and whether a ship can actually be placed at this location.
 * @param {number} row row of the ship array to check 
 * @param {number} col col of the ship array to check
 * @param {Object} arr the array being checked
 * @param {Object} numPieces the number of pieces remaining of the current ship to be placed
 * @param {Object} numShips the number of ships remaining to be placed
 * @returns {boolean} whether the ship piece can be placed
 */
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
/**
 * Resets ship array of the player clicking the reset button and restyles all buttons to reflect
 * the emptied ship selection grid.
 */
function resetShipGrid()
{
    ////reset music
    game_music=new playSound('hit_a.mp3')
    game_music.play()
    console.log('reset button selected');
    document.querySelectorAll('.ship_6, .ship_5, .ship_4, .ship_3, .ship_2, .ship_1').forEach(function(el){
        el.className = 'unselectedShip';
    });
    canSelect = true;
    shipOrientation = 0;
    if(whosTurn === 1)
    {
        ////change turn music
        game_music=new playSound('scifi.mp3')
        game_music.play()
        p1NumShips=numShipsChoice;
        p1NumPieces=p1NumShips;
    }
    if(whosTurn === 2)
    {
        ////change turn music
        game_music=new playSound('scifi.mp3')
        game_music.play()
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
/**
 * Resets all variables
 */
function playAgain()
{
    ////replay music
    game_music=new playSound('hit_a.mp3')
    game_music.play()
    document.querySelectorAll('.endButton').forEach(
        (el) => {el.hidden = true;} );
    let boardDiv = document.querySelector('#board');
    notifications.clearRect(0,0, 500, 100);
    while(boardDiv.firstChild)//deletes p1's board from screen
    {
        boardDiv.removeChild(boardDiv.lastChild);
    }
    for( let i = 0 ; i<10; i++)
    {
        for (let j =0; j<10; j++)
        {
            p1attackArr[i][j] = 0;
            p1shipArr[i][j] = 0;
            p2attackArr[i][j] = 0;
            p2shipArr[i][j] = 0;
        }
    }
    onLoad();
}