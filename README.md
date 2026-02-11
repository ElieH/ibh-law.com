# Illana Bensoussan Hayot - Law Office Website

A modern, multilingual landing page and blog for the **Illana Bensoussan Hayot Law Office**, built with React, TypeScript, and Contentful.

## 🌟 Features

*   **Multilingual Support**: Fully localized in English, French, and Hebrew (RTL support).
*   **Modern Design**: Responsive UI tailored with Tailwind CSS.
*   **CMS Integration**: Dynamic blog powered by **Contentful**.
    *   Rich Text rendering (Headings, Lists, Images, Quotes).
    *   Custom table rendering with responsive design.
    *   Auto-linking for plain URLs.
*   **Performance**: Fast load times using Vite.
*   **Sections**:
    *   **Hero**: Introduction and call-to-action.
    *   **Expertise**: Real Estate, Corporate Law, Inheritance.
    *   **About**: Firm philosophy and values.
    *   **Blog**: Latest legal updates and articles.
    *   **Contact**: Integrated contact details and consultation request.

## 🛠 Tech Stack

*   **Frontend**: React, TypeScript, Vite
*   **Styling**: Tailwind CSS
*   **CMS**: Contentful (Headless CMS)
*   **Routing**: React Router DOM
*   **Icons**: Lucide React
*   **Internationalization**: Custom Context-based solution

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18+)
*   npm or yarn

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ElieH/ibh-law.com.git
    cd ibh-law.com
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your Contentful credentials:

    ```env
    VITE_CONTENTFUL_SPACE_ID=your_space_id
    VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```

## 📝 Contentful Setup

To replicate the blog functionality, create a Content Model in Contentful with the following ID and fields:

*   **Content Type Name**: `Blog Post`
*   **Content Type ID**: `blogPost` (Important!)

| Field Name | Field ID | Type | Configuration |
| :--- | :--- | :--- | :--- |
| **Title** | `title` | Text (Short) | Entry Title |
| **Slug** | `slug` | Text (Short) | Slug generator (optional) |
| **Cover Image** | `coverImage` | Media | One file |
| **Content** | `content` | Rich Text | Enable standard formatting |
| **Published Date** | `publishedDate` | Date & Time | ISO 8601 |

## 📦 Build for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` folder.

---

© 2026 Illana Bensoussan Hayot Law Office. All rights reserved.
