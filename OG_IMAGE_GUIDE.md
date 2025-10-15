# 🖼️ Custom Open Graph Image Guide

## 🎯 Problem Solved!

The Lovable thumbnail has been removed from your meta tags. Now you need to add your own custom image.

---

## ✅ What I Updated

### Changed Meta Tags in `index.html`:

**Before:**
```html
<meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
```

**After:**
```html
<meta property="og:image" content="https://speak-ai-xi.vercel.app/og-image.png" />
```

---

## 🖼️ How to Create Your OG Image

### Option 1: Use Online Tools (Easiest)

**Recommended Tools:**
1. **Canva** (Free) - https://canva.com
   - Template: "Facebook Post" (1200 x 630px)
   - Add your branding
   - Download as PNG

2. **Figma** (Free) - https://figma.com
   - Create 1200 x 630px frame
   - Design your image
   - Export as PNG

3. **OG Image Generator** - https://og-image.vercel.app
   - Type your text
   - Customize colors
   - Download instantly

### Option 2: Use the Template I Created

I created an HTML template in `public/og-image.html`. To convert it to PNG:

1. **Open the file:**
   ```
   public/og-image.html
   ```

2. **Open in browser:**
   - Right-click the file
   - Open with Chrome/Edge

3. **Take screenshot:**
   - Press `F12` (DevTools)
   - Press `Ctrl + Shift + P`
   - Type "screenshot"
   - Select "Capture full size screenshot"
   - Rename to `og-image.png`

4. **Save to public folder:**
   - Move `og-image.png` to `public/` folder

### Option 3: Create Custom Design

**Requirements:**
- **Size:** 1200 x 630 pixels (mandatory!)
- **Format:** PNG or JPG
- **Max file size:** < 1MB (for fast loading)

**Design Tips:**
- ✅ Use bold, large text
- ✅ High contrast colors
- ✅ Include your logo/branding
- ✅ Keep text in center (safe zone)
- ✅ Use 2-3 colors max
- ✅ Make it eye-catching!

**Avoid:**
- ❌ Too much text
- ❌ Small fonts
- ❌ Complex graphics
- ❌ Important content near edges

---

## 📁 Where to Put Your Image

### Method 1: Public Folder (Recommended)

1. **Create/use public folder:**
   ```
   public/og-image.png
   ```

2. **Image will be accessible at:**
   ```
   https://your-site.vercel.app/og-image.png
   ```

3. **Already configured in index.html!**

### Method 2: External Hosting

1. **Upload to image host:**
   - Imgur
   - Cloudinary
   - Your own CDN

2. **Update index.html:**
   ```html
   <meta property="og:image" content="https://your-cdn.com/og-image.png" />
   ```

---

## 🎨 Design Template Examples

### Example 1: Gradient Background
```
Background: Orange to Red gradient
Icon: 🎯 (large, centered)
Title: "IELTS Fluent AI"
Subtitle: "Master Speaking with AI"
Badge: "Free Practice"
```

### Example 2: Professional
```
Background: Dark blue
Icon: Microphone icon
Title: "IELTS Fluent AI"
Features: "✓ Voice Practice ✓ AI Feedback"
CTA: "Start Free Practice"
```

### Example 3: Minimalist
```
Background: White
Accent: Orange (#FF6B35)
Title: "IELTS Fluent AI" (huge, bold)
Subtitle: "Ace Your Speaking Test"
Logo: Small in corner
```

---

## 🚀 Quick Setup (3 Methods)

### Method A: Use Canva (5 minutes)

1. **Go to:** https://canva.com
2. **Search:** "Open Graph Image" or "Facebook Post"
3. **Customize:**
   - Add text: "IELTS Fluent AI"
   - Add subtitle: "Master Speaking with AI Coach"
   - Choose gradient background
   - Add icon: 🎯 or 🎤
4. **Download as PNG**
5. **Rename to:** `og-image.png`
6. **Save to:** `public/og-image.png`
7. **Done!**

### Method B: Screenshot the Template (2 minutes)

1. **Open:** `public/og-image.html` in browser
2. **Press F12** → Open DevTools
3. **Press Ctrl+Shift+P**
4. **Type:** "screenshot"
5. **Select:** "Capture full size screenshot"
6. **Save as:** `public/og-image.png`
7. **Done!**

### Method C: Use OG Image Generator (1 minute)

1. **Go to:** https://og-image.vercel.app
2. **Type:** "IELTS Fluent AI"
3. **Subtitle:** "Master Speaking with AI Coach"
4. **Click:** Download
5. **Save to:** `public/og-image.png`
6. **Done!**

---

## ✅ Verification Checklist

After adding your image:

- [ ] File is named `og-image.png`
- [ ] File is in `public/` folder
- [ ] Size is 1200 x 630 pixels
- [ ] File size < 1MB
- [ ] Committed to git
- [ ] Pushed to GitHub
- [ ] Deployed to Vercel

---

## 🧪 How to Test

### Test Your OG Image:

1. **Facebook Debugger:**
   - Visit: https://developers.facebook.com/tools/debug/
   - Enter: `https://speak-ai-xi.vercel.app`
   - Click: "Scrape Again"
   - See your image!

2. **Twitter Card Validator:**
   - Visit: https://cards-dev.twitter.com/validator
   - Enter your URL
   - See preview

3. **LinkedIn Post Inspector:**
   - Visit: https://www.linkedin.com/post-inspector/
   - Enter your URL
   - Check preview

4. **Open Graph Check:**
   - Visit: https://www.opengraph.xyz
   - Enter your URL
   - See all social previews

---

## 📊 Current Meta Tags

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://speak-ai-xi.vercel.app/" />
<meta property="og:title" content="IELTS Fluent AI - Master Speaking with AI Coach" />
<meta property="og:description" content="Practice IELTS speaking with AI examiner. Get instant feedback, improve your band score, and ace your exam. Free practice available!" />
<meta property="og:image" content="https://speak-ai-xi.vercel.app/og-image.png" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://speak-ai-xi.vercel.app/" />
<meta name="twitter:title" content="IELTS Fluent AI - Master Speaking with AI Coach" />
<meta name="twitter:description" content="Practice IELTS speaking with AI examiner. Get instant feedback, improve your band score, and ace your exam." />
<meta name="twitter:image" content="https://speak-ai-xi.vercel.app/og-image.png" />
```

---

## 🎯 Recommended Image Content

### What to Include:
- ✅ App name: "IELTS Fluent AI"
- ✅ Tagline: "Master Speaking with AI Coach"
- ✅ Icon/Emoji: 🎯 or 🎤
- ✅ Call-to-action: "Free Practice Available"
- ✅ Brand colors: Orange (#FF6B35), Red (#EE5A6F)

### What to Avoid:
- ❌ Lovable branding
- ❌ Too much text
- ❌ Small fonts
- ❌ Low contrast

---

## 🔄 Update Process

After creating your image:

```powershell
# 1. Add image to public folder
# (Place og-image.png in public/)

# 2. Commit changes
git add public/og-image.png
git add index.html
git commit -m "Add custom Open Graph image"

# 3. Push to GitHub
git push origin main

# 4. Vercel auto-deploys
# (Wait 2 minutes)

# 5. Test with Facebook Debugger
# https://developers.facebook.com/tools/debug/
```

---

## 🎨 Design Specifications

### Image Dimensions:
- **Facebook/LinkedIn:** 1200 x 630px (1.91:1 ratio)
- **Twitter Summary Large:** 1200 x 628px (close enough)

### Safe Zones:
- Keep important content within 1104 x 512px center area
- Edges may be cropped on some platforms

### File Requirements:
- **Format:** PNG or JPG
- **Max Size:** 8MB (but < 1MB recommended)
- **Colors:** RGB color space
- **Compression:** Medium quality is fine

---

## ✅ Next Steps

1. **Choose your method** (Canva, Template, or Generator)
2. **Create your OG image** (1200 x 630px)
3. **Save as:** `public/og-image.png`
4. **Commit and push:**
   ```powershell
   git add public/og-image.png index.html
   git commit -m "Add custom OG image"
   git push origin main
   ```
5. **Wait for deployment** (2 minutes)
6. **Test with Facebook Debugger**
7. **Share your link!** 🎉

---

## 📸 Template I Created

Location: `public/og-image.html`

Features:
- Gradient background (orange to purple)
- Large 🎯 icon
- Bold title
- Clean subtitle
- "Free Practice" badge
- 1200 x 630px when rendered

**To use:** Open in browser and screenshot!

---

**Your Lovable branding is removed! Just add your custom image and you're done! 🎉**
