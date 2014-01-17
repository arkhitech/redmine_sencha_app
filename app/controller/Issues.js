Ext.define('RedmineApp.controller.Issues', {
    extend: 'Ext.app.Controller',
    requires: [
        'Ext.data.proxy.LocalStorage'
    ],
    config: {
        views: ['ProjDetail', 'RedmineIssuesNavigator'],
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
        var store = Ext.create('Ext.data.Store', {
            model: 'RedmineApp.model.Issue',
            proxy: {
                type: 'ajax',
                url: RedmineApp.app.getRedmineUrl() + 'issues/' + record.data.id + '.json?key=' + RedmineApp.app.getRedmineAccessKey() + '&include=relations,changesets,journals,attachments',
                reader: {
                    rootProperty: 'issue',
                    type: 'json'
                }
            }
        });
        store.addListener('load', function(store, records, successful, operation, eOpts) {
            var issue_details_view = Ext.create('RedmineApp.view.IssueDetail');
            issue_details_view.setRecord(records[0]);
            list.up('redmine-issues-navigator').push(issue_details_view);
            RedmineApp.controller.Issues.isClickInProcess = false;
        });
        store.load();
    }
});







