// Goes to File Closest to Specified Timestamp
function timewarp(time) {
  //limit: 2038293, 1905350
  if (((time < 0) ? (time * -1) : time) > 2147483647) {
    console.error("Uncaught RangeError: " + time.toString() + " is not within the acceptable time range");
    return -1;
  } else {
    // Prepare for closeTo Function
    let mwah = [];
    for (let i = 0; i < datedArchive.length; i++) {
      mwah[i] = utcTime(datedArchive[i].meta.timestamp.year, datedArchive[i].meta.timestamp.month, datedArchive[i].meta.timestamp.day, datedArchive[i].meta.timestamp.hour, datedArchive[i].meta.timestamp.UTC, datedArchive[i].meta.timestamp.minute, datedArchive[i].meta.timestamp.second); // the person i have a crush on shares this letter lol
    }
    let kissie = closeTo(time, mwah, true);
    return kissie; // in reality, make this redirect to article with this index
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
    document.getElementsByName("month")[0].value = clock.getMonth() + 1; // Those jerks dilated the month value by -1.
    document.getElementsByName("day")[0].value = clock.getDate();
    document.getElementsByName("hour")[0].value = clock.getHours();
    document.getElementsByName("min")[0].value = clock.getMinutes();
    document.getElementsByName("sec")[0].value = clock.getSeconds();
}
