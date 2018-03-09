chrome.storage.sync.get("pasteBoxValue", (items) => {
	if (items.pasteBoxValue != undefined) {
		document.getElementById("pasteBox").value = items.pasteBoxValue;
	}
});

document.getElementById('pasteSyncButton').addEventListener('click', () => {
	var pasteBoxValue = document.getElementById("pasteBox").value
	chrome.storage.sync.set({ "pasteBoxValue": pasteBoxValue }, () => {
		console.log("Paste Box changes saved");
	});
});

document.getElementById('pasteClearButton').addEventListener('click', () => {
	var pasteBoxValue = "";
	document.getElementById("pasteBox").value = pasteBoxValue;
	chrome.storage.sync.set({ "pasteBoxValue": pasteBoxValue }, () => {
		console.log("Paste Box changes saved");
	});
});

document.getElementById('pasteCopyButton').addEventListener('click', () => {
	document.getElementById("pasteBox").select();
	document.execCommand("Copy");
});

chrome.storage.sync.get("clipboards", (items) => {
	if (items.clipboards != undefined) {
		var elementClipboards = document.getElementsByClassName("clipboards");
		for (let i = 0; i < items.clipboards.length; i++) {
			elementClipboards[i].value = items.clipboards[i];
		}
	}
});

chrome.runtime.onMessage.addListener(() => {
	chrome.storage.sync.get("clipboards", (items) => {
		var elementClipboards = document.getElementsByClassName("clipboards");
		for (let i = 0; i < items.clipboards.length; i++) {
			elementClipboards[i].value = items.clipboards[i];
		}
	});
});

var inputFieldCopyButtons = document.getElementById("clipboards-area").getElementsByClassName("clipboard-copy-buttons");
var inputFields = document.getElementById("clipboards-area").getElementsByClassName("clipboards");

for (let i = 0; i < inputFields.length; i++) {
	inputFieldCopyButtons[i].addEventListener('click', () => {
		inputFields[i].select();
		document.execCommand("Copy");
	});
}
