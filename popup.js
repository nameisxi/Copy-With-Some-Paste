
document.getElementById('pasteBox').addEventListener('change', () => {
	var pasteBoxValue = document.getElementById("pasteBox").value
	chrome.storage.sync.set({"pasteBoxValue": pasteBoxValue}, () => {
		console.log("Paste Box changes saved");
	});
});

chrome.runtime.onMessage.addListener(() => {
	chrome.storage.sync.get("clipboards", (items) => {
		if (!chrome.runtime.error) {
			var clipboards = items;
			document.getElementById("clipboard1").value = clipboards[0];
		}
	});
});