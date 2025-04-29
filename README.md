# Keep Gitpod Workspace Active

This project uses **Puppeteer** to keep your **Gitpod workspace active** by automatically simulating activity (moving the mouse and pressing keys) every few minutes. This helps prevent session timeouts that occur after periods of inactivity.

## Features
- Uses **cookies** copied from your browser to automatically log in to Gitpod.
- Simulates activity (moving the mouse and pressing keys) every 5 minutes to keep the session alive.
- Runs **headless** (without a graphical user interface) on a VPS or server.

---

## Prerequisites
Before you begin, make sure you have the following:
- **Node.js** and **npm** installed on your system.
- A **VPS** or server where you can run this script.
- A **Gitpod workspace** that you have logged into using your GitHub account.
- **Cookies** exported from your browser after logging into Gitpod.

---

## Steps

### 1. Getting Cookies from Gitpod Browser

1. **Login to Gitpod** using your GitHub account in your browser.
2. Access the Gitpod workspace you want to keep active.
3. Open **Developer Tools** (DevTools) in your browser by pressing `F12` or right-clicking and selecting "Inspect" or "Inspect Element".
4. Go to the **Application** tab in DevTools.
5. On the left panel, under **Storage**, choose **Cookies** and select the relevant Gitpod domain.
6. Right-click on the cookies and select **Copy All as JSON**.
7. Paste the copied cookies into a new file called `cookies.json` on your computer.

### 2. Set Up Your VPS or Server

On the server where you want to run the script, ensure that **Node.js** and **Puppeteer** are installed.

**Install Node.js:**

```bash
sudo apt update
sudo apt install nodejs npm
```

**Install Puppeteer:**

```bash
npm install puppeteer
```

### 3. Set Up the `keepalive.js` Script

Create a new file named `keepalive.js` on your server and insert the following code:

```javascript
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
  await page.goto('https://systemcrashed-capekah-8xw63voqzt7.ws-us118.gitpod.io/', { waitUntil: 'networkidle2' });

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
```

**Script Explanation:**
- The script uses **Puppeteer** to launch a headless browser, load cookies from the `cookies.json` file, and access the specified Gitpod workspace URL.
- Every 5 minutes, the script simulates activity by randomly moving the mouse and pressing the **Shift** key to keep the session alive.

### 4. Running the Script

1. **Upload the `cookies.json`** file you obtained from step 1 to the server where the script will run.
2. **Run the script** with the following command:

```bash
node keepalive.js
```

3. **Monitor the Output**:
   - If successful, you will see logs in the terminal like:
     ```
     ✅ Successfully logged into the specified workspace.
     Simulating activity: 12:34:56
     ```

### 5. Keeping the Script Running in the Background

If you want the script to continue running even after you log out of SSH, you can use **tmux** or **screen**.

**Install tmux:**

```bash
sudo apt-get install tmux
```

**Run the Script Inside tmux:**

1. Start a new tmux session by typing:
   ```bash
   tmux
   ```
2. Run the script:
   ```bash
   node keepalive.js
   ```
3. To **detach** and leave the tmux session running in the background, press `Ctrl + B`, then press `D`.

4. To **reattach** to the tmux session, run:
   ```bash
   tmux attach
   ```

---

## Notes
- **Signing out** from Gitpod in the browser will invalidate the cookies used by this script. Make sure to update the `cookies.json` file if you sign out or if your cookies expire.
- For an automated solution, you can consider using **OAuth** or **Personal Access Tokens** via Gitpod API to refresh cookies without having to log in manually.

---

By following the steps above, you will be able to keep your Gitpod workspace active without worrying about session timeouts. If you have any questions or run into issues, feel free to open an **issue** or contact us!

---

I hope this translation helps! If there’s anything else you’d like to adjust or add, let me know!
