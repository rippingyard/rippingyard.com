interface AuthInterface {
  store: any
  redirect: any
  route: any
}

export default function ({ route, store, redirect }: AuthInterface) {
  // console.log('Auth!', store.getters['auth/isAuthenticated'])
  // console.log('middleware!')
  if (!store.getters['auth/isAuthenticated'] && route.name !== 'login') {
    redirect('/login/')
  }
}
