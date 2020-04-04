new Vue({
    el: '#app',
    data: {
        showMenu: false,
        showLogs: false,
        playerHealth: 100,
        monsterHealth: 100,
        logs: [],
        playerTurn: true,
        counterMonsterSpecial: 5,
        counterPlayerSpecial: 5,
        counterMonsterHeal: 5,
        counterPlayerHeal: 5,
    },
    methods: {
        start: function(){
            this.showMenu = !this.showMenu;
            this.showLogs = !this.showLogs;
            this.playerTurn = true;
            this.logs.unshift("Game started!");
        },
        giveUp: function(){
            if(confirm('Do you really want to surrender?')) {
                this.newGame();
            }
        },
        attack: function(){
            let damage = Math.floor(Math.random() * 20);
            this.monsterHealth -= damage;
            this.playerTurn = true;
            this.logs.unshift("Monster takes " + damage + " damage");
            this.monsterMove();
        },
        specialAttack: function(player){
            let damage = Math.floor(Math.random() * (40-20));
            this.monsterHealth -= damage;
            this.playerTurn = true;
            this.logs.unshift("Monster takes " + damage + " damage");
            this.counterPlayerSpecial--;
            this.monsterMove();
        },
        heal: function(){
            let hp = Math.floor(Math.random() * (20-2));
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
    },
});