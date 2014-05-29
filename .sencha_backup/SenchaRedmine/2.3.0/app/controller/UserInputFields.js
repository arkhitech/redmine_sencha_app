Ext.define('RedmineApp.controller.UserInputFields', {
    extend: 'Ext.app.Controller',
    config: {
        views: ['UserInputView'],
        refs: {
            redmineUrlField: '#redmine-url-field',
            redmineKeyField: '#redmine-key-field'
        },
        control: {
            redmineUrlField: {
                painted: 'styleRedmineUrlField'
            },
            redmineKeyField: {
                painted: 'styleRedmineKeyField'
            }
        }
    },
    styleRedmineUrlField: function(urlfield, eOpts) {
        console.log('I am here in styleRedmineUrlField');
        // redmineurltextfield.getRedmineUrlField().setStyle({backgroundColor: '#00D2A5'});
        Ext.getCmp('redmine-url-field').setStyle({backgroundColor: '#00D2A5'});
    },
    styleRedmineKeyField: function(keyfield, eOpts) {
        console.log('I am here in styleRedmineKeyField');
        //  redminekeytextfield.getRedmineKeyField().setStyle({backgroundColor: '#00D2A5'});
        Ext.getCmp('redmine-key-field').setStyle({backgroundColor: '#00D2A5'});
    }
});