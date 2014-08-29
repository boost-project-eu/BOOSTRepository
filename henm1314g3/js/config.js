require.config({
    paths: {
        jquery: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/jquery-1.10.2.min",
        jqueryUi: "//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min",
        async: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/async",
        bootstrap: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/bootstrap.min",
        boostShared: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/boostShared",
        bootstrapSlider: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/bootstrap-slider",
        tree: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/tree",
        spin: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/ladda/spin.min",
        ladda: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/ladda/ladda.min",
        ractive: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/Ractive",
        ractiveValidator: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/ractive-validator",
        moment: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/moment.min",
        bootbox: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/bootbox.min",
        rivets: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/rivets.min",
        repositories: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/repositories",
        search_youtube: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/search_youtube",
        search_slideshare: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/search_slideshare",
        search_scribd: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/search_scribd",
        search_wikipedia: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/search_wikipedia",
        linkify: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/linkify",
        scribd_api: "http://www.scribd.com/javascripts/scribd_api",
        highcharts: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/highcharts/js/highcharts",
        highcharts_exporting: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/highcharts/js/modules/exporting",

        UserManager: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/UserManager",       
        BCNManager: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/BCNManager",
        LearningDocumentsManager: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/LearningDocumentsManager",
        ExpertsManager: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/ExpertsManager",
        EmployeeManager: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/EmployeeManager",
        WidgetsManager: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/WidgetsManager",
        AccessRightsManager: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/AccessRightsManager",
        ConfigManager: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/ConfigManager",
        iwc : "http://dbis.rwth-aachen.de/gadgets/iwc/lib/iwc",
        google_api: "https://apis.google.com/js/client",
        bootstrapDatepicker: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/bootstrap-datepicker",
        utils: "http://127.0.0.1:8073/role/BOOSTRepository/henm1314g3/js/utils"

    },
    shim: {
        async : {
            exports: 'async'
        },
        UserManager: {
            deps: ['boostShared']
        },
        BCNManager: {
            deps: ['boostShared']
        },
        LearningDocumentsManager: {
            deps: ['boostShared']
        },
        ExpertsManager: {
            deps: ['boostShared']
        },
        EmployeeManager: {
            deps: ['boostShared']
        },
        WidgetsManager: {
            deps: ['boostShared']
        },
        AccessRightsManager: {
            deps: ['boostShared', 'bootbox']
        },
        ConfigManager: {
            deps: ['boostShared']
        },
        boostShared: {
            deps: ['async']
        },
        highcharts: {
            exports: "Highcharts",
            deps: ['jquery'] 
        },
        highcharts_exporting: {
            deps: ['highcharts']
        },
        bootstrap: {
            deps: ['jquery']
        },
        jqueryUi: {
            deps: ['jquery']
        },
        tree: {
            deps: ['jquery']
        },
        rivets: {
            deps: ['jquery']
        },
        search_youtube: {
            deps: ['google_api']
        },
        bootstrapDatepicker: {
            deps: ['jquery']
        },
        bootstrapSlider: {
            deps: ['jquery']
        }
    }

});