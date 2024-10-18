import Routers from "../routes/Routers"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"


const Layout = () => {
  return (
    <>

      {< Header />}
      <main>
        <Routers />
      </main>
      {< Footer />}
    </>
  )
}

export default Layout
