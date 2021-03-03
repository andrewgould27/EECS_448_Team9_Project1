/**
 * @file gameModeConfig provides a means of loading only the script necessary for the game
 * mode selected by the user
 * @author Team 9
 */

/**
 * Configures variables for game counters and win conditions and removes configuration buttons. 
 * Loads the ship selection screen
 * for Player 1.
 * @param {Object} gameType button whose id gives the type of game selected by the player
 */
function main(gameType)
{
    if(gameType.id == 'local')
    {
        console.log('bot')

        const localGameScript = document.createElement('script');
        localGameScript.type = 'text/javascript';
        localGameScript.src = 'againstLocalPlayer.js';
        document.querySelector('head').appendChild(localGameScript);

    }
    else if(gameType.id === 'botGame')
    {
        const botGameScript = document.createElement('script');
        botGameScript.type = 'text/javascript';
        botGameScript.src = 'againstBot.js';

        document.querySelector('head').appendChild(botGameScript);
    }
    
}
