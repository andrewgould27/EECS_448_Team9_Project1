/**
 * @file gameModeConfig provides a means of loading only the script necessary for the game
 * mode selected by the user
 * @author Team 9
 */

function background_music(src){
    this.background_music=document.createElement('audio')
    this.background_music.setAttribute('id', 'music')
    this.background_music.src=src
    this.background_music.setAttribute('preload','auto')
    this.background_music.style.display='none'
    document.body.appendChild(this.background_music)
    this.play=function(){
        this.background_music.play()
        let x=document.getElementById('music')
        x.loop=true
    }
    this.stop=function(){
        this.background_music.pause()
    }
}
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
        game_music=new background_music('background.mp3')
        game_music.play()
        const localGameScript = document.createElement('script');
        localGameScript.type = 'text/javascript';
        localGameScript.src = 'againstLocalPlayer.js';
        document.querySelector('head').appendChild(localGameScript);

    }
    else if(gameType.id === 'botGame')
    {
        game_music=new background_music('background.mp3')
        game_music.play()
        const botGameScript = document.createElement('script');
        botGameScript.type = 'text/javascript';
        botGameScript.src = 'againstBot.js';

        document.querySelector('head').appendChild(botGameScript);
    }
    
}
