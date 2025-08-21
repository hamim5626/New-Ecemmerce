class TranslationCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 1000; // Maximum number of cached translations
    this.storageKey = 'translation_cache';
    this.isClient = false;
    
    // Only load from storage on the client side
    if (typeof window !== 'undefined') {
      this.isClient = true;
      this.loadFromStorage();
    }
  }

  // Generate cache key
  generateKey(text, targetLang) {
    return `${text.toLowerCase().trim()}_${targetLang}`;
  }

  // Get cached translation
  get(text, targetLang) {
    const key = this.generateKey(text, targetLang);
    const cached = this.cache.get(key);
    
    if (cached && this.isValid(cached)) {
      return cached.translation;
    }
    
    // Remove expired entry
    if (cached) {
      this.cache.delete(key);
    }
    
    return null;
  }

  // Set cached translation
  set(text, targetLang, translation) {
    const key = this.generateKey(text, targetLang);
    
    // Check cache size limit
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }
    
    const entry = {
      translation,
      timestamp: Date.now(),
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };
    
    this.cache.set(key, entry);
    
    // Only save to storage on client side
    if (this.isClient) {
      this.saveToStorage();
    }
  }

  // Check if cached entry is still valid
  isValid(entry) {
    return Date.now() < entry.expiresAt;
  }

  // Evict oldest entries when cache is full
  evictOldest() {
    const entries = Array.from(this.cache.entries());
    entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
    
    // Remove oldest 20% of entries
    const toRemove = Math.ceil(this.maxSize * 0.2);
    for (let i = 0; i < toRemove; i++) {
      this.cache.delete(entries[i][0]);
    }
  }

  // Clear all cached translations
  clear() {
    this.cache.clear();
    if (this.isClient) {
      this.saveToStorage();
    }
  }

  // Get cache statistics
  getStats() {
    const validEntries = Array.from(this.cache.values()).filter(entry => this.isValid(entry));
    const expiredEntries = this.cache.size - validEntries.length;
    
    return {
      total: this.cache.size,
      valid: validEntries.length,
      expired: expiredEntries.length,
      hitRate: this.hitCount / (this.hitCount + this.missCount) || 0,
    };
  }

  // Load cache from localStorage
  loadFromStorage() {
    if (!this.isClient) return;
    
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.cache = new Map(parsed);
      }
    } catch (error) {
      console.warn('Failed to load translation cache from storage:', error);
    }
  }

  // Save cache to localStorage
  saveToStorage() {
    if (!this.isClient) return;
    
    try {
      const serialized = JSON.stringify(Array.from(this.cache.entries()));
      localStorage.setItem(this.storageKey, serialized);
    } catch (error) {
      console.warn('Failed to save translation cache to storage:', error);
    }
  }

  // Track cache hits and misses
  hitCount = 0;
  missCount = 0;

  recordHit() {
    this.hitCount++;
  }

  recordMiss() {
    this.missCount++;
  }
}

// Create singleton instance
const translationCache = new TranslationCache();

export default translationCache;
