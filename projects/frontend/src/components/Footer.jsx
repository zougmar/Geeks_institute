import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4 text-pink-400">Digitancy</h3>
          <p className="text-gray-300 text-sm">
            Évaluez vos compétences digitales en 15 minutes et identifiez les axes d'amélioration pour votre organisation.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li><a href="#" className="hover:text-pink-400 transition">Évaluation digitale</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Formation personnalisée</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Consulting</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Accompagnement</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Ressources</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li><a href="#" className="hover:text-pink-400 transition">Blog</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Études de cas</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Webinaires</a></li>
            <li><a href="#" className="hover:text-pink-400 transition">Documentation</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>contact@digitancy.com</li>
            <li>+33 1 23 45 67 89</li>
            <li>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="hover:text-pink-400 transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-pink-400 transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-pink-400 transition">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} Digitancy. Tous droits réservés.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-pink-400 transition">Mentions légales</a>
          <a href="#" className="hover:text-pink-400 transition">Politique de confidentialité</a>
          <a href="#" className="hover:text-pink-400 transition">CGU</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
