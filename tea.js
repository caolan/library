exports.tasks = {
    "cache-manifest-timestamp": "./tasks/cache-manifest-timestamp",
    "less-compile": "./tasks/less-compile"//,
    //"jam-compile": "./tasks/jam-compile"
};

exports.builds = {
    assets: {
        "include": {paths: {
            "src/jam": "jam",
            "src/packages": "packages",
            "src/index.html": "index.html",
            "src/kanso.json": "kanso.json",
            "src/ddoc.js": "ddoc.js",
            "src/img": "img"
        }}
    },
    all: ['assets', {
        "@less-compile": {
            compile: {
                "src/less/library.less": "css/library.css"
            }
        },
        "@jam-compile": {
            dir: "src",
            output: "jam/require.js",
            includes: ["lib/app"],
            nominify: true
            // TODO: fix excluding plugins (and use of stubModules in r.js)
            //deepExcludes: ["hbt"]
        }
    }]
};
