import json
import datetime

# --- Load Data ---
with open("data/candidates.json") as f:
    candidates = json.load(f)

with open("data/jobs.json") as f:
    jobs = json.load(f)

shortlists = {}  # in-memory storage


# --- Helper Functions ---

def parse_query(text):
    """Very simple parser to extract filters from user query (stub)."""
    # TODO: Replace with NLP or regex extraction
    return {
        "role": "intern" if "intern" in text.lower() else None,
        "skills": ["React"] if "react" in text.lower() else [],
        "location": "Casablanca" if "casablanca" in text.lower() else None,
        "minExp": 0,
        "maxExp": 2,
        "availabilityWindowDays": 30
    }


def score_candidate(c, filters, job=None):
    """Compute score based on rules."""
    score = 0
    reason_parts = []

    # Skill match
    if job:
        required_skills = job["skillsRequired"]
    else:
        required_skills = filters.get("skills", [])
    matches = set(required_skills) & set(c["skills"])
    score += len(matches) * 2
    if matches:
        reason_parts.append(f"{'+'.join(matches)} match (+{len(matches)*2})")

    # Location
    if filters.get("location") and c["location"].lower() == filters["location"].lower():
        score += 1
        reason_parts.append("location match (+1)")

    # Experience
    exp = c["experienceYears"]
    if filters.get("minExp") is not None and filters.get("maxExp") is not None:
        if filters["minExp"] - 1 <= exp <= filters["maxExp"] + 1:
            score += 1
            reason_parts.append("experience fits (+1)")

    # Availability
    if filters.get("availabilityWindowDays"):
        avail_date = datetime.datetime.strptime(c["availabilityDate"], "%Y-%m-%d").date()
        today = datetime.date.today()
        delta = (avail_date - today).days
        if 0 <= delta <= filters["availabilityWindowDays"]:
            score += 1
            reason_parts.append("available soon (+1)")

    reason = ", ".join(reason_parts) + f" → score {score}"
    return score, reason


def search_candidates(filters):
    """Return top 5 matches with reasons."""
    results = []
    for c in candidates:
        score, reason = score_candidate(c, filters)
        results.append({"candidate": c, "score": score, "reason": reason})
    results.sort(key=lambda x: x["score"], reverse=True)
    return results[:5]


def save_shortlist(name, indices, results):
    """Save chosen candidates from search results."""
    shortlists[name] = [results[i-1]["candidate"] for i in indices]
    print(f"✅ Saved {len(indices)} candidates to shortlist '{name}'")


def draft_email(recipients, job_title, tone="friendly"):
    job = next((j for j in jobs if j["title"].lower() == job_title.lower()), None)
    if not job:
        return None

    subject = f"Exciting {job['title']} opportunity in {job['location']}"
    closing = "Looking forward to your reply." if tone == "friendly" else "Best regards."

    text = f"""
Hi {recipients[0]['firstName']},

We are currently hiring for a {job['title']} role in {job['location']}.
{job['jdSnippet']}

{closing}
HR Team
"""

    email = {"subject": subject, "text": text, "closing": closing}
    return email


def html_template(email):
    return f"""
<html>
  <body style="font-family: Arial; line-height:1.5;">
    <h3>{email['subject']}</h3>
    <pre>{email['text']}</pre>
  </body>
</html>
"""


def analytics_summary():
    from collections import Counter
    stage_counts = Counter(c["stage"] for c in candidates)
    skills = [s for c in candidates for s in c["skills"]]
    top_skills = Counter(skills).most_common(3)
    return stage_counts, top_skills


# --- Simple CLI Loop ---
if __name__ == "__main__":
    print("🤖 HR Agent ready. Type 'exit' to quit.")
    last_output = None
    results = []  # keep last search results too

    while True:
        cmd = input("> ").strip()
        
        if cmd.lower() == "exit":
            print("👋 Goodbye!")
            break
        if cmd == "":
            if last_output:
                print(last_output)
            else:
                print("ℹ️ Nothing to repeat yet.")
            continue 

        if cmd.lower().startswith("find"):
            filters = parse_query(cmd)
            results = search_candidates(filters)
            out_lines = []
            for i, r in enumerate(results, 1):
                c = r["candidate"]
                out_lines.append(f"#{i}: {c['firstName']} {c['lastName']} - {r['reason']}")
            last_output = "\n".join(out_lines)
            print(last_output)

        elif cmd.lower().startswith("save"):
            parts = cmd.split()
            indices = [int(x.strip("#")) for x in parts if x.startswith("#")]
            name = parts[-1].strip('"')
            save_shortlist(name, indices, results)
            last_output = f"✅ Saved {len(indices)} candidates to shortlist '{name}'"

        elif cmd.lower().startswith("draft"):
            parts = cmd.split('"')
            shortlist_name = parts[1]
            job_title = parts[3]
            recs = shortlists[shortlist_name]
            email = draft_email(recs, job_title)
            out = (
                f"Subject: {email['subject']}\n\n"
                f"Plain text:\n{email['text']}\n\n"
                f"HTML Preview:\n{html_template(email)}"
            )
            print(out)
            last_output = out

        elif cmd.lower().startswith("show analytics"):
            stage_counts, top_skills = analytics_summary()
            out = f"Pipeline by stage: {dict(stage_counts)}\nTop skills: {top_skills}"
            print(out)
            last_output = out

        elif cmd.lower().startswith("add"):
            # Example: Add "Sara Amrani" Casablanca 1 React,JS,HTML 2025-10-01
            parts = cmd.split('"')
            name = parts[1].split()
            first, last = name[0], " ".join(name[1:])
            other = parts[2].strip().split()
            location = other[0]
            exp = int(other[1])
            skills = other[2].split(",")
            avail = other[3]

            new_cand = {
                "firstName": first,
                "lastName": last,
                "email": f"{first.lower()}@example.com",
                "location": location,
                "experienceYears": exp,
                "skills": skills,
                "availabilityDate": avail,
                "stage": "SOURCED",
                "notes": ""
            }

            candidates.append(new_cand)

            # Optional: persist to JSON
            with open("data/candidates.json", "w") as f:
                json.dump(candidates, f, indent=2)

            last_output = f"👤 Added candidate {first} {last}"
            print(last_output)

        else:
            print("❓ Unknown command")
