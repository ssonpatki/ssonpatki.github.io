# ✿ Portfolio

A personal portfolio website merging three design inspirations:
- **[clixmods.github.io](https://clixmods.github.io/)** — gamified achievements, sidebar navigation, project category tabs
- **[aaabadcode.com](https://www.aaabadcode.com/)** — terminal aesthetic, dark moody hero, skill bars, blog section
- **[artofgina.com](https://artofgina.com/)** — whimsical charm symbols, image-forward galleries, illustrative warmth

---

## 🗂 File Structure

```
portfolio/
├── index.html          ← Main HTML (edit your content here)
├── css/
│   └── style.css       ← All styles (colors, fonts, layout)
├── js/
│   └── main.js         ← Interactions, animations, achievements
├── assets/
│   ├── images/         ← Put your project screenshots here
│   └── resume.pdf      ← Drop your resume PDF here
└── README.md
```

---

## ✏️ How to Customize

### 1. Personal Info (`index.html`)

Search for and replace all the placeholder text:

| Placeholder | Replace with |
|-------------|--------------|
| `Your Name` | Your actual name |
| `@yourhandle` | Your username/handle |
| `YN` | Your initials (avatar) |
| `your_username` | Terminal whoami output |
| `Your City, Country` | Your location |
| `you@example.com` | Your email |
| `yourusername` | GitHub username |
| `yourprofile` | LinkedIn username |
| `[your tagline here]` | Short role description |

### 2. Avatar Photo

Replace the `.avatar-placeholder` div with:
```html
<img src="assets/images/avatar.jpg" alt="Your Name" class="avatar-img" />
```
And add to `style.css`:
```css
.avatar-img { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
```

### 3. Project Cards

Each project card lives in the `#projects` section. For each project:

1. **Duplicate** the `<article class="project-card">` block
2. Set `data-category` to one of: `web`, `design`, `other` (or add your own)
3. Replace the placeholder image with a real screenshot:
   ```html
   <img src="assets/images/my-project.jpg" alt="Project Name" class="project-img" />
   ```
   Add to `style.css`:
   ```css
   .project-img { width:100%; height:100%; object-fit:cover; }
   ```
4. Update tags, title, description, and links

### 4. Skill Bars

Edit the skill groups in the `#skills` section. Each bar:
```html
<div class="skill-bar" data-pct="85">
  <div class="skill-info"><span>Skill Name</span><span class="skill-pct">85%</span></div>
  <div class="skill-track"><div class="skill-fill"></div></div>
</div>
```
Change `data-pct` and the `85%` text to match your skill level.

### 5. Experience Timeline

Duplicate `<div class="timeline-item">` blocks for each role. Fill in dates, job title, company, description, and tech tags.

### 6. Blog Posts

Duplicate `<a class="blog-card">` blocks. Update the category tag, reading time, title, excerpt, and date. Set `href` to your actual article URL.

### 7. Achievements (`js/main.js`)

The `ACHIEVEMENTS` array defines all badges. Edit or add entries:
```js
{ id: 'myach', emoji: '🎯', name: 'My Achievement', desc: 'How it is unlocked' }
```
Map a section ID to an achievement ID in `SECTION_ACH_MAP`:
```js
'my-section': 'myach'
```
Achievements are stored in `localStorage` and persist between visits.

### 8. Colors / Theme (`css/style.css`)

All colors are CSS variables at the top of `style.css`:
```css
:root {
  --accent:   #c8f055;  /* main green — change to your brand color */
  --accent-2: #f0a055;  /* warm amber accent */
  --accent-3: #a08cff;  /* soft violet for tags */
  --bg:       #0c0c0f;  /* darkest background */
  ...
}
```

### 9. Project Filter Categories

To add a new category (e.g. `mobile`):
1. Add a button in the filter tabs: `<button class="filter-btn" data-filter="mobile">Mobile</button>`
2. Set `data-category="mobile"` on the relevant project cards

### 10. Resume

Drop your resume PDF at `assets/resume.pdf`. The sidebar link already points there.

---

## 🚀 Deploy to GitHub Pages

1. Create a repo named `yourusername.github.io` (for a user site) or any name (for a project site)
2. Push this folder's contents to the `main` branch
3. Go to **Settings → Pages → Source: Deploy from branch → main / root**
4. Your site will be live at `https://yourusername.github.io`

For a custom domain, add a `CNAME` file with your domain name (e.g. `yourname.dev`).

---

## 🎨 Design Credits

Inspired by:
- [clixmods.github.io](https://clixmods.github.io/) — gamified portfolio concept
- [aaabadcode.com](https://www.aaabadcode.com/) — terminal card + dark aesthetic
- [artofgina.com](https://artofgina.com/) — whimsical charm + image galleries
