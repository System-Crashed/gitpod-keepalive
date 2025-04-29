# Keep Gitpod Workspace Active

This project uses **Puppeteer** to keep your **Gitpod workspace active** by automatically simulating activity (moving the mouse and pressing keys) every few minutes. This helps prevent session timeouts that occur after periods of inactivity.

## Features
- Simulates activity (moving the mouse and pressing keys) every 5 minutes to keep the session alive.
- Runs **headless** (without a graphical user interface) on a VPS or server.
- Includes multiple workspace

---

## Prerequisites
Before you begin, make sure you have the following:
- **Node.js** and **npm** installed on your system.
- A **VPS** or server where you can run this script.
- A **Gitpod workspace** that you have logged into using your GitHub account.
- **Personal Access Token (PAT)** from your GitHub profile for authentication.

---

## Steps

### 1. Get Personal Access Token (PAT)
a. Go to your GitHub Settings:
URL: https://github.com/settings/tokens

b. Click “Fine-grained tokens” or “Tokens (classic)”

c. Click “Generate new token (classic)”

d. Set token options:
- Note: Gitpod Keep-Alive Script (or any name)
- Expiration: Set it to "No expiration" or choose a timeframe.
- Scopes:
   - read:user
   - user:email
   - repo (only if you're using Gitpod with private repositories)

e. Click “Generate token”

f. Copy the token shown. You won’t see it again.

### 2. Set Up the `workspace.txt` and `.env` Script

a. Set screen
```bash
screen -S gitpod-keepalive
```

b. Clone the repository
```bash
git clone https://github.com/System-Crashed/gitpod-keepalive.git && cd gitpod-keepalive && npm i puppeteer fs dotenv
```

c. Edit `workspaces.txt`
```bash
nano workspaces.txt
```
Edit with your workspaces
```bash
https://ws1.gitpod.io
https://ws2.gitpod.io
https://ws3.gitpod.io
```

d. Edit `.env` for your PAT
```bash
nano .env
```
```bash
GITHUB_USERNAME=your_github_username
GITHUB_PAT=your_github_personal_access_token
```

### 4. Running the Script
**Run the script** with the following command:

```bash
node keepalive.js
```

**Monitor the Output**:
   - If successful, you will see logs in the terminal like:
     
     ![image](https://github.com/user-attachments/assets/194ee0c4-602c-44a9-ad1a-dfc6d0a6c8bf)

---

## Notes
- **Signing out** from Gitpod in the browser will invalidate the sessions.
---

By following the steps above, you will be able to keep your Gitpod workspace active without worrying about session timeouts. If you have any questions or run into issues, feel free to open an **issue** !

---
