import Vue from 'vue'
import { Store, mapActions } from 'vuex'

interface AuthInterface {
  store: any
  redirect: any
  route: any
}

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

export default function ({ route, store, redirect }: AuthInterface) {
  if (!store.getters['auth/isAuthenticated'] && route.name !== 'login') {
    redirect('/login/')
  }
}

