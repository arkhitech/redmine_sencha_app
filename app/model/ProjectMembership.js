Ext.define('RedmineApp.model.ProjectMembership', {
    extend: 'Ext.data.Model',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        fields: ['id', 'project', 'user', 'roles'],
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/issues/',
            format: 'json',
            reader: {
                rootProperty: 'issue',
                type: 'json'
            }
        }
    }
});


