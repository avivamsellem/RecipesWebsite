<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <br />
    <b-form @submit.prevent="onSearch" @reset.prevent="onReset">
      <table>
        <!-- Query Field -->
        <tr>
          <th>
            <b-form-group id="input-group-query" label="Search:" label-for="query">
              <b-form-input
                id="query"
                v-model="$v.form.query.$model"
                type="text"
                class="mb-3"
                :state="validateState('query')"
                >
              </b-form-input>
            </b-form-group>
          </th>

          <!-- Result No -->
          <th>
            <b-form-group id="input-group-resultNo" label="Number of Result:" label-for="resultNo"></b-form-group>
            <b-form-select
              id="resultNo"
              class="mb-3"
              v-model="$v.form.resultNo.$model"
              :options="optResultsNo"
              :state="validateState('resultNo')"
            >
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-invalid-feedback v-if="!$v.form.resultNo.required">Result Number is required</b-form-invalid-feedback>
          </th>

          <!-- Cuisine -->
          <th>
            <b-form-group id="input-group-cuisine" label="Cuisine:" label-for="cuisine"></b-form-group>
            <b-form-select
              id="cuisine"
              v-model="$v.form.cuisine.$model"
              :options="optCuisines"
              class="mb-3"
              :state="validateState('cuisine')"
            >
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-invalid-feedback v-if="!$v.form.cuisine.required">Result Number is required</b-form-invalid-feedback>
          </th>

          <!-- Diet -->
          <th>
            <b-form-group id="input-group-diet" label="Diet:" label-for="diet"></b-form-group>
            <b-form-select
              id="diet"
              v-model="$v.form.diet.$model"
              :options="optDiets"
              class="mb-3"
              :state="validateState('diet')"
            >
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-invalid-feedback v-if="!$v.form.diet.required">Result Number is required</b-form-invalid-feedback>
          </th>

          <!-- Intolarence -->
          <th>
            <b-form-group id="input-group-intolarence" label="Intolarence:" label-for="intolarence"></b-form-group>
            <b-form-select
              id="intolarence"
              v-model="$v.form.intolarence.$model"
              :options="optIntolarences"
              class="mb-3"
              :state="validateState('intolarence')"
            >
              <template v-slot:first>
                <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
              </template>
            </b-form-select>
            <b-form-invalid-feedback v-if="!$v.form.diet.required">Intolarence is required</b-form-invalid-feedback>
          </th>

          <!-- Reset & Submit -->
          <th>
            <b-button class="b-button" type="submit" variant="primary">Search</b-button>
          </th>
          <th>
            <b-button class="b-button" type="reset" variant="danger">Reset</b-button>
          </th>
        </tr>
        <tr>
          <p style="color: red;" v-if="!$v.form.query.required && submitted">Text is required</p>
        </tr>
      </table>
      <br>
    </b-form>
    
    <div v-if="submitted && results.length == 0">
      <span><center><strong> could not find any results</strong></center></span>
      <br>
    </div>
    <!-- SORT SECTION -->
    <div v-if="results.length > 0">
      <label class="sort">Sort By: </label>
      <select v-model="sortParam">
        <option>Popularity</option>
        <option>Time</option>
      </select>
      <label class="sort">Order By: </label>
      <select v-model="orderParam">
        <option>Ascending</option>
        <option>Descending</option>
      </select>
      <b-button class="b-button" type="submit" @click="sort" variant="primary">Sort Results</b-button>
      <ul>
        <ol v-for="result in results" v-bind:key="result.id" class="result">
          <RecipePreview class="recipePreview" :recipe="result" />
        </ol>
      </ul>
    </div>
  </div>
</template>

<script>
import countries from "../assets/countries";
import Cuisines from "../assets/cuisines";
import Diets from "../assets/diets";
import Intolerances from "../assets/intolerances";
import ResultNumbers from "../assets/resultNumbers";
import RecipePreview from "../components/RecipePreview";

import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  components: {
    RecipePreview
  },
  name: "Search",
  data() {
    return {
      form: {
        query: "",
        resultNo: "5",
        cuisine: "",
        diet: "",
        intolarence: ""
      },
      validated: false,
      results: [],
      countries: [{ value: null, text: "", disabled: true }],
      optCuisines: [{ value: null, text: "", disabled: true }],
      optDiets: [{ value: null, text: "", disabled: true }],
      optIntolarences: [{ value: null, text: "", disabled: true }],
      optResultsNo: [{ value: null, text: "", disabled: true }],
      errors: [],
      sortParam: "Popularity",
      orderParam: "Ascending",
      submitted: false
    };
  },
  validations: {
    form: {
      query: {
        required,
        length: u => minLength(1)(u) && maxLength(20)(u)
      },
      resultNo: {
        // required
      },
      cuisine: {
        // required
      },
      diet: {
        // required
      },
      intolarence: {
        // required
      }
    }
  },
  mounted() {
    this.countries.push(...countries);
    this.optCuisines.push(...Cuisines);
    this.optDiets.push(...Diets);
    this.optIntolarences.push(...Intolerances);
    this.optResultsNo.push(...ResultNumbers);
    console.log("this.submit: ",this.submitted);
    console.log("sessionStorage is : ", sessionStorage.getItem("lastQuery"));
    console.log("sessionStorage is : ", sessionStorage.getItem("lastResults"));
    if (sessionStorage.getItem("lastQuery") != null) {
      console.log("got inside the load previous search");
      this.form.query = sessionStorage.getItem("lastQuery");
      this.results = JSON.parse(sessionStorage.getItem("lastResults"));
    }
  },
  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    async Search() {
      console.log("entered search");
      let response;
      try {
        let params = {};
        if (this.form.cuisine != "") {
          params.cuisine = this.form.cuisine;
        }
        if (this.form.diet != "") {
          params.diet = this.form.diet;
        }
        if (this.form.intolarence != "") {
          params.intolarence = this.form.intolarence;
        }
        response = await this.axios.get(
          "https://server-attackonrecipes.herokuapp.com/recipe/search/query/" +
            this.form.query +
            "/amount/" +
            this.form.resultNo,
          {
            params: params
          }
        );

        if (response.status !== 200) this.$router.replace("/NotFound");
        else this.results.push(...response.data);
        console.log("save to lastQuery this value: ", this.form.query);
        sessionStorage.setItem("lastQuery", this.form.query);
        console.log("save to lastResults this value: ", this.results);
        sessionStorage.setItem("lastResults", JSON.stringify(this.results));

        this.submitted = true;
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
    },
    onSearch() {
      //checks if the a query inserted.
      this.results = [];
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      this.Search();
    },
    onReset() {
      this.form = {
        query: "",
        resultNo: "5",
        cuisine: "",
        diet: "",
        intolarence: ""
      };
      this.results = [],
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    sort() {
      let x;
      if(this.sortParam == "Popularity") {
        if(this.orderParam == "Ascending") {
          x = this.results.sort(function(a, b) {
            return a.aggregateLikes - b.aggregateLikes;
          })
          this.results = x;
        } else if(this.orderParam == "Descending") {
          x = this.results.sort(function(a, b) {
            return b.aggregateLikes - a.aggregateLikes;
          })
        }
      }
      else if(this.sortParam == "Time") {
        if(this.orderParam == "Ascending") {
          x = this.results.sort(function(a, b) {
            return a.readyInMinutes - b.readyInMinutes;
          })
        } else if(this.orderParam == "Descending") {
          x = this.results.sort(function(a, b) {
            return b.readyInMinutes - a.readyInMinutes;
          })
        }
      }
      this.results = x;
      sessionStorage.setItem("lastResults", JSON.stringify(this.results));
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: auto;
  background-color: #EFEFEF;
  border-radius: 25px;
  border-style: solid;
  border-color: darkgrey;
  padding: 20px;
}

.result {
  max-width: 55%;
}

.dropdown.dropdown-scroll .dropdown-list{
    max-height: 233px;
    overflow-y: auto;
    list-style-type: none;
    padding-left: 10px;
    margin-bottom: 0px;
}
.dropdown-list  li{
    font-size: 14px;
    height: 20px;
}

.dropdown-list  li > a{
    color: black;
}
.dropdown-list a:hover{
   color: black;
}

.dropdown-list li:hover{
    background-color: lightgray;
}
.sort {
  padding-left :10px;
  padding-right :10px;
}
.b-button {
  margin: 10px;
}
</style>