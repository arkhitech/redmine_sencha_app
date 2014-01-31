Ext.define('RedmineApp.controller.Projects', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['RedmineIssuesNavigator', 'ProjectIssues'],
        refs: {
            projectList: '#projectlist',
            redmineIssuesNavigator: '#redmine-issues-navigator'
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
        list.up('redmine-issues-navigator').push(project_issues_view);
        this.projectIssueStore = RedmineApp.app.createIssuesStore(project.data.id);
        this.getRedmineIssuesNavigator().setCurrentRefreshListener(this.refreshProjectIssues, this);
        project_issues_view.getAt(0).setStore(this.projectIssueStore);

    }
});













