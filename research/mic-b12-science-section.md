# MIC + B12 science and shared quality sections

Date: September 8, 2026

## Scope and layout

Added three photo cards after the existing benefits section on `mic-b12.html`, titled “How MIC + B12 works in the body.” The cards follow the NAD+ page's typography, borders, spacing, and responsive layout. The shared quality section follows them with the existing petri dish photo, heading, introduction, and four accordion rows copied unchanged from `nad-plus.html`. Only the section's class, ID, and accordion-group prefixes differ.

The three science photographs are new, unique assets. Reuse of the quality photo and content is explicitly authorized by the user. The quality photo uses the collapsed text column's height on desktop and does not resize when an accordion opens. Science photo dimensions depend on card width, not description length.

## New descriptions and source review

### Fat metabolism

Choline helps the liver package and move fats through the body. Methionine contributes to the chemical reactions involved in normal nutrient metabolism.

Sources: [NIH Office of Dietary Supplements: Choline](https://ods.od.nih.gov/factsheets/Choline-HealthProfessional/) explains choline's roles in lipid transport and metabolism; [National Cancer Institute: Methionine and cellular metabolism](https://www.cancer.gov/news-events/cancer-currents-blog/2019/targeting-cancer-metabolism-low-methionine-diet) describes methionine as an essential amino acid involved in cellular metabolism. The page copy describes normal nutrient functions and does not infer weight-loss efficacy from these sources.

### Cellular signaling

Inositol forms part of cell membranes and signaling molecules. These signals help cells respond to hormones and coordinate everyday metabolic processes.

Sources: [NIH: Tamas Balla's phosphoinositide signaling research](https://irp.nih.gov/pi/tamas-balla) describes membrane-associated inositol lipids and their roles in hormonal signaling and metabolism; [NIH: James Putney's calcium signaling research](https://irp.nih.gov/pi/james-putney) explains hormone-triggered signaling through inositol trisphosphate. The copy summarizes normal cellular mechanisms; it does not make a claim about treating insulin resistance or other conditions.

### Energy support

Vitamin B12 supports healthy red blood cell formation and normal nerve function. Correcting low B12 can help address fatigue caused by a deficiency.

Source: [NIH Office of Dietary Supplements: Vitamin B12](https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/) describes red blood cell and nervous-system functions, deficiency-related fatigue, and treatment of deficiency. The wording limits the fatigue benefit to low B12; it does not promise additional energy in people with adequate levels.

This is an editorial source review of the new descriptions, not a clinical or legal approval. Existing user-provided benefits, FAQs, pricing, and shared quality wording were preserved.

## Image generation

Mode: built-in image generation, one new image per card. No existing image was used as a reference or edited. Original generated files were retained, and selected assets were copied into the website workspace.

### Common prompt prefix

Use case: photorealistic-natural. Create one new original square editorial photograph for a luxury telehealth website science card. Warm ivory, muted slate blue, soft natural gold sunlight, and restrained greenery. Authentic natural textures and realistic anatomy. Calm, premium, uncluttered, no typography, labels, logos, watermark, collage, graphic overlays, or before-and-after comparison. Keep the important subject comfortably centered for a small square card. People should look at what they are doing, never toward the camera.

Each final prompt consists of that prefix followed by its scene below.

### Fat metabolism photograph

Scene: candid side view of a woman in her late forties with dark hair loosely tied back, wearing a pale blue linen shirt, preparing a simple balanced lunch at a light limestone kitchen counter. She is arranging leafy greens and sliced boiled eggs onto an ivory ceramic plate, with olive oil and avocado nearby. Sunlight enters from the side. A close waist-up editorial composition emphasizing the hands, nourishing food, and calm everyday routine; realistic hands and food, no staged fitness pose.

Final asset: `C:/Users/Goldj/Prime-Point-Website/assets/products/mic-b12-metabolism-v1.png`

Original: `C:/Users/Goldj/.codex/generated_images/01a07a4b-a8a5-7510-b234-251442c0dcb6/exec-ce48de25-2666-4c98-8e64-592c1ab2d256.png`

### Cellular signaling photograph

Scene: close side-angle documentary photograph in a refined bright laboratory. A researcher in a white coat and pale blue gloves carefully uses a micropipette over a small clear laboratory sample tray. The gloved hands and instrument are in crisp focus; the researcher's face is outside the frame. Soft ivory work surface, muted blue laboratory details, natural side light. Realistic laboratory setup with correct hands and instruments. No readable markings.

Final asset: `C:/Users/Goldj/Prime-Point-Website/assets/products/mic-b12-signaling-v1.png`

Original: `C:/Users/Goldj/.codex/generated_images/01a07a4b-a8a5-7510-b234-251442c0dcb6/exec-8dde29aa-57ad-47b0-9ee8-de3dd74e9ec8.png`

### Energy support photograph

Scene: a man in his late forties with short dark hair lightly graying at the temples, wearing an unbranded navy athletic T-shirt and light stone-colored shorts, casually stretching his shoulders beside a wooden bench on a sunlit park path. Relaxed expression as he looks to the side toward the trees, away from camera. Medium waist-up composition, authentic everyday movement, natural physique, softly blurred green foliage and warm morning light. No extreme exercise or exaggerated muscles.

Final asset: `C:/Users/Goldj/Prime-Point-Website/assets/products/mic-b12-energy-v1.png`

Original: `C:/Users/Goldj/.codex/generated_images/01a07a4b-a8a5-7510-b234-251442c0dcb6/exec-ff35613b-6e70-45b3-9454-33b4bd96915d.png`

All three images are 1254 × 1254 PNGs. Each was inspected for composition, anatomy, and suitability at its final card size.

## Verification

- Checked 320, 390, 768, 1115, and 1440 pixel viewport widths with no page overflow.
- Opened each of the four quality accordions at every width; the shared photo's dimensions stayed fixed. On desktop its height matches the collapsed copy column.
- Product photo and gallery thumbnails kept their dimensions and page positions when the product FAQ expanded.
- The science photos remain square and unchanged when a card's description grows.
- Confirmed exact shared quality markup equality after normalizing section prefixes.
- All 46 distinct local page references resolve; no broken images, duplicate IDs, or browser script errors were found.
- Confirmed the new science and quality blocks use the site's existing scroll reveal animation.
- Visually checked the desktop science cards, desktop quality section, and phone science cards. Whitespace checks passed.
