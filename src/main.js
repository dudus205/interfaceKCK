import Vue from 'vue'
import App from './App.vue'
import Logo from "@/components/Logo.vue";
import List from "@/components/List.vue";
import Scores from "@/components/Scores.vue";
import Settings from "@/components/Settings";

Vue.config.productionTip = false;
Vue.component("logo", Logo);
Vue.component("list", List);
Vue.component("scores", Scores);
Vue.component("settings", Settings);

new Vue({
  render: h => h(App),
}).$mount('#app')
