<template>
    <div id="scores">
        <transition name="slide-fade" mode="out-in">
            <button
                v-if="showScores === false"
                @click="showScores = !showScores">Height scores</button>
            <div v-if="showScores">
                <div id="switch">
                    <button @click="changeContent" :style="{'active' : scoreValue}" autofocus>Score</button>
                    <button @click="changeContent" :style="{'active' : scoreValue}">Players</button>
                </div>
                <p>Nickname: Score</p>
                    <div v-if="scoreValue">
                        <ul v-for="(value,key) in scoreList" :key="key">
                            <li>
                                {{value.Player}}: {{value.Score}}
                            </li>
                        </ul>
                    </div>
                    <div v-else>
                        <ul v-for="(value,key) in scoreList2" :key="key">
                            <li>
                                {{value.Player}}: {{value.Score}}
                            </li>
                        </ul>
                    </div>
                <hr>
                <button @click="showScores = !showScores">Close</button>
            </div>
        </transition>
    </div>
</template>

<script>
    import {baseURL} from './baseURL.js';
    import axios from 'axios';
    export default {
        name: "Scores",
        data: function(){
            return{
                showScores: false,
                scoreList: [],
                scoreList2: [],
                scoreValue: true,
            }
        },
        methods:{
            changeContent (){
                this.scoreValue = !this.scoreValue;
            },
        },
        mounted (){
              const url = baseURL;
                axios.get(url + 'score')
                    .catch(error => console.log(error))
                    .then(response => (this.scoreList = response.data));

                axios.get(url + 'score2')
                    .catch(error => console.log(error))
                    .then(response => (this.scoreList2 = response.data));

            },
    }
</script>

<style scoped>

    button {
        font-size: 20px;
        background-color: #8a92ff;
        padding: 12px;
        box-shadow: 0 1px 1px black;
        margin: 15px;
        border-radius: 6px;
    }
    button:active{
        transform: translateY(4px);
        transition: transform 10ms;
    }
    button:hover{
        background: #828bff;
    }
    #switch button{
        font-size: 15px;
        float: right;
        margin: 0;
        border-radius: 3px;
    }
    #switch button:hover{
        background-color: #F6F6F6;
        transition: background-color 10ms;
    }
    #switch{
        margin-right: 5px;
    }

    #scores{
        background-color: #f2f2f2;
        margin-top: 10px;
        text-align: center;
        padding: 10px;
        border: 1px solid #ccc;
        box-shadow: 0 3px 6px #ccc;
        transition: height 6s linear;
        border-top: 2px solid #c2c2c2;
        border-bottom: 1px solid #c2c2c2;
    }
    ul li {
        text-align: left;
        padding-left: 5px;

    }
    p{
        text-align: left;
        padding-left: 5px;
        font-weight: bold;
    }
    hr{
        margin-top: 20px;
        margin-bottom: 0;
    }

</style>