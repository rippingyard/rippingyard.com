import Vue from 'vue'
import { config, RouterLinkStub } from '@vue/test-utils'

const firebasemock = require('firebase-mock')

// ------- Jest: Mock -------

const mockauth = new firebasemock.MockAuthentication()
const mockfirestore = new firebasemock.MockFirestore()
const mockstorage = new firebasemock.MockStorage()
const mocksdk = new firebasemock.MockFirebaseSdk(
  null,
  () => {
    return mockauth
  },
  () => {
    return mockfirestore
  },
  () => {
    return mockstorage
  },
  null
)

mocksdk.db = mocksdk.firestore()

mocksdk.timestamp = {
  now: () => {
    return new Date()
  },
}

jest.mock('@nuxtjs/firebase', () => {
  return mocksdk
})

// ------- Jest: Setup -------

Vue.config.silent = true

config.stubs['nuxt-link'] = RouterLinkStub
config.stubs.SvgLogo = true
