Ext.define('RedmineApp.view.UserInputView', {
    extend: 'Ext.form.Panel',
    xtype: 'redmine-user-input',
    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.MessageBox',
        'Ext.field.Url',
        'Ext.Img'
    ],
    config: {
        height: '100%',
        items: [{
                xtype: 'fieldset',
                height: '100%',
                items: [
                    {
                        xtype: 'urlfield',
                        id: 'redmine_url_from_user',
                        name: 'redmine_url',
                        label: 'Enter Your Redmine App URL',
                        clearIcon: true,
                        placeHolder: 'http://redmine.example.com/'
                    },
                    {
                        xtype: 'textfield',
                        id: 'access_key_from_user',
                        name: 'redmine_access_key',
                        label: 'Enter Your Redmine API Access Key',
                        clearIcon: true,
                        placeHolder: '917454393ig4629beac1e7431a6987bcc28b17aa'
                    },
                    {
                        xtype: 'button',
                        layout: {
                            pack: 'center'
                        },
                        ui: 'confirm',
                        text: 'Save Permanently',
                        handler: function(btn, evt) {
                            var redurl = Ext.getCmp('redmine_url_from_user').getValue();
                            RedmineApp.app.setRedmineUrl(redurl);
                            var accesskey = Ext.getCmp('access_key_from_user').getValue();
                            RedmineApp.app.setRedmineAccessKey(accesskey);
                            Ext.getStore('Projects').load();
                            Ext.Msg.alert('Save Successful', 'Your credentials have been saved and will remain saved until overwritten.');
                        }
                    }
                ]
            },
            {
                xtype: 'titlebar',
                ui: 'Sencha',
                docked: 'top',
                title: 'Please Enter Your Details'
            }
        ]
    }
});