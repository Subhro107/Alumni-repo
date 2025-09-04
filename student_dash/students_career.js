document.addEventListener('DOMContentLoaded', function() {
            // Global search functionality
            const globalSearch = document.getElementById('globalSearch');
            globalSearch.addEventListener('input', function(e) {
                console.log('Searching for:', e.target.value);
                // Add search logic here
            });

            // Job application buttons
            document.querySelectorAll('.btn-small-career').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log('Job action clicked');
                    // Add job application logic here
                });
            });

            // Upload resume functionality
            document.querySelector('input[type="file"]').addEventListener('change', function(e) {
                const file = e.target.files[0];
                if (file) {
                    console.log('File selected:', file.name);
                    // Add file upload logic here
                }
            });
        });