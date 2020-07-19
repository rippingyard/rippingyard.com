import Vue from 'vue'

export default function({ $gtm, route }) {

  if( process.env.NODE_ENV !== 'production' ) {
    console.log('nothing init gtm on ', process.env.NODE_ENV)
  } else {
    $gtm.init('GTM-5B3N3TX')
    Vue.mixin({
      beforeRouteEnter: function(to, from, next) {
        next(vm => {
          setTimeout(() => {
            console.log('pageView', document.title)
            window.dataLayer.push(to.gtm || {
              event: 'nuxtRoute',
              pageType: 'PageView',
              pageUrl: to.fullPath,
              pageTitle: document.title,
              // routeName: to.name,
              routeName: document.title,
            })
          }, 1000)
        })
      }
    })
  }
}