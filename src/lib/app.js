define([
    'exports',
    'require',
    'director',
    './views/templates',
    './views/install',
    './views/upload'
],
function (exports, require) {

    var director = require('director');


    exports.routes = {
        '/':        require('./views/templates'),
        '/install': require('./views/install'),
        '/upload':  require('./views/upload')
    };

    exports.init = function () {
        var router = new director.Router(exports.routes);
        router.init();

        if (!window.location.hash || window.location.hash === '#') {
            window.location = '#/';
            $(window).trigger('hashchange');
        }
    };

});
