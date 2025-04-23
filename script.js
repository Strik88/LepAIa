document.addEventListener('DOMContentLoaded', function() {
    // Get all form elements
    const formElements = {
        organization: document.getElementById('organization-description'),
        industry: document.getElementById('industry-description'),
        challenges: document.getElementById('challenges-description'),
        priorities: document.getElementById('priorities-description'),
        other: document.getElementById('other-description'),
        links: document.getElementById('links-description')
    };

    // Get save button and notice element
    const saveButton = document.getElementById('save-btn');
    const textareas = document.querySelectorAll('textarea');
    
    // Client elements
    const clientDropdown = document.getElementById('client-dropdown');
    const newClientInput = document.getElementById('new-client');
    const addClientButton = document.getElementById('add-client-btn');
    const userClientsList = document.getElementById('user-clients');
    const selectedClientBadge = document.getElementById('selected-client-badge');
    const selectedClientName = document.getElementById('selected-client-name');
    
    // Currently selected client
    let currentClient = '';
    
    // Initialize clients
    initializeClients();
    
    // Add auto-resize functionality to textareas
    textareas.forEach(textarea => {
        textarea.addEventListener('input', autoResize);
        
        // Call once to set initial size
        setTimeout(() => {
            autoResize.call(textarea);
        }, 0);
    });
    
    function autoResize() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    }
    
    // Add highlight effect to sections when focused
    textareas.forEach(textarea => {
        textarea.addEventListener('focus', function() {
            this.closest('.profile-section').classList.add('focused');
        });
        
        textarea.addEventListener('blur', function() {
            this.closest('.profile-section').classList.remove('focused');
        });
    });

    // Event listeners for client selection
    clientDropdown.addEventListener('change', handleClientChange);
    addClientButton.addEventListener('click', addNewClient);
    newClientInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewClient();
        }
    });
    
    // Load saved data from localStorage if available
    loadFormData();

    // Add event listener to save button
    saveButton.addEventListener('click', function() {
        if (saveFormData()) {
            showSaveConfirmation();
        }
    });
    
    // Add event listeners for keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + S to save
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (saveFormData()) {
                showSaveConfirmation();
            }
        }
    });
    
    // Update the client badge
    function updateClientBadge() {
        if (!currentClient) {
            selectedClientName.textContent = 'Select a client';
            selectedClientBadge.classList.add('no-client');
            selectedClientBadge.classList.remove('empty');
        } else {
            selectedClientName.textContent = currentClient;
            selectedClientBadge.classList.remove('no-client');
            selectedClientBadge.classList.remove('empty');
            
            // Make client name more prominent
            selectedClientBadge.classList.add('has-client');
        }
    }
    
    // Function to initialize clients
    function initializeClients() {
        // Get saved clients or start with an empty list
        const savedCustomClients = localStorage.getItem('customClients');
        let customClients = savedCustomClients ? JSON.parse(savedCustomClients) : [];
        
        // Fill the list with custom clients
        renderClientList(customClients);
        
        // If there was a last selected client, select it
        const lastSelectedClient = localStorage.getItem('lastSelectedClient');
        if (lastSelectedClient) {
            currentClient = lastSelectedClient;
            
            // Select in dropdown if it's a standard client
            if (Array.from(clientDropdown.options).some(option => option.value === lastSelectedClient.toLowerCase())) {
                clientDropdown.value = lastSelectedClient.toLowerCase();
            } else {
                clientDropdown.value = ""; // Empty if it's a custom client
            }
            
            // Highlight in the list if it's a custom client
            const clientItems = document.querySelectorAll('#user-clients li');
            clientItems.forEach(item => {
                if (item.getAttribute('data-client') === lastSelectedClient) {
                    item.classList.add('active');
                }
            });
        }
        
        // Update the client badge
        updateClientBadge();
    }
    
    // Function to add a new client
    function addNewClient() {
        const clientName = newClientInput.value.trim();
        
        if (clientName === '') {
            alert('Please enter a client name');
            return;
        }
        
        // Get existing clients
        const savedCustomClients = localStorage.getItem('customClients');
        let customClients = savedCustomClients ? JSON.parse(savedCustomClients) : [];
        
        // Check if the client already exists
        if (customClients.includes(clientName) || 
            Array.from(clientDropdown.options).some(option => option.value === clientName.toLowerCase())) {
            alert('This client already exists');
            return;
        }
        
        // Add the new client
        customClients.push(clientName);
        localStorage.setItem('customClients', JSON.stringify(customClients));
        
        // Update the list
        renderClientList(customClients);
        
        // Reset input field
        newClientInput.value = '';
        
        // Select the new client
        selectClient(clientName);
    }
    
    // Function to render the client list
    function renderClientList(clients) {
        userClientsList.innerHTML = '';
        
        clients.forEach(client => {
            const listItem = document.createElement('li');
            listItem.textContent = client;
            listItem.setAttribute('data-client', client);
            
            if (client === currentClient) {
                listItem.classList.add('active');
            }
            
            listItem.addEventListener('click', function() {
                selectClient(client);
            });
            
            userClientsList.appendChild(listItem);
        });
    }
    
    // Function to select a client
    function selectClient(clientName) {
        const previousClient = currentClient;
        currentClient = clientName;
        
        // Save current profile data for previous client if it existed
        if (previousClient) {
            saveClientData(previousClient);
        }
        
        // Save the last selected client
        localStorage.setItem('lastSelectedClient', clientName);
        
        // Update UI for selection
        // Reset dropdown if it's a custom client
        const dropdownOption = Array.from(clientDropdown.options).find(option => option.value === clientName.toLowerCase());
        if (dropdownOption) {
            clientDropdown.value = clientName.toLowerCase();
        } else {
            clientDropdown.value = "";
        }
        
        // Update list selection
        const clientItems = document.querySelectorAll('#user-clients li');
        clientItems.forEach(item => {
            if (item.getAttribute('data-client') === clientName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update the client badge with the selected client name
        updateClientBadge();
        
        // Load the data for this client
        loadClientData(clientName);
    }
    
    // Handler for dropdown changes
    function handleClientChange() {
        const selectedClient = clientDropdown.value;
        
        if (selectedClient) {
            // Capitalize first letter of each word for display
            const displayName = selectedClient
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
                
            selectClient(displayName);
        }
    }
    
    // Function to show save confirmation
    function showSaveConfirmation() {
        const saveNotice = document.createElement('div');
        saveNotice.className = 'save-confirmation';
        saveNotice.innerHTML = '<i class="fas fa-check-circle"></i> Company profile saved successfully!';
        
        document.body.appendChild(saveNotice);
        
        // Add visible class to trigger animation
        setTimeout(() => {
            saveNotice.classList.add('visible');
        }, 10);
        
        // Remove after animation completes
        setTimeout(() => {
            saveNotice.classList.remove('visible');
            setTimeout(() => {
                document.body.removeChild(saveNotice);
            }, 300);
        }, 2000);
    }

    // Function to save form data to localStorage
    function saveFormData() {
        try {
            if (!currentClient) {
                alert('Please select a client first');
                return false;
            }
            
            return saveClientData(currentClient);
        } catch (error) {
            console.error('Error saving data:', error);
            alert('There was a problem saving your data. Please try again.');
            return false;
        }
    }
    
    // Function to save client-specific data
    function saveClientData(clientName) {
        try {
            const formData = {
                organization: formElements.organization.value,
                industry: formElements.industry.value,
                challenges: formElements.challenges.value,
                priorities: formElements.priorities.value,
                other: formElements.other.value,
                links: formElements.links.value,
                lastSaved: new Date().toISOString()
            };

            localStorage.setItem(`companyProfileData_${clientName}`, JSON.stringify(formData));
            return true;
        } catch (error) {
            console.error('Error saving client data:', error);
            return false;
        }
    }

    // Function to load form data from localStorage
    function loadFormData() {
        try {
            if (currentClient) {
                loadClientData(currentClient);
            } else {
                // Clear form if no client is selected
                clearForm();
            }
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
    
    // Function to load client-specific data
    function loadClientData(clientName) {
        try {
            const savedData = localStorage.getItem(`companyProfileData_${clientName}`);
            
            if (savedData) {
                const formData = JSON.parse(savedData);
                
                formElements.organization.value = formData.organization || '';
                formElements.industry.value = formData.industry || '';
                formElements.challenges.value = formData.challenges || '';
                formElements.priorities.value = formData.priorities || '';
                formElements.other.value = formData.other || '';
                formElements.links.value = formData.links || '';
                
                // Call auto-resize for each textarea with content
                textareas.forEach(textarea => {
                    if (textarea.value) {
                        autoResize.call(textarea);
                    }
                });
                
                // Show last saved time if available
                if (formData.lastSaved) {
                    const lastSaved = new Date(formData.lastSaved);
                    const saveNotice = document.querySelector('.save-notice');
                    if (saveNotice) {
                        saveNotice.textContent = `Your information is saved locally on your device. Last saved: ${lastSaved.toLocaleString()}`;
                    }
                }
            } else {
                // If no saved data for this client, clear the form
                clearForm();
            }
        } catch (error) {
            console.error('Error loading client data:', error);
            clearForm();
        }
    }
    
    // Function to clear the form
    function clearForm() {
        Object.values(formElements).forEach(element => {
            element.value = '';
        });
        
        const saveNotice = document.querySelector('.save-notice');
        if (saveNotice) {
            saveNotice.textContent = 'Your information will be saved locally on your device';
        }
    }
    
    // Function to add CSS for save confirmation
    function addSaveConfirmationStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .save-confirmation {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                background-color: #4CAF50;
                color: white;
                padding: 12px 24px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                font-weight: 500;
                display: flex;
                align-items: center;
                opacity: 0;
                transition: transform 0.3s, opacity 0.3s;
                z-index: 1000;
            }
            
            .save-confirmation.visible {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            
            .save-confirmation i {
                margin-right: 8px;
                font-size: 20px;
            }
            
            .profile-section.focused {
                box-shadow: 0 0 0 3px rgba(78, 76, 236, 0.1);
                border-color: var(--primary-color);
            }

            /* Toast notification styles */
            .toast {
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%) translateY(100px);
                padding: 12px 24px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                font-weight: 500;
                display: flex;
                align-items: center;
                opacity: 0;
                transition: transform 0.3s, opacity 0.3s;
                z-index: 1000;
                max-width: 90%;
            }
            
            .toast.visible {
                transform: translateX(-50%) translateY(0);
                opacity: 1;
            }
            
            .toast i {
                margin-right: 8px;
                font-size: 20px;
            }
            
            .toast-success {
                background-color: #4CAF50;
                color: white;
            }
            
            .toast-error {
                background-color: #F44336;
                color: white;
            }
            
            .toast-info {
                background-color: var(--primary-color);
                color: white;
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Add save confirmation styles
    addSaveConfirmationStyles();

    // Function to show toast notifications
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
        
        document.body.appendChild(toast);
        
        // Add visible class to trigger animation
        setTimeout(() => {
            toast.classList.add('visible');
        }, 10);
        
        // Remove after animation completes
        setTimeout(() => {
            toast.classList.remove('visible');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Generate organization description with AI
    const generateOrgBtn = document.getElementById('generate-org-btn');
    const orgDescriptionTextarea = document.getElementById('organization-description');
    const companyNameInput = document.getElementById('client-dropdown');

    generateOrgBtn.addEventListener('click', async () => {
        console.log("Button clicked!");
        const companyName = companyNameInput.value.trim();
        console.log("Company name:", companyName);
        
        if (!companyName) {
            showToast('Please enter a company name first', 'error');
            return;
        }
        
        // Show loading state
        generateOrgBtn.disabled = true;
        generateOrgBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
        
        try {
            console.log("Generating description with Perplexity API...");
            const description = await generateCompanyDescription(companyName);
            console.log("Description generated:", description.substring(0, 50) + "...");
            orgDescriptionTextarea.value = description;
            autoResize.call(orgDescriptionTextarea);
            showToast('Company description generated successfully', 'success');
        } catch (error) {
            console.error('Error generating description:', error);
            showToast('Could not connect to Perplexity API. Please check your internet connection and try again.', 'error');
            orgDescriptionTextarea.value = 'Error: Could not generate description. Please check console for details.';
            autoResize.call(orgDescriptionTextarea);
        } finally {
            // Reset button state
            generateOrgBtn.disabled = false;
            generateOrgBtn.innerHTML = '<i class="fas fa-robot"></i> Generate with AI';
        }
    });

    async function generateCompanyDescription(companyName) {
        // Only use Perplexity API - no local fallback
        const PERPLEXITY_API_KEY = "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";
        
        const prompt = `I need a comprehensive business description of ${companyName} formatted as a cohesive paragraph for a company profile. 

Please include:
1. Core business operations and primary industry
2. Main products or services offered
3. Revenue generation model and business approach
4. Company size, geographic presence, and market position
5. Mission, vision, and values if known
6. Notable achievements, innovations, or competitive advantages
7. Target customer segments and markets served

Ensure the description is professional, factual, concise but thorough (about 150-200 words), and written in the third person as if for a formal company profile document. Focus on providing useful business context that would help a consultant understand the company's operations.`;

        // Show loading state
        generateOrgBtn.disabled = true;
        generateOrgBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting to Perplexity AI...';
        
        try {
            // Direct API call to Perplexity - no proxy
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`
                },
                body: JSON.stringify({
                    model: "sonar-small-online", // Using Sonar model specifically as requested
                    messages: [
                        {
                            role: "system",
                            content: "You are an expert business analyst who provides detailed, accurate, and professional company descriptions for business profiles based only on factual information. Never make up details."
                        },
                        {
                            role: "user",
                            content: prompt
                        }
                    ],
                    max_tokens: 1000
                })
            });
            
            // Handle API errors
            if (!response.ok) {
                const errorData = await response.text();
                console.error('Perplexity API error:', response.status, errorData);
                throw new Error(`Perplexity API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error with Perplexity API:', error);
            throw error; // Let the calling function handle the error
        } finally {
            // Reset button state handled by calling function
        }
    }
}); 