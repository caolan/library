define([
    'require',
    'jquery',
    'url',
    'hbt!../../templates/upload',
    'hbt!../../templates/navigation'
],
function (require, $) {

    var tmpl = require('hbt!../../templates/upload'),
        url = require('url');

    return function () {
        $('#content').html(tmpl({
            upload_url: url.resolve(window.location, 'upload')
        }));

        $('.navbar .container-fluid').html(
            require('hbt!../../templates/navigation')({
                upload: true
            })
        );
    };

});
