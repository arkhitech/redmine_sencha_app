Ext.define('RedmineApp.store.IssueDetails', {
    extend: 'Ext.data.Store',
    config: {
        model: 'RedmineApp.model.Issue',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'http://redmine.arkhitech.com/issues/43.json?key=9174453938f1629beac1e7431a6a70bcc28b17aa&include=relations,changesets,journals,attachments',
            reader: {
                rootProperty: 'issue',
                type: 'json'
            }
        }
    }
});