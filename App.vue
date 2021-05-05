<template>
<div id="app">
  <head>
    <meta charset="utf-8" />
  </head>
  <Navigator @Logout="Logout" />
  <br />
  <router-view @Login="Login" />
</div>
</template>

<script>
import Navigator from "./components/Navigator";

export default {
  name: "App",
  components: {
    Navigator,
  },
  methods: {
    async Login(val) {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "https://server-attackonrecipes.herokuapp.com/user/login",
          val
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        // this.$root.loggedIn = true;
        // console.log(this.$root.store.login);
        this.$root.store.login(val.username);
        if (this.$route.path != "/") this.$router.push("/").then();
        location.reload();
        this.$root.toast(
          "Login",
          "Login succeded. ",
          "success"
        );
      } catch (err) {
      }
    },
    async Logout() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "https://server-attackonrecipes.herokuapp.com/user/logout"
        );
        this.axios.defaults.withCredentials = false;

        console.log(response);
        this.$root.store.logout();
        this.$root.toast("Logout", "User logged out successfully", "success");

        this.$router.push("/").catch(() => {
          this.$forceUpdate();
        });
      } catch (err) {
        console.log("error: " + err);
      }
    }
  }
};
</script>

<style lang="scss">
@import "./scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background: linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

#app::after{
  background-image: url("./assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

#nav {
  padding: 30px;
}

#nav a {
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
