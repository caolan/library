define([
    'require',
    'jquery',
    'underscore',
    'couchr',
    'hbt!../../templates/templates',
    'hbt!../../templates/navigation',
    'hbt!../../templates/template-list'
],
function (require, $, _) {

    var couchr = require('couchr');


    return function () {
        $('#content').html(require('hbt!../../templates/templates')({}));

        $('.navbar .container-fluid').html(
            require('hbt!../../templates/navigation')({
                templates: true
            })
        );

        couchr.get('api/_design/library/_view/templates', function (err, data) {
            if (err) {
                return console.error(err);
            }
            var templates = _.map(data.rows, function (r) {
                r.dashicon = 'api/' + encodeURIComponent(r.id) + '/' +
                    r.value.icons['22'];
                return r;
            });
            $('#template-list').html(
                require('hbt!../../templates/template-list')({
                    templates: templates
                })
            );
        });
    };

});
