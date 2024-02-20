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
          encode = `<video id="mediaFile" class="" src="` + source + `" title="` + alt + `">There was a high likelihood that the video would fail in playback. The following description was provided for the video: ` + alt + `</video>`;
          break;
        case "LOOP":
          encode =  `<video id="mediaFile" class="" src="` + source + `" title="` + alt + `" muted autoplay loop> The following description was provided for the video in the case that the video would fail: ` + alt + `</video>`;
          break;
        case "MUTE":
          encode =  `<video id="mediaFile" class="" src="` + source + `" title="` + alt + `" muted> The following description was provided for the video in the case that the video would fail: ` + alt + `</video>`;
          break;
        case "SHOK":
          encode = `<embed id="mediaFile" class="" title="` + alt + `" src="` + source + `" quality="high">Because Shockwave has been killed by Adobe, this file may not work. In the case the file fails, the following description is provided: ` + alt + ` If you truly want to view this file, please use the Ruffle emulator to play this file.</embed>`;
          break;
        case "AIDS":
          encode = "This was a filetype intended for the embedding of web-viruses, but was never made because due to being considered unprofessional.";
          break;
        default:
          encode =  `<video id="mediaFile" class="" src="` + source + `" title="` + alt + `" muted> The following description was provided for the video in the case that the video would fail: ` + alt + `</video>`;
          break;
      }
      break;
    case "IMG":
      switch (subtype) {
        case "GIF":
          encode = `<img id="mediaFile" class="rtr" src="` + source + `" title="` + alt + `" alt="` + alt + `" style="image-rendering: pixelated;" >`;
          break;
        case "VEK":
          encode = `<iframe = src="` + source + `" class="vek" title="If you do not see an image, your browser is incapable of displaying vector graphics. " sandbox><img src="` + source + `" alt="` + alt + `" title="` + alt + `"></iframe>`;
          break;
        case "RTR":
          encode = `<img id="mediaFile" class="rtr" src="` + source + `" title="` + alt + `" alt="` + alt + `">`;
          break;
        case "RAW":
          encode = `<a id="mediaFile" class="raw" href="` + source + `" title="RAW: ` + alt + `" target="_blank" download>This is an uncompressed file containing the sensor information to an image. To view what image the sensor information would make, please click here to download the image. </a>`;
          break;
        case "WBP":
          encode = `<img id="mediaFile" class="rtr" src="` + source + `" title="` + alt + `" alt="` + alt + `" type="image/webp" desc="This is a WEBP file, which means that this file may not be able to display on all browsers.">`;
          break;
        default:
          encode = `<img id="mediaFile" class="rtr" src="` + source + `" title="` + alt + `" alt="` + alt + `">`;
          break;
      }
      break;
    case "YTV":
      switch (subtype) {
        case "RICK":
          encode = `This is a placeholder for the rick-rolling code. `;
          break;
        case "NORM": default:
          encode = `<iframe class="ebd" src="https://www.youtube.com/embed/` + source + `" title="` + alt + `" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>` + alt + `</iframe>`;
          break;
      }
      break;
    case "EBD":
      switch (subtype) {
        case "CUSTM":
          encode = `<h1>` + alt + `</h1><div class="ebd">` + source + `</div>`;
          break;
        case "FRAME": default:
          encode = `<iframe class="ebd" title="` + alt + `" src="` + source + `"></iframe>`;
          break;
      }
      break;
    case "AUD":
      switch (subtype) {
        case "LOOP":
          encode = `<audio class="aud" title="` + alt + `" src="` + source + `" controls loop>If you see this, it means that your browser cannot play audio. The following audio description is provided: ` + alt + `</audio>`;
          break;
        case "NORM": default:
          encode = `<audio class="aud" title="` + alt + `" src="` + source + `" controls>If you see this, it means that your browser cannot play audio. The following audio description is provided: ` + alt + `</audio>`;
          break;
      }
      break;
    case "IDE":
      switch (subtype) {
        case "A":
          break;
          encode = "";
        case "C": default:
          encode = "";
          break;
      }
      break;
    default: case "NUL":
      switch (subtype) {
        case "TEST":
          encode = "";
          break;
        case "NULL": default:
          encode = "";
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
