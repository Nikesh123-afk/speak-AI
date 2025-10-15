# 🗄️ Supabase Setup Guide for IELTS Fluent AI

## Quick Setup Steps

### 1. Create Supabase Account & Project

1. **Go to Supabase**: Visit [https://supabase.com](https://supabase.com)
2. **Sign Up**: Click "Start your project" and sign up with GitHub (recommended) or email
3. **Create Organization**: If first time, create an organization (e.g., "Personal Projects")
4. **Create New Project**:
   - **Name**: `ielts-fluent-ai`
   - **Database Password**: Create a strong password (SAVE IT!)
   - **Region**: Choose closest to you (e.g., "US East" or "Europe West")
   - **Pricing Plan**: Select **FREE** ($0/month)
5. **Wait**: Project creation takes ~2 minutes

### 2. Get Your API Keys

Once your project is ready:

1. In the left sidebar, click **⚙️ Settings** (gear icon at bottom)
2. Click **API** in the settings menu
3. You'll see two important values:

   **Project URL** (under "Project URL"):
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   
   **Anon/Public Key** (under "Project API keys" → "anon" "public"):
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

4. **Copy both values** - you'll need them next!

### 3. Add Keys to .env File

I'll help you add these to your `.env` file once you have them.

Just provide:
1. Your Supabase URL
2. Your Supabase Anon Key

---

## 📊 What Supabase Provides

- **PostgreSQL Database** - Store user data, test results, progress
- **Authentication** - User login/signup
- **Storage** - Store audio recordings
- **Real-time** - Live updates
- **Row Level Security** - Secure data access

---

## 🆓 Free Tier Includes

- 500MB Database space
- 1GB File storage
- 50,000 monthly active users
- Social OAuth providers
- Unlimited API requests

Perfect for development and small-scale production!

---

## ⏭️ Next Step

Get your Supabase credentials and share them with me, or let me know when you're ready to add them to the `.env` file!

**Direct link to create project**: https://supabase.com/dashboard/projects
