// Landlord Dashboard Functionality

document.addEventListener('DOMContentLoaded', () => {
  initSidebar()
  initModals()
  loadDashboardData()
})

function initSidebar() {
  const navItems = document.querySelectorAll('.nav-item')
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      navItems.forEach(nav => {
        nav.classList.remove('nav-item-active')
      })
      if (!item.classList.contains('text-red-600')) {
        item.classList.add('nav-item-active')
      }
    })
  })
}

function initModals() {
  // Close modal on outside click
  document.querySelectorAll('[id^="modal-"]').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden')
      }
    })
  })
  
  // Close modal on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[id^="modal-"]').forEach(modal => {
        modal.classList.add('hidden')
      })
    }
  })
}

async function loadDashboardData() {
  try {
    const [properties, applications, maintenance] = await Promise.all([
      window.supabase.from('properties').select('*'),
      window.supabase.from('applications').select('*'),
      window.supabase.from('maintenance').select('*')
    ])
    
    console.log('Properties:', properties.data)
    console.log('Applications:', applications.data)
    console.log('Maintenance:', maintenance.data)
    
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  }
}

// Application actions
async function handleApplication(applicationId, action) {
  try {
    const { data, error } = await window.supabase
      .from('applications')
      .update({ status: action })
      .eq('id', applicationId)
    
    if (error) throw error
    
    console.log(`Application ${applicationId} ${action}ed`)
    location.reload()
    
  } catch (error) {
    console.error('Error updating application:', error)
    alert('Failed to update application. Please try again.')
  }
}

// Add property form handler
document.querySelector('form')?.addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const formData = new FormData(e.target)
  const property = {
    name: formData.get('name'),
    address: formData.get('address'),
    city: formData.get('city'),
    postal_code: formData.get('postal_code'),
    units_count: parseInt(formData.get('units_count'))
  }
  
  try {
    const { data, error } = await window.supabase
      .from('properties')
      .insert([property])
    
    if (error) throw error
    
    closeModal('add-property')
    alert('Property added successfully!')
    location.reload()
    
  } catch (error) {
    console.error('Error adding property:', error)
    alert('Failed to add property. Please try again.')
  }
})

window.dashboardHelpers = {
  loadDashboardData,
  handleApplication
}
