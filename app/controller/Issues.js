Ext.define('RedmineApp.controller.Issues', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        views: ['ProjectIssues', 'Issue'],
        refs: {
            projectIssueList: '#project-issue-list',
            issueTracker: '#issue-tracker',
            btnEnableEditing: '#btn-enable-editing',
            issuePanel: '#issue-panel',
            redmineTabPanel: '#redmine-tab-panel',
            redmineIssuesNavigator: '#redmine-issues-navigator'
        },
        control: {
            projectIssueList: {
                disclose: 'showIssue'
            },
            btnEnableEditing: {
                tap: 'enableEditing'
            },
            issuePanel: {
                initialize: 'initializeIssuePanel'
            }
        },
        routes: {
            'project/:project_id/issue/:id': 'showIssueById'
        }
    },
    statics: {
        isClickInProcess: false
    },
    initializeIssuePanel: function(issuePanel, eOpts ) {
        Ext.getCmp('editButton').show();
        this.getIssueTracker().setStore(RedmineApp.app.getCurrentProjectTrackers());
        issuePanel.setRecord(this.issue);
        //issuePanel.getItems().items[0].getComponent('issue-tracker').setStore(RedmineApp.app.getCurrentProjectTrackers());
        var attachments = issuePanel.getRecord().data.attachments;
        issuePanel.add({
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
                    issuePanel.add(new_items);
        }
        var relations = issuePanel.getRecord().data.relations;
        issuePanel.add({
            xtype: 'textfield',
            label: 'ISSUE RELATED TO',
            readOnly: true
        });
        for (var i = 0; relations !== undefined && i < relations.length; i++) {
            issuePanel.add({
                xtype: 'textareafield',
                label: 'Ticket ID: ',
                html: relations[i].issue_id, //'<a href="http://redmine.arkhitech.com/issues/"    //+ ">" + relations[i].issue_id </a>',                            
                readOnly: true
            });
        }
        var journals = issuePanel.getRecord().data.journals;
        issuePanel.add({
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
                    name: 'journal_note',
                    value: journals[i].notes,
                    readOnly: true
                }
            ],
                    issuePanel.add(new_items);
        }
        //create an empty editable journal note entry
        new_items = [
            {
                xtype: 'textareafield',
                id: 'newEmptyNode',
                label: 'Notes:',
                name: 'notes',
                readOnly: true
            }
        ],
                issuePanel.add(new_items);
    },
    enableEditing: function(btn) {
        this.getIssueTracker().setStore(RedmineApp.app.getCurrentProjectTrackers());
        Ext.getCmp('savebutton').hide();
        if (btn.hasDisabled) {
            btn.hasDisabled = false;
            btn.setText('Enable Editing');
            btn.setUi('confirm');
        }
        else {
            btn.hasDisabled = true;
            Ext.getCmp('issue-estimated-hours').setReadOnly(false);
            Ext.getCmp('issue-estimated-hours').setStyle({backgroundColor: '#BA661B'});
            Ext.getCmp('issue-start-date').setReadOnly(false);
            Ext.getCmp('issue-start-date').setStyle({backgroundColor: '#BA661B'});
            Ext.getCmp('issue-due-date').setReadOnly(false);
            Ext.getCmp('issue-due-date').setStyle({backgroundColor: '#BA661B'});
            Ext.getCmp('newEmptyNode').setReadOnly(false);
            Ext.getCmp('newEmptyNode').setStyle({backgroundColor: '#BA661B'});
            Ext.getCmp('issue-description').setReadOnly(false);
            Ext.getCmp('issue-description').setStyle({backgroundColor: '#BA661B'});
            Ext.getCmp('issue-priority').setReadOnly(false);
            Ext.getCmp('issue-priority').setStyle({backgroundColor: '#BA661B'});
            Ext.getCmp('issue-tracker').setReadOnly(false);
            Ext.getCmp('issue-tracker').setStyle({backgroundColor: '#BA661B'});
            Ext.getCmp('savebutton').show();
            btn.setText('Disable Editing');
            btn.setUi('decline');
        }
    },
    issue: null,
    showIssueById: function(project_id, issue_id) {
        RedmineApp.app.loadProjectSettings(project_id);
        
        var Issue = Ext.ModelManager.getModel('RedmineApp.model.Issue');        
        Issue.load(issue_id, {
            scope: this,
            success: function(issue, operation) {
                this.issue = issue;
                
                var issue_view = Ext.create('RedmineApp.view.Issue');
                this.getRedmineTabPanel().setActiveItem(1);
                this.getRedmineIssuesNavigator().push(issue_view);
            }
        });        
    },
    showIssue: function(list, issue, node, index, event, eOpts) {
        if (RedmineApp.controller.Issues.isClickInProcess) {
            console.log("Click is already in process, so ignoring");
            return;
        }
        RedmineApp.controller.Issues.isClickInProcess = true;
        var Issue = Ext.ModelManager.getModel('RedmineApp.model.Issue');
        Issue.load(issue.data.id, {
            scope: this,
            success: function(issue, operation) {
                this.issue = issue;
                var issue_view = Ext.create('RedmineApp.view.Issue');
                list.up('redmine-issues-navigator').push(issue_view);
                RedmineApp.controller.Issues.isClickInProcess = false;
            }
        });
    }
});

