var settings = {
  prefix: "SMA"
};

function buildSKU() {
  var now = Date.now();
  var base36 = settings.prefix + now.toString(36).toUpperCase();
  return base36;
}

function generate() {
  var target = this.dataset.target;
  if (target) {
    var targetElement = document.getElementById(target);
    targetElement.value = buildSKU();
  }
}

function clickHandler(element) {
  element.addEventListener("click", generate);
}

function copy() {
  var target = this.dataset.target;
  var content = document.getElementById(target);
  if (content) {
    content.select();
    content.setSelectionRange(0, 99999);
    document.execCommand("copy");
    document.getSelection().removeAllRanges();
  }
}

function copyHandler(element) {
  element.addEventListener("click", copy);
}

window.addEventListener(
  "DOMContentLoaded",
  function() {
    var button = document.getElementById("generate");
    var textfield = document.getElementById("sku");
    clickHandler(button, textfield);
    button.click();

    var copyButton = document.getElementById("copy");
    copyHandler(copyButton, copyHandler);
  },
  false
);
