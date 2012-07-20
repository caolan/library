define([
    'require',
    'jquery',
    'url',
    'hbt!../../templates/install',
    'hbt!../../templates/navigation'
],
function (require, $) {

    var tmpl = require('hbt!../../templates/install'),
        url = require('url');

    return function () {
        $('#content').html(tmpl({
            source_url: url.resolve(window.location, 'api')
        }));

        $('.navbar .container-fluid').html(
            require('hbt!../../templates/navigation')({
                install: true
            })
        );
    };

});
