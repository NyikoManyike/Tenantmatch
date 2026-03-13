// TenantMatch - Shared JavaScript Utilities

// ===== Configuration =====
const CONFIG = {
  supabaseUrl: 'https://hpaoixvvpdcwykduumam.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYW9peHZ2cGRjd3lrZHV1bWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDgzMzcsImV4cCI6MjA4ODI4NDMzN30.eSqZfP99QkAi52uZ1bVP2oPtcd2siy_eb_toWQEPIvY',
  storageBucket: 'tenant-documents'
}

// ===== Initialize Supabase =====
let supabase;

async function initSupabase() {
  if (supabase) return supabase;
  
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2')
  supabase = createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey)
  return supabase
}

// ===== Auth Helpers =====
const Auth = {
  async signUp(email, password, metadata = {}) {
    const sb = await initSupabase()
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: { data: metadata }
    })
    if (error) throw error
    return data
  },

  async signIn(email, password) {
    const sb = await initSupabase()
    const { data, error } = await sb.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data
  },

  async signInWithOAuth(provider) {
    const sb = await initSupabase()
    const { data, error } = await sb.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin }
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const sb = await initSupabase()
    const { error } = await sb.auth.signOut()
    if (error) throw error
  },

  async getSession() {
    const sb = await initSupabase()
    const { data, error } = await sb.auth.getSession()
    if (error) throw error
    return data.session
  },

  async getUser() {
    const sb = await initSupabase()
    const { data, error } = await sb.auth.getUser()
    if (error) throw error
    return data.user
  },

  onAuthStateChange(callback) {
    initSupabase().then(sb => {
      sb.auth.onAuthStateChange(callback)
    })
  }
}

// ===== Database Helpers =====
const DB = {
  async getProfile(userId) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error && error.code !== 'PGRST116') throw error
    return data
  },

  async updateProfile(userId, updates) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async createProfile(userId, data) {
    const sb = await initSupabase()
    const { data: profile, error } = await sb
      .from('profiles')
      .insert([{ id: userId, ...data }])
      .select()
      .single()
    if (error) throw error
    return profile
  },

  // Properties
  async getProperties(filters = {}) {
    const sb = await initSupabase()
    let query = sb.from('properties').select('*')
    
    if (filters.userId) {
      query = query.eq('owner_id', filters.userId)
    }
    if (filters.location) {
      query = query.ilike('city', `%${filters.location}%`)
    }
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async createProperty(propertyData) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('properties')
      .insert([propertyData])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateProperty(id, updates) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async deleteProperty(id) {
    const sb = await initSupabase()
    const { error } = await sb
      .from('properties')
      .delete()
      .eq('id', id)
    if (error) throw error
  },

  // Units
  async getUnits(propertyId) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('units')
      .select('*')
      .eq('property_id', propertyId)
    if (error) throw error
    return data
  },

  async createUnit(unitData) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('units')
      .insert([unitData])
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Applications
  async getApplications(filters = {}) {
    const sb = await initSupabase()
    let query = sb.from('applications').select('*, properties(*), profiles(*)')
    
    if (filters.tenantId) {
      query = query.eq('tenant_id', filters.tenantId)
    }
    if (filters.propertyId) {
      query = query.eq('property_id', filters.propertyId)
    }
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async createApplication(applicationData) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('applications')
      .insert([applicationData])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateApplication(id, updates) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('applications')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Maintenance
  async getMaintenance(filters = {}) {
    const sb = await initSupabase()
    let query = sb.from('maintenance').select('*')
    
    if (filters.unitId) {
      query = query.eq('unit_id', filters.unitId)
    }
    if (filters.status) {
      query = query.eq('status', filters.status)
    }
    
    const { data, error } = await query
    if (error) throw error
    return data
  },

  async createMaintenance(maintenanceData) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('maintenance')
      .insert([maintenanceData])
      .select()
      .single()
    if (error) throw error
    return data
  },

  async updateMaintenance(id, updates) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('maintenance')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  // Documents
  async getDocuments(userId) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('tenant_documents')
      .select('*')
      .eq('tenant_id', userId)
    if (error) throw error
    return data
  },

  // Stats
  async getStats(userId, role) {
    const sb = await initSupabase()
    
    let properties, applications, maintenance, revenue
    
    if (role === 'landlord' || role === 'agent') {
      const [p, a, m, rev] = await Promise.all([
        sb.from('properties').select('id', { count: 'exact' }).eq('owner_id', userId),
        sb.from('applications').select('id', { count: 'exact' }),
        sb.from('maintenance').select('id', { count: 'exact' }),
        sb.from('payments').select('amount', { count: 'exact' }).eq('status', 'paid')
      ])
      properties = p.count
      applications = a.count
      maintenance = m.count
      revenue = rev.data?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0
    } else {
      const [a, d, m] = await Promise.all([
        sb.from('applications').select('id', { count: 'exact' }).eq('tenant_id', userId),
        sb.from('tenant_documents').select('id', { count: 'exact' }).eq('tenant_id', userId),
        sb.from('maintenance').select('id', { count: 'exact' }).eq('tenant_id', userId)
      ])
      applications = a.count
      maintenance = m.count
      revenue = 0
      properties = 0
    }
    
    return { properties, applications, maintenance, revenue }
  }
}

// ===== Storage Helpers =====
const Storage = {
  async uploadFile(bucket, path, file) {
    const sb = await initSupabase()
    const { data, error } = await sb.storage
      .from(bucket)
      .upload(path, file)
    if (error) throw error
    return data
  },

  async getFileUrl(bucket, path) {
    const sb = await initSupabase()
    const { data } = sb.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  },

  async deleteFile(bucket, path) {
    const sb = await initSupabase()
    const { error } = await sb.storage.from(bucket).remove([path])
    if (error) throw error
  }
}

// ===== Toast Notifications =====
const Toast = {
  container: null,
  
  init() {
    if (!this.container) {
      this.container = document.createElement('div')
      this.container.className = 'toast-container'
      document.body.appendChild(this.container)
    }
  },
  
  show(message, type = 'info', duration = 4000) {
    this.init()
    
    const toast = document.createElement('div')
    toast.className = `toast toast-${type} animate-slide-down`
    toast.innerHTML = `
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        ${type === 'success' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>' : ''}
        ${type === 'error' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>' : ''}
        ${type === 'warning' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>' : ''}
        ${type === 'info' ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>' : ''}
      </svg>
      <span class="flex-1">${message}</span>
      <button class="toast-close opacity-70 hover:opacity-100">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    `
    
    this.container.appendChild(toast)
    
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove()
    })
    
    if (duration > 0) {
      setTimeout(() => {
        toast.style.animation = 'fadeIn 0.2s reverse'
        setTimeout(() => toast.remove(), 200)
      }, duration)
    }
    
    return toast
  },
  
  success(message, duration) {
    return this.show(message, 'success', duration)
  },
  
  error(message, duration) {
    return this.show(message, 'error', duration)
  },
  
  warning(message, duration) {
    return this.show(message, 'warning', duration)
  },
  
  info(message, duration) {
    return this.show(message, 'info', duration)
  }
}

// ===== UI Helpers =====
const UI = {
  showLoading(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }
    if (element) {
      element.dataset.originalContent = element.innerHTML
      element.innerHTML = '<span class="spinner"></span>'
      element.disabled = true
    }
  },
  
  hideLoading(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element)
    }
    if (element && element.dataset.originalContent) {
      element.innerHTML = element.dataset.originalContent
      element.disabled = false
      delete element.dataset.originalContent
    }
  },
  
  showModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`)
    if (modal) {
      modal.classList.remove('hidden')
      document.body.style.overflow = 'hidden'
    }
  },
  
  hideModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`)
    if (modal) {
      modal.classList.add('hidden')
      document.body.style.overflow = ''
    }
  },
  
  formatCurrency(amount, currency = 'ZAR') {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency
    }).format(amount)
  },
  
  formatDate(date, options = {}) {
    return new Intl.DateTimeFormat('en-ZA', {
      dateStyle: 'medium',
      ...options
    }).format(new Date(date))
  },
  
  formatRelativeTime(date) {
    const now = new Date()
    const then = new Date(date)
    const diff = now - then
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 7) return this.formatDate(date)
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  },
  
  getInitials(name) {
    if (!name) return '?'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  },
  
  slugify(text) {
    return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-')
  }
}

// ===== Notifications =====
const Notifications = {
  async create(userId, type, title, message, data = {}) {
    const sb = await initSupabase()
    const { data: notification, error } = await sb
      .from('notifications')
      .insert([{
        user_id: userId,
        type,
        title,
        message,
        data,
        read: false
      }])
      .select()
      .single()
    if (error) throw error
    return notification
  },

  async getAll(userId, limit = 20) {
    const sb = await initSupabase()
    const { data, error } = await sb
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data
  },

  async markAsRead(id) {
    const sb = await initSupabase()
    const { error } = await sb
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
    if (error) throw error
  },

  async markAllAsRead(userId) {
    const sb = await initSupabase()
    const { error } = await sb
      .from('notifications')
      .update({ read: true })
      .eq('user_id', userId)
      .eq('read', false)
    if (error) throw error
  },

  renderNotificationList(notifications) {
    if (!notifications || notifications.length === 0) {
      return '<div class="p-4 text-center text-gray-500">No notifications</div>'
    }
    
    return notifications.map(n => `
      <div class="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer notification-item ${n.read ? 'opacity-60' : ''}" data-id="${n.id}">
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${n.read ? 'bg-gray-100' : 'bg-primary/10'}">
            <svg class="w-4 h-4 ${n.read ? 'text-gray-400' : 'text-primary'}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900">${n.title}</p>
            <p class="text-xs text-gray-500">${n.message}</p>
            <p class="text-xs text-gray-400 mt-1">${UI.formatRelativeTime(n.created_at)}</p>
          </div>
        </div>
      </div>
    `).join('')
  }
}

// ===== Export to global =====
window.TenantMatch = {
  CONFIG,
  Auth,
  DB,
  Storage,
  Toast,
  UI,
  Notifications,
  initSupabase
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initSupabase()
})
