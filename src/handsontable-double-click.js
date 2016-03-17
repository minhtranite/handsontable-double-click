(function (Handsontable) {
  function DoubleClick() {
    var plugin = this;
    var eventManager = Handsontable.eventManager(this);

    var bindMouseEvents = function () {
      var instance = this;
      eventManager.addEventListener(instance.rootElement, 'dblclick', function (e) {
        var target = e.target;
        if (['TD', 'TH'].indexOf(target.nodeName) === -1) {
          target = Handsontable.Dom.closest(target, 'TH') || Handsontable.Dom.closest(target, 'TD');
        }
        if (!target) {
          return;
        }
        var coords = instance.view.wt.wtTable.getCoords(target);
        var row = coords.row;
        var col = coords.col;

        plugin.dblCLick(row, col);

        if (row >= 0 && col >= 0) {
          plugin.dblClickCell(row, col);
        }

        if (row < 0) {
          plugin.dblClickColHeader(col);
        }

        if (col < 0) {
          plugin.dblClickRowHeader(row);
        }

        if (row < 0 && col < 0) {
          plugin.dblClickCorner(row, col);
        }
      });
    };

    this.init = function () {
      bindMouseEvents.call(this);

      var instance = this;
      var settings = instance.getSettings();

      Handsontable.hooks.add('dblClick', function (row, col) {
        if (settings.dblClick) {
          settings.dblClick(row, col, instance);
        }
      });

      Handsontable.hooks.add('dblClickCell', function (row, col) {
        if (settings.dblClickCell) {
          settings.dblClickCell(row, col, instance);
        }
      });

      Handsontable.hooks.add('dblClickColHeader', function (col) {
        if (settings.dblClickColHeader) {
          settings.dblClickColHeader(col, instance);
        }
      });

      Handsontable.hooks.add('dblClickRowHeader', function (row) {
        if (settings.dblClickRowHeader) {
          settings.dblClickRowHeader(row, instance);
        }
      });

      Handsontable.hooks.add('dblClickCorner', function (row, col) {
        if (settings.dblClickCorner) {
          settings.dblClickCorner(row, col, instance);
        }
      });
    };

    this.dblCLick = function (row, col) {
      Handsontable.hooks.run(this, 'dblClick', row, col);
    };

    this.dblClickCell = function (row, col) {
      Handsontable.hooks.run(this, 'dblClickCell', row, col);
    };

    this.dblClickColHeader = function (col) {
      Handsontable.hooks.run(this, 'dblClickColHeader', col);
    };

    this.dblClickRowHeader = function (row) {
      Handsontable.hooks.run(this, 'dblClickRowHeader', row);
    };

    this.dblClickCorner = function (row, col) {
      Handsontable.hooks.run(this, 'dblClickCorner', row, col);
    }
  }

  var doubleClick = new DoubleClick();

  Handsontable.hooks.add('beforeInit', function () {
    doubleClick.init.call(this);
  });
  Handsontable.hooks.add('afterUpdateSettings', function () {
    doubleClick.init.call(this);
  });
  Handsontable.hooks.register('dblClick');
  Handsontable.hooks.register('dblClickCell');
  Handsontable.hooks.register('dblClickColHeader');
  Handsontable.hooks.register('dblClickRowHeader');
  Handsontable.hooks.register('dblClickCorner');
})(Handsontable);