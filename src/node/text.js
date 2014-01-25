// ;(function (root, Structure, undefined){

(function (core, util) {
//   'use strict';

  // var Node = core.Node;

  var Text = function (data) {
    this.initialize.call(this, core.Node.TEXT, '#text');
    this.data = data;
    this.whiteSpace = true;

    for (var i = 0; i < data.length; i++) {
      if (!util.whitespace(data[i])) {
        this.whiteSpace = false;
      }
    }
  };

  Text.prototype = util.copy(core.Node.prototype);
  Text.prototype.constructor = Text;

  Text.prototype.appendData = function(data) {
    this.data += data;

    for (var i = 0; i < data.length; i++) {
      if (!util.whitespace(data[i])) {
        this.whiteSpace = false;
      }
    }
  };

//   // root.Structure || (root.Structure = {});
//   root.Structure.Text = Text;
  
  core.Text = Text;

// }(this, this.Structure));
}(
  window.structure,
  window.structure.util
));
