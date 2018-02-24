
document.addEventListener("copy", () => {
    chrome.runtime.sendMessage({event: "copy"}, msg => console.log(msg))
})