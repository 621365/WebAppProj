// Goes to File Closest to Spefified Timestamp
function timewarp(time) {
  //limit: 2038293, 1905350
  
}

// Function Intended for Exclusive Use With Archive List
function determineUTC() {
  let uUTC = userUTC();
  alert("Your UTC Dialation in your location is " + uUTC.toString() + ".");
  document.getElementsByName("utc")[0].value = uUTC;
  return uUTC;
}
