var makeTwirlyDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.width = '5%';
};

makeTwirlyDancer.prototype = Object.create(makeDancer.prototype);
makeTwirlyDancer.prototype.construtor = makeTwirlyDancer;

  // we plan to overwrite the step function below, but we still want the superclass step behavior to work,
  // so we must keep a copy of the old version of this function
makeTwirlyDancer.prototype.oldStep = makeDancer.prototype.step;

makeTwirlyDancer.prototype.step = function() {
  // call the old version of step at the beginning of any call to this new version of step
  // this.oldStep();
  setTimeout(this.step.bind(this), this.timeBetweenSteps);
  this.$node.css({transition: 'width ' + this.timeBetweenSteps / 1000 + 's', transform: 'translate(-50%, 0)'});

  // transition: width 0.3s;
  // transform: translate(-50%, 0);
  // toggle() is a jQuery method to show/hide the <span> tag.
  // See http://api.jquery.com/category/effects/ for this and
  // other effects you can use on a jQuery-wrapped html tag.
  if (this.width === '5%') {
    this.width = '0';
    this.$node.css({width: '0%'});
  } else {
    this.$node.css({width: '5%'});
    this.width = '5%';
  }
};