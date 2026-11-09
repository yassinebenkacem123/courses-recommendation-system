# 🎓 Système de recommandation de cours en ligne

Système de recommandation qui aide les apprenants à trouver les **cours en ligne les plus pertinents** selon leurs centres d'intérêt, leur niveau et la catégorie recherchée.
Le projet couvre toute la chaîne : **analyse et nettoyage des données**, **modélisation ML**, **API REST** et **application web**.

## ✨ Fonctionnalités

- **Recherche de cours** avec filtres : catégorie, niveau, sujet, langue, gratuit/payant, prix maximum
- **Recommandations personnalisées** à partir d'une requête libre et des préférences de l'utilisateur
- **Cours similaires** : pour un cours donné, suggestion des cours les plus proches
- **Interface web moderne** et responsive

## 🧠 Partie Data Science

Travail réalisé dans le notebook `the last version.ipynb`, sur un dataset de **plus de 209 000 cours en ligne** (`Course_info.csv`) :

1. **Analyse exploratoire** : types de variables, doublons, valeurs manquantes, incohérences de dates, cours de durée nulle
2. **Prétraitement** : suppression des doublons et des cours invalides, correction des dates, imputation des valeurs manquantes, normalisation (MinMaxScaler) et encodage (OneHotEncoder)
3. **Représentation textuelle** : vectorisation TF-IDF des titres et descriptions
4. **Clustering** : réduction de dimension (PCA) puis K-Means, avec choix du nombre de clusters par le score de silhouette
5. **Classification** : XGBoost et LinearSVC pour prédire le cluster d'un cours
6. **Export du modèle** de recommandation (`course_recommender.pkl`) : matrice TF-IDF, vectoriseur et identifiants des cours

Les recommandations sont calculées par **similarité cosinus** entre la requête de l'utilisateur et les cours.

## 🏗️ Architecture

```
React (Vite + Tailwind)  ──►  API FastAPI  ──►  MongoDB (cours)
                                  │
                                  └──►  Modèle TF-IDF + similarité cosinus (.pkl)
```

| Partie | Dossier | Stack |
|---|---|---|
| Data Science | `the last version.ipynb` | pandas, NumPy, scikit-learn, XGBoost, Matplotlib |
| Backend | `server/` | FastAPI, Motor (MongoDB async), Pydantic |
| Frontend | `client/` | React, Vite, Tailwind CSS, React Router, Framer Motion |

## 📁 Structure

```
courses-recommendation-system/
├── client/                   # Application React
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/         # Appels à l'API
├── server/
│   ├── main.py               # Endpoints FastAPI
│   ├── models.py             # Modèle Course (Pydantic)
│   ├── database.py           # Connexion MongoDB
│   ├── course_recommender.pkl
│   └── requirements.txt
└── the last version.ipynb    # Analyse, preprocessing, clustering
```

## 🚀 Installation

### Backend

```bash
cd server
pip install -r requirements.txt
```

Créer un fichier `server/.env` :

```env
MONGODB_URI=mongodb+srv://<utilisateur>:<mot_de_passe>@<cluster>/<base>
```

Lancer l'API :

```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## 🔌 API

| Méthode | Route | Description |
|---|---|---|
| `GET` | `/test` | Vérifie que le serveur tourne |
| `GET` | `/courses` | Liste des cours avec filtres (`category`, `level`, `topic`, `language`, `is_paid`, `max_price`, `limit`) |
| `GET` | `/courses/{course_id}` | Détail d'un cours |
| `GET` | `/recommendations` | Recommandations à partir de `q`, `category`, `level`, `topic` |
| `GET` | `/courses/{course_id}/recommendations` | Cours similaires à un cours donné |

Exemple :

```bash
curl "http://localhost:8000/recommendations?q=machine%20learning&level=beginner&limit=5"
```

## 👥 Équipe

- [Yassine Benkacem](https://github.com/yassinebenkacem123)
- [Chahd El Haouari](https://github.com/ElHaouariChahd)
