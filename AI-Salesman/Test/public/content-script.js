//Document ready
window.onload = function() {
    alert('Ready');
    //Send a message
    sendMessage();
}

//Get message from background page
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //Alert the message
    alert("The message from the background page: " + request.greeting);//You have to choose which part of the response you want to display ie. request.greeting
    //Construct & send a response
    sendResponse({
        response: "Message received"
    });
});

//Send message to background page
function sendMessage() {
    //Construct & send message
    chrome.runtime.sendMessage({
        method: "postList",
        post_list: "ThePostList"
    }, function(response) {
        //Alert the message
        alert("The response from the background page: " + response.response);//You have to choose which part of the response you want to display ie. response.response
    });
}