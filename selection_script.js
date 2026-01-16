(function () {
    'use strict';

    /**
     * Selection script for Pablo's DW Chad Svelte 5 extension.
     * Handles text selection and context menu interactions.
     */
    // Global state
    let selectionScriptInitialized = false;
    /**
     * Initializes the selection script.
     */
    function initializeSelectionScript() {
        if (selectionScriptInitialized)
            return;
        try {
            console.log('Pablo\'s DW Chad: Selection script initializing...');
            // Set up selection event listeners
            setupSelectionListeners();
            selectionScriptInitialized = true;
            console.log('Pablo\'s DW Chad: Selection script initialized successfully');
        }
        catch (error) {
            console.error('Pablo\'s DW Chad: Selection script initialization failed:', error);
        }
    }
    /**
     * Sets up event listeners for text selection.
     */
    function setupSelectionListeners() {
        // Listen for text selection changes
        document.addEventListener('selectionchange', handleSelectionChange);
        // Listen for mouse up events (end of selection)
        document.addEventListener('mouseup', handleMouseUp);
        // Listen for keyboard events (for keyboard-based selection)
        document.addEventListener('keyup', handleKeyUp);
    }
    /**
     * Handles selection change events.
     */
    function handleSelectionChange() {
        try {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0)
                return;
            const selectedText = selection.toString().trim();
            if (selectedText.length === 0)
                return;
            // Store selected text for potential use by other components
            if (chrome?.storage?.local) {
                chrome.storage.local.set({
                    'pdwc_selected_text': {
                        text: selectedText,
                        timestamp: Date.now(),
                        url: window.location.href
                    }
                });
            }
        }
        catch (error) {
            console.error('Pablo\'s DW Chad: Error handling selection change:', error);
        }
    }
    /**
     * Handles mouse up events.
     */
    function handleMouseUp(event) {
        try {
            // Small delay to ensure selection is finalized
            setTimeout(() => {
                const selection = window.getSelection();
                if (!selection || selection.rangeCount === 0)
                    return;
                const selectedText = selection.toString().trim();
                if (selectedText.length > 0) {
                    // Notify background script about selection
                    chrome.runtime.sendMessage({
                        type: 'TEXT_SELECTED',
                        data: {
                            text: selectedText,
                            position: { x: event.clientX, y: event.clientY },
                            timestamp: Date.now()
                        }
                    }).catch(() => {
                        // Ignore errors if background script is not ready
                    });
                }
            }, 10);
        }
        catch (error) {
            console.error('Pablo\'s DW Chad: Error handling mouse up:', error);
        }
    }
    /**
     * Handles keyboard up events.
     */
    function handleKeyUp(event) {
        try {
            // Only process if it's a selection-related key
            const selectionKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'];
            if (!event.shiftKey || !selectionKeys.includes(event.key))
                return;
            // Small delay to ensure selection is finalized
            setTimeout(() => {
                const selection = window.getSelection();
                if (!selection || selection.rangeCount === 0)
                    return;
                const selectedText = selection.toString().trim();
                if (selectedText.length > 0) {
                    // Store selected text
                    if (chrome?.storage?.local) {
                        chrome.storage.local.set({
                            'pdwc_selected_text': {
                                text: selectedText,
                                timestamp: Date.now(),
                                url: window.location.href,
                                method: 'keyboard'
                            }
                        });
                    }
                }
            }, 10);
        }
        catch (error) {
            console.error('Pablo\'s DW Chad: Error handling key up:', error);
        }
    }
    /**
     * Checks if the current page should have selection functionality.
     */
    function shouldInitialize() {
        // Only initialize on pages that might benefit from selection features
        const url = window.location.href;
        const hostname = window.location.hostname;
        return (url.includes('/datawalk/') ||
            hostname.includes('datawalk') ||
            hostname === 'localhost' ||
            document.querySelector('[data-app="datawalk"]') !== null);
    }
    /**
     * Main initialization.
     */
    function selectionScriptMain() {
        try {
            console.log('Pablo\'s DW Chad: Selection script loaded');
            if (!shouldInitialize()) {
                console.log('Pablo\'s DW Chad: Selection script not needed for this page');
                return;
            }
            // Initialize when DOM is ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeSelectionScript);
            }
            else {
                initializeSelectionScript();
            }
            // Listen for messages from other parts of the extension
            chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
                try {
                    switch (message.type) {
                        case 'GET_SELECTION':
                            const selection = window.getSelection();
                            const selectedText = selection ? selection.toString().trim() : '';
                            sendResponse({
                                success: true,
                                text: selectedText,
                                hasSelection: selectedText.length > 0
                            });
                            break;
                        case 'CLEAR_SELECTION':
                            if (window.getSelection) {
                                window.getSelection()?.removeAllRanges();
                            }
                            sendResponse({ success: true });
                            break;
                        default:
                            sendResponse({ error: 'Unknown message type' });
                    }
                }
                catch (error) {
                    console.error('Pablo\'s DW Chad: Error handling selection script message:', error);
                    sendResponse({ error: error.message });
                }
            });
        }
        catch (error) {
            console.error('Pablo\'s DW Chad: Error in selection script main:', error);
        }
    }
    // Handle extension context invalidation
    if (chrome.runtime?.id) {
        selectionScriptMain();
    }
    else {
        console.log('Pablo\'s DW Chad: Extension context invalidated, skipping selection script initialization');
    }

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uX3NjcmlwdC5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbnRlbnRfc2NyaXB0cy9zZWxlY3Rpb25fc2NyaXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBTZWxlY3Rpb24gc2NyaXB0IGZvciBQYWJsbydzIERXIENoYWQgU3ZlbHRlIDUgZXh0ZW5zaW9uLlxyXG4gKiBIYW5kbGVzIHRleHQgc2VsZWN0aW9uIGFuZCBjb250ZXh0IG1lbnUgaW50ZXJhY3Rpb25zLlxyXG4gKi9cclxuXHJcbi8vIEdsb2JhbCBzdGF0ZVxyXG5sZXQgc2VsZWN0aW9uU2NyaXB0SW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplcyB0aGUgc2VsZWN0aW9uIHNjcmlwdC5cclxuICovXHJcbmZ1bmN0aW9uIGluaXRpYWxpemVTZWxlY3Rpb25TY3JpcHQoKTogdm9pZCB7XHJcbiAgaWYgKHNlbGVjdGlvblNjcmlwdEluaXRpYWxpemVkKSByZXR1cm47XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zb2xlLmxvZygnUGFibG9cXCdzIERXIENoYWQ6IFNlbGVjdGlvbiBzY3JpcHQgaW5pdGlhbGl6aW5nLi4uJyk7XHJcblxyXG4gICAgLy8gU2V0IHVwIHNlbGVjdGlvbiBldmVudCBsaXN0ZW5lcnNcclxuICAgIHNldHVwU2VsZWN0aW9uTGlzdGVuZXJzKCk7XHJcblxyXG4gICAgc2VsZWN0aW9uU2NyaXB0SW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgY29uc29sZS5sb2coJ1BhYmxvXFwncyBEVyBDaGFkOiBTZWxlY3Rpb24gc2NyaXB0IGluaXRpYWxpemVkIHN1Y2Nlc3NmdWxseScpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKCdQYWJsb1xcJ3MgRFcgQ2hhZDogU2VsZWN0aW9uIHNjcmlwdCBpbml0aWFsaXphdGlvbiBmYWlsZWQ6JywgZXJyb3IpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdXAgZXZlbnQgbGlzdGVuZXJzIGZvciB0ZXh0IHNlbGVjdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIHNldHVwU2VsZWN0aW9uTGlzdGVuZXJzKCk6IHZvaWQge1xyXG4gIC8vIExpc3RlbiBmb3IgdGV4dCBzZWxlY3Rpb24gY2hhbmdlc1xyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbGVjdGlvbmNoYW5nZScsIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSk7XHJcbiAgXHJcbiAgLy8gTGlzdGVuIGZvciBtb3VzZSB1cCBldmVudHMgKGVuZCBvZiBzZWxlY3Rpb24pXHJcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXApO1xyXG4gIFxyXG4gIC8vIExpc3RlbiBmb3Iga2V5Ym9hcmQgZXZlbnRzIChmb3Iga2V5Ym9hcmQtYmFzZWQgc2VsZWN0aW9uKVxyXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgaGFuZGxlS2V5VXApO1xyXG59XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBzZWxlY3Rpb24gY2hhbmdlIGV2ZW50cy5cclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZVNlbGVjdGlvbkNoYW5nZSgpOiB2b2lkIHtcclxuICB0cnkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgaWYgKCFzZWxlY3Rpb24gfHwgc2VsZWN0aW9uLnJhbmdlQ291bnQgPT09IDApIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICBpZiAoc2VsZWN0ZWRUZXh0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFN0b3JlIHNlbGVjdGVkIHRleHQgZm9yIHBvdGVudGlhbCB1c2UgYnkgb3RoZXIgY29tcG9uZW50c1xyXG4gICAgaWYgKGNocm9tZT8uc3RvcmFnZT8ubG9jYWwpIHtcclxuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHtcclxuICAgICAgICAncGR3Y19zZWxlY3RlZF90ZXh0Jzoge1xyXG4gICAgICAgICAgdGV4dDogc2VsZWN0ZWRUZXh0LFxyXG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxyXG4gICAgICAgICAgdXJsOiB3aW5kb3cubG9jYXRpb24uaHJlZlxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1BhYmxvXFwncyBEVyBDaGFkOiBFcnJvciBoYW5kbGluZyBzZWxlY3Rpb24gY2hhbmdlOicsIGVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIYW5kbGVzIG1vdXNlIHVwIGV2ZW50cy5cclxuICovXHJcbmZ1bmN0aW9uIGhhbmRsZU1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICB0cnkge1xyXG4gICAgLy8gU21hbGwgZGVsYXkgdG8gZW5zdXJlIHNlbGVjdGlvbiBpcyBmaW5hbGl6ZWRcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgIGlmICghc2VsZWN0aW9uIHx8IHNlbGVjdGlvbi5yYW5nZUNvdW50ID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKS50cmltKCk7XHJcbiAgICAgIGlmIChzZWxlY3RlZFRleHQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIC8vIE5vdGlmeSBiYWNrZ3JvdW5kIHNjcmlwdCBhYm91dCBzZWxlY3Rpb25cclxuICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7XHJcbiAgICAgICAgICB0eXBlOiAnVEVYVF9TRUxFQ1RFRCcsXHJcbiAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgIHRleHQ6IHNlbGVjdGVkVGV4dCxcclxuICAgICAgICAgICAgcG9zaXRpb246IHsgeDogZXZlbnQuY2xpZW50WCwgeTogZXZlbnQuY2xpZW50WSB9LFxyXG4gICAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAvLyBJZ25vcmUgZXJyb3JzIGlmIGJhY2tncm91bmQgc2NyaXB0IGlzIG5vdCByZWFkeVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9LCAxMCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1BhYmxvXFwncyBEVyBDaGFkOiBFcnJvciBoYW5kbGluZyBtb3VzZSB1cDonLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogSGFuZGxlcyBrZXlib2FyZCB1cCBldmVudHMuXHJcbiAqL1xyXG5mdW5jdGlvbiBoYW5kbGVLZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gIHRyeSB7XHJcbiAgICAvLyBPbmx5IHByb2Nlc3MgaWYgaXQncyBhIHNlbGVjdGlvbi1yZWxhdGVkIGtleVxyXG4gICAgY29uc3Qgc2VsZWN0aW9uS2V5cyA9IFsnQXJyb3dMZWZ0JywgJ0Fycm93UmlnaHQnLCAnQXJyb3dVcCcsICdBcnJvd0Rvd24nLCAnSG9tZScsICdFbmQnXTtcclxuICAgIGlmICghZXZlbnQuc2hpZnRLZXkgfHwgIXNlbGVjdGlvbktleXMuaW5jbHVkZXMoZXZlbnQua2V5KSkgcmV0dXJuO1xyXG5cclxuICAgIC8vIFNtYWxsIGRlbGF5IHRvIGVuc3VyZSBzZWxlY3Rpb24gaXMgZmluYWxpemVkXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICBpZiAoIXNlbGVjdGlvbiB8fCBzZWxlY3Rpb24ucmFuZ2VDb3VudCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgY29uc3Qgc2VsZWN0ZWRUZXh0ID0gc2VsZWN0aW9uLnRvU3RyaW5nKCkudHJpbSgpO1xyXG4gICAgICBpZiAoc2VsZWN0ZWRUZXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAvLyBTdG9yZSBzZWxlY3RlZCB0ZXh0XHJcbiAgICAgICAgaWYgKGNocm9tZT8uc3RvcmFnZT8ubG9jYWwpIHtcclxuICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7XHJcbiAgICAgICAgICAgICdwZHdjX3NlbGVjdGVkX3RleHQnOiB7XHJcbiAgICAgICAgICAgICAgdGV4dDogc2VsZWN0ZWRUZXh0LFxyXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcclxuICAgICAgICAgICAgICB1cmw6IHdpbmRvdy5sb2NhdGlvbi5ocmVmLFxyXG4gICAgICAgICAgICAgIG1ldGhvZDogJ2tleWJvYXJkJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sIDEwKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcignUGFibG9cXCdzIERXIENoYWQ6IEVycm9yIGhhbmRsaW5nIGtleSB1cDonLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IHBhZ2Ugc2hvdWxkIGhhdmUgc2VsZWN0aW9uIGZ1bmN0aW9uYWxpdHkuXHJcbiAqL1xyXG5mdW5jdGlvbiBzaG91bGRJbml0aWFsaXplKCk6IGJvb2xlYW4ge1xyXG4gIC8vIE9ubHkgaW5pdGlhbGl6ZSBvbiBwYWdlcyB0aGF0IG1pZ2h0IGJlbmVmaXQgZnJvbSBzZWxlY3Rpb24gZmVhdHVyZXNcclxuICBjb25zdCB1cmwgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcclxuICBcclxuICByZXR1cm4gKFxyXG4gICAgdXJsLmluY2x1ZGVzKCcvZGF0YXdhbGsvJykgfHxcclxuICAgIGhvc3RuYW1lLmluY2x1ZGVzKCdkYXRhd2FsaycpIHx8XHJcbiAgICBob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcgfHxcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWFwcD1cImRhdGF3YWxrXCJdJykgIT09IG51bGxcclxuICApO1xyXG59XHJcblxyXG4vKipcclxuICogTWFpbiBpbml0aWFsaXphdGlvbi5cclxuICovXHJcbmZ1bmN0aW9uIHNlbGVjdGlvblNjcmlwdE1haW4oKTogdm9pZCB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnNvbGUubG9nKCdQYWJsb1xcJ3MgRFcgQ2hhZDogU2VsZWN0aW9uIHNjcmlwdCBsb2FkZWQnKTtcclxuXHJcbiAgICBpZiAoIXNob3VsZEluaXRpYWxpemUoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZygnUGFibG9cXCdzIERXIENoYWQ6IFNlbGVjdGlvbiBzY3JpcHQgbm90IG5lZWRlZCBmb3IgdGhpcyBwYWdlJyk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJbml0aWFsaXplIHdoZW4gRE9NIGlzIHJlYWR5XHJcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XHJcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbml0aWFsaXplU2VsZWN0aW9uU2NyaXB0KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGluaXRpYWxpemVTZWxlY3Rpb25TY3JpcHQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMaXN0ZW4gZm9yIG1lc3NhZ2VzIGZyb20gb3RoZXIgcGFydHMgb2YgdGhlIGV4dGVuc2lvblxyXG4gICAgY2hyb21lLnJ1bnRpbWUub25NZXNzYWdlLmFkZExpc3RlbmVyKChtZXNzYWdlLCBzZW5kZXIsIHNlbmRSZXNwb25zZSkgPT4ge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHN3aXRjaCAobWVzc2FnZS50eXBlKSB7XHJcbiAgICAgICAgICBjYXNlICdHRVRfU0VMRUNUSU9OJzpcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24gPyBzZWxlY3Rpb24udG9TdHJpbmcoKS50cmltKCkgOiAnJztcclxuICAgICAgICAgICAgc2VuZFJlc3BvbnNlKHtcclxuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxyXG4gICAgICAgICAgICAgIHRleHQ6IHNlbGVjdGVkVGV4dCxcclxuICAgICAgICAgICAgICBoYXNTZWxlY3Rpb246IHNlbGVjdGVkVGV4dC5sZW5ndGggPiAwXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ0NMRUFSX1NFTEVDVElPTic6XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgd2luZG93LmdldFNlbGVjdGlvbigpPy5yZW1vdmVBbGxSYW5nZXMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZW5kUmVzcG9uc2UoeyBzdWNjZXNzOiB0cnVlIH0pO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHNlbmRSZXNwb25zZSh7IGVycm9yOiAnVW5rbm93biBtZXNzYWdlIHR5cGUnIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKCdQYWJsb1xcJ3MgRFcgQ2hhZDogRXJyb3IgaGFuZGxpbmcgc2VsZWN0aW9uIHNjcmlwdCBtZXNzYWdlOicsIGVycm9yKTtcclxuICAgICAgICBzZW5kUmVzcG9uc2UoeyBlcnJvcjogKGVycm9yIGFzIEVycm9yKS5tZXNzYWdlIH0pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoJ1BhYmxvXFwncyBEVyBDaGFkOiBFcnJvciBpbiBzZWxlY3Rpb24gc2NyaXB0IG1haW46JywgZXJyb3IpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gSGFuZGxlIGV4dGVuc2lvbiBjb250ZXh0IGludmFsaWRhdGlvblxyXG5pZiAoY2hyb21lLnJ1bnRpbWU/LmlkKSB7XHJcbiAgc2VsZWN0aW9uU2NyaXB0TWFpbigpO1xyXG59IGVsc2Uge1xyXG4gIGNvbnNvbGUubG9nKCdQYWJsb1xcJ3MgRFcgQ2hhZDogRXh0ZW5zaW9uIGNvbnRleHQgaW52YWxpZGF0ZWQsIHNraXBwaW5nIHNlbGVjdGlvbiBzY3JpcHQgaW5pdGlhbGl6YXRpb24nKTtcclxufVxyXG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0lBQUE7OztJQUdHO0lBRUg7SUFDQSxJQUFJLDBCQUEwQixHQUFHLEtBQUs7SUFFdEM7O0lBRUc7SUFDSCxTQUFTLHlCQUF5QixHQUFBO0lBQ2hDLElBQUEsSUFBSSwwQkFBMEI7WUFBRTtJQUVoQyxJQUFBLElBQUk7SUFDRixRQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0RBQW9ELENBQUM7O0lBR2pFLFFBQUEsdUJBQXVCLEVBQUU7WUFFekIsMEJBQTBCLEdBQUcsSUFBSTtJQUNqQyxRQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkRBQTZELENBQUM7UUFDNUU7UUFBRSxPQUFPLEtBQUssRUFBRTtJQUNkLFFBQUEsT0FBTyxDQUFDLEtBQUssQ0FBQywyREFBMkQsRUFBRSxLQUFLLENBQUM7UUFDbkY7SUFDRjtJQUVBOztJQUVHO0lBQ0gsU0FBUyx1QkFBdUIsR0FBQTs7SUFFOUIsSUFBQSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLEVB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
