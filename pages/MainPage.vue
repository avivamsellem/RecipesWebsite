<template>
  <div class="container">
    <h1 class="title">Main</h1>
    <table class="table">
      <tr>
        <th class="component">
          <RecipePreviewList
            title="Explore these Recipes"
            :recipes="randomRecipes"
            class="component-explore"
          />
          <b-button
            variant="primary"
            @click="getRandomRecipes"
            class="explore_btn"
          >Explore</b-button>
        </th>
        <th class="component">
          <RecipePreviewList
            v-if="$root.store.username"
            title="Last Viewed Recipes"
            :recipes="historyRecipes"
            class="component"
            disabled
            />
            <Login class="component" v-else @Login="Login" />
        </th>
      </tr>
    </table>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import Login from "../components/Login";

export default {
  components: {
    RecipePreviewList,
    Login
  },
  data() {
    return {
      randomRecipes: [],
      historyRecipes: []
    };
  },
  methods: {
    async getRandomRecipes() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.get("https://server-attackonrecipes.herokuapp.com/");
        this.axios.defaults.withCredentials = false;
        console.log("response.data");
        console.log(response.data);
        console.log("response.data.RandomRecipes");
        console.log(response.data.RandomRecipes);
        console.log("response.data.LastRecipedViewed");
        console.log(response.data.LastRecipedViewed);
        const recipes = response.data.RandomRecipes;
        const lastRecipedViewed = response.data.LastRecipedViewed;
        this.randomRecipes = [];
        this.historyRecipes = [];
        this.randomRecipes.push(...recipes);
        this.historyRecipes.push(...lastRecipedViewed);
      } catch (error) {
        console.log("error: " + error);
        this.$root.toast(
          "Main",
          "Problem occur while trying to get data from server. Please try again.",
          "danger"
        );
      }
    },
    async getHistoryRecipes() {
      if (this.$root.store.username) {
        try {
          this.axios.defaults.withCredentials = true;
          const response = await this.axios.get("https://server-attackonrecipes.herokuapp.com/")
          this.axios.defaults.withCredentials = false;
          console.log(response.data.HistoryRecipes); //TODO: delete later
          const recipes = response.data.LastRecipedViewed;
          this.historyRecipes = [];
          this.historyRecipes.push(...recipes);
        } catch (error) {
          console.log("error: " + error);
          this.$root.toast(
              "Main",
              "Problem occur while trying to get data from server. Please try again.",
              "danger"
            );
            this.historyRecipes = [];
        }
      }
    },
    Login(val) {
      this.$emit("Login", val);
      this.getHistoryRecipes();
    }
  },
  mounted() {
    this.getRandomRecipes();
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 70%;
  background-color: #EFEFEF;
  border-radius: 25px;
  border-style: solid;
  border-color: darkgrey;
  padding: 20px;
}
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}
.title {
  text-align: center;
}
.component {
  float: center;
  text-align: center;
  vertical-align: middle;
}
.component-explore {
  padding-top: 40px;
  float: center;
  text-align: center;
  vertical-align: middle;
}
.explore_btn  {
  max-height: 100px;
  min-width: 70%;
  margin-right: 70px;
}
.table {
  max-width: 100%;
  max-height: 100%;
}
</style>
