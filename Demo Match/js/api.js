/**
 * TenantMatch - API Service Layer
 * Switches between Mock Data and Supabase based on configuration
 * 
 * SETTINGS:
 * - USE_MOCK_DATA = true  (default) - uses local mock data for demo
 * - USE_MOCK_DATA = false - uses real Supabase database (requires schema setup)
 */

// ============================================================================
// CONFIGURATION - CHANGE THIS TO SWITCH DATA SOURCES
// ============================================================================
const USE_MOCK_DATA = true; // true = demo mode, false = Supabase

// Supabase config (only used when USE_MOCK_DATA = false)
const SUPABASE_URL = 'https://hpaoixvvpdcwykduumam.supabase.co';
const SUPABASE_KEY = 'your-anon-key-here';

// ============================================================================
// INTERNAL STATE
// ============================================================================

// Initialize Supabase client if not using mock data
let supabase = null;
if (!USE_MOCK_DATA) {
  // Supabase client would be initialized here
  console.log('Supabase mode - requires additional setup');
}

// ============================================================================
// API LAYER
// ============================================================================

const API = {
  // Use mock or real data
  useMockData: USE_MOCK_DATA,
  
  // Initialize Supabase connection
  async init() {
    if (this.useMockData) {
      console.log('Using MOCK DATA mode (demo)');
      return;
    }
    
    // Real Supabase initialization
    try {
      const { data: { session } } = await window.supabase.auth.getSession();
      console.log('Using SUPABASE mode, session:', session ? 'active' : 'none');
    } catch (error) {
      console.error('Supabase init error:', error);
    }
  },

  // ===== PROFILES =====
  profiles: {
    async get(userId) {
      if (API.useMockData) {
        return { data: MockData.api.getUserById(userId) };
      }
      return await window.supabase.from('profiles').select('*').eq('id', userId).single();
    },
    
    async update(userId, data) {
      if (API.useMockData) {
        const user = MockData.users.find(u => u.id === userId);
        if (user) Object.assign(user, data);
        return { data: user };
      }
      return await window.supabase.from('profiles').update(data).eq('id', userId);
    },
    
    async getAll(filters = {}) {
      if (API.useMockData) {
        return { data: MockData.api.getUsers(filters) };
      }
      let query = window.supabase.from('profiles').select('*');
      if (filters.role) query = query.eq('role', filters.role);
      if (filters.status) query = query.eq('status', filters.status);
      return await query;
    }
  },

  // ===== PROPERTIES =====
  properties: {
    async get(filters = {}) {
      if (API.useMockData) {
        return { data: MockData.api.getProperties(filters) };
      }
      let query = window.supabase.from('properties').select('*');
      if (filters.owner_id) query = query.eq('owner_id', filters.owner_id);
      if (filters.city) query = query.ilike('city', `%${filters.city}%`);
      return await query;
    },
    
    async create(data) {
      if (API.useMockData) {
        return { data: MockData.api.createProperty(data) };
      }
      return await window.supabase.from('properties').insert(data).select().single();
    },
    
    async update(id, data) {
      if (API.useMockData) {
        const property = MockData.properties.find(p => p.id === id);
        if (property) Object.assign(property, data);
        return { data: property };
      }
      return await window.supabase.from('properties').update(data).eq('id', id);
    },
    
    async delete(id) {
      if (API.useMockData) {
        const index = MockData.properties.findIndex(p => p.id === id);
        if (index > -1) MockData.properties.splice(index, 1);
        return { success: true };
      }
      return await window.supabase.from('properties').delete().eq('id', id);
    }
  },

  // ===== UNITS =====
  units: {
    async get(filters = {}) {
      if (API.useMockData) {
        return { data: MockData.api.getUnits(filters) };
      }
      let query = window.supabase.from('units').select('*');
      if (filters.property_id) query = query.eq('property_id', filters.property_id);
      if (filters.status) query = query.eq('status', filters.status);
      return await query;
    },
    
    async create(data) {
      if (API.useMockData) {
        return { data: MockData.api.createUnit(data) };
      }
      return await window.supabase.from('units').insert(data).select().single();
    },
    
    async update(id, data) {
      if (API.useMockData) {
        const unit = MockData.units.find(u => u.id === id);
        if (unit) Object.assign(unit, data);
        return { data: unit };
      }
      return await window.supabase.from('units').update(data).eq('id', id);
    }
  },

  // ===== APPLICATIONS =====
  applications: {
    async get(filters = {}) {
      if (API.useMockData) {
        return { data: MockData.api.getApplications(filters) };
      }
      let query = window.supabase.from('applications').select('*');
      if (filters.tenant_id) query = query.eq('tenant_id', filters.tenant_id);
      if (filters.property_id) query = query.eq('property_id', filters.property_id);
      if (filters.status) query = query.eq('status', filters.status);
      return await query;
    },
    
    async create(data) {
      if (API.useMockData) {
        return { data: MockData.api.createApplication(data) };
      }
      return await window.supabase.from('applications').insert(data).select().single();
    },
    
    async update(id, data) {
      if (API.useMockData) {
        return { data: MockData.api.updateApplication(id, data.status) };
      }
      return await window.supabase.from('applications').update(data).eq('id', id);
    }
  },

  // ===== MAINTENANCE =====
  maintenance: {
    async get(filters = {}) {
      if (API.useMockData) {
        return { data: MockData.api.getMaintenance(filters) };
      }
      let query = window.supabase.from('maintenance').select('*');
      if (filters.tenant_id) query = query.eq('tenant_id', filters.tenant_id);
      if (filters.property_id) query = query.eq('property_id', filters.property_id);
      return await query;
    },
    
    async create(data) {
      if (API.useMockData) {
        return { data: MockData.api.createMaintenance(data) };
      }
      return await window.supabase.from('maintenance').insert(data).select().single();
    },
    
    async update(id, data) {
      if (API.useMockData) {
        const m = MockData.maintenance.find(m => m.id === id);
        if (m) Object.assign(m, data);
        return { data: m };
      }
      return await window.supabase.from('maintenance').update(data).eq('id', id);
    }
  },

  // ===== PAYMENTS =====
  payments: {
    async get(filters = {}) {
      if (API.useMockData) {
        return { data: MockData.api.getPayments(filters) };
      }
      let query = window.supabase.from('payments').select('*');
      if (filters.tenant_id) query = query.eq('tenant_id', filters.tenant_id);
      if (filters.status) query = query.eq('status', filters.status);
      return await query;
    },
    
    async create(data) {
      if (API.useMockData) {
        const payment = {
          id: 'pay' + Math.random().toString(36).substr(2, 9),
          ...data,
          status: 'pending',
          created_at: new Date().toISOString()
        };
        MockData.payments.push(payment);
        return { data: payment };
      }
      return await window.supabase.from('payments').insert(data).select().single();
    }
  },

  // ===== DOCUMENTS =====
  documents: {
    async get(tenantId) {
      if (API.useMockData) {
        return { data: MockData.api.getDocuments(tenantId) };
      }
      return await window.supabase.from('tenant_documents').select('*').eq('tenant_id', tenantId);
    },
    
    async create(data) {
      if (API.useMockData) {
        const doc = {
          id: 'd' + Math.random().toString(36).substr(2, 9),
          ...data,
          status: 'pending',
          created_at: new Date().toISOString()
        };
        MockData.documents.push(doc);
        return { data: doc };
      }
      return await window.supabase.from('tenant_documents').insert(data).select().single();
    }
  },

  // ===== NOTIFICATIONS =====
  notifications: {
    async get(userId) {
      if (API.useMockData) {
        return { data: MockData.api.getNotifications(userId) };
      }
      return await window.supabase.from('notifications').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    },
    
    async create(data) {
      if (API.useMockData) {
        const n = {
          id: 'n' + Math.random().toString(36).substr(2, 9),
          ...data,
          read: false,
          created_at: new Date().toISOString()
        };
        MockData.notifications.push(n);
        return { data: n };
      }
      return await window.supabase.from('notifications').insert(data).select().single();
    },
    
    async markRead(id) {
      if (API.useMockData) {
        const n = MockData.notifications.find(n => n.id === id);
        if (n) n.read = true;
        return { data: n };
      }
      return await window.supabase.from('notifications').update({ read: true }).eq('id', id);
    }
  },

  // ===== STATS =====
  stats: {
    async get(role, userId) {
      if (API.useMockData) {
        return { data: MockData.api.getStats(role, userId) };
      }
      // Real stats would require multiple queries or RPC
      return { data: { totalUsers: 0, totalProperties: 0 } };
    }
  }
};

// Export
window.API = API;
