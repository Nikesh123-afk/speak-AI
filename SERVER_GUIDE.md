# 🚀 Quick Start - Server Commands

## Starting the Server

### Command:
```bash
cd "c:\Users\nikes\OneDrive\Desktop\ielts-fluent-ai-main\ielts-fluent-ai-main"
npm run dev
```

### What you'll see:
```
VITE v5.4.10  ready in 2622 ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.100.14:8080/
```

## Access the App

### 🌐 URLs:
- **Local:** http://localhost:8080
- **Network (same WiFi):** http://192.168.100.14:8080

### ✅ Server is Running When You See:
- Green checkmark in terminal
- "VITE v5.4.10 ready" message
- URLs shown above

## Stopping the Server

Press `Ctrl + C` in the terminal

## Restarting the Server

If you make code changes:
- Server auto-reloads (Hot Module Replacement)
- No need to restart manually

If server crashes:
```bash
npm run dev
```

## Troubleshooting

### ❌ "Cannot find package.json"
**Problem:** Wrong directory  
**Solution:** Make sure you're in `ielts-fluent-ai-main\ielts-fluent-ai-main` folder
```bash
cd "c:\Users\nikes\OneDrive\Desktop\ielts-fluent-ai-main\ielts-fluent-ai-main"
```

### ❌ "Port 8080 already in use"
**Problem:** Another app using port 8080  
**Solution:** Kill the process or use different port
```bash
# Find what's using port 8080
netstat -ano | findstr :8080

# Or change port in vite.config.ts
```

### ❌ Link not working / Page not loading
**Problem:** Server not running  
**Solution:** Start the server
```bash
npm run dev
```

### ❌ "Module not found" errors
**Problem:** Dependencies not installed  
**Solution:** Install dependencies
```bash
npm install
```

## Current Status

✅ **Server Running:** http://localhost:8080  
✅ **All Features Working:**
- Landing page
- Topic selection
- Question import
- Voice conversation
- Authentication
- Feedback system

## Tips

💡 **Keep Terminal Open** - Don't close the terminal while using the app  
💡 **Check Terminal** - Watch for errors in the terminal output  
💡 **Refresh Browser** - If issues, try `Ctrl + Shift + R` to hard refresh  
💡 **Network Access** - Use `http://192.168.100.14:8080` to test on phone/tablet

---

**Your server is ready! Open http://localhost:8080 in your browser** 🎉
