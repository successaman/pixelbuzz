/* ============================================================
   PIXELBUZZ — Form Validation & WhatsApp Integration
   ============================================================ */

(function() {
  'use strict';

  var forms = document.querySelectorAll('[data-validate]');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var isValid = true;

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach(function(group) {
        group.classList.remove('error');
      });

      // Validate required fields
      form.querySelectorAll('[required]').forEach(function(field) {
        var group = field.closest('.form-group');
        var value = field.value.trim();

        if (!value) {
          isValid = false;
          if (group) group.classList.add('error');
        }

        // Email validation
        if (field.type === 'email' && value) {
          var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            if (group) group.classList.add('error');
          }
        }

        // Phone validation (Indian format)
        if (field.type === 'tel' && value) {
          var phoneRegex = /^[+]?[\d\s-]{10,14}$/;
          if (!phoneRegex.test(value)) {
            isValid = false;
            if (group) group.classList.add('error');
          }
        }
      });

      if (isValid) {
        // Collect form data
        var formData = new FormData(form);
        var data = {};
        formData.forEach(function(value, key) {
          data[key] = value;
        });

        // Show success state
        var submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
          var originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sending...';
          submitBtn.disabled = true;

          // Simulate submission (replace with actual endpoint)
          setTimeout(function() {
            // Redirect to thank you page
            window.location.href = '/thank-you.html';
          }, 1000);
        }
      } else {
        // Scroll to first error
        var firstError = form.querySelector('.form-group.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });

    // Live validation on blur
    form.querySelectorAll('[required]').forEach(function(field) {
      field.addEventListener('blur', function() {
        var group = this.closest('.form-group');
        if (!this.value.trim()) {
          if (group) group.classList.add('error');
        } else {
          if (group) group.classList.remove('error');
        }
      });
    });
  });

  // --- WhatsApp Button ---
  document.querySelectorAll('[data-whatsapp]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      var phone = this.getAttribute('data-whatsapp');
      var message = this.getAttribute('data-whatsapp-message') || 'Hi PixelBuzz, I would like to inquire about your wedding photography and cinematography services.';
      var url = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(message);
      window.open(url, '_blank');
    });
  });
})();
