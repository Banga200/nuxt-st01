
<template>
  <header>
    <h1>LOGO</h1>
    <div class="user-info" v-if="User">
      <img class="avatar" :src="User.avatar"/>
      <p>{{ User.name }}</p>
      <p @click="logout" class="logout">Logout</p>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import { useTodoStore } from './stores/todo';

export default {
  computed: {
    ...mapState(useTodoStore, ['user']),
    ...mapActions(useTodoStore, ['getAllUsers','logoutUser']),
    User() {
      return this.user
    }
  },
  methods: {
    logout() {
      this.logoutUser
    }
  },
  created() {
       this.getAllUsers
  }
}
</script>
<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  border: 0.5px solid lightgray;
  border-radius: 50%;
  margin-right: 10px;
}
.logout {
  font-weight: bold;
  margin-left: 3rem;
  cursor: pointer;
}
@media (max-width: 450px) {
  header {
    padding: 0.5 2% !important;
  }
  header h1 {
    font-size: 1.2rem;
  }
  .logout {
  margin-left: 1rem;
  }
}
</style>
