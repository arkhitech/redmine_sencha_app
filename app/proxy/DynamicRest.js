Ext.define('RedmineApp.proxy.DynamicRest', {
    extend: 'Ext.data.proxy.Rest',   
    alias: 'proxy.dynamicrest',
    buildUrl: function(request) {
        var me = this;
        var url = RedmineApp.app.getRedmineUrl() + me.getResourcePath();
        request.setUrl(url);
        return me.callParent([request]);
    },
    getExtraParams: function() {
        var params = this.callParent(arguments);
        if (params) {
            params.key = RedmineApp.app.getRedmineAccessKey();
        }
        else {
            params = {key: RedmineApp.app.getRedmineAccessKey()};
        }

        return params;
    },
    config: {
        resourcePath: undefined
    }});