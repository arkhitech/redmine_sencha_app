Ext.define('RedmineApp.model.Issue', {
    extend: 'Ext.data.Model',
    requires: ['RedmineApp.proxy.DynamicRest',
        'Ext.data.writer.Xml'],
    config: {
        fields: [
            {name: 'id'},
            {name: 'project_id', type: 'int'},
            {name: 'project_name', mapping: 'project.name', persist: false},
            {name: 'tracker_id'},
            {name: 'tracker_name', mapping: 'tracker.name', persist: false},
            {name: 'status_id'},
            {name: 'status_name', mapping: 'status.name', persist: false},
            {name: 'priority_id'},
            {name: 'priority_name', mapping: 'priority.name', persist: false},
            {name: 'author_id'},
            {name: 'author', mapping: 'author.name', persist: false},
            {name: 'assigned_to_id'},
            {name: 'assigned_to', mapping: 'assigned_to.name', persist: false},
            {name: 'category_id'},
            {name: 'category_name', mapping: 'category.name', persist: false},
            {name: 'fixed_version', mapping: 'fixed_version.name', persist: false},
            {name: 'subject'},
            {name: 'description'},
            {name: 'start_date'},
            {name: 'due_date'},
            {name: 'done_ratio'},
            {name: 'estimated_hours'},
            {name: 'spent_hours'},
            {name: 'created_on'},
            {name: 'updated_on'},
            {name: 'story_points'},
            {name: 'custom_fields', persist: false},
            {name: 'relations', mapping: 'relations', persist: false},
            {name: 'attachments', mapping: 'attachments', persist: false},
            {name: 'changesets', mapping: 'changesets', persist: false},
            {name: 'journals', persist: false}
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
                type: 'xml',
                writeAllFields: false

            },
            extraParams: {
                include: 'relations,changesets,journals,attachments'
            }
        }
    }
});


