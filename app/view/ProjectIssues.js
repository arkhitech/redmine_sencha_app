Ext.define('RedmineApp.view.ProjectIssues', {
    extend: 'Ext.navigation.View',
    xtype: 'projectissuesview',
    requires: [
        'Ext.dataview.List'
    ],
    config: {
        navigationBar: null,
        // layout: 'vbox',
        autoDestroy: true,
        showAnimation: null,
        flex: 1,
        title: 'Select a Ticket',
        items: [
            {
                xtype: 'list',
                grouped: true,
                indexBar: true,
                pinHeaders: true,
                clearSelectionOnDeactivate: true,
                itemId: 'project-issue-list',
                itemTpl: [
                    '<tpl for=".">',
                    '<p>{subject}</p>',
                    '</tpl>'
                ],
                onItemDisclosure: true
            }
        ]
    }
}
);
