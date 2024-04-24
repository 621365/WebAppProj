// File made by Gabriel Lazaro
// Title: Main Library
// Description: Multiple JS functions that are intended to make development for [UNTITLED PROJECT] easier.
// Note: An attempt to document the functions will be made.
const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Generates a statistically unique identifier
// Contains two parameters for amount of UUIDs and if to have proper spacing
function uuid(amount = 1, parse = false) {
    // Initialize
    let char = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "7"];
    let array = [];
    // Generate [AMOUNT] amount of UUIDs
    for (let i = 0; i < amount; i++) {
        // Determins if to Parse UUID or not
        if (parse) {
            // Initialize and Write
            array[i] = "";
            for (let j = 0; j < 36; j++) {
                // Add Proper Punctuation
                switch (j) {
                    case 8:
                    case 13:
                    case 18:
                    case 23:
                    array[i] += "-";
                        break;
                    default:
                        array[i] += char[Math.floor(Math.random() * 16)];
                        break;
                }
            }
        } else {
            // Initialize and Write
            array[i] = "";
            for (let j = 0; j < 32; j++) {
                array[i] += char[Math.floor(Math.random() * 16)];
            }
        }
    }
    // Return array if multiple or a string is singular
    return (amount == 1) ? array[0] : array;
}

// Identity Maintainer
var UUID = [];

// Registry
function regUUID(id, description = "Unknown Item") {
    if (typeof id != "string" && typeof id != "number" && typeof id != "bigint") {
        console.error("No UUID for Registering. Exiting. ");
        return -1;
    } else {
        UUID[id] = {"description": description};
        return UUID[id];
    }
}

// Copy Text (Second Variable Delays Action in Milliseconds For Debug Purposes)
function copy(text = "", delay = 1) {
    let t = document.createElement("input");
    t.type = "text";
    t.id = uuid(1, 1).toString();
    t.value = text;
    t.select();
    t.setSelectionRange(0, 999999999999999);
    setTimeout(function () { navigator.clipboard.writeText(t.value); }, delay);
    t.remove();
    return text;
}

// Relies of UUID Function Above
// Creates a Tracked Object
class object {
    constructor(item, desc = "Default Object") {
        this.item = item;
        this.uuid = uuid(1, true);
        this.desc = desc;
        regUUID(this.uuid, this.desc);
        this.reg = UUID;
    }
}

class winNT extends object {
    // Variablr Full Names
    //(In Pixels) X-Position, Y-Position, Height, Width, Minimize Enabled, Fullscreen Enabled, State (Normal, Fullscreen, Minimized, Spy), HTML, Resizable
    constructor(x, y, h, w, vm, vf, s, html, sz) {
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        /* Initialize
        generate super large variable, merging all of the ideas together
        disable/enable functions based on 
        
        */
    }
}

class alert extends object {
    constructor(title, text) {
        super();
        this.skipper = document.createElement("div");
        this.skipper.className = "skipper";
        this.container = document.createElement("div");
        this.container.className = "skipper-container-border";
        this.skipper.appendChild(this.container);
        this.content = document.createElement("div");
        this.content.className = "skipper-container";
        this.container.appendChild(this.content);
        this.title = document.createElement("div");
        this.title.className = "skipper-title";
        this.title.innerHTML = title;
        this.content.appendChild(this.title);
        this.text = document.createElement("div");
        this.text.className = "skipper-text";
        this.text.innerHTML = text;
        this.content.appendChild(this.text);
        this.end = document.createElement("a");
        this.end.tabIndex = "0";
        this.end.title = title;
        this.end.innerHTML = "OK";
        this.endFunction = () => {
            super();
            let el = this.skipper;
            let i = setTimeout(function() { el.remove(); removeTimeout(i); }, ((noMotion) ? 0 : 250))
        }
        this.container.addEventListener("blur", this.endFunction);
        this.container.onblur = this.endFunction;
        this.end.onblur = this.endFunction;
        this.end.addEventListener("blur", this.endFunction);
        this.end.href = "javascript:document.activeElement.blur();";
        this.content.appendChild(this.end);

        document.body.appendChild(this.skipper);
        document.body.insertBefore(this.skipper, document.body.firstChild);
        this.end.focus();
    }
}

// Capitalize First N Letters (Defaults to 1)
function muranize(string, n = 1) {
    return string.slice(0, n).toUpperCase() + string.slice(n);
}

// Return Array ID of Array Number Closest to Parameter 1 (Assumes Number Array)
// Also set the third parameter to "true" if you want to enable the similarity report
function closeTo(n = 0, array, returnSimilarity = false) {
    if (typeof array[0] != "number" || typeof array[0] == "undefined") {console.error("ERROR: NON-NUMERIC ARRAY PLACED"); return -1;} // Safe-Guard
    var r = 0;
    var l = Math.abs(n - array[r]);
    for (var i = 1; i < array.length; i++) {
        if (Math.abs(n - array[i]) < Math.abs(n - array[r])) {r = i; l = Math.abs(n - array[r]); }
    }
    return (returnSimilarity) ? [r, l] : r;
}

// Imported From Placehorsey, which was in turn imported from StackOverflow
function GET(q,s){s=(s)?s:window.location.search;let r=new RegExp("&"+q+"=([^&]*)","i");return (s=s.replace(/^\?/,"&").match(r))?s=s[1]:s="";}

// Attempt at making offline mode
var detection;
var online = true;
window.onload = () => {
  "use strict";
  if ("serviceWorker" in navigator && document.URL.split(":")[0] !== "file") {
    navigator.serviceWorker.register("liboff.js");
    }
    // Add Offline Listener
    // Message
    online = (navigator.onLine);
    detection = document.createElement("div");
    detection.innerHTML = "<br>Alert: You are in offline mode; some images may not load and external sites will not work as well.";
    detection.style.display = (online) ? "none" : "block";
    document.getElementById("foot-desc").appendChild(detection);
    
    // Detector
    window.addEventListener("online", () => { detection.style.display = "none"; online = true; });
    window.addEventListener("offline", () => { detection.style.display = "block"; online = false; });
}


// Offline/Online Alerter

// Funny lazy stuff
var dId = document.getElementById;
var gLass = document.getElementsByClassName;
var clock;
// Turn Clock Into Live Clock
setInterval(function(){clock = new Date();}, 1);
function userUTC(){return clock.getTimezoneOffset()/-60;}

// Generates Random Array (First Param Length, Second If String or Number), Returns Random Array
function genArray(length = 10, isNum = true) {
    let a = [];
    for (let i = 0; i < length; i++) {
        a[i] = (isNum) ? parseInt(Math.random() * 1915) : uuid(1, true);
    }
    return a;
}

// Convert Any Date to UTC
function utcTime(year=1987, mon=1, day=1, hour=0, UTC=0, min=0, sec=0) {
    return parseInt(Math.round((new Date(year.toString() + " " + ((mon.toString().length)?monthGet(mon):1).toString() + " " + day.toString() + " " + hour.toString() + ":" + min.toString() + ":" + sec.toString() + " UTC" + UTC.toString()).getTime())/1000));
}

// Convert Month Number to String (Tiny Controls if Shortened Form or Not)
function monthGet(m, tiny=false) {
    let data = (tiny)?["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]:["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return data[m - 1];
}

// (Imported from ESSIAN) Cookie Editor
function setCookie(cname, cvalue) {
    var d = new Date();
    //d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+"2147483647";//+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Reset Cache Bar
function cleanCacheBar() {
    if (window.navigator && navigator.serviceWorker) {
        navigator.serviceWorker.getRegistrations().then(function(registrations) {
            for(let registration of registrations) {
              registration.unregister();
            }
        });
    }
}
