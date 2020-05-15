import init, { ImageResult } from './paa.js';

async function run() {
    let app = await init();

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.contentScriptQuery == "fetch_blob") {
            fetch(request.src)
                .then(response => response.blob())
                .then(blob => blob.arrayBuffer())
                .then(ab => {
                    let b = new Uint8Array(ab);
                    let result = new ImageResult(b);
                    let arr = new Uint8Array(app.memory.buffer, result.data_ptr(), result.data_len());
                    let blob = new Blob([arr], {type: 'image/png'});
                    let reader = new FileReader();
                    reader.readAsDataURL(blob);
                    reader.onload = function() {
                        sendResponse(reader.result);
                    };
                })
            return true;
        }
    });
}
run();
