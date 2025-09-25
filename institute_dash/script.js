// Add interactivity to the dashboard
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Starting script...');
    
    // Notification bell interaction
    const notificationIcon = document.querySelector('.notification-icon');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('Notifications panel would open here');
        });
    }

    // Quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.textContent;
            alert(`You clicked on ${action}`);
            // In a real application, this would navigate to the respective page
        });
    });

    // Search functionality placeholder
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                alert(`Searching for: ${this.value}`);
                // In a real application, this would trigger a search
            }
        });
    }

    // User Profile Dropdown Functionality - MULTIPLE APPROACHES
    console.log('🔍 Starting element search...');
    
    // Method 1: By ID
    let userProfileBtn = document.getElementById('userProfileBtn');
    let userDropdown = document.getElementById('userDropdown');
    
    console.log('Method 1 (ID):', userProfileBtn, userDropdown);
    
    // Method 2: By Class
    if (!userProfileBtn) {
        userProfileBtn = document.querySelector('.user-profile');
        console.log('Method 2 (class .user-profile):', userProfileBtn);
    }
    
    if (!userDropdown) {
        userDropdown = document.querySelector('.user-dropdown');  
        console.log('Method 2 (class .user-dropdown):', userDropdown);
    }
    
    // Method 3: Wait for DOM to be fully ready
    setTimeout(() => {
        if (!userProfileBtn) {
            userProfileBtn = document.getElementById('userProfileBtn');
            console.log('Method 3 (delayed ID search):', userProfileBtn);
        }
        
        // DROPDOWN FUNCTIONALITY
        if (userProfileBtn && userDropdown) {
            console.log('✅ BOTH ELEMENTS FOUND!');
            
            let isDropdownVisible = false;
            
            userProfileBtn.addEventListener('click', function(e) {
                console.log('🎯 TOGGLING DROPDOWN!');
                e.preventDefault();
                e.stopPropagation();
                
                if (isDropdownVisible) {
                    // Hide dropdown
                    userDropdown.style.opacity = '0';
                    userDropdown.style.visibility = 'hidden';
                    userDropdown.style.transform = 'translateY(-10px)';
                    userDropdown.style.pointerEvents = 'none';
                    userProfileBtn.classList.remove('active');
                    isDropdownVisible = false;
                    console.log('🔽 Dropdown hidden');
                } else {
                    // Show dropdown
                    userDropdown.style.opacity = '1';
                    userDropdown.style.visibility = 'visible';
                    userDropdown.style.transform = 'translateY(0)';
                    userDropdown.style.pointerEvents = 'auto';
                    userProfileBtn.classList.add('active');
                    isDropdownVisible = true;
                    console.log('🔼 Dropdown shown');
                }
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!userProfileBtn.contains(e.target) && !userDropdown.contains(e.target)) {
                    if (isDropdownVisible) {
                        userDropdown.style.opacity = '0';
                        userDropdown.style.visibility = 'hidden';
                        userDropdown.style.transform = 'translateY(-10px)';
                        userDropdown.style.pointerEvents = 'none';
                        userProfileBtn.classList.remove('active');
                        isDropdownVisible = false;
                        console.log('🔽 Dropdown closed (outside click)');
                    }
                }
            });
            
            // Handle dropdown menu items
            const dropdownItems = userDropdown.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function(e) {
                    e.preventDefault();
                    const action = this.textContent.trim();
                    
                    if (action === 'Logout') {
                        if (confirm('Are you sure you want to logout?')) {
                            // Clear session data
                            localStorage.removeItem('institutionSession');
                            localStorage.removeItem('userSession');
                            // Redirect to main index.html (root of the project)
                            window.location.href = '../index.html';
                        }
                    } else if (action === 'Profile Settings') {
                        alert('Profile Settings page would open here');
                    } else if (action === 'Account Settings') {
                        alert('Account Settings page would open here');
                    }
                    
                    // Close dropdown after action
                    userDropdown.style.opacity = '0';
                    userDropdown.style.visibility = 'hidden';
                    userDropdown.style.transform = 'translateY(-10px)';
                    userDropdown.style.pointerEvents = 'none';
                    userProfileBtn.classList.remove('active');
                    isDropdownVisible = false;
                    console.log('🔽 Dropdown closed (menu action)');
                });
            });
            
        } else {
            console.log('❌ Could not find both elements');
        }
    }, 500);

    // ADDITIONAL DEBUGGING - List all elements
    console.log('📋 All elements with IDs:');
    document.querySelectorAll('[id]').forEach(el => {
        console.log(`ID: "${el.id}" - Tag: ${el.tagName} - Classes: ${el.className}`);
    });
    
    console.log('📋 All elements with user-profile class:');
    document.querySelectorAll('.user-profile').forEach(el => {
        console.log('Profile element:', el);
    });
    


});

// CSV Upload Modal Functions
function showUploadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-file-csv"></i> Upload Alumni CSV File</h2>
                <button class="modal-close" onclick="closeUploadModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="upload-info">
                    <div class="info-card">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <h4>CSV Format Requirements</h4>
                            <p>Your CSV file should include the following columns:</p>
                            <ul>
                                <li><strong>name</strong> - Full name of the alumni</li>
                                <li><strong>email</strong> - Email address</li>
                                <li><strong>graduation_year</strong> - Year of graduation</li>
                                <li><strong>department</strong> - Department/Course</li>
                                <li><strong>phone</strong> - Contact number (optional)</li>
                                <li><strong>company</strong> - Current company (optional)</li>
                                <li><strong>designation</strong> - Job title (optional)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="upload-section">
                    <div class="file-upload-area" id="fileUploadArea">
                        <i class="fas fa-cloud-upload-alt upload-icon"></i>
                        <h3>Drop your CSV file here or click to browse</h3>
                        <p>Maximum file size: 10MB</p>
                        <input type="file" id="csvFileInput" accept=".csv" style="display: none;">
                        <button type="button" class="btn btn-outline" onclick="document.getElementById('csvFileInput').click()">
                            <i class="fas fa-folder-open"></i> Browse Files
                        </button>
                    </div>
                    
                    <div class="file-info" id="fileInfo" style="display: none;">
                        <div class="file-details">
                            <i class="fas fa-file-csv file-icon"></i>
                            <div class="file-data">
                                <span class="file-name" id="fileName"></span>
                                <span class="file-size" id="fileSize"></span>
                            </div>
                            <button class="remove-file" onclick="removeFile()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="preview-section" id="previewSection" style="display: none;">
                    <h4>Preview (First 5 rows)</h4>
                    <div class="table-container">
                        <table class="preview-table" id="previewTable"></table>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeUploadModal()">Cancel</button>
                <button class="btn btn-primary" id="uploadBtn" onclick="uploadCSV()" disabled>
                    <i class="fas fa-upload"></i> Upload Alumni Data
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup file input handler
    const fileInput = document.getElementById('csvFileInput');
    const uploadArea = document.getElementById('fileUploadArea');
    
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
}

function closeUploadModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        handleFile(file);
    }
}

function handleFile(file) {
    if (!file.name.toLowerCase().endsWith('.csv')) {
        alert('Please select a CSV file.');
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) { // 10MB
        alert('File size must be less than 10MB.');
        return;
    }
    
    // Show file info
    document.getElementById('fileName').textContent = file.name;
    document.getElementById('fileSize').textContent = formatFileSize(file.size);
    document.getElementById('fileInfo').style.display = 'block';
    document.getElementById('uploadBtn').disabled = false;
    
    // Read and preview CSV
    const reader = new FileReader();
    reader.onload = function(e) {
        const csv = e.target.result;
        previewCSV(csv);
    };
    reader.readAsText(file);
}

function previewCSV(csvText) {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    const previewRows = lines.slice(1, 6); // First 5 data rows
    
    let tableHTML = '<thead><tr>';
    headers.forEach(header => {
        tableHTML += `<th>${header}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';
    
    previewRows.forEach(row => {
        const cells = row.split(',').map(c => c.trim());
        tableHTML += '<tr>';
        cells.forEach(cell => {
            tableHTML += `<td>${cell}</td>`;
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody>';
    
    document.getElementById('previewTable').innerHTML = tableHTML;
    document.getElementById('previewSection').style.display = 'block';
}

function removeFile() {
    document.getElementById('csvFileInput').value = '';
    document.getElementById('fileInfo').style.display = 'none';
    document.getElementById('previewSection').style.display = 'none';
    document.getElementById('uploadBtn').disabled = true;
}

function uploadCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first.');
        return;
    }
    
    // Show loading state
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    uploadBtn.disabled = true;
    
    // Simulate upload process (in real app, this would send to server)
    setTimeout(() => {
        // Show success message
        const successModal = document.createElement('div');
        successModal.className = 'modal-overlay';
        successModal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h2><i class="fas fa-check-circle" style="color: #28a745;"></i> Upload Successful</h2>
                </div>
                <div class="modal-body">
                    <div class="success-message">
                        <p>Alumni data has been successfully imported!</p>
                        <div class="upload-summary">
                            <div class="summary-item">
                                <strong>File:</strong> ${file.name}
                            </div>
                            <div class="summary-item">
                                <strong>Records Processed:</strong> <span id="recordCount">Loading...</span>
                            </div>
                            <div class="summary-item">
                                <strong>Status:</strong> <span style="color: #28a745;">Completed</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="closeAllModals(); window.location.reload();">
                        <i class="fas fa-check"></i> Done
                    </button>
                </div>
            </div>
        `;
        
        // Close upload modal and show success modal
        closeUploadModal();
        document.body.appendChild(successModal);
        
        // Count records in CSV (simulate)
        const reader = new FileReader();
        reader.onload = function(e) {
            const lines = e.target.result.split('\n').filter(line => line.trim());
            const recordCount = lines.length - 1; // Exclude header
            document.getElementById('recordCount').textContent = recordCount;
        };
        reader.readAsText(file);
        
    }, 2000); // Simulate 2 second upload
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.remove());
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Student Upload Modal Functions
function showStudentUploadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-file-csv"></i> Upload Student CSV File</h2>
                <button class="modal-close" onclick="closeUploadModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="upload-info">
                    <div class="info-card">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <h4>CSV Format Requirements</h4>
                            <p>Your CSV file should include the following columns:</p>
                            <ul>
                                <li><strong>name</strong> - Full name of the student</li>
                                <li><strong>email</strong> - Email address</li>
                                <li><strong>student_id</strong> - Unique student ID</li>
                                <li><strong>department</strong> - Department/Course</li>
                                <li><strong>semester</strong> - Current semester</li>
                                <li><strong>phone</strong> - Contact number (optional)</li>
                                <li><strong>address</strong> - Address (optional)</li>
                                <li><strong>enrollment_year</strong> - Year of enrollment</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="upload-section">
                    <div class="file-upload-area" id="fileUploadArea">
                        <i class="fas fa-cloud-upload-alt upload-icon"></i>
                        <h3>Drop your CSV file here or click to browse</h3>
                        <p>Maximum file size: 10MB</p>
                        <input type="file" id="csvFileInput" accept=".csv" style="display: none;">
                        <button type="button" class="btn btn-outline" onclick="document.getElementById('csvFileInput').click()">
                            <i class="fas fa-folder-open"></i> Browse Files
                        </button>
                    </div>
                    
                    <div class="file-info" id="fileInfo" style="display: none;">
                        <div class="file-details">
                            <i class="fas fa-file-csv file-icon"></i>
                            <div class="file-data">
                                <span class="file-name" id="fileName"></span>
                                <span class="file-size" id="fileSize"></span>
                            </div>
                            <button class="remove-file" onclick="removeFile()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="preview-section" id="previewSection" style="display: none;">
                    <h4>Preview (First 5 rows)</h4>
                    <div class="table-container">
                        <table class="preview-table" id="previewTable"></table>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeUploadModal()">Cancel</button>
                <button class="btn btn-primary" id="uploadBtn" onclick="uploadStudentCSV()" disabled>
                    <i class="fas fa-upload"></i> Upload Student Data
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setupFileUploadHandlers();
}

// Faculty Upload Modal Functions
function showFacultyUploadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-file-csv"></i> Upload Faculty CSV File</h2>
                <button class="modal-close" onclick="closeUploadModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="upload-info">
                    <div class="info-card">
                        <i class="fas fa-info-circle"></i>
                        <div>
                            <h4>CSV Format Requirements</h4>
                            <p>Your CSV file should include the following columns:</p>
                            <ul>
                                <li><strong>name</strong> - Full name of the faculty</li>
                                <li><strong>email</strong> - Email address</li>
                                <li><strong>employee_id</strong> - Unique employee ID</li>
                                <li><strong>department</strong> - Department</li>
                                <li><strong>designation</strong> - Position/Rank</li>
                                <li><strong>qualification</strong> - Highest qualification</li>
                                <li><strong>phone</strong> - Contact number (optional)</li>
                                <li><strong>specialization</strong> - Area of expertise (optional)</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="upload-section">
                    <div class="file-upload-area" id="fileUploadArea">
                        <i class="fas fa-cloud-upload-alt upload-icon"></i>
                        <h3>Drop your CSV file here or click to browse</h3>
                        <p>Maximum file size: 10MB</p>
                        <input type="file" id="csvFileInput" accept=".csv" style="display: none;">
                        <button type="button" class="btn btn-outline" onclick="document.getElementById('csvFileInput').click()">
                            <i class="fas fa-folder-open"></i> Browse Files
                        </button>
                    </div>
                    
                    <div class="file-info" id="fileInfo" style="display: none;">
                        <div class="file-details">
                            <i class="fas fa-file-csv file-icon"></i>
                            <div class="file-data">
                                <span class="file-name" id="fileName"></span>
                                <span class="file-size" id="fileSize"></span>
                            </div>
                            <button class="remove-file" onclick="removeFile()">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div class="preview-section" id="previewSection" style="display: none;">
                    <h4>Preview (First 5 rows)</h4>
                    <div class="table-container">
                        <table class="preview-table" id="previewTable"></table>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeUploadModal()">Cancel</button>
                <button class="btn btn-primary" id="uploadBtn" onclick="uploadFacultyCSV()" disabled>
                    <i class="fas fa-upload"></i> Upload Faculty Data
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setupFileUploadHandlers();
}

function setupFileUploadHandlers() {
    // Setup file input handler
    const fileInput = document.getElementById('csvFileInput');
    const uploadArea = document.getElementById('fileUploadArea');
    
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop functionality
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
}

function uploadStudentCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first.');
        return;
    }
    
    // Show loading state
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    uploadBtn.disabled = true;
    
    // Simulate upload process
    setTimeout(() => {
        showUploadSuccess(file, 'Student data has been successfully imported!');
    }, 2000);
}

function uploadFacultyCSV() {
    const fileInput = document.getElementById('csvFileInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert('Please select a file first.');
        return;
    }
    
    // Show loading state
    const uploadBtn = document.getElementById('uploadBtn');
    uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
    uploadBtn.disabled = true;
    
    // Simulate upload process
    setTimeout(() => {
        showUploadSuccess(file, 'Faculty data has been successfully imported!');
    }, 2000);
}

function showUploadSuccess(file, message) {
    const successModal = document.createElement('div');
    successModal.className = 'modal-overlay';
    successModal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-check-circle" style="color: #28a745;"></i> Upload Successful</h2>
            </div>
            <div class="modal-body">
                <div class="success-message">
                    <p>${message}</p>
                    <div class="upload-summary">
                        <div class="summary-item">
                            <strong>File:</strong> ${file.name}
                        </div>
                        <div class="summary-item">
                            <strong>Records Processed:</strong> <span id="recordCount">Loading...</span>
                        </div>
                        <div class="summary-item">
                            <strong>Status:</strong> <span style="color: #28a745;">Completed</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary" onclick="closeAllModals(); window.location.reload();">
                    <i class="fas fa-check"></i> Done
                </button>
            </div>
        </div>
    `;
    
    // Close upload modal and show success modal
    closeUploadModal();
    document.body.appendChild(successModal);
    
    // Count records in CSV (simulate)
    const reader = new FileReader();
    reader.onload = function(e) {
        const lines = e.target.result.split('\n').filter(line => line.trim());
        const recordCount = lines.length - 1; // Exclude header
        document.getElementById('recordCount').textContent = recordCount;
    };
    reader.readAsText(file);
}

// ============= CALENDAR FUNCTIONALITY ============= 

// Calendar state
let currentDate = new Date();
let selectedDate = null;
let calendarEvents = [];
let calendarTasks = [];

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('calendar.html')) {
        initializeCalendar();
    }
});

function initializeCalendar() {
    // Load sample data
    loadSampleData();
    
    // Setup event listeners
    setupCalendarEventListeners();
    
    // Render calendar
    renderCalendar();
    
    // Update sidebar
    updateSidebar();
}

function setupCalendarEventListeners() {
    // Navigation buttons
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }
    
    // View toggle buttons
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            viewBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            // TODO: Implement different view modes
        });
    });
}

function renderCalendar() {
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    // Update month header
    const monthHeader = document.getElementById('currentMonth');
    if (monthHeader) {
        monthHeader.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    
    // Generate calendar grid
    const calendarGrid = document.getElementById('calendarGrid');
    if (!calendarGrid) return;
    
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    calendarGrid.innerHTML = '';
    
    for (let i = 0; i < 42; i++) {
        const dayDate = new Date(startDate);
        dayDate.setDate(startDate.getDate() + i);
        
        const dayElement = createDayElement(dayDate);
        calendarGrid.appendChild(dayElement);
    }
    
    updateSidebar();
}

function createDayElement(date) {
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    
    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
    const isToday = isDateToday(date);
    const isSelected = selectedDate && isSameDate(date, selectedDate);
    
    if (!isCurrentMonth) {
        dayDiv.classList.add('other-month');
    }
    if (isToday) {
        dayDiv.classList.add('today');
    }
    if (isSelected) {
        dayDiv.classList.add('selected');
    }
    
    // Day number
    const dayNumber = document.createElement('div');
    dayNumber.className = 'day-number';
    dayNumber.textContent = date.getDate();
    dayDiv.appendChild(dayNumber);
    
    // Events for this day
    const dayEvents = document.createElement('div');
    dayEvents.className = 'day-events';
    
    const eventsOnThisDay = getEventsForDate(date);
    eventsOnThisDay.forEach(event => {
        const eventElement = document.createElement('div');
        eventElement.className = `event-item ${event.type}`;
        eventElement.textContent = event.title;
        eventElement.addEventListener('click', (e) => {
            e.stopPropagation();
            showEventDetails(event);
        });
        dayEvents.appendChild(eventElement);
    });
    
    dayDiv.appendChild(dayEvents);
    
    // Click handler for day
    dayDiv.addEventListener('click', () => {
        selectDate(date);
    });
    
    return dayDiv;
}

function selectDate(date) {
    selectedDate = new Date(date);
    renderCalendar();
}

function getEventsForDate(date) {
    const events = [];
    
    // Check calendar events
    calendarEvents.forEach(event => {
        if (isSameDate(new Date(event.date), date)) {
            events.push({...event, type: 'event'});
        }
    });
    
    // Check calendar tasks
    calendarTasks.forEach(task => {
        if (isSameDate(new Date(task.dueDate), date)) {
            events.push({
                title: task.title,
                type: task.priority === 'high' ? 'deadline' : 'task',
                ...task
            });
        }
    });
    
    return events;
}

function isDateToday(date) {
    const today = new Date();
    return isSameDate(date, today);
}

function isSameDate(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

function updateSidebar() {
    updateUpcomingEvents();
    updatePendingTasks();
    updateCalendarStats();
}

function updateUpcomingEvents() {
    const container = document.getElementById('upcomingEvents');
    if (!container) return;
    
    const upcoming = calendarEvents
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5);
    
    container.innerHTML = '';
    
    if (upcoming.length === 0) {
        container.innerHTML = '<p style="color: #666; font-size: 12px;">No upcoming events</p>';
        return;
    }
    
    upcoming.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.className = 'event-preview';
        eventDiv.innerHTML = `
            <div class="event-title">${event.title}</div>
            <div class="event-date">${formatEventDate(event.date)} ${event.time || ''}</div>
        `;
        eventDiv.addEventListener('click', () => showEventDetails(event));
        container.appendChild(eventDiv);
    });
}

function updatePendingTasks() {
    const container = document.getElementById('pendingTasks');
    if (!container) return;
    
    const pending = calendarTasks
        .filter(task => !task.completed && new Date(task.dueDate) >= new Date())
        .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        .slice(0, 5);
    
    container.innerHTML = '';
    
    if (pending.length === 0) {
        container.innerHTML = '<p style="color: #666; font-size: 12px;">No pending tasks</p>';
        return;
    }
    
    pending.forEach(task => {
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task-preview';
        taskDiv.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-date">Due: ${formatEventDate(task.dueDate)}</div>
        `;
        taskDiv.addEventListener('click', () => showTaskDetails(task));
        container.appendChild(taskDiv);
    });
}

function updateCalendarStats() {
    const totalEventsEl = document.getElementById('totalEvents');
    const totalTasksEl = document.getElementById('totalTasks');
    const thisWeekEventsEl = document.getElementById('thisWeekEvents');
    
    if (totalEventsEl) {
        totalEventsEl.textContent = calendarEvents.length;
    }
    
    if (totalTasksEl) {
        totalTasksEl.textContent = calendarTasks.filter(task => !task.completed).length;
    }
    
    if (thisWeekEventsEl) {
        const thisWeek = getEventsThisWeek();
        thisWeekEventsEl.textContent = thisWeek.length;
    }
}

function getEventsThisWeek() {
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return calendarEvents.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= weekStart && eventDate <= weekEnd;
    });
}

function formatEventDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Modal functions
function showAddEventModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-calendar-plus"></i> Add New Event</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <form id="eventForm">
                    <div class="form-group">
                        <label for="eventTitle">Event Title *</label>
                        <input type="text" id="eventTitle" class="form-control" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="eventDate">Date *</label>
                            <input type="date" id="eventDate" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="eventTime">Time</label>
                            <input type="time" id="eventTime" class="form-control">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="eventLocation">Location</label>
                        <input type="text" id="eventLocation" class="form-control" placeholder="Event location">
                    </div>
                    
                    <div class="form-group">
                        <label for="eventDescription">Description</label>
                        <textarea id="eventDescription" class="form-control" rows="3" placeholder="Event description"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="eventCategory">Category</label>
                        <select id="eventCategory" class="form-control">
                            <option value="academic">Academic</option>
                            <option value="administrative">Administrative</option>
                            <option value="cultural">Cultural</option>
                            <option value="sports">Sports</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </form>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveEvent()">
                    <i class="fas fa-save"></i> Save Event
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set default date if a date is selected
    if (selectedDate) {
        document.getElementById('eventDate').value = selectedDate.toISOString().split('T')[0];
    }
}

function showAddTaskModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-tasks"></i> Add New Task</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <form id="taskForm">
                    <div class="form-group">
                        <label for="taskTitle">Task Title *</label>
                        <input type="text" id="taskTitle" class="form-control" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taskDueDate">Due Date *</label>
                            <input type="date" id="taskDueDate" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <label for="taskDueTime">Due Time</label>
                            <input type="time" id="taskDueTime" class="form-control">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="taskDescription">Description</label>
                        <textarea id="taskDescription" class="form-control" rows="3" placeholder="Task description"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Priority Level</label>
                        <div class="priority-options">
                            <div class="priority-option low" data-priority="low">
                                <i class="fas fa-arrow-down"></i> Low
                            </div>
                            <div class="priority-option medium selected" data-priority="medium">
                                <i class="fas fa-minus"></i> Medium
                            </div>
                            <div class="priority-option high" data-priority="high">
                                <i class="fas fa-arrow-up"></i> High
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="taskAssignee">Assign To</label>
                        <select id="taskAssignee" class="form-control">
                            <option value="admin">Institution Admin</option>
                            <option value="faculty">Faculty Coordinator</option>
                            <option value="staff">Support Staff</option>
                        </select>
                    </div>
                </form>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="saveTask()">
                    <i class="fas fa-save"></i> Save Task
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Set default date if a date is selected
    if (selectedDate) {
        document.getElementById('taskDueDate').value = selectedDate.toISOString().split('T')[0];
    }
    
    // Setup priority selection
    const priorityOptions = document.querySelectorAll('.priority-option');
    priorityOptions.forEach(option => {
        option.addEventListener('click', () => {
            priorityOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
}

function closeModal() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => modal.remove());
}

function saveEvent() {
    const form = document.getElementById('eventForm');
    
    const event = {
        id: Date.now(),
        title: document.getElementById('eventTitle').value,
        date: document.getElementById('eventDate').value,
        time: document.getElementById('eventTime').value,
        location: document.getElementById('eventLocation').value,
        description: document.getElementById('eventDescription').value,
        category: document.getElementById('eventCategory').value,
        created: new Date().toISOString()
    };
    
    if (!event.title || !event.date) {
        alert('Please fill in required fields.');
        return;
    }
    
    calendarEvents.push(event);
    closeModal();
    renderCalendar();
    
    // Show success message
    showSuccessMessage('Event added successfully!');
}

function saveTask() {
    const selectedPriority = document.querySelector('.priority-option.selected');
    
    const task = {
        id: Date.now(),
        title: document.getElementById('taskTitle').value,
        dueDate: document.getElementById('taskDueDate').value,
        dueTime: document.getElementById('taskDueTime').value,
        description: document.getElementById('taskDescription').value,
        priority: selectedPriority ? selectedPriority.dataset.priority : 'medium',
        assignee: document.getElementById('taskAssignee').value,
        completed: false,
        created: new Date().toISOString()
    };
    
    if (!task.title || !task.dueDate) {
        alert('Please fill in required fields.');
        return;
    }
    
    calendarTasks.push(task);
    closeModal();
    renderCalendar();
    
    // Show success message
    showSuccessMessage('Task added successfully!');
}

function showEventDetails(event) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-calendar-alt"></i> Event Details</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div style="padding: 20px 0;">
                    <h3 style="color: #1a3c8f; margin-bottom: 16px;">${event.title}</h3>
                    <div style="display: grid; gap: 12px;">
                        <div><strong>Date:</strong> ${formatEventDate(event.date)}</div>
                        ${event.time ? `<div><strong>Time:</strong> ${event.time}</div>` : ''}
                        ${event.location ? `<div><strong>Location:</strong> ${event.location}</div>` : ''}
                        ${event.category ? `<div><strong>Category:</strong> ${event.category}</div>` : ''}
                        ${event.description ? `<div><strong>Description:</strong><br>${event.description}</div>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function showTaskDetails(task) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-tasks"></i> Task Details</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div style="padding: 20px 0;">
                    <h3 style="color: #1a3c8f; margin-bottom: 16px;">${task.title}</h3>
                    <div style="display: grid; gap: 12px;">
                        <div><strong>Due Date:</strong> ${formatEventDate(task.dueDate)}</div>
                        ${task.dueTime ? `<div><strong>Due Time:</strong> ${task.dueTime}</div>` : ''}
                        <div><strong>Priority:</strong> <span style="text-transform: capitalize; color: ${getPriorityColor(task.priority)}">${task.priority}</span></div>
                        <div><strong>Assigned To:</strong> ${task.assignee}</div>
                        <div><strong>Status:</strong> ${task.completed ? 'Completed' : 'Pending'}</div>
                        ${task.description ? `<div><strong>Description:</strong><br>${task.description}</div>` : ''}
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Close</button>
                ${!task.completed ? `<button class="btn btn-success" onclick="markTaskComplete(${task.id})">
                    <i class="fas fa-check"></i> Mark Complete
                </button>` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function getPriorityColor(priority) {
    switch(priority) {
        case 'high': return '#dc3545';
        case 'medium': return '#ffc107';
        case 'low': return '#28a745';
        default: return '#666';
    }
}

function markTaskComplete(taskId) {
    const task = calendarTasks.find(t => t.id === taskId);
    if (task) {
        task.completed = true;
        closeModal();
        renderCalendar();
        showSuccessMessage('Task marked as complete!');
    }
}

function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10001;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function loadSampleData() {
    // Get current date for realistic sample data
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    const nextMonth = new Date(today);
    nextMonth.setMonth(today.getMonth() + 1);
    
    // Sample events
    calendarEvents = [
        {
            id: 1,
            title: 'Faculty Meeting',
            date: today.toISOString().split('T')[0],
            time: '14:00',
            location: 'Conference Room A',
            description: 'Monthly faculty coordination meeting',
            category: 'administrative'
        },
        {
            id: 2,
            title: 'Alumni Reunion',
            date: nextWeek.toISOString().split('T')[0],
            time: '10:00',
            location: 'Main Auditorium',
            description: 'Annual alumni reunion event',
            category: 'cultural'
        },
        {
            id: 3,
            title: 'Semester Exams Begin',
            date: nextMonth.toISOString().split('T')[0],
            time: '09:00',
            location: 'Various Halls',
            description: 'Mid-semester examinations',
            category: 'academic'
        }
    ];
    
    // Sample tasks
    calendarTasks = [
        {
            id: 1,
            title: 'Update Student Database',
            dueDate: nextWeek.toISOString().split('T')[0],
            dueTime: '17:00',
            description: 'Update student records with latest information',
            priority: 'high',
            assignee: 'admin',
            completed: false
        },
        {
            id: 2,
            title: 'Prepare Alumni Newsletter',
            dueDate: nextMonth.toISOString().split('T')[0],
            dueTime: '12:00',
            description: 'Draft and review quarterly alumni newsletter',
            priority: 'medium',
            assignee: 'staff',
            completed: false
        }
    ];
}

// ============= ANNOUNCEMENTS FUNCTIONALITY ============= 

// Initialize announcements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('announcements.html')) {
        initializeAnnouncements();
    }
});

function initializeAnnouncements() {
    // Setup filter handlers
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', filterAnnouncements);
    });
    
    // Setup action button handlers
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', handleAnnouncementAction);
    });
}

function showCreateAnnouncementModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal announcement-modal">
            <div class="modal-header">
                <h2><i class="fas fa-bullhorn"></i> Create New Announcement</h2>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <form id="announcementForm">
                    <!-- Basic Information Section -->
                    <div class="form-section">
                        <h3><i class="fas fa-info-circle"></i> Basic Information</h3>
                        
                        <div class="form-group">
                            <label for="announcementTitle">Announcement Title *</label>
                            <input type="text" id="announcementTitle" class="form-control" required
                                   placeholder="Enter a clear, descriptive title">
                        </div>
                        
                        <div class="form-group">
                            <label for="announcementContent">Content *</label>
                            <textarea id="announcementContent" class="form-control" rows="6" required
                                      placeholder="Write your announcement content here..."></textarea>
                            <small class="form-text">Use clear, concise language. You can include formatting and links.</small>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="announcementPriority">Priority Level *</label>
                                <select id="announcementPriority" class="form-control" required>
                                    <option value="">Select Priority</option>
                                    <option value="high">High Priority - Urgent/Important</option>
                                    <option value="medium">Medium Priority - Standard</option>
                                    <option value="low">Low Priority - Informational</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="announcementCategory">Category</label>
                                <select id="announcementCategory" class="form-control">
                                    <option value="general">General</option>
                                    <option value="academic">Academic</option>
                                    <option value="administrative">Administrative</option>
                                    <option value="events">Events</option>
                                    <option value="recruitment">Recruitment</option>
                                    <option value="emergency">Emergency</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Target Audience Section -->
                    <div class="form-section">
                        <h3><i class="fas fa-users"></i> Target Audience</h3>
                        
                        <div class="audience-selection">
                            <div class="audience-group">
                                <div class="audience-header">
                                    <label class="checkbox-container">
                                        <input type="checkbox" id="targetAlumni" name="audience" value="alumni">
                                        <span class="checkmark"></span>
                                        <strong>Alumni</strong>
                                    </label>
                                    <span class="audience-count">(1,847 members)</span>
                                </div>
                                <div class="audience-filters" id="alumniFilters" style="display: none;">
                                    <div class="filter-row">
                                        <select class="form-control" id="alumniYear">
                                            <option value="all">All Graduation Years</option>
                                            <option value="2020-2025">2020-2025</option>
                                            <option value="2015-2019">2015-2019</option>
                                            <option value="2010-2014">2010-2014</option>
                                            <option value="before-2010">Before 2010</option>
                                        </select>
                                        <select class="form-control" id="alumniDepartment">
                                            <option value="all">All Departments</option>
                                            <option value="cse">Computer Science</option>
                                            <option value="ece">Electronics & Communication</option>
                                            <option value="mech">Mechanical Engineering</option>
                                            <option value="civil">Civil Engineering</option>
                                            <option value="mba">MBA</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="audience-group">
                                <div class="audience-header">
                                    <label class="checkbox-container">
                                        <input type="checkbox" id="targetStudents" name="audience" value="students">
                                        <span class="checkmark"></span>
                                        <strong>Students</strong>
                                    </label>
                                    <span class="audience-count">(2,341 members)</span>
                                </div>
                                <div class="audience-filters" id="studentFilters" style="display: none;">
                                    <div class="filter-row">
                                        <select class="form-control" id="studentYear">
                                            <option value="all">All Years</option>
                                            <option value="1st">1st Year</option>
                                            <option value="2nd">2nd Year</option>
                                            <option value="3rd">3rd Year</option>
                                            <option value="4th">4th Year</option>
                                        </select>
                                        <select class="form-control" id="studentDepartment">
                                            <option value="all">All Departments</option>
                                            <option value="cse">Computer Science</option>
                                            <option value="ece">Electronics & Communication</option>
                                            <option value="mech">Mechanical Engineering</option>
                                            <option value="civil">Civil Engineering</option>
                                            <option value="mba">MBA</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="audience-group">
                                <div class="audience-header">
                                    <label class="checkbox-container">
                                        <input type="checkbox" id="targetFaculty" name="audience" value="faculty">
                                        <span class="checkmark"></span>
                                        <strong>Faculty</strong>
                                    </label>
                                    <span class="audience-count">(145 members)</span>
                                </div>
                                <div class="audience-filters" id="facultyFilters" style="display: none;">
                                    <div class="filter-row">
                                        <select class="form-control" id="facultyDepartment">
                                            <option value="all">All Departments</option>
                                            <option value="cse">Computer Science</option>
                                            <option value="ece">Electronics & Communication</option>
                                            <option value="mech">Mechanical Engineering</option>
                                            <option value="civil">Civil Engineering</option>
                                            <option value="management">Management</option>
                                        </select>
                                        <select class="form-control" id="facultyDesignation">
                                            <option value="all">All Designations</option>
                                            <option value="professor">Professor</option>
                                            <option value="associate">Associate Professor</option>
                                            <option value="assistant">Assistant Professor</option>
                                            <option value="lecturer">Lecturer</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="recipient-summary">
                            <div class="summary-box">
                                <strong>Estimated Recipients: <span id="recipientCount">0</span></strong>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Delivery Options Section -->
                    <div class="form-section">
                        <h3><i class="fas fa-paper-plane"></i> Delivery Options</h3>
                        
                        <div class="delivery-options">
                            <label class="radio-container">
                                <input type="radio" name="deliveryType" value="immediate" checked>
                                <span class="radio-checkmark"></span>
                                <div class="radio-content">
                                    <strong>Send Immediately</strong>
                                    <span>Send this announcement right away</span>
                                </div>
                            </label>
                            
                            <label class="radio-container">
                                <input type="radio" name="deliveryType" value="scheduled">
                                <span class="radio-checkmark"></span>
                                <div class="radio-content">
                                    <strong>Schedule for Later</strong>
                                    <span>Choose a specific date and time</span>
                                </div>
                            </label>
                            
                            <label class="radio-container">
                                <input type="radio" name="deliveryType" value="draft">
                                <span class="radio-checkmark"></span>
                                <div class="radio-content">
                                    <strong>Save as Draft</strong>
                                    <span>Save and send later</span>
                                </div>
                            </label>
                        </div>
                        
                        <div class="schedule-options" id="scheduleOptions" style="display: none;">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="scheduleDate">Schedule Date</label>
                                    <input type="date" id="scheduleDate" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="scheduleTime">Schedule Time</label>
                                    <input type="time" id="scheduleTime" class="form-control">
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Additional Options Section -->
                    <div class="form-section">
                        <h3><i class="fas fa-cog"></i> Additional Options</h3>
                        
                        <div class="additional-options">
                            <label class="checkbox-container">
                                <input type="checkbox" id="emailNotification">
                                <span class="checkmark"></span>
                                Send email notifications
                            </label>
                            
                            <label class="checkbox-container">
                                <input type="checkbox" id="smsNotification">
                                <span class="checkmark"></span>
                                Send SMS notifications (for high priority only)
                            </label>
                            
                            <label class="checkbox-container">
                                <input type="checkbox" id="pushNotification" checked>
                                <span class="checkmark"></span>
                                Send push notifications
                            </label>
                            
                            <label class="checkbox-container">
                                <input type="checkbox" id="requireConfirmation">
                                <span class="checkmark"></span>
                                Require read confirmation
                            </label>
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="modal-footer">
                <div class="footer-left">
                    <button class="btn btn-outline" onclick="previewAnnouncement()">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
                <div class="footer-right">
                    <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                    <button class="btn btn-primary" onclick="sendAnnouncement()">
                        <i class="fas fa-paper-plane"></i> <span id="sendButtonText">Send Now</span>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Setup modal functionality
    setupAnnouncementModal();
}

function setupAnnouncementModal() {
    // Audience checkbox handlers
    const audienceCheckboxes = document.querySelectorAll('input[name="audience"]');
    audienceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const filterId = this.value + 'Filters';
            const filterDiv = document.getElementById(filterId);
            if (filterDiv) {
                filterDiv.style.display = this.checked ? 'block' : 'none';
            }
            updateRecipientCount();
        });
    });
    
    // Delivery type handlers
    const deliveryRadios = document.querySelectorAll('input[name="deliveryType"]');
    deliveryRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const scheduleOptions = document.getElementById('scheduleOptions');
            const sendButtonText = document.getElementById('sendButtonText');
            
            if (this.value === 'scheduled') {
                scheduleOptions.style.display = 'block';
                sendButtonText.textContent = 'Schedule';
            } else if (this.value === 'draft') {
                scheduleOptions.style.display = 'none';
                sendButtonText.textContent = 'Save Draft';
            } else {
                scheduleOptions.style.display = 'none';
                sendButtonText.textContent = 'Send Now';
            }
        });
    });
    
    // Priority change handler for SMS option
    const prioritySelect = document.getElementById('announcementPriority');
    const smsCheckbox = document.getElementById('smsNotification');
    
    prioritySelect.addEventListener('change', function() {
        if (this.value !== 'high') {
            smsCheckbox.checked = false;
            smsCheckbox.disabled = true;
        } else {
            smsCheckbox.disabled = false;
        }
    });
    
    // Initial recipient count
    updateRecipientCount();
}

function updateRecipientCount() {
    let totalRecipients = 0;
    
    // Count based on selected audiences
    if (document.getElementById('targetAlumni')?.checked) {
        totalRecipients += 1847; // This would be dynamic based on filters
    }
    if (document.getElementById('targetStudents')?.checked) {
        totalRecipients += 2341;
    }
    if (document.getElementById('targetFaculty')?.checked) {
        totalRecipients += 145;
    }
    
    const countElement = document.getElementById('recipientCount');
    if (countElement) {
        countElement.textContent = totalRecipients.toLocaleString();
    }
}

function previewAnnouncement() {
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;
    const priority = document.getElementById('announcementPriority').value;
    
    if (!title || !content) {
        alert('Please fill in the title and content to preview.');
        return;
    }
    
    // Create preview modal
    const previewModal = document.createElement('div');
    previewModal.className = 'modal-overlay preview-modal';
    previewModal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2><i class="fas fa-eye"></i> Announcement Preview</h2>
                <button class="modal-close" onclick="closePreviewModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <div class="preview-content">
                    <div class="preview-announcement">
                        <div class="announcement-header">
                            <div class="announcement-meta">
                                <span class="priority-badge ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
                                <span class="status-badge sent">Preview</span>
                            </div>
                        </div>
                        <div class="announcement-content">
                            <h3>${title}</h3>
                            <p>${content}</p>
                            <div class="announcement-details">
                                <div class="detail-item">
                                    <i class="fas fa-users"></i>
                                    <span>Recipients: ${document.getElementById('recipientCount').textContent} members</span>
                                </div>
                                <div class="detail-item">
                                    <i class="fas fa-calendar-alt"></i>
                                    <span>Send time: ${new Date().toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closePreviewModal()">Back to Edit</button>
                <button class="btn btn-primary" onclick="closePreviewModal(); sendAnnouncement();">
                    <i class="fas fa-paper-plane"></i> Looks Good, Send Now
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(previewModal);
}

function closePreviewModal() {
    const previewModal = document.querySelector('.preview-modal');
    if (previewModal) {
        previewModal.remove();
    }
}

function sendAnnouncement() {
    const form = document.getElementById('announcementForm');
    const title = document.getElementById('announcementTitle').value;
    const content = document.getElementById('announcementContent').value;
    const priority = document.getElementById('announcementPriority').value;
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
    
    // Validation
    if (!title || !content || !priority) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Check if at least one audience is selected
    const selectedAudiences = document.querySelectorAll('input[name="audience"]:checked');
    if (selectedAudiences.length === 0) {
        alert('Please select at least one target audience.');
        return;
    }
    
    // Show sending state
    const sendButton = document.querySelector('.modal-footer .btn-primary');
    const originalText = sendButton.innerHTML;
    sendButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    sendButton.disabled = true;
    
    // Simulate sending process
    setTimeout(() => {
        let message = '';
        if (deliveryType === 'immediate') {
            message = 'Announcement sent successfully!';
        } else if (deliveryType === 'scheduled') {
            message = 'Announcement scheduled successfully!';
        } else {
            message = 'Announcement saved as draft!';
        }
        
        closeModal();
        showAnnouncementSuccess(message);
        
        // In a real application, this would refresh the announcements list
        // refreshAnnouncementsList();
        
    }, 2000);
}

function showAnnouncementSuccess(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 10001;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
    `;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

function filterAnnouncements() {
    // This would filter the announcements based on selected filters
    console.log('Filtering announcements...');
}

function handleAnnouncementAction(event) {
    const action = event.currentTarget.title;
    console.log('Announcement action:', action);
    // Handle different actions like edit, delete, view analytics
}