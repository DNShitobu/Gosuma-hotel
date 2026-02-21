const SecurityUtils = {
  sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  },

  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  },

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  },

  validatePhone(phone) {
    const re = /^[\d\s\-+()]{7,20}$/;
    return re.test(phone);
  },

  validateDate(dateStr) {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
  },

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  sanitizeObject(obj, fields) {
    const sanitized = { ...obj };
    fields.forEach(field => {
      if (sanitized[field] && typeof sanitized[field] === 'string') {
        sanitized[field] = this.sanitizeInput(sanitized[field]);
      }
    });
    return sanitized;
  },

  isValidUrl(url) {
    try {
      const parsed = new URL(url);
      return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
      return false;
    }
  },

  sanitizeFilename(filename) {
    return filename.replace(/[^a-z0-9.-]/gi, '_');
  },

  generateToken(length = 32) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
  }
};

export default SecurityUtils;
