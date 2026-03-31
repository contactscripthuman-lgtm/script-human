// content.js
// Transfer text from extension to web tool if URL param is present
if ((window.location.hostname === 'www.scripthuman.com' || window.location.hostname === 'scripthuman.com' || window.location.hostname === 'localhost') && window.location.search.includes('loadExtension=true')) {
  chrome.storage.local.get(['extensionGrammarText'], function(result) {
    if (result.extensionGrammarText) {
      // Set to local storage so React can read it on load
      window.localStorage.setItem('writingRoomInitialContent', result.extensionGrammarText);
      // Clean up storage
      chrome.storage.local.remove('extensionGrammarText');
    }
  });
}

let floatingBtn = null;
let iframe = null;

function toggleIframe() {
  if (iframe) {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  } else {
    iframe = document.createElement('iframe');
    iframe.id = 'scripthuman-iframe';
    iframe.src = chrome.runtime.getURL('index.html');
    iframe.style.position = 'fixed';
    iframe.style.top = '0';
    iframe.style.right = '0';
    iframe.style.width = '380px';
    iframe.style.height = '100vh';
    iframe.style.zIndex = '2147483647';
    iframe.style.border = 'none';
    iframe.style.boxShadow = '-4px 0 20px rgba(0,0,0,0.15)';
    iframe.style.display = 'block';
    iframe.style.backgroundColor = 'transparent';
    iframe.style.colorScheme = 'normal';
    
    // Listen for close message from the iframe
    window.addEventListener('message', (event) => {
      if (event.data && event.data.action === 'close_scripthuman_iframe') {
        iframe.style.display = 'none';
      }
    });

    document.body.appendChild(iframe);
  }
}

// Listen for open commands from background
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'toggle_iframe') {
    toggleIframe();
    sendResponse({ success: true });
  }
});

// Listen for mouseup
document.addEventListener('mouseup', function (e) {
  setTimeout(() => {
    let selectedText = window.getSelection().toString().trim();
    // For Google Docs, getSelection doesn't work, we still show the button because
    // user might be using Google Docs. We rely on fallback manual text entry.

    // Remove existing button
    if (floatingBtn) {
      floatingBtn.remove();
      floatingBtn = null;
    }

    if (selectedText.length > 0 || isGoogleDocs()) {
      showFloatingButton(e.pageX, e.pageY, selectedText);
    }
  }, 10);
});

// Remove button when clicking outside
document.addEventListener('mousedown', function (e) {
  if (floatingBtn && !floatingBtn.contains(e.target)) {
    floatingBtn.remove();
    floatingBtn = null;
  }
});

function isGoogleDocs() {
  return window.location.hostname === 'docs.google.com';
}

function showFloatingButton(x, y, text) {
  floatingBtn = document.createElement('div');
  floatingBtn.id = 'scripthuman-floating-btn-container';
  floatingBtn.style.position = 'absolute';
  floatingBtn.style.top = `${y + 15}px`;
  floatingBtn.style.left = `${x}px`;
  floatingBtn.style.zIndex = '999999';
  floatingBtn.style.display = 'flex';
  floatingBtn.style.flexDirection = 'column';
  floatingBtn.style.alignItems = 'center';
  floatingBtn.style.gap = '4px';

  const btn = document.createElement('div');
  btn.id = 'scripthuman-floating-btn';
  btn.innerHTML = '✨ Humanize';
  btn.style.background = '#F97316'; // primary orange
  btn.style.color = '#fff';
  btn.style.padding = '6px 12px';
  btn.style.borderRadius = '6px';
  btn.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
  btn.style.cursor = 'pointer';
  btn.style.fontFamily = 'sans-serif';
  btn.style.fontSize = '14px';
  btn.style.fontWeight = '500';

  btn.addEventListener('click', () => {
    // Save the text to storage so side panel can read it
    if (text) {
      chrome.storage.session.set({ selectedText: text });
    } else {
      chrome.storage.session.remove('selectedText');
    }

    // Open injected iframe sidereal
    if (!iframe || iframe.style.display === 'none') {
        toggleIframe();
    }

    floatingBtn.remove();
    floatingBtn = null;
  });

  const tipText = document.createElement('div');
  tipText.innerHTML = 'Click On Script Human Extention';
  tipText.style.color = '#6b7280';
  tipText.style.fontSize = '11px';
  tipText.style.fontFamily = 'sans-serif';
  tipText.style.fontWeight = '500';
  tipText.style.textShadow = '0 1px 2px rgba(255,255,255,0.8)';
  tipText.style.background = 'rgba(255,255,255,0.9)';
  tipText.style.padding = '2px 6px';
  tipText.style.borderRadius = '4px';
  tipText.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
  
  floatingBtn.appendChild(btn);
  floatingBtn.appendChild(tipText);

  document.body.appendChild(floatingBtn);
}
