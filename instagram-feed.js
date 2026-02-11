// Instagram Feed Configuration
const INSTAGRAM_CONFIG = {
    accessToken: 'YOUR_LONG_LIVED_PAGE_ACCESS_TOKEN', // Replace with your Page access token
    instagramBusinessAccountId: 'YOUR_IG_BUSINESS_ACCOUNT_ID', // Replace with your IG Business Account ID
    limit: 10 // Number of posts to fetch
};

// Caching configuration
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes
let cachedPosts = null;
let cacheTimestamp = null;

/**
 * Fetch Instagram posts from the Graph API
 */
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
            `https://graph.facebook.com/v19.0/${INSTAGRAM_CONFIG.instagramBusinessAccountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=${INSTAGRAM_CONFIG.limit}&access_token=${INSTAGRAM_CONFIG.accessToken}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

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

/**
 * Create HTML for an Instagram post card
 */
function createInstagramPostHTML(post, index) {
    const imageUrl = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
    const hiddenClass = index >= 5 ? 'instagram-hidden hidden' : '';

    return `
        <div class="instagram-post ${hiddenClass} aspect-square bg-beauty-light overflow-hidden relative group cursor-pointer" data-permalink="${post.permalink}">
            <img src="${imageUrl}" alt="${post.caption || 'Instagram post'}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy">
            <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <svg class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            </div>
        </div>
    `;
}

/**
 * Load and display Instagram posts
 */
async function loadInstagramFeed() {
    const grid = document.getElementById('instagram-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!grid) return;

    // Show loading state
    grid.innerHTML = '<p class="col-span-full text-center text-gray-600">Loading Instagram posts...</p>';

    // Fetch posts
    const posts = await fetchInstagramPosts();

    if (posts.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-gray-600">No posts found. Please check your access token.</p>';
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
        return;
    }

    // Clear grid and add posts
    grid.innerHTML = posts.map((post, index) => createInstagramPostHTML(post, index)).join('');

    // Add click handlers to open Instagram posts
    const postElements = grid.querySelectorAll('.instagram-post');
    postElements.forEach(postElement => {
        postElement.addEventListener('click', () => {
            const permalink = postElement.dataset.permalink;
            if (permalink) {
                window.open(permalink, '_blank');
            }
        });
    });

    // Setup load more button
    if (loadMoreBtn && posts.length > 5) {
        loadMoreBtn.style.display = 'block';
        loadMoreBtn.onclick = () => {
            const hiddenPosts = grid.querySelectorAll('.instagram-hidden');
            hiddenPosts.forEach(post => {
                post.classList.remove('hidden');
            });
            loadMoreBtn.style.display = 'none';
        };
    } else if (loadMoreBtn) {
        loadMoreBtn.style.display = 'none';
    }
}

/**
 * Refresh long-lived token (call this periodically)
 * Token expires after 60 days, so refresh before expiration
 *
 * NOTE: This requires YOUR_APP_ID and YOUR_APP_SECRET which should NOT be exposed in client-side code.
 * For production, implement this on the server side.
 *
 * Manual refresh URL (use in browser):
 * https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_CURRENT_TOKEN
 */
async function refreshAccessToken(appId, appSecret) {
    try {
        const response = await fetch(
            `https://graph.facebook.com/v19.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${INSTAGRAM_CONFIG.accessToken}`
        );

        const data = await response.json();

        if (data.access_token) {
            console.log('Token refreshed successfully');
            console.log('New token expires in:', data.expires_in, 'seconds');
            console.log('New token:', data.access_token);
            // You'll need to manually update the token in your config
            return data.access_token;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadInstagramFeed);
} else {
    loadInstagramFeed();
}

// Export for use in other scripts
export { fetchInstagramPosts, loadInstagramFeed, refreshAccessToken };
