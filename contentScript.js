// Fires when copy event is detected
document.addEventListener("copy", (event) => {
    chrome.runtime.sendMessage({event: "copy"}, msg => console.log(msg))
})