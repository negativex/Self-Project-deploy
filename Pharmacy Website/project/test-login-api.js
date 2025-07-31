// Test login functionality
async function testLogin() {
  try {
    console.log('🔍 Testing login API...')
    
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@pharmacy.com',
        password: 'admin123',
        rememberMe: false
      })
    })
    
    const data = await response.json()
    
    if (response.ok) {
      console.log('✅ Login successful!')
      console.log('👤 User:', data.user.email, 'Role:', data.user.role)
      console.log('🔑 Token received:', !!data.token)
    } else {
      console.log('❌ Login failed!')
      console.log('📄 Response:', data)
    }
    
  } catch (error) {
    console.error('💥 Error testing login:', error.message)
  }
}

testLogin()
