chrome.storage.sync.get("pasteBoxValue", (items) => {
	if (items.pasteBoxValue != undefined) {
		document.getElementById("pasteBox").value = items.pasteBoxValue;
	}
});

chrome.storage.sync.get("clipboards", (items) => {
	var elementClipboards = document.getElementsByClassName("clipboards");
	for (let i = 0; i < items.clipboards.length; i++) {
		elementClipboards[i].value = items.clipboards[i];
	}
});

document.getElementById('pasteSyncButton').addEventListener('click', () => {
	var pasteBoxValue = document.getElementById("pasteBox").value
	chrome.storage.sync.set({ "pasteBoxValue": pasteBoxValue }, () => {
		console.log("Paste Box changes saved");
	});
});

chrome.runtime.onMessage.addListener(() => {
	chrome.storage.sync.get("clipboards", (items) => {
		var elementClipboards = document.getElementsByClassName("clipboards");
		for (let i = 0; i < items.clipboards.length; i++) {
			elementClipboards[i].value = items.clipboards[i];
		}
	});
});