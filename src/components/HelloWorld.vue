<template>
  <div class="hello">
    <transition name="slide-fade" mode="out-in">
      <div id="score" v-if="showMenu === true">
          Score: {{score}}
      </div>
    </transition>
    <transition name="slide-fade" mode="out-in">
      <section class="row">
        <div class="smallColumns" v-if="showMenu === true">
          <h1 class="text-center">YOU</h1>
          <div class="healthbar">
            <div class="healthbar text-center" id="player-bar" :style="{width: playerHealth + '%'}">
              {{playerHealth}}
            </div>
          </div>
        </div>
        <div class="smallColumns" v-if="showMenu === true">
          <h1 class="text-center">MONSTER</h1>
          <div class="healthbar">
            <div class="healthbar text-center" id="monster-bar" :style="{width: monsterHealth + '%'}">
              {{monsterHealth}}
            </div>
          </div>
        </div>
      </section>
    </transition>
    <div style="clear: both;"></div>
    <transition name="fade-enter" mode="out-in">
    <section class="row controls" v-if="showStart">
        <logo></logo>
      <div class="small-12 columns">
        <button class="start-game" @click="showStats = true; showStart = false">New Game</button>
      </div>
    </section>
    <section class="row controls" v-if="showStats">
      <br>
      <label>Attack: <input v-model="attackPoints" type="text"></label>
      <label>Heal: <input v-model="healPoints" type="text"></label>
      <br><br>
      {{message}}<br><br>
      <button class="start-game" @click=start>Next</button>
    </section>
    </transition>
    <transition name="slide-fade" mode="out-in">
      <section class="row controls" v-if="showMenu === true">
        <div class="small-12 columns">
          <button id="attack" @click=attack>ATTACK</button>
          <transition name="slide-fade">
            <button id="special-attack" @click=specialAttack v-show="counterPlayerSpecial >0">SPECIAL ATTACK</button></transition>
          <transition name="slide-fade">
            <button id="heal" @click=heal v-show="counterPlayerHeal >0">HEAL</button></transition>
          <button class="give-up" @click='giveUp'>GIVE UP</button>
        </div>
      </section>
    </transition>
    <scores v-if="showStart"></scores>
    <list v-if="showLogs" :logs="logs"></list>
    <transition name="slide-fade" mode="out-in">
    <div class="modal" v-if="surrender">
      <div class="modal-content">
        <span class="close" @click="surrender = !surrender">&times;</span>
        <h3>Do you want to surrender?</h3>
        <hr>
        <button class="start-game" @click="newGame">Yes</button>
        <button class="give-up" @click="surrender = !surrender">No</button>
      </div>
    </div>
    </transition>
    <transition name="slide-fade" mode="out-in">
      <div class="modal" v-if="win">
        <div class="modal-content">
          <h3>{{message}}</h3>
          <p>Score: {{score}}</p>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" v-model="name"><hr>
          <button class="start-game" @click="saveScore">Confirm</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {baseURL} from './baseURL.js';
export default {
  name: 'HelloWorld',
  data: function(){
    return{
      win: false,
      showStart: true,
      showMenu: false,
      showLogs: false,
      showStats: false,
      playerHealth: 100,
      monsterHealth: 100,
      attackPoints: 30,
      healPoints: 40,
      playerTurn: true,
      logs: [],
      score: 0,
      counterMonsterSpecial: 5,
      counterPlayerSpecial: 5,
      counterMonsterHeal: 5,
      counterPlayerHeal: 5,
      message:"Sum of attack and heal must be 70.",
      surrender: false,
      name: '',
  }},
  methods: {
    start: function(){
      this.attackPoints = parseInt(this.attackPoints);
      this.healPoints = parseInt(this.healPoints);
      if(this.attackPoints + this.healPoints === 70){
        this.showMenu = !this.showMenu;
        this.showLogs = !this.showLogs;
        this.playerTurn = true;
        this.showStats = false;
        this.logs.unshift({
                type: "System",
                text: "Game started!",
        });
      }
      else{
        this.message = "Sum of values isn't equal to 70!"
      }
    },
    saveScore: function(){
      const Http = new XMLHttpRequest();
      const url = baseURL + 'add/' + this.name + '-' + this.score;
      Http.open("POST", url);
      Http.send();
      if(Http.onreadystatechange === false)
        console.log('error');
      this.newGame();
    },
    giveUp: function(){
      this.surrender = !this.surrender;
    },
    attack: function(){
      let damage = Math.floor(Math.random() * this.attackPoints);
      this.score += damage * 2;
      this.monsterHealth -= damage;
      this.playerTurn = true;
      this.logs.unshift({
        type: "Monster",
        text: "Monster takes " + damage + " damage",
      });
      this.monsterMove();
    },
    specialAttack: function(){
      let damage = Math.floor(Math.random() * (this.attackPoints - 10));
      this.score += damage * 5;
      this.monsterHealth -= damage;
      this.playerTurn = true;
      this.logs.unshift({
        type: "Monster",
        text: "Monster takes " + damage + " damage"});
      this.counterPlayerSpecial--;
      this.monsterMove();
    },
    heal: function(){
      let hp = Math.floor(Math.random() * (this.healPoints - 10));
      this.playerHealth += hp;
      this.score += hp * 3;
      this.playerTurn = true;
      this.logs.unshift({
        type: "Player",
        text: "Player heal " + hp});
      this.counterPlayerHeal --;
      this.monsterMove();
    },
    monsterAttack: function(){
      let damage = Math.floor(Math.random() * 20) + 4;
      this.playerHealth -= damage;
      this.playerTurn = false;
      this.logs.unshift({
        type: "Player",
        text: "Player takes " + damage + " damage"});
    },
    monsterMove: function(){
      let hp = 0;
      this.score -= hp;
      switch(Math.floor(Math.random() *3) + 1) {
        case 1:
          this.monsterAttack();
          break;
        case 2:
          if(this.counterMonsterSpecial >= 0 ) {
            let damage = Math.floor(Math.random() * (40 - 15));
            this.playerHealth -= damage;
            this.playerTurn = false;
            this.logs.unshift({
              type: "Player",
              text: "Player takes " + damage + " damage"
            });
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
            this.logs.unshift({
              type: "Player",
              text: "Monster heal " + hp
            });
          }
          else{
            this.monsterAttack();
          }
          break;
      }
    },
    newGame: function () {
      this.score = 0;
      this.win = false;
      this.surrender = false;
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
      this.message = "Sum of attack and heal must be 70.";
    }
  },
  updated: function () {
    if(this.playerHealth <=0) {
      this.win = true;
      this.message = "Game over!";
    }
    else if(this.monsterHealth <=0){
      this.win = true;
      this.message = "You win!";
    }
    if(this.playerHealth > 100)
      this.playerHealth = 100;
    if(this.monsterHealth > 100)
      this.monsterHealth = 100;

  },
}
</script>

<style scoped>
  #player-bar{
    background-color: green;
    margin: 0;
    color: white;
  }
  #monster-bar{
    background-color: #ff2424;
    margin: 0;
    color: white;
  }
  .smallColumns{
    float: left;
    width: 50%;
  }

  .text-center {
    text-align: center;
  }

  .healthbar {
    width: 80%;
    height: 40px;
    margin: auto;
    transition: width 500ms;
    background-color: #eee;
    border-radius: 3px;
    box-shadow: 0 0 11px 0 #999;
  }

  .controls{
    background-color: #F6F6F6;
    margin-top: 15px;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 3px 6px #ccc;
  }

  button {
    font-size: 20px;
    background-color: #eee;
    padding: 12px;
    box-shadow: 0 1px 1px black;
    margin: 10px;
    border-radius: 6px;
  }

  button:active{
    transform: translateY(4px);
    transition: transform 10ms;
  }

  .start-game {
    background-color: #aaffb0;
  }

  .start-game:hover {
    background-color: #76ff7e;
  }

  #attack {
    background-color: #ff7367;
  }

  #attack:hover {
    background-color: #ff3f43;
  }

  #special-attack {
    background-color: #ffaf4f;
  }

  #special-attack:hover {
    background-color: #ff9a2b;
  }

  #heal {
    background-color: #aaffb0;
  }

  #heal:hover {
    background-color: #76ff7e;
  }

  .give-up {
    background-color: #ffffff;
  }

  .give-up:hover {
    background-color: #c7c7c7;
  }
  input[type=text] {
    width: 100px;
    height: 50px;
    background-color: #eee;
    box-shadow: 0 1px 1px black;
    margin: 10px;
    border-radius: 6px;
    padding-left: 5px;
    transition: all 10ms linear;
  }

  input[type=text]:focus {
    border-color: #222;
    box-shadow: 0 0 3px 1px #222;
    background: #fff;
    transition: all 10ms linear;

  }
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    box-shadow: 5px 5px 7px 0 #222222;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  #score{
    font-weight: bold;
    background: #fff;
    box-shadow: 1px 1px 10px 10px #fff;
    width: fit-content;
    margin: auto;
  }
</style>
