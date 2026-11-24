# Editing the Reshu Art Lobby website

You never need to touch code. Everything on the site — titles, text, prices, dates, menu, contact details and pictures — is edited in a web form.

## Open the editor

1. Go to **https://app.pagescms.org** and choose **Sign in with GitHub**.
2. Allow Pages CMS to access your repositories when asked, then open **reshuartlobby**.
3. You will see two areas on the left:
   - **Pages** — one entry per page of the website.
   - **Site settings** — the top menu, footer, phone, email, addresses and the announcement bar.

## Change text, prices or dates

1. Open **Pages**, then click the page (for example *summer-camp*).
2. Scroll to the part you want. A page is made of **Page sections**, top to bottom.
3. Change the text, then press **Save**.
4. The live site updates by itself in **1–2 minutes**. Refresh the page to see it.

Tips for text boxes:
- A blank line starts a new paragraph.
- `*word*` shows a word in italic colour (used in headings), `**word**` makes it bold.
- `[link text](https://address)` makes a link.

## Replace a picture

Every picture slot has a **Photo** field. Click it, upload your photo (or pick one you uploaded before) and save.
If a slot has no photo, the site shows a decorative illustration instead.

For best results use landscape or portrait photos about 1200 px wide, under 1 MB.

## Add, remove or reorder things

- Use **Add** in a list (sections, prices, cards, gallery pictures…) to add an item, and the arrows or drag handle to reorder.
- **Section type** decides how a section looks. Only the fields marked with its name are used — for example *Pictures (for "gallery")* only matters when the type is *gallery*.

## Menu, phone, email, addresses

Open **Site settings**. Changing the phone number or email there updates the whole site, including the footer and the contact forms.

## Add another editor

1. On GitHub, open the **reshuartlobby** repository → **Settings → Collaborators → Add people**.
2. Invite them with the **Write** role.
3. They sign in at https://app.pagescms.org with their own GitHub account and open the same repository.

## If something looks wrong

- Every save is kept as a version on GitHub (the **History** of a file), so any change can be undone.
- Check the **Actions** tab of the repository: a green tick means the site has updated; a red cross means the last save did not build — send the error to your developer.

---

## For developers

```text
content/site.yml        menu, footer, contact details
content/pages/*.yml     one file per page (hero + sections)
uploads/                pictures uploaded from the CMS
assets/                 style.css, site.js (look and behaviour)
scripts/build.js        renders content/*.yml into dist/*.html
.pages.yml              Pages CMS field definitions
.github/workflows/      builds with `npm run build` and deploys dist/ to GitHub Pages
```

Local preview: `npm install`, then `npm run dev`, and open http://localhost:5057.
Section types are implemented in `scripts/build.js` (`L.<layout>`); add a new one there and in `.pages.yml`.
