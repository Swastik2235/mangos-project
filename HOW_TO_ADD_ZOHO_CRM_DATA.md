# 📊 How to Add Data to Your Zoho CRM

## 🎯 **You Have 2 Ways to Add Data:**

### **Method 1: Through Your MangOS App (Recommended)**
### **Method 2: Through Zoho CRM Website**

---

## 🚀 **Method 1: Add Data Through Your MangOS App**

### **Step 1: Access Your CRM**
1. Go to your app: `http://localhost:5173/zoho-crm` (local) or `https://mangos-frontend.onrender.com/zoho-crm` (production)
2. You should see the CRM interface with tabs

### **Step 2: Switch to Live Mode (Important!)**
1. Look for the **"Demo Mode"** chip in the header (orange/yellow color)
2. Click **"Switch to Live"** button next to it
3. The chip should change to **"Live Data"** (green color)
4. Now any data you add will go to your real Zoho CRM

### **Step 3: Add Contacts**
1. Click the **"Contacts"** tab
2. Click **"Add Contact"** button
3. Fill in the form:
   ```
   Name: John Doe
   Email: john@techcorp.com
   Phone: +1-555-0123
   Company: Tech Corp Solutions
   ```
4. Click **"Save"**
5. ✅ **Contact created in Zoho CRM!**

### **Step 4: Add Leads**
1. Click the **"Leads"** tab
2. Click **"Add Lead"** button
3. Fill in the form:
   ```
   Name: Sarah Wilson
   Email: sarah@prospect.com
   Status: New (or Qualified)
   Source: Website (or Referral)
   Value: 5000
   ```
4. Click **"Save"**
5. ✅ **Lead created in Zoho CRM!**

### **Step 5: Add Deals**
1. Click the **"Deals"** tab
2. Click **"Add Deal"** button
3. Fill in the form:
   ```
   Deal Name: Enterprise Software License
   Amount: 25000
   Stage: Qualification (or Proposal)
   Close Date: 2025-03-15
   ```
4. Click **"Save"**
5. ✅ **Deal created in Zoho CRM!**

### **Step 6: Verify Data**
1. Click **"Sync Data"** button to refresh
2. You should see your new records in the tables
3. Go to [crm.zoho.in](https://crm.zoho.in) to verify they're also there

---

## 🌐 **Method 2: Add Data Through Zoho CRM Website**

### **Step 1: Access Zoho CRM**
1. Go to [crm.zoho.in](https://crm.zoho.in)
2. Login with your Zoho account (same one used for OAuth)
3. You'll see the Zoho CRM dashboard

### **Step 2: Add Contacts**
1. Click **"Contacts"** in the left sidebar
2. Click **"+ Create Contact"** button (usually top-right)
3. Fill in the contact form:
   ```
   Contact Information:
   - First Name: John
   - Last Name: Doe
   - Email: john@techcorp.com
   - Phone: +1-555-0123
   
   Address Information:
   - Street: 123 Business Ave
   - City: San Francisco
   - State: CA
   - Zip Code: 94105
   
   Other Details:
   - Account Name: Tech Corp Solutions
   - Lead Source: Website
   ```
4. Click **"Save"**

### **Step 3: Add Leads**
1. Click **"Leads"** in the left sidebar
2. Click **"+ Create Lead"** button
3. Fill in the lead form:
   ```
   Lead Information:
   - First Name: Sarah
   - Last Name: Wilson
   - Email: sarah@prospect.com
   - Phone: +1-555-0124
   - Company: Prospect Inc
   
   Lead Details:
   - Lead Status: New
   - Lead Source: Website
   - Industry: Technology
   - Annual Revenue: 50000
   - No. of Employees: 25
   ```
4. Click **"Save"**

### **Step 4: Add Deals**
1. Click **"Deals"** in the left sidebar
2. Click **"+ Create Deal"** button
3. Fill in the deal form:
   ```
   Deal Information:
   - Deal Name: Enterprise Software License
   - Account Name: Tech Corp Solutions
   - Amount: 25000
   - Closing Date: 2025-03-15
   
   Deal Details:
   - Stage: Qualification
   - Probability (%): 25
   - Lead Source: Website
   - Type: New Business
   ```
4. Click **"Save"**

### **Step 5: Verify in Your App**
1. Go back to your MangOS app
2. Make sure you're in **"Live Data"** mode (green chip)
3. Click **"Sync Data"** button
4. You should see all the data you added through Zoho website

---

## 🔄 **Quick Test Workflow**

### **Test the Integration:**
1. **Add 1 Contact** through your app
2. **Add 1 Lead** through Zoho website
3. **Add 1 Deal** through your app
4. **Sync data** in your app
5. **Check both places** - data should appear in both

### **Expected Result:**
- ✅ 3 total records (1 contact, 1 lead, 1 deal)
- ✅ Data visible in your MangOS app
- ✅ Data visible in Zoho CRM website
- ✅ Both systems stay in sync

---

## 🎯 **Pro Tips**

### **For Best Results:**
1. **Always use Live Mode** when you want real data
2. **Use Demo Mode** for testing and learning
3. **Sync regularly** to keep data fresh
4. **Fill required fields** (Name, Email are usually required)

### **Required Fields:**
- **Contacts**: First Name, Last Name, Email
- **Leads**: First Name, Last Name, Email, Lead Status
- **Deals**: Deal Name, Amount, Stage, Closing Date

### **Troubleshooting:**
- **Data not appearing?** → Click "Sync Data" button
- **Can't save?** → Check if you're in Live Mode
- **API errors?** → Check your internet connection
- **Empty forms?** → Make sure required fields are filled

---

## 🎉 **Success Indicators**

### **You'll Know It's Working When:**
1. ✅ **Green "Live Data" chip** shows in header
2. ✅ **New records appear** in your app tables
3. ✅ **Same records visible** at crm.zoho.in
4. ✅ **No error messages** when saving
5. ✅ **Sync button works** without errors

### **Sample Data to Add:**

**Contact:**
```
Name: Alice Johnson
Email: alice@innovate.com
Phone: +1-555-0125
Company: Innovate Solutions
```

**Lead:**
```
Name: Bob Smith
Email: bob@startup.com
Status: Qualified
Source: Referral
Value: 7500
```

**Deal:**
```
Deal Name: Marketing Automation Platform
Amount: 15000
Stage: Proposal
Close Date: 2025-04-01
```

Now you can add real data to your Zoho CRM and see it in your MangOS app! 🚀