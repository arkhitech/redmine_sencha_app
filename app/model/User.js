Ext.define('RedmineApp.model.User', {
    extend: 'Ext.data.Model',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        fields: ['id', 'name'],
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/users',
            format: 'json',
            reader: {
                rootProperty: 'user',
                type: 'json'
            },
            extraParams: {
                include: 'memberships,groups'
            }
        }
    }
    }
    );

