Ext.define('RedmineApp.view.RedmineTabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'RedmineTabPanel',
    requires: [
        'RedmineApp.view.RedmineIssuesNavigator',
        'RedmineApp.view.RedmineChartsNavigator',
        'RedmineApp.view.UserInputView',
        'Ext.Button'
    ],
    config: {
        tabBarPosition: 'bottom',
        deferredRender: false,
        itemId: 'redmine-tab-panel',
        defaults: {hideMode: "offsets"},
        layoutOnTabChange: true,
        //renderTo: Ext.getBody(),
        activeTab: 1,
        plain: true,
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


