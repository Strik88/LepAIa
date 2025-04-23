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

    // Get save button
    const saveButton = document.getElementById('save-btn');

    // Load saved data from localStorage if available
    loadFormData();

    // Add event listener to save button
    saveButton.addEventListener('click', function() {
        saveFormData();
        alert('Company profile saved successfully!');
    });

    // Function to save form data to localStorage
    function saveFormData() {
        const formData = {
            organization: formElements.organization.value,
            industry: formElements.industry.value,
            challenges: formElements.challenges.value,
            priorities: formElements.priorities.value,
            other: formElements.other.value,
            links: formElements.links.value
        };

        localStorage.setItem('companyProfileData', JSON.stringify(formData));
    }

    // Function to load form data from localStorage
    function loadFormData() {
        const savedData = localStorage.getItem('companyProfileData');
        
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            formElements.organization.value = formData.organization || '';
            formElements.industry.value = formData.industry || '';
            formElements.challenges.value = formData.challenges || '';
            formElements.priorities.value = formData.priorities || '';
            formElements.other.value = formData.other || '';
            formElements.links.value = formData.links || '';
        }
    }
}); 