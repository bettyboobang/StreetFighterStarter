import controls from '../../constants/controls';

export function getHitPower(fighter) {
    const criticalHitChance = Math.random() + 1;  //power = attack * criticalHitChance
    return fighter.attack * criticalHitChance;
}
export function getBlockPower(fighter) {
    const dodgeChance = Math.random() + 1;// power = defense * dodgeChance
    return fighter.defense * dodgeChance;
}
export function getDamage(attacker, defender) {
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    const damage = hitPower - blockPower;
    return damage > 0 ? damage : 0; //if damage is negative, we return 0, meaning the attack was completely blocked or dodged
}
export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {//we return a new Promise that will resolve with the winner of the fight once the fight is over.
        const player1 = { ...firstFighter, currentHealth: firstFighter.health, maxHealth: firstFighter.health };
        const player2 = { ...secondFighter, currentHealth: secondFighter.health, maxHealth: secondFighter.health };
        const pressedKeys = {};//object to keep track of which keys are currently pressed.
       
        let p1CritAvailable = true;//boolean flags to track the availability of critical hits for each player
        let p2CritAvailable = true;
    
        const p1HealthBar = document.getElementById('left-fighter-indicator');//getting references to the health bar elements for both players
        const p2HealthBar = document.getElementById('right-fighter-indicator');
        function updateHealthBar(player, barElement) {//function to update the health bar of a player based on their current health
            const healthPercentage = (player.currentHealth / player.maxHealth) * 100;
            barElement.style.width = `${Math.max(0, healthPercentage)}%`;//we use Math.max to ensure that the health bar does not go below 0% width
        }
        function isComboPressed(combo) {//function to check if critical hits is currently pressed
            return combo.every(key => pressedKeys[key]);
        }
        function handleKeyDown(event) {//event handler for keydown events
            pressedKeys[event.code] = true;
            const isP1Blocking = pressedKeys[controls.Player1Block];//checking if the block key for player 1 is currently pressed
            const isP2Blocking = pressedKeys[controls.Player2Block];

            if (isComboPressed(controls.Player1CriticalHitCombination) && p1CritAvailable) {//checking if the critical hit combination for player 1 is currently pressed
                p1CritAvailable = false;
                const damage = 2 * player1.attack;
                player2.currentHealth -= damage;
                updateHealthBar(player2, p2HealthBar);
                setTimeout(() => { p1CritAvailable = true; }, 10000);
                checkWinner();
                return; //for normal attack back again
            }
            if (isComboPressed(controls.Player2CriticalHitCombination) && p2CritAvailable) {//checking if the critical hit combination for player 2 is currently pressed
                p2CritAvailable = false;
                const damage = 2 * player2.attack;
                player1.currentHealth -= damage;
                updateHealthBar(player1, p1HealthBar);
                setTimeout(() => { p2CritAvailable = true; }, 10000);
                checkWinner();
                return;
            }
            if (event.code === controls.Player1Attack && !isP1Blocking) {//checking if the attack key for player 1 is pressed and player 1 is not currently blocking
                const damage = isP2Blocking ? getDamage(player1, player2) : getHitPower(player1);//calculating the damage based on whether player 2 is blocking or not. If player 2 is blocking, we calculate the damage using the getDamage function, which takes into account both the attacker's hit power and the defender's block power
                player2.currentHealth -= damage;
                updateHealthBar(player2, p2HealthBar);
                checkWinner();
            }
            if (event.code === controls.Player2Attack && !isP2Blocking) {//checking if the attack key for player 2 is pressed and player 2 is not currently blocking
                const damage = isP1Blocking ? getDamage(player2, player1) : getHitPower(player2);
                player1.currentHealth -= damage;
                updateHealthBar(player1, p1HealthBar);
                checkWinner();
            }
        }
        function handleKeyUp(event) {//event handler for keyup events, which updates the pressedKeys object
            pressedKeys[event.code] = false;
        }
        function checkWinner() {//function to check if there is a winner after each attack
            if (player1.currentHealth <= 0 || player2.currentHealth <= 0) {
                window.removeEventListener('keydown', handleKeyDown);//removing the event listeners for keydown and keyup events to stop the fight once a winner is determined
                window.removeEventListener('keyup', handleKeyUp);
                const winner = player1.currentHealth > 0 ? firstFighter : secondFighter;
                resolve(winner);
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
})

}