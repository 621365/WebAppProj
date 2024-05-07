// Code Specifically for the Article Viewer
var data;
var error = {"error": "", "real":false};

// ID or Title Handler
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

// Error Handling
if (error.real) {
  document.getElementById("title").innerHTML = error.error;
  document.getElementById("meta-title").innerHTML = error.error;
  document.title = "ERROR: " + error.error;
  document.getElementById("words").innerHTML = "An error has occurred retrieving the article. Please refer to the title of the article for more information. ";
  document.getElementById("foot-desc").innerHTML = "An error has occurred that prevented the article from being retrieved. No more information about the supposed contents of the requested article can be retrieved. ";
} else {

  // Load Article if Exists
  if ((typeof data.length != "undefined") ? ((data.length == 1) ? true : false) : true ) {
    document.getElementById("title").innerHTML = data.title;
    document.getElementById("meta-title").innerHTML = data.title;
    document.title = data.title + " - " + data.meta.author;
    document.getElementById("words").innerHTML = "By: " + data.meta.author + "<br><br>" + data.content;
    document.getElementById("foot-desc").innerHTML = data.meta.description;
    for (metae of document.getElementsByClassName("description")) metae.setAttribute("content", data.meta.description);
    document.getElementById("media-container").innerHTML = media(data.meta.image.type[0], data.meta.image.type[1], data.meta.image.source, data.meta.image.alt, ((typeof data.meta.image.raw != "undefined") ? data.meta.image.raw : false));
    
  // Time Formatting
    let fancyDate = JSON.stringify(data.meta.timestamp).replaceAll("\"", "").slice(1).slice(0, -1).split(",");
    for (var l = 0; l < fancyDate.length; l++) {
      fancyDate[l] = muranize(fancyDate[l]);  
    }
    fancyDate = fancyDate.toString().replaceAll(",", "; ").replaceAll(":", ": ");
    
    document.getElementById("meta").innerHTML = "Error: " + ((data.meta.error) ? "Yes" : "None") + ", UUID: " + data.meta.uuid + ", Tags: #" + data.meta.tags.toString().replaceAll(",", " #") + ", Timestamp: " + fancyDate;
  } else {
    // Duplicate Handler
      document.getElementById("title").innerHTML = "Duplicate Article Titles";
      document.getElementById("meta-title").innerHTML = data.title;
      document.title = "Duplicate Article Titles";
      document.getElementById("foot-desc").innerHTML = "Two articles with the same title exist. A prompt has been given to the user that will let the user choose which article was intended to be accessed. Please access articles using their UUID to prevent this inconvenience. ";
      for (metae of document.getElementsByClassName("description")) metae.setAttribute("content", "Two articles with the same title exist. A prompt has been given to the user that will let the user choose which article was intended to be accessed. Please access articles using their UUID to prevent this inconvenience. ");
      document.getElementById("meta").innerHTML = "An irregular has occurred that prevented this page from promptly showing your desired article. This is not an error, but is not the normal behavior expected of this site. More than one article share the same title as the one that you are wanting to view. The articles that you might want to access will be shown alongside their metadata; please choose which article to view. If you would like to prevent this error from occurring again, please refer to articles through their UUID instead of through their title. ";
      document.getElementById("words").innerHTML = "<ul>";
      for (var k = 0; k < data.length; k++) {
        document.getElementById("words").innerHTML += listCard(data[k].title, data[k].content, data[k].meta, data[k].meta.uuid);
      }
      document.getElementById("words").innerHTML += "</ul>";
    }
  }
