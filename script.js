document.addEventListener('DOMContentLoaded', function() {
    // -- Default Prompts --
    const DEFAULT_FULL_REPORT_PROMPT = `Create a comprehensive company profile for {companyName}. Include the following sections:\n\n1. Company Overview: Brief history, founding, mission, vision, and core values.\n2. Products and Services: Detailed description of main offerings.\n3. Market Position: Current market standing, market share if known, and competitive advantage.\n4. Leadership: Key executives and their backgrounds.\n5. Recent Developments: Latest news, product launches, or strategic shifts.\n6. Financial Summary: Overview of financial performance if publicly available.\n7. Future Outlook: Growth potential and strategic direction.\n\nFormat the response in clear sections with headings and bullet points where appropriate.`;
    
    const DEFAULT_INDUSTRY_PROMPT = `Provide a detailed industry analysis for {companyName}. Include:\n\n1. Industry Overview: Size, growth rate, and key characteristics.\n2. Competitive Landscape: Major players, market shares, and competitive dynamics.\n3. Industry Trends: Current trends, technological developments, and shifting consumer preferences.\n4. Regulatory Environment: Key regulations and compliance requirements.\n5. Challenges and Opportunities: Major challenges facing the industry and potential growth areas.\n6. Future Outlook: Predictions for the industry over the next 3-5 years.\n\nFormat the response with clear headings and bullet points where relevant.`;

    const DEFAULT_CHALLENGES_PROMPT = `Analyze the challenges for {companyName}. Address these points:\n\n1. What internal bottlenecks limit growth or efficiency (processes, systems, skills)?\n2. Which external industry developments pose threats or present opportunities?\n3. Which regulations must the company comply with, and where are the compliance risks?\n4. How is the company currently addressing these challenges, and where do pain points remain?`;

    const DEFAULT_STRATEGIC_PRIORITIES_PROMPT = `Outline the strategic priorities for {companyName}:\n\n1. What are the management's short- and long-term objectives?\n2. Which strategic projects and initiatives are in place to achieve these goals?\n3. Which transformation or change programs are currently underway?\n4. Which KPIs and performance metrics does the company use to measure success?`;

    const DEFAULT_ADDITIONAL_INFO_PROMPT = `Provide additional context about {companyName}:\n\n1. How would you describe the company culture and core values in terms of observable behaviors?\n2. What major milestones, awards, or achievements has the company secured?\n3. Which CSR and sustainability initiatives has the company launched, and what are the outcomes?\n4. Are there any other unique stories or characteristics that strengthen the company's positioning?`;

    const DEFAULT_RELEVANT_LINKS_PROMPT = `List essential internal and external resources for {companyName}:\n\n1. Which internal and external resources (reports, whitepapers, presentations) are essential?\n2. What is the brief description and relevance of each resource?\n\nProvide direct URLs where possible.`;

    const DEFAULT_WORKPLACE_NEEDS_PROMPT = `Based on the following comprehensive context about {companyName}:

<context>
{context}
</context>

Please identify potential workplace needs (like training, coaching, or organizational development needs). For each identified need, answer the following questions clearly:

1.  **Need Name:** What is a concise name for this workplace need (e.g., "Leadership Development Program", "Improving Sales Effectiveness", "Onboarding Process Enhancement")?
2.  **Target Audience:** Which specific employee group(s) is the primary target for this need (e.g., "New Managers", "Senior Sales Team", "All Employees", "IT Department")?
3.  **Lepaya Persona:** Which Lepaya persona does this audience best align with (Young Talent, Professional, Leader, Commercial)? Consider the primary focus.
4.  **Audience Characteristics:** What are the key characteristics of this audience relevant to the need (e.g., "Limited prior management experience", "Technically skilled but needs soft skills", "Digital natives, prefer blended learning")?
5.  **Strategic Alignment:** How does addressing this need align with the company's stated strategic business goals or overcome identified challenges?
6.  **Obstacles:** What potential obstacles or blockers (e.g., "Time constraints", "Budget limitations", "Resistance to change", "Lack of internal expertise") must be considered or overcome?
7.  **Success Measurement:** How will success be measured (e.g., "Reduced employee turnover in target group by 15%", "Increased average deal size by 10%", "Improved employee satisfaction scores on relevant topics", "Observed behavioral changes in 360-degree feedback")?

Structure the output clearly, perhaps grouping the answers per identified workplace need or per target audience/persona.`;

    // -- Field Configuration -- 
    const fieldConfig = {
        'full-report': {
            outputId: 'full-report-output',
            inputId: 'full-report-input',
            editBtnId: 'edit-full-report',
            generateBtnId: 'generate-full-report',
            promptKey: 'custom_full_report_prompt',
            defaultPrompt: DEFAULT_FULL_REPORT_PROMPT,
            promptTextareaId: 'full-report-prompt'
        },
        'industry': {
            outputId: 'industry-output',
            inputId: 'industry-input',
            editBtnId: 'edit-industry',
            generateBtnId: 'generate-industry',
            promptKey: 'custom_industry_prompt',
            defaultPrompt: DEFAULT_INDUSTRY_PROMPT,
            promptTextareaId: 'industry-prompt'
        },
        'challenges': {
            outputId: 'challenges-output',
            inputId: 'challenges-input',
            editBtnId: 'edit-challenges',
            generateBtnId: 'generate-challenges',
            promptKey: 'custom_challenges_prompt',
            defaultPrompt: DEFAULT_CHALLENGES_PROMPT,
            promptTextareaId: 'challenges-prompt'
        },
        'strategic-priorities': {
            outputId: 'strategic-priorities-output',
            inputId: 'strategic-priorities-input',
            editBtnId: 'edit-strategic-priorities',
            generateBtnId: 'generate-strategic-priorities',
            promptKey: 'custom_strategic_priorities_prompt',
            defaultPrompt: DEFAULT_STRATEGIC_PRIORITIES_PROMPT,
            promptTextareaId: 'strategic-priorities-prompt'
        },
        'additional-info': {
            outputId: 'additional-info-output',
            inputId: 'additional-info-input',
            editBtnId: 'edit-additional-info',
            generateBtnId: 'generate-additional-info',
            promptKey: 'custom_additional_info_prompt',
            defaultPrompt: DEFAULT_ADDITIONAL_INFO_PROMPT,
            promptTextareaId: 'additional-info-prompt'
        },
        'relevant-links': {
            outputId: 'relevant-links-output',
            inputId: 'relevant-links-input',
            editBtnId: 'edit-relevant-links',
            generateBtnId: 'generate-relevant-links',
            promptKey: 'custom_relevant_links_prompt',
            defaultPrompt: DEFAULT_RELEVANT_LINKS_PROMPT,
            promptTextareaId: 'relevant-links-prompt'
        },
        'workplace-needs': {
            outputId: 'workplace-needs-output',
            inputId: 'workplace-needs-input',
            editBtnId: 'edit-workplace-needs',
            generateBtnId: 'generate-workplace-needs',
            promptKey: 'custom_workplace_needs_prompt',
            defaultPrompt: DEFAULT_WORKPLACE_NEEDS_PROMPT,
            promptTextareaId: 'workplace-needs-prompt'
        }
    };
    const fieldTypes = Object.keys(fieldConfig); // Array of field names
    const requiredFieldsForNeeds = ['full-report', 'industry', 'challenges', 'strategic-priorities']; // Fields required before generating needs

    // -- Data Storage --
    let companyData = {}; 
    let currentCompanyName = '';

    // Select elements
    const companyItemsContainer = document.querySelector('.company-list'); // Changed selector target
    const selectedCompanyNameDisplay = document.getElementById('selected-company-name-display'); 
    const newCompanyNameInput = document.getElementById('new-company-name'); // Added
    const addCompanyBtn = document.getElementById('add-company-btn');       // Added
    const resultsModal = document.getElementById('results-modal'); // Renamed for clarity
    const closeResultsModal = resultsModal.querySelector('.close-modal'); // Specific close button
    const resultsDiv = document.getElementById('results');
    
    // Settings elements
    const settingsBtn = document.querySelector('.settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsModal = settingsModal.querySelector('.close-settings-modal');
    const apiKeyInput = document.getElementById('api-key-input');
    const modelSelect = document.getElementById('model-select');
    const saveSettingsBtn = document.getElementById('save-settings-btn');
    const generateAllBtn = document.getElementById('generate-all');
    
    // Store references to field elements using config
    const elements = {};
    for (const fieldType of fieldTypes) {
        const config = fieldConfig[fieldType];
        elements[fieldType] = {
            outputDiv: document.getElementById(config.outputId),
            inputArea: document.getElementById(config.inputId),
            editBtn: document.getElementById(config.editBtnId),
            generateBtn: document.getElementById(config.generateBtnId),
            promptTextarea: document.getElementById(config.promptTextareaId) // For settings modal
        };
    }
    
    // -- Initial Setup --
    // Get initial company items *after* potential dynamic additions (though here it's before)
    const initialCompanyItems = companyItemsContainer ? companyItemsContainer.querySelectorAll('.company-item') : [];
    if (initialCompanyItems.length > 0) {
        initialCompanyItems[0].classList.add('selected');
        currentCompanyName = initialCompanyItems[0].getAttribute('data-company');
        updateSelectedCompanyNameDisplay(currentCompanyName);
    } else {
        updateSelectedCompanyNameDisplay('No Company Selected');
    }
    initializeFieldsForCompany(currentCompanyName);
    loadSettings();

    // -- Event Listeners --

    // Company Selection using Event Delegation
    if (companyItemsContainer) {
        companyItemsContainer.addEventListener('click', function(event) {
            const companyItem = event.target.closest('.company-item'); // Find clicked company item
            if (!companyItem) return; // Exit if click wasn't on a company item

            const newCompanyName = companyItem.getAttribute('data-company');
            if (newCompanyName === currentCompanyName) return; 

            // Auto-save edits for the *previous* company
            for (const fieldType of fieldTypes) {
                const { outputDiv, inputArea, editBtn } = elements[fieldType];
                if (editBtn.dataset.mode === 'save') {
                    saveEdit(fieldType, outputDiv, inputArea, editBtn);
                }
            }

            // Switch company
            currentCompanyName = newCompanyName;
            updateSelectedCompanyNameDisplay(currentCompanyName); 
            // Remove selected class from all items within the container
            companyItemsContainer.querySelectorAll('.company-item').forEach(i => i.classList.remove('selected'));
            // Add selected class to the clicked item
            companyItem.classList.add('selected');
            
            initializeFieldsForCompany(currentCompanyName);
        });
    }
    
    // Close Results Modal
    if (closeResultsModal) {
        closeResultsModal.addEventListener('click', function() {
            resultsModal.style.display = 'none';
        });
    }
    
    // Settings Button Click
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(event) {
            event.preventDefault(); 
            loadSettings(); 
            settingsModal.style.display = 'block'; 
        });
    }
    
    // Close Settings Modal
    if (closeSettingsModal) {
        closeSettingsModal.addEventListener('click', function() {
            settingsModal.style.display = 'none';
        });
    }
    
    // Save Settings Button Click
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            saveSettings();
            settingsModal.style.display = 'none'; 
            alert('Settings saved successfully!'); 
        });
    }
    
    // Close Modals on outside click
    window.addEventListener('click', function(event) {
        if (event.target === resultsModal) {
            resultsModal.style.display = 'none';
        }
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });
    
    // Add Edit/Save and Generate button listeners dynamically
    for (const fieldType of fieldTypes) {
        const { outputDiv, inputArea, editBtn, generateBtn } = elements[fieldType];
        if (editBtn) {
            editBtn.addEventListener('click', () => 
                toggleEditMode(fieldType, outputDiv, inputArea, editBtn)
            );
        }
        if (generateBtn) {
            // Special listener for workplace needs
            if (fieldType === 'workplace-needs') {
                 generateBtn.addEventListener('click', () => generateWorkplaceNeeds());
            } else {
                 generateBtn.addEventListener('click', () => generateContentForField(fieldType));
            }
        }
    }
    
    // Generate All Button - Skip workplace needs
     if (generateAllBtn) {
        generateAllBtn.addEventListener('click', function() {
            // Check API key once
            const apiKey = localStorage.getItem('perplexity_api_key');
            if (!apiKey) {
                alert('Please set your Perplexity API key in Settings first.');
                return;
            }
             if (!currentCompanyName) {
                 alert('Please select a company first.');
                 return;
             }
            console.log(`Generating all sections (except Workplace Needs) for ${currentCompanyName}`);
            for (const fieldType of fieldTypes) {
                // Skip workplace needs generation in 'Generate All'
                if (fieldType !== 'workplace-needs') { 
                    generateContentForField(fieldType);
                }
            }
        });
    }

    // Add Company Button
    if (addCompanyBtn && newCompanyNameInput && companyItemsContainer) {
        addCompanyBtn.addEventListener('click', function() {
            const newName = newCompanyNameInput.value.trim();
            if (newName === '') {
                alert('Please enter a company name.');
                return;
            }
            
            // Optional: Check if company already exists (case-insensitive)
            const existingItems = companyItemsContainer.querySelectorAll('.company-item');
            let exists = false;
            existingItems.forEach(item => {
                if (item.getAttribute('data-company').toLowerCase() === newName.toLowerCase()) {
                    exists = true;
                }
            });
            if (exists) {
                alert(`Company '${newName}' already exists.`);
                return;
            }

            // Create new company item element
            const newItem = document.createElement('div');
            newItem.classList.add('company-item');
            newItem.setAttribute('data-company', newName);
            newItem.innerHTML = `
                <div class="company-name">${newName}</div>
                <div class="company-description">New Company</div> <!-- Default description -->
            `;

            // Append to the list
            companyItemsContainer.appendChild(newItem);

            // Clear input field
            newCompanyNameInput.value = '';

            // Optional: Automatically select the new company
            // newItem.click(); // Simulate a click to trigger selection logic
        });
    }

    // -- Functions --

    // Function to update the company name display in the header
    function updateSelectedCompanyNameDisplay(companyName) {
        if (selectedCompanyNameDisplay) {
            selectedCompanyNameDisplay.textContent = companyName || ''; // Set text content
        }
    }

    // Initialize or load data for all fields for the given company
    function initializeFieldsForCompany(companyName) {
        if (!companyData[companyName]) {
            companyData[companyName] = {}; // Initialize if first time seeing this company
        }
        const currentData = companyData[companyName];

        for (const fieldType of fieldTypes) {
            const { outputDiv, inputArea, editBtn } = elements[fieldType];
            const markdown = currentData[fieldType] || ''; // Get saved data or empty string
            currentData[fieldType] = markdown; // Ensure field exists in data object

            renderMarkdown(markdown, outputDiv);
            inputArea.value = markdown; 
            resetEditButton(editBtn);
            outputDiv.style.display = 'block';
            inputArea.style.display = 'none';
        }
    }

    // Resets an edit button to its default state
    function resetEditButton(editBtn) {
        editBtn.dataset.mode = 'edit';
        editBtn.innerHTML = '<span class="btn-icon"><i class="fas fa-pencil-alt"></i></span><span>Edit</span>';
    }

    // Handles the save action when switching from edit mode
    function saveEdit(fieldType, outputDiv, inputArea, editBtn) {
        const editedMarkdown = inputArea.value;
        if (!companyData[currentCompanyName]) { 
             companyData[currentCompanyName] = {};
        }
        companyData[currentCompanyName][fieldType] = editedMarkdown; 
        renderMarkdown(editedMarkdown, outputDiv);
    }

    // Function to toggle between view (div) and edit (textarea)
    function toggleEditMode(fieldType, outputDiv, inputArea, editBtn) {
        const currentMode = editBtn.dataset.mode;

        if (currentMode === 'edit') {
            // Switch to Save mode: Load current data into textarea
            const currentMarkdown = companyData[currentCompanyName]?.[fieldType] || '';
            inputArea.value = currentMarkdown; 
            outputDiv.style.display = 'none';
            inputArea.style.display = 'block';
            editBtn.dataset.mode = 'save';
            editBtn.innerHTML = '<span class="btn-icon"><i class="fas fa-save"></i></span><span>Save</span>';
            inputArea.focus(); 
        } else { 
            // Switch to Edit mode (Save was clicked)
            saveEdit(fieldType, outputDiv, inputArea, editBtn); // Save the content
            // Reset button and visibility
            inputArea.style.display = 'none';
            outputDiv.style.display = 'block';
            resetEditButton(editBtn);
        }
    }

    // Function to render markdown into a target element
    function renderMarkdown(markdownContent, targetElement) {
        targetElement.classList.remove('loading', 'error');
        if (typeof marked === 'undefined') {
             targetElement.innerHTML = 'Error: Markdown library (marked.js) not loaded.';
             targetElement.classList.add('error');
             console.error('marked.js is not loaded');
             return;
        }
        try {
            const htmlContent = marked.parse(markdownContent || '', { gfm: true, breaks: true });
            targetElement.innerHTML = htmlContent;
        } catch (parseError) {
            console.error('Error parsing Markdown:', parseError);
            targetElement.innerHTML = 'Error displaying content. Raw content logged to console.';
            targetElement.classList.add('error');
            console.log('Raw content:', markdownContent);
        }
    }

    // Load settings from localStorage into modal fields
    function loadSettings() {
        apiKeyInput.value = localStorage.getItem('perplexity_api_key') || '';
        modelSelect.value = localStorage.getItem('perplexity_model') || 'sonar'; 
        
        for (const fieldType of fieldTypes) {
            const config = fieldConfig[fieldType];
            const promptTextarea = elements[fieldType].promptTextarea;
            if (promptTextarea) { // Check if textarea exists in DOM
                 promptTextarea.value = localStorage.getItem(config.promptKey) || config.defaultPrompt;
            }
        }
    }
    
    // Save settings from modal fields to localStorage
    function saveSettings() {
        const apiKey = apiKeyInput.value.trim();
        const selectedModel = modelSelect.value;
        
        if (apiKey) localStorage.setItem('perplexity_api_key', apiKey);
        else localStorage.removeItem('perplexity_api_key');
        localStorage.setItem('perplexity_model', selectedModel);
        
        for (const fieldType of fieldTypes) {
            const config = fieldConfig[fieldType];
            const promptTextarea = elements[fieldType].promptTextarea;
            if (promptTextarea) { // Check if textarea exists in DOM
                localStorage.setItem(config.promptKey, promptTextarea.value.trim());
            }
        }
    }

    // Generate content for a specific field
    function generateContentForField(fieldType) {
        if (!currentCompanyName) {
             // This check might be redundant if called from Generate All, but good practice
             alert('Please select a company first.');
             return;
        }
        const apiKey = localStorage.getItem('perplexity_api_key');
        if (!apiKey) {
            // Uncommented the alert for individual generate buttons
            alert('Please set your Perplexity API key in Settings first.');
            return;
        }
        const selectedModel = localStorage.getItem('perplexity_model') || 'sonar'; 

        const config = fieldConfig[fieldType];
        const { outputDiv, editBtn } = elements[fieldType];

        // Get the prompt and replace placeholder
        const promptText = (localStorage.getItem(config.promptKey) || config.defaultPrompt)
                         .replace('{companyName}', currentCompanyName); 
        
        // Show loading
        outputDiv.innerHTML = 'Generating content...';
        outputDiv.classList.add('loading');
        outputDiv.classList.remove('error');
        
        // Call API
        console.log(`Fetching ${fieldType} for ${currentCompanyName}...`);
        fetchFromAPI(promptText, fieldType, apiKey, selectedModel, outputDiv, editBtn);
    }
    
    // Function to fetch content from Perplexity API
    // Takes targetOutput and editBtn as parameters now
    async function fetchFromAPI(prompt, fieldType, apiKey, model, targetOutput, editBtn) { 
        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model, 
                    messages: [
                        { role: 'system', content: 'You are a helpful assistant...' },
                        { role: 'user', content: prompt }
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null); 
                const errorMessage = errorData?.error?.message || `API request failed with status ${response.status}`;
                throw new Error(errorMessage);
            }
            
            const data = await response.json();
            // Pass fieldType along with data
            formatResult(data, fieldType, targetOutput, editBtn); 
            
        } catch (error) {
            console.error(`Error fetching ${fieldType} from API:`, error);
            const errorMsg = `Error: ${error.message}.`;
            targetOutput.innerHTML = errorMsg;
            targetOutput.classList.add('error');
            targetOutput.classList.remove('loading');
            // Don't disable edit button on error, allow user to edit/retry
        }
    }
    
    // Function to format and display the result using marked.js
    // Stores result in companyData
    function formatResult(data, fieldType, targetElement, editBtn) { 
        if (!data || !data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
            console.error('Invalid response format from API:', data);
            targetElement.innerHTML = 'Error: Invalid response format from API.';
            targetElement.classList.add('error');
            targetElement.classList.remove('loading');
            return;
        }
        
        const markdownContent = data.choices[0].message.content;
        
        // Store the result in the main data store for the current company
        if (!companyData[currentCompanyName]) { 
            companyData[currentCompanyName] = {};
        }
        companyData[currentCompanyName][fieldType] = markdownContent; 
        
        renderMarkdown(markdownContent, targetElement); // Render the markdown
        // Edit button remains enabled
    }

    // Special function to generate Workplace Needs
    function generateWorkplaceNeeds() {
        if (!currentCompanyName) {
             alert('Please select a company first.');
             return;
        }
        const apiKey = localStorage.getItem('perplexity_api_key');
        if (!apiKey) {
            alert('Please set your Perplexity API key in Settings first.');
            return;
        }
        const selectedModel = localStorage.getItem('perplexity_model') || 'sonar';

        // Check if required fields are filled for the current company
        const companySpecificData = companyData[currentCompanyName] || {};
        const missingFields = requiredFieldsForNeeds.filter(reqField => 
            !companySpecificData[reqField] || companySpecificData[reqField].trim() === ''
        );

        if (missingFields.length > 0) {
            alert(`Please generate or fill the following sections first: ${missingFields.join(', ')}`);
            return;
        }

        // Build context from all other fields
        let context = '';
        for (const ft of fieldTypes) {
            if (ft !== 'workplace-needs' && companySpecificData[ft]) {
                // Add a header for clarity in the context
                const fieldName = ft.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()); // Simple title case
                context += `## ${fieldName} ##\n\n${companySpecificData[ft]}\n\n---\n\n`;
            }
        }
        
        // Get the prompt template
        const config = fieldConfig['workplace-needs'];
        const { outputDiv, editBtn } = elements['workplace-needs'];
        const promptTemplate = localStorage.getItem(config.promptKey) || config.defaultPrompt;

        // Replace placeholders
        const finalPrompt = promptTemplate
                            .replace('{companyName}', currentCompanyName)
                            .replace('{context}', context.trim());

        // Show loading
        outputDiv.innerHTML = 'Generating analysis...';
        outputDiv.classList.add('loading');
        outputDiv.classList.remove('error');

        // Call API
        console.log(`Fetching Workplace Needs for ${currentCompanyName}...`);
        fetchFromAPI(finalPrompt, 'workplace-needs', apiKey, selectedModel, outputDiv, editBtn);
    }
}); 