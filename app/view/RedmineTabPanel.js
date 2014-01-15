Ext.define('RedmineApp.view.RedmineTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'RedmineTabPanel',
    requires: [
        'RedmineApp.view.RedmineNavigator',
        'RedmineApp.view.RedmineChartsMenu',
        'RedmineApp.view.UserInputView'
    ],
    config: {
        tabBarPosition: 'bottom',
        items: [
            {
                iconCls: 'action',
                style: 'text-align:center; background:#999999;height:30px;font-size:24',
                title: 'Configure',
                flex: 1,
                xtype: 'redmine-user-input'
            },
            {
                iconCls: 'organize',
                title: 'Issues',
                flex: 1,
                xtype: 'redminenavigator'
            },
            {
                iconCls: 'compose',
                style: 'text-align:center; background:#999999;height:30px;font-size:24',
                title: 'Analytics',
                badgeText: 'New',
                flex: 1,
                xtype: 'projectlistforcharts'
            }
        ]
    }
});


