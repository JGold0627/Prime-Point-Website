# Project Agents

This file defines the working roles for improving the Prime Point Health website. Agents should keep outputs clear, sourced where appropriate, and scoped to their assigned responsibilities.

## 1. Competitor Research Agent

Purpose: Research comparable telehealth, peptide, hormone, wellness, recovery, and performance-health websites to identify useful positioning, navigation patterns, offers, content structure, and trust-building language.

Responsibilities:
- Review competitor websites and summarize visible positioning, page structure, calls to action, and user journey patterns.
- Identify common service categories, trust signals, disclaimers, FAQs, and conversion flows.
- Note where competitors make strong claims, vague claims, or risky medical claims.
- Capture ideas that could improve Prime Point Health without copying competitor language.
- Save findings in `research/competitor-notes.md`.

Restrictions:
- Do not edit website files.
- Do not copy competitor copy verbatim into final website content.
- Do not make legal or medical determinations; flag issues for review instead.

## 2. Legal Language Review Agent

Purpose: Review proposed Prime Point Health website language for legal, medical, and compliance risk, especially around peptides, treatment claims, results, eligibility, prescriptions, and provider oversight.

Responsibilities:
- Review claims for risk level and clarity.
- Flag language that may imply guaranteed outcomes, diagnosis, treatment, cure, or universal eligibility.
- Recommend safer alternatives for high-risk wording.
- Keep language educational, provider-reviewed, and non-guaranteed.
- Save findings in `research/legal-language-review.md`.

Restrictions:
- Do not edit website files.
- Do not provide formal legal advice.
- Do not approve claims as legally compliant; describe concerns and safer wording options.

## 3. Synthesis Agent

Purpose: Combine competitor research and legal-language review into a concise content and implementation brief for the website.

Responsibilities:
- Read `research/competitor-notes.md` and `research/legal-language-review.md`.
- Identify the strongest safe positioning themes.
- Recommend final page content direction, navigation needs, CTA language, disclaimer placement, and content priorities.
- Produce a practical brief for implementation.
- Save the final brief in `research/final-content-brief.md`.

Restrictions:
- Do not edit website files.
- Do not introduce new claims that were not reviewed.
- Do not make final design changes directly.

## 4. Website Implementation Agent

Purpose: Implement approved website updates after reviewing the research and final content brief.

Responsibilities:
- Read `research/final-content-brief.md` before making website changes.
- Edit the website only after content direction is synthesized and ready.
- Keep design consistent with the existing Prime Point Health visual system.
- Preserve responsive behavior and verify locally after changes.
- Report changed files and verification steps.

Allowed website files:
- `index.html`
- `styles.css`
- `script.js`

Restrictions:
- This is the ONLY agent allowed to edit `index.html`, `styles.css`, or `script.js`.
- Do not edit files outside the allowed website files unless the user explicitly approves it.
- Do not overwrite unrelated user changes.
- Do not add unreviewed medical, legal, pricing, or treatment claims.
