<template>
  <div class="container">
    <RecipePreviewList
      title="Our Family Recipes"
      :recipes="familyRecipes"
      class="recipes center"
    />
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  name: "OurFamilyRecipes",
  components: {
    RecipePreviewList: RecipePreviewList
  },
  data() {
    return {
      familyRecipes: []
    };
  },
  methods: {
    async getFamilyRecipes() {
      try {
        // this.axios.defaults.withCredentials = true;
        const response = await this.axios.get(
          "https://server-attackonrecipes.herokuapp.com/viewOurFamilyRecipes"
        );
        // this.axios.defaults.withCredentials = false;
        console.log(response);
        const recipes = response.data;
        console.log(recipes);
        this.familyRecipes = [];
        this.familyRecipes.push(...recipes);
      } catch (err) {
        console.log(err.response);
      }
    }
  },
  mounted() {
    this.getFamilyRecipes();
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 520px;
}
</style>
