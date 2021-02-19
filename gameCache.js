/********************************************
*   The purpose of this file is to handle
*   game to game value storage in a separate
*   location for ease of access
*           -Cade
********************************************/



var numShipsChoiceSTORE = 0;


/**
 * Stores value of number of ships used in the game cache. This value is used when restarting the game.
 *        -Cade
 * @param {Number} numShips integer value representing number of ships used in previous game
 */
function storeValues(numShips)
{
  numShipsChoiceSTORE = numShips;
}


/**
 * Returns stored number of ships in order to restart a game of the saem size
 *        -Cade
 */
function returnNumShips()
{
  return numShipsChoiceSTORE;
}

/**
 * Returns an empty 10x10 array for the purpose of resetting game values on restart
 *        -Cade
 */
function returnEmptyArray()
{
  return [
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
}
