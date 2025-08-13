data = [
    {"question": "What is Baby Yoda's real name?", "answer": "Grogu"},
    {"question": "Where did Obi-Wan take Luke after his birth?", "answer": "Tatooine"},
    {"question": "What year did the first Star Wars movie come out?", "answer": "1977"},
    {"question": "Who built C-3PO?", "answer": "Anakin Skywalker"},
    {"question": "Anakin Skywalker grew up to be who?", "answer": "Darth Vader"},
    {"question": "What species is Chewbacca?", "answer": "Wookiee"}
]

def run_quiz(data):
    correct = 0
    incorrect = 0
    wrong_answers = []

    for item in data:
        user_answer = input(item["question"] + " ").strip()

        if user_answer.lower() == item["answer"].lower():
            print("✅ Correct!")
            correct += 1
        else:
            print(f"❌ Wrong! The correct answer was: {item['answer']}")
            incorrect += 1
            wrong_answers.append({
                "question": item["question"],
                "your_answer": user_answer,
                "correct_answer": item["answer"]
            })

    return correct, incorrect, wrong_answers

def show_results(correct, incorrect, wrong_answers):
    print("\n📊 Quiz Results 📊")
    print(f"✅ Correct answers: {correct}")
    print(f"❌ Incorrect answers: {incorrect}")

    if incorrect == 0:
        print("🌟 Perfect score! The Force is strong with you!")
    elif correct > incorrect:
        print("👍 Not bad, young Padawan!")
    else:
        print("😅 You might want to rewatch the saga.")

    if wrong_answers:
        print("\n🔍 Review your mistakes:")
        for item in wrong_answers:
            print(f"- Q: {item['question']}")
            print(f"  Your answer: {item['your_answer']}")
            print(f"  Correct answer: {item['correct_answer']}")

# ---- Run the quiz ----
correct, incorrect, wrong_answers = run_quiz(data)
show_results(correct, incorrect, wrong_answers)
