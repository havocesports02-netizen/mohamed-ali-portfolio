# 🚀 Portfolio Younouss Mouhamed Ali

Portfolio personnel moderne avec animations 3D interactives utilisant Three.js

## 📁 Structure du Projet

```
portfolio/
├── index.html              # Page principale
├── css/
│   └── styles.css         # Feuilles de style
├── js/
│   └── script.js          # Scripts JavaScript et animations 3D
├── php/
│   └── contact.php        # Gestionnaire de formulaire de contact
├── images/                # Dossier pour les images
│   └── (ajoutez vos images ici)
├── logs/                  # Logs des messages (créé automatiquement)
│   └── messages.log
└── README.md              # Ce fichier
```

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec animations
- **JavaScript (ES6+)** - Interactivité
- **Three.js** - Animations 3D et effets de particules
- **PHP** - Traitement des formulaires côté serveur

## 📋 Fonctionnalités

✨ **Design Moderne**
- Interface responsive
- Animations fluides
- Effets de particules 3D
- Dégradés dynamiques

🎨 **Sections**
- Hero avec présentation
- À propos
- Compétences et parcours
- Projets et réalisations
- Vision et lettre de motivation
- Formulaire de contact

🔥 **Animations 3D**
- Particules interactives
- Formes géométriques flottantes
- Réaction au mouvement de la souris
- Effets de parallaxe au scroll

## 🚀 Installation

### 1. Télécharger le projet

Créez les dossiers suivants:
```bash
mkdir portfolio
cd portfolio
mkdir css js php images logs
```

### 2. Ajouter les fichiers

Copiez les fichiers dans les dossiers appropriés:
- `index.html` → racine
- `styles.css` → dossier `css/`
- `script.js` → dossier `js/`
- `contact.php` → dossier `php/`

### 3. Configuration du serveur

#### Option A: Serveur Local (XAMPP, WAMP, MAMP)

1. Installez XAMPP/WAMP/MAMP
2. Copiez le dossier `portfolio` dans `htdocs` (XAMPP) ou `www` (WAMP)
3. Démarrez Apache
4. Accédez à `http://localhost/portfolio`

#### Option B: Serveur PHP intégré

```bash
cd portfolio
php -S localhost:8000
```

Accédez à `http://localhost:8000`

### 4. Configuration Email (contact.php)

Ouvrez `php/contact.php` et modifiez la ligne:
```php
$to = 'votre-email@example.com'; // Remplacez par votre email
```

## ⚙️ Configuration Avancée

### Base de données (Optionnel)

Pour sauvegarder les messages dans une base de données, créez cette table:

```sql
CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Puis décommentez la section "SAVE TO DATABASE" dans `contact.php` et configurez vos identifiants:

```php
$servername = "localhost";
$username = "votre_utilisateur";
$password = "votre_mot_de_passe";
$dbname = "votre_base_de_donnees";
```

## 🎨 Personnalisation

### Couleurs

Dans `css/styles.css`, modifiez la couleur principale:
```css
/* Remplacez #FF7A00 par votre couleur */
--primary-color: #FF7A00;
```

### Contenu

1. **Textes**: Modifiez directement dans `index.html`
2. **Images**: Ajoutez vos images dans le dossier `images/`
3. **Liens sociaux**: Mettez à jour les URLs dans `index.html`

### Animations 3D

Dans `js/script.js`, ajustez:
```javascript
const particlesCount = 1000; // Nombre de particules
const shapes = 20;            // Nombre de formes géométriques
```

## 📱 Responsive Design

Le site est entièrement responsive et s'adapte à:
- 📱 Mobile (< 768px)
- 💻 Tablette (768px - 1024px)
- 🖥️ Desktop (> 1024px)

## 🔧 Dépannage

### Le formulaire ne fonctionne pas

1. Vérifiez que PHP est installé: `php -v`
2. Assurez-vous que `contact.php` est accessible
3. Vérifiez les logs: `logs/messages.log`
4. Activez les erreurs PHP pour déboguer

### Les animations 3D ne s'affichent pas

1. Vérifiez la connexion CDN de Three.js
2. Ouvrez la console du navigateur (F12)
3. Assurez-vous que JavaScript est activé

### Problèmes d'email

1. Vérifiez la configuration SMTP de votre serveur
2. Testez avec un service email local
3. Utilisez un service tiers (SendGrid, Mailgun)

## 📝 TODO / Améliorations

- [ ] Ajouter un système de captcha
- [ ] Implémenter un dark/light mode
- [ ] Ajouter plus de langues
- [ ] Créer un blog intégré
- [ ] Ajouter des tests unitaires

## 📄 Licence

Ce projet est libre d'utilisation pour un usage personnel.

## 👤 Auteur

**Younouss Mouhamed Ali**

- LinkedIn: [Mouhamed Ali Younouss](https://www.linkedin.com/in/mouhamed-ali-younouss-117339391)
- Instagram: [@3al3ol_ys](https://www.instagram.com/3al3ol_ys/)
- Email: mouhamedaliyounouss656@gmail.com
- Téléphone: +212 665859363

## 🙏 Remerciements

- Three.js pour la bibliothèque 3D
- La communauté open source

---

**Made with ❤️ by Younouss Mouhamed Ali**