
// tracker.js


class UserTracker {
  // Consent check
  static hasUserConsented() {
    // Replace with your real consent logic (e.g., check cookie/localStorage)
    return window.localStorage.getItem('trackingConsent') === 'true';
  }

  // UA Parsing (to be replaced with UAParser.js for best results)
  static parseUserAgent() {
    const ua = navigator.userAgent;
    const result = {
      browser: { name: "Unknown", version: "" },
      os: { name: "Unknown", version: "" },
      device: { type: "Desktop", vendor: null, model: null }
    };
    const browserMatch = ua.match(/(firefox|msie|trident|chrome|safari|opr|edg(?=\/))\/?\s*(\d+)/i) || [];
    const osMatch = ua.match(/\(([^)]+)\)/);
    if (browserMatch.length > 1) {
      let name = browserMatch[1];
      let version = browserMatch[2];
      if (/trident/i.test(name)) {
        name = "IE";
        version = /\brv[ :]+(\d+)/g.exec(ua) ? RegExp.$1 : version;
      }
      if (name.toLowerCase() === "opr") name = "Opera";
      if (name.toLowerCase() === "edg") name = "Edge";
      result.browser.name = name;
      result.browser.version = version;
    }
    if (osMatch && osMatch[1]) {
      const osInfo = osMatch[1];
      if (osInfo.includes("Windows")) result.os.name = "Windows";
      else if (osInfo.includes("Mac OS")) result.os.name = "macOS";
      else if (osInfo.includes("Android")) result.os.name = "Android";
      else if (osInfo.includes("iPhone") || osInfo.includes("iPad")) result.os.name = "iOS";
      else if (osInfo.includes("Linux")) result.os.name = "Linux";
      result.os.version = "";
    }
    if (/Mobi|Android/i.test(ua)) result.device.type = "Mobile";
    else if (/Tablet|iPad/i.test(ua)) result.device.type = "Tablet";
    return result;
  }

  // Main tracking function
  static async getUserTrackingInfo() {
    if (!UserTracker.hasUserConsented()) {
      console.warn("User has not consented to tracking.");
      return null;
    }
    // Get IP/location info with timeout
    let ipInfo = {};
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout
      const res = await fetch("https://ipwho.is/", { signal: controller.signal });
      clearTimeout(timeout);
      ipInfo = await res.json();
    } catch (e) {
      console.warn("IP lookup failed:", e);
    }
    const parsedUA = UserTracker.parseUserAgent();
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return {
      ip: ipInfo.ip || "N/A",
      city: ipInfo.city || "N/A",
      region: ipInfo.region || "N/A",
      country: ipInfo.country || "N/A",
      isp: ipInfo.connection?.isp || "N/A",
      latitude: typeof ipInfo.latitude === 'number' ? ipInfo.latitude : null,
      longitude: typeof ipInfo.longitude === 'number' ? ipInfo.longitude : null,
      browser: `${parsedUA.browser.name} ${parsedUA.browser.version}`,
      os: `${parsedUA.os.name} ${parsedUA.os.version}`,
      device: parsedUA.device.type || "Desktop",
      vendor: parsedUA.device.vendor || "N/A",
      model: parsedUA.device.model || "N/A",
      screen: screenSize,
      timezone: timezone,
      language: navigator.language || "N/A",
      referrer: document.referrer || "Direct or unknown",
      userAgent: navigator.userAgent
    };
  }
}
