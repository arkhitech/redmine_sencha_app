Ext.define('RedmineApp.view.RedmineChartsNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'redmine-charts-navigator',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.form.Panel'
    ],
    config: {
        autoDestroy: true,
        showAnimation: null,
        flex: 1,
        navigationBar: {
            ui: 'sencha',
            style: 'padding-top:20px;height:4em;background:#EEEEEE !important;',
        },
        items: [
            {
                xtype: 'formpanel',
                layout: 'vbox',
                title: 'Select a Project',
                items: [
                    {
                        xtype: 'list',
                        id: 'chartsprojectlist',
                        store: 'Projects',
                        pinHeaders: true,
                        clearSelectionOnDeactivate: true,
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
        ]
    }
}
);