Ext.define('RedmineApp.view.IssueDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'ticketdetail',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.field.Text',
        'Ext.field.TextArea'
    ],
    config: {
        title: 'Issue Details',
        fullscreen: true,
        layout: 'vbox',
        xtype: 'fieldset',
        listeners: {
            painted: function(element, options) {
                var items = this.config.items;
                var relations = this.getRecord().data.relations;
                this.add({
                    xtype: 'textfield',
                    label: 'ISSUE RELATED TO',
                    readOnly: true
                });
                for (var i = 0; relations !== undefined && i < relations.length; i++) {
                    this.add({
                        xtype: 'textareafield',
                        label: 'Ticket ID: ',
                        html: relations[i].issue_id, //'<a href="http://redmine.arkhitech.com/issues/"    //+ ">" + relations[i].issue_id </a>',                            
                        readOnly: true
                    });
                }
                var journals = this.getRecord().data.journals;
                this.add({
                    xtype: 'textfield',
                    label: 'JOURNALS',
                    readOnly: true
                });
                for (var i = 0; journals !== undefined && i < journals.length; i++) {
                    new_items = [
                        {
                            xtype: 'textfield',
                            label: 'Created On:',
                            value: journals[i].created_on,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            label: 'User:',
                            value: journals[i].user.name,
                            readOnly: true
                        },
                        {
                            xtype: 'textareafield',
                            label: 'Notes:',
                            value: journals[i].notes,
                            readOnly: true
                        }
                    ],
                            this.add(new_items);
                }
            }
        },
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
                name: 'project',
                readOnly: true
            },
            {
                xtype: 'textfield',
                label: 'Tracker',
                name: 'tracker',
                readOnly: true
            },
            {
                xtype: 'textfield',
                label: 'Issue Status',
                name: 'status',
                readOnly: true
            },
            {
                xtype: 'textfield',
                label: 'Priority',
                name: 'priority',
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
                readOnly: true

            },
            {
                xtype: 'textfield',
                label: 'Start Date',
                name: 'start_date',
                readOnly: true

            },
            {
                xtype: 'textfield',
                label: 'Due Date',
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
                label: 'Attachments',
                name: 'attachments',
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
    }
}
);