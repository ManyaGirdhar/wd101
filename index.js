// Load data from local storage and populate table on page load
window.onload = function () {
    loadTableData();
};

// Form validation and submission handler
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    if (!isValidDob(dob)) {
        alert("Age must be between 18 and 55.");
        return;
    }

    const formData = { name, email, password, dob, acceptTerms };

    // Store the data in localStorage
    saveDataToLocalStorage(formData);

    // Refresh table data
    loadTableData();

    // Reset form
    document.getElementById('registrationForm').reset();
});

// Validate Date of Birth (age must be between 18 and 55)
function isValidDob(dob) {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
}

// Save form data to local storage
function saveDataToLocalStorage(formData) {
    let data = JSON.parse(localStorage.getItem('formData')) || [];
    data.push(formData);
    localStorage.setItem('formData', JSON.stringify(data));
}

// Load data from local storage and populate the table
function loadTableData() {
    const tableBody = document.getElementById('dataTable');
    tableBody.innerHTML = ""; // Clear existing data

    const data = JSON.parse(localStorage.getItem('formData')) || [];

    data.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="border px-4 py-2">${item.name}</td>
            <td class="border px-4 py-2">${item.email}</td>
            <td class="border px-4 py-2">${item.password}</td>
            <td class="border px-4 py-2">${item.dob}</td>
            <td class="border px-4 py-2 text-center">${item.acceptTerms ? 'true' : 'false'}</td>
        `;

        tableBody.appendChild(row);
    });
}
