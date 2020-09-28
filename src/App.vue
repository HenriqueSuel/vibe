<template>
  <div id="app">
    <Toast />
    <Header />
    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import Header from '@/components/header/Header.vue';
import Toast from '@/components/toast/Toast.vue';
import '@/styles/datepicker.scss';

export default {
  components: {
    Header,
    Toast,
  },
};
</script>

<style lang="scss">
@import "./styles/color.scss";
@import "./styles/input.scss";
@import "./styles/default.scss";
@import "./styles/button.scss";
@import "./styles/card.scss";
@import "./styles/list.scss";
</style>
