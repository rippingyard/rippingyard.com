import Vue from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    snack(message: string, msec?: number, params?: Params): void
    closeSnack(msec: number): void
  }
}

type Params = {
  type?: 'default' | 'danger'
}

Vue.mixin({
  methods: {
    snack(message: string, msec: number = 3000, params: Params = {}) {
      this.$store.commit('snack/open', {
        message,
        ...params,
      })
      this.closeSnack(msec)
    },
    snackAlert(message: string, msec: number = 3000): void {
      this.snack(message, msec, {
        type: 'danger',
      })
    },
    closeSnack(msec: number): void {
      setTimeout(() => {
        this.$store.commit('snack/close')
      }, msec)
    },
  },
})
