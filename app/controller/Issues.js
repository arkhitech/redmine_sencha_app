Ext.define('RedmineApp.controller.Issues', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage',
        'Ext.field.TextArea'
    ],
    config: {
        views: ['ProjectIssues', 'Issue', 'IssueHistory'],
        refs: {
            projectIssuesView: 'projectissuesview',
            projectIssueList: 'projectissuesview #project-issue-list',
            issueTracker: 'issueview #issue-tracker',
            issueCategory: 'issueview #issue-category',
            btnEnableEditing: 'redmine-issues-navigator #btn-enable-editing',
            btnRefresh: 'redmine-issues-navigator #btn-refresh',
            btnSaveInfo: 'redmine-issues-navigator #btn-save-values',
            issuePanel: '#issue-panel',
            redmineTabPanel: '#redmine-tab-panel',
            redmineIssuesNavigator: 'redmine-issues-navigator',
            issueID: 'issueview #issue-id',
            issueProject: 'issueview #issue-project',
            issueFixedVersion: 'issueview #issue-fixed-version',
            issueCreatedOn: 'issueview #issue-created-on',
            issueUpdatedOn: 'issueview #issue-updated-on',
            issueSpentHours: 'issueview #issue-spent-hours',
            issueSubject: 'issueview #issue-subject',
            issueEstimatedHours: 'issueview #issue-estimated-hours',
            issueStartDate: 'issueview #issue-start-date',
            issueDueDate: 'issueview #issue-due-date',
            newEmptyNode: '#new-empty-node',
            issueDescription: 'issueview #issue-description',
            issuePriority: 'issueview #issue-priority',
            issueStoryPoints: 'issueview #issue-story-points',
            issueStatus: '#issue-status',
            issueChangesets: 'issueview #issue-changesets',
            btnNewNoteSave: 'issueview #btn-new-note-save',
            btnNewNote: 'issueview #btn-new-note',
            btnShowHistory: 'issueview #btn-show-history',
            attachmentSubFieldset: '#attachment-sub-fieldset',
            relationsSubFieldset: '#relations-sub-fieldset',
            journalsSubFieldset: '#journals-sub-fieldset',
            historyPanel: 'issuehistoryview'
        },
        control: {
            redmineIssuesNavigator: {
                back: 'backClicked'
            },
            projectIssueList: {
                disclose: 'showIssue'
            },
            btnEnableEditing: {
                tap: 'enableEditing'
            },
            btnSaveInfo: {
                tap: 'saveInfo'
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
                        readOnly: true,
                        maxRows: 12
                    }
                ]
            };
            historyPanel.add(new_item);
        }
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
        this.getBtnShowHistory().show();
        this.getBtnNewNote().show();
    },
//    refreshIssue: function(btn) {
//        var Issue = Ext.ModelManager.getModel('RedmineApp.model.Issue');
//        Issue.load(this.issue.data.id, {
//            scope: this,
//            success: function(issue, operation) {
//                this.issue = issue;
//                var form = this.getIssuePanel();
//                if (form) {
//                    form.setRecord(issue);
//                }
//            }
//        });
//    },
    backClicked: function() {
        this.getBtnEnableEditing().hide();
        this.getBtnRefresh().show();
        this.getBtnSaveInfo().hide();
        //console.log(this.getRedmineIssuesNavigator().getItems().length);
    },
    Issue: null,
    issueView: null,
    loadIssueById: function(issue_id) {
        var Issue = Ext.ModelManager.getModel('RedmineApp.model.Issue');
        Issue.load(issue_id, {
            scope: this,
            success: function(issue, operation) {
                this.issue = issue;

                // console.log('Creating Issue View');
                this.issueView = Ext.create('RedmineApp.view.Issue');


                //create an empty editable journal note entry
                new_items = [
                    {
                        xtype: 'textareafield',
                        itemId: 'new-empty-node',
                        label: 'Enter a New Note',
                        name: 'notes',
                        hidden: true
                    }
                ],
                        this.issueView.add(new_items);

                this.issueView.setRecord(issue);
                this.getBtnEnableEditing().show();
//                this.getIssueTracker().setStore(RedmineApp.app.getCurrentProjectTrackers());         
//                 this.getIssueCategory().setStore(RedmineApp.app.getCurrentProjectIssueCategories());


                //   this.getRedmineIssuesNavigator().push(this.issueView);

                this.getProjectIssuesView().push(this.issueView);
                this.getBtnRefresh().hide();

                //   this.getRedmineIssuesNavigator().setCurrentRefreshListener(this.refreshIssue, this);

                RedmineApp.controller.Issues.isClickInProcess = false;
            }
        });
    },
    showIssueById: function(project_id, issue_id) {
        RedmineApp.app.loadProjectSettings(project_id);
        this.loadIssueById(issue_id);
//        Issue.load(issue_id, {
//            scope: this,
//            success: function(issue, operation) {
//                this.issue = issue;
//                var issue_view = Ext.getCmp('issue_view');
//                if (!issue_view) {
//                    var issue_view = Ext.create('RedmineApp.view.Issue');
//                    issue_view.onAfter('erased', function() {
//                        this.destroy();
//                    });
//                    this.getRedmineIssuesNavigator().push(issue_view);
//                }
//            }
//        });
    },
    showIssue: function(list, issue, node, index, event, eOpts) {
        if (RedmineApp.controller.Issues.isClickInProcess) {
            //console.log("Click is already in process, so ignoring");
            return;
        }
        RedmineApp.controller.Issues.isClickInProcess = true;
        this.loadIssueById(issue.data.id);
    },
    showIssueHistoryFields: function(btn) {
        var issue_history_view = Ext.create('RedmineApp.view.IssueHistory');
        this.getNewEmptyNode().hide();
        this.getBtnEnableEditing().hide();
        this.getBtnRefresh().hide();
        var me = this;
        issue_history_view.addListener('remove', function() {
            me.getBtnRefresh().hide();
            me.getBtnEnableEditing().show();
        });

        this.getRedmineIssuesNavigator().push(issue_history_view);
    },
    saveNewNoteValue: function(btn) {
        var form = this.getIssuePanel();
        if (form) {
            var issue = form.getRecord();
        }
        if (this.issue) {
            this.issue.set('notes', form.getValues().notes);
            this.issue.save();
            Ext.Msg.alert('New Note Saved Successfully');
            this.getNewEmptyNode().hide();
            this.getBtnNewNoteSave().hide();
            this.getBtnShowHistory().show();
            this.getBtnNewNote().show();
        }
    },
    showNewNoteField: function(btn) {
        this.getNewEmptyNode().show();
        this.getBtnNewNoteSave().show();
        this.getBtnNewNote().hide();
        this.getBtnShowHistory().hide();
    }
});

