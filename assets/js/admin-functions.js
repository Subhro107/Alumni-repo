// Admin Dashboard Shared Functions
// This file contains all common JavaScript functionality for admin dashboard pages

// Logout functionality
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear any stored session data
        localStorage.removeItem('currentUser');
        // Redirect to login page
        window.location.href = '../login.html';
    }
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            // Add search functionality here if needed
            console.log('Search query:', query);
        });

        // Add keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }

    // Analytics functionality (only runs if analytics cards exist)
    const analyticsCards = document.querySelectorAll('.analytics-card');
    if (analyticsCards.length > 0) {
        console.log('Analytics page loaded');
        analyticsCards.forEach(card => {
            card.addEventListener('click', function() {
                console.log('Analytics card clicked:', this.querySelector('h3').textContent);
            });
        });
    }
});