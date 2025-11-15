# 🚀 Vercel Deployment Guide - XHERIS Maintenance Form

This guide will help you deploy your maintenance form to Vercel with reliable file uploads to Bitrix24.

## 📋 What You'll Need:

- Vercel account (free tier works!)
- GitHub account (optional but recommended)
- Your Bitrix24 webhook URL

## 🎯 Why Vercel?

**Problem:** Direct file uploads from browser to Bitrix24 are unreliable  
**Solution:** Vercel serverless function acts as a reliable intermediary

**Flow:**
```
Form → Upload files to Vercel → Vercel uploads to Bitrix24 → Success! ✅
```

---

## 📦 Step 1: Prepare Your Project

### Option A: Deploy via GitHub (Recommended)

1. **Create a new GitHub repository**
   - Go to https://github.com/new
   - Name it: `xheris-maintenance-form`
   - Make it private or public (your choice)

2. **Upload your files to the repository**
   
   Create this folder structure:
   ```
   xheris-maintenance-form/
   ├── api/
   │   └── upload-to-bitrix.js
   ├── xheris-maintenance-form-restructured.html
   ├── vercel.json
   └── README.md
   ```

3. **Commit and push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/xheris-maintenance-form.git
   git push -u origin main
   ```

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd /path/to/your/project
   vercel
   ```

---

## 🚀 Step 2: Deploy to Vercel

### Via GitHub:

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Sign in with GitHub

2. **Import your repository**
   - Click "Add New..." → "Project"
   - Select your `xheris-maintenance-form` repository
   - Click "Import"

3. **Configure the project**
   - Framework Preset: **Other**
   - Root Directory: `./` (default)
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Click **Deploy**

4. **Wait for deployment** (~30 seconds)
   - You'll get a URL like: `https://xheris-maintenance-form.vercel.app`

---

## ⚙️ Step 3: Update Your Form

1. **Copy your Vercel URL**
   - After deployment, you'll see: `https://your-project-name.vercel.app`
   - Or `https://your-custom-domain.com` if you set one up

2. **Update the form HTML file**
   
   Open `xheris-maintenance-form-restructured.html` and find line ~8:
   
   ```javascript
   const VERCEL_UPLOAD_ENDPOINT = 'https://your-project.vercel.app/api/upload-to-bitrix';
   ```
   
   Replace with your actual URL:
   ```javascript
   const VERCEL_UPLOAD_ENDPOINT = 'https://xheris-maintenance-form.vercel.app/api/upload-to-bitrix';
   ```

3. **Commit and push the change**
   ```bash
   git add xheris-maintenance-form-restructured.html
   git commit -m "Update Vercel endpoint URL"
   git push
   ```
   
   Vercel will automatically redeploy! ✨

---

## 🧪 Step 4: Test the Form

1. **Access your form**
   - Go to: `https://your-project.vercel.app/xheris-maintenance-form-restructured.html`

2. **Test file upload**
   - Fill out the form
   - Upload 1-2 test photos
   - Submit

3. **Check Bitrix24**
   - Open the created deal
   - Files should appear in the "Files" field or activity
   - Timeline should show file names

4. **Check browser console (F12)**
   ```
   ✅ Should see:
   📎 Processing 2 files for upload via Vercel...
   📦 Processing file 1/2: test-image.jpg
   ✅ Processed: test-image.jpg
   🚀 Uploading 2 files to Vercel...
   ✅ Successfully uploaded 2 file(s) via Vercel!
   ```

---

## 🔧 Troubleshooting

### Files not uploading?

**Check 1: Vercel endpoint URL**
```javascript
// Make sure this matches your deployment:
const VERCEL_UPLOAD_ENDPOINT = 'https://YOUR-ACTUAL-URL.vercel.app/api/upload-to-bitrix';
```

**Check 2: Browser console errors**
- Press F12 → Console tab
- Look for red errors
- Common issues:
  - CORS errors → Vercel function handles this automatically
  - 404 error → Wrong endpoint URL
  - Network error → Check internet connection

**Check 3: Vercel function logs**
- Go to Vercel Dashboard → Your Project → Logs
- Look for errors in the function execution
- Should see: `📎 Processing X files for deal XXXXX`

### Still having issues?

**Enable debug mode:**

Add this to your browser console:
```javascript
localStorage.setItem('debug', 'true');
```

Then check Vercel logs at:
https://vercel.com/YOUR-USERNAME/xheris-maintenance-form/logs

---

## 🎨 Step 5: Customize (Optional)

### Add a custom domain:

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `form.xheris.com`
3. Update DNS records as instructed
4. Update the VERCEL_UPLOAD_ENDPOINT in your form

### Increase file size limit:

Edit `api/upload-to-bitrix.js`, line 3:
```javascript
sizeLimit: '50mb', // Change to 100mb if needed
```

### Add email notifications:

Add to Vercel function after successful upload:
```javascript
// Send email notification
await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_SENDGRID_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    // Email config
  })
});
```

---

## 📊 Monitoring

**View upload stats:**
- Vercel Dashboard → Analytics
- See request count, errors, duration

**Set up alerts:**
- Vercel Dashboard → Settings → Notifications
- Get notified if function fails

---

## 🔐 Security Notes

✅ **What's secure:**
- Bitrix24 webhook is sent from browser (okay - it's webhook, not API key)
- File data is transmitted over HTTPS
- Vercel functions are serverless (no persistent storage)

⚠️ **Best practices:**
- Keep your Bitrix24 webhook URL private
- Consider rate limiting if form is public
- Monitor Vercel logs for suspicious activity

---

## 💰 Pricing

**Vercel Free Tier includes:**
- ✅ 100GB bandwidth/month
- ✅ 100 GB-hours serverless function execution
- ✅ Unlimited projects
- ✅ Automatic HTTPS

**For XHERIS form:**
- Estimate: ~10KB per file upload request
- 100GB = ~10 million file uploads/month
- **You'll never hit the limit!** 🎉

---

## 🆘 Need Help?

### Quick fixes:

**Form not loading?**
```
Visit: https://your-project.vercel.app/xheris-maintenance-form-restructured.html
Not: https://your-project.vercel.app/
```

**API not responding?**
```bash
# Test the endpoint directly:
curl -X POST https://your-project.vercel.app/api/upload-to-bitrix \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Should return: {"error": "No files provided"}
```

**Vercel deployment failed?**
- Check vercel.json syntax (must be valid JSON)
- Check api/upload-to-bitrix.js syntax
- Look at deployment logs in Vercel dashboard

### Get logs:

```bash
# Install Vercel CLI
npm install -g vercel

# View real-time logs
vercel logs https://your-project.vercel.app
```

---

## ✅ Checklist

Before going live:

- [ ] Vercel project deployed successfully
- [ ] VERCEL_UPLOAD_ENDPOINT updated in HTML file
- [ ] Tested with 1-2 photos
- [ ] Files appear in Bitrix24 deal
- [ ] Timeline comment shows file list
- [ ] No console errors
- [ ] Custom domain configured (optional)

---

## 🎉 You're Done!

Your maintenance form is now live with reliable file uploads!

**Form URL:**
```
https://your-project.vercel.app/xheris-maintenance-form-restructured.html
```

**API Endpoint:**
```
https://your-project.vercel.app/api/upload-to-bitrix
```

Share the form URL with your users and enjoy automatic issue reporting with photo uploads! 📸✨

---

**Pro Tip:** Bookmark your Vercel dashboard to easily monitor uploads and check logs!

https://vercel.com/dashboard
