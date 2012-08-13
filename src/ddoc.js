exports.dashboard = {
    title: 'Library',
    version: '0.0.1',
    description: "CouchApp template library",
    icons: {
        '16': 'img/icons/icon_16.png',
        '22': 'img/icons/icon_22.png',
        '48': 'img/icons/icon_48.png',
        '96': 'img/icons/icon_96.png',
        '128': 'img/icons/icon_128.png'
    }
};


exports.rewrites = [
    // fake the db-level api for pushing design docs,
    // stripping the leading '_design/' part of the id
    {from: '/upload/_design/:name', to: '../../:name'},
    {from: '/upload/:name', to: '../../:name'},
    {from: '/upload', to: '../..'},

    {from: '/', to: 'index.html'},
    {from: '/api', to: '../..'},
    {from: '/api/*', to: '../../*'},
    {from: '/*', to: '*'}
];


exports.shows = {
    jsonp: function (doc, req) {
        return req.query.callback + '(' + JSON.stringify(doc) + ');';
    }
};


exports.lists = {
    jsonp: function (head, req) {
        start({
            code: 200,
            headers: {'Content-Type': 'application/javascript'}
        });
        send(
            req.query.callback + '(' +
            '{ total_rows: ' + head.total_rows +
            ', offset: ' + head.offset +
            ', rows: ['
        );
        var row, first = true;
        while (row = getRow()) {
            send((first ? '': ', ') + JSON.stringify(row));
            first = false;
        }
        return ' ] });';
    }
};


exports.views = {
    templates: {
        map: function (doc) {
            if (doc.dashboard) {
                emit(doc._id, {rev: doc._rev, dashboard: doc.dashboard});
            }
        }
    }
};


exports.validate_doc_update = function (newDoc, oldDoc, userCtx) {

    var is_admin = false;
    for (var i = 0; i < userCtx.roles.length; i++) {
        if (userCtx.roles[i] === '_admin') {
            is_admin = true;
        }
    }
    if (!is_admin) {
        throw {unauthorized: 'Only admins can manage templates'};
    }

    if (!newDoc.dashboard) {
        throw {
            forbidden: 'Document is missing "dashboard" property'
        };
    }
    if (!newDoc.dashboard.title) {
        throw {forbidden: 'Missing dashboard.title property'};
    }
    if (!newDoc.dashboard.description) {
        throw {forbidden: 'Missing dashboard.description property'};
    }
    if (!newDoc.dashboard.version) {
        throw {forbidden: 'Missing dashboard.version property'};
    }
    if (!newDoc.dashboard.icons) {
        throw {forbidden: 'Missing dashboard.icons property'};
    }
    if (!newDoc.dashboard.icons['16']) {
        throw {forbidden: 'Missing 16x16 icon'};
    }
    if (!newDoc.dashboard.icons['22']) {
        throw {forbidden: 'Missing 22x22 icon'};
    }
    if (!newDoc.dashboard.icons['48']) {
        throw {forbidden: 'Missing 48x48 icon'};
    }
    if (!newDoc.dashboard.icons['96']) {
        throw {forbidden: 'Missing 96x96 icon'};
    }
    if (!newDoc.dashboard.icons['128']) {
        throw {forbidden: 'Missing 128x128 icon'};
    }

};
