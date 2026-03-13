# TenantMatch - Supabase Setup Guide

## Quick Start

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in details:
   - **Name**: TenantMatch
   - **Database Password**: Set a strong password
   - **Region**: Select closest to Gauteng (Johannesburg is EU-AF if available)
4. Wait for project to provision (1-2 minutes)

### 2. Get Credentials
1. In your Supabase dashboard, go to **Settings** (gear icon)
2. Click **API**
3. Copy:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

### 3. Update Configuration
Open `js/supabase.js` and replace the values:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_PROJECT_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
```

### 4. Run SQL Schema
1. In Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Copy all content from `supabase/schema.sql`
4. Paste and click **Run**

### 5. Test Connection
Open `auth.html` in your browser and try to sign up or sign in.

---

## Running Locally

### Option A: Live Server (Recommended)
```bash
# If you have Python installed
python -m http.server 8000

# Or with Node.js
npx serve .
```

Then open: `http://localhost:8000`

### Option B: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

---

## Environment Variables (Production)

For production, create `.env` file:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Database Structure

| Table | Description |
|-------|-------------|
| `profiles` | User accounts with roles |
| `properties` | Landlord properties |
| `units` | Individual units |
| `applications` | Tenant applications |
| `tenant_documents` | Uploaded documents |
| `maintenance` | Maintenance requests |
| `payments` | Payment records |
| `notifications` | User notifications |
| `leases` | Lease agreements |

---

## Switching Between Mock & Real Data

The app currently uses **mock data** by default. To switch to Supabase:

1. Open each dashboard JS file
2. Replace `MockData.api.getProperties()` calls with Supabase queries
3. Example:

```javascript
// Instead of:
const properties = MockData.api.getProperties({ owner_id: userId })

// Use:
const { data: properties } = await supabase
  .from('properties')
  .select('*')
  .eq('owner_id', userId)
```

---

## Troubleshooting

### "Invalid login credentials"
- Check your Supabase URL and key are correct
- Ensure Auth is enabled in Supabase (Authentication → Providers → Email)

### "Table does not exist"
- Run the schema.sql in Supabase SQL Editor
- Check you're using the correct project

### CORS errors
- Supabase API should allow CORS by default
- If issues, check Supabase dashboard → API → Settings

---

## Next Steps for Production

1. ✅ Set up Supabase project
2. ✅ Configure authentication  
3. ⬜ Add storage for documents/images
4. ⬜ Set up real-time subscriptions
5. ⬜ Add Row Level Security policies
6. ⬜ Configure email templates
7. ⬜ Set up Stripe payments
