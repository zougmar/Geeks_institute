import React from "react";
import { useNavigate } from "react-router-dom";
import astronaut from "../assets/Astro.webp";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col md:flex-row justify-between items-center bg-white py-16 px-8 md:px-20">
      {/* Left Section */}
      <div className="max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-teal-900 leading-snug">
          Évaluez vos <span className="text-teal-900">compétences digitales</span><br />
          <span className="text-pink-700 underline">en 15 minutes</span>
        </h1>

        <p className="text-gray-700 mt-6 leading-relaxed">
          Vous ne savez pas toujours où <span className="font-semibold text-teal-900">concentrer vos efforts de formation digitale</span> ?
          Notre diagnostic vous offre une vision claire et mesurable de la maturité digitale de votre organisation à travers
          <span className="font-semibold text-pink-700"> 6 univers clés</span> : transformation, agilité, innovation,
          expérience client, technologie et data.
        </p>

        <p className="text-gray-700 mt-4 leading-relaxed">
          En comparant les <span className="font-semibold text-teal-900">profils</span> (leaders, managers, spécialistes, collaborateurs),
          vous identifiez les <span className="font-semibold text-pink-700">écarts à combler</span> et les priorités à traiter pour faire
          progresser vos équipes là où cela aura le plus d'impact.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => navigate('/assessment')}
            className="bg-pink-700 text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-800 transition-all font-medium"
          >
            Commencer le diagnostic
          </button>
          <button 
            onClick={() => navigate('/login')}
            className="border-2 border-pink-700 text-pink-700 px-6 py-3 rounded-lg hover:bg-pink-50 transition-all font-medium"
          >
            Demander une démo
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">Durée estimée : 15-20 minutes</p>
      </div>

      {/* Right Section */}
      <div className="mt-10 md:mt-0">
        <img src={astronaut} alt="Astronaut" className="w-80 md:w-96 drop-shadow-lg" />
      </div>
    </section>
  );
};

export default HeroSection;
