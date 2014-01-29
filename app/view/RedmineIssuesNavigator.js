Ext.define('RedmineApp.view.RedmineIssuesNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'redmine-issues-navigator',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.Button'
    ],
    config: {
        id: 'redmine-issues-navigator',
        flex: 1,
        navigationBar: {
            ui: 'sencha',
            items: [
                {
                    xtype: 'button',
                    ui: 'action',
                    id: 'editButton',
                    text: 'Edit',
                    align: 'right',
                    hidden: true
                }
            ]
        },
        items: [
            {
                xtype: 'list',
                title: 'Select a Project for Details',
                id: 'projectlist',
                store: 'Projects',
                itemTpl: [
                    '<tpl for=".">',
                    '<p>{name}</p>',
                    '</tpl>'
                ],
                flex: 1,
                grouped: true,
                indexBar: true,
                onItemDisclosure: true
            }
        ]
    }
});


