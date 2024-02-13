// Code Specifically for the Article Viewer
var data;
var error = {"error": "", "real":false};
if (GET("id").length) {
  for (var i = 0; i < archive.length; i++) {
    if (archive[i].meta.uuid == GET("id")) {
      data = archive[i];
    }
    if (typeof data == "undefined") {error = true; error.error = "Nonexistent Article";}
  }
} else if (GET("title").length) {
  data = retrieve(decodeURIComponent(GET("title")));
  if (typeof data.length == "undefined") if (data.meta.error) {error.real = true; error.error = "No Such Article Title";} else if (data.length > 1) error.error = "Duplicates";
} else {
  error.real = true;
  error.error = "No Article Requested for Viewing";
}

if (error.real) {
  document.getElementById("title").innerHTML = error.error;
  document.title = "ERROR: " + error.error;
  document.getElementById("words").innerHTML = "An error has occurred retrieving the article. Please refer to the title of the article for more information. ";
  document.getElementById("foot-desc").innerHTML = "An error has occurred that prevented the article from being retrieved. No more information about the supposed contents of the requested article can be retrieved. ";
} else {
  if (typeof data.length == "undefined") {
    document.getElementById("title").innerHTML = data.title;
    document.title = data.title + " - " + data.meta.author;
    document.getElementById("words").innerHTML = data.content;
    document.getElementById("foot-desc").innerHTML = data.meta.description;
    document.getElementById("meta").innerHTML = "Error: " + ((data.meta.error) ? "Yes" : "None") + ", UUID: " + data.meta.uuid + ", Tags: #" + data.meta.tags.toString().replaceAll(",", " #") + ", Timestamp: " + data.meta.timestamp.toString();
  }
}
