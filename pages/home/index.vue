<template>
  <section class="main-content columns">
    <div class="container column is-6 is-offset-1">
      <section class="section">
        <b-menu>
          <b-menu-list label="Menu">
            <b-menu-item icon="information-outline" label="新規投稿" tag="nuxt-link" to="/home/post/create"></b-menu-item>
            <b-menu-item :active="isActive" icon="settings" expanded>
              <template slot="label" slot-scope="props">
                Administrator
                <b-icon :icon="props.expanded ? 'menu-down' : 'menu-up'" class="is-pulled-right"></b-icon>
              </template>
              <b-menu-item icon="account" label="Users"></b-menu-item>
              <b-menu-item icon="cellphone-link">
                <template slot="label">
                  Devices
                  <b-dropdown aria-role="list" class="is-pulled-right" position="is-bottom-left">
                    <b-icon slot="trigger" icon="dots-vertical"></b-icon>
                    <b-dropdown-item aria-role="listitem">Action</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">Another action</b-dropdown-item>
                    <b-dropdown-item aria-role="listitem">Something else</b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-menu-item>
              <b-menu-item icon="cash-multiple" label="Payments" disabled></b-menu-item>
            </b-menu-item>
            <b-menu-item icon="account" label="My Account">
              <b-menu-item label="Account data"></b-menu-item>
              <b-menu-item label="Addresses"></b-menu-item>
            </b-menu-item>
          </b-menu-list>
        </b-menu>
      </section>
    </div>
    <div class="container column is-5">
      <section class="section">
        <InfoMe/>
      </section>
    </div>
  </section>
</template>

<script>

import InfoMe from '~/components/molecules/InfoMe'

export default {
  components: {
    InfoMe,
  },
  head: () => {
    return {
      title: 'HOME'
    }
  },
  mounted() {

    if( !this.$isAuthenticated(this.$store) ) {
      this.$buefy.notification.open({
        duration: 5000,
        message: 'ログインしてください',
        position: 'is-bottom-right',
        type: 'is-danger',
        hasIcon: false
      })
      this.$router.push('/signin')
    }

  },
}
</script>

<style>
.section {
  position: relative;
}
</style>
