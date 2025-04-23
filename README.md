# Company Profile Web Application

A simple web application for entering and saving company profile information.

## Features

- Clean, responsive user interface
- Form for entering company profile information
- Data saved locally in the browser
- Easy to host on GitHub Pages

## How to Host on GitHub Pages

Follow these simple steps to host this website on GitHub Pages:

### Step 1: Create a GitHub repository

1. Go to [GitHub](https://github.com) and log in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Name your repository (for example, "company-profile")
4. Make sure the repository is set to "Public"
5. Click "Create repository"

### Step 2: Upload these files to your repository

Option 1: Using the GitHub website
1. In your new repository, click the "Add file" button and select "Upload files"
2. Drag and drop all the files from this folder (index.html, styles.css, script.js, README.md)
3. Click "Commit changes"

Option 2: Using Git (if you're familiar with it)
1. Open a terminal or command prompt
2. Navigate to the folder containing these files
3. Run the following commands (replace "yourusername" and "company-profile" with your GitHub username and repository name):
```
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/company-profile.git
git push -u origin master
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" (tab near the top of the page)
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "master branch"
5. Click "Save"
6. After a few minutes, your site will be available at the URL shown (typically https://yourusername.github.io/company-profile/)

## Using the Application

1. Open the website in your browser
2. Fill in the company profile information in the form fields
3. Click the "Save" button to save your data
4. Your data will be stored locally in your browser and will be available when you visit the page again

Note: The data is saved using browser localStorage, which means it's only stored on the device you're using. It won't be accessible from other devices or browsers. 