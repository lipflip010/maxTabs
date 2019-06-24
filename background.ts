import Tab = browser.tabs.Tab;

const limit = 8;


const onCreated = (): void => {
    browser.tabs.query({currentWindow: true})
        .then((tabs: Tab[]) => {
            if (tabs.length > limit) {
                let lruId = getLeastRecentlyUsedTab(tabs);
                lruId ? browser.tabs.remove(lruId) : console.log("Error: null");
            }
        });
};

browser.tabs.onCreated.addListener(onCreated);

function getLeastRecentlyUsedTab(tabs: Tab[]) {
    var lru = {time: tabs[0].lastAccessed, id: tabs[0].id};
    tabs.forEach((tab: Tab) => {
        if (tab.lastAccessed && lru.time && tab.lastAccessed < lru.time) {
            lru.id = tab.id;
            lru.time = tab.lastAccessed;
        }
    });
    return lru.id;
}