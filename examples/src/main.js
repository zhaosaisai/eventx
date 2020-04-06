import Vue from 'vue'
import App from './App.vue'
import eventx from '../../src/index'

Vue.use(eventx)

const store = new eventx.Store({
  state: {
    name: 'zhaosaisai'
  },
  getters: {
    caplize(state) {
      return state.name.toLocaleUpperCase()
    }
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  actions: {
    dispatchName(store, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          store.state.name = payload
          resolve(payload + 'ssssss')
        }, 3000)
      })
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  store
})
