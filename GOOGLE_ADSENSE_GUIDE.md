# Google AdSense Integration Guide

## Setup Instructions

### 1. Get Your Publisher ID
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign in with your Google account
3. Navigate to **Settings** → **Account**
4. Copy your **Publisher ID** (format: `ca-pub-xxxxxxxxxxxxxxxx`)

### 2. Update Configuration Files

Replace `YOUR_PUBLISHER_ID` in the following files:

#### a) `frontend/public/index.html` (Already updated)
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
 crossorigin="anonymous"></script>
```

#### b) `frontend/src/components/ui/GoogleAdSense.jsx`
```jsx
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
```

### 3. Create Ad Slots in Google AdSense

1. In Google AdSense, go to **Ads** → **By code**
2. Click **Create new ad unit**
3. Choose ad type (Display Ad, In-article, etc.)
4. Copy the **Ad slot ID** (format: `1234567890`)

## Usage Examples

### Basic Display Ad
```jsx
import GoogleAdSense from '../components/ui/GoogleAdSense';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <GoogleAdSense adSlot="1234567890" />
    </div>
  );
}
```

### In-Article Ad
```jsx
<GoogleAdSense 
  adSlot="1234567890" 
  adFormat="fluid"
/>
```

### Sidebar Ad
```jsx
<GoogleAdSense 
  adSlot="1234567890" 
  adFormat="vertical"
  fullWidth={false}
/>
```

## Recommended Placements

1. **Blog Page/Post** - Between paragraphs
   ```jsx
   <// BlogContent>
   <GoogleAdSense adSlot="SLOT_ID_1" adFormat="fluid" />
   <// MoreContent>
   ```

2. **Product/Shop Pages** - Below product details
   ```jsx
   <// ProductDetails>
   <GoogleAdSense adSlot="SLOT_ID_2" />
   <// Reviews>
   ```

3. **Portfolio Page** - Between project sections
   ```jsx
   <// ProjectGallery>
   <GoogleAdSense adSlot="SLOT_ID_3" />
   <// NextProjects>
   ```

4. **Homepage** - Below hero section
   ```jsx
   <// HeroSection>
   <GoogleAdSense adSlot="SLOT_ID_4" />
   <// Services>
   ```

5. **Footer Area** - Another display ad

## Important Notes

✅ **Do's:**
- Follow Google AdSense policies strictly
- Don't click your own ads (it's against policy)
- Place ads naturally in content
- Test on mobile (responsive by default)
- Wait 24-48 hours for ads to appear after setup
- Monitor your AdSense dashboard regularly

❌ **Don'ts:**
- Don't mislead users about ads
- Don't place excessive ads (max 3 per page recommended)
- Don't use AdSense with other ad networks that conflict
- Don't have blank/broken ad spaces
- Don't use invalid traffic strategies

## Environment Setup

### Development Testing
AdSense won't show test ads in development. You can:
1. Deploy to staging/production first
2. Use Google's publisher ID with test mode
3. Check browser console for AdSense errors

### Production Deployment
Ensure your domain is registered in Google AdSense before deploying:
1. Verify your domain in AdSense settings
2. Deploy code changes
3. Check AdSense dashboard within 24-48 hours

## Troubleshooting

### Ads Not Showing
- Check Publisher ID is correct
- Check Ad slot ID is correct
- Wait 24-48 hours for initial setup
- Verify domain is approved in AdSense
- Check browser console for errors

### Ad Slots Not Created
- Log into Google AdSense
- Create new ad units first
- Copy slot IDs correctly
- Ensure ad type matches format parameter

### Policy Issues
- Review [AdSense Policies](https://support.google.com/adsense/answer/48182)
- Check for prohibited content
- Ensure proper ad placement

## References
- [Google AdSense Help](https://support.google.com/adsense)
- [AdSense API Documentation](https://developers.google.com/google-ads/adsense/api)
- [Getting Started with AdSense](https://support.google.com/adsense/answer/10162)
