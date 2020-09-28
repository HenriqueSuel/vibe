<template>
  <section class="conteiner patient">
    <h1 class="patient__title">Olá {{ getPatient.nome }}</h1>

    <div class="card">
      <div class="flex">
        <transition name="fade" mode="out-in">
          <ListDoctor
            v-on:select-doctor="chosenDoctor = $event"
            v-if="!chosenDoctor"
          />
          <AppointementDate
            v-else-if="!done"
            v-on:previous="chosenDoctor = null"
            v-on:select-date="completeAppointment"
          />
          <section class="patient__appointment__sucess" v-else>
            <FontAwesomeIcon class="icon" :icon="faCheckCircle" />
            <h3>Agendamento feito com sucesso !</h3>
            <button @click="resetAppointment">Voltar</button>
          </section>
        </transition>
      </div>
    </div>
    <div class="card history">
      <h2>Historico</h2>

      <div class="flex">
        <date-picker
          v-model="dateHistory"
          format="DD/MM/YYYY"
          placeholder="Escolher uma data"
        ></date-picker>
        <button @click="seachHistory">Buscar</button>
      </div>

      <ul class="list">
        <li v-for="(appointment, i) of listHistory" :key="i">
          <div class="flex">
            <p class="history__value">
              {{ appointment.data | date }} - status:
              {{ appointment.status | status }}
            </p>
            <span
              v-if="appointment.status !== 'CANCELADO'"
              @click="patientCancelAppointment(appointment)"
              >Cancelar</span
            >
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import { mapGetters } from 'vuex';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import AppointementDate from './components/appointment-date/AppointmentDate.vue';
import ListDoctor from './components/list-doctor/ListDoctor.vue';

export default {
  components: {
    ListDoctor,
    FontAwesomeIcon,
    AppointementDate,
    DatePicker,
  },
  data() {
    return {
      chosenDoctor: null,
      done: false,
      faCheckCircle,
      dateHistory: new Date(),
      listHistory: [],
    };
  },
  computed: {
    ...mapGetters('PatientStore', ['getPatient']),
    ...mapGetters('DoctorStore', ['findDoctorByName']),
    ...mapGetters('AppointmentStore', ['getAllPatientAppointment']),
  },
  methods: {
    selectDoctor(doctor) {
      this.chosenDoctor = doctor;
      this.listDoctor = [];
      this.nameDoctor = '';
    },
    async completeAppointment(date) {
      this.done = await this.$store.dispatch('AppointmentStore/makeAppointment', {
        date,
        doctor: this.chosenDoctor,
      });
    },
    resetAppointment() {
      this.done = false;
      this.chosenDoctor = null;
    },
    seachHistory() {
      this.listHistory = this.getAllPatientAppointment(
        this.getPatient.id,
        this.dateHistory,
      );
    },
    async patientCancelAppointment(appointment) {
      await this.$store.dispatch('AppointmentStore/cancelAppointment', appointment);
      this.listHistory = [];
    },
  },
};
</script>

<style scoped lang="scss">
.conteiner {
  padding: 32px;
}

.patient {
  &__title {
    margin-bottom: 16px;
  }
  &__card-title {
    font-size: 16px;
    font-weight: 100;
  }
  &__appointment {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-direction: column;
    align-items: center;

    &__sucess {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      h3 {
        margin-top: 16px;
        font-weight: 100;
      }
      .icon {
        font-size: 300px;
        color: var(--sucess);
      }
    }
  }
}

.history {
  .list {
    li {
      cursor: default;
    }
  }
  &__value {
    flex-grow: 1;
  }
  span {
    cursor: pointer;
  }
}
button {
  border: 0px;
  margin: 16px;
  color: white;
  background: #e72d51;
  border-radius: 10px;
  font-size: 16px;
  line-height: 21px;
  padding: 16px;
  display: flex;
}
</style>
