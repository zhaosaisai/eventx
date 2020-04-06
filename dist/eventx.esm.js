/**
 * eventx v1.0.0
 * (c) 2020 zhaosaisai
 * @license MIT
 */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function applyMixins(Vue) {
  return Vue.mixin({
    beforeCreate: init
  });
}

function init() {
  var options = this.$options;

  if (options.store) {
    this.$store = typeof options.store === 'function' ? options.store() : options.store;
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store;
  }
}

var Vue;

var Store = /*#__PURE__*/function () {
  function Store() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Store);

    var commit = this.commit,
        dispatch = this.dispatch;
    var store = this;

    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload);
    };

    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload);
    };

    this._state = options.state || {};
    this._getters = options.getters || {};
    this._mutations = options.mutations || {};
    this._actions = options.actions || {};
    this._vm = null;
    this.getters = {};

    this._createVmWatcher(store);
  }

  _createClass(Store, [{
    key: "commit",
    value: function commit(type, payload) {
      var _mutation = this._mutations[type];

      if (!_mutation) {
        return console.error("unknown mutation type: ".concat(type));
      }

      if (typeof _mutation !== 'function') {
        return console.error("mutation type: ".concat(type, " shoule be a function"));
      }

      _mutation.call(this, this.state, payload);
    }
  }, {
    key: "dispatch",
    value: function dispatch(type, payload) {
      var _this = this;

      var _dispatch = this._actions[type];

      if (!_dispatch) {
        return console.error("unknown dispatch type: ".concat(type));
      }

      if (typeof _dispatch !== 'function') {
        return console.error("dispatch type: ".concat(type, " shoule be a function"));
      }

      return Promise.resolve().then(function () {
        return _dispatch.call(_this, _this, payload);
      });
    }
  }, {
    key: "_createVmWatcher",
    value: function _createVmWatcher(store) {
      if (store._vm) return store._vm;
      var computed = Object.create(null);
      Object.keys(store._getters).forEach(function (getter) {
        computed[getter] = function () {
          return store._getters[getter](store.state, store.getters, store);
        };

        Object.defineProperty(store.getters, getter, {
          enumerable: true,
          get: function get() {
            return store._vm[getter];
          }
        });
      });
      store._vm = new (Vue || window.Vue)({
        data: {
          $$state: store._state
        },
        computed: computed
      });
    }
  }, {
    key: "state",
    get: function get() {
      return this._vm._data.$$state;
    },
    set: function set(v) {
      console.error('You can not set state directly');
    }
  }]);

  return Store;
}();

function install(_Vue) {
  Vue = _Vue;
  applyMixins(Vue);
}

var index = {
  Store: Store,
  install: install
};

export default index;
