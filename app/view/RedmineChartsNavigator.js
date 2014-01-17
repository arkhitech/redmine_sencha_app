Ext.define('RedmineApp.view.RedmineChartsNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'redmine-charts-navigator',
    requires: [
        'Ext.dataview.List',
        'Ext.TitleBar'
    ],
    config: {
        flex: 1,
        id: 'redminenavigatorviewforcharts',
        height: '100%',
        pack: 'center',
        align: 'left',
        items: [
            {
                xtype: 'list',
                title: 'Select a Project for Analytics',
                id: 'projectlist',
                itemTpl: [
                    '<tpl for=".">',
                    '<p>{name}</p>',
                    '</tpl>'
                ],
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
}
);