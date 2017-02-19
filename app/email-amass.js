var EmailAmass = (function() {
    var pubs = {};

    var delay = 1;
    var displayed = false;

    /**
     * Test if the user has already once closed or completed signup.
    */
    function shouldShow() {

    }

    /**
     * Marks the mat as already displayed.
    */
    function markShown() {

    }

    /**
     * Displays the email form.
    */
    function showFullPageEmailForm() {
        $('html, body').scrollTop(0);
        $('div.email-amass').show();
        $('html').addClass('email-amass-block-scroll');
    }

    /**
     * Checks if a form is valid or not.
     * @function validateForm
     * @param {Object} $form Form object to validate.
    */
    function validateForm($form) {
        // TODO: Add email validation.
        return true;
    }

    /**
     * Submits a users email form to MailChimp.
     * @function submitEmail
     * @param {Object} $form Form object to validate.
    */
    function submitEmail($form) {
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        })
        .then(function(res) {
            console.log('Registration successful.', res);
        })
        .catch(function(err) {
            console.log('Registration failed.');
            console.log(err);
        });
    }

    /**
     * Initialize the application.
    */
    pubs.init = function init() {
        console.log('Initialize.');
        setTimeout(function() {
            console.log('BOOM!');
            showFullPageEmailForm();
        }, delay);

        var $form = $('#email-amass-mailchimp-form');
        if ($form.length > 0) {
            $('#email-amass-mailchimp-form input[type="submit"]').bind('click', function registerClicked(event) {
                if (event) event.preventDefault();
                if (validateForm($form)) {
                    submitEmail($form);
                }
            });
        }

    };

    return pubs;
})();

EmailAmass.init();
