Ext.define('RedmineApp.view.RedmineChart', {
    extend: 'Ext.carousel.Carousel',
    xtype: 'redminecharts',
    requires: [
        'RedmineApp.view.RedmineTrackerChart',
        'RedmineApp.view.RedmineStatusChart',
        'RedmineApp.view.RedminePriorityChart',
        'RedmineApp.view.RedmineIDChart'
    ],
    config: {
        height: '100%',
        align: 'stretch',
        title: 'Analytics',
        items: [
            {
                xtype: 'redmine-id-chart',
                scrollable: null,
                style: {background: '#F7F7F7'},
                html: 'Estimated Hours per Issue ID'
            },
            {
                xtype: 'redmine-tracker-chart',
                scrollable: null,
                style: {background: '#F7F7F7'},
                html: 'Estimated Hours per Category'
            },
            {
                xtype: 'redmine-status-chart',
                scrollable: null,
                style: {background: '#F7F7F7'},
                html: 'Number of Issues per Status'
            },
            {
                xtype: 'redmine-priority-chart',
                scrollable: null,
                style: {background: '#F7F7F7'},
                html: 'Number of Issues per Priority'
            }
        ]
    }});





