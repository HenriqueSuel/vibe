<template>
  <section class="patient__appointment">
    <h2 class="patient__card-title">Data do Agendamento</h2>
    <date-picker
      v-model="dateAppointment"
      format="DD/MM/YYYY"
      placeholder="Data do Agendamento"
      :default-value="new Date().setHours(12, 0, 0, 0)"
      :disabled-date="notBeforeToday"
      inline
    ></date-picker>
    <date-picker
      v-model="dateAppointment"
      :time-picker-options="{
        start: '07:00',
        step: '01:00',
        end: '18:00',
      }"
      :disabled-time="notBeforeTodayTwelveOClock"
      format="HH:mm"
      type="time"
      placeholder="HH:mm"
    ></date-picker>
    <div class="flex patient__appointment__list-button">
      <button class="button-primary" @click="$emit('previous', true)">
        Voltar
      </button>
      <button
        class="button-primary"
        @click="$emit('select-date', dateAppointment)"
      >
        Finalizar
      </button>
    </div>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import { format } from 'date-fns';

export default {
  name: 'AppointementDate',
  data() {
    return {
      dateAppointment: null,
    };
  },
  components: {
    DatePicker,
  },
  methods: {
    notBeforeTodayTwelveOClock(date) {
      const hh = format(new Date(), 'HH');
      return date < new Date(new Date().setHours(hh, 59, 59, 59));
    },
    notBeforeToday(date) {
      return date < new Date(new Date().setHours(0, 0, 0, 0));
    },
  },
};
</script>

<style scoped lang="scss">
.patient__appointment {
  &__list-button {
    button {
      margin: 16px 8px;
    }
  }
}
.mx-datepicker {
  margin-top: 24px;
  width: 264px;
}
</style>
