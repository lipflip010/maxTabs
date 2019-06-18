function onCreated() {
    browser.tabs.query({currentWindow: true}, (tabs) => {
        browser.tabs.remove(tabs[0].id);
    });
}

browser.tabs.onCreated.addListener(() => {
    onCreated()
});

