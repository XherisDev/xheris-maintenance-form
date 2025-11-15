# ✅ XHERIS Form - Deployment Checklist

Use this checklist to ensure everything is configured correctly before going live.

## 📋 Pre-Deployment

- [ ] Bitrix24 webhook URL is ready and has CRM permissions
- [ ] Files created a "Files" custom field in Bitrix24 Deals (optional but recommended)
- [ ] GitHub account created (or ready to use Vercel CLI)
- [ ] Vercel account created at https://vercel.com

## 🔧 Configuration

- [ ] Updated `BITRIX24_WEBHOOK` in `xheris-maintenance-form-restructured.html`
- [ ] Reviewed property types - added/removed as needed
- [ ] Reviewed location list - customized for your properties
- [ ] Reviewed issue categories - added specific issues
- [ ] Checked phone country codes - added/removed countries

## 🚀 Deployment

### Via GitHub:
- [ ] Created GitHub repository
- [ ] Uploaded all files to repository
- [ ] Connected Vercel to GitHub
- [ ] Deployed to Vercel
- [ ] Got deployment URL (e.g., `https://xheris-form.vercel.app`)

### Via CLI:
- [ ] Installed Vercel CLI: `npm install -g vercel`
- [ ] Logged in: `vercel login`
- [ ] Deployed: `vercel`
- [ ] Got deployment URL

## ⚙️ Post-Deployment

- [ ] Updated `VERCEL_UPLOAD_ENDPOINT` with actual Vercel URL
- [ ] Committed and pushed the change
- [ ] Vercel auto-deployed the update
- [ ] Form is accessible at: `https://YOUR-URL.vercel.app/xheris-maintenance-form-restructured.html`

## 🧪 Testing

### Basic Test:
- [ ] Form loads without errors
- [ ] All steps are clickable
- [ ] Can select property type → advances to next step
- [ ] Can select category → advances to next step
- [ ] Can select location → advances to next step
- [ ] Can select issue → advances to next step
- [ ] Can upload 1-2 test photos
- [ ] Can fill contact form
- [ ] Submit button works

### Bitrix24 Integration Test:
- [ ] Contact created in Bitrix24
- [ ] Deal created in Bitrix24
- [ ] Deal has correct title
- [ ] Deal comments contain all issue details
- [ ] Timeline shows file list
- [ ] Files are attached/viewable
- [ ] All fields populated correctly

### Browser Console Test:
- [ ] No red errors in console (F12)
- [ ] See success messages:
  ```
  ✅ Contact created: XXXXX
  ✅ Deal created: XXXXX
  ✅ Successfully uploaded X file(s) via Vercel!
  ✅ File list added to timeline
  ```

### Multiple Browsers:
- [ ] Tested in Chrome
- [ ] Tested in Firefox
- [ ] Tested in Safari (if Mac available)
- [ ] Tested on mobile (iOS or Android)

## 🎨 Optional Enhancements

- [ ] Added custom domain in Vercel
- [ ] Updated DNS records for custom domain
- [ ] Updated `VERCEL_UPLOAD_ENDPOINT` with custom domain
- [ ] Customized colors to match brand
- [ ] Added company logo
- [ ] Set up email notifications (if desired)
- [ ] Configured Vercel analytics

## 📊 Monitoring Setup

- [ ] Bookmarked Vercel dashboard
- [ ] Enabled Vercel notifications for errors
- [ ] Set up Bitrix24 automation rules (if needed)
- [ ] Created webhook to notify team on new submissions

## 📱 Distribution

- [ ] Form URL added to website
- [ ] Form URL sent to property managers
- [ ] Form URL sent to tenants
- [ ] QR code generated for physical locations (optional)
- [ ] Added to property management app (if applicable)

## 🔐 Security Review

- [ ] Bitrix24 webhook permissions limited to CRM only
- [ ] Form URL is HTTPS
- [ ] No sensitive data exposed in HTML
- [ ] File size limits enforced (10MB)
- [ ] Input validation working on all fields

## 📝 Documentation

- [ ] Team trained on how to use form
- [ ] Team knows where to find submissions in Bitrix24
- [ ] Instructions created for common issues
- [ ] Support contact information available

## 🎉 Go Live

- [ ] All checklist items completed
- [ ] Final test submission successful
- [ ] Form URL shared with users
- [ ] Monitoring active

---

## 🚨 Troubleshooting Quick Reference

### Issue: Files not uploading
**Check:**
1. VERCEL_UPLOAD_ENDPOINT is correct
2. Vercel function logs show activity
3. Browser console shows upload attempt
4. File size under 10MB

**Fix:**
```javascript
// Verify this matches your deployment:
const VERCEL_UPLOAD_ENDPOINT = 'https://YOUR-ACTUAL-URL.vercel.app/api/upload-to-bitrix';
```

### Issue: Deal not created
**Check:**
1. BITRIX24_WEBHOOK is correct
2. Webhook has CRM permissions
3. Browser console shows API call
4. Contact creation succeeded

**Fix:**
```bash
# Test webhook:
curl https://YOUR-ACCOUNT.bitrix24.com/rest/1/YOUR-WEBHOOK/crm.deal.fields
# Should return field list, not error
```

### Issue: Form not loading
**Check:**
1. Accessing correct URL with .html extension
2. File deployed to Vercel
3. No JavaScript errors in console

**Fix:**
```
Correct: https://your-project.vercel.app/xheris-maintenance-form-restructured.html
Wrong:   https://your-project.vercel.app/
```

---

## 📞 Support

If you're stuck after going through this checklist:

1. Check browser console (F12) for errors
2. Check Vercel function logs in dashboard
3. Review VERCEL-DEPLOYMENT-GUIDE.md
4. Test webhook directly with curl commands

---

**Print this checklist and check off items as you complete them!** ✅
