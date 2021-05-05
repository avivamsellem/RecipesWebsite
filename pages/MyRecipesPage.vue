<template>
  <div class="container">
    <!-- <h1 class="title">My Recipes</h1> -->
    <RecipePreviewList title="Upload By Me" :recipes="myRecipes" class="RandomRecipes center" />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "MyRecipesPage",
  components: {
    RecipePreviewList: RecipePreviewList
  },
  data() {
    return {
      myRecipes: []
    };
  },
  methods: {
    async getMyRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "https://server-attackonrecipes.herokuapp.com/profile/viewMyRecipes"
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        const recipes = response.data.recipeList;
        this.myRecipes = [];
        this.myRecipes.push(...recipes);
      } catch (err) {
        console.log(err.response);
      }
    }
  },
  mounted() {
    this.getMyRecipes();
  }
};
</script>

<style>
.container {
  max-width: 505px;
}
</style>