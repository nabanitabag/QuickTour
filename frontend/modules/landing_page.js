import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // Fetch cities using the Backend API and return the data
  const url = config.backendEndpoint+'/cities';
  try {
  var response = await fetch(url);
  return await response.json();
  }catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // Populate the City details and insert those details into the DOM
  const img="pages/adventures/?city=".concat(id);
  const card =
  `  <div class="col-lg-4 col-sm-6 col-xl-3">
    <div class="tile">
      <a href="${img}" id ="${id}">
        <img src = "${image}" class = "img-fluid"/>
      </a>
    <div class="tile-text">
      <h5>${city}</h5>
      <h5>${description}</h5>
    </div>
    </div> `;
                  
  document.getElementById("data").insertAdjacentHTML("beforeend",card);
 }

export { init, fetchCities, addCityToDOM };
