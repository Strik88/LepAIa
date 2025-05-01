document.addEventListener('DOMContentLoaded', function() {
    // -- Default Prompts --
    const DEFAULT_FULL_REPORT_PROMPT = `Generate a comprehensive profile of {companyName}, focusing on aspects relevant to a strategic people development partner like Lepaya. Provide insights into their business strategy, industry context, talent challenges, and potential needs for developing employee 'Power Skills' (a blend of soft and hard skills). Structure the report into the following sections: Company Profile, Industry Analysis, Key Challenges & Opportunities, and Strategic Recommendations for Lepaya. Ensure the information is concise, factual, and tailored for strategic decision-making regarding potential L&D partnerships.`;
    
    const DEFAULT_INDUSTRY_PROMPT = `Analyze the key trends, challenges (e.g., skill gaps, digital transformation, talent retention), and opportunities within the primary industry of {companyName}. Specifically highlight:
1.  How are competitors in this industry approaching talent development and addressing skill gaps?
2.  What are the most critical 'Power Skills' (e.g., adaptability, data literacy, leadership, communication, collaboration) needed for success in this sector?
3.  How is technology (like AI or data analytics) impacting workforce needs and L&D strategies in this industry?`;

    const DEFAULT_CHALLENGES_PROMPT = `Based on the profile of {companyName} and its industry context, identify:
1.  Major strategic challenges potentially related to talent, skills, or organizational development (e.g., adapting to change, innovation pace, leadership pipeline, employee engagement).
2.  Significant opportunities for {companyName} where enhanced employee capabilities or targeted 'Power Skills' development could drive growth or competitive advantage.
3.  Any indications of misalignment between their current workforce capabilities and future strategic needs.`;

    const DEFAULT_STRATEGIC_PRIORITIES_PROMPT = `Based on the analysis of {companyName}'s challenges and opportunities, suggest strategic recommendations focused *specifically* on how a partnership with Lepaya could add value. Consider:
1.  Which specific Lepaya Academies (Young Talent, Professional, Leader, Commercial) or 'Power Skill' modules seem most relevant to address {companyName}'s identified needs?
2.  How could Lepaya's blended learning approach (combining app-based microlearning, virtual classrooms, practice) fit their potential learning culture or operational constraints?
3.  What arguments related to personalized learning paths, measurable impact (ROI, behavioral change), and data-driven insights would resonate most with {companyName}?`;

    const DEFAULT_ADDITIONAL_INFO_PROMPT = `Provide additional context about {companyName}, focusing on cultural and operational aspects relevant for a potential L&D partnership:
1.  Describe their company culture and core values in terms of observable behaviors. Is there evidence of a growth mindset or focus on continuous learning?
2.  What major recent milestones, awards, or achievements indicate their strategic priorities or areas of success?
3.  Are there known CSR, sustainability, or DE&I initiatives that suggest a broader focus on people and societal impact?
4.  Are there other unique characteristics (e.g., specific leadership styles, innovation focus) that are relevant for designing effective L&D interventions?`;

    const DEFAULT_RELEVANT_LINKS_PROMPT = `List essential internal and external resources related to {companyName}'s strategy and talent development:
1.  Identify key public reports (annual reports, sustainability reports), whitepapers, or official presentations outlining strategic priorities or L&D initiatives.
2.  Provide a brief description of each resource's relevance to understanding their business goals and potential skill needs.`;

    const DEFAULT_WORKPLACE_NEEDS_PROMPT = `Based on the following comprehensive context about {companyName}:

<context>
{context}
</context>

Please identify potential workplace needs (like training, coaching, or organizational development needs). For each identified need, answer the following questions clearly:

1.  **Need Name:** What is a concise name for this workplace need (e.g., "Leadership Development Program", "Improving Sales Effectiveness", "Onboarding Process Enhancement")?
2.  **Target Audience:** Which specific employee group(s) is the primary target for this need (e.g., "New Managers", "Senior Sales Team", "All Employees", "IT Department")?
3.  **Lepaya Persona:** Which Lepaya persona does this audience best align with (Young Talent, Professional, Leader, Commercial)? Consider the primary focus.
4.  **Audience Characteristics:** What are the key characteristics of this audience relevant to the need (e.g., "Limited prior management experience", "Technically skilled but needs soft skills", "Digital natives, prefer blended learning")?
5.  **Audience Goals:** What are the primary goals or performance expectations for this target audience that this need relates to?
6.  **Current Audience Blockers:** What specific challenges, skill gaps, or blockers are **preventing this target audience from reaching the goals** identified in the previous point?
7.  **Strategic Alignment:** How does addressing this need align with the company\'s stated strategic business goals or help overcome previously identified company-wide challenges?
8.  **Expected Behaviors:** Describe 2-3 key, observable behaviors that employees in this target audience should demonstrate *more, better, or differently* after this need is addressed.
9.  **Implementation Obstacles:** What potential obstacles or blockers (e.g., 'Time constraints', 'Budget limitations', 'Resistance to change', 'Lack of internal expertise') must be considered when implementing a solution (like training or coaching)?
10. **Success Measurement:** How will success be measured (e.g., 'Reduced employee turnover in target group by 15%', 'Increased average deal size by 10%', 'Improved employee satisfaction scores on relevant topics', 'Observed behavioral changes in 360-degree feedback')?

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
        modelSelect.value = localStorage.getItem('perplexity_model') || 'sonar-reasoning';
        
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
        const selectedModel = localStorage.getItem('perplexity_model') || 'sonar-reasoning';

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
    // Stores result in companyData and adds citations/sources
    function formatResult(data, fieldType, targetElement, editBtn) { 
        if (!data || !data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
            console.error('Invalid response format from API:', data);
            targetElement.innerHTML = 'Error: Invalid response format from API.';
            targetElement.classList.add('error');
            targetElement.classList.remove('loading');
            return;
        }
        
        const markdownContent = data.choices[0].message.content;
        const citations = data?.citations; // Check for citations field

        // Store the raw markdown result (without sources) in the main data store
        if (!companyData[currentCompanyName]) { 
            companyData[currentCompanyName] = {};
        }
        companyData[currentCompanyName][fieldType] = markdownContent; 

        // Start preparing HTML output
        let htmlOutput = '';
        if (typeof marked !== 'undefined') {
             try {
                 htmlOutput = marked.parse(markdownContent || '', { gfm: true, breaks: true });
             } catch (parseError) {
                 console.error('Error parsing Markdown:', parseError);
                 htmlOutput = '<p class="error">Error displaying content. Raw content logged to console.</p>';
                 console.log('Raw content:', markdownContent);
             }
        } else {
            console.error('marked.js is not loaded');
            htmlOutput = '<p class="error">Error: Markdown library (marked.js) not loaded.</p>';
        }
        
        // Add citations/sources if they exist
        if (Array.isArray(citations) && citations.length > 0) {
            htmlOutput += '\n\n<h3 class="sources-title">Sources:</h3><ol class="sources-list">'; // Changed heading to "Sources:"
            citations.forEach(url => {
                // Create a list item with a link, opening in a new tab
                try {
                    // Attempt to create a URL object for better display (e.g., hostname)
                    const urlObject = new URL(url);
                    const displayUrl = urlObject.hostname + (urlObject.pathname === '/' ? '' : urlObject.pathname);
                     htmlOutput += `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${displayUrl}</a></li>`;
                } catch (e) {
                    // Fallback if URL is invalid
                     htmlOutput += `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a></li>`;
                }
            });
            htmlOutput += '</ol>'; // Close the ordered list
        }
        
        targetElement.innerHTML = htmlOutput; // Set the final HTML
        targetElement.classList.remove('loading', 'error'); // Ensure loading/error classes are removed

        // Ensure all links in the newly set content open in a new tab
        // (This might be redundant if marked.js already handles it, but safe to keep)
        const links = targetElement.querySelectorAll('a');
        links.forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
        // Edit button remains enabled (or should be handled by caller)
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
        const selectedModel = localStorage.getItem('perplexity_model') || 'sonar-reasoning';

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