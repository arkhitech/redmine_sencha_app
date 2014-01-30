Ext.define('RedmineApp.view.RedmineIssuesNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'redmine-issues-navigator',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.Button'
    ],
    currentRefreshListener: null,
    setCurrentRefreshListener: function(fn, scope) {
        var btnRefresh = Ext.getCmp('btn-refresh');
        if (this.currentRefreshListener !== null) {
            btnRefresh.removeListener('tap', this.currentRefreshListener);
        }
        btnRefresh.addListener('tap', fn, scope);
        this.currentRefreshListener = fn;
    },
    config: {
        id: 'redmine-issues-navigator',
        flex: 1,
        navigationBar: {
            ui: 'sencha',
            items: [
                {
                    xtype: 'button',
                    ui: 'action',
                    text: 'Edit',
                    align: 'right',
                    hidden: true,
                    id: 'btn-enable-editing',
                    hasDisabled: false
                },
                {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Save',
                    align: 'right',
                    hidden: true,
                    id: 'btn-save-values'
                },
                {
                    xtype: 'button',
                    text: 'Refresh',
                    id: 'btn-refresh',
                    ui: 'decline',
                    align: 'right',
                    hidden: false,
                    handler: function() {
                        Ext.StoreMgr.get('Projects').load();
                    }
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


