// =================== DIRECTORY SPECIFIC FUNCTIONALITY ===================
// This file extends the common utilities with directory-specific features

// Sample alumni data
const alumniData = [
    {
        id: 1,
        name: "Alumni-1",
        graduationYear: "2020",
        company: "Google",
        title: "Software Engineer",
        location: "San Francisco",
        skills: ["JavaScript", "React", "Node.js"],
        featured: true
    },
    {
        id: 2,
        name: "Alumni-2",
        graduationYear: "2021",
        company: "Microsoft",
        title: "Product Manager",
        location: "Seattle",
        skills: ["Product Management", "Data Analytics"],
        featured: false
    },
    {
        id: 3,
        name: "Alumni-3",
        graduationYear: "2019",
        company: "Amazon",
        title: "UX Designer",
        location: "New York",
        skills: ["UI/UX", "Figma", "User Research"],
        featured: true
    },
    {
        id: 4,
        name: "Alumni-4",
        graduationYear: "2022",
        company: "Apple",
        title: "iOS Developer",
        location: "Cupertino",
        skills: ["Swift", "iOS Development"],
        featured: false
    }
];

// Directory-specific initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeDirectoryFeatures();
    displayAlumni();
    displayFeaturedAlumni();
    updateDirectoryStats();
    initializeFilters();
});

function initializeDirectoryFeatures() {
    // Enhanced connect buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('connect-btn')) {
            e.stopPropagation();
            const alumniCard = e.target.closest('.alumni-card, .card');
            const alumniId = parseInt(alumniCard.dataset.alumniId);
            const alumni = alumniData.find(a => a.id === alumniId);
            if (alumni) {
                showAlumniConnectModal(alumni);
            }
        }
        
        if (e.target.classList.contains('view-profile-btn')) {
            e.stopPropagation();
            const alumniCard = e.target.closest('.alumni-card, .card');
            const alumniId = parseInt(alumniCard.dataset.alumniId);
            const alumni = alumniData.find(a => a.id === alumniId);
            if (alumni) {
                showAlumniProfile(alumni);
            }
        }
    });
}

function displayAlumni() {
    const alumniList = document.getElementById('alumniList');
    if (!alumniList) return;
    
    const nonFeaturedAlumni = alumniData.filter(alumni => !alumni.featured);
    
    alumniList.innerHTML = nonFeaturedAlumni.map(alumni => `
        <div class="alumni-card card" data-alumni-id="${alumni.id}">
            <div class="alumni-info">
                <h3>${alumni.name}</h3>
                <p class="alumni-title">${alumni.title}</p>
                <p class="alumni-company">${alumni.company}</p>
                <p class="alumni-year">Class of ${alumni.graduationYear}</p>
                <div class="alumni-skills">
                    ${alumni.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <button class="connect-btn">Connect</button>
            </div>
        </div>
    `).join('');
    
    // Add animation
    setTimeout(() => {
        document.querySelectorAll('.alumni-card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
}

function displayFeaturedAlumni() {
    const featuredList = document.getElementById('featuredAlumni');
    if (!featuredList) return;
    
    const featuredAlumni = alumniData.filter(alumni => alumni.featured);
    
    featuredList.innerHTML = featuredAlumni.map(alumni => `
        <div class="featured-card card" data-alumni-id="${alumni.id}">
            <div class="featured-info">
                <h3>${alumni.name}</h3>
                <p>${alumni.title} at ${alumni.company}</p>
                <p>Class of ${alumni.graduationYear}</p>
                <div class="featured-skills">
                    ${alumni.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function initializeFilters() {
    const searchName = document.getElementById('searchName');
    const filterYear = document.getElementById('filterYear');
    const filterCompany = document.getElementById('filterCompany');
    const filterSkills = document.getElementById('filterSkills');
    const filterLocation = document.getElementById('filterLocation');
    
    // Real-time filtering
    [searchName, filterCompany, filterSkills, filterLocation].forEach(input => {
        if (input) {
            input.addEventListener('input', applyFilters);
        }
    });
    
    if (filterYear) {
        filterYear.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const filters = {
        name: document.getElementById('searchName')?.value.toLowerCase() || '',
        year: document.getElementById('filterYear')?.value || '',
        company: document.getElementById('filterCompany')?.value.toLowerCase() || '',
        skills: document.getElementById('filterSkills')?.value.toLowerCase() || '',
        location: document.getElementById('filterLocation')?.value.toLowerCase() || ''
    };
    
    const filteredAlumni = alumniData.filter(alumni => {
        return (filters.name === '' || alumni.name.toLowerCase().includes(filters.name)) &&
               (filters.year === '' || alumni.graduationYear === filters.year) &&
               (filters.company === '' || alumni.company.toLowerCase().includes(filters.company)) &&
               (filters.skills === '' || alumni.skills.some(skill => skill.toLowerCase().includes(filters.skills))) &&
               (filters.location === '' || alumni.location.toLowerCase().includes(filters.location));
    });
    
    displayFilteredAlumni(filteredAlumni.filter(alumni => !alumni.featured));
    
    // Update results count
    const resultsCount = filteredAlumni.length;
    showNotification(`Found ${resultsCount} alumni matching your criteria`, 'info');
}

function displayFilteredAlumni(filteredAlumni) {
    const alumniList = document.getElementById('alumniList');
    if (!alumniList) return;
    
    if (filteredAlumni.length === 0) {
        alumniList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
                <h3>No alumni found</h3>
                <p>Try adjusting your search criteria</p>
            </div>
        `;
        return;
    }
    
    alumniList.innerHTML = filteredAlumni.map(alumni => `
        <div class="alumni-card card" data-alumni-id="${alumni.id}">
            <div class="alumni-info">
                <h3>${alumni.name}</h3>
                <p class="alumni-title">${alumni.title}</p>
                <p class="alumni-company">${alumni.company}</p>
                <p class="alumni-year">Class of ${alumni.graduationYear}</p>
                <div class="alumni-skills">
                    ${alumni.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
                <button class="connect-btn">Connect</button>
            </div>
        </div>
    `).join('');
}

function showAlumniConnectModal(alumni) {
    showModal(
        `Connect with ${alumni.name}`,
        `
        <div class="alumni-connect-modal">
            <div class="alumni-preview">
                <img src="${alumni.image}" alt="${alumni.name}" class="preview-avatar"
                     onerror="this.src='https://via.placeholder.com/80x80?text=${alumni.name.charAt(0)}'">
                <div class="preview-info">
                    <h4>${alumni.name}</h4>
                    <p>${alumni.title} at ${alumni.company}</p>
                    <p>Class of ${alumni.graduationYear}</p>
                </div>
            </div>
            <div class="form-group">
                <label class="form-label">Connection Type:</label>
                <select class="form-select" id="connectionType">
                    <option>Professional Networking</option>
                    <option>Mentorship Request</option>
                    <option>Career Guidance</option>
                    <option>Industry Insights</option>
                    <option>Collaboration Opportunity</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Personal Message:</label>
                <textarea class="form-textarea" id="connectionMessage" 
                          placeholder="Hi ${alumni.name}, I'm interested in connecting with you to learn about your experience at ${alumni.company}..."></textarea>
            </div>
        </div>
        `,
        [
            { text: 'Send Request', action: () => handleAlumniConnect(alumni), className: 'btn-primary' },
            { text: 'Cancel', action: 'closeCurrentModal', className: 'btn-ghost' }
        ]
    );
}

function showAlumniProfile(alumni) {
    showModal(
        `${alumni.name} - Profile`,
        `
        <div class="alumni-profile-modal">
            <div class="profile-header">
                <img src="${alumni.image}" alt="${alumni.name}" class="profile-avatar"
                     onerror="this.src='https://via.placeholder.com/120x120?text=${alumni.name.charAt(0)}'">
                <div class="profile-basic-info">
                    <h3>${alumni.name}</h3>
                    <p class="profile-title">${alumni.title}</p>
                    <p class="profile-company">${alumni.company}</p>
                    <p class="profile-graduation">Class of ${alumni.graduationYear}</p>
                    <p class="profile-location"><i class="fas fa-map-marker-alt"></i> ${alumni.location}</p>
                </div>
            </div>
            <div class="profile-bio">
                <h4>About</h4>
                <p>${alumni.bio}</p>
            </div>
            <div class="profile-skills">
                <h4>Skills & Expertise</h4>
                <div class="skills-list">
                    ${alumni.skills.map(skill => `<span class="skill-tag-large">${skill}</span>`).join('')}
                </div>
            </div>
            <div class="profile-contact">
                <h4>Contact Information</h4>
                <p><i class="fas fa-envelope"></i> ${alumni.email}</p>
                <p><i class="fab fa-linkedin"></i> ${alumni.linkedin}</p>
            </div>
        </div>
        `,
        [
            { text: 'Connect', action: () => { closeCurrentModal(); showAlumniConnectModal(alumni); }, className: 'btn-primary' },
            { text: 'Close', action: 'closeCurrentModal', className: 'btn-ghost' }
        ]
    );
}

function handleAlumniConnect(alumni) {
    const connectionType = document.getElementById('connectionType')?.value;
    const message = document.getElementById('connectionMessage')?.value;
    
    showNotification(`Connection request sent to ${alumni.name}!`, 'success');
    addNotification('Connection Request Sent', `Your ${connectionType.toLowerCase()} request has been sent to ${alumni.name}`);
    
    closeCurrentModal();
}

function updateDirectoryStats() {
    // Update total alumni count
    const totalAlumniElement = document.getElementById('totalAlumni');
    if (totalAlumniElement) {
        totalAlumniElement.textContent = alumniData.length;
    }
    
    // Update other stats
    const featuredCount = alumniData.filter(a => a.featured).length;
    const companies = [...new Set(alumniData.map(a => a.company))].length;
    
    const statCards = document.querySelectorAll('.stat-card .stat-info h3');
    if (statCards.length >= 4) {
        statCards[0].textContent = alumniData.length; // Total Alumni
        statCards[1].textContent = featuredCount; // Featured Alumni
        statCards[2].textContent = '0'; // New Connections (placeholder)
        statCards[3].textContent = companies; // Companies
    }
}

// Add CSS styles for directory-specific elements
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .alumni-card {
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 20px;
            background: white;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .alumni-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            border-color: #007AFF;
        }
        
        .alumni-info h3 {
            margin: 0 0 8px 0;
            font-size: 18px;
            font-weight: 600;
            color: #1f2937;
        }
        
        .alumni-title {
            font-weight: 500;
            color: #4b5563;
            margin-bottom: 4px;
        }
        
        .alumni-company {
            color: #007AFF;
            font-weight: 500;
            margin-bottom: 4px;
        }
        
        .alumni-year, .alumni-location {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 4px;
        }
        
        .alumni-location i {
            margin-right: 4px;
        }
        
        .alumni-skills {
            margin: 12px 0;
            display: flex;
            flex-wrap: wrap;
            gap: 6px;
        }
        
        .skill-tag {
            background: #e5e7eb;
            color: #374151;
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 500;
        }
        
        .skill-tag-large {
            background: #007AFF;
            color: white;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 13px;
            font-weight: 500;
            margin: 4px;
        }
        
        .alumni-actions {
            display: flex;
            gap: 8px;
            margin-top: 16px;
        }
        
        .btn-primary {
            background: #007AFF;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            flex: 1;
        }
        
        .btn-primary:hover {
            background: #0056b3;
        }
        
        .btn-ghost {
            background: transparent;
            color: #6b7280;
            border: 1px solid #e5e7eb;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            flex: 1;
        }
        
        .btn-ghost:hover {
            background: #f3f4f6;
            border-color: #d1d5db;
        }
        
        .btn-sm, .btn-ghost-sm {
            padding: 6px 12px;
            font-size: 12px;
        }
        
        .featured-card {
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            background: white;
            margin-bottom: 12px;
            transition: all 0.2s ease;
        }
        
        .featured-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateY(-2px);
        }
        
        .featured-info h3 {
            margin: 0 0 4px 0;
            font-size: 14px;
            font-weight: 600;
        }
        
        .featured-info p {
            margin: 2px 0;
            font-size: 13px;
            color: #6b7280;
        }
        
        .no-results {
            text-align: center;
            padding: 40px 20px;
            color: #6b7280;
        }
        
        .no-results h3 {
            margin-bottom: 8px;
            color: #374151;
        }
        
        .alumni-connect-modal .alumni-preview {
            display: flex;
            align-items: center;
            padding: 16px;
            background: #f9fafb;
            border-radius: 8px;
            margin-bottom: 20px;
        }
        
        .preview-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 16px;
        }
        
        .preview-info h4 {
            margin: 0 0 4px 0;
            font-size: 16px;
        }
        
        .preview-info p {
            margin: 2px 0;
            font-size: 14px;
            color: #6b7280;
        }
        
        .alumni-profile-modal .profile-header {
            display: flex;
            align-items: center;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .profile-avatar {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 20px;
        }
        
        .profile-basic-info h3 {
            margin: 0 0 8px 0;
            font-size: 24px;
        }
        
        .profile-title {
            font-size: 16px;
            font-weight: 500;
            color: #4b5563;
            margin-bottom: 4px;
        }
        
        .profile-company {
            font-size: 16px;
            color: #007AFF;
            font-weight: 500;
            margin-bottom: 4px;
        }
        
        .profile-graduation, .profile-location {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 4px;
        }
        
        .profile-bio, .profile-skills, .profile-contact {
            margin-bottom: 20px;
        }
        
        .profile-bio h4, .profile-skills h4, .profile-contact h4 {
            margin-bottom: 12px;
            font-size: 16px;
            color: #374151;
        }
        
        .profile-bio p {
            line-height: 1.6;
            color: #4b5563;
        }
        
        .skills-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .profile-contact p {
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .profile-contact i {
            width: 16px;
            color: #6b7280;
        }
    `;
    document.head.appendChild(style);
});