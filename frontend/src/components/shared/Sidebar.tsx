import { Link } from 'react-router-dom';
import { navLinks } from '../../constants/index';
import { useLocation } from 'react-router-dom';
import Logo from '@/assets/icons/react.svg';

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <aside className="sidebar p-8">
      <div className="flex size-full flex-col gap-4">
        <Link to="/home" className="sidebar-logo">
          <img src={Logo} alt="logo" />
        </Link>

        <nav className="sidebar-nav">
          <ul className="sidebar-nav_elements">
            {navLinks.map((link) => {
              const isActive = link.route === pathname;

              return (
                <li key={link.route} className={`sidebar-nav_element group ${
                  isActive ? 'bg-blue-900  text-white' : 'text-gray-700'
                }`}>
                  <Link className="sidebar-link" to={link.route}>
                    <img 
                      src={link.icon}
                      alt="icon"
                      width={24}
                      height={24}
                      className={`${isActive && 'brightness-200'}`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;