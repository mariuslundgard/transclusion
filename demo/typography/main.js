window.application = (function ($, structure) {

  var app = {

    initialize: function() {

      this.textarea = $('.code textarea');
      this.visual = $('.visual');
      this.debug = $('.debug');
      this.console = $('.debug .console');

      // Create the structure.js document
      this.document = new structure.Document();

      this.lastInserted = null;
      this.lastRemoved = null;

      // Set up the input handler
      this.textarea.on('input', this.codeInputHandler.bind(this));
      // this.visual.on(
      //   'input textInput DOMAttrModified ' +
      //   'DOMAttributeNameChanged ' +
      //   'DOMCharacterDataModified ' +
      //   'DOMElementNameChanged ' +
      //   'DOMNodeInserted ' +
      //   'DOMNodeInsertedIntoDocument ' +
      //   'DOMNodeRemoved ' +
      //   'DOMNodeRemovedFromDocument ' +
      //   'DOMSubtreeModifiedkeydown ' +
      //   'keyup focus blur',
      //   this.visualInputHandler.bind(this)
      // );

      // var count = 1;
      // var event = function(event){
      //   if (event.animationName == 'nodeInserted') {
      //     event.target.textContent = 'Element ' + count++ + ' has been parsed!';
      //   }
      // };

      // document.addEventListener('animationstart', this.insertNodeHandler.bind(this), false);
      // document.addEventListener('MSAnimationStart', this.insertNodeHandler.bind(this), false);
      // document.addEventListener('webkitAnimationStart', this.insertNodeHandler.bind(this), false);

      // var count = 1;
      // this.visual[0].addEventListener('animationstart MSAnimationStart webkitAnimationStart', function(e) {
      //   
      //   alert(1);
      // });

      this.codeInputHandler({ type: 'input' });

      // console.log(MutationObserver);

      var canObserveMutation = 'MutationObserver' in window;
      
      if (canObserveMutation) {
        var fn = function(recordQueue) {
          console.log(recordQueue);
        };

        var options = {
          childList: true,
          attributes: true,
          characterData: false,
          subtree: false,
          attributeOldValue: false,
          characterDataOldValue: false,
          attributeFilter: ['class', 'src'] // etc.
        };
        
        var observer = new MutationObserver(fn);

        var wrapper = document.querySelector('.visual');

        observer.observe( wrapper, options );

        // observer.disconnect();
      } else {
        throw new Error('Cannot use the MutationObserver');
      }

      return this;
    },

    // insertNodeHandler: function (e) {
    //   if (e.animationName == 'nodeInserted') {
    //   //     e.target.textContent = 'Element ' + count++ + ' has been parsed!';
    //     // alert(1);

    //     var insNode = $(e.target.nodeName);

    //     this.console.prepend('<div>'+insNode[0].nodeName+'</div>');
    //   }
    // },

    // visualInputHandler: function(e) {

    //   var message = e.type;

    //   if ('DOMNodeInserted' === e.type) {

    //     var el = e.originalEvent.srcElement;

    //     if (3 !== el.nodeType) {
    //       // if (this.lastInserted && this.lastInserted[0] !== el.parentNode) {
    //       //   var wrapper = $('<div></div>');
    //       //   this.lastInserted = wrapper;
    //       //   $(el).wrap(wrapper);
    //       //   return;
    //       //   // el = el.parentNode;
    //       // }
    //     }

    //     if (3 !== el.nodeType && 'BR' !== el.nodeName) { // Not text nodes

    //       if (this.lastInserted) {
    //         this.lastInserted.removeAttr('class');
    //       }

    //       var justInsEl = $(el);

    //       justInsEl.addClass('just-inserted');

    //       message += ' - ' + el.parentNode + '/' + $(el).index();

    //       this.lastInserted = justInsEl;
    //     }
    //   }

    //   if ('DOMNodeRemoved' === e.type) {

    //     var el = e.originalEvent.srcElement;

    //     if (3 !== el.nodeType && 'BR' !== el.nodeName) { // Not text nodes

    //       if (this.lastRemoved) {
    //         // this.lastRemoved.removeAttr('class');
    //       }

    //       var justRemEl = $(el);

    //       // justRemEl.addClass('justRemoved');

    //       message += ' - ' + el.parentNode + '/' + $(el).index();

    //       this.lastRemoved = justRemEl;
    //     }
    //   }

    //   if (-1 < [ 'DOMNodeInserted', 'DOMAttributeNameChanged', 'DOMCharacterDataModified ', 'DOMElementNameChanged ', 'DOMNodeInserted ', 'DOMNodeInsertedIntoDocument ', 'DOMNodeRemoved ', 'DOMNodeRemovedFromDocument ', 'DOMSubtreeModifiedkeydown' ].indexOf( e.type )) {
    //     message += '';
    //   }

    //   this.console.prepend('<div>'+message+'</div>');
    // },

    codeInputHandler: function(e) {

      // Parse new document input
      this.document.setInput(this.textarea.val());
      this.document.parse();

      //
      if (this.document.body) {
        this.visual.html(
          this.document.getCompiler().compileNodes(
            this.document.body.childNodes
          )
        );
      } else {
        this.visual.children().remove();
      }
    }
  };

  return app.initialize();

})(jQuery, structure);
