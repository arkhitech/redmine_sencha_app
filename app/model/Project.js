Ext.define('RedmineApp.model.Project', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'},
            {name: 'identifier', type: 'string'},
            {name: 'description', type: 'string'},
            {name: 'parent'},
            {name: 'created_on', type: 'auto'},
            {name: 'updated_on', type: 'string'}
        ]

    }

});


