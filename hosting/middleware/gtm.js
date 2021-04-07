import Vue from 'vue'

export default function ({ $gtm }) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('nothing init gtm on', process.env.NODE_ENV)
  } else {
    $gtm.init()
    Vue.mixin({
      beforeRouteEnter(to, _from, next) {
        next(_vm => {
          setTimeout(() => {
            $gtm.push(
              to.gtm || {
                event: 'nuxtRoute',
                pageType: 'PageView',
                pageUrl: to.fullPath,
                pageTitle: document.title,
                routeName: document.title,
              }
            )
          }, 1000)
        })
      },
    })
  }
}
