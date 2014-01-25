(function (_, core) {
  var Element = function (name) {
    this.initialize.call(this, core.Node.ELEMENT, name);
    this.attrs = [];
  };

  _.extend(
    Element.prototype,
    core.Node.prototype, {

      attrs: null,

      appendAttr: function (child) {
        var index = this.attrs.length;
        this.attrs.push(child);
        child.setParent(this);
        child.setIndex(index);
        child.setDocument(this.document);
        return child;
      },

      getAttribute: function (name) {
        for (var i = 0; i < this.attrs.length; i++) {
          if (name === this.attrs[i].name) {
            return this.attrs[i].evaluate();
          }
        }
        return null;
      },

      isVoidElement: function () {
        // alert('is void?');
        return this.getDirective().isVoidElement(this.name);
      },

      mayContain: function (name) {
        console.log('Check if '+this.name+' can contain: '+name);

        if (this.getDirective().mayContain(name)) {
          return true;
        }

        return false;
      },

      mayContainTextOnly: function (name) {
        return this.getDirective().mayContainTextOnly(name);
      },

      mayHaveAttribute: function (name) {
        console.log('Check if '+this.name+' can have attribute: '+name);

        if (this.getDirective().mayHaveAttribute(name)) {
          return true;
        }

        return false;
      },

      getDirective: function () {
        return this.document.getDirective(this.name);
      }
    }
  );

  core.Element = Element;
}(
  window._,
  window.structure
));
