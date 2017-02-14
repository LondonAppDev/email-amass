var WelcomeMat = (function() {
    var pubs = {};

    var delay = 2000;
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
     * Displays the welcome mat.
    */
    function showWelcomeMat() {
        $('html, body').scrollTop(0);
        $('div.lad-welcome-mat').show();
        $('html').addClass('lad-welcome-mat-block-scroll');
    }

    /**
     * Initialize the application.
    */
    pubs.init = function init() {
        console.log('Initialize.');
        setTimeout(function() {
            console.log('BOOM!');
            showWelcomeMat();
        }, delay);
    };

    return pubs;
})();

WelcomeMat.init();
