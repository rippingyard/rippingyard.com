const isAuthenticated = (store) => {
  console.log(store.getters)
  return !store ? false : store.getters['auth/isAuthenticated']
}

export default ({}, inject) => {
  inject('isAuthenticated', isAuthenticated)
}