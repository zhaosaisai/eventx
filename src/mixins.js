export default function applyMixins(Vue) {
  return Vue.mixin({ beforeCreate: init })
}

function init() {
  const options = this.$options

  if (options.store) {
    this.$store = typeof options.store === 'function'
      ? options.store()
      : options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
