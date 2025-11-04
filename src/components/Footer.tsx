import {Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="src/images/logo2.jpeg" alt="Logo" className="h-24 w-auto" />
            </div>
            <p className="text-sm">
              Your trusted source for authentic Islamic knowledge and guidance.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brandGold transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-brandGold transition-colors">Questions</a></li>
              <li><a href="#" className="hover:text-brandGold transition-colors">Library</a></li>
              <li><a href="#" className="hover:text-brandGold transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-brandGold transition-colors">Videos</a></li>
              <li><a href="#" className="hover:text-brandGold transition-colors">Audios</a></li>
              <li><a href="#" className="hover:text-brandGold transition-colors">Articles</a></li>
              <li><a href="#" className="hover:text-brandGold transition-colors">Books</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-brandGold" />
                <span>info@islamicguide.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-brandGold" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-brandGold" />
                <span>Global Outreach</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Islamic Guide. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
