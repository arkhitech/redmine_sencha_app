Ext.define('RedmineApp.view.UserInputView', {
    extend: 'Ext.form.Panel',
    xtype: 'redmine-user-input',
    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.MessageBox',
        'Ext.field.Url'
    ],
    initialize: function(loginformpanel) {
        if (Ext.getCmp('redmine_url_from_user').getValue() !== undefined && Ext.getCmp('access_key_from_user').getValue() !== undefined)
        {
            Ext.getCmp('redmine_url_from_user').disable();
            Ext.getCmp('access_key_from_user').disable();
            Ext.getCmp('save-permanently').hide();
            Ext.getCmp('edit-credentials').show();
        }
        else {
            Ext.getCmp('redmine_url_from_user').enable();
            Ext.getCmp('access_key_from_user').enable();
            Ext.getCmp('save-permanently').show();
            Ext.getCmp('edit-credentials').hide();
        }
    },
    config: {
        flex: 1,
        layout: 'vbox',
        pack: 'center',
        height: '100%',
        items: [
            {
                xtype: 'toolbar',
                ui: 'Sencha',
                docked: 'top',
                title: 'Please Enter Your Details',
                style: 'padding-top:20px;height:3em;background:#EEEEEE !important;'
            },
            {
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
                        placeHolder: 'For Example: http://redmine.example.com/'

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
                        placeHolder: 'For Example: 917454393ig4629beac1e7431a6987bcc28b17aa'
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
                                iconCls: 'bookmarks',
                                iconMask: true,
                                id: 'save-permanently',
                                style: 'margin: .05em',
                                text: 'Save & Lock Fields',
                                handler: function(btn, evt) {
                                    var redurl = Ext.getCmp('redmine_url_from_user').getValue();
                                    RedmineApp.app.setRedmineUrl(redurl);
                                    var accesskey = Ext.getCmp('access_key_from_user').getValue();
                                    RedmineApp.app.setRedmineAccessKey(accesskey);
                                    Ext.getStore('Projects').load();
                                    Ext.Msg.alert('Save Successful', 'Your credentials have been saved and will remain saved until overwritten.');
                                    Ext.getCmp('redmine_url_from_user').disable();
                                    Ext.getCmp('access_key_from_user').disable();
                                    btn.hide();
                                    Ext.getCmp('edit-credentials').show();
                                }
                            },
                            {
                                xtype: 'button',
                                ui: 'confirm',
                                iconCls: 'action',
                                iconMask: true,
                                id: 'edit-credentials',
                                style: 'margin: .05em',
                                text: 'Unlock Fields',
                                hidden: true,
                                handler: function(btn, evt) {
                                    btn.hide();
                                    Ext.getCmp('save-permanently').show();
                                    Ext.getCmp('redmine_url_from_user').enable();
                                    Ext.getCmp('access_key_from_user').enable();
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
});