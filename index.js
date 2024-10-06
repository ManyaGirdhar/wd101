// Calculate age from Date of Birth
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}

// Save entries to local storage
function saveToLocalStorage(entries) {
    localStorage.setItem('entries', JSON.stringify(entries));
}

// Load entries from local storage
function loadFromLocalStorage() {
    return JSON.parse(localStorage.getItem('entries')) || [];
}

// Add new row to the table
function addEntryToTable(entry) {
    const tableBody = document.getElementById('entriesTableBody');
    const newRow = `<tr>
                        <td class="border px-4 py-2">${entry.name}</td>
                        <td class="border px-4 py-2">${entry.email}</td>
                        <td class="border px-4 py-2">${entry.password}</td>
                        <td class="border px-4 py-2">${entry.dob}</td>
                        <td class="border px-4 py-2">${entry.acceptTerms}</td>
                    </tr>`;
    tableBody.innerHTML += newRow;
}

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Validate age between 18 and 55
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("You must be between 18 and 55 years old to register.");
        return;
    }

    // Save the entry to local storage
    const newEntry = { name, email, password, dob, acceptTerms };
    const entries = loadFromLocalStorage();
    entries.push(newEntry);
    saveToLocalStorage(entries);

    // Add entry to the table
    addEntryToTable(newEntry);

    // Clear form
    document.getElementById('registrationForm').reset();
});

// Load entries on page load
window.onload = function() {
    const entries = loadFromLocalStorage();
    entries.forEach(entry => addEntryToTable(entry));
};
