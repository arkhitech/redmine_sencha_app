Ext.define('RedmineApp.model.User', {
    extend: 'Ext.data.Model',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        fields: ['id', 'name']
    }
}
);

