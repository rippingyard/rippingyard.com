import { config, RouterLinkStub } from '@vue/test-utils'

console.log('setup jest')

Vue.config.silent = true;

config.stubs['nuxt-link'] = RouterLinkStub
config.stubs['SvgLogo'] = '<svg></svg>'
