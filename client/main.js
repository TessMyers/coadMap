
$(function(){
// Initialize with a path array if not already defined. This needs to be set with the browser, so it can be maintained until the user closes their session
var path = [];

// Retrieves the content from any one content file and populates the page with a title, body text, and option buttons.
// Adds the content key to the CoadMapPath array.
  function getContent(content){
    checkBackButton();
    var fileName = content + ".json";

    $.get('/content/' + fileName, function(data){
      $('#title').text(data.title)
      $('#body').text(data.body);

      $('#options').empty();
      if (data.options) {
        data.options.forEach(function(optionsObject){
          $('#options').append('<div class=optionButton id=' + optionsObject.file +'>'+ optionsObject.title +'</div>');
        })
      }
    });

    path.push(content);
  };

  function checkBackButton(){
    var backbutton = $('#back');

    if (!path.length) {
      $(backbutton).addClass('disabled');
    } else {
      $(backbutton).removeClass('disabled');
    }
  };

// initialize webpage with intro content.
  getContent('intro');

  ////////////////////////////
 // Click event handlers! //
///////////////////////////

  // When an option button is clicked, a request is made to load the requested content
  $('#options').on('click', '.optionButton', function(){
    checkBackButton();
    var desiredContent = $(this).attr('id');
    getContent(desiredContent);
  });

  // When the back button is clicked, the most recent content is loaded and that key is removed from the CoadMapPath.
  $('#back').on('click', function(){
    path.pop();
    checkBackButton();
    var previous = path.pop();
    getContent(previous); // this might be cashed?
  });

  // When the startOver button is clicked, the path is cleared and the intro content is loaded.
  $('#home').on('click', function(){
    path = [];
    getContent('intro');
  })
});
