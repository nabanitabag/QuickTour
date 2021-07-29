import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const myParam = urlParams.get('adventure');
  // Place holder for functionality to work in the Stubs
  return myParam;
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const url = config.backendEndpoint + "/adventures/detail?adventure=" + adventureId;
  try{
  var response = await fetch(url);
  return await response.json();
  } catch(err){
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
        document.getElementById("adventure-name").innerHTML = adventure.name; 
        document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle; 
        document.getElementById("adventure-content").innerHTML = adventure.content; 
        for(var i = 0 ; i < adventure.images.length; i++ )
        {
          var div = document.createElement("DIV");  
          var elem = document.createElement("img");
          elem.setAttribute("src", adventure.images[i]);
          elem.className = "activity-card-image";
          div.appendChild(elem);
          document.getElementById("photo-gallery").appendChild(div);
        }
  }

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  var gallery = document.getElementById("photo-gallery");
  gallery.className = "carousel-inner";
  gallery.className = "carousel slide";
  var d  = gallery.getAttribute('data-ride');
  d = "carousel";

  var div = document.createElement("DIV");  
  var elem = document.createElement("img");
   elem.setAttribute("src", images[0]);
   elem.className = "activity-card-image";
   div.appendChild(elem);
   div.className = "carousel-item active";
   gallery.appendChild(div);

  for(var i = 1 ; i < images.length; i++ )
  {
    var div = document.createElement("DIV");  
    var elem = document.createElement("img");
    elem.setAttribute("src", images[i]);
    elem.className = "activity-card-image";
    div.appendChild(elem);
    div.className = "carousel-item";
    gallery.appendChild(div);
  }

  var html = `
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
  <span class="sr-only">Previous</span>
</a>
<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
  <span class="carousel-control-next-icon" aria-hidden="true"></span>
  <span class="sr-only">Next</span>
</a>`

gallery.insertAdjacentHTML('beforeend', html);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  var sold = document.getElementById("reservation-panel-sold-out"); 
  var available = document.getElementById("reservation-panel-available"); 

  if(adventure.available == true){
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
    sold.style.display = "none";
    available.style.display = "block";
    
  }
  else if (adventure.available == false){
    available.style.display = "none";
    sold.style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmitUsingJQuery(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const URL = config.backendEndpoint + "/reservations/new";
  $("#myForm").on("submit", function(){
    $.ajax({
      url: URL,
      type: 'post',
      dataType: 'json',
      data: $('#myForm').serialize() +'&adventure='+adventure.id,
      error: function(){
        alert("Failed!");},
      success: function(data) {
                 alert("Success!");
                 location.reload();
               }            
  });
});
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
  document.getElementById("reserved-banner").style.display = "block";
}
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmitUsingJQuery,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
