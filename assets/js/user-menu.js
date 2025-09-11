// User Menu Script for Alumni Dashboard Pages
// This script provides consistent user menu functionality across all alumni dashboard pages

function showUserMenu() {
  document.getElementById('userMenuModal').style.display = 'block';
}

function showHelp() {
  document.getElementById('userMenuModal').style.display = 'none';
  document.getElementById('helpModal').style.display = 'block';
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    // Clear any stored session data
    localStorage.removeItem('currentUser');
    // Redirect to login page
    window.location.href = '../login.html';
  }
}

// Close modals when clicking outside
window.onclick = function(event) {
  const userMenuModal = document.getElementById('userMenuModal');
  const helpModal = document.getElementById('helpModal');
  
  if (event.target === userMenuModal) {
    userMenuModal.style.display = 'none';
  }
  if (event.target === helpModal) {
    helpModal.style.display = 'none';
  }
}

// Close help modal when clicking X
document.addEventListener('DOMContentLoaded', function() {
  const closeBtn = document.querySelector('#helpModal .close');
  if (closeBtn) {
    closeBtn.onclick = function() {
      document.getElementById('helpModal').style.display = 'none';
    }
  }
});

// Additional utility functions for common dashboard operations
function navigateToProfile() {
  window.location.href = 'profile-settings.html';
}

function showNotifications() {
  // Implementation for showing notifications
  console.log('Showing notifications...');
}

// Session management utilities
function checkSession() {
  const currentUser = localStorage.getItem('currentUser');
  if (!currentUser) {
    window.location.href = '../login.html';
  }
  return currentUser;
}

function updateUserInfo(userName, userEmail) {
  // Update user info in the header
  const userNameElements = document.querySelectorAll('.user-info span:last-child');
  userNameElements.forEach(element => {
    element.textContent = userName;
  });
  
  // Update user info in modals
  const userEmailElements = document.querySelectorAll('.modal-content div[style*="font-size: 0.85rem"]');
  userEmailElements.forEach(element => {
    element.textContent = userEmail;
  });
}

// Initialize user menu on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  checkSession();
  
  // You can add additional initialization code here
  console.log('User menu initialized');
});
