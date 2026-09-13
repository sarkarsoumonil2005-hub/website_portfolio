// 4. Contact Form Handling (AJAX Submission)
const contactForm = document.getElementById('contact-form');
const successModal = document.getElementById('success-modal');

if (contactForm && successModal) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Stop standard redirect

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fa-solid fa-spinner fa-spin"></i>';

        // Collect Form Data
        const formData = new FormData(contactForm);

        // Post to FormSubmit.co
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // Show custom success modal
                    successModal.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock background scrolling
                    contactForm.reset();
                } else {
                    alert('Submission failed. Please try again or email directly.');
                }
            })
            .catch(error => {
                alert('Network error. Please try again.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
    });
}