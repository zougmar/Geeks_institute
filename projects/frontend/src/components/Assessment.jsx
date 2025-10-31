import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      category: "Transformation digitale",
      question: "Quel est votre niveau de compréhension des technologies émergentes (IA, IoT, Blockchain) ?",
      options: [
        { value: 1, label: "Débutant - Je connais les termes mais pas les concepts" },
        { value: 2, label: "Intermédiaire - Je comprends les concepts de base" },
        { value: 3, label: "Avancé - Je peux expliquer et appliquer ces technologies" },
        { value: 4, label: "Expert - Je maîtrise et innove avec ces technologies" }
      ]
    },
    {
      id: 2,
      category: "Agilité",
      question: "À quelle fréquence participez-vous à des méthodologies agiles (Scrum, Kanban) ?",
      options: [
        { value: 1, label: "Jamais" },
        { value: 2, label: "Rarement" },
        { value: 3, label: "Régulièrement" },
        { value: 4, label: "Quotidiennement" }
      ]
    },
    {
      id: 3,
      category: "Innovation",
      question: "Comment évaluez-vous votre capacité à générer de nouvelles idées ?",
      options: [
        { value: 1, label: "Je préfère suivre des instructions existantes" },
        { value: 2, label: "Je suggère parfois des améliorations" },
        { value: 3, label: "Je propose régulièrement de nouvelles approches" },
        { value: 4, label: "Je suis un moteur d'innovation dans mon équipe" }
      ]
    },
    {
      id: 4,
      category: "Expérience client",
      question: "Quelle est votre approche pour comprendre les besoins des clients ?",
      options: [
        { value: 1, label: "Je me fie aux suppositions" },
        { value: 2, label: "Je lis occasionnellement les retours clients" },
        { value: 3, label: "J'analyse activement les retours et données clients" },
        { value: 4, label: "Je mène des études et interviews pour comprendre en profondeur" }
      ]
    },
    {
      id: 5,
      category: "Technologie",
      question: "Quel est votre niveau d'aisance avec les outils collaboratifs numériques ?",
      options: [
        { value: 1, label: "Je maîtrise les fonctions de base" },
        { value: 2, label: "Je suis à l'aise avec la plupart des fonctionnalités" },
        { value: 3, label: "J'explore et utilise des fonctionnalités avancées" },
        { value: 4, label: "Je forme les autres sur ces outils" }
      ]
    }
  ];

  const handleAnswer = (value) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: value
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    const categories = {};
    questions.forEach(q => {
      if (!categories[q.category]) {
        categories[q.category] = 0;
      }
      categories[q.category] += answers[q.id] || 0;
    });

    return categories;
  };

  const getLevel = (score) => {
    if (score <= 2) return "Débutant";
    if (score <= 4) return "Intermédiaire";
    if (score <= 6) return "Avancé";
    return "Expert";
  };

  const getScoreColor = (score) => {
    if (score <= 2) return "text-red-600";
    if (score <= 4) return "text-yellow-600";
    if (score <= 6) return "text-blue-600";
    return "text-green-600";
  };

  if (showResults) {
    const results = calculateResults();
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-bold text-teal-900 mb-6">
                Vos résultats d'évaluation digitale
              </h2>

              <div className="space-y-6">
                {Object.entries(results).map(([category, score]) => (
                  <div key={category} className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium text-gray-900">{category}</h3>
                      <span className={`font-bold ${getScoreColor(score)}`}>
                        {getLevel(score)}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-pink-600 h-2 rounded-full" 
                          style={{ width: `${(score / 4) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex-1 bg-pink-700 text-white px-6 py-3 rounded-lg hover:bg-pink-800 transition font-medium"
                >
                  Voir mon tableau de bord
                </button>
                <button
                  onClick={() => {
                    setCurrentQuestion(0);
                    setAnswers({});
                    setShowResults(false);
                  }}
                  className="flex-1 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Recommencer l'évaluation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-teal-900">
                Question {currentQuestion + 1} sur {questions.length}
              </h2>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">Catégorie:</span>
                <span className="text-sm font-medium text-pink-700">
                  {questions[currentQuestion].category}
                </span>
              </div>
            </div>

            <div className="mb-8">
              <div className="bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-pink-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    answers[questions[currentQuestion].id] === option.value
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleAnswer(option.value)}
                >
                  <div className="flex items-center">
                    <div
                      className={`h-4 w-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                        answers[questions[currentQuestion].id] === option.value
                          ? 'border-pink-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {answers[questions[currentQuestion].id] === option.value && (
                        <div className="h-2 w-2 rounded-full bg-pink-500"></div>
                      )}
                    </div>
                    <span className="text-gray-700">{option.label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-between">
              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  currentQuestion === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Précédent
              </button>
              <button
                onClick={nextQuestion}
                disabled={!answers[questions[currentQuestion].id]}
                className={`px-6 py-3 rounded-lg font-medium transition ${
                  !answers[questions[currentQuestion].id]
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-pink-700 text-white hover:bg-pink-800'
                }`}
              >
                {currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
