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
            const formData = {
                organization: formElements.organization.value,
                industry: formElements.industry.value,
                challenges: formElements.challenges.value,
                priorities: formElements.priorities.value,
                other: formElements.other.value,
                links: formElements.links.value,
                lastSaved: new Date().toISOString()
            };

            localStorage.setItem('companyProfileData', JSON.stringify(formData));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            alert('There was a problem saving your data. Please try again.');
            return false;
        }
    }

    // Function to load form data from localStorage
    function loadFormData() {
        try {
            const savedData = localStorage.getItem('companyProfileData');
            
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
            }
        } catch (error) {
            console.error('Error loading data:', error);
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
                box-shadow: 0 0 0 3px rgba(58, 110, 165, 0.1);
                border-color: var(--primary-color);
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    // Add save confirmation styles
    addSaveConfirmationStyles();
}); 