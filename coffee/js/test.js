(function() {
  define(['app', 'jquery.jqGrid'], function(App) {
    var View, tableCtTpl;
    tableCtTpl = ['<div class="row">', '<div class="col-xs-12 jgrid-container">', '<table id="untitled-grid-table"></table>', '<div id="untitled-grid-pager" ></div>', '</div>', '</div>'].join('');
    View = Marionette.ItemView.extend({
      template: _.template(tableCtTpl),
      tabId: 'menu.untitled.list',
      onRender: function() {
        var me;
        me = this;
        return _.defer(function() {
          return me.renderGrid();
        });
      },
      renderGrid: function() {
        var grid, me;
        me = this;
        return grid = App.Factory.createJqGrid({
          rsId: 'untitled',
          caption: '',
          nav: {
            actions: {
              search: false,
              add: false
            }
          },
          actionsCol: {
            edit: false,
            del: false
          },
          gid: 'untitled-grid',
          url: url._('yoyo.json'),
          colNames: {id: "ID",username: "名称"},
          colNames: [{name: "id", hidden: true},{name: "username"},{name: "age"}]
        });
      }
    });
    return App.on('untitled:list', function() {
      return App.show(new View());
    });
  });

}).call(this);
