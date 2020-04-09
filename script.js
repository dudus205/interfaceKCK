new Vue({
    el: '#app',
    data: {
        showStart: true,
        showMenu: false,
        showLogs: false,
        showStats: false,
        playerHealth: 100,
        monsterHealth: 100,
        attackPoints: 30,
        healPoints: 40,
        logs: [],
        playerTurn: true,
        counterMonsterSpecial: 5,
        counterPlayerSpecial: 5,
        counterMonsterHeal: 5,
        counterPlayerHeal: 5,
        message:"Sum of attack and heal must be 70.",
    },
    methods: {
        start: function(){
            this.attackPoints = parseInt(this.attackPoints);
            this.healPoints = parseInt(this.healPoints);
            if(this.attackPoints + this.healPoints === 70){
                this.showMenu = !this.showMenu;
                this.showLogs = !this.showLogs;
                this.playerTurn = true;
                this.showStats = false;
                this.logs.unshift("Game started!");
            }
            else{
                this.message = "Sum of values isn't equal to 70!"
            }
        },
        giveUp: function(){
            if(confirm('Do you really want to surrender?')) {
                this.newGame();
            }
        },
        attack: function(){
            let damage = Math.floor(Math.random() * this.attackPoints);
            this.monsterHealth -= damage;
            this.playerTurn = true;
            this.logs.unshift("Monster takes " + damage + " damage");
            this.monsterMove();
        },
        specialAttack: function(){
            let damage = Math.floor(Math.random() * (this.attackPoints - 10));
            this.monsterHealth -= damage;
            this.playerTurn = true;
            this.logs.unshift("Monster takes " + damage + " damage");
            this.counterPlayerSpecial--;
            this.monsterMove();
        },
        heal: function(){
            let hp = Math.floor(Math.random() * (this.healPoints - 10));
            this.playerHealth += hp;
            this.playerTurn = true;
            this.logs.unshift("Player heal " + hp);
            this.counterPlayerHeal --;
            this.monsterMove();
        },
        monsterAttack: function(){
            let damage = Math.floor(Math.random() * 20) + 4;
            this.playerHealth -= damage;
            this.playerTurn = false;
            this.logs.unshift("Player takes " + damage + " damage");
        },
        monsterMove: function(){
            let hp = 0;
            switch(Math.floor(Math.random() *3) + 1) {
                case 1:
                    this.monsterAttack();
                    break;
                case 2:
                    if(this.counterMonsterSpecial >= 0 ) {
                        damage = Math.floor(Math.random() * (40 - 15));
                        this.playerHealth -= damage;
                        this.playerTurn = false;
                        this.logs.unshift("Player takes " + damage + " damage");
                        this.counterMonsterSpecial --;
                    }
                    else{
                        this.monsterAttack();
                    }
                    break;
                case 3:
                    if(this.counterMonsterHeal >= 0) {
                        hp += Math.floor(Math.random() * (15 - 2));
                        if((this.monsterHealth + hp) >100) {
                            this.monsterHealth = 100;
                        }
                        else
                            this.monsterHealth += hp;
                        this.playerTurn = false;
                        this.logs.unshift("Monster heal " + hp);
                    }
                    else{
                        this.monsterAttack();
                    }
                    break;
            }
        },
        isPlayerTurn: function(index){
            if(index % 2 === 0) return true;
            else return false;
        },
        newGame: function () {
            this.showStart = true;
            this.showMenu = false;
            this.showLogs = false;
            this.logs = [];
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.playerTurn = true;
            this.counterMonsterSpecial = 5;
            this.counterPlayerSpecial = 5;
            this.counterMonsterHeal = 5;
            this.counterPlayerHeal = 5;
            this.attackPoints = 30;
            this.healPoints = 40;
        }
    },
    updated: function () {
            if(this.playerHealth <=0) {
                alert("Game over!");
                this.newGame();
            }
            else if(this.monsterHealth <=0){
                alert("You win!");
                this.newGame();
            }
            if(this.playerHealth > 100)
                this.playerHealth = 100;
            if(this.monsterHealth > 100)
                this.monsterHealth = 100;

    },
});