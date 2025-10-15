# 🚀 Deploy to Vercel - Step by Step Guide

## 📋 Prerequisites Checklist

Before deploying, we need to:
- ✅ Your app is working locally (it is!)
- ✅ Build the production version
- ⚠️ Secure your API key (IMPORTANT!)

---

## ⚠️ IMPORTANT: Secure Your API Key First!

Your Perplexity API key is currently exposed in the client code. Before deploying publicly, we should protect it.

### Quick Security Fix:

We have 2 options:

**Option A: Deploy As-Is (Quick but insecure)**
- Anyone can see your API key in browser
- People could steal and use your API credits
- ⚠️ NOT recommended for public use

**Option B: Secure Deployment (Recommended)**
- Create backend API to protect the key
- Takes 10 more minutes
- ✅ Safe for public use

**Which do you prefer?**

For now, I'll show you both methods. Let's start with the quick deploy, then I can help secure it.

---

## 🚀 Method 1: Deploy via Vercel Website (EASIEST)

### Step 1: Create GitHub Repository

**1. Go to GitHub:**
- Visit: https://github.com
- Click "Sign in" (or "Sign up" if you don't have account)

**2. Create New Repository:**
- Click the "+" icon (top right)
- Select "New repository"
- Name: `ielts-fluent-ai`
- Make it **Public** or **Private**
- Click "Create repository"

**3. Push Your Code to GitHub:**

Run these commands in PowerShell:

```powershell
# Navigate to your project
cd "c:\Users\nikes\OneDrive\Desktop\ielts-fluent-ai-main\ielts-fluent-ai-main"

# Initialize git (if not already)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - IELTS Fluent AI"

# Add your GitHub repo (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ielts-fluent-ai.git

# Push to GitHub
git push -u origin main
```

### Step 2: Deploy to Vercel

**1. Go to Vercel:**
- Visit: https://vercel.com
- Click "Sign Up" (use GitHub account - it's easier)

**2. Import Your Project:**
- Click "Add New" → "Project"
- Click "Import Git Repository"
- Select your `ielts-fluent-ai` repository
- Click "Import"

**3. Configure Build Settings:**
- **Framework Preset:** Vite
- **Root Directory:** `./` (leave as default)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

**4. Add Environment Variables:**
- Click "Environment Variables"
- Add:
  - Name: `VITE_PERPLEXITY_API_KEY`
  - Value: `your_perplexity_api_key_here`

**5. Click "Deploy"**

**6. Wait 2-3 minutes...**

**7. Get Your URL!**
You'll get something like: `https://ielts-fluent-ai.vercel.app`

✅ **DONE! Share this URL with anyone!**

---

## 🚀 Method 2: Deploy via Vercel CLI (For Developers)

### Step 1: Install Vercel CLI

```powershell
npm install -g vercel
```

### Step 2: Build Your Project

```powershell
cd "c:\Users\nikes\OneDrive\Desktop\ielts-fluent-ai-main\ielts-fluent-ai-main"
npm run build
```

### Step 3: Login to Vercel

```powershell
vercel login
```

Follow the prompts to login (via email or GitHub)

### Step 4: Deploy

```powershell
vercel
```

Answer the prompts:
- Set up and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N**
- What's your project's name? `ielts-fluent-ai`
- In which directory is your code? `./`
- Want to override settings? **N**

### Step 5: Add Environment Variable

```powershell
vercel env add VITE_PERPLEXITY_API_KEY
```

When prompted, paste your API key:
```
your_perplexity_api_key_here
```

Select: **Production, Preview, Development**

### Step 6: Deploy to Production

```powershell
vercel --prod
```

### Step 7: Get Your URL

You'll see output like:
```
✅ Production: https://ielts-fluent-ai.vercel.app
```

---

## 🎯 Recommended: Easiest Path

**I recommend Method 1 (via Vercel Website)** because:
- ✅ No CLI commands needed
- ✅ Visual interface
- ✅ Automatic deployments on push
- ✅ Easy to manage

**Want me to walk you through it step by step?**

---

## 🔒 Security Recommendations

### After Deploying:

1. **Monitor API Usage:**
   - Check Perplexity dashboard: https://www.perplexity.ai/settings/api
   - Watch for unusual usage

2. **Add Rate Limiting:**
   - Limit requests per user
   - Implement usage tracking

3. **Consider Backend API:**
   - Move API key to server
   - Proxy requests through your backend
   - Better security

4. **Enable Authentication:**
   - Require login to use app
   - Track user usage
   - Limit free tier

---

## 📝 Quick Deploy Checklist

- [ ] GitHub account created
- [ ] Vercel account created (use GitHub login)
- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] Deployed successfully
- [ ] Tested the public URL
- [ ] Shared with friends!

---

## 🆘 Common Issues

### "Build Failed"

Check if you have a `vercel.json` file. If not, create one:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

### "Environment Variables Not Working"

Make sure you added `VITE_` prefix:
- ✅ `VITE_PERPLEXITY_API_KEY`
- ❌ `PERPLEXITY_API_KEY`

### "404 on Page Refresh"

Add this to `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🎉 After Deployment

### Your app will be live at:
```
https://ielts-fluent-ai-XXXXX.vercel.app
```

### You can:
- ✅ Share with anyone
- ✅ Access from anywhere
- ✅ Use on mobile
- ✅ Custom domain (optional)

### Automatic Updates:
- Every time you push to GitHub
- Vercel automatically rebuilds
- No manual deployment needed!

---

## 🚀 Ready to Deploy?

Tell me which method you prefer:

1. **"Deploy via Vercel Website"** - I'll guide you step by step
2. **"Deploy via CLI"** - I'll help with commands
3. **"Secure it first"** - I'll create backend API for security

Which one do you want to do?
