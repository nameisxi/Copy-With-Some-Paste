console.log("oncopy.js background scipt is running...");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Addlistener working on oncopy.js");
    chrome.runtime.sendMessage({ event: "copy" }, () => {
        console.log("clipboard adding works");
        addClipboard(clipboardContents);
    });
    sendResponse("Message has been processed by background page");
});

function addClipboard(clipboard) {
    console.log("addClipboard method running...")
    var clipboards = this.getClipboards();
    clipboards.unshift(clipboard);

    chrome.storage.sync.set({ 'clipboards': clipboards }, () => {
        message('Clipboard saved');
    });
}

function getClipboards() {
    console.log("getClipboards running...");
    var clipboards = undefined;
    chrome.storage.sync.get("clipboards", (items) => {
        if (!chrome.runtime.error) {
            console.log("Getting clipboards worked");
            clipboards = items.clipboards;
        }
    });

    return clipboards;
}