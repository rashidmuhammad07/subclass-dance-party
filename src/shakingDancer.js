var makeShakingDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.left = left;
};

makeShakingDancer.prototype = Object.create(makeDancer.prototype);
makeShakingDancer.prototype.construtor = makeShakingDancer;

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
makeShakingDancer.prototype.oldStep = makeDancer.prototype.step;

makeShakingDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
//console.log(Math.floor(this.top), parseInt(this.$node.css('top')));
  if (Math.floor(this.left) === parseInt(this.$node.css('left'))) {
    this.$node.css({left: '-=10px'});
  } else {
    this.$node.css({left: this.left});
  }
};

makeShakingDancer.prototype.lineUp = function(place) {
  this.setPosition(place, 30);
  this.left = 30;
};