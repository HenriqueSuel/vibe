<template>
  <header class="header">
    <nav>
      <div class="header__logo">
        <img
          class="header__image"
          alt="Vibe saude logo"
          src="../../assets/logo.png"
        />
      </div>
      <a class="header__logout" v-if="isUserActive" @click="logout">Sair</a>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Header',
  computed: {
    ...mapGetters('PatientStore', ['getPatient']),
    ...mapGetters('DoctorStore', ['getDoctor']),
    isUserActive() {
      if (this.$route.path === '/') return false;
      return this.getDoctor || this.getPatient;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('PatientStore/actionLogoutPatient', null);
      this.$store.dispatch('DoctorStore/actionLogoutPatient', null);
    },
  },
};
</script>

<style scoped lang="scss">
.header {
  background: #f5f5f5;
  height: 64px;
  padding: 0 16px;
  nav {
    height: 100%;
    display: flex;
    align-items: center;
  }
  &__logo {
    flex-grow: 1;
    img {
      height: 32px;
    }
  }
  &__logout {
    cursor: pointer;
    margin-right: 32px;
  }
}
</style>
