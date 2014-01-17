Ext.define('RedmineApp.view.RedmineIssuesNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'redmine-issues-navigator',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List'
    ],
    config: {
        id: 'redminenavigatorview',
        flex: 1,
        items: [
            {
                xtype: 'list',
                title: 'Select a Project for Details',
                id: 'projectnames',
                itemTpl: [
                    '<tpl for=".">',
                    '<p>{name}</p>',
                    '</tpl>'
                ],
                flex: 1,
                grouped: true,
                indexBar: true,
                onItemDisclosure: true,
                listeners: {
                    painted: function(element, options) {
                        this.setStore(RedmineApp.app.createProjectsStore());
                    }
                }
            }
        ]
    }
});


