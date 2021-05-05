<template>
  <div v-if="recipe">
    <h1>{{ recipe.title }}</h1>
    <table>
      <tr>
        <th>
          <img :src="recipe.image" class="recipe-image" />
        </th>
        <th>
          <table>
            <tr>
              <div class="div">
                <p><strong>Ready in {{ recipe.readyInMinutes }} minutes</strong></p><br>
                <p><strong>Likes: {{ recipe.aggregateLikes }} likes</strong></p><br>
                <table>
                  <tr>
                    <th>
                      <!-- Vegan -->
                      <p v-if="recipe.vegan">
                        <b-img :src="vegan_logo" class="icon" />
                      </p>
                      <p v-else>
                        <b-img :src="not_vegan_logo" class="icon" />
                      </p>
                    </th>
                    <th>
                      <!-- vegeterian -->
                      <p v-if="recipe.vegetarian">
                        <b-img :src="vegetarian_logo" class="icon" />
                      </p>
                      <p v-else>
                        <b-img :src="not_vegetarian_logo" class="icon" />
                      </p>
                    </th>
                    <th>
                      <p v-if="recipe.glutenFree">
                        <!-- Gluten Free -->
                        <b-img :src="gluten_logo" class="icon" />
                      </p>
                      <p v-else>
                        <b-img :src="not_gluten_logo" class="icon" />
                      </p>
                    </th>
                    <th>
                      <!-- User Section -->
                        <!-- Watched -->
                      <p v-if="recipe.watched && $root.store.username">
                        <b-img :src="watched_logo" class="icon" />
                      </p>
                      <p v-else>
                        <b-img :src="didnt_watched_logo" class="icon" />
                      </p>
                    </th>
                    <th>
                      <!-- Liked -->
                      <p v-if="recipe.liked && $root.store.username">
                        <b-img :src="liked_logo" class="icon" />
                      </p>
                      <div v-else @click="likeRecipe">
                        <p>
                          <b-img  @click="likeRecipe" :src="didnt_liked_logo" class="icon"/>
                        </p>
                      </div>
                    </th>
                  </tr>
                </table>
              </div>
            </tr>
            <tr>
              <div class="div"><strong>Ingredients: </strong>
                <ul>
                  <li
                    v-for="ingredient in recipe.ingredients"
                    :key="ingredient.id"
                  >{{ ingredient.amount }} {{ ingredient.unit }} of {{ ingredient.name }}</li>
                </ul>
              </div>
            </tr>
          </table>
        </th>
      </tr>
    </table>
    <div class="div">
        <strong>Instructions:</strong>
        <ol>
          <li v-for="s in recipe.instructions" :key="s.number">{{ s.step }}</li>
        </ol>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      image_load: false,
      vegan_logo: require("../assets/vegan logo.png"),
      not_vegan_logo: require("../assets/not vegan logo.png"),
      vegetarian_logo: require("../assets/vegetaruan logo.png"),
      not_vegetarian_logo: require("../assets/not vegetaruan logo.png"),
      gluten_logo: require("../assets/gluten free logo.png"),
      not_gluten_logo: require("../assets/not gluten free logo.png"),
      watched_logo: require("../assets/watched.png"),
      didnt_watched_logo: require("../assets/didnt watched.png"),
      liked_logo: require("../assets/liked logo.png"),
      didnt_liked_logo: require("../assets/didnt liked logo.png"),
      non_logo: require("../assets/empty.png")
    };
  },
  methods: {
    async likeRecipe()
    {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "https://server-attackonrecipes.herokuapp.com/profile/addToFavorites", {
            recipeID: this.recipe.id
          }
        );
        this.axios.defaults.withCredentials = false;
        this.recipe.liked = true;
      } catch (err) {
        console.log(err.response);
      }
    }
  }
};
</script>

<style scoped>
.icon {
  max-height: 30px;
  max-width: 30px;
}
li {
  /* font-weight: bold; */
}
p {
  margin:0;
  /* font-weight: bold; */
  display: inline;
}
.div {
  margin: 20px;
  font-weight: normal;
}
.recipe-image {
  border-radius: 20px;
  padding: 3px;
	margin-bottom: 5px;
  max-width: 100%;
  max-height: 100%;
  border-width: thick;
  border-style: solid;
  border-color: lightgrey;
	filter: grayscale(35%);
  transition: all 0.7s ease-out;
}
</style>