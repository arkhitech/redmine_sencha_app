Ext.define('RedmineApp.view.IssueDetail', {
    extend: 'Ext.form.Panel',
    xtype: 'ticketdetail',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List',
        'Ext.field.Text',
        'Ext.field.TextArea',
        'Ext.Container',
        'Ext.form.FieldSet',
        'Ext.MessageBox'
    ],
    config: {
        id: 'issueDetailsPanel',
        title: 'Issue Details',
        fullscreen: true,
        layout: 'vbox',
        listeners: {
            painted: function(element, options) {
                var items = this.config.items;
                var attachments = this.getRecord().data.attachments;
                this.add({
                    xtype: 'textfield',
                    label: 'ATTACHMENTS',
                    readOnly: true
                });
                for (var i = 0; attachments !== undefined && i < attachments.length; i++) {
                    new_items = [
                        {
                            xtype: 'urlfield',
                            label: 'Attachment URL:',
                            value: attachments[i].content_url,
                            readOnly: true
                        },
                        {
                            xtype: 'textfield',
                            label: 'Attachment Creation Date:',
                            value: attachments[i].created_on,
                            readOnly: true
                        },
                        {
                            xtype: 'textareafield',
                            label: 'File Name:',
                            value: attachments[i].filename,
                            readOnly: true
                        }
                    ],
                            this.add(new_items);
                }
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
                        handler: function(btn) {
                            Ext.getCmp('savebutton').hide();
                            var redminefieldset = Ext.getCmp('redmine-fieldset');
                            if (btn.hasDisabled) {
                                btn.hasDisabled = false;
                                btn.setText('Enable Editing');
                                btn.setUi('confirm');
                            }
                            else {
                                btn.hasDisabled = true;
                                Ext.getCmp('issue-estimated-hours').setReadOnly(false);
                                Ext.getCmp('savebutton').show();
                                btn.setText('Disable Editing');
                                btn.setUi('decline');
                            }
                        }
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
                            var form = Ext.getCmp('issueDetailsPanel');
                            console.log(form);
                            var issue = form.getRecord();
                            issue.estimated_hours = form.getValues().estimated_hours;
                            issue.save();
                            //    console.log("Estimated Hours: "+ this.getRecord().data.estimated_hours)
                            Ext.getCmp('issue-estimated-hours').setReadOnly(true);
                            Ext.Msg.alert('Save Successful', 'The estimated hours have been updated to ' + newestimatedhours);
                        }
                    }
                ]
            },
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
            }
        ]
    }
}
);