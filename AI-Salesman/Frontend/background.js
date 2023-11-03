chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
    if (message.action === "openPopup") {
    alert("hello");
      chrome.action.openPopup();
    }
  });
  