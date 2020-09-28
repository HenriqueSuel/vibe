<template>
  <section class="list-doctor">
    <h2 class="list-title">Escolher um medico</h2>
    <div class="list-doctor__input">
      <input type="text" placeholder="Nome do Medico" v-model="nameDoctor" />
      <button
        class="button-primary"
        @click="listDoctor = findDoctorByName(nameDoctor)"
      >
        Buscar
      </button>
    </div>
    <ul class="list">
      <li
        v-for="(doctor, i) of listDoctor"
        :key="i"
        @click="$emit('select-doctor', $event)"
      >
        {{ doctor.nome }}
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ListDoctor',
  components: {},
  data() {
    return {
      nameDoctor: '',
      listDoctor: [],
    };
  },
  computed: {
    ...mapGetters('DoctorStore', ['findDoctorByName']),
  },
};
</script>

<style scoped lang="scss">
.list-doctor {
  flex-grow: 1;
  margin-right: 32px;
  &__input {
    display: flex;
    input {
      margin-right: 8px;
    }
    .button-primary {
      margin: 16px 0;
    }
  }
}
</style>
