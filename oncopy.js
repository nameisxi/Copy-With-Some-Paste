console.log("oncopy.js background scipt is running...");

// When copy event is detected and message of it is received, this starts to run
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.runtime.sendMessage({ event: "copy" }, () => {
        addClipboard(clipboardContents);
    });

    sendResponse("Message has been processed by background page");
});

function addClipboard(clipboard) {
    var clipboards = this.getClipboards();
    chrome.storage.sync.set({ 'clipboards': clipboards }, () => {
        document.getElementById("clipboard1").value = clipboards[0];
        message('Clipboard saved');
    });
}

function getClipboards() {
    var clipboards = undefined;

    chrome.storage.sync.get([], (items) => {
        if (!chrome.runtime.error) {
            console.log(Object.values(items));
            clipboards = items;
        }
    });

    return clipboards;
}