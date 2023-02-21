
import { defineStore } from 'pinia'
import axios from "axios";
var BaseUrl = process.env.baseUrl;
export const useTodoStore = defineStore('toDo',{
  state: () => ({
    user: null,
    users: [],
    password: null,
    tasks: [],
    error: null
  }),
  
  actions: {

    // add Todos 
    async addTodo(paylod) {
      try {
        this.error  = null
        await axios.post(`${BaseUrl}/todos`,paylod, {
          headers: {
            'Content-Type': 'application/json'
          },
          auth: {
            username: this.user.username,
            password: this.password
          }
          
        }).then(res => {
          this.tasks.push(res.data)
        })
      } catch (error) {
        this.error  = error.message
      }
    },
    async getTodo(user,password) {
      
      try {
        this.error  = null
       await axios.get(`${BaseUrl}/todos`, {
          auth: {
            username: user.username,
            password: password
          }
        })
        .then((res) => {
          this.tasks = res.data
          this.$router.push('/')
          this.user = user
          this.password = password
          
        })
      } catch (error) {
        this.error  = error.message
      }
    },
    // Update Todo
    async updateCompletedTodo(id) {
      try {
        this.error  = null
        await axios.put(`${BaseUrl}/todos/${id}`, {}, {
          headers: {
            'Content-Type': 'application/json',
            'authorization': 'Basic enVja2VyOjEyMzQ1Ng=='
          },
          auth: {
            username: this.user.username,
            password: this.password
          }
        }).then(res => {
          console.log(res)
        })
      } catch (error) {
        this.error = error.message
      }
    },




    // Delete Todo 
    async deleteTodo(id) {
      try {
        await axios.delete(`${BaseUrl}/todos/${id}`, {
          headers: {
            'Content-Type': 'application/json'
          },
          auth: {
            username: this.user.username,
            password: this.password
          }
          
        }).then(res => {
          const taskId = this.tasks.find(element => {
            return element.id == id
          })
          this.tasks.splice(this.tasks.indexOf(taskId),1)
        })
      } catch (error) {
        this.error = error.message
      }
    },
    // Get All Users 
    getAllUsers() {
      try {
        axios.get(`${BaseUrl}/users`)
        .then((res) => {
          this.users = res.data
        })
      } catch (error) {
        this.error  = error.message
      }
    },

    // logout user 
    logoutUser() {
      this.user = null
      this.$router.push('/login')
    }
    
  }
})
