import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router"
import logo from "../../public//images/logo-black.svg"
import navStyle from "./Navbar.module.css"

const Navbar = () => {
  const router = useRouter()
  const handleClick = () => {
    router.replace('/')
  }
  return (
    <nav className={navStyle.nav}>
      <div className={navStyle.image} onClick={handleClick}>
        <Image src={logo} width={100} />
      </div>
    </nav>
  )
}

export default Navbar