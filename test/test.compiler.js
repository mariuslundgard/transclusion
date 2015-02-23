var expect = chai.expect;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Compiler', function() {
  describe('constructor', function() {
    it('should set compiler\'s document', function() {
      var doc = new transclusion.Document();
      var cmp = new transclusion.Compiler(doc);
      expect(cmp.document).to.be.an.instanceof(transclusion.Document);
    });
  });

  describe('#compile', function() {
    it('should compile', function() {
      var doc = new transclusion.Document('test');

      doc.parse();

      var cmp = new transclusion.Compiler(doc);
      var html = cmp.compile();

      expect(html).to.equal('<html><head><title></title></head><body>test</body></html>');
    });
  });
});
