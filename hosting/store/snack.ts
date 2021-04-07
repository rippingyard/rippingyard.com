import { SnackState } from '~/types/state'

export const state = () => ({
  isOpen: false,
  message: '',
  type: 'info',
})

export const mutations = {
  open(
    state: SnackState,
    params: {
      message: string,
      type: 'info' | 'warn' | 'danger' | 'fatal'
    }
  ): void {
    state.isOpen = true
    state.message = params.message
    state.type = params.type || 'info'
  },
  close(state: SnackState): void {
    state.isOpen = false
  },
}

export const getters = {
  isOpen(state: SnackState) {
    return !!state.isOpen
  },
  message(state: SnackState) {
    return state.message
  },
  type(state: SnackState) {
    return state.type
  },
}
