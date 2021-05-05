<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Attack on Recipes</b-navbar-brand>
      <!-- Site Title -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!-- Main button -->
          <b-nav-item :to="{ name: 'Main' }">Main</b-nav-item>
          <!-- OurFamilyRecipes button -->
          <b-nav-item v-if="$root.store.username" :to="{ name: 'MyRecipes' }">Upload By Me</b-nav-item>
          <b-nav-item v-if="$root.store.username" :to="{ name: 'MyFavorites' }">My Favorite Recipes</b-nav-item>
          <b-nav-item :to="{ name: 'OurFamilyRecipes' }">Our Family Recipes</b-nav-item>
          <!-- About button -->
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <!-- Search button -->
          <b-button size="sm" class="my-2 my-sm-0" :to="{ name: 'Search' }">Search</b-button>

          <!-- Drop Down button -->
          <span v-if="!$root.store.username">
            <!-- Guest section -->
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>hello guest</em>
              </template>
              <b-dropdown-item :to="{ name: 'Register' }">Register</b-dropdown-item>
              <b-dropdown-item :to="{ name: 'Login' }">Login</b-dropdown-item>
            </b-nav-item-dropdown>
          </span>
          <div v-else>
            <!-- User section -->
            <b-nav-item-dropdown right>
              <template v-slot:button-content>
                <em>Welcome {{ $root.store.username }}</em>
              </template>
              <b-dropdown-item v-b-modal.modal-create-new-recipe>Create Recipe</b-dropdown-item>
              <!-- open model box -->
              <b-dropdown-item @click="Logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!-- Recipe modal -->
    <b-modal
      id="modal-create-new-recipe"
      ref="modal-recipe"
      scroling
      title="Create New Recipe"
      size="lg"
      @show="recipeResetModal"
      @hidden="recipeResetModal"
      @ok="recipeModalHandleOk"
    >
      <b-form @submit.stop.prevent="handleSubmit">
        <!--- Recipe Name -->
        <b-form-group
          id="input-group-recipe-name"
          label-cols-sm="3"
          label="Recipe name:"
          label-for="name-input"
        >
          <b-form-input
            id="recipe-name"
            v-model="$v.form_create_new_recipe.name.$model"
            type="text"
            :state="recipeValidateState('name')"
          ></b-form-input>
          <b-form-invalid-feedback
            v-if="!$v.form_create_new_recipe.name.required"
          >Recipe name is required</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form_create_new_recipe.name.alpha"
          >Recipe name must be alpha bet characters</b-form-invalid-feedback>
        </b-form-group>

        <!--- Recipe Image -->
        <b-form-group
          id="input-group-recipe-image"
          label-cols-sm="3"
          label="Image:"
          label-for="image-input"
        >
          <b-form-input
            id="recipe-image"
            type="text"
            v-model="$v.form_create_new_recipe.image.$model"
            :state="recipeValidateState('image')"
          ></b-form-input>
          <b-form-invalid-feedback
            v-if="!$v.form_create_new_recipe.image.required"
          >Image is required</b-form-invalid-feedback>
          <b-form-invalid-feedback v-else-if="!$v.form_create_new_recipe.image.url">Not a valid URL</b-form-invalid-feedback>
        </b-form-group>

        <!--- Ready in minutes -->
        <b-form-group
          id="input-group-recipe-ready-in-minutes"
          label-cols-sm="3"
          label="Ready in minutes:"
          label-for="ready-in-minutes-input"
        >
          <b-form-input
            id="recipe-ready-in-minutes"
            type="number"
            v-model="$v.form_create_new_recipe.readyInMinutes.$model"
            :state="recipeValidateState('readyInMinutes')"
          />
          <b-form-invalid-feedback
            v-if="!$v.form_create_new_recipe.readyInMinutes.required"
          >Making time is required</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form_create_new_recipe.readyInMinutes.length"
          >Making time must be positive number</b-form-invalid-feedback>
        </b-form-group>

        <!--- Serving -->
        <b-form-group
          id="input-group-recipe-serving"
          label-cols-sm="3"
          label="Serving:"
          label-for="serving-input"
        >
          <b-form-input
            id="recipe-serving"
            type="number"
            v-model="$v.form_create_new_recipe.serving.$model"
            :state="recipeValidateState('serving')"
          />
          <b-form-invalid-feedback
            v-if="!$v.form_create_new_recipe.serving.required"
          >Number of servings is required</b-form-invalid-feedback>
          <b-form-invalid-feedback
            v-else-if="!$v.form_create_new_recipe.serving.length"
          >Number of servings must be positive number</b-form-invalid-feedback>
        </b-form-group>

        <!--- Ingredients -->
        <div>
          Ingredients:
          <div v-if="form_create_new_recipe.ingredients.length === 0">
            <b>
              <del>no ingredient yet</del>
            </b>
          </div>
          <ul v-else>
            <li v-for="ingredient in form_create_new_recipe.ingredients" v-bind:key="ingredient.id">
              {{ ingredient.amount }} {{ ingredient.unit }}
              <span v-if="ingredient.amount != '1'">s</span>
              of {{ ingredient.name }}
            </li>
          </ul>
        </div>
        <b-button v-b-modal.modal-ingredient>Add New Ingredient</b-button>
        <p
          style="color: red;"
          v-if="!$v.form_create_new_recipe.ingredients.minLength && submitted"
        >Ingredients are required</p>

        <!-- Instructions -->
        <div>
          Instructions:
          <div v-if="form_create_new_recipe.instructions.length === 0">
            <b>
              <del>no instructions yet</del>
            </b>
          </div>
          <ol v-else>
            <li
              v-for="instruction in form_create_new_recipe.instructions"
              v-bind:key="instruction.number"
            >{{ instruction.step }}</li>
          </ol>
          <p
            style="color: red;"
            v-if="!$v.form_create_new_recipe.instructions.minLength && submitted"
          >Instructions are required</p>
        </div>

        <b-form-group
          id="input-group-recipe-instructions"
          label-cols-sm="3"
          label="Instruction:"
          label-for="recipe-instructions"
        >
          <b-form-input id="recipe-instructions" type="text" v-model="instruction"></b-form-input>
        </b-form-group>
        <b-button @click="addInstruction">Add New Instruction</b-button>
        <div>
          <table>
            <tr>
              <th v-if="form_create_new_recipe.vegan">
                <!-- Vegan -->
                <b-img :src="vegan_logo" @click="diet('vegan')" class="icon" />
              </th>
              <th v-else>
                <b-img :src="not_vegan_logo" @click="diet('vegan')" class="icon" />
              </th>
              <th v-if="form_create_new_recipe.vegetarian">
                <!-- vegeterian -->
                <b-img :src="vegetarian_logo" @click="diet('vegetarian')" class="icon" />
              </th>
              <th v-else>
                <b-img :src="not_vegetarian_logo" @click="diet('vegetarian')" class="icon" />
              </th>
              <th v-if="form_create_new_recipe.glutenFree">
                <!-- Gluten Free -->
                <b-img :src="gluten_logo" @click="diet('glutenFree')" class="icon" />
              </th>
              <th v-else>
                <b-img :src="not_gluten_logo" @click="diet('glutenFree')" class="icon" />
              </th>
            </tr>
          </table>
        </div>
      </b-form>
    </b-modal>

    <!-- Ingredients Modal -->
    <b-modal
      id="modal-ingredient"
      ref="modal-ingredient"
      title="Submit New Ingredient"
      @show="formIngredientResetModal"
      @hidden="formIngredientResetModal"
      @ok="ingredientModalHandleOk"
    >
      <b-form @submit.stop.prevent="formIngredientCheckHandleSubmit">
        <!-- ingredient name -->
        <b-form-group
          id="input-group-ingredient-name"
          label-cols-sm="3"
          label="Name:"
          label-for="name-input"
        >
          <b-form-input
            id="ingredient-name"
            v-model="$v.form_ingredient.name.$model"
            type="text"
            :state="ingredientValidateState('name')"
          ></b-form-input>
          <b-form-invalid-feedback>Name is required</b-form-invalid-feedback>
        </b-form-group>

        <!-- ingredient amount -->
        <b-form-group
          id="input-group-ingredient-amount"
          label-cols-sm="3"
          label="Amount:"
          label-for="amount-input"
        >
          <b-form-input
            id="ingredient-amount"
            type="number"
            v-model="$v.form_ingredient.amount.$model"
            :state="ingredientValidateState('amount')"
          ></b-form-input>
          <b-form-invalid-feedback>Amount is required</b-form-invalid-feedback>
        </b-form-group>
        <table>
          <tr>
            <th>
              <b-button @click.stop.prevent="form_ingredient.unit = 'Tea-spoon'">Tea-spoon</b-button>
            </th>
            <th>
              <b-button @click.stop.prevent="form_ingredient.unit = 'Spoon'">Spoon</b-button>
            </th>
            <th>
              <b-button @click.stop.prevent="form_ingredient.unit = 'Cup'">Cup</b-button>
            </th>
             <th>
              <b-button @click.stop.prevent="form_ingredient.unit = 'Unit'">Unit</b-button>
            </th>
          </tr>
        </table>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import routes from "../routes.js";
import {
  alpha,
  minValue,
  required,
  minLength,
  url
} from "vuelidate/lib/validators";

export default {
  name: "Navigator",
  data() {
    return {
      routes,
      submitted: false,
      form_create_new_recipe: {
        name: "",
        image: "",
        serving: "",
        readyInMinutes: "",
        ingredients: [],
        instructions: [],
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        submitError: ""
      },
      instruction: "",
      form_ingredient: {
        name: "",
        amount: "",
        unit: "",
        submitError: ""
      },
      image_load: false,
      vegan_logo: require("../assets/vegan logo.png"),
      not_vegan_logo: require("../assets/not vegan logo.png"),
      vegetarian_logo: require("../assets/vegetaruan logo.png"),
      not_vegetarian_logo: require("../assets/not vegetaruan logo.png"),
      gluten_logo: require("../assets/gluten free logo.png"),
      not_gluten_logo: require("../assets/not gluten free logo.png")
    };
  },
  validations: {
    form_create_new_recipe: {
      name: {
        required,
        alpha: function(value) {
          const containsNumber = /[0-9]/.test(value);
          const containsSpecial = /[~!@#$%^&*()_+=|\]\[{/}'";:?><]/.test(value);
          return !containsNumber && !containsSpecial;
        }
      },
      image: {
        required,
        url
      },
      readyInMinutes: {
        required,
        length: p => minValue(1)(p)
      },
      serving: {
        required,
        length: p => minValue(1)(p)
      },
      ingredients: {
        required,
        minLength: function(val) {
          return val.length > 0;
        }
      },
      instructions: {
        required,
        minLength: function(val) {
          return val.length > 0;
        }
      }
    },
    form_ingredient: {
      name: {
        required
      },
      amount: {
        required
      },
      unit: {
        required
      }
    }
  },
  methods: {
    // navigator section
    Logout() {
      this.$emit("Logout", "val");
    },
    diet(type) {
      if (type == "vegan") {
        this.form_create_new_recipe.vegan
          ? (this.form_create_new_recipe.vegan = false)
          : (this.form_create_new_recipe.vegan = true);
      } else if (type == "vegetarian") {
        this.form_create_new_recipe.vegetarian
          ? (this.form_create_new_recipe.vegetarian = false)
          : (this.form_create_new_recipe.vegetarian = true);
      } else if (type == "glutenFree") {
        this.form_create_new_recipe.glutenFree
          ? (this.form_create_new_recipe.glutenFree = false)
          : (this.form_create_new_recipe.glutenFree = true);
      }
    },
    // recipe modal section
    recipeValidateState(param) {
      const { $dirty, $error } = this.$v.form_create_new_recipe[param];
      return $dirty ? !$error : null;
    },
    recipeModalHandleOk(bvModalEvt) {
      this.submitted = true;
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.recipeHandleSubmit();
    },
    recipeHandleSubmit() {
      this.form_create_new_recipe.submitError = undefined;
      this.$v.form_create_new_recipe.$touch();
      if (this.$v.form_create_new_recipe.$anyError) {
        return;
      }
      this.handleRecipe();

      this.$nextTick(() => {
        this.$bvModal.hide("modal-create-new-recipe");
      });
    },
    async handleRecipe() {
      let bool = await this.sendRecipe();
      if (bool) {
        this.$root.toast(
          "Create Recipe",
          "Recipe uploaded successfully",
          "success"
        );
      } else {
        this.$root.toast(
          "Create Recipe",
          "Failed to create a new recipe, Please jump from the windows instead",
          "danger"
        );
      }
    },
    async sendRecipe() {
      try {
        this.axios.defaults.withCredentials = true;
        const response = await this.axios.post(
          "https://server-attackonrecipes.herokuapp.com/profile/createRecipe",
          {
            title: this.form_create_new_recipe.name,
            readyInMinutes: this.form_create_new_recipe.readyInMinutes,
            vegan: this.form_create_new_recipe.vegan,
            vegetarian: this.form_create_new_recipe.vegetarian,
            glutenFree: this.form_create_new_recipe.glutenFree,
            instructions: this.form_create_new_recipe.instructions,
            ingredients: this.form_create_new_recipe.ingredients,
            serving: this.form_create_new_recipe.serving,
            image: this.form_create_new_recipe.image
          }
        );
        this.axios.defaults.withCredentials = false;
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    // ingredient modal section
    ingredientValidateState(param) {
      const { $dirty, $error } = this.$v.form_ingredient[param];
      return $dirty ? !$error : null;
    },
    ingredientModalHandleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.ingredientHandleSubmit();
    },
    ingredientHandleSubmit() {
      this.form_ingredient.submitError = undefined;
      this.$v.form_ingredient.$touch();
      if (this.$v.form_ingredient.$anyError) {
        return;
      }
      this.pushIngredient();
    },
    pushIngredient() {
      this.form_create_new_recipe.ingredients.push({
        id: this.form_create_new_recipe.ingredients.length + 1,
        name: this.form_ingredient.name,
        amount: this.form_ingredient.amount,
        unit: this.form_ingredient.unit
      });
    },
    addInstruction() {
      if (!this.instruction) {
        return;
      }
      this.pushInstruction();
    },
    pushInstruction() {
      this.form_create_new_recipe.instructions.push({
        number: this.form_create_new_recipe.instructions.length + 1,
        step: this.instruction
      });
    },
    recipeResetModal() {
      return;
      (this.submitted = false),
        (this.form_create_new_recipe.name = ""),
        (this.form_create_new_recipe.image = ""),
        (this.form_create_new_recipe.readyInMinutes = ""),
        (this.form_create_new_recipe.ingredients = ""),
        (this.form_create_new_recipe.instructions = []),
        (this.form_create_new_recipe.ingredients = []),
        (this.form_create_new_recipe.submitError = ""),
        (this.form_ingredient.name = ""),
        (this.form_ingredient.amount = ""),
        (this.form_ingredient.unit = ""),
        (this.form_ingredient.submitError = "");
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.$nextTick(() => {
        this.$bvModal.hide("modal-create_new_recipe");
      });
    },
    formIngredientCheckFormValidity() {
      const valid = this.$refs.form_ingredient.checkValidity();
      this.ingredientFormState = valid;
      return valid;
    },
    formIngredientResetModal() {
      this.ingredientName = "";
      this.ingredientAmount = "";
      this.ingredientUnit = "";
      this.ingredientFormState = null;
    },
    formIngredientCheckHandleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.formIngredientCheckHandleSubmit();
    },
    formIngredientCheckHandleSubmit() {
      // Exit when the form isn't valid
      if (!this.formIngredientCheckFormValidity()) {
        return;
      }
      // Push the name to submitted names"
      this.form_create_new_recipe.ingredients.push({
        id: this.form_create_new_recipe.ingredients.length + 1,
        name: this.form_ingredient.name,
        amount: this.form_ingredient.amount,
        unit: this.form_ingredient.unit
      })
    },
    currentValue(newValue) {
      if (!this.list.includes(newValue)) this.selectedValue = "";
      this.ingredientUnit = newValue;
    }
  }
};
</script>

<style>
.icon {
  max-height: 80px;
  max-width: 80px;
}
.user-section {
  width: 100px;
}
</style>