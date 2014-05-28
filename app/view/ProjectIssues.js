Ext.define('RedmineApp.view.ProjectIssues', {
    extend: 'Ext.Container',
    xtype: 'projectissuesview',
    requires: [
        'Ext.dataview.List'
    ],
    config: {
        layout: 'vbox',
        scrollable: 'none',
        title: 'Select a Ticket For Details',
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
                onItemDisclosure: true,
                flex: 1
            }
        ]
    }
}
);
