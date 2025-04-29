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

a. **Login to Gitpod** using your GitHub account in your browser.
b. Access the Gitpod workspace you want to keep active.
c. Open **Developer Tools** (DevTools) in your browser by pressing `F12` or right-clicking and selecting "Inspect" or "Inspect Element".
d. Go to the **Console** tab in DevTools.
e. On the bottom, paste this to your Console
```bash
const cookies = document.cookie.split('; ').map(c => {
  const [name, ...v] = c.split('=');
  return { name, value: v.join('='), domain: '.gitpod.io', path: '/' };
});
copy(JSON.stringify(cookies, null, 2));
```
e. Paste the copied cookies into a new file called `cookies.json` on your computer or VPS.
   (cookies are automatically copied to your clipboard and you only need to paste it)

### 2. Set Up the `keepalive.js` Script

a. Set screen
```bash
screen -S gitpod-keepalive
```

b. Clone the repository
```bash
git clone https://github.com/System-Crashed/gitpod-keepalive.git && cd gitpod-keepalive.git && npm puppeteer fs
```

c. Edit workspace
```bash
nano keepalive.js
```
and edit this line
```bash
await page.goto('YOUR_WORKSPACE_DOMAIN.gitpod.io', { waitUntil: 'networkidle2' });
```

### 4. Running the Script

a. **Make sure the `cookies.json`** file you is saved in same directory (in this case inside gitpod-keepalive dir).

b. **Run the script** with the following command:

```bash
node keepalive.js
```

c. **Monitor the Output**:
   - If successful, you will see logs in the terminal like:
     
     ![image](https://github.com/user-attachments/assets/194ee0c4-602c-44a9-ad1a-dfc6d0a6c8bf)

---

## Notes
- **Signing out** from Gitpod in the browser will invalidate the cookies used by this script. Make sure to update the `cookies.json` file if you sign out or if your cookies expire.
---

By following the steps above, you will be able to keep your Gitpod workspace active without worrying about session timeouts. If you have any questions or run into issues, feel free to open an **issue** !

---
