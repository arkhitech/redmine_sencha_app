Ext.define('RedmineApp.controller.Issues', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        views: ['ProjDetail', 'RedmineIssuesNavigator','IssueDetail'],
        refs: {
            list: '#ticketlist'
        },
        control: {
            list: {
                disclose: 'showTicketDetails'
            }
        }
    },
    statics: {
        isClickInProcess: false
    },
    showTicketDetails: function(list, record, node, index, event, eOpts) {



        if (RedmineApp.controller.Issues.isClickInProcess) {
            console.log("Click is already in process, so ignoring");
            return;
        }
        RedmineApp.controller.Issues.isClickInProcess = true;
        var Issue = Ext.ModelManager.getModel('RedmineApp.model.Issue');
        Issue.load(record.data.id, {
            success: function(issue, operation) {
                var issue_details_view = Ext.create('RedmineApp.view.IssueDetail');
                issue_details_view.setRecord(issue);          
                list.up('redmine-issues-navigator').push(issue_details_view);
                RedmineApp.controller.Issues.isClickInProcess = false;                
            }
        });      
    }
});

