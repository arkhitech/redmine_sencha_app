Ext.define('RedmineApp.view.RedmineIDChart', {
    extend: 'Ext.chart.PolarChart',
    xtype: 'redmine-id-chart',
    require: [
        'Ext.draw.Component',
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
            store.setGroupField('estimated_hours');
            var groups = store.getGroups();
            Ext.define('IssueByID', {
                extend: 'Ext.data.Model',
                config: {
                    fields: [{
                            name: 'id',
                            convert: function(value, record) {
                                return record.raw.children[0].data.id;
                            }
                        }, {
                            name: 'estimated_hours',
                            convert: function(value, record) {
                                return record.raw.children.length;
                            }
                        }]
                }
            });
            var groupStore = Ext.create('Ext.data.Store', {
                model: 'IssueByID',
                data: groups
            });

            me.bindStore(groupStore);

        });
    },
    config: {
        layout: 'fit',
        colors: ["#800000", "#8DB600", "yellow", "blue", "orange", "#115fa6", "#94ae0a", "#00FF00", "#FF00FF", "green", "#FF7518", "#FFDF00", "pink", "#115fa6", "grey", "#a61120", "#ff8809", "#ffd13e", "red", "#eee0e5", "#cdc1c5", "#8b8386", "#7cfc00", "#fffacd", "#eee9bf", "#cdc9a5", "#8b8970", "#eedd82", "#add8e6", "#cdcd00", "#8b8b00", "#9acd32", "#cdba96", "#8b7e66", "#cdb5cd", "#8b7b8b", "#ff6347"],
        animate: true,
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
                        fill: ['black', 'red', 'blue', 'cyan', 'green', 'orange', 'pink', "#115fa6", "#94ae0a", "#00FF00", "#FF00FF"][index % 11]
                    });
                },
                xField: 'estimated_hours',
                animate: true,
                fill: true,
                label: {
                    field: 'id',
                    display: 'rotate',
                    contrast: true,
                    font: '18px "Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif'
                },
                donut: 25,
                highlightCfg:
                        {
                            margin: 20
                        },
                style:
                        {
                            stroke: 'black',
                            lineWidth: 2
                        }
            }
        ]
    }
});

