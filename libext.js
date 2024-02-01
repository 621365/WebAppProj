// File made by Gabriel Lazaro
// Title: Main Library
// Description: Multiple JS functions that are intended to make development for [UNTITLED PROJECT] easier.
// Note: An attempt to document the functions will be made.

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

function copy(text="") {
    let t = document.createElement("textarea");
    t.id = uuid(1, 1);
    document.getElementById(t.id.toString()).value = text;
    t.select();
    t.setSelectionRange(0, 999999999999999);
    navigator.clipboard.writeText(t.value);
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

