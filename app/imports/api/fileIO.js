
/*
  https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download
*/
// function downloadStory() {
//   function onStartedDownload(id) {
//     console.log(`Started downloading: ${id}`);
//   }
//   function onFailed(error) {
//     console.log(`Download failed: ${error}`);
//   }
//
//   var downloadUrl = "https://example.org/image.png";
//
//   var downloading = browser.downloads.download({
//     url : downloadUrl,
//     filename : 'my-image-again.png',
//     conflictAction : 'uniquify'
//   });
//
//   downloading.then(onStartedDownload, onFailed);
// }

/*
  - https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
  - https://github.com/eligrey/FileSaver.js
*/
function downloadText(filename, text) {
  var element = document.createElement('a');
  const uri = encodeURIComponent(text);
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + uri);
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export {downloadText}
