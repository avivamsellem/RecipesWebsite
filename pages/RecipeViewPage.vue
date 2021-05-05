<template>
  <div class="container">
    <!-- {{ recipe }} -->
    <Recipe :recipe="recipeData" />
  </div>
</template>

<script>
import Recipe from "../components/Recipe";
export default {
  components: {
    Recipe: Recipe
  },
  data() {
    return {
      recipeData: {
        type: Object,
        require: true
      }
    };
  },
  mounted() {
    this.initial();
  },
  methods: {
    async initial() {
      try {
        let response;
        try {
          this.axios.defaults.withCredentials = true;
          console.log(this.$route.params);
          response = await this.axios.get(
            "https://server-attackonrecipes.herokuapp.com/recipe/" +
              this.$route.params.recipeId +
              "/information",
            {
              params: { spoonacular: this.$route.params.spoonacular }
            }
          );
          this.axios.defaults.withCredentials = false;
          console.log(response.data);
          this.recipeData = response.data;
          if (response.status !== 200) this.$router.replace("/NotFound");
        } catch (error) {
          console.log("error: " + error);
          // this.$router.replace("/NotFound");
          return;
        }
      } catch (error) {
        console.log("arrived to catch");
        console.log(error);
      }
    }
  }
};
</script>

<style>
.container {
  max-width: auto;
  background-color: #EFEFEF;
  border-radius: 25px;
  border-style: solid;
  border-color: darkgrey;
  padding: 20px;
}
</style>
