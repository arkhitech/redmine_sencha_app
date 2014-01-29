Ext.define('RedmineApp.controller.Projects', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['RedmineIssuesNavigator'],
        refs: {
            projectList: '#projectlist'
        },
        control: {
            projectList: {
                disclose: 'showProjectIssues'
            }
        }
    },
    showProjectIssues: function(list, project) {
       RedmineApp.app.loadProjectSettings(project.data.id);
        
        var project_issues_view = Ext.create('RedmineApp.view.ProjectIssues');
        list.up('redmine-issues-navigator').push(project_issues_view);                
        var issues_store = RedmineApp.app.createIssuesStore(project.data.id);
                
        project_issues_view.getAt(0).setStore(issues_store);

    }
});













