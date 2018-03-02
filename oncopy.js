console.log("oncopy.js background scipt is running...");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.runtime.sendMessage({ event: "copy" }, () => {
        var clipboardContents = JSON.stringify(request.contents);
        addClipboard(clipboardContents);
    });
    sendResponse("Message has been processed by background page");
});

function addClipboard(clipboard) {
    var clipboards = this.getClipboards();

    if (clipboards == undefined || clipboards.length === 0) {
        clipboards = [];
        clipboards.push(clipboard);
    } else {
        clipboards.unshift(clipboard);
        if (clipboards.length > 5) {
            clipboards.pop();
        }
    }

    chrome.storage.sync.set({ 'clipboards': clipboards }, () => {
        console.log('Clipboard saved');
    });
}

function getClipboards() {
    var fetchedClipboards;
    chrome.storage.sync.get("clipboards", (items) => {
        fetchedClipboards = items.clipboards;
    });

    return fetchedClipboards;
}