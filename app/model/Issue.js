Ext.define('RedmineApp.model.Issue', {
    extend: 'Ext.data.Model',
    requires: ['RedmineApp.proxy.DynamicRest',
        'Ext.data.writer.Xml'],
    config: {
        fields: [
            {name: 'id', type: 'auto', mapping: 'id'},
            {name: 'project', type: 'auto', mapping: 'project.name'},
            {name: 'tracker', type: 'auto', mapping: 'tracker.name'},
            {name: 'status', type: 'auto', mapping: 'status.name'},
            {name: 'priority', type: 'auto', mapping: 'priority.name'},
            {name: 'author', type: 'auto', mapping: 'author.name'},
            {name: 'assigned_to', type: 'auto', mapping: 'assigned_to.name'},
            {name: 'category', type: 'auto', mapping: 'category.name'},
            {name: 'fixed_version', type: 'auto', mapping: 'fixed_version.name'},
            {name: 'subject', type: 'auto', mapping: 'subject'},
            {name: 'description', type: 'auto', mapping: 'description'},
            {name: 'start_date', type: 'auto', mapping: 'start_date'},
            {name: 'due_date', type: 'auto', mapping: 'due_date'},
            {name: 'done_ratio', type: 'auto', mapping: 'done_ratio'},
            {name: 'estimated_hours', type: 'auto', mapping: 'estimated_hours'},
            {name: 'spent_hours', type: 'auto', mapping: 'spent_hours'},
                        {name: 'created_on', type: 'auto', mapping: 'created_on'},
            {name: 'updated_on', type: 'auto', mapping: 'updated_on'},
            {name: 'story_points', type: 'auto', mapping: 'story_points'},
            {name: 'custom_fields', type: 'auto', mapping: 'custom_fields', persist: false},
            {name: 'relations', type: 'auto', mapping: 'relations', persist: false},
            {name: 'attachments', type: 'auto', mapping: 'attachments', persist: false},
            {name: 'changesets', type: 'auto', mapping: 'changesets', persist: false},
            {name: 'journals', type: 'auto', mapping: 'journals', persist: false}
        ],
        proxy: {
            type: 'dynamicrest',
            resourcePath: '/issues/',
            format: 'json',
            reader: {
                rootProperty: 'issue',
                type: 'json'
            },
            writer: {
                documentRoot: undefined,
                defaultDocumentRoot: undefined,
                record: 'issue',
                rootProperty: 'issue',
                type: 'xml'
                
            },
            extraParams: {
                include: 'relations,changesets,journals,attachments'
            }
        }
    }
});


