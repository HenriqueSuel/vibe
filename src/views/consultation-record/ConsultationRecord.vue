<template>
  <section class="container consultation-record">
    <div class="card" v-if="appointment">
      <div>
        <h1>CID</h1>
        <textarea
          v-model="appointment.cid"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="CID"
        ></textarea>
      </div>
      <div>
        <h1>Descricao do registro</h1>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="appointment.descricao"
        ></textarea>
      </div>

      <div class="flex consultation-record__button">
        <button class="button-primary" @click="previous">Voltar</button>
        <button class="button-primary" @click="finish">Finalizar</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DoctorAppoitment',
  components: {},
  data() {
    return {
      appointment: null,
    };
  },
  mounted() {
    this.appointment = this.findAppointmentById(this.$route.params.id);
  },
  computed: {
    ...mapGetters('AppointmentStore', ['findAppointmentById']),
  },
  methods: {
    ...mapActions('GlobalStore', ['actionToast']),
    ...mapActions('AppointmentStore', ['updateStatusAppointment']),
    async finish() {
      if (!this.appointment.cid && !this.appointment.descricao) {
        this.actionToast({
          title: 'Campos Invalidos',
          description: 'Todos os campos sāo obrigatorios',
          type: 'error',
        });
        return;
      }
      const sucess = await this.updateStatusAppointment({
        ...this.appointment,
        status: 'CONSULTA_REALIZADA',
      });
      if (sucess) this.previous();
    },
    previous() {
      this.$router.push('/doutor/agendamento');
    },
  },
};
</script>

<style scoped lang="scss">
textarea {
  height: 200px;
  width: 100%;
  margin-top: 16px;
  padding: 17px;
  font-family: "Roboto Slab", serif;
  background: #f5f5f5;
  border: 2px solid #ffff;
  border-radius: 10px;
  &:focus {
    border: 2px solid #e72d51;
  }
}
.consultation-record {
  &__button {
    justify-content: center;
    button {
      margin-right: 8px;
    }
  }
}
</style>
