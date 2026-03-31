// background.js

// Create Context Menu
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'scripthuman_open',
    title: '✨ Humanize with ScriptHuman',
    contexts: ['selection', 'all']
  });
});

// Handle Context Menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'scripthuman_open') {
    // Save selection text if present
    if (info.selectionText) {
      chrome.storage.session.set({ selectedText: info.selectionText });
    }
    // Tell content script to open iframe
    chrome.tabs.sendMessage(tab.id, { action: 'toggle_iframe' });
  }
});

// Handle Extension Icon Click
chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { action: 'toggle_iframe' });
});

// Listen for messages from content script & sync script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'SYNC_TIER') {
    chrome.storage.local.set({ userTier: message.tier });
    sendResponse({ success: true });
  }
});
