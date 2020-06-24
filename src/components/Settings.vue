<template>
    <div id="settings">
        <button @click="change"
                :class="{'clicked' : showSettings}">
            <i class="fas fa-sliders-h"></i>
        </button>
        <transition name="slide-fade">
            <div id="content">
                <p>Audio settings</p>
                <audio autoplay loop controls> <!-- add autoplay loop -->
                    <source src="../audio/Timecop1983 - On the Run.mp3">
                </audio>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Settings",
        data (){
            return{
                showSettings: false,
            }
        },
        methods: {
          change(){
              this.showSettings = !this.showSettings;
              if(this.showSettings)
                document.getElementById('content').style.opacity = '1';
              else
                  document.getElementById('content').style.opacity = '0';
          }
        },

    }
</script>

<style scoped>
    button {
        font-size: 15px;
        background-color: #F6F6F6;
        padding: 12px;
        box-shadow: 0 0 1px black;
        border-radius: 2px;
        margin-bottom: 5px;
    }
    button:active{
        transform: translateY(4px);
        transition: transform 10ms;
    }
    button:hover{
        background-color: #c2c2c2;
    }
    .clicked{
        background-color: #c7c7c7;
    }
    #settings{
        position: fixed;
        top: 15px;
        right: 10px;
        text-align: right;
    }
    #content{
        padding: 5px;
        opacity: 0;
        background-color: #f1f3f4;
        box-shadow: 0 0 3px 1px #222;
        text-align: left;
        border-top: 1px solid #222222;
        border-right: 1px solid #222222;
        margin-top: 5px;
        transition: opacity 0.3s ease-in-out;
    }
    audio{
        outline: none;
    }
    p{
        padding-left: 5px;
    }

</style>