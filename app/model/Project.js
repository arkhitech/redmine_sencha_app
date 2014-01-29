Ext.define('RedmineApp.model.Project', {
    extend: 'Ext.data.Model',
    requires: ['RedmineApp.proxy.DynamicRest'],
    config: {
        fields: [
            {name: 'id'},
            {name: 'name'},
            {name: 'identifier'},
            {name: 'description'},
            {name: 'parent'},
            {name: 'created_on'},
            {name: 'updated_on'}
        ],
        hasMany: [
            {model: 'RedmineApp.model.Issue', name: 'issues'},
            {model: 'RedmineApp.model.Tracker', name: 'trackers'},
            {model: 'RedmineApp.model.IssueCategory', name: 'issue_categories'}
        ],
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/projects/',
            format: 'json',
            reader: {
                rootProperty: 'project',
                type: 'json'
            },
            extraParams: {
                include: 'trackers,issue_categories'
            }
        }
    }

});


