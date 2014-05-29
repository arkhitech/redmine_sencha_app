Ext.define('RedmineApp.store.IssuePriorities', {
    extend: 'Ext.data.Store',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        model: 'RedmineApp.model.IssuePriority',
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/enumerations/issue_priorities',
            format: 'json',
            reader: {
                rootProperty: 'issue_priorities',
                type: 'json'
            }
        },
        autoLoad: true
    }
}
);

