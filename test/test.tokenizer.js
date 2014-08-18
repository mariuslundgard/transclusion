var expect = chai.expect,
    src = structure;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Tokenizer', function() {
  describe('constructor', function() {
    it('should set tokenizer\'s parser', function() {
      var doc = new src.Document();
      var prs = new src.Parser(doc);
      var tok = new src.Tokenizer(prs);
      expect(tok.parser).to.be.an.instanceof(src.Parser);
    });
  });

  describe('#tokenizer', function() {
    it('should change tokenizer\'s state', function() {
      var doc = new src.Document();
      var prs = new src.Parser(doc);
      var tok = new src.Tokenizer(prs);

      tok.tokenize('test');
      expect(tok.state).to.equal(src.Tokenizer.STATE_EOF);

      console.log(doc);
    });
  });
});
