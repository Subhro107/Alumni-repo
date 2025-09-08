// =================== COMMON UTILITIES FOR ALL PAGES ===================

// Initialize common functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeNotifications();
    initializeMobile();
    initializeUserInteractions();
    initializeAnimations();
    initializeAlumniSpecificFeatures();
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
    query = query.toLowerCase();
    
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
                    page: 'alumni_directory.html'
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
                        page: 'alumni_events.html'
                    });
                }
            });
        });
    }

    // Search mentorship opportunities if available
    if (typeof mentorshipData !== 'undefined') {
        mentorshipData.forEach(opportunity => {
            if (opportunity.title.toLowerCase().includes(query) ||
                opportunity.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'mentorship',
                    data: opportunity,
                    page: 'alumni_mentorship.html'
                });
            }
        });
    }

    // Search donation opportunities if available
    if (typeof donationData !== 'undefined') {
        donationData.forEach(opportunity => {
            if (opportunity.title.toLowerCase().includes(query) ||
                opportunity.description.toLowerCase().includes(query)) {
                results.push({
                    type: 'donation',
                    data: opportunity,
                    page: 'alumni_give_back.html'
                });
            }
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
    const cards = document.querySelectorAll('.card, .alumni-card, .event-item, .job-item, .action-card, .mentorship-card, .donation-card');
    
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
    const cards = document.querySelectorAll('.card, .alumni-card, .event-item, .job-item, .action-card, .mentorship-card, .donation-card');
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
    
    // Simulate new notifications for alumni
    simulateAlumniNotifications();
}

function showNotificationMenu() {
    const notifications = getAlumniNotifications();
    
    let notificationHTML = '';
    if (notifications.length > 0) {
        notificationHTML = notifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}">
                <div class="notification-icon ${notification.type}">
                    <i class="fas ${getNotificationIcon(notification.type)}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${notification.title}</div>
                    <div class="notification-text">${notification.text}</div>
                    <div class="notification-time">${notification.time}</div>
                </div>
                <button class="notification-action" onclick="markAsRead('${notification.id}')">
                    <i class="fas fa-check"></i>
                </button>
            </div>
        `).join('');
    } else {
        notificationHTML = `<div class="empty-state">No new notifications</div>`;
    }

    showModal(
        'Notifications',
        `<div class="notifications-container">${notificationHTML}</div>`,
        [
            { text: 'Mark All Read', action: 'markAllNotificationsRead', className: 'btn-secondary' },
            { text: 'Close', action: 'closeCurrentModal', className: 'btn-primary' }
        ]
    );
}

function getNotificationIcon(type) {
    switch (type) {
        case 'mentorship': return 'fa-user-graduate';
        case 'event': return 'fa-calendar';
        case 'donation': return 'fa-hand-holding-heart';
        case 'job': return 'fa-briefcase';
        case 'message': return 'fa-envelope';
        default: return 'fa-bell';
    }
}

function getAlumniNotifications() {
    // This would typically come from an API
    return [
        {
            id: 'notif1',
            type: 'mentorship',
            title: 'New Mentorship Request',
            text: 'John Smith (Class of 2023) has requested mentorship',
            time: '2 hours ago',
            read: false
        },
        {
            id: 'notif2',
            type: 'event',
            title: 'Event Reminder',
            text: 'Annual Alumni Gala is in 2 weeks',
            time: '1 day ago',
            read: false
        },
        {
            id: 'notif3',
            type: 'donation',
            title: 'Donation Impact',
            text: 'Your donation helped fund 2 student scholarships',
            time: '3 days ago',
            read: false
        }
    ];
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    if (!badge) return;
    
    const notifications = getAlumniNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

function markAsRead(notificationId) {
    // This would typically update via an API
    console.log(`Marking notification ${notificationId} as read`);
    showNotification('Notification marked as read', 'success');
    
    // Update UI
    const notificationItem = document.querySelector(`.notification-item[data-id="${notificationId}"]`);
    if (notificationItem) {
        notificationItem.classList.remove('unread');
    }
    
    updateNotificationBadge();
}

function markAllNotificationsRead() {
    // This would typically update via an API
    console.log('Marking all notifications as read');
    showNotification('All notifications marked as read', 'success');
    
    // Update UI
    document.querySelectorAll('.notification-item').forEach(item => {
        item.classList.remove('unread');
    });
    
    updateNotificationBadge();
    closeModal(document.querySelector('.modal-overlay'));
}

function simulateAlumniNotifications() {
    // Simulate receiving new notifications periodically
    setTimeout(() => {
        const newNotification = {
            id: 'notif' + Date.now(),
            type: 'job',
            title: 'Job Posting Engagement',
            text: 'Your job posting has received 5 new applications',
            time: 'Just now',
            read: false
        };
        
        // Add to notifications (in a real app, this would be handled by a state management system)
        console.log('New notification received:', newNotification);
        
        // Show toast
        showNotification(newNotification.title, 'info');
        
        // Update badge
        updateNotificationBadge();
    }, 60000); // Simulate after 1 minute
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `toast-notification ${type}`;
    notification.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        </div>
        <div class="toast-message">${message}</div>
        <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after delay
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// =================== MOBILE RESPONSIVENESS ===================
function initializeMobile() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (sidebar && sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !e.target.classList.contains('menu-toggle')) {
            sidebar.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        }
    });
}

// =================== USER INTERACTIONS ===================
function initializeUserInteractions() {
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', showTooltip);
        tooltip.addEventListener('mouseleave', hideTooltip);
    });
    
    // Initialize dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', toggleDropdown);
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        const dropdowns = document.querySelectorAll('.dropdown.active');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
    
    // Initialize tabs if present
    initializeTabs();
}

function showTooltip(e) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = this.getAttribute('data-tooltip');
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.top = `${rect.top - tooltipRect.height - 10}px`;
    tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltipRect.width / 2)}px`;
    
    this._tooltip = tooltip;
}

function hideTooltip() {
    if (this._tooltip) {
        this._tooltip.remove();
        this._tooltip = null;
    }
}

function toggleDropdown(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const dropdown = this.closest('.dropdown');
    dropdown.classList.toggle('active');
}

function initializeTabs() {
    const tabContainers = document.querySelectorAll('.tabs-container');
    
    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab');
        const tabContents = container.querySelectorAll('.tab-content');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Deactivate all tabs and contents
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Activate selected tab and content
                this.classList.add('active');
                container.querySelector(`.tab-content[data-tab="${tabId}"]`).classList.add('active');
            });
        });
    });
}

// =================== ANIMATIONS ===================
function initializeAnimations() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card, .stat-card, .alumni-card, .event-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.05}s`;
        card.classList.add('fade-in');
    });
    
    // Initialize scroll animations
    initializeScrollAnimations();
}

function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// =================== MODAL FUNCTIONALITY ===================
function showModal(title, content, buttons = []) {
    // Remove any existing modals
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) existingModal.remove();
    
    // Create modal structure
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal(this.closest('.modal-overlay'))">&times;</button>
            </div>
            <div class="modal-content">${content}</div>
            ${buttons.length > 0 ? `
                <div class="modal-footer">
                    ${buttons.map(btn => `
                        <button class="btn ${btn.className || ''}" 
                                onclick="${btn.action}('${btn.params || ''}')">
                            ${btn.text}
                        </button>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
    
    // Add to document
    document.body.appendChild(modal);
    document.body.classList.add('modal-open');
    
    // Add animation
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal(modal);
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal(modal);
    });
}

function closeModal(modal) {
    if (!modal) return;
    
    modal.classList.remove('active');
    setTimeout(() => {
        modal.remove();
        document.body.classList.remove('modal-open');
    }, 300);
}

function closeCurrentModal() {
    closeModal(document.querySelector('.modal-overlay'));
}

// =================== ALUMNI-SPECIFIC FEATURES ===================
function initializeAlumniSpecificFeatures() {
    // Initialize donation tracking if on the give back page
    if (window.location.pathname.includes('alumni_give_back.html')) {
        initializeDonationTracking();
    }
    
    // Initialize mentorship features if on the mentorship page
    if (window.location.pathname.includes('alumni_mentorship.html')) {
        initializeMentorshipFeatures();
    }
    
    // Initialize job posting features if on the career page
    if (window.location.pathname.includes('alumni_career.html')) {
        initializeJobPostingFeatures();
    }
    
    // Initialize event creation if on the events page
    if (window.location.pathname.includes('alumni_events.html')) {
        initializeEventCreation();
    }
}

function initializeDonationTracking() {
    // This would be implemented with actual donation tracking functionality
    console.log('Initializing donation tracking features');
    
    // Example: Display donation history chart
    if (document.getElementById('donationChart')) {
        // In a real implementation, this would use a charting library like Chart.js
        console.log('Rendering donation history chart');
    }
}

function initializeMentorshipFeatures() {
    // This would be implemented with actual mentorship functionality
    console.log('Initializing mentorship features');
    
    // Example: Handle mentorship requests
    const mentorshipButtons = document.querySelectorAll('.mentorship-action-button');
    mentorshipButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            const studentId = this.getAttribute('data-student-id');
            
            if (action === 'accept') {
                acceptMentorshipRequest(studentId);
            } else if (action === 'decline') {
                declineMentorshipRequest(studentId);
            }
        });
    });
}

function acceptMentorshipRequest(studentId) {
    // This would typically call an API
    console.log(`Accepting mentorship request from student ${studentId}`);
    showNotification('Mentorship request accepted', 'success');
}

function declineMentorshipRequest(studentId) {
    // This would typically call an API
    console.log(`Declining mentorship request from student ${studentId}`);
    showNotification('Mentorship request declined', 'info');
}

function initializeJobPostingFeatures() {
    // This would be implemented with actual job posting functionality
    console.log('Initializing job posting features');
    
    // Example: Job posting form submission
    const jobPostingForm = document.getElementById('jobPostingForm');
    if (jobPostingForm) {
        jobPostingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitJobPosting(new FormData(this));
        });
    }
}

function submitJobPosting(formData) {
    // This would typically call an API
    console.log('Submitting job posting:', Object.fromEntries(formData));
    showNotification('Job posting submitted successfully', 'success');
}

function initializeEventCreation() {
    // This would be implemented with actual event creation functionality
    console.log('Initializing event creation features');
    
    // Example: Event creation form submission
    const eventForm = document.getElementById('eventCreationForm');
    if (eventForm) {
        eventForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitEventCreation(new FormData(this));
        });
    }
}

function submitEventCreation(formData) {
    // This would typically call an API
    console.log('Submitting event creation:', Object.fromEntries(formData));
    showNotification('Event created successfully', 'success');
}

function simulateAlumniNotifications() {
    // Simulate receiving new notifications periodically for alumni
    const notificationTypes = ['mentorship', 'event', 'donation', 'job'];
    const notificationTitles = {
        'mentorship': 'New Mentorship Request',
        'event': 'Event Update',
        'donation': 'Donation Impact',
        'job': 'Job Posting Update'
    };
    const notificationTexts = {
        'mentorship': 'A student has requested your mentorship',
        'event': 'New attendees have registered for your event',
        'donation': 'Your donation has made an impact',
        'job': 'New applications for your job posting'
    };
    
    // Simulate a notification after a random delay
    setTimeout(() => {
        const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
        const newNotification = {
            id: 'notif' + Date.now(),
            type: type,
            title: notificationTitles[type],
            text: notificationTexts[type],
            time: 'Just now',
            read: false
        };
        
        // In a real app, this would update state
        console.log('New notification received:', newNotification);
        
        // Show toast
        showNotification(newNotification.title, 'info');
        
        // Update badge
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            const currentCount = parseInt(badge.textContent) || 0;
            badge.textContent = currentCount + 1;
            badge.style.display = 'flex';
        }
        
        // Recursively call to simulate more notifications
        simulateAlumniNotifications();
    }, Math.random() * 60000 + 30000); // Random delay between 30s and 90s
}