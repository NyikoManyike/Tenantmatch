// Tenant Dashboard Functionality

document.addEventListener('DOMContentLoaded', () => {
  initSidebar()
  initModals()
  loadTenantData()
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
  document.querySelectorAll('[id^="modal-"]').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden')
      }
    })
  })
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[id^="modal-"]').forEach(modal => {
        modal.classList.add('hidden')
      })
    }
  })
}

async function loadTenantData() {
  try {
    const [profile, documents, applications, maintenance] = await Promise.all([
      window.supabase.from('profiles').select('*').single(),
      window.supabase.from('tenant_documents').select('*'),
      window.supabase.from('applications').select('*'),
      window.supabase.from('maintenance').select('*')
    ])
    
    console.log('Profile:', profile.data)
    console.log('Documents:', documents.data)
    console.log('Applications:', applications.data)
    console.log('Maintenance:', maintenance.data)
    
  } catch (error) {
    console.error('Error loading tenant data:', error)
  }
}

// Apply for property
async function applyForProperty(propertyId) {
  try {
    const { data, error } = await window.supabase
      .from('applications')
      .insert([{
        property_id: propertyId,
        status: 'pending',
        applied_at: new Date().toISOString()
      }])
    
    if (error) throw error
    
    alert('Application submitted successfully!')
    location.reload()
    
  } catch (error) {
    console.error('Error applying:', error)
    alert('Failed to submit application. Please try again.')
  }
}

// Upload document
async function uploadDocument(documentType, file) {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${documentType}_${Date.now()}.${fileExt}`
    
    const { data, error } = await window.supabase.storage
      .from('tenant-documents')
      .upload(fileName, file)
    
    if (error) throw error
    
    await window.supabase.from('tenant_documents').insert([{
      document_type: documentType,
      file_path: fileName,
      status: 'pending'
    }])
    
    alert('Document uploaded successfully!')
    closeModal('upload-document')
    location.reload()
    
  } catch (error) {
    console.error('Error uploading document:', error)
    alert('Failed to upload document. Please try again.')
  }
}

// Submit maintenance request
async function submitMaintenanceRequest(issueType, description, urgency) {
  try {
    const { data, error } = await window.supabase
      .from('maintenance')
      .insert([{
        issue_type: issueType,
        description: description,
        urgency: urgency,
        status: 'open',
        submitted_at: new Date().toISOString()
      }])
    
    if (error) throw error
    
    alert('Maintenance request submitted!')
    closeModal('new-maintenance')
    location.reload()
    
  } catch (error) {
    console.error('Error submitting maintenance:', error)
    alert('Failed to submit request. Please try again.')
  }
}

// Handle form submissions
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formId = e.target.closest('[id^="modal-"]')?.id
    
    if (formId === 'modal-upload-document') {
      const docType = form.querySelector('select').value
      const fileInput = form.querySelector('input[type="file"]')
      if (fileInput?.files[0]) {
        await uploadDocument(docType, fileInput.files[0])
      }
    } else if (formId === 'modal-new-maintenance') {
      const formData = new FormData(form)
      await submitMaintenanceRequest(
        formData.get('issueType'),
        formData.get('description'),
        formData.get('urgency')
      )
    }
  })
})

window.dashboardHelpers = {
  loadTenantData,
  applyForProperty,
  uploadDocument,
  submitMaintenanceRequest
}
