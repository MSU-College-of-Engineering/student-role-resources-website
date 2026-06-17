import { useState, useEffect } from 'react'
import ResourcesPage from './pages/ResourcesPage'
import ComponentsPage from './pages/ComponentsPage'

function useHashRoute() {
  const read = () => window.location.hash.replace(/^#/, '') || '/'
  const [route, setRoute] = useState(read)
  useEffect(() => {
    const onHash = () => setRoute(read())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])
  return route
}

export default function App() {
  const route = useHashRoute()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route])

  const isComponents = route.startsWith('/components')
  return isComponents ? <ComponentsPage /> : <ResourcesPage />
}
