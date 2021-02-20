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

        const gameCache = document.createElement('script');
        gameCache.type = 'text/javascript';
        gameCache.src = 'gameCache.js';

        document.querySelector('head').appendChild(gameCache);
        document.querySelector('head').appendChild(gameCache);
    }
    
}
