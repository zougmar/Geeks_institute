import React from "react";
import { useNavigate } from "react-router-dom";

const CallToAction = () => {
  const navigate = useNavigate();
  return (
    <section className="py-16 px-4 md:px-20 bg-gradient-to-r from-teal-900 to-pink-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Prêt à évaluer vos compétences digitales ?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Rejoignez plus de 5 000 entreprises qui ont déjà transformé leur approche de la formation digitale avec Digitancy.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button 
            onClick={() => navigate('/assessment')}
            className="bg-white text-teal-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Commencer l'évaluation
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-900 transition-colors"
          >
            Demander une démo
          </button>
        </div>

        <p className="text-sm opacity-80">
          Aucune carte bancaire requise • Évaluation en 15 minutes • Résultats immédiats
        </p>
      </div>
    </section>
  );
};

export default CallToAction;
