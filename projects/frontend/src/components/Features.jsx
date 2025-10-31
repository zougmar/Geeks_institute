import React from "react";

const Features = () => {
  const features = [
    {
      icon: (
        <svg className="w-12 h-12 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Évaluation complète",
      description: "Un diagnostic précis de vos compétences digitales à travers 6 univers clés : transformation, agilité, innovation, expérience client, technologie et data."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Rapide et efficace",
      description: "Évaluez vos compétences en seulement 15 minutes et obtenez des résultats immédiatement exploitables pour votre organisation."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Résultats détaillés",
      description: "Obtenez une vision claire et mesurable de la maturité digitale de votre organisation avec des rapports personnalisés."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Analyse comparative",
      description: "Comparez les profils (leaders, managers, spécialistes, collaborateurs) pour identifier les écarts et prioriser les actions."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Parcours sur mesure",
      description: "Bénéficiez de recommandations personnalisées pour développer les compétences digitales de vos équipes."
    },
    {
      icon: (
        <svg className="w-12 h-12 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Suivi de progression",
      description: "Mesurez l'évolution des compétences de vos équipes au fil du temps avec notre tableau de bord analytique."
    }
  ];

  return (
    <section id="features" className="py-16 px-4 md:px-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
            Pourquoi choisir Digitancy ?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Notre solution d'évaluation digitale vous offre les outils nécessaires pour transformer vos compétences en avantage concurrentiel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-teal-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
