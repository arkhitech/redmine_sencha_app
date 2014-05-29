Ext.define('RedmineApp.store.Projects', {
    extend: 'Ext.data.Store',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        model: 'RedmineApp.model.Project',
        autoLoad: true,
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/projects',
            format: 'json',
            reader: {
                rootProperty: 'projects',
                type: 'json'
            }
        },
        grouper: {
            groupFn: function(record) {
                return record.get('name').substr(0, 1);
            },
            sortProperty: 'name'
        }
    }
});
