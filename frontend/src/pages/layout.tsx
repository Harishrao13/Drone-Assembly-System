import { useState, useEffect } from 'react';
import MobileNav from '@/components/shared/MobileNav';
import Sidebar from '@/components/shared/Sidebar';
// import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 815);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 815);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="root ">
      {!isMobile && <Sidebar />}
      {isMobile && <MobileNav />}
      <div className="root-container">
        <div className="wrapper flex flex-center">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
