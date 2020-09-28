<template>
  <section class="container">
    <h1>Filtrar</h1>
    <div class="card list-filter">
      <div class="flex list-filter__inputs">
        <date-picker
          type="date"
          range
          placeholder="Selecionar um Periodo"
          v-model="filter.period"
        ></date-picker>
        <input
          type="text"
          placeholder="Nome do Paciente"
          v-model="filter.name"
        />
      </div>
      <div class="list-filter__checkbox">
        <span v-for="(status, index) of filter.status" :key="index">
          <input
            type="checkbox"
            :name="status.name"
            :id="status.name"
            :value="true"
            v-model="status.value"
          />
          <label :for="status.name">{{ status.name }}</label>
        </span>
      </div>
      <div class="list-filter__button">
        <button class="button-primary" @click="search">Buscar</button>
      </div>
    </div>

    <section class="card">
      <div class="list-patient">
        <h1>Historico</h1>
        <ul class="list" v-for="(history, i) of listHistory" :key="i">
          <li class="flex">
            <div class="list-patient__info">
              Data: {{ history.data | date }} - Nome do Paciente:
              {{ history.nameUser }} - Status:
              {{ history.status | status }}
            </div>
            <div
              class="list-patient__action"
              v-if="history.status === 'AGENDADO'"
            >
              <a @click="absence(history)">Não compareçeu</a>
              <router-link class="link" :to="'/registro/' + history.id">
                Começar a consulta
              </router-link>
            </div>
          </li>
        </ul>
      </div>
    </section>
  </section>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import { mapGetters } from 'vuex';

export default {
  name: 'DoctorAppoitment',
  components: {
    DatePicker,
  },
  data() {
    return {
      filter: {
        period: null,
        name: '',
        status: [
          {
            name: 'Falta',
            value: false,
          },
          {
            name: 'Cancelado',
            value: false,
          },
          {
            name: 'Agendado',
            value: false,
          },
          {
            name: 'Realizada',
            value: false,
          },
          {
            name: 'Concluido',
            value: false,
          },
        ],
      },
      listHistory: [],
    };
  },
  computed: {
    ...mapGetters('AppointmentStore', ['filterAppointment']),
  },
  methods: {
    search() {
      this.listHistory = this.filterAppointment(this.filter);
    },
    async absence(appointment) {
      await this.$store.dispatch('AppointmentStore/updateStatusAppointment', {
        ...appointment,
        status: 'FALTA',
      });
      this.listHistory = [];
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  padding: 0 36px;
}
.list-filter {
  &__inputs {
    display: flex;
  }
  &__checkbox {
    align-items: center;
    margin-left: 8px;
    margin-top: 16px;
    label {
      margin: 0 8px 0 4px;
    }
  }
  &__button {
    text-align: right;
  }
}

@media only screen and (max-width: 750px) {
  .list-filter {
    &__checkbox {
      span {
        display: flex;
        align-items: center;
      }
    }
    &__inputs {
      flex-direction: column-reverse;
    }
  }
  .list-patient {
    .list {
      .flex {
        flex-direction: column;
        height: 100%;
      }
    }
    &__info {
      margin: 24px 0;
    }
    &__action {
      align-self: flex-start;
      display: flex;
      flex-direction: column;
    }
  }
}

.list-patient {
  .list li {
    cursor: default;
    flex-direction: row;
    justify-content: right;
    align-items: center;
  }
  &__info {
    flex-grow: 1;
  }
  &__action {
    a {
      cursor: pointer;
      margin-right: 8px;
      &:hover {
        color: #e72d51;
      }
    }
  }
}

.link {
  color: black;
  text-decoration: none;
}
</style>
