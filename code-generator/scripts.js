var settings = {
  prefix: "S-",
  baseConversion: 36
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
