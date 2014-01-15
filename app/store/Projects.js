Ext.define('RedmineApp.store.Projects', {
    extend: 'Ext.data.Store',
    config: {
        model: 'RedmineApp.model.Project',
        proxy: {
            type: 'ajax',
            url: 'http://redmine.arkhitech.com/projects.json?key=9174453938f1629beac1e7431a6a70bcc28b17aa',
            reader: {
                rootProperty: 'projects',
                type: 'json'
            }
        },
        autoLoad: true,
        grouper: {
            groupFn: function(record) {
                return record.get('name').substr(0, 1);
            },
            sortProperty: 'name'
        }





    }


});