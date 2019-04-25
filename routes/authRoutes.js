const passport = require('passport');

module.exports = app => {

    // This handles the initial request we forward to Google
    // and specifies scope of the data we are asking for.
    // PERFORMS FIRST OAUTH REQUEST
    app.get(
        '/auth/google/', 
        passport.authenticate('google', {
            scope: ['profile', 'email'],
        })
    );

    // RESPONSE TO FIRST REQUEST
    // This handles the path we are sent to after the user complies at the consent screen.
    // passport.authenticate('google') will take in the code included by Google tacked
    // on to the end of this path by performing another request to Google using this code.
    // SEE (A)
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {

        req.logout();
        res.send(req.user);

    });

    app.get('/api/current_user', (req, res) => {

        console.log(req);
        res.send(req.session);

    });

}