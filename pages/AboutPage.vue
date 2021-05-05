<template>
  <div class="container">
      <b-container fluid class="bg">
    <h4 class="titles">About Our Website</h4>
     <p>
       The site is about delicous Recipes, which includes for each recipe the functionality of:
       <br>
      <ul>
      <li>Image of the Recipe.</li>
      <li>The needed ingredients for making the recipe.</li>
      <li>The amount of each ingredient.</li>
      <li>Guided steps for how to make the recipe properly.</li>
      </ul>
     Also, every visitor can explore new recipes at the home page and also search for recipes that match his falvors in the search page.
     <br>
     <br>
     Visitors who register to our website can also enjoy:
      <ul>
      <li>Mark recipes that they liked and they will be saved for them at the 'My Favorite Recipes'.</li>
      <li>An inidication for recipes that he already seen before.</li>
      <li>The amount of each ingredient.</li>
      </ul>
       </p>
    <h4 class="titles">About The Developers</h4>
    <p>
      This masterpiece of perfection website brought you by the Y.A development team™ ©.
      <br>
      <br>
      <u>
      Our team:
      </u>
      <br>
      <table>
        <tr>
          <th>
            <img src="../assets/yarden.png" class="developer-images"/>
          </th>
          <th>
            <b>
              Yarden Curiel - 
            </b>
            CEO of the Y.A development team and a UN Ambassador of Peace.
            <ul>
              <li>ID: 203676895</li>
              <li>Email: curiey@post.bgu.ac.il</li>
            </ul>
          </th>
        </tr>
      </table>
      <table>
        <tr>
          <th>
            <img src="../assets/aviv.png" class="developer-images" />
          </th>
          <th>
            <b>
            Aviv Amsellem - 
            </b>
            Head of the Board Directors of Y.A development team and President of Kenya.
            <ul>
              <li>ID: 203388665</li>
              <li>Email: avivams@post.bgu.ac.il</li>
            </ul>
          </th>
        </tr>
      </table>
    </p>
    <h4 class="titles">Checkout Our other Sites:</h4>
      <b-row>
        <b-col>
          <a :href="avivSite">
            <b-img
              thumbnail
              rounded
              fluid
              :src="avivSiteImage"
              class="site-image"
              alt="Aviv web site"
            ></b-img>
          </a>
        </b-col>
        <b-col>
          <a :href="yardenSite">
            <b-img
              thumbnail
              rounded
              fluid
              :src="yardenSiteImage"
              class="site-image"
              alt="Yarden web site"
            ></b-img>
          </a>
        </b-col>
        <b-row>
          <b-col>
          <a :href="pacmanSite">
            <b-img
              thumbnail
              rounded
              fluid
              :src="pacmanSiteImage"
              class="site-image"
              alt="Our pacman web site"
            ></b-img>
          </a>
          </b-col>
        </b-row>
      </b-row>
    </b-container>
  </div>
</template>

// <script>
export default {
  name: "about",
  data() {
    return {
      avivSiteImage: require("../assets/aviv-site.png"),
      yardenSiteImage: require("../assets/yarden-site.png"),
      pacmanSiteImage: require("../assets/pacman-site.png"),
      avivSite:
        "https://sise-web-development-environments.github.io/203388665/",
      yardenSite:
        "https://sise-web-development-environments.github.io/203676895/",
      pacmanSite:
        "https://curiey.github.io/packman/"
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 80%;
}

.site-image {
  border-radius: 150px;
  padding: 10px;
  margin: 5px;
  filter: grayscale(45%);
  transition: all 0.7s ease-out;
}
.site-image:hover {
  border: 1px solid #777;
  filter: grayscale(0);
  transform: scale(1.01211352033886652036768955);
  transition-duration: 0.7s;
}
.titles {
  font-weight: bold;
  text-decoration: underline;
}

.bg
{
  background-color: #EFEFEF;
  border-radius: 25px;
  border-style: solid;
  border-color: darkgrey;
  padding: 20px;
}
.developer-images {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
</style>
