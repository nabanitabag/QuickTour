
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  return urlParams.get('city');
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const url = config.backendEndpoint+'/adventures?city='+city;
  try {
  var response = await fetch(url);
  return await response.json();
  }catch(err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  for(var i =0 ; i<adventures.length;i++)
  {
  const img="detail/?adventure=".concat(adventures[i].id);
  const adv =
  `  <div class="col-lg-4 col-sm-6 col-xl-3 ">
    <div class="activity-card ">
      <a href="${img}" id ="${adventures[i].id}">
        <img src = "${adventures[i].image}" class = "img-fluid activity-card img"/>
        <div class="flex-item flex-between">
        <h5 class = "img-fluid activity-card">${adventures[i].name}</h5>
        <h5 class = "img-fluid activity-card">${adventures[i].costPerHead}</h5>
        <h5 class = "img-fluid activity-card">${adventures[i].duration}</h5>
        </div>
      </a>
    <div class="category-banner">
      <h5>${adventures[i].category}</h5>
    </div>
    </div> `;
  document.getElementById("data").insertAdjacentHTML("beforeend",adv);
  }

  var btn =`
  <a href="config.backendEndpoint+'/adventures/new'">
  <button type="button" onclick="function(){
    const url = config.backendEndpoint+'/adventures/new';
  try {
  var response = await fetch(url);
  return await response.json();
  }catch(err) {
    return null;
  }
  }">Add New Adventure</button></a>
  `
  document.getElementById("category-section").insertAdjacentHTML("beforeend",btn);
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  //FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list = list.filter(function (e) {
    return ( (e.duration <= high)&&(e.duration >= low));
});
return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  list = list.filter(function (e) {
    return (e.category==categoryList);
});
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  //FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if(filters.duration)
  {
    var res = filters.duration.split("-");
    var low = res[0];
    var high = res[1];
  }
  if(filters.duration && filters.category)
  {
     var list1 = filterByDuration(list, low, high);
     var list2 = filterByCategory(list, filters.category);
     return list1.concat(list2);
  }
  else if (filters.category)
  {
    return filterByCategory(list, filters.category);
  }
  else if (filters.duration)
  {
     return filterByDuration(list, low, high);
  }
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // FILTERS
  // 1. Store the filters to localStorage using JSON.stringify()
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // FILTERS
  // 1. Get the filters from localStorage and return in JSON format
  var response = JSON.parse(window.localStorage.getItem('filters'));
return response;
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // FILTERS
  // 1. Use the filters given as input, update the Duration Filter and Generate Category Pills
  for(var i = 0 ; i < filters.category.length ; i++)
  {
    const cat =  filters.category[i];
    const pill = `
    <div class = "category-filter">
    <p>${cat}</p>
    </div>`
    document.getElementById("category-list").insertAdjacentHTML("beforeend",pill);
  }
    if(filters.category.length == 0)
      document.getElementById("category-filter").remove();
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
