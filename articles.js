// Dependent on Viewer Library and Archive Library

// Punches article into whatever HTML you want (assumes UUID for article and HTMLID for others), returns -1 or 0 depending if it worked or not (non-zero means it did not work)
function punch(id, title, med, content, meta) {
  var data;
  for (var i = 0; i < archive.length; i++) {
    if (archive[i].meta.uuid == GET("id")) {
      data = archive[i];
    }
  }
  if (typeof data == "undefined") { console.error("Nonexistent Article Requested."); return -1; } else {
    title = data.title;
    med = media(data.meta.image.type[0], data.meta.image.type[1], data.meta.image.source, data.meta.image.alt, ((typeof data.meta.image.raw != "undefined") ? data.meta.image.raw : false));
    meta = JSON.stringify(data.meta); // Placeholder Until I Add Format Function in Viewer Library
    content = data.content;
    return 0;
  }
}
