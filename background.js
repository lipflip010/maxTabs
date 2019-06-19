"use strict";
var limit = 5;
var onCreated = function () {
    browser.tabs.query({ currentWindow: true })
        .then(function (tabs) {
        if (tabs.length > limit) {
            var lruId = getLeastRecentlyUsedTab(tabs);
            lruId ? browser.tabs.remove(lruId) : console.log("Error: null");
        }
    });
};
browser.tabs.onCreated.addListener(onCreated);
function getLeastRecentlyUsedTab(tabs) {
    var lru = { time: tabs[0].lastAccessed, id: tabs[0].id };
    tabs.forEach(function (tab) {
        if (tab.lastAccessed && lru.time && tab.lastAccessed < lru.time) {
            lru.id = tab.id;
            lru.time = tab.lastAccessed;
        }
    });
    return lru.id;
}
