Ext.define('RedmineApp.view.IssueHistory', {
    extend: 'Ext.form.Panel',
    xtype: 'issuehistoryview',
    requires: [
        'Ext.TitleBar',
        'Ext.field.Text',
        'Ext.form.FieldSet'
    ],
    config: {
        title: 'Issue History',       
        layout: 'vbox',
        items: [
            {
                xtype: 'fieldset',
                layout: {
                    type: 'fit',
                    align: 'center'
                }
            }
        ]
    }
}
);