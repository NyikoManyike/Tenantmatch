// Superadmin Dashboard Functionality

document.addEventListener('DOMContentLoaded', () => {
  initSidebar()
  initStats()
  initTableActions()
})

// Sidebar navigation
function initSidebar() {
  const navItems = document.querySelectorAll('.nav-item')
  
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // Remove active state from all items
      navItems.forEach(nav => {
        nav.classList.remove('nav-item-active')
      })
      
      // Add active state to clicked item
      if (!item.classList.contains('text-red-600')) {
        item.classList.add('nav-item-active')
      }
    })
  })
}

// Stats card animations
function initStats() {
  const statCards = document.querySelectorAll('.grid > .bg-white')
  
  statCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 100}ms`
  })
}

// Table action buttons
function initTableActions() {
  const editButtons = document.querySelectorAll('button:has-text("Edit")')
  
  editButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const row = e.target.closest('tr')
      const userName = row.querySelector('.font-medium').textContent
      console.log('Edit user:', userName)
      // TODO: Open edit modal
    })
  })
}

// Fetch users from Supabase
async function fetchUsers() {
  try {
    const { data, error } = await window.supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10)
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching users:', error)
    return []
  }
}

// Fetch stats
async function fetchStats() {
  try {
    const [usersCount, propertiesCount, applicationsCount] = await Promise.all([
      window.supabase.from('profiles').select('id', { count: 'exact' }),
      window.supabase.from('properties').select('id', { count: 'exact' }),
      window.supabase.from('applications').select('id', { count: 'exact' })
    ])
    
    return {
      users: usersCount.count || 0,
      properties: propertiesCount.count || 0,
      applications: applicationsCount.count || 0
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { users: 0, properties: 0, applications: 0 }
  }
}

// Update stats display
function updateStatsDisplay(stats) {
  // This would update the stat cards with real data
  console.log('Stats:', stats)
}

// Export functions for use in other modules
window.dashboardHelpers = {
  fetchUsers,
  fetchStats,
  updateStatsDisplay
}
