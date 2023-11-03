//Get message from content script
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      //Alert the message
      alert('The message from the content script: ' + request.method);//You have to choose which part of the response you want to display ie. request.method
      //Construct & send a response
      sendResponse({
          response: "Message received"
      });
  }
);

//Send message to content script
function sendDetails(sendData) {
  //Select tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      //Construct & send message
      chrome.tabs.sendMessage(tabs[0].id, {
          greeting: sendData
      }, function(response) {
          //On response alert the response
          alert("The response from the content script: " + response.response);//You have to choose which part of the response you want to display ie. response.response
      });
  });
}