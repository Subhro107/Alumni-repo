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