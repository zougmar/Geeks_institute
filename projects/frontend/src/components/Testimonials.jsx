import React from "react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Directrice Marketing",
      company: "TechInnov",
      image: "https://picsum.photos/seed/person1/100/100.jpg",
      text: "Digitancy nous a permis d'identifier précisément les compétences numériques manquantes dans nos équipes. Le diagnostic est clair, rapide et les recommandations sont pertinentes."
    },
    {
      name: "Thomas Dubois",
      role: "Responsable Formation",
      company: "SolutionsPlus",
      image: "https://picsum.photos/seed/person2/100/100.jpg",
      text: "Grâce à l'évaluation Digitancy, nous avons pu optimiser notre plan de formation digitale. Un gain de temps et d'efficacité considérable pour notre entreprise."
    },
    {
      name: "Marie Lefebvre",
      role: "DRH",
      company: "InnovGroup",
      image: "https://picsum.photos/seed/person3/100/100.jpg",
      text: "L'approche de Digitancy est à la fois complète et accessible. Nos collaborateurs ont apprécié la simplicité du test et la pertinence des résultats."
    }
  ];

  return (
    <section id="testimonials" className="py-16 px-4 md:px-20 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-teal-900 mb-4">
            Ce que nos clients en disent
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients et comment l'évaluation Digitancy a transformé leur approche de la formation digitale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="font-semibold text-teal-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.text}"</p>

              <div className="flex mt-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
