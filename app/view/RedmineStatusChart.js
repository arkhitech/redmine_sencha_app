Ext.define('RedmineApp.view.RedmineStatusChart', {
    extend: 'Ext.chart.PolarChart',
    xtype: 'redmine-status-chart',
    requires: ['Ext.draw.Component',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate',
        'Ext.TitleBar',
        'Ext.chart.interactions.ItemHighlight',
        'Ext.chart.interactions.PanZoom',
        'Ext.chart.interactions.ItemInfo'],
    initialize: function() {
        this.callParent();
        this.createStore();
    },
    createStore: function() {
        var store = RedmineApp.app.getCurrentIssuesStore();
        var me = this;
        store.addListener('load', function(store, records, successful, operation, eOpts) {
            store.setGroupField('status_name');
            var groups = store.getGroups();
            Ext.define('IssueByStatus', {
                extend: 'Ext.data.Model',
                config: {
                    fields: [{
                            name: 'name',
                        }, {
                            name: 'total_statuses',
                            convert: function(value, record) {
                                return record.raw.children.length;
                            }
                        }]
                }
            });
            var groupStore = Ext.create('Ext.data.Store', {
                model: 'IssueByStatus',
                data: groups
            });
            me.bindStore(groupStore);
        });
    },
    config: {
        layout: 'fit',
        colors: ["green", "pink", "yellow", "#94ae0a", "#a61120", "#115fa6", "red", "blue", "orange", "#ffd13e", "#FF7518", "#FFDF00", "grey", "#ff8809"],
        style: {background: 'white'},
        interactions: ['rotate', 'itemhighlight', 'panzoom', 'iteminfo'],
        innerPadding: 45,
        axes: [
        ],
        series: [
            {
                type: 'pie',
                renderer: function(sprite, record, attr, index, store) {
                    return Ext.apply(attr, {
                        fill: ['blue', 'green', 'black', 'red', 'pink'][index % 5]
                    });
                },
                animate: true,
                xField: 'total_statuses',
                fill: true,
                label: {
                    field: 'name',
                    display: 'rotate',
                    contrast: true,
                    font: '18px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
                },
                donut: 25,
                highlightCfg:
                        {
                            margin: 20
                        },
                style: {
                    stroke: 'black',
                    lineWidth: 2
                }
            }
        ]

    }
});