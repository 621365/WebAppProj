// FrameWork for Search Engine. Parts of this code may be used by other parts of this site since it also contains the code to contain articles in "cards."

// Placeholder Archive Card (Assumes that In UL)
function listCard(title, description, meta, id) {
 return `
 <li>
  <hr>
   <a href="./viewer.html?id=`+id+`">
    <div class="card-title">TITLE: `+title+`</div><br>
    <div class="card-descr">DESCRIPTION: `+description+`</div><br>
    <div class="card-metas">METADATA: `+JSON.stringify(meta)+`</div>
   </a>
 </li>
 `;
}

// Speficically FOR Search Page, but Could be used outside
// depends on archive.js
// I may import the search algorythm from placehorsey if need be
function operate(mediaFilter=false, type="NUL", keyword="", tags=null) {
 let results = [];
 for (i in archive) {
  // Efficiency++
  if ((archive[i].title == keyword || typeof keyword == "undefined") && (!mediaFilter || archive[i].meta.image.type[0] == type)) {
   results[results.length] = archive[i];
  }
 }
 let tagsList = [];
 if (typeof tags != "undefined" && typeof tags != "null" && tags != null) {
  if (tags.length > 0) {
   tagsList = tags.split(",");
   // White-Space Safeguard
   for (t in tagsList) tagsList[t] = tagsList[t].trim();
  }
 }
 let resultTags = [];
 if (tagsList.length) {
  if (keyword.length < 1) {
   results = archive;
  }
  for (thing in results) {
  for (stuff of tagsList) {
   if (results[parseFloat(thing)].meta.tags.includes(stuff)) {
     resultTags.push(results[parseFloat(thing)]);
   }
  }
  }
 } else {
 resultTags = results;
}
results = resultTags;
 let medResults = [];
if (type != "NUL") {
   if (keyword.length < 1) {
   results = archive;
  }
 for (thing in results) {
  if (results[parseFloat(thing)].meta.image.type[0] == type) {
   medResults.push(results[parseFloat(thing)]);
  }
 }
} else {
 medResults = results;
}
 results = medResults;
 return results; // if will implement search algorithm, create extra parameter please
}

function placer(results, d=0) {
 // place result number
 
  let count = 0;
 if (results.length == 0) {
  document.getElementById("results").innerHTML = "NO RESULTS EXIST FOR YOUR QUERY.";
 } else {
   document.getElementById("results").innerHTML = "";
  for (let i = 0; i <= ((d < results.length) ? d : (results.length - 1)); i++) {
   document.getElementById("results").innerHTML += listCard(results[i].title, results[i].meta.description, results[i].meta, results[i].meta.uuid);
   count++;
  }
  document.getElementById("logger").innerHTML = ("SHOWING " + (count.toString()) + " RESULT") + ((count == 1) ? ": " : "S: ");
  if (document.getElementById("results").innerHTML.length == 0) document.getElementById("results").innerHTML = "Your search result yielded no results."; 
 }
}
