"""
Statistical Analysis of the 2,000 Extra Winners Corpus:
- Creativity Archetypes
- Sponsor Benefit Distributions
- Framing Formulas
- Condition Breakdown
- Smart Loser Traps & Why Winners Succeeded
"""

import json
import os
from collections import Counter

def analyze():
    path = os.path.join(os.path.dirname(__file__), "..", "data", "extra_winners_2000.json")
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    total = len(data)
    print(f"Total Extra Winners Audited: {total}")
    
    # 1. Cohorts
    cohorts = Counter(d["cohort"] for d in data)
    print("\n--- COHORT DISTRIBUTION ---")
    for k, v in cohorts.most_common():
        print(f"  {k}: {v} ({v/total*100:.1f}%)")
        
    # 2. Creativity Types
    creativities = Counter(d["creativity_type"] for d in data)
    print("\n--- CREATIVITY ARCHETYPES ---")
    for k, v in creativities.most_common():
        print(f"  {k}: {v} ({v/total*100:.1f}%)")
        
    # 3. Sponsor Benefits
    benefits = Counter(d["sponsor_benefit"] for d in data)
    print("\n--- SPONSOR BENEFITS (B1-B6) ---")
    for k, v in benefits.most_common():
        print(f"  {k}: {v} ({v/total*100:.1f}%)")
        
    # 4. Framing Formulas
    framings = Counter(d["framing_formula"] for d in data)
    print("\n--- FRAMING FORMULAS (F1-F7) ---")
    for k, v in framings.most_common():
        print(f"  {k}: {v} ({v/total*100:.1f}%)")
        
    # 5. Conditions
    conditions = Counter(d["condition"] for d in data)
    print("\n--- CONDITIONS (C1-C11) ---")
    for k, v in conditions.most_common():
        print(f"  {k}: {v} ({v/total*100:.1f}%)")

if __name__ == "__main__":
    analyze()
