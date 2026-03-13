/**
 * TenantMatch - Unified Dashboard Router
 * Handles all dashboard roles: superadmin, landlord, agent, tenant
 */

class DashboardRouter {
  constructor() {
    this.currentRole = this.detectRole()
    this.currentPage = 'dashboard'
    this.init()
  }

  detectRole() {
    const path = window.location.pathname
    if (path.includes('superadmin')) return 'superadmin'
    if (path.includes('landlord')) return 'landlord'
    if (path.includes('agent')) return 'agent'
    if (path.includes('tenant')) return 'tenant'
    return 'superadmin'
  }

  init() {
    this.setupNavigation()
    this.loadPage(this.getPageFromURL())
    this.setupModals()
    this.loadData()
  }

  getPageFromURL() {
    const hash = window.location.hash.replace('#', '') || 'dashboard'
    return hash
  }

  setupNavigation() {
    // Handle nav clicks
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const page = link.dataset.page
        this.navigateTo(page)
      })
    })

    // Handle browser back/forward
    window.addEventListener('hashchange', () => {
      const page = this.getPageFromURL()
      this.loadPage(page)
    })
  }

  navigateTo(page) {
    window.location.hash = page
  }

  loadPage(page) {
    this.currentPage = page
    
    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active', 'text-primary', 'bg-primary/10')
      link.classList.add('text-gray-600')
      if (link.dataset.page === page) {
        link.classList.add('active', 'text-primary', 'bg-primary/10')
        link.classList.remove('text-gray-600')
      }
    })

    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => {
      p.classList.add('hidden')
    })

    // Show current page
    const pageEl = document.getElementById(`page-${page}`)
    if (pageEl) {
      pageEl.classList.remove('hidden')
      pageEl.classList.add('animate-fade-in')
    }

    // Update page title
    const title = this.getPageTitle(page)
    const heading = document.querySelector('main h1')
    if (heading) {
      heading.textContent = title
    }

    // Load page-specific data
    this.loadPageData(page)
  }

  getPageTitle(page) {
    const titles = {
      dashboard: 'Dashboard',
      users: 'Users',
      properties: 'Properties',
      units: 'Units',
      applications: 'Applications',
      maintenance: 'Maintenance',
      payments: 'Payments',
      revenue: 'Revenue',
      analytics: 'Analytics',
      documents: 'My Documents',
      profile: 'My Profile',
      landlords: 'My Landlords',
      commissions: 'Commissions',
      settings: 'Settings'
    }
    return titles[page] || 'Dashboard'
  }

  loadPageData(page) {
    // Dispatch custom event for page-specific loading
    window.dispatchEvent(new CustomEvent('page-load', { detail: { page, role: this.currentRole } }))
  }

  setupModals() {
    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden')
        }
      })
    })

    // Close modals on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(modal => {
          modal.classList.add('hidden')
        })
      }
    })
  }

  loadData() {
    // Initial data load
    window.dispatchEvent(new CustomEvent('dashboard-ready'))
  }

  openModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`)
    if (modal) {
      modal.classList.remove('hidden')
    }
  }

  closeModal(modalId) {
    const modal = document.getElementById(`modal-${modalId}`)
    if (modal) {
      modal.classList.add('hidden')
    }
  }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.router = new DashboardRouter()
})
