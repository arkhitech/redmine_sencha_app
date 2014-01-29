Ext.define('RedmineApp.model.IssueCategory', {
    extend: 'Ext.data.Model',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        fields: ['id', 'name'],
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/trackers',
            format: 'json',
            reader: {
                rootProperty: 'trackers',
                type: 'json'
            }
        }
    }
    }
    );

