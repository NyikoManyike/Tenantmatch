// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  
  // Check which page we're on
  const isAuthPage = document.getElementById('form-signin') !== null
  const isLandingPage = document.getElementById('form-signin') === null
  
  // ===== AUTH PAGE FUNCTIONALITY =====
  if (isAuthPage) {
    initAuthPage()
  }
  
  // ===== LANDING PAGE FUNCTIONALITY =====
  if (isLandingPage) {
    initLandingPage()
  }
  
})

// ===== AUTH PAGE FUNCTIONS =====
function initAuthPage() {
  // Tab switching
  const tabSignin = document.getElementById('tab-signin')
  const tabSignup = document.getElementById('tab-signup')
  const formSignin = document.getElementById('form-signin')
  const formSignup = document.getElementById('form-signup')
  const authMessage = document.getElementById('auth-message')
  
  // Check URL params for mode
  const urlParams = new URLSearchParams(window.location.search)
  const mode = urlParams.get('mode')
  
  if (mode === 'signup') {
    switchToSignup()
  } else {
    switchToSignin()
  }
  
  tabSignin.addEventListener('click', switchToSignin)
  tabSignup.addEventListener('click', switchToSignup)
  
  function switchToSignin() {
    tabSignin.classList.add('tab-active')
    tabSignin.classList.remove('text-gray-500', 'hover:text-gray-700')
    tabSignup.classList.remove('tab-active')
    tabSignup.classList.add('text-gray-500', 'hover:text-gray-700')
    formSignin.classList.remove('hidden')
    formSignup.classList.add('hidden')
    hideMessage()
  }
  
  function switchToSignup() {
    tabSignup.classList.add('tab-active')
    tabSignup.classList.remove('text-gray-500', 'hover:text-gray-700')
    tabSignin.classList.remove('tab-active')
    tabSignin.classList.add('text-gray-500', 'hover:text-gray-700')
    formSignup.classList.remove('hidden')
    formSignin.classList.add('hidden')
    hideMessage()
  }
  
  // Sign In handler
  document.getElementById('btn-signin').addEventListener('click', async () => {
    const email = document.getElementById('signin-email').value.trim()
    const password = document.getElementById('signin-password').value
    
    if (!email || !password) {
      showMessage('Please enter both email and password.', 'error')
      return
    }
    
    try {
      const btn = document.getElementById('btn-signin')
      btn.disabled = true
      btn.innerHTML = '<span class="spinner"></span> Signing in...'
      
      // Check if Supabase is available
      if (window.supabase && window.supabase.auth) {
        const { data, error } = await window.supabase.auth.signInWithPassword({
          email,
          password
        })
        
        if (error) throw error
        
        showMessage('Signed in successfully! Redirecting...', 'success')
        
        // Check user role and redirect
        const { data: profile } = await window.supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()
        
        const role = profile?.role || 'tenant'
        
        setTimeout(() => {
          window.location.href = `dashboard/${role}.html`
        }, 1000)
      } else {
        // Demo mode - accept any login
        const demoUserId = 'user_' + Date.now()
        localStorage.setItem('demo_user_id', demoUserId)
        localStorage.setItem('demo_role', 'tenant')
        localStorage.setItem('demo_user_name', email.split('@')[0])
        localStorage.setItem('demo_user_email', email)
        
        showMessage('Signed in successfully! Redirecting...', 'success')
        
        setTimeout(() => {
          window.location.href = 'dashboard/tenant.html'
        }, 1000)
      }
      
    } catch (error) {
      showMessage(error.message || 'Failed to sign in. Try demo login below!', 'error')
      const btn = document.getElementById('btn-signin')
      if (btn) {
        btn.disabled = false
        btn.innerHTML = 'Sign In'
      }
    }
  })
      
      if (error) throw error
      
      showMessage('Signed in successfully! Redirecting...', 'success')
      
      // Check user role and redirect to appropriate dashboard
      const { data: profile } = await window.supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()
      
      const role = profile?.role || 'tenant'
      
      setTimeout(() => {
        window.location.href = `dashboard/${role}.html`
      }, 1000)
      
    } catch (error) {
      showMessage(error.message || 'Failed to sign in. Try the demo login below!', 'error')
      const btn = document.getElementById('btn-signin')
      if (btn) {
        btn.disabled = false
        btn.innerHTML = 'Sign In'
      }
    }
  })
  
  // Sign Up handler
  document.getElementById('btn-signup').addEventListener('click', async () => {
    const name = document.getElementById('signup-name').value.trim()
    const email = document.getElementById('signup-email').value.trim()
    const password = document.getElementById('signup-password').value
    const confirmPassword = document.getElementById('signup-confirm-password')?.value || ''
    const role = document.getElementById('signup-role').value
    
    if (!name || !email || !password) {
      showMessage('Please fill in all fields.', 'error')
      return
    }
    
    if (password.length < 6) {
      showMessage('Password must be at least 6 characters.', 'error')
      return
    }
    
    if (confirmPassword && password !== confirmPassword) {
      showMessage('Passwords do not match.', 'error')
      return
    }
    
    try {
      const btn = document.getElementById('btn-signup')
      btn.disabled = true
      btn.innerHTML = '<span class="spinner"></span> Creating account...'
      
      // Check if Supabase is available
      if (window.supabase && window.supabase.auth) {
        // Try Supabase signup
        const { data, error } = await window.supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              role: role
            }
          }
        })
        
        if (error) throw error
        
        // Show appropriate message
        if (data.user && data.user.email_confirmed_at) {
          showMessage('Account created successfully! Redirecting...', 'success')
          const userRole = role || 'tenant'
          setTimeout(() => {
            window.location.href = `dashboard/${userRole}.html`
          }, 1500)
        } else {
          showMessage('Account created! Please check your email to verify your account.', 'info')
        }
      } else {
        // Demo mode - save to localStorage
        const demoUserId = 'user_' + Date.now()
        localStorage.setItem('demo_user_id', demoUserId)
        localStorage.setItem('demo_role', role)
        localStorage.setItem('demo_user_name', name)
        localStorage.setItem('demo_user_email', email)
        
        showMessage('Account created successfully! Redirecting...', 'success')
        
        setTimeout(() => {
          window.location.href = `dashboard/${role}.html`
        }, 1000)
      }
      
    } catch (error) {
      showMessage(error.message || 'Failed to create account. Trying demo mode...', 'error')
      
      // Fallback to demo mode
      setTimeout(() => {
        const role = document.getElementById('signup-role').value
        const demoUserId = 'user_' + Date.now()
        localStorage.setItem('demo_user_id', demoUserId)
        localStorage.setItem('demo_role', role)
        localStorage.setItem('demo_user_name', document.getElementById('signup-name').value.trim())
        localStorage.setItem('demo_user_email', document.getElementById('signup-email').value.trim())
        
        window.location.href = `dashboard/${role}.html`
      }, 2000)
    } finally {
      const btn = document.getElementById('btn-signup')
      if (btn) {
        btn.disabled = false
        btn.innerHTML = 'Create Account'
      }
    }
  })
  
  // Google Sign In
  document.getElementById('btn-google').addEventListener('click', async () => {
    try {
      const { data, error } = await window.supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/index.html'
        }
      })
      
      if (error) throw error
      
    } catch (error) {
      showMessage(error.message || 'Failed to sign in with Google.', 'error')
    }
  })
  
  function showMessage(message, type) {
    if (!authMessage) return
    
    authMessage.textContent = message
    authMessage.classList.remove('hidden', 'auth-success', 'auth-error', 'auth-info')
    
    if (type === 'success') {
      authMessage.classList.add('auth-success')
    } else if (type === 'error') {
      authMessage.classList.add('auth-error')
    } else {
      authMessage.classList.add('auth-info')
    }
    
    authMessage.classList.remove('hidden')
  }
  
  function hideMessage() {
    if (authMessage) {
      authMessage.classList.add('hidden')
    }
  }
}

// ===== LANDING PAGE FUNCTIONS =====
function initLandingPage() {
  // Add smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
  
  // Navbar scroll effect
  const navbar = document.querySelector('nav')
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-md')
      } else {
        navbar.classList.remove('shadow-md')
      }
    })
  }
}

// Make supabase available globally for inline scripts
window.supabase = window.supabase || {}

// Initialize Supabase client
import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2').then(module => {
  const { createClient } = module.default || module
  
  const supabaseUrl = 'https://hpaoixvvpdcwykduumam.supabase.co'
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwYW9peHZ2cGRjd3lrZHV1bWFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MDgzMzcsImV4cCI6MjA4ODI4NDMzN30.eSqZfP99QkAi52uZ1bVP2oPtcd2siy_eb_toWQEPIvY'
  
  window.supabase = createClient(supabaseUrl, supabaseKey)
  
  // Check auth state
  window.supabase.auth.getSession().then(({ data }) => {
    console.log('Session:', data.session)
  })
})
