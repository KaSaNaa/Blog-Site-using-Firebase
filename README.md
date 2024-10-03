# Blog Site using Firebase Project Setup Guide

This guide provides step-by-step instructions to set up the Blog Site using Firebase project on your local machine. Follow these steps carefully to ensure a smooth setup process.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. **Node.js** (version 14.x or higher)
2. **npm** (Node Package Manager)
3. **Git** (for cloning the repository)

## Step 1: Clone the Repository

First, clone the repository to your local machine using Git.

```sh
git clone https://github.com/KaSaNaa/Blog-Site-using-Firebase.git
cd <CLONED_FOLDER>
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
    VITE_FIREBASE_API_KEY
    VITE_FIREBASE_AUTH_DOMAIN
    VITE_FIREBASE_PROJECT_ID
    VITE_FIREBASE_STORAGE_BUCKET
    VITE_FIREBASE_MESSAGING_SENDER_ID
    VITE_FIREBASE_APP_ID
    VITE_YOUTUBE_API_KEY
    VITE_GET_USER_DISPLAY_NAME
    VITE_SEND_WELCOME_EMAIL
    VITE_STRIPE_PUBLISHABLE_KEY

    ```

## Step 5: Run the Development Server

Navigate back to the root directory and start the development server.

```sh
cd ..
npm run dev
```

This will start the Vite development server and open the application in your default web browser.

## Step 6: Firebase Functions Deployment

If you need to deploy Firebase functions, follow these steps:

1. **Login to Firebase**:

    ```sh
    firebase login
    ```

2. **Deploy Firebase functions**:

    ```sh
    firebase deploy --only functions
    ```

### Step 7: Stripe Configurations

1. Install Stripe by Invertase Extension in Firebase and configure API keys and Webhook endpoints (You need to sign up in Stripe and enable the Test Mode for Developers.)

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*pFIDaQv4La0xaBQkNqwf4g.png)

- Click on Build -> Extensions as in the above image step 1.
- Click on Explore extensions as in the above step 2.
- Click on Install as marked in the above step 3.
- Once you clicked on that you’ll be navigated again to your home screen of the console.firebase.google.com. In there, click again your relevant project and you’ll be continue with the rest of the extension installation process.

![](https://miro.medium.com/v2/resize:fit:828/format:webp/1*1XBaVf34hHAz1eOt1BkgeQ.png)

- Click next on first step as there’s nothing to setup any configs there. But feel free to go through those information.
- In the second step you need to enable below services in order to continue.

![](https://miro.medium.com/v2/resize:fit:828/format:webp/1*Wi03BUAdo5cqCacS2S7eXQ.png)

- Once you done with that the Next button will be enabled and click on that.
- Just as the first step there’s nothing to setup any configs on the third step, just click on next.
- On the 4th step make sure to set the sync new users to stripe customers and firestore.

![](https://miro.medium.com/v2/resize:fit:786/format:webp/1*vjl6nG-C2kEeHivx4T2ACw.png)

- Add the stripe secret API key to below field which you copied from stripe dashboard.

## Refer this Medium Article on setting up the rest of the Stripe related functinalities such as webhook,
(<https://medium.com/aeturnuminc/integrate-stripe-payment-gateway-with-firebase-firestore-and-react-8ce095792491>)

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
