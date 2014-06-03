Ext.define('RedmineApp.view.RedmineChartsNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'redmine-charts-navigator',
    requires: [
        'Ext.dataview.List',
        'Ext.TitleBar'
    ],
    config: {
        flex: 1,
        autoDestroy: true,
        id: 'redminenavigatorviewforcharts',
        height: '100%',
        pack: 'center',
        align: 'left',
        navigationBar: {
            ui: 'sencha',
//             xtype: 'toolbar',
//                ui: 'Sencha',
//                docked: 'top',
//                title: 'Please Enter Your Details',
            style: 'padding-top:20px;height:4em;background:#EEEEEE !important;'
        },
        items: [
            {
                title: 'Select a Project',
                xtype: 'list',
                id: 'chartsprojectlist',
                store: 'Projects',
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