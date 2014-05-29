Ext.define('RedmineApp.model.IssuePriority', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id',
            'name',
            {name: 'is_default', defaultValue: false}
        ]
    }
});

