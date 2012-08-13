define([
    'require',
    'jquery',
    'couchr',
    'hbt!../../templates/install',
    'hbt!../../templates/navigation'
],
function (require, $) {

    var tmpl = require('hbt!../../templates/install'),
        couchr = require('couchr');

    return function () {
        couchr.get('api', function (err, info) {
            if (err) {
                return console.error(err);
            }
            $('#content').html(tmpl({
                // this doesn't work as a replication source because
                // it lacks a number of _private handlers at the root level
                //source_url: url.resolve(window.location, 'api')
                source_url: window.location.protocol + '//' +
                            window.location.host + '/' + info.db_name
            }));
            $('.navbar .container-fluid').html(
                require('hbt!../../templates/navigation')({
                    install: true
                })
            );
        });
    };

});
