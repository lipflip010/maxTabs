const limit = 5;


function onCreated() {
    browser.tabs.query({currentWindow: true}, (tabs) => {
        if(tabs.length > limit){
            lruId = getLeastRecentlyUsedTab(tabs);
            lruId ? browser.tabs.remove(lruId): console.log("Error: null");
        }
    });
}

browser.tabs.onCreated.addListener(() => {
    onCreated()
});

function getLeastRecentlyUsedTab(tabs) {
    var lru  = { time: tabs[0].lastAccessed, id: null}

    tabs.forEach((tab) => {
        if(tab.lastAccessed < lru.time){
            lru.id = tab.id;
            lru.time  = tab.lastAccessed;
        }
    });
    return lru.id;
}