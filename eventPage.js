var tabName;
var screencapture = {
  content : document.createElement("canvas"),
  data : '',

  init : function() {
    this.initEvents();
  },
 saveScreen : function(tabName) {
    var image = new Image();
    image.onload = function() {
      var canvas = screencapture.content;
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
	  
	  
      //saving the image for download
	  //no asynchronous API calls to be used here
      var link = document.createElement('a');
	  link.download = tabName;
      link.href = screencapture.content.toDataURL();
      link.click();
      screencapture.data = '';
    };
    image.src = screencapture.data; 
  },
initEvents : function() {

chrome.browserAction.onClicked.addListener(
    function(tab) {
		//alert('icon clicked')
		chrome.tabs.query({ active: true, currentWindow: true }, function (activeTab) {
			tabName = tab.title;
			var pngExt = ".png"
			var fNameIn = tabName.concat(pngExt);
			var fNameOut = fNameIn.replace(/\s/g,'');
			tabName = fNameOut;
			});
		chrome.tabs.captureVisibleTab(null, {format : "png"}, function(data) {
			screencapture.data = data;
			screencapture.saveScreen(tabName);
			sendResponse({imgSrc:data});
            });
		
		//0.9: camera flash animation excluded for performance
		//chrome.tabs.executeScript(tab.id, {
		//		code: 'capture.js'
		//});
	});

  }
};
screencapture.init();