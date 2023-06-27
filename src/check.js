(function () {
  var expectedHash = "<PUT YOUR HASH HERE>";
  var files = [];
  var fileContents = [];

  function loadFile(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send();
  }

  function hash(data, algorithm) {
    var encoder = new TextEncoder();
    var dataBuffer = encoder.encode(data);
    return crypto.subtle.digest(algorithm, dataBuffer).then(function (hashBuffer) {
      var hashArray = Array.from(new Uint8Array(hashBuffer));
      var hashString = hashArray.map(function (byte) {
        return byte.toString(16).padStart(2, '0');
      }).join('');
      return hashString;
    });
  }

  function handleFiles(index) {
    if (index === files.length) {
      var pageContent = fileContents.concat([document.documentElement.outerHTML]);
      hash(pageContent.join(""), "SHA-256").then(function (hashValue) {
        if (hashValue === expectedHash) {
          var securedFields = document.querySelectorAll("input[data-js-secured=\"true\"], textarea[data-js-secured=\"true\"]");
          for (var i = 0; i < securedFields.length; i++) {
            securedFields[i].disabled = false;
          }
        } else {
          alert("Unable to unlock the form : integrity of the cannot be verified !")
        }
      });
      return;
    }
    loadFile(files[index], function (content) {
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