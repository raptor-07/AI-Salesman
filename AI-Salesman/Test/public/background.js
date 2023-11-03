chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
    alert("hello");
    alert(message,sender,sendResponse)
      chrome.action.openPopup();
    }
  });
  