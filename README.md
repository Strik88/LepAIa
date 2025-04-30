# Lepaya Portal - Company Profile Generator

A powerful tool that generates comprehensive company profiles, industry analyses, and strategic insights using the Perplexity API.

## How to Use

### Step 1: Obtain a Perplexity API Key

1. Visit the [Perplexity website](https://www.perplexity.ai/)
2. Create an account or log in with your existing credentials
3. Navigate to your account settings
4. Find the API section and generate your unique API key
5. Copy this key for use in the next steps

### Step 2: Launch the Portal

1. Double-click the `index.html` file in your local folder
2. The Lepaya Portal opens in your default browser, ready for use

### Step 3: Configure Your Settings

1. Click the "Settings" button at the bottom of the page
2. Paste your Perplexity API key in the designated field
3. Select your preferred model from the dropdown options:
   - **Sonar Pro** - Enhanced search capabilities for complex inquiries (Advanced Search)
   - **Sonar** - Lightweight search for standard inquiries
   - **Sonar Deep Research** - In-depth research capabilities
   - **Sonar Reasoning Pro** - Advanced reasoning with comprehensive analysis
   - **Sonar Reasoning** - Fast reasoning for analytical research
4. Customize the prompts for each section if desired (using the `{companyName}` placeholder)
5. Click "Save Settings" to store your preferences

### Step 4: Generate Company Profiles

1. Select a company from the list at the bottom of the page (Lepaya, PwC, or Workrate)
2. You can also add a new company by entering its name and clicking the "Add" button
3. Use the "Generate" buttons for specific sections or click "Generate All Sections" to create a complete profile
4. Review the generated content in each section
5. Edit any section as needed by clicking the "Edit" button

## Features

### Comprehensive Company Profiles

The portal generates detailed company profiles across multiple sections:

- **Full Company Report** - Complete overview of the company
- **Industry Analysis** - Insights into the company's industry sector
- **Challenges** - Analysis of key challenges facing the company
- **Strategic Priorities** - Outline of strategic priorities and goals
- **Additional Information** - Context and unique characteristics
- **Relevant Links** - Essential resources and links related to the company
- **Workplace Needs Analysis** - Identified needs and target audiences

### Edit and Customize

Each section includes editing capabilities:
- Generate content with AI using Perplexity's powerful models
- Edit content manually to customize or refine the generated information
- Save changes with the click of a button

### Company Management

The portal allows you to:
- Select from pre-configured companies
- Add new companies to your list
- Focus your research on one company at a time

### Professional Markdown Formatting

All research results display in beautifully formatted Markdown, providing:
- Clear hierarchical headings
- Well-structured lists
- Highlighted code blocks for technical content
- Clickable reference links
- Formatted tables for organized data
- Stylized quotes and emphasis

### User Feedback

The tool includes a feedback button located at the bottom right of the interface, allowing users to:
- Provide suggestions for improvements
- Report any issues encountered while using the tool
- Share their experience with the research capabilities
- Offer ideas for new features or enhancements

Feedback is collected through a Google Form that opens in a new tab, ensuring your session remains uninterrupted.

### Secure Settings Storage

Your API key and model preferences are securely stored in your browser's local storage, eliminating the need to reconfigure settings for each session.

## Technical Architecture

This tool leverages:
- HTML for structured interface design
- CSS for professional visual styling
- JavaScript for seamless API integration
- Marked.js for rendering professional Markdown
- Font Awesome for intuitive icons

All processing occurs locally in your browser, ensuring your research remains private and secure. Your API key remains in your local storage and is only used for direct API requests to Perplexity. 