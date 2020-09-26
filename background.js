// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.');
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: 'ebrowarium.pl' },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

window.addEventListener('message', event => {
  console.log({ event });
});
chrome.runtime.onMessage.addListener(event => {
  console.log({ event });
});

const ports = {};

chrome.runtime.onConnect.addListener(function (port) {
  if (!ports[port.name]) {
    ports[port.name] = port;

    console.log(`port ${port.name} is connected`)
  }
  
  if(port && port.name === 'beer-popup') {
    console.log('beer-popup');
  }
  
  port.onMessage.addListener(function (message) {
    if (message === 'GIVE_ME_BEERS_COUNT') {
      // console.log(message)
      ports.content.postMessage(message)
      // ports.popup.postMessage(message)
    } else {
      console.log(message)
    }
  });

  // console.log(ports)
});
