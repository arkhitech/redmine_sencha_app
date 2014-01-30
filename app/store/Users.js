Ext.define('RedmineApp.store.Users', {
    extend: 'Ext.data.Store',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        model: 'RedmineApp.model.User',
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/users',
            format: 'json',
            extraParams: {
                include: 'memberships,groups'
            },
            reader: {
                rootProperty: 'users',
                type: 'json'
            }
        },
        autoLoad: true
    }
}
);