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
        flex: 1,
        layout: 'vbox',
        pack: 'center',
        height: '100%',
        items: [{
                xtype: 'fieldset',
                pack: 'center',
                items: [
                    {
                        xtype: 'textfield',
                        id: 'redmine-url-field',
                        label: 'Enter Redmine App URL:',
                        clearIcon: false,
                        labelWidth: '100%',
                        readOnly: true
                    },
                    {
                        xtype: 'urlfield',
                        id: 'redmine_url_from_user',
                        name: 'redmine_url',
                        clearIcon: true,
                        placeHolder: 'http://redmine.example.com/'

                    },
                    {
                        xtype: 'textfield',
                        id: 'redmine-key-field',
                        label: 'Enter Redmine API Access Key:',
                        clearIcon: false,
                        style: {
                            background: '#00D2A5 !important'
                        },
                        labelWidth: '100%',
                        readOnly: true
                    },
                    {
                        xtype: 'textfield',
                        id: 'access_key_from_user',
                        name: 'redmine_access_key',
                        clearIcon: true,
                        placeHolder: '917454393ig4629beac1e7431a6987bcc28b17aa'
                    },
                    {
                        xtype: 'container',
                        layout: {
                            type: 'vbox',
                            align: 'middle'
                        },
                        items: [
                            {
                                xtype: 'button',
                                ui: 'confirm',
                                style: 'margin: .5em',
                                text: 'Save Permanently',
                                handler: function(btn, evt) {
                                    var redurl = Ext.getCmp('redmine_url_from_user').getValue();
                                    RedmineApp.app.setRedmineUrl(redurl);
                                    var accesskey = Ext.getCmp('access_key_from_user').getValue();
                                    RedmineApp.app.setRedmineAccessKey(accesskey);
                                    Ext.getStore('Projects').load();
                                    Ext.Msg.alert('Save Successful', 'Your credentials have been saved and will remain saved until overwritten.');
                                    Ext.getCmp('redmine_url_from_user').disable();
                                    Ext.getCmp('access_key_from_user').disable();
                                }
                            }
                        ]
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