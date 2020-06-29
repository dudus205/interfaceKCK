<template>
  <div id="app">
    <hello-world></hello-world>
      <settings></settings>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  }
}
</script>

<style>
  body{
    background-image: url("./assets/bg.png");
    margin: 0 15%;
    text-align: center;
    width: 70%;
    font-family: 'Muli', sans-serif;
    transition: background 3s ease-in-out;
  }
  button{
    outline: none;
  }
  div{
    border-radius: 5px;
  }
  hr{
    width: 80%;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
