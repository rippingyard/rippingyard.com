import { Context as NuxtContext } from '@nuxt/types'

export type Context = NuxtContext & {
  $fire: any
  $toast: any
}
