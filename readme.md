# Artiklite rakendus (Praktika 5)

See on täislahendus, mis sisaldab **artiklite haldamise** süsteemi koos kasutajate autentimise ja kommentaaride funktsionaalsusega. Projekt on jagatud kahte ossa: **backend** (Node.js + Express + PostgreSQL) ja **frontend** (React + React Bootstrap).

## 🎯 Funktsionaalsus

### 1. Kasutajate registreerimine ja autentimine
- Registreerimisvorm (e-mail, parool, kinnita parool).
- Sisselogimine e-maili ja parooliga.
- JWT põhine autentimine.
- Admin ja kasutaja rollid.

### 2. Artiklite haldamine
- Uue artikli loomine (pealkiri, kirjeldus, sisu, pilt).
- Artikli redigeerimine ja kustutamine (ainult autor või admin).
- Kõigi artiklite kuvamine (avalikult).

### 3. Kommentaaride süsteem
- Kasutajad saavad lisada kommentaare artiklitele.
- Kommentaaride muutmine ja kustutamine (ainult oma).
- Kommentaaride kuvamine iga artikli all.

---

## 🗂️ Projekti struktuur

```
/backend          ← Express + Sequelize + PostgreSQL
/frontend         ← React + Vite + Bootstrap
```

---

## 🚀 Käivitamisjuhised

### Backend (Node.js)

```bash
cd backend
npm install
cp .env.example .env  # ja täida oma andmebaasi andmed
npm run migrate       # või oma andmebaasi initsialiseerimine
npm start
```

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

---

## 💾 Andmebaas

Kasutusel PostgreSQL koos Sequelize ORM-iga. Artiklid, kasutajad ja kommentaarid on seotud võtmete kaudu (foreign keys). Rollipõhine ligipääs (admin/kasutaja) määratakse registreerimisel või seederi kaudu.

---

## 👩‍💻 Kasutatud tehnoloogiad

- **Frontend:** React, React Router, React Bootstrap, Axios
- **Backend:** Express, Sequelize, PostgreSQL, JWT
- **Muud:** Multer (faili üleslaadimine), dotenv, bcryptjs

---

## 🧑‍🏫 Autor

**Zhakki (Илона Жакович)** — EKA, 2025 Praktika 5