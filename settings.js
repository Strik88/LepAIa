document.addEventListener('DOMContentLoaded', () => {
    const settingsForm = document.getElementById('settingsForm');
    const apiKeyInput = document.getElementById('apiKey');
    const modelSelect = document.getElementById('modelSelect');
    
    // Load saved settings
    loadSettings();
    
    // Save settings when form is submitted
    settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const apiKey = apiKeyInput.value.trim();
        const selectedModel = modelSelect.value;
        
        if (!apiKey) {
            showAlert('Your API key is required to unlock the full research experience');
            return;
        }
        
        // Save to localStorage
        saveSettings(apiKey, selectedModel);
        
        // Show success message
        showAlert('Your settings are successfully saved!', 'success');
        
        // Redirect to main page after short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    });
    
    // Function to save settings to localStorage
    function saveSettings(apiKey, model) {
        localStorage.setItem('perplexity_api_key', apiKey);
        localStorage.setItem('perplexity_model', model);
    }
    
    // Function to load settings from localStorage
    function loadSettings() {
        const savedApiKey = localStorage.getItem('perplexity_api_key') || '';
        const savedModel = localStorage.getItem('perplexity_model') || 'sonar';
        
        apiKeyInput.value = savedApiKey;
        modelSelect.value = savedModel;
        
        // If the saved model doesn't exist in the options, default to 'sonar'
        if (!Array.from(modelSelect.options).some(option => option.value === savedModel)) {
            modelSelect.value = 'sonar';
        }
    }
    
    // Function to show alert message
    function showAlert(message, type = 'error') {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        // Create alert element
        const alertElement = document.createElement('div');
        alertElement.className = `alert ${type === 'success' ? 'alert-success' : 'alert-error'}`;
        alertElement.textContent = message;
        
        // Insert after form
        settingsForm.parentNode.insertBefore(alertElement, settingsForm.nextSibling);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertElement.remove();
        }, 5000);
    }
}); 