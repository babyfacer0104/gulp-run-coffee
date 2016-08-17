define([
    'app',
    'jquery.jqGrid'
  ], (App) ->

  tableCtTpl = [
    '<div class="row">',
    '<div class="col-xs-12 jgrid-container">',
    '<table id="untitled-grid-table"></table>',
    '<div id="untitled-grid-pager" ></div>',
    '</div>',
    '</div>'].join('');

  View = Marionette.ItemView.extend(
    template: _.template(tableCtTpl),
    tabId: '',
    onRender: () ->
      me = this
      _.defer(() ->
        me.renderGrid()
      )
    ,
    renderGrid: () ->
      me = this;
      grid = App.Factory.createJqGrid(
        rsId: '',
        caption: '',
        nav:
          actions:
            search: false,
            add: false
          ,
        ,
        actionsCol:
          edit: false,
          del: false
        ,
        gid: 'untitled-grid',
        url: url._(''),
        colNames:{},
        colModel: []
      )
  )
  # untitled:list为app触发名
  App.on('untitled:list', () ->
    App.show(new View())
  )

)