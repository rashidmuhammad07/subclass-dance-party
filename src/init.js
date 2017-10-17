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
    var place = ($(document).height() - 32) / window.dancers.length;
    window.dancers.forEach(function(item, index) {
      item.lineUp(32 + place * index);
    });
  });

});

$(document).on('mouseenter', '.dancer', function(event) {
  console.log(getClosest(event.clientX, event.clientY, dancers));
});

var getClosest = function(x, y, dancers) {
  var closestDancers = [];
  var lastDistance = getDistance(x, y, dancers[0]);
  closestDancers[0] = dancers[0];

  dancers.forEach(function(dancer) {
    if (getDistance(x, y, dancer) < lastDistance) {
      dancers[0] = dancer;
    }
  });
  return dancers[0];
};

var getDistance = function(x, y, dancer) {
  return Math.sqrt(Math.pow(x - dancer.top, 2) + Math.pow(y - dancer.left, 2));
};