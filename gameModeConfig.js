function main(gameType)
{
    if(gameType.id == 'local')
    {
        const localGameScript = document.createElement('script');
        localGameScript.type = 'text/javascript';
        localGameScript.src = 'againstLocalPlayer.js';
        document.querySelector('head').appendChild(localGameScript);

    }
    else if(gameType.id === 'botGame')
    {
        const localGameScript = document.createElement('script');
        localGameScript.type = 'text/javascript';
        localGameScript.src = 'againstBot.js';
        document.querySelector('head').appendChild(localGameScript);
    }
/*********************************************
*   This block resets all game values, then recalls
*   game settings from the cache and starts a new
*   game
*             -Cade
**********************************************/
    else if(gameType.id === 'restartButton')
    {
      document.querySelectorAll('.endButton').forEach(
          function(el){el.hidden = true;} );
      whosTurn = 1;
      document.querySelector('#ready').hidden = false;
      document.querySelector('#reset').hidden = false;
      document.querySelector('#ready').disabled = false;
      document.querySelector('#reset').disabled = false;
      hitsToWin = 0;
      p1NumHits = 0;
      p2NumHits = 0;
      p1NumShips = returnNumShips();
      p2NumShips = returnNumShips();
      p1NumPieces = p1NumShips;
      p2NumPieces = p2NumShips;
      p1attackArr = returnEmptyArray();
      p1shipArr = returnEmptyArray();
      p2attackArr = returnEmptyArray();
      p2shipArr = returnEmptyArray();
      hitsToWin = 0;
      for(let i=numShipsChoice; i>0; i--)
      {
          hitsToWin += i;
      }
      loadSelectionGrid(p1shipArr);
      resetShipGrid();
      document.querySelector('#ready').onclick = localIsReady;
    }
}

/*******************************************
*   This function returns users to the main menu
*   after a game.
*           -Cade
*******************************************/
function returnToMenu()
{
  location.reload(true);
}
