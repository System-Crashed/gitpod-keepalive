const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({
    headless: true,  // Run browser in headless mode (without GUI)
    args: ['--no-sandbox', '--disable-setuid-sandbox']  // Arguments to run in VPS/Server
  });

  const page = await browser.newPage();

  // Load cookies from cookies.json file
  console.log("🔄 Loading cookies...");
  const cookies = JSON.parse(fs.readFileSync('cookies.json', 'utf8'));
  await page.setCookie(...cookies);  // Set cookies for the page

  // Access the Gitpod workspace URL
  console.log("🔄 Accessing Gitpod workspace...");
  await page.goto('YOUR_WORKSPACE_DOMAIN.gitpod.io', { waitUntil: 'networkidle2' });

  // Show a success message once logged in
  console.log("✅ Successfully logged into the specified workspace.");

  // Keep the session alive by simulating activity every 5 minutes
  setInterval(async () => {
    try {
      // Randomly move the mouse
      await page.mouse.move(Math.random() * 100, Math.random() * 100);
      // Simulate pressing the Shift key
      await page.keyboard.press('Shift');  
      console.log("Simulating activity:", new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to simulate activity:", err.message);
    }
  }, 5 * 60 * 1000);  // Every 5 minutes

})();
