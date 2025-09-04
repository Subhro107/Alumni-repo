// =================== COMMON UTILITIES FOR ALL PAGES ===================

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeNotifications();
    initializeMobile();
    initializeUserInteractions();
    initializeAnimations();
});

// =================== NAVIGATION ===================
function initializeNavigation() {
    // Active navigation state
    const navItems = document.querySelectorAll('.nav-item, .menu-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Set active nav item based on current page
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.includes(currentPage)) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Handle navigation clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Allow default navigation but update visual state
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// =================== SEARCH FUNCTIONALITY ===================
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return;

    // Search input focus/blur effects
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#007AFF';
        this.style.backgroundColor = 'white';
    });

    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#e5e5e7';
        this.style.backgroundColor = '#f5f5f7';
    });

    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.trim();
            if (searchTerm) {
                performSearch(searchTerm);
            }
        }
    });

    // Real-time search for specific pages
    if (document.getElementById('globalSearch') || searchInput.id === 'searchName') {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();
            if (query.length > 2) {
                filterContent(query);
            } else {
                clearFilters();
            }
        });
    }
}

function performSearch(searchTerm) {
    console.log(`Searching for: ${searchTerm}`);
    
    // Show loading state
    showNotification('Searching...', 'info');
    
    // Simulate search with actual functionality
    setTimeout(() => {
        const results = globalSearch(searchTerm);
        if (results.length > 0) {
            showNotification(`Found ${results.length} results for "${searchTerm}"`, 'success');
            displaySearchResults(results, searchTerm);
        } else {
            showNotification(`No results found for "${searchTerm}"`, 'info');
        }
    }, 1000);
}

function globalSearch(query) {
    const results = [];
    
    // Search alumni data if available
    if (typeof alumniData !== 'undefined') {
        alumniData.forEach(alumni => {
            if (alumni.name.toLowerCase().includes(query) ||
                alumni.company.toLowerCase().includes(query) ||
                alumni.title.toLowerCase().includes(query) ||
                alumni.skills.some(skill => skill.toLowerCase().includes(query))) {
                results.push({
                    type: 'alumni',
                    data: alumni,
                    page: 'student_directory.html'
                });
            }
        });
    }
    
    // Search events data if available
    if (typeof eventsData !== 'undefined') {
        Object.keys(eventsData).forEach(eventType => {
            eventsData[eventType].forEach(event => {
                if (event.title && event.title.toLowerCase().includes(query)) {
                    results.push({
                        type: 'event',
                        data: event,
                        page: 'student_events.html'
                    });
                }
            });
        });
    }
    
    return results;
}

function displaySearchResults(results, searchTerm) {
    showModal(
        `Search Results for "${searchTerm}"`,
        `
        <div class="search-results">
            ${results.map(result => `
                <div class="search-result-item" onclick="navigateToResult('${result.page}', '${result.data.id || result.data.name}')">
                    <div class="result-type">${result.type}</div>
                    <div class="result-title">${result.data.name || result.data.title}</div>
                    <div class="result-description">${result.data.company || result.data.description || ''}</div>
                </div>
            `).join('')}
        </div>
        `,
        [{ text: 'Close', action: 'closeCurrentModal', className: 'btn-primary' }]
    );
}

function navigateToResult(page, id) {
    closeModal(document.querySelector('.modal-overlay'));
    window.location.href = `${page}#${id}`;
}

function filterContent(query) {
    const cards = document.querySelectorAll('.card, .alumni-card, .event-item, .job-item, .action-card');
    
    cards.forEach(card => {
        const text = (card.textContent || '').toLowerCase();
        const isVisible = query === '' || text.includes(query);
        card.style.display = isVisible ? '' : 'none';
        
        if (isVisible && query !== '') {
            card.classList.add('fade-in');
        } else {
            card.classList.remove('fade-in');
        }
    });
}

function clearFilters() {
    const cards = document.querySelectorAll('.card, .alumni-card, .event-item, .job-item, .action-card');
    cards.forEach(card => {
        card.style.display = '';
        card.classList.remove('fade-in');
    });
}

// =================== NOTIFICATIONS ===================
function initializeNotifications() {
    const notificationIcon = document.querySelector('.notification-icon');
    
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function(e) {
            e.preventDefault();
            showNotificationMenu();
        });
    }

    // Initialize notification badge
    updateNotificationBadge();
    
    // Simulate new notifications
    simulateNotifications();
}

function showNotificationMenu() {
    const notifications = getNotifications();
    
    if (notifications.length === 0) {
        showNotification('No new notifications', 'info');
        return;
    }

    showModal(
        'Notifications',
        `
        <div class="notification-list">
            ${notifications.map(notif => `
                <div class="notification-item ${notif.read ? '' : 'unread'}" onclick="markAsRead(${notif.id})">
                    <div class="notification-header">
                        <strong>${notif.title}</strong>
                        <small>${notif.time}</small>
                    </div>
                    <p>${notif.message}</p>
                </div>
            `).join('')}
        </div>
        `,
        [
            { text: 'Mark All Read', action: 'markAllAsRead', className: 'btn-ghost' },
            { text: 'Clear All', action: 'clearAllNotifications', className: 'btn-ghost' },
            { text: 'Close', action: 'closeCurrentModal', className: 'btn-primary' }
        ]
    );
}

function getNotifications() {
    const defaultNotifications = [
        {
            id: 1,
            title: 'Welcome',
            message: 'Welcome to Alumni Connect!',
            time: new Date().toLocaleString(),
            read: false
        }
    ];
    
    try {
        const stored = localStorage.getItem('notifications');
        return stored ? JSON.parse(stored) : defaultNotifications;
    } catch (e) {
        return defaultNotifications;
    }
}

function addNotification(title, message) {
    const notifications = getNotifications();
    const newNotification = {
        id: Date.now(),
        title,
        message,
        time: new Date().toLocaleString(),
        read: false
    };
    
    notifications.unshift(newNotification);
    saveNotifications(notifications.slice(0, 10)); // Keep only 10
    
    updateNotificationBadge();
}

function saveNotifications(notifications) {
    try {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (e) {
        console.warn('Could not save notifications');
    }
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    const notifications = getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

function markAsRead(notificationId) {
    const notifications = getNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
        notification.read = true;
        saveNotifications(notifications);
        updateNotificationBadge();
    }
}

function markAllAsRead() {
    const notifications = getNotifications();
    notifications.forEach(n => n.read = true);
    saveNotifications(notifications);
    updateNotificationBadge();
    showNotification('All notifications marked as read', 'success');
}

function clearAllNotifications() {
    try {
        localStorage.removeItem('notifications');
    } catch (e) {
        console.warn('Could not clear notifications');
    }
    updateNotificationBadge();
    showNotification('All notifications cleared', 'success');
    closeModal(document.querySelector('.modal-overlay'));
}

function simulateNotifications() {
    setTimeout(() => {
        const messages = [
            { title: 'New Event', message: 'Alumni Tech Talk scheduled for next week' },
            { title: 'New Connection', message: 'John Doe wants to connect' },
            { title: 'Job Posted', message: 'New Software Engineer position available' },
            { title: 'Forum Activity', message: 'New reply in Career Advice forum' }
        ];
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        addNotification(randomMessage.title, randomMessage.message);
        
        // Schedule next notification
        if (Math.random() > 0.5) {
            setTimeout(() => simulateNotifications(), Math.random() * 60000 + 30000);
        }
    }, 30000);
}

// =================== MOBILE RESPONSIVENESS ===================
function initializeMobile() {
    const menuToggle = document.querySelector('.close-btn');
    const sidebar = document.querySelector('.sidebar');
    
    function handleMobileMenu() {
        if (window.innerWidth <= 768) {
            if (menuToggle && sidebar) {
                menuToggle.addEventListener('click', function() {
                    sidebar.classList.toggle('open');
                });
                
                document.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768 && 
                        sidebar && sidebar.classList.contains('open') &&
                        !sidebar.contains(e.target) && 
                        !menuToggle.contains(e.target)) {
                        sidebar.classList.remove('open');
                    }
                });
            }
        }
    }

    handleMobileMenu();

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && sidebar) {
            sidebar.classList.remove('open');
        }
        handleMobileMenu();
    });
}

// =================== USER INTERACTIONS ===================
function initializeUserInteractions() {
    // User avatar/info click
    const userInfo = document.querySelector('.user-info');
    
    if (userInfo) {
        userInfo.addEventListener('click', function() {
            showUserMenu();
        });
    }

    // Quick action cards
    const actionCards = document.querySelectorAll('.action-card, .quick-action, .quick-card');
    actionCards.forEach(card => {
        card.addEventListener('click', function() {
            const text = this.querySelector('.action-text, .quick-title')?.textContent || this.textContent;
            handleQuickAction(text.trim());
        });
    });

    // Stats cards hover effects
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Activity items click
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4')?.textContent || this.textContent;
            handleActivityClick(title.trim());
        });
    });

    // Alumni cards connect buttons
    const connectButtons = document.querySelectorAll('.connect-btn');
    connectButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const alumniCard = this.closest('.alumni-card, .card');
            const alumniName = alumniCard?.querySelector('h3')?.textContent || 'Alumni';
            handleConnectRequest(alumniName);
        });
    });
}

function showUserMenu() {
    showModal(
        'User Menu',
        `
        <div class="user-menu-items">
            <div class="menu-item-button" onclick="navigateTo('profile')">View Profile</div>
            <div class="menu-item-button" onclick="navigateTo('settings')">Settings</div>
            <div class="menu-item-button" onclick="showHelpModal()">Help & Support</div>
        </div>
        `,
        [{ text: 'Close', action: 'closeCurrentModal', className: 'btn-primary' }]
    );
}

function handleQuickAction(actionText) {
    console.log(`Quick action clicked: ${actionText}`);
    
    const actionMap = {
        'Find Alumni': () => navigateTo('student_directory.html'),
        'View Events': () => navigateTo('student_events.html'),
        'Connect': () => showConnectModal(),
        'Post a Job': () => showJobPostModal(),
        'Upload & Request Review': () => handleResumeUpload()
    };
    
    const action = actionMap[actionText];
    if (action) {
        action();
    } else {
        showNotification(`${actionText} - Feature coming soon!`, 'info');
    }
}

function handleActivityClick(activityTitle) {
    console.log(`Activity clicked: ${activityTitle}`);
    showNotification(`Viewing: ${activityTitle}`, 'info');
}

function handleConnectRequest(alumniName) {
    showModal(
        `Connect with ${alumniName}`,
        `
        <p>Send a connection request to ${alumniName}?</p>
        <div class="form-group">
            <label class="form-label">Message (optional):</label>
            <textarea id="connectMessage" class="form-textarea" placeholder="Hi ${alumniName}, I'd like to connect..."></textarea>
        </div>
        `,
        [
            { text: 'Send Request', action: 'sendConnectionRequest', className: 'btn-primary' },
            { text: 'Cancel', action: 'closeCurrentModal', className: 'btn-ghost' }
        ]
    );
    
    window.currentConnectionTarget = alumniName;
}

function sendConnectionRequest() {
    const alumniName = window.currentConnectionTarget || 'Alumni';
    
    addNotification('Connection Request Sent', `Request sent to ${alumniName}`);
    showNotification(`Connection request sent to ${alumniName}!`, 'success');
    
    delete window.currentConnectionTarget;
    closeCurrentModal();
}

// =================== NAVIGATION HELPERS ===================
function navigateTo(page) {
    if (page.includes('.html')) {
        window.location.href = page;
    } else {
        console.log(`Navigating to: ${page}`);
        showNotification(`Navigating to ${page}`, 'info');
    }
}

function goBack() {
    window.history.back();
}

// =================== MODAL SYSTEM ===================
function showModal(title, content, actions = []) {
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;
    
    modalOverlay.innerHTML = `
        <div class="modal" style="
            background: white;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        ">
            <div class="modal-header" style="
                padding: 24px 24px 0 24px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #e5e7eb;
                margin-bottom: 20px;
                padding-bottom: 16px;
            ">
                <h3 class="modal-title" style="
                    margin: 0;
                    font-size: 18px;
                    font-weight: 600;
                    color: #333;
                ">${title}</h3>
                <button class="modal-close" style="
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    padding: 0;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                ">&times;</button>
            </div>
            <div class="modal-body" style="padding: 0 24px 20px 24px;">
                ${content}
            </div>
            ${actions.length > 0 ? `
                <div class="modal-footer" style="
                    padding: 16px 24px 24px 24px;
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                    border-top: 1px solid #e5e7eb;
                    margin-top: 20px;
                    padding-top: 16px;
                ">
                    ${actions.map(action => `
                        <button class="btn ${action.className || 'btn-primary'}" data-action="${action.action}" style="
                            padding: 8px 16px;
                            border: none;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                            font-weight: 500;
                            ${action.className === 'btn-ghost' 
                                ? 'background: transparent; color: #666; border: 1px solid #e5e7eb;' 
                                : 'background: #007AFF; color: white;'
                            }
                        ">
                            ${action.text}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    document.body.appendChild(modalOverlay);
    
    // Add additional styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay .form-group { margin-bottom: 16px; }
        .modal-overlay .form-label { display: block; margin-bottom: 4px; font-weight: 500; color: #374151; }
        .modal-overlay .form-textarea, .modal-overlay .form-input, .modal-overlay .form-select { 
            width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 14px; 
        }
        .modal-overlay .form-textarea { min-height: 80px; resize: vertical; }
        .modal-overlay .btn:hover { opacity: 0.9; }
        .modal-overlay .menu-item-button { 
            padding: 12px; margin: 8px 0; cursor: pointer; border-radius: 6px; 
            transition: background 0.2s; 
        }
        .modal-overlay .menu-item-button:hover { background: #f3f4f6; }
        .modal-overlay .search-result-item { 
            padding: 12px; margin: 8px 0; cursor: pointer; border: 1px solid #e5e7eb; 
            border-radius: 6px; transition: all 0.2s; 
        }
        .modal-overlay .search-result-item:hover { background: #f3f4f6; border-color: #007AFF; }
        .modal-overlay .result-type { 
            font-size: 12px; color: #666; text-transform: uppercase; font-weight: 500; 
        }
        .modal-overlay .result-title { font-weight: 600; margin: 4px 0; }
        .modal-overlay .result-description { font-size: 14px; color: #666; }
        .modal-overlay .notification-item { 
            padding: 12px; margin: 8px 0; border: 1px solid #e5e7eb; border-radius: 6px; 
            cursor: pointer; transition: all 0.2s; 
        }
        .modal-overlay .notification-item.unread { border-left: 3px solid #007AFF; background: #f0f9ff; }
        .modal-overlay .notification-item:hover { background: #f3f4f6; }
        .modal-overlay .notification-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
    `;
    document.head.appendChild(style);
    
    // Event listeners
    const closeBtn = modalOverlay.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modalOverlay));
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal(modalOverlay);
        }
    });
    
    const actionButtons = modalOverlay.querySelectorAll('[data-action]');
    actionButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const actionName = e.target.dataset.action;
            if (typeof window[actionName] === 'function') {
                window[actionName]();
            } else {
                closeModal(modalOverlay);
            }
        });
    });
    
    return modalOverlay;
}

function closeModal(modalOverlay) {
    if (modalOverlay && modalOverlay.parentNode) {
        modalOverlay.parentNode.removeChild(modalOverlay);
    }
}

function closeCurrentModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        closeModal(modal);
    }
}

function showConnectModal() {
    showModal(
        'Connect with Alumni',
        `
        <p>Choose how you'd like to connect:</p>
        <div class="form-group">
            <label class="form-label">Connection Type:</label>
            <select class="form-select" id="connectionType">
                <option>Professional Networking</option>
                <option>Mentorship Request</option>
                <option>Career Guidance</option>
                <option>Industry Insights</option>
            </select>
        </div>
        <div class="form-group">
            <label class="form-label">Message:</label>
            <textarea class="form-textarea" id="connectionMessage" placeholder="Write a brief introduction..."></textarea>
        </div>
        `,
        [
            { text: 'Send Request', action: 'handleConnectSubmit', className: 'btn-primary' },
            { text: 'Cancel', action: 'closeCurrentModal', className: 'btn-ghost' }
        ]
    );
}

function showJobPostModal() {
    showModal(
        'Post a Job',
        `
        <div class="form-group">
            <label class="form-label">Job Title:</label>
            <input type="text" class="form-input" id="jobTitle" placeholder="e.g. Software Engineer">
        </div>
        <div class="form-group">
            <label class="form-label">Company:</label>
            <input type="text" class="form-input" id="jobCompany" placeholder="Company name">
        </div>
        <div class="form-group">
            <label class="form-label">Location:</label>
            <input type="text" class="form-input" id="jobLocation" placeholder="Remote / City, Country">
        </div>
        <div class="form-group">
            <label class="form-label">Job Description:</label>
            <textarea class="form-textarea" id="jobDescription" placeholder="Describe the role and requirements..."></textarea>
        </div>
        `,
        [
            { text: 'Post Job', action: 'handleJobSubmit', className: 'btn-primary' },
            { text: 'Cancel', action: 'closeCurrentModal', className: 'btn-ghost' }
        ]
    );
}

function showHelpModal() {
    showModal(
        'Help & Support',
        `
        <h4>Frequently Asked Questions</h4>
        <details style="margin: 12px 0;">
            <summary style="cursor: pointer; font-weight: 600;">How do I connect with alumni?</summary>
            <p style="margin-top: 8px; color: #666;">Go to the Alumni Directory, find the person you want to connect with, and click the "Connect" button.</p>
        </details>
        <details style="margin: 12px 0;">
            <summary style="cursor: pointer; font-weight: 600;">How do I join events?</summary>
            <p style="margin-top: 8px; color: #666;">Visit the Events page and click "RSVP" on events you're interested in attending.</p>
        </details>
        <details style="margin: 12px 0;">
            <summary style="cursor: pointer; font-weight: 600;">How do I find mentors?</summary>
            <p style="margin-top: 8px; color: #666;">Use the Mentorship section to browse available mentors and send connection requests.</p>
        </details>
        <p style="margin-top: 20px;"><strong>Need more help?</strong> Contact us at support@alumniconnect.edu</p>
        `,
        [{ text: 'Close', action: 'closeCurrentModal', className: 'btn-primary' }]
    );
}

// =================== FORM HANDLERS ===================
function handleConnectSubmit() {
    const connectionType = document.getElementById('connectionType')?.value || 'Professional Networking';
    
    showNotification('Connection request sent successfully!', 'success');
    addNotification('Connection Request', `Your ${connectionType.toLowerCase()} request has been sent`);
    closeCurrentModal();
}

function handleJobSubmit() {
    const jobTitle = document.getElementById('jobTitle')?.value || '';
    const company = document.getElementById('jobCompany')?.value || '';
    
    if (!jobTitle || !company) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    showNotification('Job posted successfully!', 'success');
    addNotification('Job Posted', `${jobTitle} position at ${company} has been posted`);
    closeCurrentModal();
}

function handleResumeUpload() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.doc,.docx';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            showNotification(`Resume "${file.name}" uploaded for review`, 'success');
            addNotification('Resume Uploaded', 'Your resume has been submitted for review');
        }
    };
    
    input.click();
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        try {
            localStorage.clear();
        } catch (e) {
            console.warn('Could not clear localStorage');
        }
        showNotification('Logged out successfully', 'success');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
    }
}

// =================== ANIMATIONS ===================
function initializeAnimations() {
    // Add CSS for animations if not already present
    if (!document.querySelector('#common-animations')) {
        const style = document.createElement('style');
        style.id = 'common-animations';
        style.textContent = `
            .fade-in { animation: fadeIn 0.3s ease-in; }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .pulse { animation: pulse 0.5s ease-in-out; }
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    // Intersection observer for cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    // Observe all cards
    document.querySelectorAll('.stat-card, .content-section, .action-card').forEach(card => {
        observer.observe(card);
    });
}

// =================== NOTIFICATION TOAST SYSTEM ===================
function showNotification(message, type = 'info') {
    // Create notification container if it doesn't exist
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(container);
    }

    // Create notification toast
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    
    const colors = {
        success: { bg: '#10b981', border: '#059669' },
        error: { bg: '#ef4444', border: '#dc2626' },
        warning: { bg: '#f59e0b', border: '#d97706' },
        info: { bg: '#3b82f6', border: '#2563eb' }
    };
    
    const color = colors[type] || colors.info;
    
    toast.style.cssText = `
        background: ${color.bg};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        border-left: 4px solid ${color.border};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        max-width: 300px;
        word-wrap: break-word;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        cursor: pointer;
        font-size: 14px;
        position: relative;
    `;
    
    toast.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span>${getNotificationIcon(type)}</span>
            <span>${message}</span>
            <button style="
                background: none; 
                border: none; 
                color: white; 
                cursor: pointer; 
                font-size: 16px;
                margin-left: auto;
                opacity: 0.8;
            " onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 5000);
    
    // Click to remove
    toast.addEventListener('click', () => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
}