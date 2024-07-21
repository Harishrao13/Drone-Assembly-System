import { useState, useEffect } from 'react';
import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import ProfileDropdown from '@/components/ProfileDropdown';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 815);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 815);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/auth/userinfo', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        if (data.authority) {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <main className="root">
      {isAdmin && !isMobile && <Sidebar />}
      {!isMobile && <ProfileDropdown />}
      {isMobile && <MobileNav isAdmin={isAdmin}/>}
      <div className="root-container">
        <div className="wrapper flex flex-col flex-center">{children}</div>
        <Toaster />
      </div>
    </main>
  );
};

export default Layout;
