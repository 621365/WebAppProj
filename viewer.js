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
  if ((typeof data.type != "undefined") ? ((data.length == 1) ? true : false) : false ) {
    document.getElementById("title").innerHTML = data.title;
    document.title = data.title + " - " + data.meta.author;
    document.getElementById("words").innerHTML = data.content;
    document.getElementById("foot-desc").innerHTML = data.meta.description;

  // Time Formatting
    let fancyDate = JSON.stringify(data.meta.timestamp).replaceAll("\"", "").slice(1).slice(0, -1).split(",");
    for (var l = 0; l < fancyDate.length; l++) {
      fancyDate[l] = muranize(fancyDate[l]);  
    }
    fancyDate = fancyDate.toString().replaceAll(",", "; ").replaceAll(":", ": ");
    
    document.getElementById("meta").innerHTML = "Error: " + ((data.meta.error) ? "Yes" : "None") + ", UUID: " + data.meta.uuid + ", Tags: #" + data.meta.tags.toString().replaceAll(",", " #") + ", Timestamp: " + fancyDate;
  } else {
      document.getElementById("title").innerHTML = "Duplicate Article Titles";
      document.title = "Duplicate Article Titles";
      document.getElementById("foot-desc").innerHTML = "Two articles with the same title exist. A prompt has been given to the user that will let the user choose which article was intended to be accessed. Please access articles using their UUID to prevent this inconvenience. ";
    document.getElementById("meta").innerHTML = "An irregular has occurred that prevented this page from promptly showing your desired article. This is not an error, but is not the normal behavior expected of this site. More than one article share the same title as the one that you are wanting to view. The articles that you might want to access will be shown alongside their metadata; please choose which article to view. If you would like to prevent this error from occurring again, please refer to articles through their UUID instead of through their title. ";
  }
}
