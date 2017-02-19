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
     * Injects the HTML to the page.
    */
    function injectHtml() {
        var html = `
            <div class="email-amass">
                <div class="email-amass-form-wrapper">
                    <form id="email-amass-mailchimp-form" action="//londonappdeveloper.us10.list-manage.com/subscribe/post-json?u=018a0f141a1e3951f017d574b&amp;id=e87f4ca56f&amp;c=?" method="get">
                        <input type="email" value="" name="EMAIL" placeholder="Email Address"/>
                        <input type="submit" value="Subscribe" />
                        <input id="email-amass-refuse-signup" type="button" value="Go Away" />
                    </form>
                </div>
            </div>
        `;
        $('body').prepend(html);
    }

    /**
     * Inject CSS.
    */
    function injectCss() {
        var css = `
        <style type="text/css">
            html.email-amass-block-scroll {
                overflow-x: hidden !important;
                overflow-y: hidden !important;
            }

            div.email-amass {
                z-index: 99999;
                display: none;
                background-color: #c3c3c3;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            div.email-amass div.email-amass-form-wrapper {
                width: 300px;
                height: 300px;
                position: absolute;
                left: 50%;
                top: 50%;
                margin: -150px 0 0 -150px;
            }

            #email-amass-refuse-signup {
                background-color: red;
            }
        </style>
        `;
        $('head').append(css);
    }

    /**
     * Initialize the application.
    */
    pubs.init = function init() {
        if (shouldShow()) {
            injectCss();
            injectHtml();

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
