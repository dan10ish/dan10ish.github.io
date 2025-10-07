# Today I Learned (TIL) Section Setup Guide

This guide will walk you through setting up the complete TIL feature on your website. The TIL section appears on your homepage as a tabbed interface alongside your Writings, with a smooth animated underline using Framer Motion.

## Quick Start (4 minutes)

1. **Create Supabase database** (1 min) - Run SQL from Step 1
2. **Configure credentials** (1 min) - Add to .env.local and copy for shortcut
3. **Create Apple Shortcut** (2 min) - Follow Step 3 below
4. **Done!** Start adding TIL entries from anywhere

The shortcut posts directly to Supabase's REST API - simpler and faster!

## Prerequisites
- Node.js installed
- Supabase account (free tier works)
- Apple device with Shortcuts app (iPhone/iPad/Mac)

## Step 1: Supabase Database Setup

### 1.1 Create a Supabase Project
1. Go to https://supabase.com and sign in
2. Create a new project
3. Wait for the project to initialize

### 1.2 Create the Database Table
1. Go to the SQL Editor in your Supabase dashboard
2. Run this SQL command:

```sql
CREATE TABLE til_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date TEXT NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('tweet', 'text', 'link', 'youtube', 'book', 'image')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX idx_til_date ON til_entries(date DESC);
CREATE INDEX idx_til_created ON til_entries(created_at DESC);
```

### 1.3 Set Row Level Security (Optional but Recommended)
1. In the Supabase dashboard, go to Authentication > Policies
2. For public read access and authenticated write:

```sql
CREATE POLICY "Enable read access for all users" ON til_entries
FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON til_entries
FOR INSERT WITH CHECK (auth.role() = 'authenticated');
```

Or for fully public access (simpler for personal use with Apple Shortcuts):

```sql
CREATE POLICY "Enable all access for all users" ON til_entries
FOR ALL USING (true);
```

## Step 2: Configure Supabase Credentials

### 2.1 Get Your API Credentials

1. Go to Supabase Dashboard → **Project Settings** → **API**
2. Copy these two values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGc...` (long string)

### 2.2 Add to Your Project

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...your-key-here
```

This lets your website fetch TIL entries from Supabase.

### 2.3 Keep These Handy for the Shortcut

You'll use the same URL and key in Step 3 for the Apple Shortcut!

## Step 3: Apple Shortcuts Setup

### The Shortcut (6 Simple Actions)

Open Shortcuts app and add these 6 actions:

---

**1. Ask for Input**
- Prompt: `Add to TIL`

---

**2. If** (to detect content type)
- If `Provided Input` contains `youtube`
  - **Text**: type `youtube`
- Otherwise if `Provided Input` contains `twitter`
  - **Text**: type `tweet`
- Otherwise if `Provided Input` contains `x.com`
  - **Text**: type `tweet`
- Otherwise if `Provided Input` contains `http`
  - **Text**: type `link`
- Otherwise
  - **Text**: type `text`

(End If)

---

**3. Current Date**
(Just add the action, no config)

---

**4. Format Date**
- Date: `Current Date`
- Format: Custom
- Format String: `dd-MM-yyyy`

---

**5. Dictionary**
Tap "Add new item" three times to create:
- `date` = `Formatted Date` (from step 4)
- `content_type` = `Text` (from step 2)
- `content` = `Provided Input` (from step 1)

---

**6. Get Contents of URL**

**How to build the URL:**
1. Take your Project URL: `https://xxxxx.supabase.co`
2. Add this to the end: `/rest/v1/til_entries`
3. Final URL: `https://okbjguqdekoohibfpdwn.supabase.co/rest/v1/til_entries`

**⚠️ Important:** Don't use double `https://`! The Project URL already includes `https://`

**Shortcut Configuration:**
- URL: `https://okbjguqdekoohibfpdwn.supabase.co/rest/v1/til_entries`
- Method: `POST`
- Request Body: `JSON`
- JSON: `Dictionary` (from step 5)

**Headers (tap "Show More" and add all 4):**
- `apikey` = `YOUR_SUPABASE_ANON_KEY`
- `Authorization` = `Bearer YOUR_SUPABASE_ANON_KEY`
- `Content-Type` = `application/json`
- `Prefer` = `return=minimal`

*(Get these from Supabase Dashboard → Project Settings → API)*

---

**7. Show Notification**
- `✅ Added to TIL!`

---

**Done!** Name it "TIL"

## Visual Guide

```
Ask for Input
  ↓
Detect type (youtube/twitter/link/text)
  ↓
Get & format date
  ↓
Build dictionary {date, content_type, content}
  ↓
POST to API
  ↓
Show confirmation
```

## Usage Examples

Run the shortcut and enter any of these:

**Text note:**
```
Learned about Supabase RLS today
```
→ Auto-saved as "text"

**Tweet:**
```
https://twitter.com/dan10ish/status/123456
```
→ Auto-saved as "tweet" (instant load with preloading, dark mode support!)

**YouTube:**
```
https://youtube.com/watch?v=abc123
```
→ Auto-saved as "youtube" (instant load with DNS prefetch, privacy-enhanced)

**Article:**
```
https://example.com/cool-article
```
→ Auto-saved as "link"

## Quick Tips

**Use with Siri:**
"Hey Siri, TIL" → Dictate or paste

**Use from Share Sheet:**
Safari → Share → TIL (auto-grabs URL)

**Add to Home Screen:**
Widget → Shortcuts → Select TIL

## Step 4: Test the Shortcut

### 4.1 Test Adding an Entry
1. Run your "TIL" shortcut
2. Enter: `Testing my TIL setup!`
3. You should see "✅ Added to TIL!" notification

### 4.2 Verify in Supabase
1. Go to Supabase Dashboard → **Table Editor** → **til_entries**
2. You should see your test entry there

### 4.3 Check Your Website
1. Make sure your site is deployed: `npm run build && npm run deploy`
2. Visit your homepage
3. Click the "Today I Learned" tab
4. Your entry should appear!

**Note:** The website fetches from Supabase client-side, so just refresh the page to see new entries.

## Step 5: Usage

### Adding Content via Shortcuts
- Run "Add TIL" shortcut from anywhere
- Choose content type
- Enter the required information
- Entry appears on your homepage under the "Today I Learned" tab immediately

### What Content Types Are Supported?

The system automatically handles:

- **Text**: Plain text notes and thoughts
- **Tweets**: `https://twitter.com/user/status/123` or `https://x.com/user/status/123`
- **YouTube**: `https://youtube.com/watch?v=ID` or `https://youtu.be/ID`
- **Links**: Any URL (fetches preview automatically)
- **Books**: Manually add via API with title/author metadata
- **Images**: Direct image URLs

The shortcuts above handle the most common cases (text and links). For books/images, you can extend the shortcuts or use a tool like Postman to POST directly to your API.

## Troubleshooting

### Shortcut Issues

**Issue: "Network request failed" in shortcut**
- Check your Supabase URL is correct: `https://xxxxx.supabase.co/rest/v1/til_entries`
- Verify all 4 headers are added: `apikey`, `Authorization`, `Content-Type`, `Prefer`
- Make sure the `Authorization` header has `Bearer ` prefix (with space after)
- Check your anon key is correct (starts with `eyJ`)

**Issue: Shortcut runs but nothing appears on site**
- Check Supabase Dashboard → Table Editor → til_entries to see if data was saved
- If data is there, refresh your website (TIL data loads client-side on page load)
- Check browser console for errors
- Make sure you've deployed your site with the latest code

**Issue: Shortcut not sending data**
- Make sure Request Body is set to "JSON" (not Form or File)
- Make sure you selected the Dictionary variable, not typed it as text
- The dictionary should have exactly 3 items: date, content_type, content

### Database Issues

**Issue: "Failed to create entry"**
- Check your Supabase URL and key in `.env.local`
- Verify the table was created correctly with the SQL from Step 1
- Check RLS policies allow inserts (or use the public access policy)

**Issue: "CORS error"**
- Add your domain to Supabase allowed origins
- Go to Dashboard > Project Settings > API > CORS
- For GitHub Pages, add: `https://yourusername.github.io`

### Display Issues

**Issue: Twitter embeds not showing**
- Ensure the URL format is correct (full tweet URL)
- Twitter embed script loads automatically on page load
- Check browser console for Twitter widget errors

**Issue: Link previews not working**
- Some sites block scraping (this is normal)
- The link will still work, just won't show preview
- Consider using a service like Microlink API for better previews

## Advanced Tips

### Siri Voice Control
1. Name your shortcut something simple like "TIL"
2. Say "Hey Siri, TIL" to activate it
3. Siri will prompt you for input

### Home Screen Widget
1. Long press on home screen
2. Tap "+" → Search "Shortcuts"
3. Add widget and select your TIL shortcut
4. One-tap access!

### Share Sheet Integration
1. In Safari/Twitter/YouTube, find something interesting
2. Tap Share button
3. Scroll and select "Shortcuts" → Your TIL shortcut
4. It will automatically grab the URL

### Automations (Optional)
Create time-based reminders:
- **Personal > Automation > Time of Day**
- Set for 9 PM daily
- Action: "Ask for Input" with your TIL shortcut
- Great for daily reflection habit!

## Security Notes

- Never commit `.env.local` to git
- Use Row Level Security in production
- Consider adding API key authentication
- Monitor Supabase usage to avoid overages

## Support

If you encounter issues:
1. Check Supabase logs in Dashboard > Logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Test API endpoint directly with curl/Postman

---

That's it! Your TIL section is now fully functional and can be updated from anywhere using Apple Shortcuts.

