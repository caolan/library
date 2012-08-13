define([
    'require',
    'jquery',
    'hbt!../../templates/upload',
    'hbt!../../templates/navigation'
],
function (require, $) {

    var tmpl = require('hbt!../../templates/upload');

    return function () {
        $('#content').html(tmpl({
            upload_url: window.location.protocol + '//' +
                        window.location.host +
                        window.location.pathname.replace(/\/$/,'') +
                        '/upload'
        }));

        $('.navbar .container-fluid').html(
            require('hbt!../../templates/navigation')({
                upload: true
            })
        );
    };

});
