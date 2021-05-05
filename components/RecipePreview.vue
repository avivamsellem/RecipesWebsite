<template>
<div class="div-border">
  <!-- IMAGE -->
  <router-link :to="{ name: 'Recipe', params: {recipeId: recipe.id, spoonacular: recipe.spoonacular } }" class="recipe-preview">
      <img :src="recipe.image" class="recipe-image" />
  </router-link>

    <h5><b>{{ recipe.title }}</b></h5>
      <p >Ready in {{ recipe.readyInMinutes }} minutes</p>
      <p v-if="recipe.servings"> {{ recipe.servings }} dishes</p>
      <p>{{ recipe.aggregateLikes }} likes</p>
      <table>
        <tr>
          <th>
            <p v-if="recipe.vegan">
              <!-- Vegan -->
              <b-img :src="vegan_logo" class="icon" />
            </p>
            <p v-else>
              <b-img :src="not_vegan_logo" class="icon" />
            </p>
          </th>
          <th>
            <p v-if="recipe.vegetarian">
              <!-- vegeterian -->
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
            <div v-if="$root.store.username">
              <!-- User Section -->
              <!-- Watched -->
              <th>
                <p v-if="recipe.watched">
                  <b-img :src="watched_logo" class="icon" />
                </p>
                <p v-else>
                  <b-img :src="didnt_watched_logo" class="icon" />
                </p>
              </th>
              <th>
                <!-- Liked -->
                <p v-if="recipe.liked">
                  <b-img :src="liked_logo" class="icon" />
                </p>
                <div v-else @click="likeRecipe">
                  <p>
                    <b-img  :src="didnt_liked_logo" class="icon"/>
                  </p>
                </div>
             </th>
            </div> 
        </tr>
      </table>
</div>
</template>

<script>
export default {
  mounted() {
    this.axios.get(this.recipe.image)
  },
  data() {
    return {
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
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    async likeRecipe()
    {
      console.log("test");
      try {
        this.axios.defaults.withCredentials = true;
        const response = this.axios.post(
          "https://server-attackonrecipes.herokuapp.com/profile/addToFavorites", {
            recipeID: this.recipe.id
          }
        );
        this.axios.defaults.withCredentials = false;
        this.recipe.liked = true;
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  min-width: auto;
  min-height: auto;
  position: relative;
}
.recipe-preview > .recipe-body {
  min-width: 100%;
  min-height: 100%;
  position: relative;
}

.recipe-preview .recipe-body {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  /* /* display: block; */
  max-width: 100%;
  max-height: 100%;
  filter: grayscale(50%);
  transition: all 1.7s ease-out;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
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

.recipe-image:hover {
  border-width: thick;
  border-style: solid;
  border-color: black;
	filter: grayscale(0);
	transform: scale(1.03);
  transition-duration: 0.7s;

}

.div-border {
  max-width:500px;
  max-height:500px;
  width:160%;
  height:160%;
  border-radius: 20px;
  padding: 2px;
	margin: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: black;
  background-color: #EFEFEF;
 
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 90%;
  overflow: hidden;
}
.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}
.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}
.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
.icon {
  min-height: 20px;
  min-width: 20px;
  max-width: 100%;
}
p {
   margin:0;
}
</style>
