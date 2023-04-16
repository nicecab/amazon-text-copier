function getXPathText(xpath) {
  const iterator = document.evaluate(
    xpath,
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  );
  const node = iterator.iterateNext();
  return node ? node.textContent : "";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyText") {
    const xpath = `//div[@id="rpi-attribute-book_details-isbn13"]/div[3]/span`;
    const text = getXPathText(xpath);
    copyToTheClipboard(text);
    sendResponse({ text });
  }
});

async function copyToTheClipboard(textToCopy) {
  const el = document.createElement("textarea");
  el.value = textToCopy;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
