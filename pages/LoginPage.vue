<template>
  <div class="container">
    <Login @Login="onLogin" />
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import Login from "../components/Login";

export default {
  name: "LoginPage",
  components: {
    Login: Login
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        submitError: undefined
      }
    };
  },
  validations: {
    form: {
      username: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    onLogin(val) {
      this.$emit("Login", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
