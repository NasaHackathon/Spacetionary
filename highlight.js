window.terms = [
  "Mars", "Moon", "Earth"
]

// console.log('elemtns arr', document.body.innerText.split(' '));



//sidebar
var sideBarHtmlString = "<div id='sidebar'><div id='term'><h1>TERM</h1> </div><div id='pic'>PICTURE </div><div id='def'><h3>The definition of the sun is this massive red ball whats gucci </h3></div></div>"
var sidebar;

$(document).ready(function() {
  var sidebar;
  $.ajax({
    url: chrome.extension.getURL('sideBar.html'),
    success: function(data) {
      sidebar = $(data);

      //Need to fix tyhis code
      $('body').append(sidebar);
      sidebar.hide();

      $('body').on('click', '#close', function(event) {
        event.stopPropagation();
        console.log('close TAB!!!!', sidebar);
        sidebar.hide();
      })
    }
  })

  $('body').on('click', '#see-more-button', function() {
    console.log('see more button');
    sidebar.show();
  })

});






