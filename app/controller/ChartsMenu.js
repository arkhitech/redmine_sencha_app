Ext.define('RedmineApp.controller.ChartsMenu', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        views: ['RedmineChart', 'RedmineChartsNavigator'],
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
        list.up('redmine-charts-navigator').push(redmine_chart_view);
    }

});







