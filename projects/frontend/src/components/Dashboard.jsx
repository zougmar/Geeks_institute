import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      const element = contentRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`dashboard_${user.name}_${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-xl">Chargement...</div>
    </div>;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Vue d'ensemble de vos compétences digitales
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 mb-2">Transformation digitale</h4>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">75%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 mb-2">Agilité</h4>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">60%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 mb-2">Innovation</h4>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">85%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-medium text-gray-700 mb-2">Expérience client</h4>
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">70%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Recommandations personnalisées
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-pink-500 pl-4">
                    <h4 className="text-md font-medium text-gray-900">Améliorez votre agilité</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Nous vous recommandons de suivre notre formation sur les méthodologies agiles pour renforcer vos compétences dans ce domaine.
                    </p>
                    <button className="mt-2 text-sm text-pink-700 font-medium hover:text-pink-600">
                      Découvrir la formation →
                    </button>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="text-md font-medium text-gray-900">Approfondissez l'expérience client</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Participez à notre atelier sur la conception centrée utilisateur pour mieux comprendre les besoins de vos clients.
                    </p>
                    <button className="mt-2 text-sm text-blue-700 font-medium hover:text-blue-600">
                      Réserver une place →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Historique de vos évaluations
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Consultez l'évolution de vos compétences digitales au fil du temps.
              </p>
            </div>
            <ul className="divide-y divide-gray-200">
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-pink-600">
                        Évaluation complète - 15 juin 2023
                      </p>
                      <p className="text-sm text-gray-500">
                        Score global: 72%
                      </p>
                    </div>
                    <button className="text-sm text-pink-700 font-medium hover:text-pink-600">
                      Voir les détails →
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-pink-600">
                        Évaluation rapide - 10 mai 2023
                      </p>
                      <p className="text-sm text-gray-500">
                        Score global: 65%
                      </p>
                    </div>
                    <button className="text-sm text-pink-700 font-medium hover:text-pink-600">
                      Voir les détails →
                    </button>
                  </div>
                </div>
              </li>
              <li>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-pink-600">
                        Évaluation initiale - 15 avril 2023
                      </p>
                      <p className="text-sm text-gray-500">
                        Score global: 58%
                      </p>
                    </div>
                    <button className="text-sm text-pink-700 font-medium hover:text-pink-600">
                      Voir les détails →
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Ressources recommandées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Article
                      </span>
                      <span className="ml-auto text-xs text-gray-500">5 min de lecture</span>
                    </div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">
                      Les 5 tendances de la transformation digitale en 2023
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Découvrez les technologies et approches qui transforment les entreprises cette année.
                    </p>
                    <a href="#" className="text-sm text-pink-700 font-medium hover:text-pink-600">
                      Lire l'article →
                    </a>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Vidéo
                      </span>
                      <span className="ml-auto text-xs text-gray-500">12 min</span>
                    </div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">
                      Introduction à l'agilité organisationnelle
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Apprenez les principes fondamentaux des méthodologies agiles et leur application.
                    </p>
                    <a href="#" className="text-sm text-pink-700 font-medium hover:text-pink-600">
                      Regarder la vidéo →
                    </a>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Webinaire
                      </span>
                      <span className="ml-auto text-xs text-gray-500">45 min</span>
                    </div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">
                      Créer une culture de l'innovation
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Rejoignez notre expert pour découvrir comment favoriser l'innovation dans votre équipe.
                    </p>
                    <a href="#" className="text-sm text-pink-700 font-medium hover:text-pink-600">
                      S'inscrire au webinaire →
                    </a>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Guide
                      </span>
                      <span className="ml-auto text-xs text-gray-500">15 min</span>
                    </div>
                    <h4 className="text-md font-medium text-gray-900 mb-2">
                      Améliorer l'expérience client digital
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Notre guide pratique pour optimiser chaque point de contact avec vos clients.
                    </p>
                    <a href="#" className="text-sm text-pink-700 font-medium hover:text-pink-600">
                      Télécharger le guide →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-teal-900">Tableau de bord</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Bienvenue, {user.name}</span>
              <button
                onClick={exportPDF}
                disabled={isExporting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isExporting ? 'Exportation...' : 'Exporter en PDF'}
              </button>
              <button
                onClick={handleLogout}
                className="bg-pink-700 text-white px-4 py-2 rounded-lg hover:bg-pink-800 transition text-sm font-medium"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Vue d'ensemble
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Historique
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'resources'
                    ? 'border-pink-500 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ressources
              </button>
            </nav>
          </div>

          <div className="mt-6" ref={contentRef}>
            {renderContent()}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/assessment"
              className="bg-pink-700 text-white px-6 py-3 rounded-lg hover:bg-pink-800 transition font-medium"
            >
              Nouvelle évaluation
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
