// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, (tabs) => {
    var tab = tabs[0];

    var url = tab.url;

    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}

// chrome.runtime.onMessage.addListener(addClipboard);

function addClipboard() {
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
  // document.getElementById("clipboard1").value = clipboardContents;
}

function saveClipboard(clipboardContents) {
  chrome.storage.sync.set({ 'clipboard': clipboardContents }, () => {
    console.log("Clipboard contents saved");
    message('Clipboard saved');
  });
}
