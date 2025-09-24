// Alumni Dashboard Shared JavaScript Functions
// This file contains common functionality used across all alumni dashboard pages

// User menu functionality
function showUserMenu() {
  showModal(
    'User Menu',
    `
    <a href="profile-settings.html" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
      <i class="fas fa-user" style="margin-right: 12px; color: #2563eb; width: 16px;"></i>
      <span>View Profile</span>
    </a>
    <a href="#" onclick="showHelpModal()" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #333; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
      <i class="fas fa-question-circle" style="margin-right: 12px; color: #6b7280; width: 16px;"></i>
      <span>Help & Support</span>
    </a>
    <div style="border-top: 1px solid #eee; margin: 8px 0;"></div>
    <a href="#" onclick="handleLogout()" style="display: flex; align-items: center; padding: 12px 16px; text-decoration: none; color: #dc3545; transition: background-color 0.2s;" onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
      <i class="fas fa-sign-out-alt" style="margin-right: 12px; color: #dc3545; width: 16px;"></i>
      <span>Logout</span>
    </a>
    `,
    []
  );
}

function showModal(title, content, buttons = []) {
  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 10000;
  `;

  // Create modal content
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: absolute;
    top: 70px;
    right: 20px;
    background: white;
    border-radius: 12px;
    padding: 0;
    width: 250px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    border: 1px solid #e5e7eb;
  `;

  // For User Menu, use dropdown styling
  if (title === 'User Menu') {
    const userHeader = document.createElement('div');
    userHeader.style.cssText = `
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #eee;
    `;
    userHeader.innerHTML = `
      <span class="avatar" style="margin-right: 12px; width: 40px; height: 40px; line-height: 40px; font-size: 16px; border-radius: 50%; background: #e5e7eb; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #2563eb;">SM</span>
      <div>
        <div style="font-weight: 600; color: #333;">Subhro Maitra</div>
        <div style="font-size: 0.85rem; color: #666;">subhro@example.com</div>
      </div>
    `;
    modal.appendChild(userHeader);

    const menuContent = document.createElement('div');
    menuContent.style.cssText = `padding: 8px 0;`;
    menuContent.innerHTML = content;
    modal.appendChild(menuContent);
  } else {
    // For other modals (Help), use centered styling
    overlay.style.cssText = `
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

    modal.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 24px;
      max-width: 400px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    `;

    // Add title
    if (title) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = title;
      titleElement.style.cssText = `
        margin: 0 0 16px 0;
        font-size: 18px;
        font-weight: 600;
        color: #1f2937;
      `;
      modal.appendChild(titleElement);
    }

    // Add content
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    modal.appendChild(contentDiv);

    // Add buttons
    if (buttons.length > 0) {
      const buttonContainer = document.createElement('div');
      buttonContainer.style.cssText = `
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 20px;
      `;

      buttons.forEach(btn => {
        const button = document.createElement('button');
        button.textContent = btn.text;
        button.style.cssText = `
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          background: #e5e7eb;
          color: #374151;
          transition: background 0.2s;
        `;
        button.onclick = () => {
          if (btn.action === 'closeCurrentModal') {
            document.body.removeChild(overlay);
          } else if (btn.action === 'createEvent') {
            createEvent();
          } else if (typeof btn.action === 'function') {
            btn.action();
          }
        };
        buttonContainer.appendChild(button);
      });

      modal.appendChild(buttonContainer);
    }
  }

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close modal on overlay click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      document.body.removeChild(overlay);
    }
  });
}

function navigateTo(page) {
  window.location.href = page;
}

function showHelpModal() {
  // Get the current page to customize help content
  const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

  let helpContent = `
    <div style="text-align: center;">
      <p style="margin-bottom: 16px; color: #6b7280;">Need help with the alumni platform?</p>
      <p style="margin-bottom: 8px;"><strong>Email:</strong> support@alumniconnect.com</p>
      <p style="margin-bottom: 8px;"><strong>Phone:</strong> +1-234-567-8900</p>
      <p><strong>Hours:</strong> Mon-Fri 9AM-5PM</p>
    </div>
  `;

  // Customize help content based on current page
  if (currentPage.includes('forums')) {
    helpContent = `
      <div style="text-align: center;">
        <p style="margin-bottom: 16px; color: #6b7280;">Need help with the forums?</p>
        <p style="margin-bottom: 8px;"><strong>Email:</strong> support@alumniconnect.com</p>
        <p style="margin-bottom: 8px;"><strong>Phone:</strong> +1-234-567-8900</p>
        <p><strong>Hours:</strong> Mon-Fri 9AM-5PM</p>
      </div>
    `;
  } else if (currentPage.includes('mentorship')) {
    helpContent = `
      <div style="text-align: center;">
        <p style="margin-bottom: 16px; color: #6b7280;">Need help with the mentorship program?</p>
        <p style="margin-bottom: 8px;"><strong>Email:</strong> support@alumniconnect.com</p>
        <p style="margin-bottom: 8px;"><strong>Phone:</strong> +1-234-567-8900</p>
        <p><strong>Hours:</strong> Mon-Fri 9AM-5PM</p>
      </div>
    `;
  } else if (currentPage.includes('give-back')) {
    helpContent = `
      <div style="text-align: center;">
        <p style="margin-bottom: 16px; color: #6b7280;">Need help with donations and giving back?</p>
        <p style="margin-bottom: 8px;"><strong>Email:</strong> support@alumniconnect.com</p>
        <p style="margin-bottom: 8px;"><strong>Phone:</strong> +1-234-567-8900</p>
        <p><strong>Hours:</strong> Mon-Fri 9AM-5PM</p>
      </div>
    `;
  }

  showModal(
    'Help & Support',
    helpContent,
    [{ text: 'Close', action: 'closeCurrentModal', className: 'btn-ghost' }]
  );
}

function handleLogout() {
  if (confirm('Are you sure you want to logout?')) {
    // Clear any stored session data
    localStorage.removeItem('currentUser');
    // Redirect to login page
    window.location.href = '../login.html';
  }
}

// Initialize common event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effects for menu items
  document.addEventListener('click', function(e) {
    if (e.target.closest('.menu-item-button')) {
      const item = e.target.closest('.menu-item-button');
      if (!item.classList.contains('logout-item')) {
        item.style.background = '#e5e7eb';
        setTimeout(() => {
          item.style.background = '#f8f9fa';
        }, 100);
      }
    }
  });

  // Amount selection for donation forms (only applies to give-back.html)
  const amountOptions = document.querySelectorAll('.amount-option');
  if (amountOptions.length > 0) {
    amountOptions.forEach(option => {
      option.addEventListener('click', () => {
        document.querySelectorAll('.amount-option').forEach(el => {
          el.classList.remove('selected');
        });
        option.classList.add('selected');
      });
    });
  }
});

// Create Event Functionality
function showCreateEventModal() {
  showModal(
    'Create New Event',
    `
    <form id="createEventForm" style="display: flex; flex-direction: column; gap: 16px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-weight: 600; color: #374151; font-size: 14px;">Event Title *</label>
        <input type="text" id="eventTitle" required style="padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" placeholder="Enter event title">
      </div>
      
      <div style="display: flex; gap: 16px;">
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <label style="font-weight: 600; color: #374151; font-size: 14px;">Date *</label>
          <input type="date" id="eventDate" required style="padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
        </div>
        <div style="flex: 1; display: flex; flex-direction: column; gap: 8px;">
          <label style="font-weight: 600; color: #374151; font-size: 14px;">Time *</label>
          <input type="time" id="eventTime" required style="padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
        </div>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-weight: 600; color: #374151; font-size: 14px;">Location</label>
        <input type="text" id="eventLocation" style="padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;" placeholder="Enter event location">
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-weight: 600; color: #374151; font-size: 14px;">Description *</label>
        <textarea id="eventDescription" required rows="4" style="padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px; resize: vertical;" placeholder="Describe your event..."></textarea>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <label style="font-weight: 600; color: #374151; font-size: 14px;">Event Type</label>
        <select id="eventType" style="padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;">
          <option value="networking">Networking</option>
          <option value="career">Career</option>
          <option value="social">Social</option>
          <option value="educational">Educational</option>
          <option value="fundraising">Fundraising</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div style="display: flex; align-items: center; gap: 8px;">
        <input type="checkbox" id="isPublic" checked style="width: 16px; height: 16px;">
        <label for="isPublic" style="font-size: 14px; color: #374151;">Make this event public to all alumni</label>
      </div>
    </form>
    `,
    [
      { text: 'Cancel', action: 'closeCurrentModal', className: 'btn-ghost' },
      { text: 'Create Event', action: 'createEvent', className: 'btn-primary' }
    ]
  );
}

function createEvent() {
  const form = document.getElementById('createEventForm');
  const formData = new FormData(form);
  
  // Get form values
  const eventData = {
    title: document.getElementById('eventTitle').value,
    date: document.getElementById('eventDate').value,
    time: document.getElementById('eventTime').value,
    location: document.getElementById('eventLocation').value,
    description: document.getElementById('eventDescription').value,
    type: document.getElementById('eventType').value,
    isPublic: document.getElementById('isPublic').checked
  };
  
  // Validate required fields
  if (!eventData.title || !eventData.date || !eventData.time || !eventData.description) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Validate date is not in the past
  const eventDateTime = new Date(eventData.date + 'T' + eventData.time);
  const now = new Date();
  if (eventDateTime < now) {
    alert('Event date and time cannot be in the past.');
    return;
  }
  
  // For now, we'll just show a success message and close the modal
  // In a real application, this would send data to a server
  console.log('Creating event:', eventData);
  
  // Close the current modal
  const overlay = document.querySelector('div[style*="position: fixed"]');
  if (overlay) {
    overlay.remove();
  }
  
  // Show success message
  showModal(
    'Event Created Successfully!',
    `
    <div style="text-align: center; padding: 24px 0;">
      <div style="width: 64px; height: 64px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
        <i class="fas fa-check" style="color: white; font-size: 24px;"></i>
      </div>
      <h3 style="margin: 0 0 8px 0; color: #374151;">${eventData.title}</h3>
      <p style="margin: 0; color: #6b7280;">Your event has been created and will be visible to other alumni shortly.</p>
    </div>
    `,
    [
      { text: 'View Events', action: 'closeCurrentModal', className: 'btn-primary' }
    ]
  );
  
  // Refresh the page after a short delay to show the new event
  setTimeout(() => {
    location.reload();
  }, 2000);
}