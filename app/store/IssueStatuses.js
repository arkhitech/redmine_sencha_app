Ext.define('RedmineApp.store.IssueStatuses', {
    extend: 'Ext.data.Store',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        model: 'RedmineApp.model.IssueStatus',
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/issue_statuses',
            format: 'json',
            reader: {
                rootProperty: 'issue_statuses',
                type: 'json'
            }
        },
        autoLoad: true
    }
}
);