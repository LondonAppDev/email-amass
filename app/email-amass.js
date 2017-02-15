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
     * Initialize the application.
    */
    pubs.init = function init() {
        console.log('Initialize.');
        setTimeout(function() {
            console.log('BOOM!');
            showFullPageEmailForm();
        }, delay);
    };

    return pubs;
})();

EmailAmass.init();
