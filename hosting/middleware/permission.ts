import Vue from 'vue'
import { Store, mapActions } from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    $isAuthenticated(store: Store<any>): boolean
    can: Function
  }
}

Vue.prototype.$isAuthenticated = (store: Store<any>) => {
  return !store ? false : store.getters['auth/isAuthenticated']
}

Vue.mixin({
  methods: {
    ...mapActions({
      can: 'auth/can',
    }),
  }
})
