// Dependent on Archive Library
var existingDates = [[],[],[],[]]; // Year, Month, Day, Hour
for (let i = 0; i < 4; i++) {
  let type = ["year", "month", "day", "hour"];
  for (let j = 0; j < datedArchive.length; j++) {
    if (!existingDates.includes(datedArchive[j].meta.timestamp[type[i]]) existingDates[i].push(existingDates.includes(datedArchive[j].meta.timestamp[type[i]]);
  }
}
