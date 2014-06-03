Ext.define('RedmineApp.controller.ChartsMenu', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        views: ['RedmineChart', 'RedmineChartsNavigator'],
        refs: {
            list: '#chartsprojectlist',
            redmineChartsNavigator: 'redmine-charts-navigator'
        },
        control: {
            list: {
                disclose: 'showProjectCharts',
                itemtap: 'showProjectChartsTap'
            }
        }
    },
    showProjectCharts: function(list, record, node, index, event, eOpts) {
        RedmineApp.app.setCurrentProjectIdentifier(record.data.identifier);
        var redmine_chart_view = Ext.create('RedmineApp.view.RedmineChart');
        this.getRedmineChartsNavigator().push(redmine_chart_view);
    },
    showProjectChartsTap: function(issueListCharts, index, target, record, e, eOpts)
    {
        RedmineApp.app.setCurrentProjectIdentifier(record.data.identifier);
        var redmine_chart_view = Ext.create('RedmineApp.view.RedmineChart');
        this.getRedmineChartsNavigator().push(redmine_chart_view);
    }
});







