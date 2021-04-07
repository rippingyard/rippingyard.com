import Vue from 'vue'
import { Store } from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    $isAuthenticated(store: Store<any>): boolean
  }
}

Vue.prototype.$isAuthenticated = (store: Store<any>) => {
  return !store ? false : store.getters['auth/isAuthenticated']
}

Vue.mixin({
  mounted() {
    // console.log('isAuth', this)
  },
})
