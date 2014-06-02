/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".
 
 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */
Ext.Loader.setConfig({disableCaching: true});
Ext.application({
    name: 'RedmineApp',
    views: ['Issue', 'ProjectIssues', 'RedmineIssuesNavigator', 'RedmineTabPanel', 'RedmineChart', 'RedmineChartsNavigator', 'UserInputView', 'RedmineIDChart', 'RedminePriorityChart', 'RedmineTrackerChart', 'RedmineStatusChart', 'IssueHistory'],
    models: ['RedmineConfig', 'Issue', 'IssueCategory', 'IssuePriority', 'Project', 'ProjectMembership', 'Tracker', 'User', 'IssueStatus'],
    stores: ['RedmineConfigs', 'Projects', 'IssuePriorities', 'IssueStatuses'],
    controllers: ['Projects', 'Issues', 'ChartsMenu', 'UserInputFields'],
    icon: {
        "57": "resources/icons/iOS/Icon.png",
        "114": "resources/icons/iOS/Icon@2x.png",
        "29": "resources/icons/iOS/Icon-Small.png",
        "58": "resources/icons/iOS/Icon-Small@2x.png",
        "40": "resources/icons/iOS/Icon-40.png",
        "80": "resources/icons/iOS/Icon-40@2x.png",
        "50": "resources/icons/iOS/Icon-Small-50.png",
        "100": "resources/icons/iOS/Icon-Small-50@2x.png",
        "60": "resources/icons/iOS/Icon-60.png",
        "120": "resources/icons/iOS/Icon-60@2x.png",
        "72": "resources/icons/iOS/Icon-72.png",
        "144": "resources/icons/iOS/Icon-72@2x.png",
        "76": "resources/icons/iOS/Icon-76.png",
        "152": "resources/icons/iOS/Icon-76@2x.png"
    },
    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        // Initialize the main view
        Ext.Viewport.add(Ext.create('RedmineApp.view.RedmineTabPanel'));
    },
    projectIdentifier: null,
    redmine_url: '',
    redmine_access_key: '',
    loadRedmineConfig: function() {
        var configStore = Ext.getStore('RedmineConfigs');
        configStore.load();
        var redmine_config = configStore.getAt(0);
        if (redmine_config !== undefined) {
            this.redmine_url = redmine_config.get('redmine_url');
            this.redmine_access_key = redmine_config.get('redmine_access_key');
        } else {
            this.redmine_url = 'http://redmine.arkhitech.com';
        }
    },
    saveRedmineConfig: function() {
        var newRecord = new RedmineApp.model.RedmineConfig({
            redmine_url: this.redmine_url,
            redmine_access_key: this.redmine_access_key
        });
        var configStore = Ext.getStore('RedmineConfigs');
        configStore.load();
        configStore.removeAll();
        configStore.add(newRecord);
        configStore.sync();
    },
    setRedmineUrl: function(redmine_url) {
        this.redmine_url = redmine_url.replace(/\/$/, '');
        this.saveRedmineConfig();
    },
    getRedmineUrl: function() {
        if (this.redmine_url === '') {
            this.loadRedmineConfig();
        }
        return this.redmine_url;
    },
    redmine_base_path: '',
    setRedmineBasePath: function(redmine_base_path) {
        this.redmine_base_path = redmine_base_path;
    },
    getRedmineBasePath: function() {
        return this.redmine_base_path;
    },
    setRedmineAccessKey: function(redmine_access_key) {
        this.redmine_access_key = redmine_access_key;
        this.saveRedmineConfig();
    },
    getRedmineAccessKey: function() {
        if (this.redmine_access_key === '') {
            this.loadRedmineConfig();
        }
        return this.redmine_access_key;
    },
    setCurrentProjectIdentifier: function(projectIdentifier) {
        this.projectIdentifier = projectIdentifier;
    },
    getCurrentProjectIdentifier: function() {
        return this.projectIdentifier;
    },
    getCurrentProjectTrackers: function() {
        return this.projectTrackersStore;
    },
    setCurrentProjectTrackers: function(projectTrackersStore) {
        this.projectTrackersStore = projectTrackersStore;
    },
    getCurrentIssuesStore: function() {
        return this.createIssuesStore(this.getCurrentProjectIdentifier());
    },
    getCurrentProjectIssueCategories: function() {
        return this.issueCategoriesStore;
    },
    setCurrentProjectIssueCategories: function(issueCategoriesStore) {
        this.issueCategoriesStore = issueCategoriesStore;
    },
    loadProjectSettings: function(project_id) {
        var Project = Ext.ModelManager.getModel('RedmineApp.model.Project');
        Project.load(project_id, {
            success: function(project) {
                RedmineApp.app.setCurrentProjectTrackers(project.trackersStore);
                RedmineApp.app.setCurrentProjectIssueCategories(project.issueCategoriesStore);
            }
        });
    },
    createIssuesStore: function(projectIdentifier) {
        var newStore = Ext.create('Ext.data.Store', {
            model: 'RedmineApp.model.Issue',
            autoLoad: true,
            proxy: {
                type: 'dynamicrest',
                resourcePath: '/projects/' + projectIdentifier + '/issues',
                format: 'json',
                reader: {
                    rootProperty: 'issues',
                    type: 'json'
                }
            },
            grouper: {
                groupFn: function(record) {
                    return record.get('updated_on');
                },
                sortProperty: 'updated_on',
                direction: 'DESC'
            }
        });
        return newStore;
    }
});


