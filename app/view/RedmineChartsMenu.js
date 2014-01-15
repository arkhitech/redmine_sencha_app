Ext.define('RedmineApp.view.RedmineChartsMenu', {
    extend: 'Ext.navigation.View',
    xtype: 'projectlistforcharts',
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
                store: 'Projects',
                title: 'Select a Project for Analytics',
                id: 'projectlist',
                itemTpl: [
                    '<tpl for=".">',
                    '<p>{name}</p>',
                    '</tpl>'
                ],
                grouped: true,
                indexBar: true,
                onItemDisclosure: true
            }
        ]
    }
}
);