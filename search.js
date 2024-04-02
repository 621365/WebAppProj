// FrameWork for Search Engine. Parts of this code may be used by other parts of this site since it also contains the code to contain articles in "cards."

// Placeholder Archive Card (Assumes that In UL)
function listCard(title, description, meta, id) {
 return `
 <li>
   <a href="./viewer.html?id=`+id+`">
    <div class="card-title">`+title+`</div>
    <div class="card-descr">`+description+`</div>
    <div class="card-metas">`+JSON.stringify(meta)+`</div>
   </a>
 </li>
 `;
}

// Speficically FOR Search Page, but Could be used outside
// depends on archive.js
// I may import the search algorythm from placehorsey if need be
function operate(mediaFilter=false, type="NUL", keyword) {
 let results = [];
 for (i in archive) {
  // Efficiency++
  if (archive[i].title == keyword && (!mediaFilter || archive[i].meta.image.type[0] == type)) {
   results[results.length] = archive[i];
  }
 }

 return results; // if will implement search algorithm, create extra parameter please
}
