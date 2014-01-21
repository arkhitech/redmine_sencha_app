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
Ext.Loader.setConfig({disableCaching: false});
Ext.application({
    name: 'RedmineApp',
    views: ['IssueDetail', 'ProjDetail', 'RedmineIssuesNavigator', 'RedmineTabPanel', 'RedmineChart', 'RedmineChartsNavigator'],
    models: ['RedmineConfig', 'Issue', 'Project'],
    stores: ['RedmineConfigs'],
    controllers: ['Projects', 'Issues', 'ChartsMenu'],
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
    getCurrentIssuesStore: function() {
        return this.createIssuesStore(this.getCurrentProjectIdentifier());
    },
    createIssuesStore: function(projectIdentifier) {
        var newStore = Ext.create('Ext.data.Store', {
            model: 'RedmineApp.model.Issue',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: this.getRedmineUrl() + '/projects/' + projectIdentifier + '/issues.json?key=9174453938f1629beac1e7431a6a70bcc28b17aa&include=relations,changesets,journals,attachments',
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
        newStore.load();
        return newStore;
    },
    createProjectsStore: function() {
        var newStore = Ext.create('Ext.data.Store', {
            model: 'RedmineApp.model.Project',
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: this.getRedmineUrl() + '/projects.json?key=9174453938f1629beac1e7431a6a70bcc28b17aa&include=relations,changesets,journals,attachments',
                reader: {
                    rootProperty: 'projects',
                    type: 'json'
                }
            },
            grouper: {
                groupFn: function(record) {
                    return record.get('name').substr(0, 1);
                },
                sortProperty: 'name'
            }

        });
        newStore.load();
        return newStore;
    }





});


