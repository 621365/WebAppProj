// Goes to File Closest to Specified Timestamp
function timewarp(time) {
  //limit: 2038293, 1905350
  if (time > 2038293 || time < 1905350) {
    console.error("Uncaught RangeError: " + time.toString() + "is not within the acceptable time range");
    return -1;
  } else {

  }
}

// Function Intended for Exclusive Use With Archive List
function determineUTC() {
  let uUTC = userUTC();
  alert("Your UTC Dialation in your location is " + uUTC.toString() + ".");
  document.getElementsByName("utc")[0].value = uUTC;
  return uUTC;
}

// Function Intended for Exclusive Use With Archive List (Fills Out Date)
function fillDate() {
    document.getElementsByName("utc")[0].value = userUTC();
    document.getElementsByName("year")[0].value = clock.getFullYear();
    document.getElementsByName("month")[0].value = clock.getMonth();
    document.getElementsByName("day")[0].value = clock.getDate();
    document.getElementsByName("hour")[0].value = clock.getHours();
    document.getElementsByName("minute")[0].value = clock.getMinutes();
}
