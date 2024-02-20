// After Realizing How Much May Be Used By Other Parts of the Site, I Decided to Add Supporting Functions here

// Accepts VID (Video), IMG (Image), YTV (YouTube Video), EBD (Embed), AUD (Audio), IDE (Code), NUL (None)
/* Subtypes: 
  VID.WEBM (WORST EVER BROKEN MEDIUM), VID.LOOP (Looping Video), VID.MUTE (Muted Video), VID.SHOK (Flash File), VID.AIDS (Agonizingly Intrusive Digital Site)
  IMG.GIF (Graphics Interchange Format), IMG.VEK (Vector Image), IMG.RTR (Raster Image), IMG.RAW (Uncompressed Image), IMG.WBP (WORST BROKEN PHOTOS)
  YTV.NORM (Normal YouTube Embed), YTV.RICK (Rick Roll YouTube Embed)
  EBD.FRAME (iFrame Embed), EBD.CUSTM (Custom Embed)
  AUD.NORM (Normal Audio), AUD.LOOP (Looping Audio)
  IDE.C (C-Based Code), IDE.A (Assembly-Based Code)
  NUL.NULL (Absolutely Nothing), NUL.TEST (Placeholder)
*/
function media(type = null, subtype = null, source = null, alt = "Unknown or undeclared type of media.", isRaw = false) {
  var encode = "";
  switch (type) {
    case "VID":
      switch (subtype) {
        case "WEBM":
          encode = `<video id="mediaFile" src="` + source + `" title="` + alt + `">There was a high likelihood that the video would fail in playback. The following description was provided for the video: ` + alt + `</video>`;
          break;
        case "LOOP":
          encode =  `<video id="mediaFile" src="` + source + `" title="` + alt + `"> The following description was provided for the video: ` + alt + `</video>`;
          break;
        case "MUTE":
          break;
        case "SHOK":
          encode = `<embed id="mediaFile" title="` + alt + `" src="` + source + `" quality="high">Because Shockwave has been killed by Adobe, this file may not work. In the case the file fails, the following description is provided: ` + alt + ` If you truly want to view this file, please use the Ruffle emulator to play this file.</embed>`;
          break;
        case "AIDS":
          break;
        default:
          break;
      }
      break;
    case "IMG":
      switch (subtype) {
        default:
          break;
      }
      break;
    case "YTV":
      switch (subtype) {
        default:
          break;
      }
      break;
    case "EBD":
      switch (subtype) {
        default:
          break;
      }
      break;
    case "AUD":
      switch (subtype) {
        default:
          break;
      }
      break;
    case "IDE":
      switch (subtype) {
        default:
          break;
      }
      break;
    default: case "NUL":
      switch (subtype) {
        default:
          break;
      }
      break;
  }
  return encode;
}


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
  if ((typeof data.length != "undefined") ? ((data.length == 1) ? true : false) : true ) {
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
      document.getElementById("words").innerHTML = "<ul>";
      for (var k = 0; k < data.length; k++) {
        document.getElementById("words").innerHTML += listCard(data[k].title, data[k].content, data[k].meta, data[k].meta.uuid);
      }
      document.getElementById("words").innerHTML += "</ul>";
    }
  }
