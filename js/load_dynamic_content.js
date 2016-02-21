const ENCRYPTED_ID = "U2FsdGVkX1/+MtKL/1VW+4j+zYPX8DOHDj5I7ya+vfeoHbQ93F7uMK9l+wT/43M7";

window.onload = loadDynamicContent;

function createIdFromLocationHash() {
  let hash = window.location.hash;
  return CryptoJS.AES.decrypt(ENCRYPTED_ID, hash).toString(CryptoJS.enc.Utf8);
};

function createDynamicContentSourceURL() {
  return 'http://cdn.rawgit.com/davherrmann/' + createIdFromLocationHash() + '/raw/davherrmann.github.io.json';
};

function loadDynamicContent() {
  if (window.location.hash.length <= 1) {
    return;
  }

  let httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = createOnDynamicContentLoaded(httpRequest);
  httpRequest.open('GET', createDynamicContentSourceURL(), true);
  httpRequest.send(null);
};

function createOnDynamicContentLoaded(httpRequest) {
  return function() {
    if (httpRequest.readyState === XMLHttpRequest.DONE && httpRequest.status === 200) {
      injectDynamicContent(httpRequest.responseText);
    }
  };
};

function injectDynamicContent(jsonString) {
  let dynamicContent = JSON.parse(jsonString);
  for (let key in dynamicContent) {
    if (dynamicContent.hasOwnProperty(key)) {
      injectInnerHTML(key, dynamicContent[key]);
    }
  }
}

function injectInnerHTML(id, innerHTML) {
  let parentElement = document.createElement("div");
  parentElement.innerHTML = innerHTML;
  document.getElementById(id).appendChild(parentElement.firstChild);
}
