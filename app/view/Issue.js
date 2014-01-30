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
        'Ext.field.Toggle'
    ],
    config: {
        id: 'issue-panel',
        title: 'Issue Details',
        fullscreen: true,
        layout: 'vbox',
        items: [
//            {
//                xtype: 'container',
//                layout: {
//                    type: 'hbox',
//                    pack: 'center'
//                },
//                items: [
//                    {
//                        xtype: 'button',
//                        id: 'savebutton',
//                        style: 'margin: .5em',
//                        ui: 'confirm',
//                        width: '25%',
//                        text: 'Save',
//                        scope: this,
//                        hidden: true                       
//                    }
//                ]
//            },
            {
                xtype: 'fieldset',
                id: 'redmine-fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Issue ID',
                        id: 'issue-id',
                        name: 'id',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Project',
                        name: 'project_name',
                        id: 'issue-project',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Tracker',
                        id: 'issue-tracker',
                        name: 'tracker_name',
                        valueField: 'id',
                        displayField: 'name',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Issue Status',
                        store: 'IssueStatuses',
                        id: 'issue-status',
                        name: 'status_name',
                        valueField: 'id',
                        displayField: 'name',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Priority',
                        id: 'issue-priority',
                        name: 'priority_name',
                        store: 'IssuePriorities',
                        valueField: 'id',
                        displayField: 'name',
                        readOnly: true

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
                        xtype: 'selectfield',
                        id: 'issue-category',
                        label: 'Category',
                        name: 'category_name',
                        valueField: 'id',
                        displayField: 'name',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: 'Fixed Version',
                        name: 'fixed_version',
                        id: 'issue-fixed-version',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Subject',
                        name: 'subject',
                        id: 'issue-subject',
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
                        id: 'issue-spent-hours',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Created On',
                        name: 'created_on',
                        id: 'issue-created-on',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Updated On',
                        name: 'updated_on',
                        id: 'issue-updated-on',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Changesets',
                        name: 'changesets',
                        id: 'issue-changesets',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Story Points',
                        name: 'story_points',
                        id: 'issue-story-points',
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'togglefield',
                name: 'historytoggle',
                layout: {
                    pack: 'center'
                },
                label: 'Show Issue History',
                listeners: {
                    change: function(slider, thumb, newValue, oldValue) {
                        var attachments = Ext.getCmp('issue-attachments');
                        var relations = Ext.getCmp('issue-relations');
                        var journals = Ext.getCmp('issue-journals');

                        if (oldValue === 0 && newValue === 1) {
                            attachments.show();
                            relations.show();
                            journals.show();
                        }
                        else if (oldValue === 1 && newValue === 0)
                        {
                            attachments.hide();
                            relations.hide();
                            journals.hide();
                        }
                    }
                }
            }
        ]
    }
}
);