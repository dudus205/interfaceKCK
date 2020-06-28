<template>
    <div>
        <img v-if="!value" @click="changeValue" src="../assets/logo.png">
        <img v-else @click="changeValue" src="../assets/logo2.png">
    </div>
</template>

<script>
    export default {
        data:function(){
            return{
                value: false,
            }
        },
        methods:{
            changeValue(){
                this.value = !this.value;
            }
        }
    }
</script>

<style scoped>
    img{
        border-radius: 50%;
        border: 1px solid #222222;
        height: 200px;
        width: 200px;
        margin: 5px;
        box-shadow: 0 0 5px 0 #222222;
    }
</style>