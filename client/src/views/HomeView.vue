<template>
  <div class="home-list">
    <div class="list-container">
      <form @submit.prevent>
        <label for="todo">ToDo</label>
        <input placeholder="Enter ToDo" @keypress.enter="addTodos" id="todo" v-model="todo"/>
        <button @click="addTodos" class="addButton" type="button">+ Add</button>
      </form>
      <div class="list">
        <ul>
          <li v-for="task in Tasks" :key="task.id">
            <p>{{ task.task }}</p>
            <div class="todo-operatios">
              <div>
                <label for="complete">Complete</label>
                <input type="checkbox" v-model="task.completed"  id="complete" @change="completed(task.id, task)"/>
              </div>
              <div>
                <button type="button" @click="deletetodos(task.id)">Delete</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    
  </div>
  <small v-if="error" style="color:red; display: block; text-align: center;">{{ error }}</small>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useTodoStore } from '../stores/todo';

export default {
  data: () => ({
    todo: '',
    isError: '',
  }),
  computed: {
    ...mapState(useTodoStore, ['tasks', 'error']),
    
    Tasks() {
      return this.tasks
    },
    
  },
  methods: {
    ...mapActions(useTodoStore, ['getTodo', 'addTodo', 'deleteTodo','updateCompletedTodo']),
    addTodos() {
      if(this.todo != '') {
        this.addTodo({task: this.todo})
        this.todo = ''
      }
      else{
        this.isError = "Field is required"
        return
      }
      this.isError = this.error
    },
    deletetodos(taskID) {
      this.deleteTodo(taskID)
    },
    completed(id) {
      this.updateCompletedTodo(id)
    }
  },
  created(){
    this.getTodo
  }
}
</script>

<style scoped>

.home-list {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-container {
  padding: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
form label {
  display: block;
}
#todo {
  padding: 10px;
  border: 1px solid lightgray;
  margin-bottom: 2rem;
  width:300px;
  margin-right: 10px;
  border-radius: 5px;
}
.list ul{
  padding: 0;
  margin: 0;
}
.list ul li{
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list ul li:hover {
  background: lightgray;
}
.list ul li div{
  text-align: center;
}
.list ul li label {
  display: block;
}
.todo-operatios {
  display: flex;
  align-items: center;
}
.todo-operatios button {
  border: none;
  background: red;
  color: white;
  padding: 5px 10px;
  margin-left: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
}
.addButton {
  border: none;
  padding:  10px 20px;
  background: lightblue;
  cursor: pointer;
  border-radius: 5px;
}
.addButton:hover {
  background: darkcyan;
  color: white;
  
}
</style>
