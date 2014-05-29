Ext.define('RedmineApp.view.RedmineTrackerChart', {
    extend: 'Ext.chart.PolarChart',
    xtype: 'redmine-tracker-chart',
    initialize: function() {
        this.callParent();
        this.createStore();
    },
    createStore: function() {
        var store = RedmineApp.app.getCurrentIssuesStore();
        var me = this;
        store.addListener('load', function(store, records, successful, operation, eOpts) {
            store.setGroupField('tracker_name');
            var groups = store.getGroups();
            Ext.define('IssueByTracker', {
                extend: 'Ext.data.Model',
                config: {
                    fields: [{
                            name: 'name'
                        }, {
                            name: 'total_estimated_hours',
                            convert: function(value, record) {
                                return record.raw.children.length;
                            }
                        }]
                }
            });
            var groupStore = Ext.create('Ext.data.Store', {
                model: 'IssueByTracker',
                data: groups
            });
            me.bindStore(groupStore);
        });
    },
    config: {
        layout: 'fit',
        colors: ["red", "blue", "orange", "green", "pink", "yellow", "#115fa6", "grey", "#94ae0a", "#a61120", "#ff8809", "#ffd13e", "#FF7518", "#FFDF00"],
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
                        fill: ['black', 'red', 'pink', 'blue', 'green'][index % 5]
                    });
                },
                animate: true,
                xField: 'total_estimated_hours',
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