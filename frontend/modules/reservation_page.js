import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url = config.backendEndpoint+'/reservations/';
  try {
  var response = await fetch(url);
  // console.log(response);
  
  return await response.json(); 
  }catch(err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  //Conditionally render the no-reservation-banner and reservation-table-parent
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
if(reservations.length > 0){

var rtable = document.getElementById("reservation-table")

for(var i = 0 ; i<reservations.length ; i++){

  var d = new Date(reservations[i].date);
  var t = new Date(reservations[i].time);
  var time = t.toLocaleString("en-IN", 
    {
      year:"numeric",
      month:"long",
      day: "numeric",
      hour:"numeric",
      minute:	"numeric",
      second:	"numeric"
    });
  var date = d.toLocaleDateString("en-IN");

  var row = rtable.insertRow(i);
  row.id = reservations[i].id;
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);

  var a1 = document.createElement("A");
  a1.href = config.backendEndpoint + "/detail/?adventure=" + reservations[i].id;
  a1.innerHTML = reservations[i].id;
  cell1.appendChild(a1);
  cell1.href = config.backendEndpoint + "/detail/?adventure=" + reservations[i].adventure;
 
  cell2.innerHTML = reservations[i].name;
  cell3.innerHTML = reservations[i].adventureName;
  cell4.innerHTML = reservations[i].person;
  cell5.innerHTML = date;
  cell6.innerHTML = reservations[i].price;
  cell7.innerHTML = time;

  let button = document.createElement('BUTTON')
  button.className = "reservation-visit-button";
  var URL = config.backendEndpoint + "/detail/?adventure=" + reservations[i].adventure;
   button.addEventListener("click", function(){
    window.location = URL;
  });
  
  cell8.appendChild(button);
}
  
  document.getElementById("reservation-table-parent").style.display = "block";
  document.getElementById("no-reservation-banner").style.display = "none";
  } 
  
  else{
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }
}

export { fetchReservations, addReservationToTable };
