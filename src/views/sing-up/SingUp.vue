<template>
  <div class="register">
    <h1 class="register__title">Cadastre-se</h1>
    <KindPerson
      :isPatient="isPatient"
      v-on:change-kind-person="isPatient = $event"
    ></KindPerson>
    <section class="register__card card">
      <form class="register__form" @submit="submit">
        <input type="text" placeholder="Nome" v-model="$v.form.nome.$model" />
        <span class="mensage-error" v-if="$v.form.nome.$error"
          >Nome é obrigatorio</span
        >
        <date-picker
          v-model="$v.form.dataNascimento.$model"
          format="DD/MM/YYYY"
          placeholder="Data de Nascimento"
          :disabled-date="disabledBeforeToday"
        ></date-picker>
        <span class="mensage-error" v-if="$v.form.dataNascimento.$error"
          >Data de Nascimento é obrigatoria</span
        >
        <div class="register__form__radio">
          <span>
            <input
              id="masculino"
              type="radio"
              value="m"
              v-model="$v.form.sexo.$model"
            />
            <label for="masculino">Masculino</label>
          </span>
          <span>
            <input
              id="feminino"
              type="radio"
              value="f"
              v-model="$v.form.sexo.$model"
            />
            <label for="feminino">Feminino</label>
          </span>
        </div>

        <input
          type="text"
          placeholder="CPF"
          v-model="$v.form.doc.$model"
          v-if="isPatient"
          v-mask="'###.###.###-##'"
          :class="{ 'input-error': $v.form.doc.$error }"
        />
        <input
          type="text"
          placeholder="CRM"
          v-else
          v-model="$v.form.doc.$model"
          v-mask="'XXXXXXXXXXXXXXXXX'"
          :class="{ 'input-error': $v.form.doc.$error }"
        />
        <span class="mensage-error" v-if="$v.form.doc.$error"
          >{{ isPatient ? "CPF" : "CRM" }} Invalido</span
        >
        <button type="submit" class="button-primary">Cadastrar</button>
      </form>
    </section>
    <div class="register__login">
      <router-link to="/">Já tenho conta!</router-link>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import KindPerson from '@/components/kind-person/KindPerson.vue';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Login',
  components: {
    DatePicker,
    KindPerson,
  },
  data() {
    return {
      isPatient: false,
      form: {
        nome: '',
        dataNascimento: new Date(),
        sexo: 'm',
        doc: '',
      },
    };
  },
  watch: {
    isPatient() {
      this.form.doc = '';
    },
  },
  computed: {
    rules() {
      return this.isPatient ? { minLength: minLength(14) } : {};
    },
  },
  methods: {
    disabledBeforeToday(date) {
      return date > new Date();
    },
    async submit(e) {
      e.preventDefault();
      this.$v.form.$touch();
      if (this.$v.form.$error) return;
      if (this.isPatient) {
        await this.$store.dispatch('PatientStore/actionAddPatient', {
          ...this.form,
          cpf: this.form.doc,
        });
      } else {
        await this.$store.dispatch('DoctorStore/actionAddDoctor', {
          ...this.form,
          crm: this.form.doc,
        });
      }
    },
  },
  validations() {
    return {
      form: {
        nome: {
          required,
        },
        dataNascimento: {
          required,
        },
        sexo: {
          required,
        },
        doc: {
          required,
          ...this.rules,
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.register {
  padding: 16px;
  &__title {
    margin-top: 32px;
    text-align: center;
    color: var(--primary);
  }
  &__card {
    margin-top: 16px;
  }
  &__form {
    display: flex;
    flex-direction: column;

    &__radio {
      padding-left: 5px;
      margin-top: 16px;
      span {
        margin-right: 16px;
        input {
          margin-right: 4px;
        }
      }
    }
  }
  &__login {
    text-align: center;
    margin: 16px;
    a {
      text-decoration: none;
      color: black;
      &:hover {
        color: var(--primary);
      }
    }
  }
}
</style>
