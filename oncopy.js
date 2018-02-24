console.log("oncopy.js background scipt is running...");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("received: " + request);
    chrome.runtime.sendMessage({ event: "new clipboard" }, function addClipboard() {
        console.log("Clipboard adding in process..")
        bg = chrome.extension.getBackgroundPage();
        bg.document.body.innerHTML = "";

        var helperdiv = bg.document.createElement("div");
        document.body.appendChild(helperdiv);
        helperdiv.contentEditable = true;

        var range = document.createRange();
        range.selectNode(helperdiv);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        helperdiv.focus();

        bg.document.execCommand("Paste");

        var clipboardContents = helperdiv.innerHTML;
        saveClipboard(clipboardContents);
    });

    sendResponse("Message has been processed by background page");
});

function saveClipboard(clipboardContents) {
    chrome.storage.sync.set({ 'clipboard': clipboardContents }, () => {
        console.log("Clipboard contents saved");
        message('Clipboard saved');
      });
}