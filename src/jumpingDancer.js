var makeJumpingDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.top = top;
};

makeJumpingDancer.prototype = Object.create(makeDancer.prototype);
makeJumpingDancer.prototype.construtor = makeJumpingDancer;

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
makeJumpingDancer.prototype.oldStep = makeDancer.prototype.step;

makeJumpingDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  this.oldStep();
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  if (Math.floor(this.top) === parseInt(this.$node.css('top'))) {
    this.$node.css({top: '-=10px'});
  } else {
    this.$node.css({top: this.top});
  }
};