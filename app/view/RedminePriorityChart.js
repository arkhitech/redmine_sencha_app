Ext.define('RedmineApp.view.RedminePriorityChart', {
    extend: 'Ext.chart.PolarChart',
    xtype: 'redmine-priority-chart',
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
            store.setGroupField('priority_name');
            var groups = store.getGroups();
            Ext.define('IssueByPriority', {
                extend: 'Ext.data.Model',
                config: {
                    fields: [
                        {name: 'name'},
                                {
                            name: 'total_issues',
                            convert: function(value, record) {
                                return record.raw.children.length;
                            }
                        }]
                        }
            });
            var groupStore = Ext.create('Ext.data.Store', {
                model: 'IssueByPriority',
                data: groups
            });
            me.bindStore(groupStore);
        });
    },
    config: {
        layout: 'fit',
        colors: ["#94ae0a", "red", "#a61120", "#115fa6", "green", "pink", "yellow", "blue", "orange", "#ffd13e", "#FF7518", "#FFDF00", "grey", "#ff8809"],
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
                        fill: ['blue', 'cyan', 'black', 'red', 'pink', 'green'][index % 6]
                    });
                },
                animate: true,
                xField: 'total_issues',
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