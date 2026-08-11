# Prime Point V2 Project Rules

Prime Point V2 is being built as a component-based luxury telehealth website.

## Workflow

- Josh is Product Owner.
- ChatGPT is Lead Architect / Creative Director.
- Codex is Implementation Developer.
- Codex should not make creative decisions.
- Codex should only edit files explicitly assigned in the prompt.

## Build Strategy

- Do not build full pages first.
- Build reusable global components first.
- Then assemble pages one section at a time.
- Reference images are visual targets, and only to be used as direct inputs when directed to.
- Approved components become locked and reusable.

## CSS Ownership

- `css/global.css` contains shared reset, variables, typography, header, footer, buttons, reusable hero system, reusable cards, reusable metrics bands, reusable forms, reusable section shells, and utilities.
- `css/home.css` contains homepage-only styles.
- `css/peptides.css` contains peptides-only styles.
- `css/glp.css` contains GLP-only styles.
- `css/bloodwork.css` contains bloodwork-only styles.
- `css/supplements.css` contains supplements-only styles.
- `css/about.css` contains about-only styles.
- `css/faq.css` contains FAQ/support-only styles.

## Chat Ownership

- 00 Rules owns `AGENTS.md`, `PROJECT_RULES.md`, `DESIGN_SYSTEM.md`.
- Prime Point Architecture owns folder structure, routing, asset organization, and architecture decisions.
- 11 Component Library owns `css/global.css` and reusable component specs.
- 01 Homepage owns `index.html` and `css/home.css`.
- 02 Peptides owns `peptides.html` and `css/peptides.css`.
- 03 GLP-1's owns `glp-1s.html` and `css/glp.css`.
- 04 Blood Work owns `blood-work.html` and `css/bloodwork.css`.
- 05 Supplement Planning owns `supplements.html` and `css/supplements.css`.
- 06 About owns `about.html` and `css/about.css`.

## Asset Rules

- `assets/brand` = logo, favicon, brand marks.
- `assets/references` = approved design reference images.
- `assets/icons` = shared icons.
- `assets/backgrounds` = shared textures, particles, waves.
- `assets/home` = homepage-only assets.
- `assets/peptides` = peptides-only assets.
- `assets/glp` = GLP-only assets.
- `assets/bloodwork` = bloodwork-only assets.
- `assets/supplements` = supplement-only assets.

## Hard Rules

- Do not place loose assets directly in `/assets`.
- Do not duplicate shared components inside page CSS.
- Do not modify `global.css` from page-specific chats.
- Do not edit unrelated files.
- Do not add large override blocks.
- Do not rebuild locked components unless explicitly approved.
- Every milestone should be commit-ready.
