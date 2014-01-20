Ext.define('RedmineApp.view.RedmineTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'RedmineTabPanel',
    requires: [
        'RedmineApp.view.RedmineIssuesNavigator',
        'RedmineApp.view.RedmineChartsNavigator',
        'RedmineApp.view.UserInputView',
        Ext.Img
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                iconCls: 'action',
                style: 'text-align:center; background:#999999;height:30px;font-size:24',
                title: 'Configure',
                layout: 'fit',
                flex: 1,
                xtype: 'redmine-user-input'
            },
            {
                iconCls: 'organize',
                title: 'Issues',
                flex: 1,
                xtype: 'redmine-issues-navigator'
            },
            {
                iconCls: 'compose',
                style: 'text-align:center; background:#999999;height:30px;font-size:24',
                title: 'Analytics',
                badgeText: 'New',
                flex: 1,
                xtype: 'redmine-charts-navigator'
            }           
        ]
    }
});


