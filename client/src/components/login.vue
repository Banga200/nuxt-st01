<template>
    <div class="login-container">
        
        <ul>
            <h2>Choose your account</h2>
            <li v-for="user in Users" :key="user.id" @click="isPassword = !isPassword; getUserName(user)">
                <img width="80" height="80" :src="user.avatar"/>
                <span >{{user.name}}</span>
            </li>
        </ul>
       <div v-if="isPassword" class="password">
            <input type="text" placeholder="Enter Password" v-model="password">
            <button  @click="login">Submit</button>
       </div>
        
    </div>
    <small v-if="isError" style="color:red">{{ isError }}</small>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTodoStore } from '../stores/todo';
export default{
    data: () => ({
        isPassword: false,
        user: '',
        password: '',
        isError: ''
    }),
    computed: {
        ...mapState(useTodoStore, ['users', 'error']),
        Users() {
            return this.users
        }
    },
    methods: {
        ...mapActions(useTodoStore, ['getTodo','getAllUsers']),
        getUserName(user) {
            this.password = ''
            this.user = user
            this.error = false
        },
         login() {
            this.getTodo(this.user, this.password)
            this.isError = this.error
        }
    },
    created() {
       
    }
}
</script>

<style>
.password a {
    border: 1px solid lightblue;
    padding: 0.5rem 1rem;
    color: black !important;
    text-decoration: none;
}
.password a:hover {
    background-color: lightblue;
}
.login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    min-height: 50vh;
    margin: auto;
}
.login-container input {
    padding: 10px;
    margin-left: 3rem;
    margin-right: .5rem;
}
.login-container ul {
    padding: 0;
    margin: 0;
    list-style: none;
}
.login-container ul h2 {
    margin-bottom: 1.5rem;
}
.login-container ul li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 5px 10px;
}
.login-container ul li:hover {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
.login-container ul li span{
    margin-left: 2rem;
}
.login-container ul li img {
    border: none;
    border-radius: 50%;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
}
</style>