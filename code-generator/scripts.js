var settings = {
  prefix: "S-",
  baseConversion: 36,
  // dictionary: {
  //   "0": "2",
  //   "1": "3",
  //   "2": "4",
  //   "3": "5",
  //   "4": "6",
  //   "5": "7",
  //   "6": "8",
  //   "7": "9",
  //   "8": "B",
  //   "9": "C",
  //   A: "D",
  //   B: "F",
  //   C: "G",
  //   D: "H",
  //   E: "J",
  //   F: "K",
  //   G: "M",
  //   H: "N",
  //   I: "P",
  //   J: "Q",
  //   K: "R",
  //   L: "S",
  //   M: "V",
  //   N: "X",
  //   O: "Z",
  // },
};

function buildTimestamp() {
  var now = Date.now();
  var fiftyYears = 1577847600000; // 50 years in milliseconds
  var timestamp = Math.ceil((now - fiftyYears) / 1000);
  return timestamp;
}

function buildCode(timestamp, rep) {
  timestamp += rep;
  var encoded = timestamp.toString(settings.baseConversion).toUpperCase();
  // for (var i = 0; i < encoded.length; i++) {
  //   var oldChar = encoded[i];
  //   var newChar = settings.dictionary[oldChar];
  //   encoded = encoded.replace(oldChar, newChar);
  // }
  return settings.prefix + encoded;
}

function exportData() {
  var codeArray = [];
  var target = document.getElementById(this.dataset.quantity);
  var quantity = target.value;
  var csvContent = "data:text/csv;charset=utf-8,Code\r\n";
  var timestamp = buildTimestamp();
  for (var i = 0; i < quantity; i++) {
    codeArray.push(buildCode(timestamp, i));
  }
  codeArray.forEach(function (code) {
    csvContent += code + "\r\n";
  });

  var encodedURI = encodeURI(csvContent);
  var link = document.createElement("a");
  var filename = "sma-code-batch_" + timestamp + ".csv";
  link.setAttribute("href", encodedURI);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
}

function exportHandler(element) {
  element.addEventListener("click", exportData);
}

window.addEventListener(
  "DOMContentLoaded",
  function () {
    var exportButton = document.getElementById("export");
    exportHandler(exportButton);
  },
  false
);
