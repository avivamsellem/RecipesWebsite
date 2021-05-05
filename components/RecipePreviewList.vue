<template>
  <div>
    <h3>
      <center>{{ title }}:</center>
      <slot></slot>
    </h3>
    <ul>
      <ol v-for="r in recipes" :key="r.id">
        <RecipePreview class="recipePreview" :recipe="r" />
      </ol>
    </ul>
  </div>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";

export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: true
    },
    recipes: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
ol {
  height: 45%;
  width: 45%;
  float: center;
  margin: 5px;
  padding: 5px;
}
</style>
