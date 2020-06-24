<template>
    <div id="scores">
        <transition name="slide-fade" mode="out-in">
            <button
                v-if="showScores === false"
                @click="showScores = !showScores">Height scores</button>
            <div v-if="showScores">
                <p>Nickname: Score</p>
                <ul v-for="(value,key) in scoreList" :key="key">
                    <li>
                        {{value.Player}}: {{value.Score}}
                    </li>
                </ul>
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
            }
        },
        mounted (){
              const url = baseURL + 'score';
                axios.get(url)
                    .catch(error => console.log(error))
                    .then(response => (this.scoreList = response.data))
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