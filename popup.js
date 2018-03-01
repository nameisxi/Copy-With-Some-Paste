chrome.storage.sync.get("pasteBoxValue", (items) => {
	document.getElementById("pasteBox").value = items.pasteBoxValue;
});

chrome.storage.sync.get("clipboards", (items) => {
	document.getElementById("clipboard1").value = items.clipboards[0];
	document.getElementById("clipboard2").value = items.clipboards[1];
	document.getElementById("clipboard3").value = items.clipboards[2];
	document.getElementById("clipboard4").value = items.clipboards[3];
	document.getElementById("clipboard5").value = items.clipboards[4];
});

document.getElementById('pasteSyncButton').addEventListener('click', () => {
	var pasteBoxValue = document.getElementById("pasteBox").value
	chrome.storage.sync.set({"pasteBoxValue": pasteBoxValue}, () => {
		console.log("Paste Box changes saved");
	});
});

chrome.runtime.onMessage.addListener(() => {
	chrome.storage.sync.get("clipboards", (items) => {
		if (!chrome.runtime.error) {
			var clipboards = items.clipboards;
			document.getElementById("clipboard1").value = clipboards[0];
			document.getElementById("clipboard2").value = clipboards[1];
			document.getElementById("clipboard3").value = clipboards[2];
			document.getElementById("clipboard4").value = clipboards[3];
			document.getElementById("clipboard5").value = clipboards[4];
		}
	});
});