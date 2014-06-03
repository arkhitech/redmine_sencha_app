Ext.define('RedmineApp.view.RedmineIssuesNavigator', {
    extend: 'Ext.navigation.View',
    xtype: 'redmine-issues-navigator',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.Button',
        'Ext.form.Panel'
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
        autoDestroy: true,
        showAnimation: null,
        flex: 1,
        navigationBar: {
            ui: 'sencha',
            items: [
                {
                    xtype: 'button',
                    ui: 'action',
                    text: 'Edit',
                    iconCls: 'action',
                    iconMask: true,
                    align: 'right',
                    hidden: true,
                    itemId: 'btn-enable-editing',
                    hasDisabled: false
                },
                {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Save',
                    iconCls: 'organize',
                    iconMask: true,
                    align: 'right',
                    hidden: true,
                    itemId: 'btn-save-values'
                },
                {
                    xtype: 'button',
                    text: 'Refresh',
                    iconCls: 'refresh',
                    iconMask: true,
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
        items: [{
                xtype: 'formpanel',
                layout: 'vbox',
                title: 'Select a Project',
                items: [
                    {
                        xtype: 'list',
                        itemId: 'projectlist',
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
});


