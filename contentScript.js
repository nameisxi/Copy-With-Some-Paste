document.addEventListener("copy", (event) => {
    var clipboardContents = window.getSelection().toString();
    chrome.runtime.sendMessage({
        event: "copy",
        "contents": clipboardContents
    });
})