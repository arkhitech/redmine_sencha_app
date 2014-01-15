Ext.define('RedmineApp.view.RedmineNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'redminenavigator',
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
                store: 'Projects',
                id: 'projectnames',
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


