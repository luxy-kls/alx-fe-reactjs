import { Navigate } from 'react-router-dom'

export function useAuth() {
  // Simulated authentication state
  const isAuthenticated = false // change to true to allow access

  return { isAuthenticated }
}

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default ProtectedRoute