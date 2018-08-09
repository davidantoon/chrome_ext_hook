function hookChrome(e) {
    let b = e.c || e.browser || e.chrome;
    let getBrowserData = () => {
        return {
            extensionId: "hnknpfffkkmdmemnigjmiohohadmcdoh",
            url: window.location.href,
        }
    };
    b.extension.sendMessage = function (content, callback) {
        let request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    callback && callback(JSON.parse(request.responseText).data);
                } else {
                    callback && callback()
                }
            }
        };
        request.open("POST", "http://localhost:8888/wrapped_extention", true);
        request.send(JSON.stringify({data: content, browser: getBrowserData()}));
    }
}

hookChrome(window);

const browser = window.c || window.browser || window.chrome;

function createEventListener(a, b, d, e) {
    deleteEventListener(a, b, d, e);
    "undefined" != typeof window && "undefined" === typeof window.addEventListener ? "keypress" == b ? document.attachEvent("on" + b, d) : a.attachEvent("on" + b, d) : a.addEventListener(b, d, e)
}

function deleteEventListener(a, b, d, e) {
    "undefined" != typeof window && "undefined" === typeof window.addEventListener ? "keypress" == b ? document.detachEvent("on" + b, d) : a.detachEvent("on" + b, d) : a.removeEventListener(b, d, e)
}

createEventListener(window, "DOMContentLoaded", function () {
    let btn = document.createElement("BUTTON");
    let t = document.createTextNode("CLICK ME");
    btn.appendChild(t);
    btn.onclick = () => {
        testNotification()
    };
    btn.style.position = "fixed";
    btn.style.top = "0px";
    btn.style.left = "0px";
    btn.style.zIndex = 100000000;
    document.body.appendChild(btn);
}, !1);

function testNotification() {
    console.log("testNotification");
    browser.extension.sendMessage({command: "test_notification"})
}