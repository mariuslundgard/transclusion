var expect = chai.expect;

describe('Tokenizer', function() {
  describe('constructor', function() {
    it('should set tokenizer\'s parser', function() {
      var doc = new transclusion.Document();
      var prs = new transclusion.Parser(doc);
      var tok = new transclusion.Tokenizer(prs);
      expect(tok.parser).to.be.an.instanceof(transclusion.Parser);
    });
  });

  describe('#tokenizer', function() {
    it('should change tokenizer\'s state', function() {
      var doc = new transclusion.Document();
      var prs = new transclusion.Parser(doc);
      var tok = new transclusion.Tokenizer(prs);

      tok.tokenize('test');
      expect(tok.state).to.equal(transclusion.Tokenizer.STATE_EOF);
    });
  });
});
