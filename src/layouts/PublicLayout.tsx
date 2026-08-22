import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/public/Navbar';
import { Footer } from '../components/public/Footer';
import { PartnersCarousel } from '../components/public/PartnersCarousel';
import { AssistanceWidget } from '../components/public/AssistanceWidget';
import { Seo } from '../components/public/Seo';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Seo />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PartnersCarousel />
      <Footer />
      <AssistanceWidget />
    </div>
  );
}
