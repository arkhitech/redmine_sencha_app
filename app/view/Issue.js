Ext.define('RedmineApp.view.Issue', {
    extend: 'Ext.form.Panel',
    xtype: 'issueview',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.field.Text',
        'Ext.field.TextArea',
        'Ext.Container',
        'Ext.form.FieldSet',
        'Ext.MessageBox',
        'Ext.field.Select',
        'RedmineApp.model.Project'
    ],
    config: {
        id: 'issue-panel',
        title: 'Issue Details',
        fullscreen: true,
        layout: 'vbox',
        listeners: {
//            doubletap: function(e) {
//                Ext.getCmp('issue-estimated-hours').setReadOnly(false);
//                Ext.getCmp('issue-estimated-hours').setStyle({backgroundColor: '#BA661B'});
//                Ext.getCmp('issue-start-date').setReadOnly(false);
//                Ext.getCmp('issue-start-date').setStyle({backgroundColor: '#BA661B'});
//                Ext.getCmp('issue-due-date').setReadOnly(false);
//                Ext.getCmp('issue-due-date').setStyle({backgroundColor: '#BA661B'});
//                Ext.getCmp('newEmptyNode').setReadOnly(false);
//                Ext.getCmp('newEmptyNode').setStyle({backgroundColor: '#BA661B'});
//                Ext.getCmp('issue-description').setReadOnly(false);
//                Ext.getCmp('issue-description').setStyle({backgroundColor: '#BA661B'});
//                Ext.getCmp('issue-priority').setReadOnly(false);
//                Ext.getCmp('issue-priority').setStyle({backgroundColor: '#BA661B'});
//                Ext.getCmp('issue-tracker').setReadOnly(false);
//                Ext.getCmp('issue-tracker').setStyle({backgroundColor: '#BA661B'});
//                Ext.getCmp('savebutton').show();
//            }
        },
        items: [
            {
                xtype: 'fieldset',
                id: 'redmine-fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Issue ID',
                        name: 'id',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Project',
                        name: 'project_name',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Tracker',
                        id: 'issue-tracker',
                        name: 'tracker_name',
                        //store: 'Trackers',
                        valueField: 'id',
                        displayField: 'name',
                        //readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: 'Issue Status',
                        name: 'status_name',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Priority',
                        id: 'issue-priority',
                        name: 'priority_name',
                        readOnly: true,
                        store: 'IssuePriorities',
                        valueField: 'id',
                        displayField: 'name'
                    },
                    {
                        xtype: 'textfield',
                        label: 'Author',
                        name: 'author',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Assigned to',
                        name: 'assigned_to',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Category',
                        name: 'category',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Fixed Version',
                        name: 'fixed_version',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Subject',
                        name: 'subject',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Issue Description',
                        name: 'description',
                        id: 'issue-description',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Start Date',
                        id: 'issue-start-date',
                        name: 'start_date',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Due Date',
                        id: 'issue-due-date',
                        name: 'due_date',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Done Ratio',
                        name: 'done_ratio',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Estimated Hours',
                        id: 'issue-estimated-hours',
                        name: 'estimated_hours',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: 'Spent Hours',
                        name: 'spent_hours',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Created On',
                        name: 'created_on',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Updated On',
                        name: 'updated_on',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Changesets',
                        name: 'changesets',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Story Points',
                        name: 'story_points',
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        style: 'margin: .5em',
                        ui: 'confirm',
                        width: '25%',
                        text: 'Enable Editing',
                        scope: this,
                        hasDisabled: false,
                        id: 'btn-enable-editing'
                    },
                    {
                        xtype: 'button',
                        id: 'savebutton',
                        style: 'margin: .5em',
                        ui: 'confirm',
                        width: '25%',
                        text: 'Save',
                        scope: this,
                        hidden: true,
                        handler: function(btn) {                            
                            var form = Ext.getCmp('issue-panel');
                            var issue = form.getRecord();
                            issue.set('estimated_hours', form.getValues().estimated_hours);
                            issue.set('description', form.getValues().description);
                            issue.set('due_date', form.getValues().due_date);
                            issue.set('start_date', form.getValues().start_date);
                            issue.set('notes', form.getValues().notes);
                            issue.save();
                            Ext.getCmp('issue-estimated-hours').setReadOnly(true);
                            Ext.getCmp('newEmptyNode').setReadOnly(true);
                            Ext.getCmp('issue-description').setReadOnly(true);
                            Ext.getCmp('issue-start-date').setReadOnly(true);
                            Ext.getCmp('issue-due-date').setReadOnly(true);
                            Ext.Msg.alert('Save Successful', 'The values have been updated');
                        }
                    }
                ]
            }

        ]
    }
}
);