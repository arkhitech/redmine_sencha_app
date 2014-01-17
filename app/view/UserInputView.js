Ext.define('RedmineApp.view.UserInputView', {
    extend: 'Ext.form.Panel',
    xtype: 'redmine-user-input',
    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.MessageBox',
        'Ext.field.Url'
    ],
    config: {
        layout: 'vbox',
        height: '100%',
        items: [{
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'urlfield',
                        id: 'redmine_url_from_user',
                        name: 'redmine_url',
                        label: 'Enter Your Redmine App URL',
                        flex: 2,
                        clearIcon: true,
                        placeHolder: 'http://redmine.arkhitech.com/'
                    },
                    {
                        xtype: 'textfield',
                        id: 'access_key_from_user',
                        name: 'redmine_access_key',
                        label: 'Enter Your Redmine API Access Key',
                        flex: 2,
                        clearIcon: true,
                        placeHolder: '9174453938f1629beac1e7431a6a70bcc28b17aa'
                    },
                    {
                        xtype: 'button',
                        ui: 'confirm',
                        text: 'Save Permanently',
                        handler: function(btn, evt) {

                            var redurl = Ext.getCmp('redmine_url_from_user').getValue();
                            RedmineApp.app.setRedmineUrl(redurl);
                            var accesskey = Ext.getCmp('access_key_from_user').getValue();
                            RedmineApp.app.setRedmineAccessKey(accesskey);
                               Ext.Msg.alert('Save Successful', 'Your credentials have been saved and will remain saved until overwritten.');
                        }
                    }
                ]
            },
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Please Enter Your Details'
            }
        ]
    }
});