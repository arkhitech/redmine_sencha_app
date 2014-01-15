Ext.define('RedmineApp.view.ProjDetail', {
    extend: 'Ext.Container',
    xtype: 'projdetail',
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
                store: 'Issues',
                grouped: true,
                indexBar: true,
                id: 'ticketlist',
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
