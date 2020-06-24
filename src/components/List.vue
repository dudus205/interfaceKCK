<template>
    <transition name="slide-fade" mode="out-in">
        <section id="log" class="row log" >
            <ul v-for="item in logs" :key="item.text">
                <li>
                    {{item.text}}
                </li>
            </ul>
        </section>
    </transition>
</template>

<script>
    export default {
        name: "List",
        props: ['logs'],
    }
</script>

<style scoped>
    .log {
        background-color: #F6F6F6;
        margin-top: 20px;
        text-align: center;
        padding: 10px;
        border: 1px solid #ccc;
        box-shadow: 0 3px 6px #ccc;
    }
    .log ul {
        list-style: none;
        font-weight: bold;
        text-transform: uppercase;
    }

    .log ul{
        margin: 5px;
    }
    .log li{
        background: #fff;
        padding: 2px;
        border-radius: 5px;
        margin: 2px;
    }

</style>