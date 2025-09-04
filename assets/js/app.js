// Smooth scrolling for navigation links (only for anchor links within the same page)
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Login Management System
class LoginManager {
    constructor() {
        this.currentUser = null;
        this.userTypes = {
            ADMIN: 'admin',
            ALUMNI: 'alumni',
            STUDENT: 'student'
        };
        this.init();
    }

    init() {
        // Check if user is already logged in
        this.checkSession();
        this.setupLoginForms();
    }

    // Demo credentials for testing
    validateCredentials(userType, identifier, password) {
        const demoCredentials = {
            admin: { id: 'admin123', password: 'admin123' },
            alumni: { email: 'alumni@example.com', password: 'alumni123' },
            student: { email: 'student@college.edu', password: 'student123' }
        };

        switch(userType) {
            case this.userTypes.ADMIN:
                return identifier === demoCredentials.admin.id &&
                       password === demoCredentials.admin.password;
            case this.userTypes.ALUMNI:
                return identifier === demoCredentials.alumni.email &&
                       password === demoCredentials.alumni.password;
            case this.userTypes.STUDENT:
                return identifier === demoCredentials.student.email &&
                       password === demoCredentials.student.password;
            default:
                return false;
        }
    }

    login(userType, identifier, password) {
        if (this.validateCredentials(userType, identifier, password)) {
            // Set current user before redirecting
            this.currentUser = {
                type: userType,
                identifier: identifier,
                loginTime: new Date().toISOString()
            };
            // Store in session
            localStorage.setItem('userSession', JSON.stringify(this.currentUser));
            // Redirect to appropriate dashboard
            this.redirectToDashboard(userType);
            return true;
        } else {
            alert('Invalid credentials. Please try again.');
            return false;
        }
    }

    redirectToDashboard(userType) {
        const dashboards = {
            [this.userTypes.ADMIN]: 'admin_dash/admin-dashboard.html',
            [this.userTypes.ALUMNI]: 'alumni_dash/dashboard.html',
            [this.userTypes.STUDENT]: 'student_dash/student_dashboard.html'
        };

        const targetDashboard = dashboards[userType];
        if (targetDashboard) {
            window.location.href = targetDashboard;
        }
    }

    logout() {
        localStorage.removeItem('userSession');
        this.currentUser = null;
        // Only redirect if we're not already on the index page
        if (!window.location.pathname.endsWith('index.html')) {
            // Determine the correct path to index.html based on current location
            const currentPath = window.location.pathname;
            let indexPath = 'index.html';

            // If we're in a subdirectory, go up one level
            if (currentPath.includes('/admin_dash/') || currentPath.includes('/alumni_dash/') || currentPath.includes('/student_dash/')) {
                indexPath = '../index.html';
            }

            window.location.href = indexPath;
        }
    }

    checkSession() {
        const sessionData = localStorage.getItem('userSession');
        if (sessionData) {
            try {
                this.currentUser = JSON.parse(sessionData);
                const loginTime = new Date(this.currentUser.loginTime);
                const now = new Date();
                const hoursPassed = (now - loginTime) / (1000 * 60 * 60);

                // Auto-logout after 24 hours
                if (hoursPassed > 24) {
                    this.logout();
                    return false;
                }
                return true;
            } catch (error) {
                localStorage.removeItem('userSession');
                this.currentUser = null;
                return false;
            }
        }
        return false;
    }

    setupLoginForms() {
        // Setup login form handlers if on login page
        const adminForm = document.getElementById('adminLogin');
        const alumniForm = document.getElementById('alumniLogin');
        const studentForm = document.getElementById('studentLogin');

        if (adminForm) {
            adminForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const identifier = adminForm.querySelector('input[type="text"]').value;
                const password = adminForm.querySelector('input[type="password"]').value;
                this.login(this.userTypes.ADMIN, identifier, password);
            });
        }

        if (alumniForm) {
            alumniForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const identifier = alumniForm.querySelector('input[type="email"]').value;
                const password = alumniForm.querySelector('input[type="password"]').value;
                this.login(this.userTypes.ALUMNI, identifier, password);
            });
        }

        if (studentForm) {
            studentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const identifier = studentForm.querySelector('input[type="email"]').value;
                const password = studentForm.querySelector('input[type="password"]').value;
                this.login(this.userTypes.STUDENT, identifier, password);
            });
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getUserType() {
        return this.currentUser ? this.currentUser.type : null;
    }
}

// Initialize Login Manager
const loginManager = new LoginManager();

// Global functions for backward compatibility and external access
window.loginManager = loginManager;

// Setup logout functionality for all dashboard pages
document.addEventListener('DOMContentLoaded', function() {
    // Add logout functionality to logout buttons
    const logoutButtons = document.querySelectorAll('.logout-btn, [onclick*="login.html"]');
    logoutButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            loginManager.logout();
        });
    });
});
