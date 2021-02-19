/********************************************
*   The purpose of this file is to handle
*   game to game value storage in a separate
*   location for ease of access
*           -Cade
********************************************/



var numShipsChoiceSTORE = 0;


/*******************************************
*   This function takes in the number of ships
*   used in a game and stores it for later use.
*           -Cade
*******************************************/
function storeValues(numShips)
{
  numShipsChoiceSTORE = numShips;
}


/*******************************************
*   This function returns the number of ships
*   used in the previous game.
*           -Cade
*******************************************/
function returnNumShips()
{
  return numShipsChoiceSTORE;
}

/*******************************************
*   This function returns an empty 10x10 array
*   for use in resetting the game to empty values.
*           -Cade
*******************************************/
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
