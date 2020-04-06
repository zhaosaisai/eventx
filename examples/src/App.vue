<template>
  <div id="app">
    {{ $store.state.name }}<br />
    {{ $store.getters.caplize }}<br />
    <button @click="$store.state.name = 'saisai'">toLocaleUpperCase</button><br />
    <button @click="setState">setState</button><br />
    <button @click="commit">commit</button><br />
    <button @click="dispatch">dispatch</button><br />
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {
    console.log(this.$store)
  },
  methods: {
    setState() {
      this.$store.state = {}
    },
    commit() {
      this.$store.commit('updateName', 'hello world')
    },
    dispatch() {
      this.$store.dispatch('dispatchName', 'hi world').then((v) => {
        console.log(this.$store.state.name)
        console.log(v)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
