# Prime Point V2 Design System

Prime Point V2 is a component-based luxury telehealth website. This document defines the shared visual direction and implementation guardrails for future work. Codex should treat this as a specification from Product Owner and Creative Director guidance, not as permission to make new creative decisions.

## Brand Feel

- Luxury telehealth and wellness.
- Premium, modern, clean, medical, and trustworthy.
- Calm, precise, high-touch, and polished.
- Inspired by Apple, Whoop, and Levels: spacious, minimal, data-aware, health-forward, and refined.
- Avoid gimmicky wellness language, cluttered marketing layouts, heavy ornament, and unreviewed medical claims.

## Visual Foundation

- Deep green and black backgrounds form the base environment.
- Gold is the primary accent for premium emphasis, borders, highlights, icons, and calls to action.
- Cream and white typography provide warmth, clarity, and contrast.
- Cards and panels should feel rounded, elevated, and intentional.
- Motion should be subtle and smooth, used only to improve polish or comprehension.

## Color Direction

Primary surfaces:
- Deep green for branded section backgrounds and rich page depth.
- Near-black for global page backgrounds, headers, footers, and high-contrast areas.

Typography:
- Cream for warm primary text on dark surfaces.
- White for high-contrast emphasis.
- Muted light neutrals for secondary text.

Accent:
- Gold for CTAs, thin borders, premium dividers, small icons, glows, and important highlights.
- Gold should be used sparingly so it remains premium.

Avoid:
- Bright clinical blues as dominant colors.
- Large flat beige sections.
- Heavy purple, blue-purple, brown, or orange themes.
- One-note pages built from only one hue family.

## Typography

- Typography should feel crisp, premium, and easy to scan.
- Hero headlines may be large and spacious.
- Interior section headings should be controlled and proportional to their container.
- Body copy should be readable and calm, with generous line height.
- Do not use negative letter spacing.
- Do not scale font sizes directly with viewport width.
- Avoid oversized type inside cards, dashboards, forms, or compact panels.

## Layout

- Build reusable global components first, then assemble page sections one at a time.
- Use spacious section rhythm with clear vertical breathing room.
- Prefer full-width section bands or unframed layouts with constrained inner content.
- Do not place UI cards inside other cards.
- Do not style entire page sections as floating cards.
- Use stable dimensions for cards, metrics, hero media, dashboards, icon buttons, and repeated grids so content does not jump or overlap.
- Every section must remain mobile responsive.

## Component System

Global reusable components belong in `css/global.css` and should be shared across pages:
- Reset and base variables.
- Typography system.
- Header and navigation.
- Footer.
- Buttons and CTA patterns.
- Reusable hero system.
- Reusable cards.
- Reusable metrics bands.
- Reusable forms.
- Reusable section shells.
- Utilities.

Page-specific CSS must only contain page-specific composition and refinements:
- `css/home.css` for homepage-only styles.
- `css/peptides.css` for peptides-only styles.
- `css/glp.css` for GLP-only styles.
- `css/bloodwork.css` for bloodwork-only styles.
- `css/supplements.css` for supplements-only styles.
- `css/about.css` for about-only styles.
- `css/faq.css` for FAQ/support-only styles.

## Buttons and CTAs

- Primary CTAs should feel premium, decisive, and restrained.
- Gold accents may appear in backgrounds, borders, icons, or hover states.
- Buttons should have clear affordance and consistent sizing.
- Use icon buttons where familiar icons communicate the action better than text.
- CTA labels should be clear and safe; avoid guarantees or medical overclaims.

## Cards and Panels

- Cards should use rounded corners and refined borders.
- Use subtle depth, translucency, or gradients only when they support the luxury medical feel.
- Card content should be scannable, with clear hierarchy and enough internal spacing.
- Avoid dense text blocks and large override styles inside page CSS.
- Shared card patterns should be promoted to the global component layer.

## Imagery and Assets

- Reference images are visual targets and should only be used as direct inputs when explicitly directed.
- Use approved asset folders:
  - `assets/brand` for logo, favicon, and brand marks.
  - `assets/references` for approved design reference images.
  - `assets/icons` for shared icons.
  - `assets/backgrounds` for shared textures, particles, and waves.
  - `assets/home` for homepage-only assets.
  - `assets/peptides` for peptides-only assets.
  - `assets/glp` for GLP-only assets.
  - `assets/bloodwork` for bloodwork-only assets.
  - `assets/supplements` for supplement-only assets.
- Do not place loose assets directly in `/assets`.
- Primary images should support the actual product, service, health journey, dashboard, treatment category, or brand experience.

## Motion

- Use subtle transitions and restrained animation.
- Motion should feel smooth, modern, and premium.
- Avoid distracting loops, excessive parallax, or animations that reduce readability.
- Respect responsive behavior and reduced-motion expectations when implementing motion.

## Accessibility and Responsiveness

- Maintain strong text contrast on dark backgrounds.
- Ensure touch targets are comfortable on mobile.
- Prevent text overlap, clipping, or unreadable line breaks.
- Preserve navigation behavior on desktop and mobile.
- Check layouts across mobile and desktop before considering a component milestone complete.

## Content Safety

- Keep medical and wellness language educational, provider-guided, and non-guaranteed.
- Do not imply guaranteed outcomes, diagnosis, treatment, cure, universal eligibility, or prescription approval.
- Do not add unreviewed pricing, legal, prescription, eligibility, or medical claims.
- Use trust-building language without overstating results.

## Locked Component Rule

- Approved components become locked and reusable.
- Do not rebuild locked components unless Josh or the Creative Director explicitly approves it.
- When a component needs a variation, extend the existing component pattern instead of duplicating it in page CSS.
- Every milestone should be clean, scoped, and commit-ready.
