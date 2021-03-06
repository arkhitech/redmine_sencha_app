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
        'Ext.field.Toggle',
        'Ext.form.Panel'
    ],
    config: {
        itemId: 'issue-panel',
        title: 'Issue Details',
        layout: 'vbox',
        items: [
            {
                xtype: 'fieldset',
                layout: {
                    type: 'fit',
                    align: 'center'
                },
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Issue ID',
                        itemId: 'issue-id',
                        name: 'id',
                        readOnly: true,
                    },
                    {
                        xtype: 'textfield',
                        label: 'Project',
                        name: 'project_name',
                        itemId: 'issue-project',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Tracker',
                        itemId: 'issue-tracker',
                        name: 'tracker_name',
                        valueField: 'id',
                        displayField: 'name',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Issue Status',
                        store: 'IssueStatuses',
                        itemId: 'issue-status',
                        name: 'status_name',
                        valueField: 'id',
                        displayField: 'name',
                        readOnly: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Priority',
                        itemId: 'issue-priority',
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
                        name: 'raw.assigned_to',
                        readOnly: true

                    },
                    {
                        xtype: 'selectfield',
                        itemId: 'issue-category',
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
                        itemId: 'issue-fixed-version',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Subject',
                        name: 'subject',
                        itemId: 'issue-subject',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Issue Description',
                        name: 'description',
                        itemId: 'issue-description',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Start Date',
                        itemId: 'issue-start-date',
                        name: 'start_date',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Due Date',
                        itemId: 'issue-due-date',
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
                        itemId: 'issue-estimated-hours',
                        name: 'estimated_hours',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        label: 'Spent Hours',
                        name: 'spent_hours',
                        itemId: 'issue-spent-hours',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Created On',
                        name: 'created_on',
                        itemId: 'issue-created-on',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Updated On',
                        name: 'updated_on',
                        itemId: 'issue-updated-on',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Changesets',
                        name: 'changesets',
                        itemId: 'issue-changesets',
                        readOnly: true

                    },
                    {
                        xtype: 'textfield',
                        label: 'Story Points',
                        name: 'story_points',
                        itemId: 'issue-story-points',
                        readOnly: true
                    }
                ]
            },
//            {
//                xtype: 'togglefield',
//                name: 'historytoggle',
//                layout: {
//                    pack: 'center'
//                },
//                label: 'Show Issue History',
//                listeners: {
//                    change: function(slider, thumb, newValue, oldValue) {
//                        var attachments = Ext.getCmp('attachment-sub-fieldset');
//                        var relations = Ext.getCmp('issue-relations');
//                        var journals = Ext.getCmp('issue-journals');
//
//                        if (oldValue === 0 && newValue === 1) {
//                            attachments.show();
//                            relations.show();
//                            journals.show();
//                        }
//                        else if (oldValue === 1 && newValue === 0)
//                        {
//                            attachments.hide();
//                            relations.hide();
//                            journals.hide();
//                        }
//                    }
//                }
//            }
            {
                xtype: 'container',
                layout: {
                    type: 'hbox',
                    pack: 'center'
                },
                items: [
                    {
                        xtype: 'button',
                        itemId: 'btn-show-history',
                        style: 'margin: .5em',
                        ui: 'confirm',
                        width: '25%',
                        text: 'Show History',
                        hidden: false
                    },
                    {
                        xtype: 'button',
                        itemId: 'btn-new-note',
                        style: 'margin: .5em',
                        ui: 'confirm',
                        width: '25%',
                        text: 'Add New Note'
                    },
                    {
                        xtype: 'button',
                        itemId: 'btn-new-note-save',
                        style: 'margin: .5em',
                        ui: 'decline',
                        width: '25%',
                        text: 'Save New Note',
                        hidden: true
                    }
                ]
            }
        ]
    }

}
);