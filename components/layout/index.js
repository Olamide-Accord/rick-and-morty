import Navbar from "../navbar";
import layoutStyles from "./Layout.module.css"

const Layout = ({children}) => {
  return (
    <div className={layoutStyles.layout}>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout