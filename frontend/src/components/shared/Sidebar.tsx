import { Link } from 'react-router-dom';
import { navLinks } from '../../../constants/index';
import Logo from '../../assets/react.svg'
import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const { pathname } = useLocation()
  return (
    <aside className='sidebar'>
      <div className="flex size-full flex-col gap-4 text-left">
        <Link to="/" className="sidebar-logo">
          <img src={Logo} alt="Logo" />
        </Link>

        <nav className='sidebar-nav'>
          <ul className='sidebar-nav_elements'>
            {navLinks.map((link) => {
              const isActive = link.route === pathname

              return (
                <li key={link.route} className={`sidebar-nav_element ${isActive ? 'bg-purple-gradient text-white': 'text-gray-700'}`}>
                  {link.label}
                  </li>
)
            })}
          </ul>
        </nav>
      </div>
    </aside>

  )
}

export default Sidebar