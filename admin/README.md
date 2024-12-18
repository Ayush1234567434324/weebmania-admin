# Manga Reader - Admin Panel

This project is an **Admin Panel** for managing the backend of a Manga Reader website. The application allows administrators to manage manga chapters, upload files to Google Drive, and perform other administrative tasks related to managing manga content.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [How it Works](#how-it-works)
- [File Descriptions](#file-descriptions)
- [Logic](#logic)

## Overview

The **Manga Reader Admin Panel** provides a user interface for managing manga chapters, files, and images for a manga reading platform. Files like cover images, chapter pages, and other assets are uploaded to **Google Drive** for storage. This app enables admins to easily upload content, organize it by chapters, and manage the uploaded files.

## Features

- **Google Authentication**: Sign in using Google accounts to access and manage Google Drive files.
- **Upload Manga Chapter Folders**: Create folders for manga chapters and upload associated images such as cover and page images.
- **Preview Image Uploads**: Preview images before uploading them to ensure accuracy.
- **Dynamic Folder Management**: Allows creating chapter folders and uploading images directly to Google Drive.
  
## Project Structure

```plaintext
src/
├── components/             # Reusable UI components
│   ├── Auth/               # Auth-related components (Sign-in, Sign-out)
│   │   ├── AuthButtons.js  # Google Auth Buttons
│   │   └── AuthButtons.css # Styling for Auth Buttons
│   ├── ImageUpload/        # Image upload UI components
│   │   ├── ImageUpload.js  # Image upload form
│   │   ├── ImagePreview.js # Image preview display
│   │   └── ImageUpload.css # Styles for Image Upload
│   ├── ChapterUpload/      # Chapter folder upload components
│   │   ├── ChapterForm.js  # Chapter folder creation and upload logic
│   │   └── ChapterForm.css # Styling for ChapterForm
├── services/               # Business logic related to external APIs and data fetching
│   ├── googleDriveService.js # Handles Google Drive API interactions
│   ├── uploadService.js     # Handles file uploads and related operations
│   └── apiClient.js        # API client (generalized for interacting with services)
├── utils/                  # Utility functions and hooks
│   ├── hooks/              # Custom React hooks
│   │   ├── useGoogleAuth.js  # Hook for Google authentication logic
│   │   └── useImageUpload.js # Hook for handling image uploads
│   ├── constants.js        # Constants like API keys, Google Drive folder names
│   ├── helpers.js          # Helper functions (e.g., file validations)
│   └── validations.js      # Functions for form validation (e.g., check if folder exists)
├── styles/                 # Global styles and variables
│   ├── variables.css       # Theme variables, colors, fonts
│   ├── global.css          # Reset styles and global layout
├── App.js                  # Main application component
├── App.css                 # App-level styling
├── index.js                # React entry point
└── .env                    # Environment variables (API keys, secrets)

This is the rough structure it may vary but this is the basic idea
```
## How it Works

1. **Google Authentication**: 
   Users sign in using their Google accounts. The authentication process is managed by the `googleDriveService.js` file, which interacts with Google OAuth to authorize access.

2. **Chapter Folder Upload**: 
   Admins can create new chapter folders by entering a chapter name in the `ChapterForm.js` component. This triggers the creation of a new folder in Google Drive through the Google Drive API.

3. **Image Upload**: 
   Admins upload images (e.g., cover images, chapter pages) for the newly created chapter. The `ImageUpload.js` component handles file selection and upload. Before uploading, the images are previewed using the `ImagePreview.js` component to ensure they are correct.

4. **Google Drive Integration**: 
   The app integrates with Google Drive to create folders and upload files. This is achieved by calling methods in `googleDriveService.js`, which manages interactions with the Google Drive API.

## File Descriptions

- **App.js**: The main application component that initializes the app and handles routing.
- **googleDriveService.js**: Service responsible for interacting with the Google Drive API. It handles folder creation and file uploads.
- **uploadService.js**: Manages file uploads and interacts with the backend API for processing files.
- **apiClient.js**: A general-purpose API client used to interact with backend services.
- **useGoogleAuth.js**: A custom hook that handles Google authentication, abstracting the sign-in and sign-out logic.
- **useImageUpload.js**: A custom hook that handles the image upload process, managing the state and actions related to file uploads.
- **ChapterForm.js**: A form component that allows admins to enter chapter details and upload related images.
- **ImageUpload.js**: Provides the user interface for uploading images (e.g., cover images, chapter pages).
- **ImagePreview.js**: Displays a preview of uploaded images before submission to ensure accuracy.

## Logic

### Why Google Drive for File Storage?

We have chosen **Google Drive** for storing manga chapter images due to the following reasons:

- **Cost-Effective**: Google Drive provides a generous amount of free storage (15GB for personal accounts), making it an affordable option for storing manga chapter images and other related files.
- **Scalability**: Google Drive can easily scale as the number of manga chapters and assets increases, providing a long-term solution without the need to manage complex server infrastructure.
- **Reliability**: Google Drive is a reliable and secure cloud service with a strong uptime record and robust API support.
- **Ease of Integration**: Google provides a well-documented API that makes it easier to integrate into the admin panel for managing uploads and file organization.

### Folder Creation and Management Logic

The core logic behind **creating chapter folders** is as follows:

- **Dynamic Folder Naming**: When an admin creates a new chapter, a folder with the chapter's name is created on Google Drive to organize the content. This folder will contain images for cover art, pages, and any additional media assets.
- **Folder Structure**: Each chapter folder will follow a consistent naming convention that helps keep the files organized and makes it easier to retrieve them later.
- **Disabling Fields**: If an existing chapter name is entered, the system disables the folder creation fields (name input, file selection, etc.) to prevent duplicate folders. Only the **page upload box** remains active, allowing the admin to upload pages for the already existing chapter. This ensures that chapter names are unique and avoids cluttering Google Drive with duplicate folders.

### Image Upload Logic

- **File Format and Types**: We support common image formats such as **JPEG, PNG**, and **GIF** for chapter-related images. The system automatically checks if the uploaded files are in the correct format before proceeding with the upload process.
- **Preview Before Upload**: To ensure the accuracy of uploaded images, we use an image preview feature. Before uploading, images are previewed in the admin panel, allowing the admin to confirm that the correct files are selected.
- **Image Storage**: Once confirmed, the images are uploaded to the relevant chapter folder on Google Drive. The image files are saved with specific names (e.g., "cover.jpg", "page1.jpg") to maintain a consistent naming scheme that is easy to manage.
- **Google Drive API Interaction**: The images are uploaded using the **Google Drive API**, where the `googleDriveService.js` file handles the logic for interacting with Google Drive, such as uploading the image files to the correct folders and handling any errors that might arise.

### Chapter Upload Flow

1. **Admin Input**: The admin enters a **chapter name** and selects the associated **cover image** and **page images**.
2. **Folder Creation**: If the chapter name is unique, the system creates a new folder on Google Drive using the `googleDriveService.js` file. This folder serves as the container for all images related to the new chapter.
3. **Image Preview**: The **ImagePreview.js** component displays a preview of the uploaded images before they are finalized for upload.
4. **Uploading to Google Drive**: Once the images are confirmed, the images are uploaded to the newly created folder via the `googleDriveService.js` file.

### Disabling Form Fields

The logic for **disabling form fields** when certain conditions are met is as follows:

- **Folder Exists**: If a folder with the entered chapter name already exists, we disable the **chapter name input**, **cover image selection**, and **page image upload options**, preventing the admin from creating duplicate folders. Only the **page upload option** with a checkbox showing the number of pages uploaded so far remains active.
- **Ensuring Data Integrity**: This prevents any accidental uploads or overwriting of files, ensuring that each chapter is unique and properly managed in the system.

### Data Flow

1. **Google Authentication**: The admin is first authenticated via **Google OAuth** using the `useGoogleAuth.js` hook. This grants access to the Google Drive API, enabling file uploads.
2. **API Interactions**: The `googleDriveService.js` file handles interactions with Google Drive, such as creating folders and uploading files. It ensures that chapter folders are properly named and that all images are stored in their respective folders.
3. **Upload Process**: The `uploadService.js` and `useImageUpload.js` files work together to manage the upload process. They ensure that images are validated, previewed, and uploaded to the correct folder in Google Drive.

### File Naming Conventions

We maintain the following file naming conventions to ensure consistency and easy retrieval:

- **Chapter Folders**: Folders are named after the chapter title (e.g., `chapter-1`, `chapter-2`).
- **Image Files**: Images are saved using descriptive names that include the type of image (e.g., `cover.jpg`, `page1.jpg`, `page2.jpg`).
- This consistent naming convention helps when fetching and displaying images in the frontend, ensuring that the correct assets are associated with each chapter.

### Conclusion

This approach leverages Google Drive for reliable and scalable storage, while maintaining a simple and intuitive admin interface for managing manga chapters and images. The upload logic ensures that content is organized efficiently, and the system prevents duplicate entries and ensures data integrity by disabling certain form fields when needed. This provides a seamless experience for the admin, ensuring that manga content is correctly uploaded, stored, and managed in a structured manner.
  dont write any thing just store it somewhere