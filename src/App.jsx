import { ScrollRestoration } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

export function App() {
  return (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <AppRouter />
    </>
  )
}
