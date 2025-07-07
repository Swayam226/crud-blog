# 📖 Blog Haven

A minimalist, vintage-inspired blogging platform built using **Next.js**, **MongoDB Atlas**, and **Tailwind CSS v4**. Designed for timeless storytelling, seamless user experience, and optimized for modern SEO best practices.

---

## Project Overview

Blog Haven allows users to:

* Publish thoughtful blog posts with rich-text editing.
* View and read posts through elegant, distraction-free public pages.
* Securely create, edit, and delete posts through a personalized dashboard.

The platform combines a classic look with modern tech under the hood.

---

## Key Features

* 📝 **Post Creation & Management**: Rich-text editing, instant updates, easy deletion.
* 🔐 **Security**: Only authorized users can perform admin actions.
* 🔗 **SEO-Friendly URLs**: Each post has a unique, human-readable slug.
* 📱 **Responsive Design**: Works beautifully across devices.

---

## ⚙️ Tech Stack

| Technology                   | Purpose                         |
| ---------------------------- | ------------------------------- |
| **Next.js (v14+)**           | Frontend & Backend (API routes) |
| **Tailwind CSS v4**          | Styling & Responsive Layout     |
| **MongoDB Atlas + Mongoose** | Database & ODM                  |
| **React-Quill-New**          | Rich Text Editor                |
| **Vercel**                   | Deployment                      |

---

## Security & Authorization

* Admin actions (**Create/Edit/Delete**) are protected using a **secret token** mechanism.
* Environment variables ensure sensitive data (Mongo URI, Admin Secret) remains confidential.
* Input sanitization (`sanitize-html`) is applied to all post content to prevent **XSS attacks**.

---

## Folder Structure (Simplified)

```
/pages
  /api
    posts/[slug].js       // GET, PUT, DELETE post
    posts/create.js        // POST create new post
  admin
    index.js               // My Dashboard (admin)
    create.js              // Create Post page
    edit/[slug].js         // Edit Post page
  blog
    [slug].js              // Public blog post page
  index.js                 // Landing page
/components
  Header.js
  Footer.js
/lib
  dbConnect.js
/models
  Post.js
```

---

## Deployment (Vercel)

1. Pushed the complete codebase to **GitHub**.
2. Imported the repository into **Vercel**.
3. Set the following Environment Variables in Vercel:

```
MONGODB_URI=your_mongo_connection_string
ADMIN_SECRET=your_admin_secret_key
NEXT_PUBLIC_ADMIN_SECRET=your_admin_secret_key
```

4. Deployed the app ➔ Vercel auto-detects Next.js.

---

## Functional Requirements (Delivered)

| Requirement                        | Status                           |
| ---------------------------------- | -------------------------------- |
| SEO-friendly unique URLs           | ✔ Implemented using `slugify`    |
| Create, Edit, Delete posts         | ✔ With secure token-based access |
| View posts publicly                | ✔ No login required              |
| Input sanitization                 | ✔ Done via `sanitize-html`       |
| Responsive UI & consistent styling | ✔ Achieved with Tailwind v4      |

---

## User Stories (Mapped)

| User Story                                            | Fulfilled     |
| ----------------------------------------------------- | ------------- |
| As an admin, I want to create, edit, and delete posts | ✔ Done        |
| As a visitor, I want to read posts without logging in | ✔ Done        |
| As a user, I want readable, elegant design            | ✔ Delivered   |
| As a site owner, I want secure admin access           | ✔ Implemented |

---

## Non-Functional Goals Achieved

* **Performance**: Optimized with Next.js static generation.
* **Accessibility**: Clean contrast and toggleable dark mode.
* **Scalability**: Modular code structure for future features.

---

## Future Enhancements

* Image uploads for posts.
* Pagination on the landing page.
* Richer post metadata (categories, tags).
