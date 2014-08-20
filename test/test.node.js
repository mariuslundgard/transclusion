var expect = chai.expect,
    src = structure;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

describe('Node', function() {
  describe('constructor', function() {
    it('should set node\'s type and name', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      expect(node.type).to.equal(src.Node.NODE_ELEMENT);
      expect(node.name).to.equal('#test');
    });
 
    // it('should set node\'s name if provided', function() {
    //   var node = new src.Node('Kate');
    //   expect(node.name).to.equal('Kate');
    // });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#setOuterStartOffset', function() {
    it('should set outer start offset int', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      node.setOuterStartOffset(0);
      expect(node.outerStartOffset).to.equal(0);
    });
 
    it('should throw if outer start offset is undefined', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      expect(function() {
        node.setOuterStartOffset();
      }).to.throw(Error);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#setOuterEndOffset', function() {
    it('should set outer end offset int', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      node.setOuterEndOffset(0);
      expect(node.outerEndOffset).to.equal(0);
    });
 
    it('should throw if outer end offset is undefined', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      expect(function() {
        node.setOuterEndOffset();
      }).to.throw(Error);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#setInnerStartOffset', function() {
    it('should set outer start offset int', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      node.setInnerStartOffset(0);
      expect(node.innerStartOffset).to.equal(0);
    });
 
    it('should throw if outer start offset is undefined', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      expect(function() {
        node.setInnerStartOffset();
      }).to.throw(Error);
    });
  });

  //////////////////////////////////////////////////////////////////////////////

  describe('#setInnerStartOffset', function() {
    it('should set inner end offset int', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      node.setInnerStartOffset(0);
      expect(node.innerStartOffset).to.equal(0);
    });
 
    it('should throw if inner end offset is undefined', function() {
      var node = new src.Node(src.Node.NODE_ELEMENT, '#test');
      expect(function() {
        node.setInnerEndOffset();
      }).to.throw(Error);
    });
  });

});
