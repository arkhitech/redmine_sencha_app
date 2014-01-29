Ext.define('RedmineApp.store.Trackers', {
    extend: 'Ext.data.Store',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        model: 'RedmineApp.model.Tracker',
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/trackers',
            format: 'json',
            reader: {
                rootProperty: 'trackers',
                type: 'json'
            }
        },
        autoLoad: true
    }
}
);

