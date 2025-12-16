# Queue Overflow

A Chrome extension to bookmark coding problems from major platforms and maintain your personal revision sheet.


## Overview

Queue Overflow helps you quickly save problems from LeetCode, Codeforces, CodeChef, CSES, GeeksforGeeks, and MAANG.in to solve later.

Create and maintain a personal revision sheet for future practice (requires Google authentication).




## Features

### Bookmark Problems

One-click bookmarking on supported coding platforms. All bookmarks are stored locally and accessible from the extension popup.

### Steps to bookmark a problem

 1. Open any coding problem on a supported platform.

 2. Click Add to Bookmark.




### Personal Revision Sheet

Add bookmarked problems to your personal sheet for organized revision tracking. Google Sign-In required to sync your data.

### Steps to add a problem to your sheet

 1. Open a coding problem.

 2. Click Add to Sheet in the extension.

 3. Fill the form and click Push to sheet. 


### How to authenticate(required for sheet only)

 1. Click the Authenticate button in the extension.

 2. Choose your Google account.

 3. You’ll be redirected to a page — copy the link from that page and Open the copied link in a new tab to complete authentication.

    Why this extra step is required
    This step is necessary because I (the author) personally use Opera, and Opera currently blocks incoming redirects from extensions. To ensure the extension works properly on Opera as well, this manual step is required. Sorry for the inconvenience.




## Supported Platforms

- LeetCode
- Codeforces
- CodeChef
- CSES
- GeeksforGeeks
- MAANG.in


## Installation

1. Download code in zip an then unzip it

 OR 
 
 clone this repository

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked** and select the `extension` folder
5. Start bookmarking!




## Development

```bash
cd dev
npm install
npm run build
```

Rebuild the extension and reload it in `chrome://extensions/` after making changes.


## License

See [LICENSE](LICENSE) file for details.


