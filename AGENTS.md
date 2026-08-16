# Prime Point Wellness Agents

These instructions apply to all future Codex chats working in this repository. Prime Point Wellness is a luxury telehealth and wellness company. Keep all work premium, modern, clean, medical, and trustworthy.

## Required Workflow

- Read this `AGENTS.md` before every task.
- Inspect the repository before editing so changes fit the current file structure and existing work.
- Do not overwrite or revert unrelated user changes.
- Only edit files needed for the requested task.
- Do not delete pages unless the user specifically requests it.
- Do not break navigation between pages, anchors, buttons, scripts, or assets.
- Keep all pages mobile responsive.
- Preserve Prime Point Wellness branding across pages and components.
- After edits, list all modified files.
- After edits, summarize the changes made.

## Brand Direction

- Luxury telehealth and wellness company.
- Premium, modern, clean, medical, and trustworthy.
- Should feel polished, calm, confident, and high-touch.
- Avoid casual, gimmicky, cluttered, or overly clinical presentation.
- Keep medical and wellness language careful, educational, and non-guaranteed.

## Visual Design Direction

- Use warm ivory as the primary page background.
- Use dark navy for primary text, strong section partitions, and high-contrast panels.
- Use pale and slate blue for secondary surfaces, supporting details, and restrained depth.
- Use gold accents for premium emphasis, borders, highlights, icons, and calls to action.
- Use ivory typography on navy surfaces and navy typography on light surfaces.
- Use rounded cards and refined panel treatments.
- Keep layouts spacious with generous section rhythm and breathing room.
- Use subtle animations and transitions only where they make the experience feel smoother.
- Draw inspiration from Apple, Whoop, and Levels: minimal, premium, data-aware, health-forward, and highly polished.

## Website Editing Rules

- Preserve existing navigation and page relationships.
- Keep all visible pages accessible unless the user asks to remove or hide something.
- Maintain responsive behavior across desktop and mobile.
- Keep visual changes consistent with the established ivory, navy, blue, and gold luxury wellness system.
- Do not add unreviewed medical, legal, pricing, prescription, eligibility, diagnosis, treatment, cure, or guaranteed-results claims.
- Favor clear calls to action and trust-building language without overstating outcomes.
- Verify links, assets, and interactive behavior when editing website files.

## Repository Notes

Current primary website files include:
- `index.html`
- `glp-1s.html`
- `peptides.html`
- `privacy-policy.html`
- `terms-of-service.html`
- `styles.css`
- `script.js`

Supporting content and assets are stored in:
- `assets/`
- `research/`
- `revisions/`
- `Prime Point Health Logo/`

## Agent Roles

### Competitor Research Agent

Purpose: Research comparable telehealth, peptide, hormone, wellness, recovery, and performance-health websites to identify useful positioning, navigation patterns, offers, content structure, and trust-building language.

Responsibilities:
- Review competitor websites and summarize visible positioning, page structure, calls to action, and user journey patterns.
- Identify common service categories, trust signals, disclaimers, FAQs, and conversion flows.
- Note where competitors make strong claims, vague claims, or risky medical claims.
- Capture ideas that could improve Prime Point Wellness without copying competitor language.
- Save findings in `research/competitor-notes.md`.

Restrictions:
- Do not edit website files.
- Do not copy competitor copy verbatim into final website content.
- Do not make legal or medical determinations; flag issues for review instead.

### Legal Language Review Agent

Purpose: Review proposed Prime Point Wellness website language for legal, medical, and compliance risk, especially around peptides, GLP-1s, hormones, treatment claims, results, eligibility, prescriptions, and provider oversight.

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

### Synthesis Agent

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

### Website Implementation Agent

Purpose: Implement approved website updates after reviewing the research and final content brief.

Responsibilities:
- Read `research/final-content-brief.md` before making website changes when the task involves content, claims, positioning, or page messaging.
- Keep design consistent with the Prime Point Wellness visual system.
- Preserve navigation, responsive behavior, and brand consistency.
- Verify locally after changes when practical.
- Report changed files and verification steps.

Allowed website files:
- `index.html`
- `glp-1s.html`
- `peptides.html`
- `privacy-policy.html`
- `terms-of-service.html`
- `styles.css`
- `script.js`

Restrictions:
- Do not edit website files unless acting as the Website Implementation Agent or the user explicitly requests a website file change.
- Do not edit files outside the requested scope unless the user explicitly approves it.
- Do not overwrite unrelated user changes.
- Do not add unreviewed medical, legal, pricing, or treatment claims.
