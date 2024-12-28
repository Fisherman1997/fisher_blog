import CanvasPetals from '../components/canvasPetals/canvasPetals'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CanvasPetals />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
