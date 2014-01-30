Ext.define('RedmineApp.model.IssueStatus', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            'id',
            'name',
            {name: 'is_default', defaultValue: false},
            {name: 'is_closed', defaultValue: false}
        ]
    }
});