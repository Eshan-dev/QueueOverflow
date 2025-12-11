async function startBookmarkExtension(){
    const bookmarkJS = await import(chrome.runtime.getURL("bookmark.js"));
    bookmarkJS.startObserving();
}
startBookmarkExtension();