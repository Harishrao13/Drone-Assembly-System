import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { navLinks } from "../../constants/index"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Logo from '@/assets/icons/react.svg';
import Menu from '@/assets/icons/menu.svg';
import ProfileDropdown from "../ProfileDropdown";

const MobileNav = () => {
  const pathname = useLocation();

  return (
    <header className="header items-center">
      <Link to="/home" className="flex items-center gap-2 md:py-2">
        <img
          src={Logo}
          alt="logo"
          width={56}
          height={28}
        />
      </Link>
      
      <div className="flex items-center">
        <div className="mr-5 mt-2">
        <ProfileDropdown/>
        </div>
      <nav className="flex gap-2">
        <Sheet>
          <SheetTrigger>
            <img 
              src={Menu}
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="sheet-content sm:w-64 bg-white">
            <>
              <img 
                src={Logo}
                alt="logo"
                width={56}
                height={28}
              />

              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = link.route === String(pathname);

                  return (
                    <li 
                      className={`${isActive && 'gradient-text'} p-18 flex whitespace-nowrap text-dark-700`}
                      key={link.route}
                    >
                      <Link className="sidebar-link cursor-pointer" to={link.route}>
                      <img 
                        src={link.icon}
                        width={24}
                        height={24}
                      />
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </>
          </SheetContent>
        </Sheet>
      </nav>
      </div>
    </header>
  )
}

export default MobileNav
