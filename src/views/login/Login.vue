<template>
  <div class="login">
    <h1 class="login__title">Entrar na minha conta</h1>

    <KindPerson
      :isPatient="isPatient"
      v-on:change-kind-person="isPatient = $event"
    ></KindPerson>

    <section class="card">
      <form @submit="submit" class="login__form">
        <input
          type="text"
          placeholder="CPF"
          v-model="$v.doc.$model"
          v-if="isPatient"
          v-mask="'###.###.###-##'"
        />
        <input
          type="text"
          placeholder="CRM"
          v-else
          v-model="$v.doc.$model"
          v-mask="'XXXXXXXXXXXXXXXXX'"
        />
        <span v-if="$v.doc.$error" :class="{ 'mensage-error': $v.doc.$error }"
          >{{ isPatient ? "CPF" : "CRM" }} Invalido</span
        >
        <button class="login__form__submit button-primary" type="submit">
          Entrar
        </button>
      </form>
    </section>
    <div class="login__register">
      <router-link to="/cadastro">Cadastra-se</router-link>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import KindPerson from '@/components/kind-person/KindPerson.vue';

export default {
  name: 'Login',
  components: {
    KindPerson,
  },
  data() {
    return {
      isPatient: false,
      doc: '',
    };
  },
  watch: {
    isPatient() {
      this.doc = '';
    },
  },
  computed: {
    rules() {
      return this.isPatient ? { minLength: minLength(14) } : {};
    },
  },
  validations() {
    return {
      doc: {
        required,
        ...this.rules,
      },
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();
      if (this.$v.doc.$error) return;
      const toast = {
        title: 'Usuario',
        description: 'Usuário não encontrado',
        type: 'error',
      };
      const user = this.isPatient
        ? await this.$store.dispatch(
          'PatientStore/actionPatientLogin',
          this.doc,
        )
        : await this.$store.dispatch('DoctorStore/actionDoctorLogin', this.doc);
      if (!user) this.$store.dispatch('GlobalStore/actionToast', toast);
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  padding: 16px;
  &__title {
    margin-top: 32px;
    text-align: center;
    color: #e72d51;
  }
  &__form {
    display: flex;
    flex-direction: column;
    &__type {
      margin-top: 8px;
      input {
        margin-right: 8px;
      }
    }
  }
  &__register {
    text-align: center;
    margin: 16px;
    a {
      text-decoration: none;
      color: black;
      &:hover {
        color: #e72d51;
      }
    }
  }
}
</style>
