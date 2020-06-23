new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,   
        log: []
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.log = [];
        },
        playerAttack(){
            
            let attack = this.calculateAttack(20);
            this.monsterHealth -= attack;
            this.log.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + attack
            });
            this.monsterTurn(20);
        },
        monsterTurn(multi){
            let damage = this.calculateAttack(multi);
            this.playerHealth -= damage;
            
            this.log.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        specialAttack(){
            let attack = this.calculateAttack(50);
            this.monsterHealth -= attack;
            this.log.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + attack
            });
            this.monsterTurn(50);
        },
        heal(){
            let healing = this.calculateAttack(10);
            if(this.playerHealth < 90){
                this.playerHealth += healing;
                this.log.unshift({
                    isPlayer: true,
                    text: 'User heals for ' + healing
                });
            }else if(this.playerHealth >= 90 && this.playerHealth < 100){
                this.log.unshift({
                    isPlayer: true,
                    text: 'User heals for ' + (100-this.playerHealth)
                });
                this.playerHealth = 100;
            }

            //this.monsterTurn(20);
        },
        giveUp(){
            this.gameIsRunning = false;
        },
        calculateAttack(multiplier){
            return Math.floor(Math.random() * multiplier);
        }
    },
    watch:{
        playerHealth(){
            if(this.playerHealth <= 0 || this.monsterHealth <= 0){
                this.gameIsRunning = false;
            }
            if(this.playerHealth <= 0){
                this.log.unshift({
                    isPlayer: true,
                    text: 'Monster wins'
                });
            }else if(this.monsterHealth <= 0){
                this.log.unshift({
                    isPlayer: true,
                    text: 'Player wins'
                });
            }
        },
    }
});