
var Loader = function(){
    var self = this;

    self.Listener = {
        create: function(tab){
            showSwitcher(tab);
        },
        update: function(tabId, changeInfo, tab) {
            if(tabId && changeInfo && changeInfo.status && changeInfo.status === "loading") {
                showSwitcher(tab);
            }
        },
        replace: function replaceListener(added) {
            chrome.tabs.get(added, createListener);
        }
    };

    var showSwitcher = function(tab) {
        chrome.pageAction.show(tab.id);
    };
};

var loader = new Loader();
chrome.tabs.onUpdated.addListener(loader.Listener.update);
chrome.tabs.onCreated.addListener(loader.Listener.create);
chrome.tabs.onReplaced.addListener(loader.Listener.replace);