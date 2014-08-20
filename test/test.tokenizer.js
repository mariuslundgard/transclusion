var expect = chai.expect;

describe('Tokenizer', function() {
  describe('constructor', function() {
    it('should set tokenizer\'s parser', function() {
      var doc = new structure.Document();
      var prs = new structure.Parser(doc);
      var tok = new structure.Tokenizer(prs);
      expect(tok.parser).to.be.an.instanceof(structure.Parser);
    });
  });

  describe('#tokenizer', function() {
    it('should change tokenizer\'s state', function() {
      var doc = new structure.Document();
      var prs = new structure.Parser(doc);
      var tok = new structure.Tokenizer(prs);

      tok.tokenize('test');
      expect(tok.state).to.equal(structure.Tokenizer.STATE_EOF);
    });
  });
});
