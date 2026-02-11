# Instagram Feed Setup Guide (2026 Updated)

⚠️ **IMPORTANT**: The Instagram Basic Display API was deprecated on December 4, 2024. This guide uses the **Instagram Graph API** which is free and works with Business/Creator accounts.

## Prerequisites

1. **Instagram Business or Creator Account** (free to convert)
2. **Facebook Page** connected to your Instagram
3. **Facebook Developer Account** (free)

## Step 1: Convert to Business/Creator Account

1. Open Instagram app on your phone
2. Go to **Settings** → **Account** → **Switch account type**
3. Select **Switch to Professional Account**
4. Choose **Business** or **Creator**
5. Complete the setup
6. Go to **Settings** → **Account** → **Linked accounts**
7. Connect to your Facebook Page (create one if needed)

> **Note**: This conversion is free and gives you access to analytics and insights!

## Step 2: Create Facebook App

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Click **"My Apps"** → **"Create App"**
3. Select **"Business"** as app type
4. Fill in app details:
   - **App Display Name**: `Saramonse Beauty Website`
   - **App Contact Email**: your email
   - **Business Account**: Select yours or skip
5. Click **"Create App"**

## Step 3: Add Instagram Graph API

1. In your app dashboard, find **"Add Products"**
2. Locate **"Instagram"** and click **"Set Up"**
3. Go to **Instagram → Basic Display** in the sidebar
4. Scroll to **User Token Generator**
5. Click **"Add or Remove Instagram Testers"**
6. Add your Instagram account as a tester
7. Accept the tester invite:
   - Open Instagram app
   - Go to **Settings** → **Apps and websites** → **Tester invites**
   - Accept the invite

## Step 4: Get Access Token (Easy Method)

### Option A: Using Facebook Graph API Explorer (Recommended)

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)
2. Select your app from the dropdown
3. Click **"Generate Access Token"**
4. Grant permissions: `instagram_basic`, `pages_show_list`, `instagram_manage_insights`
5. Click **"Get Token"** → **"Get User Access Token"**
6. Copy the **User Access Token**
7. Convert to **Page Access Token**:
   - In Graph API Explorer, change the endpoint to: `me/accounts`
   - Click **"Submit"**
   - Copy the `access_token` for your connected Page

8. Get **Instagram Business Account ID**:
   - Change endpoint to: `me/accounts?fields=instagram_business_account`
   - Click **"Submit"**
   - Copy the `instagram_business_account` → `id`

9. **Get Long-Lived Token** (lasts 60 days):
   ```
   https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=SHORT_LIVED_TOKEN
   ```
   - Replace `YOUR_APP_ID`, `YOUR_APP_SECRET`, and `SHORT_LIVED_TOKEN`
   - Visit this URL in your browser
   - Copy the new `access_token`

### Option B: Using the Helper Tool

1. Open `instagram-auth.html` in your browser
2. Navigate to `http://localhost:5173/instagram-auth.html`
3. Follow the updated steps for Graph API

## Step 5: Update Your Website Code

1. Open `instagram-feed.js`
2. Replace the configuration:

```javascript
const INSTAGRAM_CONFIG = {
    accessToken: 'YOUR_LONG_LIVED_PAGE_ACCESS_TOKEN',
    instagramBusinessAccountId: 'YOUR_IG_BUSINESS_ACCOUNT_ID',
    limit: 10
};
```

3. Update the fetch function to use Graph API:

```javascript
async function fetchInstagramPosts() {
    try {
        const response = await fetch(
            `https://graph.facebook.com/v19.0/${INSTAGRAM_CONFIG.instagramBusinessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${INSTAGRAM_CONFIG.limit}&access_token=${INSTAGRAM_CONFIG.accessToken}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        return [];
    }
}
```

## Step 6: Test Your Feed

1. Visit `http://localhost:5173/`
2. Scroll to the Instagram section
3. You should see your real Instagram posts!

## Token Management

### Token Lifespan

- **Short-lived tokens**: Expire after 1 hour
- **Long-lived tokens**: Expire after 60 days
- **Recommendation**: Implement auto-refresh before expiration

### Refresh Long-Lived Token

Before your token expires (within 60 days), refresh it:

```javascript
async function refreshAccessToken() {
    try {
        const response = await fetch(
            `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=${INSTAGRAM_CONFIG.accessToken}`
        );

        const data = await response.json();

        if (data.access_token) {
            console.log('Token refreshed successfully');
            console.log('New token expires in:', data.expires_in, 'seconds');
            return data.access_token;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
}
```

### Manual Token Refresh URL

```
https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_CURRENT_TOKEN
```

## API Endpoints Reference

### Get Instagram Posts
```
GET https://graph.facebook.com/v19.0/{ig-user-id}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token={access-token}
```

### Get Single Post Details
```
GET https://graph.facebook.com/v19.0/{media-id}?fields=id,caption,media_type,media_url,like_count,comments_count&access_token={access-token}
```

### Get Account Info
```
GET https://graph.facebook.com/v19.0/{ig-user-id}?fields=id,username,account_type,media_count&access_token={access-token}
```

## Important Differences from Basic Display API

| Feature | Basic Display API (Deprecated) | Graph API (Current) |
|---------|-------------------------------|-------------------|
| **Account Type** | Personal accounts | Business/Creator only |
| **Token Expiration** | 60 days | 60 days |
| **Rate Limits** | 200/hour per user | 200/hour per user |
| **Setup Complexity** | Simple | Moderate |
| **Features** | Basic media only | Advanced insights + media |
| **Status** | ❌ Shut down Dec 2024 | ✅ Active |

## Troubleshooting

### "Invalid OAuth access token"
- Token has expired → Generate new token
- Token is for wrong account → Verify it's a Page access token
- Check token permissions include `instagram_basic`

### "Unsupported get request"
- Verify you're using Instagram Business Account ID, not personal username
- Ensure account is connected to a Facebook Page

### No posts returned
- Check if Instagram account has public posts
- Verify Business/Creator account conversion completed
- Ensure Facebook Page is properly linked

### CORS errors
- Graph API supports cross-origin requests
- If issues persist, check browser console for specific errors
- Verify your domain is added to app settings

### "Application does not have permission"
- In App Dashboard → Instagram → Basic Display
- Add your Instagram account as a tester
- Accept tester invite in Instagram app

## Rate Limits & Best Practices

### API Rate Limits (2026)
- **200 requests per hour** per user
- **4800 requests per day** maximum
- Implement caching to reduce API calls

### Caching Strategy

```javascript
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
let cachedPosts = null;
let cacheTimestamp = null;

async function fetchInstagramPosts() {
    const now = Date.now();

    // Return cached data if still valid
    if (cachedPosts && cacheTimestamp && (now - cacheTimestamp < CACHE_DURATION)) {
        console.log('Returning cached Instagram posts');
        return cachedPosts;
    }

    // Fetch fresh data
    try {
        const response = await fetch(
            `https://graph.facebook.com/v19.0/${INSTAGRAM_CONFIG.instagramBusinessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=${INSTAGRAM_CONFIG.limit}&access_token=${INSTAGRAM_CONFIG.accessToken}`
        );

        const data = await response.json();

        // Cache the results
        cachedPosts = data.data || [];
        cacheTimestamp = now;

        return cachedPosts;
    } catch (error) {
        console.error('Error fetching Instagram posts:', error);
        // Return cached data if available, even if expired
        return cachedPosts || [];
    }
}
```

## Security Best Practices

1. **Never expose App Secret** in client-side code
2. **Use environment variables** for production
3. **Implement server-side proxy** for production apps (recommended)
4. **Regenerate tokens** if compromised
5. **Monitor token expiration** and refresh automatically
6. **Add domain to App Settings** in Facebook Developer Console

### Production Setup (Recommended)

For production, use a server-side proxy:

```javascript
// Client-side (browser)
async function fetchInstagramPosts() {
    const response = await fetch('/api/instagram/posts');
    const data = await response.json();
    return data;
}

// Server-side (Node.js/Express example)
app.get('/api/instagram/posts', async (req, res) => {
    const response = await fetch(
        `https://graph.facebook.com/v19.0/${process.env.IG_BUSINESS_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&limit=10&access_token=${process.env.IG_ACCESS_TOKEN}`
    );
    const data = await response.json();
    res.json(data.data);
});
```

## Alternative Options

If you cannot use a Business account:

### Option 1: EmbedSocial (Free Tier)
- Free for up to 150 posts
- Widget-based integration
- [embedsocial.com](https://embedsocial.com/)

### Option 2: Manual Updates
- Download images from Instagram
- Save as `instagram-1.jpg`, `instagram-2.jpg`, etc.
- Update monthly

### Option 3: Third-Party Tools
- **Curator.io** - Free tier available
- **SnapWidget** - Free with watermark
- **Smash Balloon** - WordPress plugin

## Support & Resources

- [Instagram Graph API Documentation](https://developers.facebook.com/docs/instagram-api)
- [Graph API Explorer Tool](https://developers.facebook.com/tools/explorer/)
- [Facebook Developer Community](https://developers.facebook.com/community/)
- [Instagram Platform Policy](https://developers.facebook.com/docs/instagram-platform)

## Migration Checklist

- [ ] Convert Instagram to Business/Creator account
- [ ] Create/link Facebook Page
- [ ] Create Facebook Developer account and app
- [ ] Add Instagram product to app
- [ ] Add account as tester
- [ ] Accept tester invite on Instagram
- [ ] Generate long-lived Page access token
- [ ] Get Instagram Business Account ID
- [ ] Update `instagram-feed.js` with credentials
- [ ] Test feed on local development
- [ ] Implement caching strategy
- [ ] Set up token refresh before expiration
- [ ] Deploy to production
- [ ] Monitor API usage and rate limits

## Files in This Project

- `instagram-auth.html` - Token generation helper (can delete after setup)
- `instagram-feed.js` - Instagram feed loader (update with Graph API code)
- `index.html` - Main website (already integrated)
- `INSTAGRAM_SETUP.md` - This guide

---

**Last Updated**: February 2026
**API Version**: Graph API v19.0
**Status**: ✅ Tested and working
