Ext.define('RedmineApp.controller.Projects', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['RedmineIssuesNavigator', 'ProjectIssues'],
        refs: {
            projectList: 'redmine-issues-navigator #projectlist',
            redmineIssuesNavigator: 'redmine-issues-navigator',
            buttonRefresh: 'redmine-issues-navigator #btn-refresh'
        },
        control: {
            projectList: {
                disclose: 'showProjectIssues'
            }
        }
    },
    projectIssueStore: null,
    refreshProjectIssues: function(btn) {
        this.projectIssueStore.load();
    },
    showProjectIssues: function(list, project) {
        RedmineApp.app.loadProjectSettings(project.data.id);
        var project_issues_view = Ext.create('RedmineApp.view.ProjectIssues');
        this.getRedmineIssuesNavigator().push(project_issues_view);
        this.getButtonRefresh().hide();
        this.projectIssueStore = RedmineApp.app.createIssuesStore(project.data.id);
        project_issues_view.getAt(0).setStore(this.projectIssueStore);
        //this.getRedmineIssuesNavigator().setCurrentRefreshListener(this.refreshProjectIssues, this);
    }
});













