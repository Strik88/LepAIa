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
    
    // Klant elementen
    const clientDropdown = document.getElementById('client-dropdown');
    const newClientInput = document.getElementById('new-client');
    const addClientButton = document.getElementById('add-client-btn');
    const userClientsList = document.getElementById('user-clients');
    
    // Huidige geselecteerde klant
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

    // Event listeners voor klanten
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
    
    // Functie om klanten te initialiseren
    function initializeClients() {
        // Haal opgeslagen klanten op of start met een lege lijst
        const savedCustomClients = localStorage.getItem('customClients');
        let customClients = savedCustomClients ? JSON.parse(savedCustomClients) : [];
        
        // Vul de lijst met aangepaste klanten
        renderClientList(customClients);
        
        // Als er een laatst geselecteerde klant was, selecteer deze
        const lastSelectedClient = localStorage.getItem('lastSelectedClient');
        if (lastSelectedClient) {
            currentClient = lastSelectedClient;
            
            // Selecteer in dropdown als het een standaard klant is
            if (Array.from(clientDropdown.options).some(option => option.value === lastSelectedClient)) {
                clientDropdown.value = lastSelectedClient;
            } else {
                clientDropdown.value = ""; // Leeg als het een aangepaste klant is
            }
            
            // Highlght in de lijst als het een aangepaste klant is
            const clientItems = document.querySelectorAll('#user-clients li');
            clientItems.forEach(item => {
                if (item.getAttribute('data-client') === lastSelectedClient) {
                    item.classList.add('active');
                }
            });
        }
    }
    
    // Functie om een nieuwe klant toe te voegen
    function addNewClient() {
        const clientName = newClientInput.value.trim();
        
        if (clientName === '') {
            alert('Vul een klantnaam in');
            return;
        }
        
        // Haal bestaande klanten op
        const savedCustomClients = localStorage.getItem('customClients');
        let customClients = savedCustomClients ? JSON.parse(savedCustomClients) : [];
        
        // Controleer of de klant al bestaat
        if (customClients.includes(clientName) || 
            Array.from(clientDropdown.options).some(option => option.value === clientName.toLowerCase())) {
            alert('Deze klant bestaat al');
            return;
        }
        
        // Voeg de nieuwe klant toe
        customClients.push(clientName);
        localStorage.setItem('customClients', JSON.stringify(customClients));
        
        // Werk de lijst bij
        renderClientList(customClients);
        
        // Reset input veld
        newClientInput.value = '';
        
        // Selecteer de nieuwe klant
        selectClient(clientName);
    }
    
    // Functie om de klantlijst te renderen
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
    
    // Functie om een klant te selecteren
    function selectClient(clientName) {
        const previousClient = currentClient;
        currentClient = clientName;
        
        // Sla huidige profieldata op voor vorige klant als die bestond
        if (previousClient) {
            saveClientData(previousClient);
        }
        
        // Sla de laatst geselecteerde klant op
        localStorage.setItem('lastSelectedClient', clientName);
        
        // Update UI voor selectie
        // Reset dropdown als het een custom klant is
        const dropdownOption = Array.from(clientDropdown.options).find(option => option.value === clientName.toLowerCase());
        if (dropdownOption) {
            clientDropdown.value = clientName.toLowerCase();
        } else {
            clientDropdown.value = "";
        }
        
        // Update lijst selectie
        const clientItems = document.querySelectorAll('#user-clients li');
        clientItems.forEach(item => {
            if (item.getAttribute('data-client') === clientName) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Laad de data voor deze klant
        loadClientData(clientName);
    }
    
    // Handler voor veranderingen in dropdown
    function handleClientChange() {
        const selectedClient = clientDropdown.value;
        
        if (selectedClient) {
            // Zet eerste letter van elke woord naar hoofdletter voor display
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
                alert('Selecteer eerst een klant');
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
        `;
        document.head.appendChild(styleElement);
    }
    
    // Add save confirmation styles
    addSaveConfirmationStyles();
}); 