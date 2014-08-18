var expect = chai.expect,
    src = structure;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Compiler', function() {
  describe('constructor', function() {
    it('should set compiler\'s parser', function() {
      // var doc = new src.Document();
      // var prs = new src.Parser(doc);
      // var tok = new src.Compiler(prs);
      // expect(tok.parser).to.be.an.instanceof(src.Parser);
    });
  });

  describe('#compile', function() {
    it('should compile', function() {
      var doc = new src.Document('test');

      doc.parse();

      var cmp = new src.Compiler(doc);
      var html = cmp.compile();

      expect(html).to.equal('<html><head><title></title></head><body>test</body></html>');
    });
  });
});
