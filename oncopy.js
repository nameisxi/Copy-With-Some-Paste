chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.runtime.sendMessage({ event: "copy" }, () => {
        var clipboardContents = JSON.parse(JSON.stringify(request.contents));
        addClipboard(clipboardContents);
    });
    sendResponse("Message has been processed by background page");
});

function addClipboard(clipboard) {
    chrome.storage.sync.get("clipboards", (items) => {
        var clipboards = items.clipboards;
        if (clipboards == null || clipboards == undefined || clipboards.length === 0) {
            clipboards = [];
            clipboards.push(clipboard);
        } else {
            clipboards.unshift(clipboard);
            if (clipboards.length > 5) {
                clipboards.pop();
            }
        }
        chrome.storage.sync.set({ 'clipboards': clipboards });
    });
}
