// Because there is no backend, all articles must be hard-coded into this file. 
var archive = [
  {
    "title": "Test Article",
    "content": "This is a test article. This holds the template for which all articles will be made.",
    "meta": {
      "description": "This is a test article.",
      "author": "Gabriel Lazaro",
      "tags": ["Test", "Placeholder"],
      "image": {
        "source": null,
        "alt": "No Image Shown"
      },
      "timestamp": {
          "year": 2024,
          "month": 1,
          "day": 30,
          "hour": 10,
          "minute": 59,
          "second": 3.14159,
          "UTC": -8
        }
    }
  } 
]

// Search Retrieval Framework

// Aquires the Hard-Coded ID of the 
function retrieve(title) {
  //Initialize
  let results = [{
    "title": "Duplicate Articles",
    "content": "There is more than one article with the name that you are searching for. Please select one of the articles below to view it.<br><br>",
    "meta": {
      "description": "This is a test article.",
      "author": "Gabriel Lazaro",
      "tags": ["Error", "Duplicate"],
      "image": {
        "source": null,
        "alt": "No Image Shown"
      },
      "timestamp": {
          "year": 1987,
          "month": 11,
          "day": 13,
          "hour": 3,
          "minute": 13,
          "second": 6,
          "UTC": 0
        }
    }
  }];

  // Search
  let j = 1;
  for (var i = 0; I < archive.length; i++) {
    if (article[i].title == title) { results[j] = article[i]; j++; }
  }

  // Return Based on Duplicates
  return (results.length > 2) ? results : results[1];
}
