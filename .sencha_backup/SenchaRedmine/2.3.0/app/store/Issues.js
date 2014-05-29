Ext.define('RedmineApp.store.Issues', {
    extend: 'Ext.data.Store',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        model: 'RedmineApp.model.Project',
        autoLoad: true,
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/issues/',
            format: 'json',
            reader: {
                rootProperty: 'issue',
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
