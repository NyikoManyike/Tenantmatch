/**
 * TenantMatch - Security & Utilities Module
 * Security functions, input sanitization, and common utilities
 */

const Security = {
  // XSS Prevention - sanitize user input
  sanitize(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  // Escape HTML for display
  escapeHtml(str) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(str).replace(/[&<>"']/g, m => map[m]);
  },

  // Validate email format
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Validate phone (South African format)
  isValidPhone(phone) {
    return /^(\+27|0)[6-8][0-9]{8}$/.test(phone.replace(/\s/g, ''));
  },

  // Generate CSRF token
  generateToken() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  },

  // Rate limiting helper
  rateLimit(key, maxAttempts = 5, windowMs = 60000) {
    const attempts = JSON.parse(localStorage.getItem('rate_limit_' + key) || '[]');
    const now = Date.now();
    const recent = attempts.filter(t => now - t < windowMs);
    
    if (recent.length >= maxAttempts) {
      return false;
    }
    
    recent.push(now);
    localStorage.setItem('rate_limit_' + key, JSON.stringify(recent));
    return true;
  },

  // Clear rate limit
  clearRateLimit(key) {
    localStorage.removeItem('rate_limit_' + key);
  }
};

const Utils = {
  // Format currency (South African Rand)
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0
    }).format(amount);
  },

  // Format date
  formatDate(date) {
    return new Intl.DateTimeFormat('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  },

  // Format relative time
  timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' min ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    if (seconds < 2592000) return Math.floor(seconds / 86400) + ' days ago';
    if (seconds < 31536000) return Math.floor(seconds / 2592000) + ' months ago';
    return Math.floor(seconds / 31536000) + ' years ago';
  },

  // Truncate text
  truncate(str, length = 50) {
    if (!str || str.length <= length) return str;
    return str.substring(0, length) + '...';
  },

  // Generate initials
  initials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  },

  // Random ID generator
  generateId(prefix = 'id') {
    return prefix + '_' + Math.random().toString(36).substr(2, 9);
  },

  // Debounce function
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Copy to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    }
  },

  // Download as file
  downloadFile(content, filename, type = 'text/plain') {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },

  // Export to CSV
  exportToCSV(data, filename) {
    if (!data.length) return;
    const headers = Object.keys(data[0]);
    const csv = [
      headers.join(','),
      ...data.map(row => headers.map(h => `"${row[h]}"`).join(','))
    ].join('\n');
    Utils.downloadFile(csv, filename + '.csv', 'text/csv');
  },

  // Get URL params
  getParams() {
    return new URLSearchParams(window.location.search);
  },

  // Check if mobile
  isMobile() {
    return window.innerWidth < 768;
  },

  // Check if dark mode
  isDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
};

// Analytics helper (for owner insights)
const Analytics = {
  events: [],
  
  track(event, data = {}) {
    const eventData = {
      event,
      data,
      timestamp: new Date().toISOString(),
      userId: localStorage.getItem('demo_user_id'),
      page: window.location.pathname
    };
    this.events.push(eventData);
    localStorage.setItem('analytics_events', JSON.stringify(this.events));
    
    // In production, send to analytics service
    console.log('Analytics:', eventData);
  },

  getEvents(filter = {}) {
    let events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    
    if (filter.event) {
      events = events.filter(e => e.event === filter.event);
    }
    if (filter.limit) {
      events = events.slice(-filter.limit);
    }
    return events;
  },

  getStats() {
    const events = this.getEvents();
    return {
      totalEvents: events.length,
      uniqueUsers: [...new Set(events.map(e => e.userId))].length,
      lastActivity: events.length ? events[events.length - 1].timestamp : null
    };
  }
};

// Onboarding tour
const Tour = {
  steps: [],
  currentStep: 0,
  
  start(steps) {
    this.steps = steps;
    this.currentStep = 0;
    this.showStep();
    Analytics.track('tour_started');
  },
  
  showStep() {
    if (this.currentStep >= this.steps.length) {
      this.end();
      return;
    }
    
    const step = this.steps[this.currentStep];
    Toast.info(step.message, 5000);
  },
  
  next() {
    this.currentStep++;
    this.showStep();
  },
  
  end() {
    Analytics.track('tour_completed');
    this.steps = [];
    this.currentStep = 0;
  }
};

// Keyboard shortcuts
const Shortcuts = {
  bindings: {},
  
  bind(key, callback) {
    this.bindings[key.toLowerCase()] = callback;
  },
  
  init() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger in forms
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const key = (e.ctrlKey ? 'ctrl+' : '') + (e.shiftKey ? 'shift+' : '') + e.key.toLowerCase();
      if (this.bindings[key]) {
        e.preventDefault();
        this.bindings[key]();
      }
    });
  }
};

// Export to global
window.Security = Security;
window.Utils = Utils;
window.Analytics = Analytics;
window.Tour = Tour;
window.Shortcuts = Shortcuts;
