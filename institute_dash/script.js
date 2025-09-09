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