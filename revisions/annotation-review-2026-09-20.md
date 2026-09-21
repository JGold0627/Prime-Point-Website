# Annotation review — September 20, 2026

Reviewed every annotation in this conversation against the current local website. Later revisions take precedence over earlier requests. No additional design or copy changes were needed during this review.

## Earlier annotations

| Area | Latest requested result | Review |
| --- | --- | --- |
| Peptides cards | Clinical standards cards scroll horizontally on phones; desktop keeps the three-card layout. | Confirmed. The preceding care pillars also scroll horizontally. |
| Peptides pharmacy copy | Include quality and compounding standards with a 3rd party certificate of analysis on all medication. | Confirmed in the Pharmacy Standards card. |
| Peptides buttons | Match the homepage button design. | Confirmed: navy pill, ivory text, gold arrow, matching subtle interaction styling. |
| Peptides animation | Use the homepage scroll reveal. | Confirmed: shared 620 ms fade/slide reveal, with reduced-motion support. |
| Peptides heading | “Peptides reviewed by physicians.” / “Our standard of care”. | Confirmed. This supersedes both earlier heading versions. |
| Compact navigation | Gold main categories; direct links above dropdown categories; ivory dropdown backgrounds; smaller, regular-weight sublinks. | Confirmed at 980, 390, and 320 px. Peptides and Blood Work are first. Categories are 19 px/700; sublinks are 16 px/400. Escape closes the menu. |
| GLP checks | Plain gold checkmarks on every GLP product page. | Confirmed on all four pages; no circular backgrounds. |
| GLP review marker | Gold dot before “Personalized review”. | Confirmed on all four pages. |
| GLP pricing | Apply the established 10% comparison-price calculation. | Confirmed: Semaglutide $239 / $266; Tirzepatide $339 / $377, including Drops. |
| GLP hero layout | Restore the original design before the review text was removed. | Confirmed: original introduction, review copy, prescription line, large price and discount restored. The interim centered price, “From:” row, and “Finally, weight loss made easy” version are superseded. |
| GLP replacement section | Replace the getting-started steps with the three image cards from the reference. | Confirmed on all four pages: Slows digestion, Regulates appetite hormones, Supports blood sugar. Reference wording is retained, with the medicine name matched to the page. The Get started link is present. |
| MIC+B12 benefits | Picture on the left; “Feel leaner, stronger, and more energized” with the three supplied explanations on the right. | Confirmed, including Energy Boost, Fat Metabolism, and Weight Loss Support wording. |
| MIC+B12 image breakdown | Add the three image cards below the benefits. | Confirmed. |
| MIC+B12 shared quality section | Shared picture and information below the three cards. | Confirmed: shared petri-dish image and the potency, sterility, endotoxin, and independent-verification information. |
| MIC+B12 second gallery view | Use the information view used across the site. | Confirmed. The second thumbnail opens the branded information panel; switching views retains the frame size. |
| Science cards on smaller screens | Horizontal scrolling for the matching sections across the website. | Confirmed for all six existing wellness science sections, all four GLP body sections, and both Peptides card groups. |
| Bottom buttons | Add the existing Get started design at the bottom of metabolic and longevity product pages, on desktop and phone. | Confirmed on Sermorelin, Tesamorelin, Glutathione, Glutathione Nasal, MIC+B12, NAD+, and NAD+ Nasal. Button behavior is noted separately below. |
| Blood Work buttons | Make all three membership Start now buttons the site navy. | Confirmed, with ivory text. |

## Latest product prices

The displayed comparison price uses the existing whole-dollar formula: round(final price / 0.90). All six final prices match the homepage and treatment listings.

| Product | Final price | Crossed-out comparison |
| --- | ---: | ---: |
| Sermorelin | $249 | $277 |
| Glutathione | $119 | $132 |
| Glutathione Nasal | $149 | $166 |
| MIC+B12 | $149 | $166 |
| NAD+ | $269 | $299 |
| NAD+ Nasal | $219 | $243 |

The final Glutathione and NAD+ instructions supersede earlier amounts in the conversation.

## Sublingual Drops follow-ups

- Both former tablet products are named Sublingual Drops in headings, descriptive copy, FAQs, menus, product listings, image descriptions, and page metadata.
- Both lifestyle images now show Prime Point dropper bottles with the existing hands and backgrounds; matching cutout images are used in listings and menus.
- Both science headings and “How does it feel…” headings use Sublingual Drops.
- The “In some people…” paragraph is replaced on both Drops pages with the requested summarized needle-free explanation.
- No tablet or pill references remain in visible page text or image descriptions across the 27 HTML pages checked. Existing tablet-named URLs remain in place to preserve links.
- The outdated tablet-format testimonial was removed from the two Drops pages rather than rewritten as a new customer claim.
- Image files and the built-in generation prompts are recorded in [the asset notes](../assets/glp-sublingual/README.md).

## Separate existing functionality gap

The Peptides Get Started Now buttons, wellness-product Get started buttons, and Blood Work membership Start now buttons have no click destination or visible action. This was confirmed by clicking representative controls and inspecting the shared handlers. The wellness script explicitly marks its buttons as awaiting an intake connection.

The GLP hero, options, and new body-section buttons do open create-account.html. No forms were submitted and no enrollments or purchases were made during the review.

These inactive controls are separate from the completed requests to change their appearance or add matching buttons. No new intake or checkout destination was chosen during this review.

## Verification

- Checked 15 annotated pages at 1440, 980, 390, and 320 px: 60 layout combinations, with no page-level horizontal overflow.
- Confirmed each annotated horizontal card group scrolls to its last card without clipping, and desktop card layouts remain in place.
- Checked all seven wellness product galleries: opening adjacent FAQs does not resize the photos or move their thumbnails.
- Visually reviewed the MIC+B12 benefits section and mobile information view.
- Verified navigation hierarchy, styling, long product-label fit, and Escape behavior at compact widths.
- Confirmed latest prices and the restored GLP layout against the final instructions.

## Files changed in this review

- This review document only. Website files were not changed.
