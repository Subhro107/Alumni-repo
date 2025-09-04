
        document.addEventListener('DOMContentLoaded', function() {
            // Forum card interactions
            document.querySelectorAll('.forum-card').forEach(card => {
                card.addEventListener('click', function(e) {
                    e.preventDefault();
                    const category = this.getAttribute('href').substring(1);
                    console.log('Opening forum category:', category);
                    // Add forum navigation logic here
                });
            });

            // Quick action buttons
            document.querySelectorAll('.action-card').forEach(button => {
                button.addEventListener('click', function() {
                    const action = this.querySelector('.action-text').textContent;
                    console.log('Quick action:', action);
                    
                    switch(action) {
                        case 'Create New Topic':
                            // Open create topic modal
                            break;
                        case 'Search Discussions':
                            // Focus on search bar or open search modal
                            document.querySelector('.search-input').focus();
                            break;
                        case 'My Bookmarks':
                            // Navigate to bookmarks
                            break;
                        case 'Notification Settings':
                            // Open notification settings
                            break;
                        case 'Find Alumni':
                            // Navigate to alumni directory
                            window.location.href = 'student_directory.html';
                            break;
                        case 'Trending Topics':
                            // Show trending topics
                            break;
                    }
                });
            });

            // Activity item interactions
            document.querySelectorAll('.activity-item').forEach(item => {
                item.addEventListener('click', function() {
                    console.log('Activity item clicked');
                    // Navigate to specific discussion
                });
            });
        });
 