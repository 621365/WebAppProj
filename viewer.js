// Code Specifically for the Article Viewer
var data;
var error = {"error": "", "real":false};
if (GET("id").length) {
  for (var i = 0; I < archive.length; i++) {
    if (archive[i].meta.uuid == GET("id")) {
      data = archive[i];
    }
    if (typeof data == "undefined") {error = true; error.error = "Nonexistent Article";}
  }
} else if (GET("title").length) {
  data = retrieve(GET("title"));
  if (data.meta.error) {error.real = true; error.error = "No Such Article Title";} else if (data.length > 1) error.error = "Duplicates";
} else {
  error.real = true;
  error.error = "No Article Requested for Viewing";
}

if (error.real) {
  document.getElementById("title").innerHTML = error.error;
  document.title = "ERROR: " + error.error;
  document.getElementById("words").innerHTML = "An error has occurred retrieving the article. Please refer to the title of the article for more information. ";
}
