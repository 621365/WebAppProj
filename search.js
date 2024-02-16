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
