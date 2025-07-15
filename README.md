# GlobeTales.
Aplicația **“GlobeTales.”** este o platformă digitală **intuitivă** și **elegantă**, dedicată pasionaților de călătorii care doresc să-și păstreze amintirile într-un mod organizat și interactiv. Aceasta permite utilizatorilor să creeze **jurnale de călătorie personalizate**,  precum și să țină evidența locurilor vizitate sau planificate.
Una dintre funcționalitățile cheie ale aplicației este **lista de dorințe** (bucket list), unde utilizatorii pot adăuga destinații de vis, pot seta obiective de călătorie și pot urmări progresul realizării acestora. 
Pentru o **experiență completă**, aplicația oferă și o bază de date extinsă cu informații detaliate despre țări și orașe, incluzând date geografice, culturale și curiozități. Utilizatorii pot astfel să-și planifice călătoriile mai **eficient**, având acces la informații relevante direct din aplicație.
Din punct de vedere tehnic, aplicația este construită pe un front-end modern în React, care oferă o interfață fluidă, responsivă și ușor de utilizat pe dispozitive.
Pe partea de server, back-end-ul este realizat în Python cu framework-ul Django, oferind un sistem robust de gestionare a datelor, autentificare securizată, roluri de utilizatori și API-uri RESTful pentru comunicarea eficientă între front-end și bazele de date. Sistemul de autentificare este securizat prin criptarea parolei.
**„GlobeTales”** nu este doar o aplicație, ci un **instrument complet** de documentare și planificare a experiențelor de călătorie. Printr-o **interfață modernă și intuitivă**, utilizatorii pot înregistra și organiza amintirile din călătorii,pot urmări obiectivele personale de explorare și pot accesa informații relevante despre destinații din întreaga lume. Platforma reunește **funcționalități avansate** într-un ecosistem digital coerent, oferind un spațiu personalizat pentru reflecție, inspirație și planificare. Astfel, fiecare călător are la dispoziție un jurnal digital sigur, accesibil și interactiv, care **susține și valorifică pasiunea pentru descoperirea lumii**.

<hr>

## Cerințe

- Python 3.10+
- Node.js 18+
- Redis 6+
- PostgreSQL (sau altă bază de date configurată în Django)

## Stack Tehnologic

- **Backend**: Django
- **Frontend**: Vite (React/Vue/etc.)
- **Cache/Task Queue**: Redis
- **Build Tools**: Vite, pip, poetry/pipenv (opțional)
  
<hr>

# Documentație tehnică
## Arhitectura aplicației
Aplicația este construită pe o arhitectură **clasică** de tip client–server, menită să asigure scalabilitate, modularitate și o separare clară a responsabilităților între interfața utilizator și logica de business. La nivel de front-end, utilizăm **React**, o bibliotecă JavaScript puternică și modernă, recunoscută pentru performanța ridicată și capacitatea de a crea interfețe dinamice, interactive și responsive. Acest front-end consumă date prin intermediul unui set bine structurat de servicii RESTful, puse la dispoziție de un back-end solid dezvoltat în **Python**, cu ajutorul framework-ului **Django**.
Django acționează ca pilonul principal al aplicației pe partea de server, oferind o bază robustă pentru dezvoltarea rapidă și sigură a aplicațiilor web. El gestionează autentificarea, logica aplicației, validarea datelor și expune API-uri REST prin intermediul Django REST Framework, o extensie esențială ce permite comunicarea clară și eficientă cu front-end-ul.
Pentru stocarea datelor, am optat pentru SQLite3, o soluție ușoară, dar extrem de fiabilă pentru aplicații aflate în faza de dezvoltare sau MVP. Aceasta oferă integritate relațională, este complet integrată cu Django și permite o gestionare simplă, dar sigură, a datelor aplicației. Într-un context de producție, sistemul poate fi extins cu baze de date mai robuste precum PostgreSQL, păstrând aceeași logică arhitecturală.
Această arhitectură permite o comunicare fluentă între client și server, separarea clară a sarcinilor și o evoluție tehnologică facilă, cu posibilitatea de a integra funcționalități adiționale precum: cache-uri Redis pentru performanță, autentificare OAuth2, webhook-uri, servicii externe de mapare (ex: Mapbox sau Leaflet), sau chiar microservicii pentru scalare pe orizontală. Totul este construit cu gândul la extensibilitate, întreținere ușoară și experiență optimă pentru utilizator.
 
## Frontend (React + JavaScript)
Partea de front-end a aplicației  este realizată cu **React 18**, o tehnologie modernă și performantă, ce permite dezvoltarea de interfețe reactive, ușor de întreținut și scalabile. Aplicând principiile programării declarative, interfața este organizată pe baza unor componente reutilizabile, fiecare cu rol clar definit și o logică proprie de afișare și interacțiune.
Gestionarea stării la nivel de aplicație este realizată prin React Context API, permițând o distribuție eficientă a datelor între componente fără a recurge la biblioteci externe. Pentru controlul efectelor secundare și sincronizarea cu surse externe de date, se utilizează hook-ul useEffect, facilitând apelurile către back-end și actualizarea automată a interfeței în funcție de răspunsuri.
Aplicația include pagini esențiale, fiecare implementată ca un component React dedicat:
-**LandingPage** – O introducere animată în universul aplicației, cu un fundal generat dinamic prin finisher-header.es5.min.js și un glob 3D interactiv creat cu three.js, pentru un impact vizual puternic și memorabil.
- **WorldMap** – O hartă SVG a lumii, unde fiecare țară este interactivă; la clic, se deschide un modal personalizat, oferind opțiuni precum adăugarea în bucket list, marcarea ca vizitată sau vizualizarea de informații.
- **BucketList & Journal** – Pagini care oferă o experiență vizuală fluidă, afișând informațiile sub formă de carduri responsive organizate cu Flexbox și CSS Grid, adaptându-se automat la dimensiunea ecranului.
- **Login & Register** – Formulare moderne, validate și conectate la API, cu feedback vizual clar și UX optimizat.
  
Navigarea între pagini este facilitată prin react-router-dom v6, asigurând o tranziție lină și rapidă între rute. Comunicarea cu serverul se face prin cereri HTTP asincrone, realizate cu ajutorul metodelor axios, gestionate prin async/await pentru o scriere clară și elegantă a codului.
Această structură modulară și coerentă oferă nu doar o experiență intuitivă pentru utilizator, ci și o bază solidă pentru dezvoltarea ulterioară, menținerea codului și integrarea de funcționalități noi.
## Integrarea Three.js
Pentru a crea un **impact vizual puternic** și a oferi utilizatorului o **experiență interactivă** încă de la prima interacțiune cu aplicația, front-end-ul integrează un glob 3D rotativ folosind biblioteca **three.js**.
Implementarea se bazează pe inițializarea unei scene 3D standard, formată din următoarele elemente:
- THREE.Scene – containerul principal care gestionează toate obiectele 3D.
- THREE.PerspectiveCamera – cameră de tip perspectivă care oferă unghiuri realiste de vizualizare.
- THREE.WebGLRenderer – motorul de randare care folosește WebGL pentru a desena obiectele 3D în canvas-ul HTML.
- Globul propriu-zis este construit dintr-o geometrie de sferă (THREE.SphereGeometry), peste care se aplică o textură de tip hartă a lumii, încărcată cu ajutorul THREE.TextureLoader. Materialul folosit este de tip THREE.MeshBasicMaterial, ideal pentru randări fără surse de lumină, ceea ce asigură performanță bună chiar și pe dispozitive mai modeste.
- Obiectul final – globul 3D – este un THREE.Mesh rezultat din combinarea sferei cu materialul texturat. Acesta este adăugat în scenă, iar pentru a genera efectul de rotație continuă, se utilizează o buclă de animație bazată pe requestAnimationFrame.
## Backend (Python + Django)
Back-end-ul aplicației este construit folosind **Django 4.2**, un framework web robust, ideal pentru dezvoltare rapidă și sigură. Django vine cu multe funcționalități incluse, cum ar fi un ORM (Object-Relational Mapper) eficient.
Aplicația conține o singură aplicație Django, users, care este responsabilă pentru gestionarea utilizatorilor și autentificarea acestora. Folosind sistemul nativ de django.contrib.auth, autentificarea se face simplu prin sesiuni, fără a fi necesare tokenuri externe (precum JWT). Aceasta asigură o soluție rapidă și securizată pentru autentificarea utilizatorilor, folosind middleware-urile și formele implicite ale framework-ului.
Pentru a expune datele aplicației către front-end-ul React, am folosit Django REST Framework (DRF), care permite crearea rapidă de API-uri RESTful. Datele sunt serializate în format JSON, iar Serializerele asigură o structură clară și ușor de consumat de către client.
Această **arhitectură simplă și curată** permite dezvoltarea rapidă a aplicației, precum și o mentenanță ușoară pe termen lung.
## Conceptele REST și endpoints API
Pentru a facilita comunicarea între front-end (realizat în React) și back-end (Django), aplicația GlobeTales urmează principiile arhitecturii **REST** (REpresentational State Transfer). Acest stil arhitectural este utilizat frecvent în dezvoltarea de aplicații web moderne și presupune expunerea unor resurse prin intermediul unor endpoint-uri HTTP.
În **GlobeTales**, aceste endpoint-uri sunt definite în cadrul aplicației Django, iar fiecare dintre ele corespunde unei acțiuni specifice (ex: înregistrare, autentificare, adăugarea unui jurnal sau a unei destinații în wishlist). Datele sunt transmise sub formă de obiecte JSON, ușor de procesat de către React.
Pentru implementarea logicii REST, am folosit **Django REST Framework** (DRF), o extensie puternică și flexibilă a Django, care permite definirea rapidă a endpoint-urilor și serializarea obiectelor din baza de date. Folosirea serializerelor asigură validarea și transformarea datelor într-un format standardizat, compatibil cu cerințele front-end-ului.
Aplicația definește următoarele endpoint-uri principale:
- **/register** – permite înregistrarea unui utilizator nou.
- **/login** – autentifică un utilizator existent.
- **/logout** – încheie sesiunea curentă.	
- **/user_info** – returnează informațiile contului curent.
- **/check_login** – verifică dacă utilizatorul este autentificat.
- **/add_wishlist** – adaugă o locație în lista de dorințe.
- **/add_journal** – salvează un nou jurnal de călătorie.
Toate aceste rute urmează convențiile REST: se utilizează metode HTTP standard (GET, POST), resursele sunt bine definite, iar răspunsurile serverului sunt concise și predictibile. Această abordare asigură o separare clară între logică (back-end) și interfață (front-end), permițând dezvoltarea modulară și scalabilă a aplicației.
## Integrarea API-ului RestCountries
Pentru a **îmbunătăți experiența** utilizatorului și a oferi informații geografice utile în cadrul jurnalului de călătorie, aplicația GlobeTales integrează API-ul public REST Countries. Acest API furnizează date actualizate despre toate țările lumii, precum denumirea oficială, codul de țară, limba oficială, moneda, populația, regiunea geografică, steagul și altele.
Integrarea acestui API este realizată în partea de front-end, folosind cereri HTTP trimise din React. La selectarea unei țări de către utilizator (de exemplu, când adaugă un jurnal sau creează o destinație în wishlist), aplicația trimite o solicitare către API-ul REST Countries și extrage datele necesare, care sunt apoi afișate în interfață.
Exemplu de endpoint utilizat:
```
https://restcountries.com/v3.1/name/germany
```
Acest endpoint returnează un obiect JSON ce conține informații detaliate despre țara căutată. Răspunsul este procesat pe partea de client și, dacă este necesar, datele pot fi stocate temporar sau asociate cu înregistrările din jurnalul utilizatorului.
Avantajele folosirii acestui API:
- **Elimină** necesitatea stocării manuale a datelor despre țări în baza de date.
- **Oferă** date actualizate și standardizate, direct dintr-o sursă de încredere.
- **Simplifică** procesul de introducere a informațiilor, îmbunătățind interacțiunea utilizatorului cu aplicația.
Prin această integrare, GlobeTales oferă un plus de **context** și **acuratețe** jurnalelor de călătorie, contribuind la o experiență mai bogată și mai informativă pentru utilizatori.
 
### Autentificare şi securitate
**Securitatea** aplicației GlobeTales este o componentă **esențială**, mai ales având în vedere faptul că utilizatorii creează conținut personal (jurnale de călătorie) și gestionează date asociate contului lor. Pentru a proteja aceste informații, autentificarea utilizatorilor se face prin intermediul sistemului standard oferit de Django – django.contrib.auth.
Procesul de autentificare se bazează pe **sesiuni**, nu pe token-uri externe, ceea ce  oferă o **protecție eficientă** în aplicații web. Odată ce un utilizator se loghează, Django creează automat o sesiune stocată în baza de date, iar identificatorul sesiunii este salvat într-un cookie securizat trimis către client. La fiecare cerere ulterioară, serverul validează acest identificator pentru a confirma identitatea utilizatorului.
Funcționalitățile principale legate de autentificare sunt:
- **/register** – înregistrează un nou utilizator, cu validare de date.
- **/login** – creează o sesiune pentru utilizatorul autentificat.
- **/logout** – distruge sesiunea activă și deconectează utilizatorul.
- **/check_login** – verifică dacă utilizatorul este deja logat.
- **/user_info** – oferă date despre utilizatorul curent, doar dacă este autentificat.

## Pentru protecția datelor și a sesiunilor:
- Se folosește **middleware**-ul AuthenticationMiddleware oferit de Django pentru gestionarea stării de autentificare.
- Parolele sunt **criptate** automat cu un algoritm (SHA256) înainte de a fi salvate în baza de date.
- Endpoint-urile sensibile sunt protejate cu **decoratori** precum @login_required, pentru a preveni accesul neautorizat.
- Datele trimise de la client sunt **validate riguros** atât pe front-end (React), cât și pe back-end, folosind serializere DRF.
## Chatbox integrat cu OpenAI
Componenta de chat a aplicației este construită folosind modelul ChatGPT-4o, oferit de OpenAI, integrat prin API. **Scopul** principal al acestui chatbox este de a oferi utilizatorilor **informații rapide și utile** legate de călătorii, precum destinații turistice, sugestii de itinerarii, condiții meteo, documente necesare sau sfaturi privind transportul și cazarea.
Pentru dezvoltarea rapidă și testarea serviciului de comunicare cu modelul, a fost folosit Replit — o platformă cloud-based care permite rularea și partajarea de cod fără a configura manual un mediu local. Replit a fost utilizat pentru implementarea serviciului backend care primește mesajele de la client, le trimite către GPT-4o și returnează răspunsul într-un format structurat, compatibil cu interfața aplicației.
Logica conversațională și fluxurile de dialog au fost definite folosind Voiceflow, o platformă specializată în prototiparea și implementarea de chatbot-uri conversaționale. Voiceflow a permis proiectarea ușoară a fluxurilor conversaționale, stabilirea intențiilor (intents), gestionarea contextului și definirea punctelor de interacțiune cheie, oferind un control vizual asupra dialogului și o integrare eficientă cu GPT-4o.
Pe partea de front-end, chatbox-ul este implementat într-un mod minimalist și responsiv, afișând conversația în timp real. Sunt gestionate stările de încărcare și erori pentru o experiență fluidă, iar fiecare răspuns al modelului este formatat clar, cu sugestii interactive acolo unde este cazul (ex: „Vezi pe hartă”, „Rezervă acum”, „Mai multe detalii”).
Modelul GPT-4o aduce avantajul unui **timp de răspuns foarte scurt** și al unei **înțelegeri îmbunătățite a contextului conversațional**, ceea ce face ca dialogul să fie natural și relevant. Astfel, utilizatorii pot primi **recomandări de călătorie** într-un mod intuitiv, fără a fi nevoiți să navigheze prin meniuri complexe sau să caute manual informații.
Această arhitectură, construită pe un flux clar (Voiceflow), un serviciu rapid (Replit) și un model conversațional de ultimă generație (ChatGPT-4o), adaugă un nivel ridicat de interactivitate aplicației și contribuie semnificativ la experiența generală a utilizatorului, făcând procesul de planificare a unei călătorii mai **simplu**, mai **eficient** și mai **plăcut**.

## Redis
Redis este un sistem de **stocare** în memorie, de tip key-value, extrem de rapid, folosit pentru cache, stocare temporară de date, cozi de mesaje și multe alte scenarii. Este foarte popular pentru **optimizarea performanței** aplicațiilor web, reducând timpul de răspuns la accesarea datelor frecvent folosite.
Funcționalități cheie
- Stocare de date în memorie, cu persistență opțională pe disc.
- Suport pentru structuri de date complexe: liste, seturi, hash-uri, etc.
- Operații atomice și pub/sub.
- Utilizare ca cache pentru rezultate de interogări, sesiuni de utilizator, rate limiting, etc.
  
<hr>

# Utilizare aplicație
## Înregistrare și autentificare
Accesează /register, completează formularul cu nume, email şi parolă. După validare, vei fi redirecţionat automat către pagina de start.
Dacă ai deja cont, poți accesa /login, completa formularul, iar apoi vei fi redirecționat către pagina de start.
 
## Navigarea pe hartă
În pagina World Map, poți face click pe oricare țară. Se va deschide un meniu, pe care vei avea opțiunea să:
- adaugi o țară la lista de dorințe
- adaugi o țară la “Vizitate”
- afli mai multe informații despre țară

## Gestionarea Bucket List
În pagina BucketList găseşti toate destinaţiile salvate. Poţi marca o destinaţie ca vizitată, ceea ce o va muta automat în jurnal. De asemenea, poți adăuga o listă cu lucrurile pe care vrei să le faci în țara respectivă. 
 
## Jurnal de călătorie
Pagina Journal afişează călătoriile finalizate. Fiecare card permite adăugarea de note personale şi imagini din călătorie.
 
## Setări cont
În profil, utilizatorul poate schimba parola şi poate şterge definitiv contul.

<hr>

# Instalare

### 1. Clonarea proiectului

```bash
git clone https://github.com/proxy76/globe-tales.git
```

### 2. Instalare dependențe frontend
```bash
cd frontend
npm install
```


### 3. Pornire redis
```bash
redis-server.exe --port 6380
```

### 4. Pornire backend
#### Pentru primul run al proiectului, se migrează modelele:
```bash
python manage.py migrate
```
```bash
python manage.py runserver
```

### Pornire frontend
```bash
npm run dev
```
