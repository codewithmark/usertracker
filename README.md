 # UserTracker.js

A simple, privacy-conscious JavaScript user tracking utility for web projects. Collects basic user information (browser, OS, device, IP/location, screen, timezone, language, referrer, and user agent) **only if the user has given consent**.

## Features
- **Consent-based tracking**: No data is collected unless the user has explicitly consented (via `localStorage` key `trackingConsent`).
- **User agent parsing**: Detects browser, OS, and device type (basic, can be replaced with [UAParser.js](https://github.com/faisalman/ua-parser-js) for more accuracy).
- **IP/location lookup**: Uses [ipwho.is](https://ipwho.is/) API with a 3-second timeout for privacy and reliability.
- **Screen, timezone, language, referrer, and user agent**: Captures additional useful context.
- **No external dependencies** (except for the IP API).

## Usage
1. **Add the script to your project**
   ```html
   <script src="tracker.js"></script>
   ```
2. **Set user consent** (example):
   ```js
   // Set consent (e.g., after user accepts cookies)
   window.localStorage.setItem('trackingConsent', 'true');
   ```
3. **Get tracking info**:
   ```js
   UserTracker.getUserTrackingInfo().then(data => {
     if (data) {
       console.log("Tracking Info:", data);
     } else {
       console.log("Tracking not performed (no consent)");
     }
   });
   ```

## Example Output
```json
{
  "ip": "8.8.8.8",
  "city": "Mountain View",
  "region": "California",
  "country": "United States",
  "isp": "Google LLC",
  "latitude": 37.4056,
  "longitude": -122.0775,
  "browser": "Chrome 116",
  "os": "Windows ",
  "device": "Desktop",
  "vendor": "N/A",
  "model": "N/A",
  "screen": "1920x1080",
  "timezone": "America/Los_Angeles",
  "language": "en-US",
  "referrer": "https://example.com/",
  "userAgent": "Mozilla/5.0 ..."
}
```

## Customization
- **Consent logic**: Update `UserTracker.hasUserConsented()` to match your consent management approach.
- **User agent parsing**: Swap out the built-in parser for [UAParser.js](https://github.com/faisalman/ua-parser-js) for more detailed detection.
- **IP/location API**: You can change the API endpoint in `getUserTrackingInfo()` if you prefer another service.

## Privacy Notice
- No tracking occurs unless the user has opted in.
- All data is collected client-side and is not sent anywhere by default. You are responsible for handling the data securely and in compliance with privacy laws.

## License
MIT License
