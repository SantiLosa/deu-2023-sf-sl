import { createApp } from 'vue'
import App from './App.vue'
import { createRouter } from "vue-router"
import HelloWorld from "./components/Home/HelloWorld.vue"
import UsersTable from "./components/Users/Users.vue"

const router = createRouter ({
    routes: [
        {
            path: "/",
            name: "home",
            component: HelloWorld
        },
        {
            path: "/users",
            name: "users",
            component: UsersTable
        }
    ]
})

createApp(App).use(router).mount('#app')