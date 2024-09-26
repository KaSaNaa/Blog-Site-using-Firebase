# Dev@Deakin Project Setup Guide

This guide provides step-by-step instructions to set up the Dev@Deakin project on your local machine. Follow these steps carefully to ensure a smooth setup process.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. **Node.js** (version 14.x or higher)
2. **npm** (Node Package Manager)
3. **Git** (for cloning the repository)

## Step 1: Clone the Repository

First, clone the repository to your local machine using Git.

```sh
git clone https://github.com/your-username/dev-deakin.git
cd dev-deakin
```

## Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies using npm.

```sh
npm install
```

## Step 3: Set Up Environment Variables

Create a [`.env`] file in the root directory of the project and add the necessary environment variables. You can use the `.env.example` file as a reference.

```sh
cp .env.example .env
```

Edit the [`.env`] file to include your Firebase configuration and other necessary environment variables.

```env
VITE_SEND_WELCOME_EMAIL=<your-send-welcome-email-endpoint>
VITE_YOUTUBE_API_KEY=<your-youtube-api-key>
```

## Step 4: Firebase Configuration

Ensure that your Firebase project is set up correctly. You need to configure Firebase functions and hosting.

1. **Navigate to the [`functions`] directory**:

    ```sh
    cd functions
    ```

2. **Install Firebase functions dependencies**:

    ```sh
    npm install
    ```

3. **Set up Firebase environment variables**:

    Create a [`.env`] file in the [`functions`] directory and add your Firebase configuration.

    ```sh
    cp .env.example .env
    ```

    Edit the [`.env`] file to include your Firebase configuration.

    ```env
    FIREBASE_API_KEY=<your-firebase-api-key>
    FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
    FIREBASE_PROJECT_ID=<your-firebase-project-id>
    FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
    FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
    FIREBASE_APP_ID=<your-firebase-app-id>
    ```

## Step 5: Run the Development Server

Navigate back to the root directory and start the development server.

```sh
cd ..
npm run dev
```

This will start the Vite development server and open the application in your default web browser.

## Step 6: Firebase Functions Deployment (Optional)

If you need to deploy Firebase functions, follow these steps:

1. **Login to Firebase**:

    ```sh
    firebase login
    ```

2. **Deploy Firebase functions**:

    ```sh
    firebase deploy --only functions
    ```

## Project Structure

Here is an overview of the project structure:

```
.env
.firebaserc
.gitignore
.prettierignore
.prettierrc
.vscode/
 settings.json
eslint.config.js
firebase.json
functions/
 .env
 .eslintrc.js
 .gitignore
 index.js
 package.json
index.html
LICENSE
package.json
public/
 _redirects
README.md
src/
 App.jsx
 assets/
 components/
  auth/
  home/
  misc/
  posts/
 configs/
  firebaseConfigs.js
 contexts/
  AuthContext.jsx
  LoadingContext.jsx
  ThemeContext.jsx
 GlobalLayout.jsx
 hooks/
  ...
 main.jsx
 services/
  ...
 theme/
 utils/
vite.config.js
```

## Key Files and Directories

- **`src/`**: Contains the main source code for the application.
  - **`App.jsx`**: The main application component.
  - **`main.jsx`**: The entry point for the React application.
  - **`components/`**: Contains React components organized by feature.
  - **`contexts/`**: Contains context providers for global state management.
  - **`configs/`**: Contains configuration files.
  - **`services/`**: Contains service files for API calls and other utilities.
  - **`theme/`**: Contains theme configuration files.
  - **`utils/`**: Contains utility functions.

- **`functions/`**: Contains Firebase functions.
  - **`index.js`**: The main entry point for Firebase functions.

- **`public/`**: Contains static assets and the `_redirects` file for Netlify.

- **`.env`**: Environment variables for the project.

- **`vite.config.js`**: Configuration file for Vite.

- **`eslint.config.js`**: Configuration file for ESLint.

## Running Tests

To run tests, use the following command:

```sh
npm run test
```

## Linting and Formatting

To lint the code, use the following command:

```sh
npm run lint
```

To format the code, use the following command:

```sh
npm run format
```

## Building for Production

To build the project for production, use the following command:

```sh
npm run build
```

This will create a `dist` directory with the production build of the application.

## Deployment

To deploy the application, you can use any static site hosting service like Netlify, Vercel, or Firebase Hosting. Follow the respective documentation for deployment instructions.
