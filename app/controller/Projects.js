Ext.define('RedmineApp.controller.Projects', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        views: ['RedmineIssuesNavigator'],
        refs: {
            list: '#projectnames'
        },
        control: {
            list: {
                disclose: 'showProjectDetails'
            }
        }
    },
    showProjectDetails: function(list, record) {
        var project_details_view = Ext.create('RedmineApp.view.ProjDetail');
        list.up('redmine-issues-navigator').push(project_details_view);                
        var newstore = RedmineApp.app.createIssuesStore(record.data.identifier);
        project_details_view.getAt(0).setStore(newstore);

    }
});













