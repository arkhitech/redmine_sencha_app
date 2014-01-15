Ext.define('RedmineApp.controller.ChartsMenu', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        stores: ['Issues'],
        models: ['Issue'],
        views: ['RedmineChart', 'RedmineNavigator'],
        refs: {
            list: '#projectlist'
        },
        control: {
            list: {
                disclose: 'showProjectDetails'
            }
        }
    },
    showProjectDetails: function(list, record, node, index, event, eOpts) {
        RedmineApp.app.setCurrentProjectIdentifier(record.data.identifier);
        var redmine_chart_view = Ext.create('RedmineApp.view.RedmineChart');
        list.up('projectlistforcharts').push(redmine_chart_view);
    }

});







