import React from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Découverte",
      price: "Gratuit",
      features: [
        "5 évaluations par mois",
        "Rapports de base",
        "Support par email",
        "Accès aux ressources publiques"
      ],
      highlighted: false
    },
    {
      name: "Professionnel",
      price: "49€/mois",
      features: [
        "Évaluations illimitées",
        "Rapports détaillés",
        "Comparaison d'équipes",
        "Support prioritaire",
        "Tableau de bord analytique",
        "API d'intégration"
      ],
      highlighted: true
    },
    {
      name: "Entreprise",
      price: "Sur mesure",
      features: [
        "Toutes les fonctionnalités Professionnelles",
        "Formation personnalisée",
        "Accompagnement stratégique",
        "Intégration sur mesure",
        "Déploiement multi-sites",
        "Manager dédié"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-16 px-4 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
            Choisissez votre formule
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des tarifs adaptés à vos besoins, que vous soyez une petite équipe ou une grande entreprise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white p-8 rounded-lg shadow-md ${
                plan.highlighted ? 'ring-2 ring-pink-700 transform md:scale-105' : ''
              } hover:shadow-lg transition-all`}
            >
              {plan.highlighted && (
                <div className="bg-pink-700 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  Plus populaire
                </div>
              )}

              <h3 className="text-2xl font-bold text-teal-900 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-pink-700 mb-6">{plan.price}</div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => plan.name === "Entreprise" ? navigate('/login') : navigate('/assessment')}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                  plan.highlighted 
                    ? 'bg-pink-700 text-white hover:bg-pink-800' 
                    : 'bg-gray-100 text-teal-900 hover:bg-gray-200'
                }`}
              >
                {plan.name === "Entreprise" ? "Nous contacter" : "Commencer"}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Tous les plans incluent un essai gratuit de 14 jours. Pas besoin de carte bancaire.
          </p>
          <p className="text-sm text-gray-500">
            Des questions ? <a href="#" className="text-pink-700 hover:underline">Contactez notre équipe</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
