;(function(root, $, transclude, undefined){
  $('.editor textarea').bind('input', function(){
    updateOutput();
  });

  var compiler
    , parser;

  function getCompiler() {
    if (!compiler) {
      compiler = new Structure.Compiler();
    }
    return compiler;
  }

  function getParser() {
    if (!parser) {
      parser = new Structure.Parser({
        sendEOF: false,
      });
    }
    return parser;
  }

  function transclude(input) {
    return getCompiler().compile(
      getParser().parse(input)
    );
  };

  function updateOutput()
  {
    try {
      $('.output .cache').html(
        transclude($('.editor textarea').val())
      );
      $('.output .cache').show();
      hideError();
    }

    catch (err) {
      showError(err);
    }

    updateParserStatus();

    function hideError()
    {
      $('body').removeClass('error');
      $('.output .errors').hide();
    }

    function showError(err)
    {
      $('body').addClass('error');

      var trace
        , traceOutput = ''
        , stackTrace = parseErrorStack(err.stack);

      for (var i=0;i<stackTrace.length;i++) {
        trace = stackTrace[i];
        traceOutput += '<span class="function code">';
        traceOutput += (trace.function ? trace.function+'()' : '&nbsp;')+'</span> ';
        traceOutput += '<span class="file"><a href="'+trace.sourceURL+'">'+shortenPath(trace.sourceURL)+'</a></span> ';
        if (trace.line) traceOutput += '<span class="line">'+trace.line+'</span>:';
        if (trace.column) traceOutput += '<span class="column">'+trace.column+'</span>';
        traceOutput += '<br>';
      }

      // console.log(err);

      var $error = $('<div><div><h2 class="error-title">'+err.message+'</h2>'
        +'<p><a href="'+err.sourceURL+'">'+shortenPath(err.sourceURL)+'</a> '+err.line+'</p></div><div><h3>Stack</h3>'+traceOutput+'</div></div>');

      $('.output .cache').hide();
      $('.output .errors').show().html($error);
    }

    function parseErrorStack(stack)
    {
      var result = [];
      var i, entry, parts, obj, entries = stack.split("\n");

      for (i=0; i<entries.length; i++) {
        entry = entries[i];
        // console.log(entry);
        parts = entry.split('@');
        obj = {
          function: null,
          file: null,
          line: null,
          column: null
        };

        if (1 < parts.length) {
          obj.function = parts[0];
          entry = parts[1];
        } else {
          entry = parts[0];
        }

        if (entry.substr(0, 4) === 'http') {
          parts = entry.split(':');
          obj.sourceURL = parts[0]+':'+parts[1];
          obj.line = parts[2];
          obj.column = parts[3];
        } else {
          obj.sourceURL = entry;
        }

        result.push(obj);
      }

      return result;
      // return stack;
    }
    function shortenPath(path)
    {
      var paths = [
        'http://asdf.local/structure.js.dev/',
        'http://ajax.googleapis.com/ajax/libs/',
      ];
      var pos;
      for (var i=0;i<paths.length;i++) {
        // console.log(path, paths[i], 0===String(path).indexOf(paths[i]));
        if (0 == String(path).indexOf(paths[i])) {
          return String(path).substr(paths[i].length);
        }
      }
      return path;
    }

    function updateParserStatus()
    {
      $('.output .status').html(
          "TreeConstructor: " + parser.treeConstructor.mode.toUpperCase().replace(' ', '_')
        + "<br>Tokenizer: "   + parser.tokenizer.state.toUpperCase().replace(' ', '_')
        + "<br>Line: "        + parser.stream.line
        + "<br>Column: "      + parser.stream.column
      );
    }


  }
}(this, this.jQuery, this.Structure));