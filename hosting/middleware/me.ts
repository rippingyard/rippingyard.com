interface AuthInterface {
  store?: any
  $fire?: any
  route?: any
}

export default async function ({ route, store, $fire }: AuthInterface) {
  if (route.name !== 'login') store.commit('auth/storePath', route.path)
  await $fire.auth.onAuthStateChanged(
    async (u: any): Promise<void> => {
      console.log('authStateChanged!', u)
      if (!u) {
        console.log('Forced logout', route.name)
        await store.dispatch('auth/logout')
      }
    }
  )
}
