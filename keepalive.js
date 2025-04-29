require('dotenv').config();
const puppeteer = require('puppeteer');
const fs = require('fs');

// Load credentials
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const GITHUB_PAT = process.env.GITHUB_PAT;

// Load workspace URLs from file
const WORKSPACES = fs.readFileSync('workspaces.txt', 'utf8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  console.log("🔄 Logging into GitHub...");
  await page.goto('https://github.com/login', { waitUntil: 'networkidle2' });
  await page.type('#login_field', GITHUB_USERNAME);
  await page.type('#password', GITHUB_PAT);
  await Promise.all([
    page.click('input[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
  ]);

  const cookies = await page.cookies();
  await page.close();

  // Open each workspace in a new tab and keep it alive
  for (const url of WORKSPACES) {
    const wsPage = await browser.newPage();
    await wsPage.setCookie(...cookies);

    console.log(`🔄 Accessing ${url}...`);
    await wsPage.goto(url, { waitUntil: 'networkidle2' });
    console.log(`✅ ${url} loaded.`);

    // Simulate activity every 5 minutes
    setInterval(async () => {
      try {
        await wsPage.mouse.move(Math.random() * 100, Math.random() * 100);
        await wsPage.keyboard.press('Shift');
        console.log(`Simulated activity on ${url}:`, new Date().toLocaleTimeString());
      } catch (err) {
        console.error(`Error on ${url}:`, err.message);
      }
    }, 5 * 60 * 1000);
  }

})();
