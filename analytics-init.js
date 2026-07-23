/* ============================================================
   CHITRASWAY MEDIA — Vercel Web Analytics Initialization
   ============================================================ */

import { inject } from './analytics.js';

// Initialize Vercel Web Analytics
// Mode is automatically detected based on environment
inject({
  mode: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
    ? 'development' 
    : 'production',
  debug: false
});
