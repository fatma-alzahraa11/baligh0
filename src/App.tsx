import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Library from './pages/Library';
import About from './pages/About';
import Contact from './pages/Contact';
import ChatNow from './pages/ChatNow';
import Volunteer from './pages/Volunteer';

function App() {
  const [currentPage, setCurrentPage] = useState('chatnow');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced on-scroll reveal for elements with data-aos
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('[data-aos]')) as HTMLElement[];
    if (elements.length === 0) return;

    // Respect reduced motion preferences
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      elements.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.transition = '';
      });
      return;
    }

    elements.forEach((el) => {
      const effect = el.getAttribute('data-aos') || 'fade-up';
      const delay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
      const durationMs = parseInt(el.getAttribute('data-aos-duration') || '700', 10);
      const easing = el.getAttribute('data-aos-easing') || 'ease-out';
      el.style.willChange = 'opacity, transform';
      // initial state
      el.style.opacity = '0';
      if (effect === 'zoom-in') {
        el.style.transform = 'translateY(16px) scale(0.98)';
      } else {
        // fade-up, slide-up, etc.
        el.style.transform = 'translateY(16px)';
      }
      el.style.transition = `opacity ${durationMs}ms ${easing} ${delay}ms, transform ${durationMs}ms ${easing} ${delay}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            const effect = el.getAttribute('data-aos') || 'fade-up';
            const once = (el.getAttribute('data-aos-once') || 'true') === 'true';

            // Optional stagger for sibling elements
            const parent = el.parentElement;
            const wantsStagger = (parent?.getAttribute('data-aos-stagger') || 'false') === 'true';
            if (wantsStagger && parent) {
              const siblings = Array.from(parent.querySelectorAll('[data-aos]')) as HTMLElement[];
              const baseDelay = parseInt(el.getAttribute('data-aos-delay') || '0', 10);
              const increment = parseInt(parent.getAttribute('data-aos-stagger-amount') || '75', 10);
              const index = siblings.indexOf(el);
              const totalDelay = baseDelay + Math.max(0, index) * increment;
              const durationMs = parseInt(el.getAttribute('data-aos-duration') || '700', 10);
              const easing = el.getAttribute('data-aos-easing') || 'ease-out';
              el.style.transition = `opacity ${durationMs}ms ${easing} ${totalDelay}ms, transform ${durationMs}ms ${easing} ${totalDelay}ms`;
            }

            el.style.opacity = '1';
            if (effect === 'zoom-in') {
              el.style.transform = 'translateY(0) scale(1)';
            } else {
              el.style.transform = 'translateY(0)';
            }
            if (once) {
              observer.unobserve(el);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'chatnow':
        return <ChatNow />;
      case 'questions':
        return <Questions />;
      case 'library':
        return <Library />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'volunteer':
        return <Volunteer />;
      default:
        return <ChatNow />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {isLoading && (
        <div className="fixed inset-0 z-[999] grid place-items-center bg-white">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-brandBlue border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;
