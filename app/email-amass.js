var EmailAmass = (function() {
    var pubs = {};

    var delay = 1;
    var displayed = false;

    var cookieName = 'email-amass-displayed';
    var cookieExpiryDays = 90;
    var cookieValue = 'email_amass_shown';

    /**
     * Test if the user has already once closed or completed signup.
    */
    function shouldShow() {
        var cookie = Cookies.get(cookieName);
        if (cookie === cookieValue) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Marks the mat as already displayed.
    */
    function markShown() {
        console.log('Setting as shown.');
        Cookies.set(cookieName, cookieValue, {expires: cookieExpiryDays});
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
     * Hide the email form.
    */
    function hideFullPageEmailForm() {
        console.log('Hiding the full page email form');
        $('div.email-amass').hide();
        $('html').removeClass('email-amass-block-scroll');
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
        console.log('Submitting...');
        $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8'
        })
        .then(function(res) {
            console.log('Submitted...');
            console.log(res);
            markShown();
            hideFullPageEmailForm();
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
        if (shouldShow()) {
            setTimeout(function() {
                console.log('BOOM!');
                showFullPageEmailForm();
            }, delay);
        }

        var $form = $('#email-amass-mailchimp-form');

        if ($form.length > 0) {
            $('#email-amass-mailchimp-form input[type="submit"]').bind('click', function clicked(event) {
                if (event) event.preventDefault();
                if (validateForm($form)) {
                    submitEmail($form);
                }
            });

            $('#email-amass-refuse-signup').bind('click', function refuseSignUpClicked(event) {
                markShown();
                hideFullPageEmailForm();
            });
        }

    };

    return pubs;
})();

window.onload = function() {
    EmailAmass.init();
}
