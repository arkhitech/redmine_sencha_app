Ext.define('RedmineApp.store.Issues', {
    extend: 'Ext.data.Store',
    config: {
        model: 'RedmineApp.model.Issue',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'http://redmine.arkhitech.com/projects/arkhitech-website/issues.json?key=9174453938f1629beac1e7431a6a70bcc28b17aa&include=relations,changesets,journals,attachments',
            reader: {
                rootProperty: 'issues',
                type: 'json'
            }
        },
        grouper: {
            groupFn: function(record) {
                return record.get('subject').substr(0, 1);
            },
            sortProperty: 'subject'
        }




    }

});