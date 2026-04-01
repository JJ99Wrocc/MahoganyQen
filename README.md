PL


👑 Mahogany Qen | High-End Booking Engine
🔗 Domain: mahoganyqen.com (Hosted on Home.pl)
⚙️ Backend: Deployed on https://www.google.com/search?q=Render.com
📖 O Projekcie
Mahogany Qen to zaawansowana platforma rezerwacyjna typu "Premium Concierge", stworzona dla sektora usług profesjonalnych wymagających najwyższego poziomu dyskrecji i automatyzacji. Projekt demonstruje umiejętność łączenia nowoczesnych frameworków frontendowych z pancernym backendem i zewnętrznymi usługami Google Cloud.

🚀 Key Engineering Highlights
1. Inteligentna Synchronizacja (Google Calendar API v3)
System eliminuje problem "Double Booking".

Real-time Availability: Backend (Node.js) komunikuje się z Google Service Account, pobierając aktualne terminy bezpośrednio z kalendarza Google.

Dynamiczne Filtrowanie: Lokalna baza danych (MongoDB) współpracuje z API Google, aby w locie wykluczać zajęte sloty i potwierdzone rezerwacje.

🛡️ 2. Architektura Bezpieczeństwa (Security Hardened)
Projekt został zabezpieczony przed najpopularniejszymi wektorami ataków:

Anti-Spam / Anti-Bot: Wdrożony autorski system Crypto Tokens (CSRF prevention) oraz technika Honeypot, która skutecznie odcina boty od formularza rezerwacji.

Data Protection: Implementacja nagłówków Helmet.js, poluzowana selektywnie pod specyficzne wymagania hostingu, oraz Rate Limiting, chroniący infrastrukturę przed atakami Brute-force.

Validation: Zaawansowana walidacja numerów telefonów (ISO standards) oraz adresów e-mail z wykrywaniem popularnych literówek.

⚡ 3. Performance & SEO (Lighthouse Optimized)
Hardcore Caching: Skonfigurowany pancerz pamięci podręcznej dla plików statycznych (Cache-Control: immutable), co skraca czas ładowania (LCP) do minimum.

Modern Assets: Wykorzystanie formatów WebP oraz techniki Preload dla kluczowych grafik (Hero Image).

Semantic SEO: Pełne wdrożenie mikrodanych JSON-LD (Schema.org) dla FAQ i Professional Services, co skutkuje bogatymi wynikami (Rich Snippets) w Google.

🌍 4. Globalny Zasięg (i18n)
Aplikacja jest w pełni wielojęzyczna (6 języków: EN, PL, DE, ES, RU, UA) przy użyciu i18next, co obejmuje nie tylko interfejs, ale i komunikaty błędów oraz potwierdzenia e-mail.

🛠 Tech Stack
Frontend: React 19 (Hooks, Context API), Firebase Auth (Security), React-DatePicker.

Backend: Node.js, Express.js, Mongoose.

Database: MongoDB Atlas.

Komunikacja: Resend API (Transakcyjne E-maile), Google Cloud Console (Service Accounts).

DevOps: Render (Backend), Home.pl (DNS & Domain Management), Git.

🏗 Jak uruchomić lokalnie?
Sklonuj repozytorium: git clone https://github.com/JJwrocc/mahogany-qen.git

Skonfiguruj .env (klucze do MongoDB, Google API, Resend).

Zainstaluj zależności: npm install.

Uruchom serwer: npm start.

Joachim Esangbedo (JJwrocc) Fullstack Developer | JavaScript Specialist   



ENG 



👑 Mahogany Qen | High-End Booking Engine & Web Experience
🔗 Production Domain: mahoganyqen.com (Configured via Home.pl)
⚙️ Backend API: Render.com (Cloud Deployment)
📖 Project Overview
Mahogany Qen is a sophisticated "Premium Concierge" booking platform designed for high-end professional services requiring absolute discretion and seamless automation. This project demonstrates the ability to integrate modern frontend frameworks with a hardened backend and the Google Cloud ecosystem.

🚀 Key Engineering Highlights
1. Smart Availability Sync (Google Calendar API v3)
The system eliminates "Double Booking" issues through a multi-layered synchronization logic:

Real-time Integration: The Node.js backend communicates with a Google Service Account to fetch live schedules.

Dynamic Filtering: The application cross-references the Google Calendar feed with the local MongoDB instance to exclude booked slots and provide an up-to-the-minute availability grid.

🛡️ 2. Security Hardening (Production Ready)
The project is protected against common attack vectors and malicious automation:

Anti-Bot Protocol: Implemented a custom Crypto Token system (CSRF prevention) and a Honeypot strategy to silently drop automated spam attempts.

Infrastructure Protection: Hardened with Helmet.js headers and Express Rate Limiting to prevent brute-force attacks and DDoS.

Validation: Strict phone number validation (ISO standards) and email format checking with detection of common domain typos.

⚡ 3. Performance & SEO (Lighthouse Optimized)
Aggressive Caching: Implemented a robust caching policy for static assets (Cache-Control: immutable), significantly improving Load Speed (LCP).

Asset Optimization: Full use of WebP formats and Resource Preloading for critical Hero elements.

Semantic SEO: Complete implementation of JSON-LD (Schema.org) for Professional Services and FAQs, ensuring rich snippets in search engine results.

🌍 4. Global Scalability (i18n)
Full internationalization support for 6 languages (EN, PL, DE, ES, RU, UA) using i18next. This includes the UI, dynamic error messages, and transaction-based email confirmations.

🛠 Tech Stack
Frontend: React 19 (Hooks, Context API), Firebase Auth (Identity Management), React-DatePicker.

Backend: Node.js, Express.js, Mongoose.

Database: MongoDB Atlas.

Communications: Resend API (Transactional Emails), Google Cloud Console (IAM & Service Accounts).

DevOps: Render (PaaS), Home.pl (DNS & SSL Management), Git.

🏗 Local Installation
Clone the repository: git clone https://github.com/JJwrocc/mahogany-qen.git

Configure .env (MongoDB URI, Google Private Keys, Resend API key).

Install dependencies: npm install.

Spin up the server: npm start.

Joachim Esangbedo (JJwrocc) Fullstack Developer | JavaScript Specialist
