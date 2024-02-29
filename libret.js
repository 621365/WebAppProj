// Retrieval Library
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
  if (!isRaw) {
    switch (type) {
      case "VID":
        switch (subtype) {
          case "WEBM":
            encode = `<video class="mediaFile vid" src="` + source + `" title="` + alt + `" controls>There was a high likelihood that the video would fail in playback. The following description was provided for the video: ` + alt + `</video>`;
            break;
          case "LOOP":
            encode =  `<video class="mediaFile vid" src="` + source + `" title="` + alt + `" muted autoplay loop> The following description was provided for the video in the case that the video would fail: ` + alt + `</video>`;
            break;
          case "MUTE":
            encode =  `<video class="mediaFile vid" src="` + source + `" title="` + alt + `" muted controls> The following description was provided for the video in the case that the video would fail: ` + alt + `</video>`;
            break;
          case "SHOK":
            encode = `<embed class="mediaFile shok" title="` + alt + `" src="` + source + `" quality="high">Because Shockwave has been killed by Adobe, this file may not work. In the case the file fails, the following description is provided: ` + alt + ` If you truly want to view this file, please use the Ruffle emulator to play this file.</embed>`;
            break;
          case "AIDS":
            encode = "This was a filetype intended for the embedding of web-viruses, but was never made because due to being considered unprofessional.";
            break;
          default:
            encode =  `<video id="mediaFile" class="" src="` + source + `" title="` + alt + `" controls> The following description was provided for the video in the case that the video would fail: ` + alt + `</video>`;
            break;
        }
        break;
      case "IMG":
        switch (subtype) {
          case "GIF":
            encode = `<img class="mediaFile rtr" src="` + source + `" title="` + alt + `" alt="` + alt + `" style="image-rendering: pixelated;" >`;
            break;
          case "VEK":
            encode = `<iframe = src="` + source + `" class="vek" title="If you do not see an image, your browser is incapable of displaying vector graphics. " sandbox><img src="` + source + `" alt="` + alt + `" title="` + alt + `"></iframe>`;
            break;
          case "RTR":
            encode = `<img class="mediaFile rtr" src="` + source + `" title="` + alt + `" alt="` + alt + `">`;
            break;
          case "RAW":
            encode = `<a class="mediaFile raw" href="` + source + `" title="RAW: ` + alt + `" target="_blank" download>This is an uncompressed file containing the sensor information to an image. To view what image the sensor information would make, please click here to download the image. </a>`;
            break;
          case "WBP":
            encode = `<img class="mediaFile rtr" src="` + source + `" title="` + alt + `" alt="` + alt + `" type="image/webp" desc="This is a WEBP file, which means that this file may not be able to display on all browsers.">`;
            break;
          default:
            encode = `<img class="mediaFile rtr" src="` + source + `" title="` + alt + `" alt="` + alt + `">`;
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
            encode = `<h2>` + alt + `</h2><h3>Assembly-Like Code</h3><code>` + source + `</code>`;
          case "C": default:
            encode = `<h2>` + alt + `</h2><h3>C-Like Code</h3><code>` + source + `</code>`;
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
  } else {
    encode = `<a title="The following is raw data that may be downloaded. " href="` + source + `" download>` + alt + `</a>`;
  }
  return encode;
}
