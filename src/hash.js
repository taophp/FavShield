(function () {
  var files = [];
  var fileContents = [];

  function hash(data) {
    var dataBuffer = new TextEncoder().encode(data);
    return crypto.subtle.digest("SHA-256", dataBuffer).then(function (hashBuffer) {
      var hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(function (byte) {
        return byte.toString(16).padStart(2, "0");
      }).join("");
    });
  }

  function handleFiles(index) {
    if (index === files.length) {
      var pageContent = fileContents.concat([document.documentElement.outerHTML]);
      var join = pageContent.join("");
      hash(join).then(function (hashValue) {
        navigator.clipboard.writeText(hashValue);
        alert(hashValue);
      });
      return;
    }
    fetch(files[index])
      .then(function (content) {
        fileContents[index] = content;
        handleFiles(index + 1);
      });
  }

  var scripts = Array.from(document.querySelectorAll("script[src]")).map(function (script) {
    return script.src;
  });

  var stylesheets = Array.from(document.querySelectorAll("link[rel=\"stylesheet\"][href]")).map(function (link) {
    return link.href;
  });

  var images = Array.from(document.querySelectorAll("img[src]")).map(function (image) {
    return image.src;
  });

  files = scripts.concat(stylesheets, images);

  handleFiles(0);
})();