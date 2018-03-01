// Fires when copy event is detected
document.addEventListener("copy", (event) => {
    console.log("Copy event detected");
    chrome.runtime.sendMessage({event: "copy"}, msg => console.log(msg))
})