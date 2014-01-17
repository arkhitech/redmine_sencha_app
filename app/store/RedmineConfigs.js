Ext.define('RedmineApp.store.RedmineConfigs', {
    extend: 'Ext.data.Store',
    config: {
        model: 'RedmineApp.model.RedmineConfig',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'redmine_config'
        }
    }
});