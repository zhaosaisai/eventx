import applyMixins from './mixins'

let Vue

class Store {
  constructor(options = {}) {
    const { commit, dispatch } = this
    const store = this

    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload)
    }

    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload)
    }

    this._state = options.state || {}
    this._getters = options.getters || {}
    this._mutations = options.mutations || {}
    this._actions = options.actions || {}
    this._vm = null
    this.getters = {}

    this._createVmWatcher(store)
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error('You can not set state directly')
  }

  commit(type, payload) {
    const _mutation = this._mutations[type]

    if (!_mutation) {
      return console.error(`unknown mutation type: ${type}`)
    }

    if (typeof _mutation !== 'function') {
      return console.error(`mutation type: ${type} shoule be a function`)
    }

    _mutation.call(this, this.state, payload)
  }

  dispatch(type, payload) {
    const _dispatch = this._actions[type]

    if (!_dispatch) {
      return console.error(`unknown dispatch type: ${type}`)
    }

    if (typeof _dispatch !== 'function') {
      return console.error(`dispatch type: ${type} shoule be a function`)
    }

    return Promise.resolve()
      .then(() => _dispatch.call(this, this, payload))
  }

  _createVmWatcher(store) {
    if (store._vm) return store._vm

    const computed = Object.create(null)

    Object.keys(store._getters).forEach(getter => {
      computed[getter] = function() {
        return store._getters[getter](store.state, store.getters, store)
      }

      Object.defineProperty(store.getters, getter, {
        enumerable: true,
        get: () => store._vm[getter]
      })
    })

    store._vm = new (Vue || window.Vue)({
      data: {
        $$state: store._state
      },
      computed
    })
  }
}

function install(_Vue) {
  Vue = _Vue
  applyMixins(Vue)
}

export default {
  Store,
  install
}
