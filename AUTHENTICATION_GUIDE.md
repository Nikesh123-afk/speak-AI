# Authentication System Setup Guide

## 📋 Overview

Your IELTS Fluent AI app now has a complete authentication system with:

✅ **Login/Signup Modal** - Beautiful UI for user authentication  
✅ **User Dashboard** - Profile, stats, and settings  
✅ **Auth Context** - Global state management  
✅ **LocalStorage Persistence** - Users stay logged in  
✅ **Plan Management** - Free, Standard, Premium tiers  
✅ **Practice Session Tracking** - Count and limits  

---

## 🎯 Features Implemented

### 1. Login Modal (`src/components/LoginModal.tsx`)
- ✅ Email/Password login
- ✅ Sign up with name, email, password
- ✅ Toggle between login/signup modes
- ✅ Form validation (email format, password min length)
- ✅ Error handling and display
- ✅ Loading states
- ✅ Social login buttons (Google, Facebook) - UI ready
- ✅ Forgot password link - UI ready
- ✅ Modern, responsive design

### 2. User Dashboard (`src/components/UserDashboard.tsx`)
- ✅ User profile display (name, email, avatar)
- ✅ Plan information (Free/Standard/Premium)
- ✅ Practice session counter
- ✅ Sessions remaining tracker
- ✅ Quick action buttons
- ✅ Logout functionality
- ✅ Upgrade to premium prompt

### 3. Auth Context (`src/context/AuthContext.tsx`)
- ✅ Global authentication state
- ✅ Login function with validation
- ✅ Signup function with duplicate checking
- ✅ Logout function
- ✅ Update user data
- ✅ LocalStorage persistence
- ✅ Auto-load user on app start

### 4. Landing Page Integration
- ✅ Login button in header (desktop + mobile)
- ✅ Show user name when logged in
- ✅ Open dashboard on user click
- ✅ Conditional rendering based on auth state

---

## 🚀 How It Works

### User Flow:

1. **New User**:
   - Clicks "Login" button → Login modal opens
   - Clicks "Sign Up" → Switches to signup form
   - Fills: Name, Email, Password
   - Clicks "Sign Up" → Account created
   - User data saved to localStorage
   - Automatically logged in

2. **Existing User**:
   - Clicks "Login" button → Login modal opens
   - Enters email and password
   - Clicks "Login" → Authenticated
   - User data loaded from localStorage

3. **Logged In User**:
   - Name appears in header instead of "Login"
   - Clicks name → Dashboard opens
   - Can view stats, plan info
   - Can logout

4. **Practice Sessions**:
   - Free plan: 3 sessions limit
   - Standard/Premium: Unlimited
   - Counter increments after each practice

---

## 💾 Data Storage

### LocalStorage Keys:

```javascript
// Current logged-in user
'ielts_user' = {
  id: string,
  email: string,
  name: string,
  plan: 'free' | 'standard' | 'premium',
  practiceCount: number
}

// All registered users (demo database)
'ielts_users' = [
  {
    id: string,
    email: string,
    password: string, // NOTE: In production, use backend with hashing
    name: string,
    plan: 'free' | 'standard' | 'premium',
    practiceCount: number,
    createdAt: string
  }
]
```

---

## 🔧 How to Use

### Check if User is Logged In:

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    console.log('User is logged in:', user.name);
  }
}
```

### Login User:

```tsx
const { login } = useAuth();

try {
  await login('user@example.com', 'password123');
  console.log('Login successful!');
} catch (error) {
  console.error('Login failed:', error.message);
}
```

### Signup User:

```tsx
const { signup } = useAuth();

try {
  await signup('new@example.com', 'password123', 'John Doe');
  console.log('Account created!');
} catch (error) {
  console.error('Signup failed:', error.message);
}
```

### Logout:

```tsx
const { logout } = useAuth();
logout(); // User logged out, localStorage cleared
```

### Update User Data:

```tsx
const { updateUser } = useAuth();

// Increment practice count
updateUser({ practiceCount: user.practiceCount + 1 });

// Upgrade plan
updateUser({ plan: 'premium' });
```

---

## 🎨 UI Components

### Open Login Modal:

```tsx
const [showLoginModal, setShowLoginModal] = useState(false);

<button onClick={() => setShowLoginModal(true)}>Login</button>

<LoginModal 
  isOpen={showLoginModal}
  onClose={() => setShowLoginModal(false)}
  onLogin={login}
  onSignup={signup}
/>
```

### Open User Dashboard:

```tsx
const [showDashboard, setShowDashboard] = useState(false);

<button onClick={() => setShowDashboard(true)}>Profile</button>

<UserDashboard onClose={() => setShowDashboard(false)} />
```

---

## 🔐 Security Notes (For Production)

⚠️ **IMPORTANT**: This is a demo implementation using localStorage.

### For Production Deployment:

1. **Backend API Required**:
   - Create REST API or GraphQL endpoint
   - Use proper database (PostgreSQL, MongoDB, etc.)
   - Example: Express.js + bcrypt for password hashing

2. **Password Security**:
   ```javascript
   // DON'T store plain passwords
   // DO use bcrypt or similar
   const bcrypt = require('bcrypt');
   const hashedPassword = await bcrypt.hash(password, 10);
   ```

3. **JWT Tokens**:
   ```javascript
   // Backend generates JWT on login
   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
   
   // Frontend stores in httpOnly cookie or secure storage
   // NOT in localStorage for production
   ```

4. **HTTPS Only**: Always use HTTPS in production

5. **Rate Limiting**: Prevent brute force attacks

6. **Email Verification**: Verify email addresses

7. **OAuth Integration**:
   - Google: Use `@react-oauth/google`
   - Facebook: Use Facebook SDK
   - Requires backend OAuth flow

---

## 🔄 Integration with Practice Component

### Track Practice Sessions:

```tsx
// In InteractiveSpeakingPractice.tsx
import { useAuth } from '../context/AuthContext';

function InteractiveSpeakingPractice() {
  const { user, updateUser, isAuthenticated } = useAuth();
  
  const handlePracticeComplete = () => {
    if (isAuthenticated && user) {
      // Check if user has sessions remaining
      const limit = user.plan === 'free' ? 3 : Infinity;
      
      if (user.practiceCount >= limit) {
        alert('You have reached your practice limit. Upgrade to continue!');
        return;
      }
      
      // Increment practice count
      updateUser({ practiceCount: user.practiceCount + 1 });
    }
  };
  
  return (
    // ... your component
  );
}
```

---

## 📊 Plan Limits

| Plan | Sessions | Parts | Feedback | Price |
|------|----------|-------|----------|-------|
| Free | 3 | Part 1 only | Basic | $0 |
| Standard | Unlimited | All Parts | Detailed | $15/mo |
| Premium | Unlimited | All Parts | Advanced + Extras | $35/3mo |

---

## 🎯 Next Steps (Optional Enhancements)

1. **Connect to Supabase** (Already in .env):
   ```bash
   npm install @supabase/supabase-js
   ```
   - Use Supabase Auth for real authentication
   - Store user data in Supabase database

2. **Add Payment Integration**:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```
   - Integrate Stripe for plan upgrades
   - Handle subscription management

3. **Email Verification**:
   - Use SendGrid or AWS SES
   - Send verification emails on signup

4. **Password Reset**:
   - Implement forgot password flow
   - Send reset link via email

5. **Social Login**:
   - Google OAuth 2.0
   - Facebook Login
   - Apple Sign In

6. **Profile Settings**:
   - Change password
   - Update profile picture
   - Notification preferences

---

## 🐛 Testing

### Test Accounts:

You can create test accounts by signing up in the UI, or manually add to localStorage:

```javascript
// Open browser console and run:
localStorage.setItem('ielts_users', JSON.stringify([
  {
    id: '1',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    plan: 'standard',
    practiceCount: 5,
    createdAt: new Date().toISOString()
  }
]));
```

Then login with:
- Email: test@example.com
- Password: password123

---

## 📱 Responsive Design

✅ Works on all devices:
- Desktop (1920px+)
- Laptop (1024px)
- Tablet (768px)
- Mobile (375px)

---

## 🎨 Customization

### Change Theme Colors:

Edit `LoginModal.tsx` and `UserDashboard.tsx`:
```tsx
// Replace orange-600 with your color
className="from-orange-600 to-red-600"
// Change to:
className="from-blue-600 to-purple-600"
```

### Add More Fields:

In `AuthContext.tsx`, extend the User interface:
```tsx
interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'standard' | 'premium';
  practiceCount: number;
  // Add new fields:
  avatar?: string;
  phone?: string;
  country?: string;
  targetScore?: number;
}
```

---

## ✅ Checklist

- [x] Login modal created
- [x] Signup functionality
- [x] User dashboard
- [x] Auth context provider
- [x] LocalStorage persistence
- [x] Plan management
- [x] Practice session tracking
- [x] Header integration
- [x] Mobile responsive
- [x] Error handling
- [x] Loading states

---

## 🆘 Troubleshooting

**Q: User not staying logged in after refresh?**  
A: Check browser console for localStorage errors. Make sure localStorage is enabled.

**Q: Login not working?**  
A: Check console for errors. Verify email/password match what's in localStorage 'ielts_users'.

**Q: Can't see dashboard?**  
A: Make sure you clicked the user's name in the header, not the "Login" button.

**Q: Plans not showing correctly?**  
A: Check user.plan value in localStorage. Must be 'free', 'standard', or 'premium'.

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify localStorage data structure
3. Test with a fresh browser/incognito mode
4. Clear localStorage and try again

---

**Your authentication system is now fully functional! 🎉**

Users can:
✅ Sign up  
✅ Login  
✅ View dashboard  
✅ Track practice sessions  
✅ Manage account  
✅ Logout  

The login button in your header is now connected and working!
