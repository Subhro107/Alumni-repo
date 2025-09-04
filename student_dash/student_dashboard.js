// =================== DASHBOARD SPECIFIC FUNCTIONALITY ===================
// This file extends the common utilities with dashboard-specific features

// Dashboard-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboardFeatures();
    updateDashboardStats();
    initializeDashboardAnimations();
});

function initializeDashboardFeatures() {
    // Dashboard-specific quick actions
    document.querySelectorAll('.action-card').forEach(card => {
        card.addEventListener('click', function() {
            const text = this.querySelector('.action-text').textContent;
            handleDashboardAction(text);
        });
    });

    // Enhanced activity items for dashboard
    document.querySelectorAll('.activity-item').forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            showActivityDetails(title);
        });
    });

    // Simulated data updates (for demo purposes)
    setInterval(updateDashboardStats, 30000); // Update every 30 seconds
    
    // Real-time notifications badge animation
    setTimeout(() => {
        simulateDashboardActivity();
    }, 10000);
}

function handleDashboardAction(actionText) {
    console.log(`Dashboard action: ${actionText}`);
    
    const dashboardActions = {
        'Find Alumni': () => {
            showNotification('Redirecting to Alumni Directory...', 'info');
            setTimeout(() => navigateTo('student_directory.html'), 1000);
        },
        'View Events': () => {
            showNotification('Loading Events...', 'info');
            setTimeout(() => navigateTo('student_events.html'), 1000);
        },
        'Connect': () => {
            showConnectModal();
        }
    };
    
    const action = dashboardActions[actionText];
    if (action) {
        action();
    } else {
        showNotification(`${actionText} - Feature coming soon!`, 'info');
    }
}

function showActivityDetails(activityTitle) {
    const activityDetails = {
        'New alumni registration': {
            title: 'New Alumni Registration',
            content: 'Sarah Johnson (Class of 2020) has joined the platform. She is currently working as a Software Engineer at Google.',
            action: () => navigateTo('student_directory.html#sarah-johnson')
        },
        'Upcoming event reminder': {
            title: 'Annual Alumni Gala',
            content: 'The Annual Alumni Gala is scheduled for two weeks from now. This is a great opportunity to network with successful alumni.',
            action: () => navigateTo('student_events.html#alumni-gala')
        },
        'New mentorship match': {
            title: 'Mentorship Opportunity',
            content: 'You have been matched with a mentor based on your career interests. Check your mentorship dashboard for details.',
            action: () => navigateTo('students_mentor.html')
        }
    };
    
    const details = activityDetails[activityTitle];
    if (details) {
        showModal(
            details.title,
            `<p>${details.content}</p>`,
            [
                { text: 'View Details', action: () => { closeCurrentModal(); details.action(); }, className: 'btn-primary' },
                { text: 'Close', action: 'closeCurrentModal', className: 'btn-ghost' }
            ]
        );
    } else {
        showNotification(`Viewing: ${activityTitle}`, 'info');
    }
}

function updateDashboardStats() {
    // Simulate real-time stats updates
    const stats = {
        totalAlumni: Math.floor(Math.random() * 10) + 1,
        upcomingEvents: Math.floor(Math.random() * 3),
        newMessages: Math.floor(Math.random() * 5),
        jobOpportunities: Math.floor(Math.random() * 8)
    };
    
    // Update stat numbers with animation
    updateStatCard('.stat-card:nth-child(1) .stat-number', stats.totalAlumni);
    updateStatCard('.stat-card:nth-child(2) .stat-number', stats.upcomingEvents);
    updateStatCard('.stat-card:nth-child(3) .stat-number', stats.newMessages);
    updateStatCard('.stat-card:nth-child(4) .stat-number', stats.jobOpportunities);
}

function updateStatCard(selector, newValue) {
    const element = document.querySelector(selector);
    if (element && element.textContent !== newValue.toString()) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#007AFF';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '#333';
        }, 200);
    }
}

function simulateDashboardActivity() {
    // Add new activity to the activity list
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        const activities = [
            {
                title: 'New job posting',
                description: 'Software Developer position at Tech Corp',
                dot: 'blue'
            },
            {
                title: 'Event registration opened',
                description: 'Career Fair 2024 • Registration now open',
                dot: 'green'
            },
            {
                title: 'New forum post',
                description: 'Discussion started in Career Advice',
                dot: 'orange'
            }
        ];
        
        const randomActivity = activities[Math.floor(Math.random() * activities.length)];
        
        const newActivityItem = document.createElement('div');
        newActivityItem.className = 'activity-item';
        newActivityItem.innerHTML = `
            <div class="activity-dot ${randomActivity.dot}"></div>
            <div class="activity-content">
                <h4>${randomActivity.title}</h4>
                <p>${randomActivity.description}</p>
            </div>
        `;
        
        // Add click handler
        newActivityItem.addEventListener('click', function() {
            showActivityDetails(randomActivity.title);
        });
        
        // Insert at the beginning
        activityList.insertBefore(newActivityItem, activityList.firstChild);
        
        // Remove last item if more than 3
        const items = activityList.querySelectorAll('.activity-item');
        if (items.length > 3) {
            activityList.removeChild(items[items.length - 1]);
        }
        
        // Animate new item
        newActivityItem.style.opacity = '0';
        newActivityItem.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            newActivityItem.style.transition = 'all 0.3s ease';
            newActivityItem.style.opacity = '1';
            newActivityItem.style.transform = 'translateX(0)';
        }, 100);
        
        // Add notification
        addNotification('New Activity', randomActivity.description);
    }
    
    // Schedule next activity
    if (Math.random() > 0.3) {
        setTimeout(simulateDashboardActivity, Math.random() * 60000 + 30000);
    }
}

function initializeDashboardAnimations() {
    // Stagger animation for stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Animate content sections
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            section.style.transition = 'all 0.5s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 500 + (index * 200));
    });
}

// Dashboard-specific welcome message
function showWelcomeMessage() {
    const hour = new Date().getHours();
    let greeting = 'Good evening';
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    }
    
    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.textContent = `${greeting}, student!`;
    }
    
    // Show welcome notification on first visit
    if (!localStorage.getItem('hasVisited')) {
        setTimeout(() => {
            showNotification('Welcome to Alumni Connect! Explore the features to get started.', 'success');
            localStorage.setItem('hasVisited', 'true');
        }, 2000);
    }
}

// Initialize welcome message
document.addEventListener('DOMContentLoaded', showWelcomeMessage);