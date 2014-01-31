Ext.define('RedmineApp.controller.Issues', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        views: ['ProjectIssues', 'Issue', 'IssueHistory'],
        refs: {
            projectIssueList: '#project-issue-list',
            issueTracker: '#issue-tracker',
            issueCategory: '#issue-category',
            btnEnableEditing: '#btn-enable-editing',
            btnRefresh: '#btn-refresh',
            btnSaveInfo: '#btn-save-values',
            issuePanel: '#issue-panel',
            redmineTabPanel: '#redmine-tab-panel',
            redmineIssuesNavigator: '#redmine-issues-navigator',
            issueID: '#issue-id',
            issueProject: '#issue-project',
            issueFixedVersion: '#issue-fixed-version',
            issueCreatedOn: '#issue-created-on',
            issueUpdatedOn: '#issue-updated-on',
            issueSpentHours: '#issue-spent-hours',
            issueSubject: '#issue-subject',
            issueEstimatedHours: '#issue-estimated-hours',
            issueStartDate: '#issue-start-date',
            issueDueDate: '#issue-due-date',
            newEmptyNode: '#newEmptyNode',
            issueDescription: '#issue-description',
            issuePriority: '#issue-priority',
            issueStoryPoints: '#issue-story-points',
            issueStatus: '#issue-status',
            issueChangesets: '#issue-changesets',
            btnNewNoteSave: '#btn-new-note-save',
            btnNewNote: '#btn-new-note',
            btnShowHistory: '#btn-show-history',
            attachmentSubFieldset: '#attachment-sub-fieldset',
            relationsSubFieldset: '#relations-sub-fieldset',
            journalsSubFieldset: '#journals-sub-fieldset',
            historyPanel: '#issue-history-panel'

        },
        control: {
            projectIssueList: {
                disclose: 'showIssue'
            },
            btnEnableEditing: {
                tap: 'enableEditing'
            },
            btnSaveInfo: {
                tap: 'saveInfo'
            },
            issuePanel: {
                initialize: 'initializeIssuePanel'
            },
            historyPanel: {
                initialize: 'initializeHistoryPanel'
            },
            btnNewNoteSave: {
                tap: 'saveNewNoteValue'
            },
            btnNewNote: {
                tap: 'showNewNoteField'
            },
            btnShowHistory: {
                tap: 'showIssueHistoryFields'
            }
        },
        routes: {
            'project/:project_id/issue/:id': 'showIssueById'
        }
    },
    statics: {
        isClickInProcess: false
    },
    initializeHistoryPanel: function(historyPanel, eOpts) {
        historyPanel.setRecord(this.issue);
        var attachments = historyPanel.getRecord().data.attachments;
        historyPanel.add(
                {
                    xtype: 'textfield',
                    id: 'issue-attachments',
                    label: 'ATTACHMENTS',
                    readOnly: true,
                    hidden: true
                }
        );
        for (var i = 0; attachments !== undefined && i < attachments.length; i++) {
            var new_item = {
                xtype: 'fieldset',
                items: [
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
                ]
            };
            historyPanel.add(new_item);
        }
        var relations = historyPanel.getRecord().data.relations;
        historyPanel.add(
                {
                    xtype: 'textfield',
                    label: 'ISSUE RELATED TO',
                    readOnly: true,
                    id: 'issue-relations',
                    hidden: true
                });
        for (var i = 0; relations !== undefined && i < relations.length; i++) {
            var new_item = {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textareafield',
                        label: 'Ticket ID: ',
                        html: relations[i].issue_id, //'<a href="http://redmine.arkhitech.com/issues/"    //+ ">" + relations[i].issue_id </a>',                            
                        readOnly: true
                    }
                ]
            };
            historyPanel.add(new_item);
        }
        var journals = historyPanel.getRecord().data.journals;
        historyPanel.add(
                {
                    xtype: 'textfield',
                    label: 'JOURNALS',
                    readOnly: true,
                    id: 'issue-journals',
                    hidden: true
                });
        for (var i = 0; journals !== undefined && i < journals.length; i++) {
            var new_item = {
                xtype: 'fieldset',
                items: [
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
                ]
            };
            historyPanel.add(new_item);
        }
    },
    initializeIssuePanel: function(issuePanel, eOpts) {
        this.getBtnEnableEditing().show();
        this.getIssueCategory().setStore(RedmineApp.app.getCurrentProjectIssueCategories());
        this.getIssueTracker().setStore(RedmineApp.app.getCurrentProjectTrackers());
        issuePanel.setRecord(this.issue);
        var projectIdentifier = issuePanel.getRecord().data.identifier;
        RedmineApp.app.setCurrentProjectIdentifier(projectIdentifier);
        //create an empty editable journal note entry
        new_items = [
            {
                xtype: 'textareafield',
                id: 'newEmptyNode',
                label: 'Enter a New Note',
                name: 'notes',
                hidden: true
            }
        ],
                issuePanel.add(new_items);
    },
    enableEditing: function(btn) {

        this.getIssueTracker().setStore(RedmineApp.app.getCurrentProjectTrackers());
        this.getIssueCategory().setStore(RedmineApp.app.getCurrentProjectIssueCategories());
        if (btn.hasDisabled) {
            btn.hasDisabled = false;
            btn.setUi('confirm');
        }
        else {
            btn.hasDisabled = true;
            this.getIssueID().disable();
            this.getIssueProject().disable();
            this.getIssueFixedVersion().disable();
            this.getIssueCreatedOn().disable();
            this.getIssueUpdatedOn().disable();
            this.getIssueSpentHours().disable();
            this.getIssueSubject().disable();
            this.getIssueChangesets().disable();
            this.getIssueEstimatedHours().setReadOnly(false);
            this.getIssueEstimatedHours().setStyle({backgroundColor: '#BA661B'});
            this.getIssueStartDate().setReadOnly(false);
            this.getIssueStartDate().setStyle({backgroundColor: '#BA661B'});
            this.getIssueDueDate().setReadOnly(false);
            this.getIssueDueDate().setStyle({backgroundColor: '#BA661B'});
            this.getIssueDescription().setReadOnly(false);
            this.getIssueDescription().setStyle({backgroundColor: '#BA661B'});
            this.getIssuePriority().setReadOnly(false);
            this.getIssuePriority().setStyle({backgroundColor: '#BA661B'});
            this.getIssueTracker().setReadOnly(false);
            this.getIssueTracker().setStyle({backgroundColor: '#BA661B'});
            this.getIssueStoryPoints().setReadOnly(false);
            this.getIssueStoryPoints().setStyle({backgroundColor: '#BA661B'});
            this.getIssueStatus().setReadOnly(false);
            this.getIssueStatus().setStyle({backgroundColor: '#BA661B'});
            this.getIssueCategory().setReadOnly(false);
            this.getIssueCategory().setStyle({backgroundColor: '#BA661B'});
            btn.hide();
            this.getBtnSaveInfo().show();
            this.getBtnNewNoteSave().hide();
            this.getBtnNewNote().hide();
            this.getBtnShowHistory().hide();
        }
    },
    saveInfo: function(btn) {
        var form = this.getIssuePanel();
        var issue = form.getRecord();
        issue.set('estimated_hours', form.getValues().estimated_hours);
        issue.set('description', form.getValues().description);
        issue.set('due_date', form.getValues().due_date);
        issue.set('start_date', form.getValues().start_date);
        issue.set('priority_id', form.getValues().priority_name);
        issue.set('tracker_id', form.getValues().tracker_name);
        issue.set('status_id', form.getValues().status_name);
        issue.set('category_id', form.getValues().category_name);
        issue.set('issue-story-points', form.getValues().story_points);
        issue.save();
        this.getIssueID().enable();
        this.getIssueProject().enable();
        this.getIssueFixedVersion().enable();
        this.getIssueCreatedOn().enable();
        this.getIssueUpdatedOn().enable();
        this.getIssueSpentHours().enable();
        this.getIssueSubject().enable();
        this.getIssueChangesets().enable();
        this.getIssueEstimatedHours().setReadOnly(true);
        this.getNewEmptyNode().setReadOnly(true);
        this.getIssueDescription().setReadOnly(true);
        this.getIssueStartDate().setReadOnly(true);
        this.getIssueDueDate().setReadOnly(true);
        this.getIssuePriority().setReadOnly(true);
        this.getIssueTracker().setReadOnly(true);
        this.getIssueStatus().setReadOnly(true);
        this.getIssueCategory().setReadOnly(true);
        Ext.Msg.alert('Save Successful', 'The values have been updated');
        this.getBtnSaveInfo().hide();
        this.getBtnEnableEditing().show();
        this.getBtnEnableEditing().setUi('decline');
    },
    issue: null,
    issueView: null,
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
    refreshIssue: function(btn) {
        var Issue = Ext.ModelManager.getModel('RedmineApp.model.Issue');
        Issue.load(this.issue.data.id, {
            scope: this,
            success: function(issue, operation) {
                this.issue = issue;
                var form = this.getIssuePanel();
                form.setRecord(issue);
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
                var issueView = Ext.create('RedmineApp.view.Issue');
                this.getRedmineIssuesNavigator().setCurrentRefreshListener(this.refreshIssue, this);
                list.up('redmine-issues-navigator').push(issueView);
                var me = this;
                issueView.addListener('remove', function() {
                    me.getBtnEnableEditing().hide();
                });
                RedmineApp.controller.Issues.isClickInProcess = false;
            }
        });
    },
    saveNewNoteValue: function(btn) {
        var form = this.getIssuePanel();
        var issue = form.getRecord();
        this.issue.set('notes', form.getValues().notes);
        this.issue.save();
        Ext.Msg.alert('New Note Saved Successfully');
    },
    showNewNoteField: function(btn) {


        this.getNewEmptyNode().show();
        this.getBtnNewNoteSave().show();
        this.getBtnNewNote().hide();
        this.getBtnShowHistory().hide();
    },
    showIssueHistoryFields: function(btn) {
        var issue_history_view = Ext.create('RedmineApp.view.IssueHistory');
        this.getRedmineIssuesNavigator().push(issue_history_view);
        this.getNewEmptyNode().hide();
        this.getBtnEnableEditing().hide();
        this.getBtnRefresh().hide();
        var me = this;
        issue_history_view.addListener('remove', function() {
            me.getBtnRefresh().show();
            me.getBtnEnableEditing().show();
        });
    }
});

