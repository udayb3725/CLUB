// Arrays to hold customer names and attendance records
let customers = [];
let attendanceRecords = {};
let attendanceLog = [];

// Function to initialize data from local storage
function initializeData() {
    const storedCustomers = localStorage.getItem('customers');
    const storedAttendanceRecords = localStorage.getItem('attendanceRecords');
    const storedAttendanceLog = localStorage.getItem('attendanceLog');
    if (storedCustomers) {
        customers = JSON.parse(storedCustomers);
    }
    if (storedAttendanceRecords) {
        attendanceRecords = JSON.parse(storedAttendanceRecords);
    }
    if (storedAttendanceLog) {
        attendanceLog = JSON.parse(storedAttendanceLog);
    }
    updateCustomerDropdown();
    updateAttendanceRecord();
    updateAttendanceSummary();
}

// Function to add a customer
function addCustomer() {
    const customerName = document.getElementById('customer-name').value;
    if (customerName) {
        customers.push(customerName);
        attendanceRecords[customerName] = 0; // Initialize attendance count for the new customer
        updateCustomerDropdown();
        saveData();
        document.getElementById('customer-name').value = '';
    }
}

// Function to update the customer dropdown
function updateCustomerDropdown() {
    const dropdown = document.getElementById('customer-dropdown');
    dropdown.innerHTML = '<option value="" disabled selected>Select a customer</option>';
    customers.forEach((customer, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = customer;
        dropdown.appendChild(option);
    });
}

// Function to record attendance
function recordAttendance() {
    const dropdown = document.getElementById('customer-dropdown');
    const customerIndex = dropdown.value;
    if (customerIndex) {
        const customerName = customers[customerIndex];
        attendanceRecords[customerName]++;
        const now = new Date();
        const record = `${customerName} - ${now.toLocaleString()}`;
        attendanceLog.push(record); // Add the record to the log
        updateAttendanceRecord();
        updateAttendanceSummary();
        saveData();
    }
}

// Function to update the attendance record list
function updateAttendanceRecord() {
    const recordList = document.getElementById('record-list');
    recordList.innerHTML = '';
    attendanceLog.forEach(record => {
        const li = document.createElement('li');
        li.textContent = record;
        recordList.appendChild(li);
    });
}

// Function to update the attendance summary
function updateAttendanceSummary() {
    const summaryList = document.getElementById('summary-list');
    summaryList.innerHTML = '';
    for (const customer in attendanceRecords) {
        const li = document.createElement('li');
        li.textContent = `${customer}: ${attendanceRecords[customer]} times`;
        summaryList.appendChild(li);
    }
}

// Function to save data to local storage
function saveData() {
    localStorage.setItem('customers', JSON.stringify(customers));
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
    localStorage.setItem('attendanceLog', JSON.stringify(attendanceLog));
}

// Initialize data on page load
window.onload = initializeData;
