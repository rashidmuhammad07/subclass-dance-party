describe('jumpingDancer', function() {

  var jumpingDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    jumpingDancer = new makeJumpingDancer(10, 20, timeBetweenSteps);
  });

  describe('dance', function() {
    it('should jump at least once per second', function() {
      var pos = jumpingDancer.top;
      expect(parseInt(jumpingDancer.$node.css('top'))).to.be.equal(pos);
      clock.tick(timeBetweenSteps); 
      expect(parseInt(jumpingDancer.$node.css('top'))).to.not.equal(pos);
      clock.tick(timeBetweenSteps); 
      expect(parseInt(jumpingDancer.$node.css('top'))).to.be.equal(pos);
      clock.tick(timeBetweenSteps); 
      expect(parseInt(jumpingDancer.$node.css('top'))).to.not.equal(pos);
    });
  });
});
