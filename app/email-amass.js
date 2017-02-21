var EmailAmass = (function() {
    var pubs = {};

    //var delay = 3000;
    var delay = 1;
    var displayed = false;

    var cookieName = 'lad-ea-shown';
    var cookieExpiryDays = 90;
    var cookieValue = true;

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
        Cookies.set(cookieName, cookieValue, {expires: cookieExpiryDays});
    }

    /**
     * Displays the email form.
    */
    function showFullPageEmailForm() {
        $('html').addClass('lad-ea-stop-scroll');
        $('#lad-ea').slideDown();
    }

    /**
     * Hide the email form.
    */
    function hideFullPageEmailForm() {
        $('#lad-ea').slideUp();
        $('html').removeClass('lad-ea-stop-scroll');
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
            <div id="lad-ea">
                <div class="email-amass-form-wrapper">
                <h2>Full-Stack Dev Hacks</h2>
                <p class="sub-heading">Get the latest Python, JavaScript and DevOps tutorials</p>
                <br />
                <form id="email-amass-mailchimp-form" action="//londonappdeveloper.us10.list-manage.com/subscribe/post-json?u=018a0f141a1e3951f017d574b&amp;id=e87f4ca56f&amp;c=?" method="get">
                    <input type="email" class="email-amass-txt-input" value="" name="EMAIL" placeholder="Your email address"/><br />
                    <input id="email-amass-signup" class="email-amass-btn" type="submit" value="Yeah, Cheers Mate!" />
                    <input id="email-amass-refuse-signup" class="email-amass-btn" type="button" value="Bugger Off" />
                </form>
                </div>

                <div class="down-arrow-wrapper">
                    <a id="email-amass-refuse-signup-arrow" class="email-amass-down-arrow-link" href="">
                        <span class="email-amass-down-arrow"></span>
                    </a>
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
            html.lad-ea-stop-scroll {
                overflow-x: hidden !important;
                overflow-y: hidden !important;
            }

            #lad-ea {
                z-index: 99999;
                display: none;
                background-color: #f2f2f2;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                text-align: center;
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                font-size: 10px;
            }

            #lad-ea h2 {
                font-size: 5em;
            }

            #lad-ea p.sub-heading {
                font-size: 3em;
            }

            #lad-ea div.email-amass-form-wrapper {
                width: 100%;
                height: 30em;
                position: absolute;
                left: 0;
                top: 20%;
            }

            #email-amass-mailchimp-form input {
                border-radius: 5px;
            }

            #lad-ea .email-amass-txt-input {
                box-shadow: none;
                border: 1px solid #c3c3c3;
                padding: 7px;
                font-size: 2.5em;
            }

            #lad-ea .email-amass-btn {
                color: #fff;
                font-size: 20px;
                padding: 15px;
                border: none;
                margin-top: 10px;
            }

            #email-amass-refuse-signup {
                background-color: #747171;
            }

            #email-amass-signup {
                background-color: #204194;
            }

            #lad-ea a.email-amass-down-arrow-link {
                border-radius: 50%;
            }

            #lad-ea div.down-arrow-wrapper {
                position: absolute;
                width: 100%;
                top: 90%;
                display: block;

            }

            #lad-ea span.email-amass-down-arrow {
                display: inline-block;
                width: 3em;
                height: 3em;
                border: 0.5em solid #333;
                border-radius: 50%;
                margin-left: 0.75em;
            }

            #lad-ea span.email-amass-down-arrow:after {
                content: '';
                display: inline-block;
                margin-top: 0.3em;
                width: 1.4em;
                height: 1.4em;
                border-top: 0.5em solid #333;
                border-right: 0.5em solid #333;
                -moz-transform: rotate(135deg);
                -webkit-transform: rotate(135deg);
                transform: rotate(135deg);
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

            $('#email-amass-refuse-signup-arrow').bind('click', function refuseSignUpArrowClicked(event) {
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
