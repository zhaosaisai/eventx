<h1 align="center">Welcome to eventx 👋</h1>
<p>
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> The core implementation of vuex

## Install

```sh
npm install eventx
```

## Usage

Just like `vuex`

```js
import Vue from 'vue'
import App from './App.vue'
import eventx from 'eventx'

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
```

## Run tests

```sh
npm run test
```

## Author

👤 **zhaosaisai**

* Website: https://zhaosaisai.com/
* Github: [@zhaosaisai](https://github.com/zhaosaisai)

## Show your support

Give a ⭐️ if this project helped you!

