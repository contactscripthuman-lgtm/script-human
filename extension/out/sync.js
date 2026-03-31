// sync.js
// This script runs on scripthuman.com to sync the user's tier to the extension

function syncTier() {
    try {
        const tier = localStorage.getItem('user_tier');
        if (tier) {
            chrome.runtime.sendMessage({ action: 'SYNC_TIER', tier: tier });
        } else {
            // Also check cookies if localStorage is empty
            const matches = document.cookie.match(/(?:^|; )user_tier=([^;]*)/);
            if (matches) {
                chrome.runtime.sendMessage({ action: 'SYNC_TIER', tier: matches[1] });
            }
        }
    } catch(e) {
        console.error("ScriptHuman Extension: Could not sync tier", e);
    }
}

// Sync on load
syncTier();

// Sync periodically or when localStorage changes
window.addEventListener('storage', (e) => {
    if (e.key === 'user_tier') {
        syncTier();
    }
});
