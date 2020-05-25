import Vue from 'vue'
import { config, RouterLinkStub } from '@vue/test-utils'
import firebasemock from 'firebase-mock'

// ------- Jest: Mock -------

var mockauth = new firebasemock.MockAuthentication()
var mockfirestore = new firebasemock.MockFirestore()
var mockstorage = new firebasemock.MockStorage()
var mocksdk = new firebasemock.MockFirebaseSdk(
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
  }
}

jest.mock('~/plugins/firebase', () => {
  return mocksdk
})

// ------- Jest: Setup -------

Vue.config.silent = true

config.stubs['nuxt-link'] = RouterLinkStub
config.stubs['SvgLogo'] = true
