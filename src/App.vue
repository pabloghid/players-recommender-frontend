<template>
  <div>
    <NavbarComponent />
  </div>
  <div id="app">
    <div class="container mt-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';

export default {
  name: 'App',
  components: {
    NavbarComponent,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: rgb(184, 206, 206);
}

html,
body {
  height: 100%;
  margin: 0;
}

body {
  background-color: rgb(99, 143, 143);
  display: flex;
  flex-direction: column;
}

#app {
  flex: 1;
}
</style>
