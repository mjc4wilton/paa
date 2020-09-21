function pathChanged() {
    if (!window.location.pathname.endsWith(".paa")) return;
    let interval = setInterval(function() {
        try {
            let wrapper = document.getElementsByClassName("blob-viewer")[0].firstChild.nextSibling.firstChild.nextSibling;
            wrapper.textContent = "Converting PAA...";
            clearInterval(interval);
            let image = document.createElement("img");
            chrome.runtime.sendMessage({contentScriptQuery: "fetch_blob", src: "https://github.com" + window.location.pathname + "?raw=true"}, response => {
                image.src = response;
                wrapper.replaceWith(image);
            });
        } catch {}
    }, 10);
}

pathChanged();
let path = window.location.pathname;
setInterval(function() {
    if (path != window.location.pathname) {
        pathChanged();
        path = window.location.pathname;
    }
}, 10);
