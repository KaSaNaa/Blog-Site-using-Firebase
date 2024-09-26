# Dev@Deakin Project Proposal

## Summary

Dev@Deakin is a web application designed to empower developers by providing a platform for sharing knowledge, asking questions, and accessing resources. The application will feature user authentication, a text editor for posts, a searchable database of questions and articles, and integration with OAuth providing platforms. The goal is to create a community-driven platform that fosters learning and collaboration among developers.

## Features

### 1. User Authentication

**Description**: Users will be able to sign up, sign in, and sign out using their email or social media accounts (Google, GitHub).

**Operation**:

- **Sign Up**: Users can create an account using their email or social media accounts.
- **Sign In**: Users can log in using their email or social media accounts.
- **Sign Out**: Users can log out of their account.

**Implementation**:

- Firebase Authentication will be used for managing user accounts.
- Social media authentication will be integrated using Firebase's GoogleAuthProvider and GithubAuthProvider.

### 2. Home Page

**Description**: The home page will display featured articles, recent questions, and a navigation bar for easy access to different sections of the site.

**Operation**:

- **Featured Articles**: Display a list of featured articles.
- **Recent Questions**: Display a list of recent questions posted by users.
- **Navigation Bar**: Provide links to different sections of the site (Home, Post Something, Find Questions, Sign In/Out).

**Implementation**:

- The home page will be built using React components.
- Data will be fetched from Firestore and displayed using Material-UI components.

### 3. Post Something

**Description**: Users can create new posts, either as questions or articles, using a rich text editor.

**Operation**:

- **Create Post**: Users can select the type of post (question or article) and use a rich text editor to create their content.
- **Submit Post**: Users can submit their post, which will be saved to the Firestore database.

**Implementation**:

- A rich text editor will be integrated using a third-party library.
- Posts will be saved to Firestore using the [`addPost`] function in [`src/services/posts/index.js`].

### 4. Find Questions

**Description**: Users can search for questions using keywords and filters.

**Operation**:

- **Search**: Users can enter keywords to search for questions.
- **Filters**: Users can apply filters to narrow down search results (e.g., by date, tags).

**Implementation**:

- Search functionality will be implemented using Firestore queries.
- Filters will be applied using query parameters.

### 5. Article View

**Description**: Users can view detailed articles, including comments and likes.

**Operation**:

- **View Article**: Users can click on an article to view its details.
- **Comments**: Users can read and add comments to the article.
- **Reactions**: Users can like on the posts they find interesting.

**Implementation**:

- Article details and comments will be fetched from Firestore.

### 6. Article Reactions and Questions

**Description**: Users can react and comment on posts and they can provide answers for the questions posted.

## Screenshots / Sketches

### Home Page

![Home Page](https://i.ibb.co/rwpHnNk/image.png)

### Post Something

![Post Something](https://i.ibb.co/BPtmTwc/image.png)

### Find Questions

![Find Questions](https://i.ibb.co/wJtvVb7/image.png)

### Article View

![Article View](https://i.ibb.co/ctt2ykF/image.png)

### Theme Picker

![Theme Picker](https://i.ibb.co/XpjhH29/image.png)

### Post Reactions

![Post Reactions](https://i.ibb.co/cYy0vgG/image.png)

### Suggested Tutorials

![Suggested Tutorials](https://i.ibb.co/7YMLgQT/image.png)
