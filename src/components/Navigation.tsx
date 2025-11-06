import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'questions', label: 'Questions' },
    { id: 'library', label: 'Library' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const languages = [
    'English',
    'Hindi',
    'Tagalog',
    'Tamil',
    'Urdu',
    'Telugu',
    'French',
    'Arabic',
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${scrolled ? 'bg-white/100 backdrop-blur shadow-md' : 'bg-transparent'} fixed w-full top-0 z-50 transition-all`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-25">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('chatnow')}>
            <img src="/images/logo.png" alt="Logo" className="h-24 w-auto" />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`${
                  currentPage === item.id
                    ? 'text-[#CEA235] border-b-2 border-[#CEA235]'
                    : 'text-gray-600 hover:text-[#CEA235]'
                } px-3 py-2 text-sm font-medium transition-all hover:-translate-y-0.5`}
              >
                {item.label}
              </button>
            ))}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavigation('chatnow')}
                className="bg-[#dbac42] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1473ab] transition-colors"
              >
                Chat Now
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen((v) => !v)}
                  className="flex items-center gap-1 text-gray-600 hover:text-[#CEA235] px-2 py-2 rounded-md transition-colors"
                >
                  <Globe className="h-5 w-5" />
                  <span className="text-sm hidden lg:inline">{selectedLanguage}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border z-50">
                    <ul className="py-1 max-h-64 overflow-auto">
                      {languages.map((lang) => (
                        <li key={lang}>
                          <button
                            onClick={() => {
                              setSelectedLanguage(lang);
                              setIsLangOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                              selectedLanguage === lang ? 'text-[#CEA235]' : 'text-gray-700'
                            }`}
                          >
                            {lang}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-[#CEA235] hover:bg-gray-100"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`${
                  currentPage === item.id
                    ? 'bg-[#CEA235]/10 text-[#CEA235]'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#CEA235]'
                } block w-full text-left px-4 py-3 rounded-md text-lg font-medium transition-colors`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavigation('chatnow')}
              className="bg-[#dbac42] text-white px-6 py-3 rounded-full text-base font-medium hover:bg-[#1473ab] transition-colors w-full mt-2"
            >
              Chat Now
            </button>
            <div className="mt-3">
              <div className="relative">
                <button
                  onClick={() => setIsLangOpen((v) => !v)}
                  className="flex items-center gap-2 w-full justify-between text-gray-600 hover:text-[#CEA235] px-4 py-3 rounded-md transition-colors border text-base"
                >
                  <span className="flex items-center gap-2"><Globe className="h-6 w-6" /> {selectedLanguage}</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                {isLangOpen && (
                  <div className="mt-2 w-full bg-white shadow-lg rounded-md border z-50">
                    <ul className="py-1 max-h-64 overflow-auto">
                      {languages.map((lang) => (
                        <li key={lang}>
                          <button
                            onClick={() => {
                              setSelectedLanguage(lang);
                              setIsLangOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-base hover:bg-gray-50 ${
                              selectedLanguage === lang ? 'text-[#CEA235]' : 'text-gray-700'
                            }`}
                          >
                            {lang}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
