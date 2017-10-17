$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    $('body').append(dancer.$node);
    window.dancers.push(dancer);
  });

  $('.addLineUpButton').on('click', function(event) {
    var place = $(document).width() / window.dancers.length;
    var padding = $(document).width() - (place * (window.dancers.length - 1));
    window.dancers.forEach(function(item, index) {
      item.lineUp($(document).height() * 0.6, padding / 2 + place * index);
    });
  });

});

$(document).on('mouseenter', '.dancer', function(event) {
  var y = parseInt($(this).closest('.dancer').css('top'), 10);
  var x = parseInt($(this).closest('.dancer').css('left'), 10);

  var spotlight = getClosest(x, y, window.dancers);
  var closest = getClosest(x, y, window.dancers, spotlight);

  // swap positions
  spotlight.setPosition(closest.top, closest.left);
  closest.setPosition(y, x);
});

var getClosest = function(x, y, dancers, excludes) {
  var closestDancers = [];
  var lastDistance = -1;

  dancers.forEach(function(dancer) {
    var distance = getDistance(x, y, dancer);
    if ((distance < lastDistance || lastDistance === -1) && dancer !== excludes) {
      closestDancers[0] = dancer;
      lastDistance = distance;
    }
  });
  return closestDancers[0];
};

var getDistance = function(x, y, dancer) {
  return Math.sqrt(Math.pow(x - dancer.left, 2) + Math.pow(y - dancer.top, 2));
};