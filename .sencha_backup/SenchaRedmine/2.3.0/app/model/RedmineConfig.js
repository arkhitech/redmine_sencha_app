Ext.define('RedmineApp.model.RedmineConfig', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'redmine_url',
            'redmine_access_key'
        ]
    }
});