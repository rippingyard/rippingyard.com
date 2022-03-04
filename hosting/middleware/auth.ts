interface AuthInterface {
  store: any
  redirect: any
  route: any
}

export default function ({ route, store, redirect }: AuthInterface) {
  if (!store.getters['auth/isAuthenticated'] && route.name !== 'login') {
    redirect('/login/')
  }
}

