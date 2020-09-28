<template>
  <section class="select-type-register">
    <div
      class="card js-doctor"
      :class="{ active: !isPatient }"
      @click="$emit('change-kind-person', false)"
    >
      <font-awesome-icon :icon="faUserMd" size="lg" />
      <p>Sou medico</p>
    </div>
    <div
      class="card js-patient"
      :class="{ active: isPatient }"
      @click="$emit('change-kind-person', true)"
    >
      <font-awesome-icon :icon="faUserInjured" size="lg" />
      <p>Sou paciente</p>
    </div>
  </section>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faUserMd, faUserInjured } from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'KindPerson',
  components: {
    FontAwesomeIcon,
  },
  props: {
    isPatient: Boolean,
  },
  data() {
    return {
      faUserMd,
      faUserInjured,
    };
  },
};
</script>

<style scoped lang="scss">
.select-type-register {
  display: flex;
  margin-top: 32px;
  justify-content: center;
  .card {
    flex-direction: column;
    cursor: pointer;
    margin-left: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    p {
      font-size: 16px;
      margin-top: 16px;
    }
    &.active {
      background: #e72d51;
      color: white;
    }
  }
}
</style>
