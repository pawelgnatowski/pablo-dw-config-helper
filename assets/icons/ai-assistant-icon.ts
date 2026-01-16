/**
 * AI Assistant icon SVG for use in Svelte components.
 * Exported as a string for easy integration with {@html} directive.
 */

export const aiAssistantIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px">
  <defs>
    <linearGradient id="aiGeminiGradient" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#a855f7"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>
  <path d="M12 2C8 6 8 8 2 12C8 16 8 18 12 22C16 18 16 16 22 12C16 8 16 6 12 2Z" fill="url(#aiGeminiGradient)"/>
</svg>`;

export const searchIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
</svg>`;

export const contextIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
  <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" fill="currentColor"/>
  <path d="M6 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" fill="currentColor"/>
  <path d="M18 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" fill="currentColor"/>
  <path d="M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" fill="currentColor"/>
  <path d="M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" fill="currentColor"/>
  <path d="M10.5 10.5L7.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M13.5 10.5L16.5 7.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M10.5 13.5L7.5 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <path d="M13.5 13.5L16.5 16.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

export const sqlIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
  <path d="M4 5c0-1.66 3.58-3 8-3s8 1.34 8 3v2.5c0 1.66-3.58 3-8 3s-8-1.34-8-3V5z"/>
  <path d="M4 10c0 1.66 3.58 3 8 3s8-1.34 8-3v2.5c0 1.66-3.58 3-8 3s-8-1.34-8-3V10z"/>
  <path d="M4 15c0 1.66 3.58 3 8 3s8-1.34 8-3v4c0 1.66-3.58 3-8 3s-8-1.34-8-3v-4z"/>
  <path d="M15 11h1.5v4.5h2.5v1.5H15V11z M20 11h1.5v4.5h2.5v1.5H20V11z" fill="currentColor" transform="scale(0.4) translate(30, 15)"/>
  <text x="13" y="19" font-family="Arial" font-weight="bold" font-size="8" fill="currentColor">SQL</text>
</svg>`;

export const truncateIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
</svg>`;

export const deployedAppsIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
  <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
</svg>`;

export const quickLinksIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
  <path d="M10.59 13.41a1 1 0 010-1.41l2.12-2.12a1 1 0 011.41 1.41l-2.12 2.12a1 1 0 01-1.41 0zm-2.83-.58a3 3 0 004.24 4.24l2.12-2.12a3 3 0 000-4.24 1 1 0 011.41-1.41 5 5 0 010 7.07l-2.12 2.12a5 5 0 01-7.07-7.07l1.41-1.41a1 1 0 011.41 1.41zm8.48-6.83l-2.12 2.12a3 3 0 01-4.24 0 1 1 0 10-1.41 1.41 5 5 0 007.07 0l2.12-2.12a5 5 0 00-7.07-7.07L9.17 2.83a1 1 0 001.41 1.41l2.12-2.12a3 3 0 014.24 4.24z"/>
</svg>`;

export const toolsIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="pdwc-main-icon-svg">
  <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
</svg>`;

export const infoIcon = `
<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 24 24" width="20px" fill="currentColor">
  <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
  <circle cx="12" cy="7" r="1.5"/>
  <rect x="11" y="10" width="2" height="7" rx="1"/>
</svg>`;
