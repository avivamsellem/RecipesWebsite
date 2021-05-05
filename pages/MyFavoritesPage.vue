<template>
  <div class="container">
    <!-- <h1 class="title">My Recipes</h1> -->
    <RecipePreviewList
      title="My Favorite Recipes"
      :recipes="favoriteRecipes"
      class="favorite-recipes"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "MyFavoritesPage",
  components: {
    RecipePreviewList: RecipePreviewList
  },
  data() {
    return {
      favoriteRecipes: []
    };
  },
  methods: {
    async getMyFavoriteRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "https://server-attackonrecipes.herokuapp.com/profile/viewFavorites"
        );
        this.axios.defaults.withCredentials = false;
        console.log(response);
        const recipes = response.data.recipeList;
        this.favoriteRecipes = [];
        this.favoriteRecipes.push(...recipes);
      } catch (err) {
        console.log(err.response);
      }
    }
  },
  mounted() {
    this.getMyFavoriteRecipes();
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 550px;
}
</style>

