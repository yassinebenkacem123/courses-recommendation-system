import Logo from "./Logo"
import { Link} from "react-router-dom";
const NavBar = () => {
    const links  = ["Home", "Courses", "About", "Contact"];
  return (
    <div className="flex z-10 w-full justify-between items-center py-4">
      <Logo />
        <div className="flex gap-8 text-white text-2xl font-thin">
            {links.map((link, index) => (
                <Link 
                    key={index} to={link} 
                    className="cursor-pointer">
                    {link}
                </Link>
            ))}
        </div>
    </div>
  )
}

export default NavBar