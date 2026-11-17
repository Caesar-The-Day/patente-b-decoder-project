# Patente B

# Build: Patente B Decoder

Create a polished, mobile-first web application called **Patente B Decoder**, an interactive study companion for English-speaking learners preparing for the Italian Patente B driving theory exam.

## Product concept

Most Italian driving-test apps focus on practicing thousands of true/false questions. This app should do something different: help English speakers understand **why questions are difficult, what the Italian actually means, and how to recognize misleading wording**.

The core experience should be educational, approachable, and interactive. Think Duolingo meets driving-theory preparation, but without unnecessary gamification.

**Target audience:** English-speaking residents and prospective residents of Italy who need to pass the Italian driving theory exam and may struggle with technical vocabulary, grammatical nuances, and unfamiliar traffic regulations.

## Source material

Use these resources as references:

**Primary study guide:**
https://docs.google.com/document/d/1rvFj0aMQuXID_jylp7bY5cuXgRKoOxxo/edit

**Official Italian ministry question bank:**
https://www.ilportaledellautomobilista.it/documents/56611/57319/210926_Conseguimento%2BA-B%2Bitaliano.pdf/07091bb8-a16b-4fa1-b921-4fd21fa5b650

**Frequently missed questions:**
https://quiz-patente.com/dati/domande-piu-sbagliate/

**Vocabulary frequency analysis:**
https://docs.google.com/spreadsheets/d/1dXN52VlZPruaJjIxmxPhPf6TdmFel8Wa/edit

Use the existing 100-question study guide as the initial content dataset. If the links cannot be accessed, create a clearly labeled sample dataset and request an upload. Never fabricate official questions, answers, statistics, or legal explanations.

Preserve attribution to the original study-guide author and sources. Do not publish copyrighted or third-party content without appropriate permission.

## Main features

### 1. Dashboard

A clean homepage showing:

- Start studying
- Practice the 100 most-missed questions
- Learn the five common question traps
- Italian driving vocabulary
- Personal progress and accuracy
- Resume where I left off

Display a simple progress indicator and a daily study suggestion.

### 2. Interactive question practice

Show one question at a time.

Each question should include:

- Original Italian question, prominently displayed
- Associated road sign or illustration when available
- Two large answer buttons: **VERO** and **FALSO**
- An optional "Translate" button to reveal the English translation
- An optional "Explain vocabulary" button

After the learner answers, reveal:

- Correct answer
- Plain-English explanation
- Why the question is tricky
- The specific word, phrase, or technical distinction responsible for the trap
- An explanation of the relevant driving rule
- The reported error rate, when available
- A "Save for review" option

Highlight misleading or important Italian words directly in the question.

Do not reveal the correct answer until the learner responds.

### 3. Learn the five traps

Create interactive mini-lessons covering:

1. Negations and negative verbs: *non, senza, vieta*
2. Absolutes and limiters: *sempre, solo, anche, tutti*
3. Exceptions and conditions: *se, salvo, purché*
4. Numbers, units, and thresholds
5. Easily confused terms and swapped details

Each lesson should include a short explanation, authentic examples, and a five-question practice session.

Allow learners to return to the original question after completing an explanation.

### 4. Vocabulary trainer

Create interactive flashcards for the most useful driving-exam terminology.

Organize vocabulary by practical categories rather than raw frequency:

- Road signs and markings
- Vehicles and vehicle classifications
- Right of way and intersections
- Parking and stopping
- Speed, distances, and weight limits
- Mechanical and safety terminology
- Legal obligations and restrictions
- Misleading grammatical expressions

Each flashcard should show the Italian term, English meaning, an example in context, and an option to mark it as learned.

Prioritize terms appearing in the 100 most-missed questions. Do not initially import all 5,280 word forms.

### 5. Study modes

Provide four modes:

**Quick Practice:** 10 randomly selected questions.

**Most Missed:** Questions sorted by reported difficulty.

**My Weak Spots:** Questions previously answered incorrectly or saved for review.

**Exam Simulation:** A timed practice experience using the applicable official exam format, only after verifying that format. Clearly distinguish a simulation based on the available dataset from a full-bank exam simulation.

### 6. Learning analytics

Track:

- Questions attempted
- Correct answer percentage
- Accuracy by trap category
- Vocabulary learned
- Questions needing review
- Study sessions completed

Use local browser storage for the initial version. No registration or backend required.

Progress should persist between visits on the same browser, with an option to reset or export it.

## Design and user experience

Use a clean, modern, sophisticated visual style.

Design direction:

- Italian-inspired but restrained
- Warm off-white backgrounds
- Deep navy text
- Muted green and terracotta accents
- Excellent typography and generous spacing
- Large, comfortable controls for mobile users
- Clear feedback after each answer
- Responsive layouts for desktop, tablet, and phone

The target audience includes adults in their 50s, 60s, and 70s. Prioritize readability, accessibility, and simplicity over flashy animations.

Avoid cluttered dashboards, excessive badges, cartoon mascots, and unnecessary features.

## Technical requirements

- Build with React, TypeScript, and Tailwind.
- Use reusable components and a structured question dataset.
- Keep question content separate from application logic.
- Store progress locally for the MVP.
- No Supabase, authentication, paid APIs, or subscription infrastructure in version one.
- Make the site deployable as a static web application.
- Provide a simple mechanism to import additional validated questions later.
- Include source attribution and a disclaimer that the app is an independent study aid, not an official Italian government product.
- Ensure that images and explanations are associated with the correct question IDs.
- Never use AI to invent missing official answers or illustrations.

## Content quality

Every question should have a structured record containing:

- Official question identifier
- Original Italian text
- Official true/false answer
- English translation
- Plain-English explanation
- Trap category
- Relevant vocabulary
- Topic
- Reported error rate, if available
- Illustration reference, if applicable
- Source reference
- Content validation status

Separate verified official answers from AI-generated explanations.

Flag incomplete records rather than silently filling gaps.

## Initial build scope

Build a fully functioning MVP with:

- Dashboard
- Interactive question practice
- Five trap lessons
- Vocabulary flashcards
- Saved questions
- Local progress tracking
- Responsive design

Start with 20 accurately sourced, fully functional questions, then make it straightforward to import the remaining 80.

Prioritize working functionality over decorative features.

Do not implement payments, user accounts, leaderboards, AI chatbots, or a backend.

**Important:** Before implementing anything beyond the MVP, explain the proposed architecture and identify which content sources require manual import, permission, or validation.

The goal is to deliver a genuinely useful, lightweight study companion that could be shared with people preparing for the Italian driving theory exam without creating an expensive application to maintain.

I have permission to use the Google Drive study guide content with attribution. Use the extracted Patente B question guide: author Gregg Poss; official question source cited as Ministero delle Infrastrutture e dei Trasporti, Conseguimento A-B italiano (210926), text extracted in jmorgadov/patente-pronta (CC BY 3.0 IT); reported error-rate source cited by the guide as quiz-patente.com learner data matched to ministry question text by ministerial code. Preserve attribution and label error rates as non-official learner data. The table extraction includes the full 100 questions, guide rankings, Italian statements, English translations, answers and explanations, but not ministerial question codes. Do not invent those codes or claim they are independently re-verified against the ministry PDF. Use guide_rank as a source order only; mark official identifiers unavailable. Use the extracted source records to provide the requested starting 20 fully sourced questions and make the remaining 80 easy to import. Translate missing source records only if not already present; do not fabricate official content.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
