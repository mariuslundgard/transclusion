var expect = chai.expect,
    src = structure;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('CharStream', function() {
  describe('constructor', function() {
    it('should set stream\'s input', function() {
      var stream = new src.CharStream('test');
      expect(stream.input).to.equal('test');
    });

    it('should clean the input', function() {
      var stream = new src.CharStream('test\r\ntest');
      expect(stream.input).to.equal('test\ntest');
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#getSize', function() {
    it('should return the size of the stream', function() {
      var stream = new src.CharStream('test');
      expect(stream.getSize()).to.equal(4);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#getLine', function() {
    it('should return the line number', function() {
      var stream = new src.CharStream('test\ntest\ntest\ntest');
      expect(stream.getLine()).to.equal(1);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#getColumn', function() {
    it('should return the column number', function() {
      var stream = new src.CharStream('test\ntest\ntest\ntest');
      expect(stream.getColumn()).to.equal(1);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#consume', function() {

    it('should return the 1st character', function() {
      var stream = new src.CharStream('test');
      expect(stream.consume()).to.equal('t');
    });
    it('should return the 2nd character', function() {
      var stream = new src.CharStream('test');
      stream.consume();
      expect(stream.consume()).to.equal('e');
    });
    it('should return the 3rd character', function() {
      var stream = new src.CharStream('test');
      stream.consume();
      stream.consume();
      expect(stream.consume()).to.equal('s');
    });
    it('should return the 4th character', function() {
      var stream = new src.CharStream('test');
      stream.consume();
      stream.consume();
      stream.consume();
      expect(stream.consume()).to.equal('t');
    });
    it('should return a EOS character', function() {
      var stream = new src.CharStream('test');
      stream.consume();
      stream.consume();
      stream.consume();
      stream.consume();
      expect(stream.consume()).to.equal(-1);
    });
    it('should return another EOS character', function() {
      var stream = new src.CharStream('test');
      stream.consume();
      stream.consume();
      stream.consume();
      stream.consume();
      stream.consume();
      expect(stream.consume()).to.equal(-1);
    });

    it('should update lineNo, column and pointer', function() {
      var stream = new src.CharStream('test\ntest');
      stream.consume();
      stream.consume();
      stream.consume();
      stream.consume();
      stream.consume();
      expect(stream.getLine()).to.equal(2);
      expect(stream.getColumn()).to.equal(1);
      expect(stream.getPointer()).to.equal(5);
    });

    it('should return the 1st 10 characters and update line and column', function() {
      var stream = new src.CharStream('test\ntest\ntest');
      expect(stream.consume(10)).to.equal('test\ntest\n');
      expect(stream.getLine()).to.equal(3);
      expect(stream.getColumn()).to.equal(1);
      expect(stream.next(4)).to.equal('test');
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#next', function() {
    var stream = new src.CharStream('test');

    it('should return the 1st character', function() {
      expect(stream.next()).to.equal('t');
      expect(stream.consume()).to.equal('t');
    });
    it('should return the 2nd character', function() {
      expect(stream.next()).to.equal('e');
      expect(stream.consume()).to.equal('e');
    });
    it('should return the 3rd character', function() {
      expect(stream.next()).to.equal('s');
      expect(stream.consume()).to.equal('s');
    });
    it('should return the 4th character', function() {
      expect(stream.next()).to.equal('t');
      expect(stream.consume()).to.equal('t');
    });
    it('should return a EOS character', function() {
      expect(stream.next()).to.equal(-1);
      expect(stream.consume()).to.equal(-1);
    });
    it('should return another EOS character', function() {
      expect(stream.next()).to.equal(-1);
      expect(stream.consume()).to.equal(-1);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#next_length', function() {
    

    it('should return the first 2 characters', function() {
      var stream = new src.CharStream('test');
      expect(stream.next(2)).to.equal('te');
    });
    it('should return the first 3 characters', function() {
      var stream = new src.CharStream('test');
      expect(stream.next(3)).to.equal('tes');
    });
    it('should return the first 4 characters', function() {
      var stream = new src.CharStream('test');
      expect(stream.next(4)).to.equal('test');
    });
    it('should return the first 4 characters again (see test)', function() {
      var stream = new src.CharStream('test');
      expect(stream.next(5)).to.equal('test');
    });


    it('should return the last 2 characters', function() {
      var stream = new src.CharStream('test');
      stream.consume();
      stream.consume();
      expect(stream.next(2)).to.equal('st');
    });

    it('should return a EOS character', function() {
      var stream = new src.CharStream('test');
      stream.consume();
      stream.consume();
      stream.consume();
      stream.consume();

      expect(stream.next(1)).to.equal(-1);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#shift', function() {

    it('should return the 2nd character after shift', function() {
      var stream = new src.CharStream('test');
      stream.shift(1);
      expect(stream.next()).to.equal('e');
      expect(stream.consume()).to.equal('e');
    });

    it('should update the column, lineNo and pointer after shift', function() {
      var stream = new src.CharStream('te\nst');
      stream.shift(3);
      expect(stream.next()).to.equal('s');
      expect(stream.getColumn()).to.equal(1);
      expect(stream.getLine()).to.equal(2);
      expect(stream.getPointer()).to.equal(3);
    });

  });

  //////////////////////////////////////////////////////////////////////////////

});
