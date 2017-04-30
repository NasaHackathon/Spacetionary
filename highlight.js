window.terms = [
  "Mars", "Moon", "Earth"
]

// console.log('elemtns arr', document.body.innerText.split(' '));



//sidebar
var sideBarHtmlString = "<div id='sidebar'><div id='term'><h1>Sun</h1> </div><div id='pic'>PICTURE </div><div id='def'><h3>The definition of the sun is this massive red ball whats gucci </h3></div></div>"
var sidebar;

$(document).ready(function() {
  var sidebar;
  $.ajax({
    url: chrome.extension.getURL('sideBar.html'),
    success: function(data) {
      console.log('data', data);
      sidebar = $(data);

      //Need to fix tyhis code
      $('body').append(sidebar);
      // sidebar.hide();

      $('body').on('click', '#close', function(event) {
        event.stopPropagation();
        console.log('close TAB!!!!', sidebar);
        sidebar.hide();
      })
    }
  })

  $('body').on('click', '#see-more-button', function() {
    const data = window.selectionData;
    const term = data.term
    const definition = data.definition;
    const imgLink = data.imageSource;
    
    console.log('data', data);
    console.log('imglink', imgLink);
    //Overide the term value
    sidebar.find('#term').html(`<h1>${term}</h1>`);

    //Overide the image url value
    sidebar.find('#picDiv').html(`<img id='pic' src='${imgLink}'>`);

    //Override the definiition value
    sidebar.find('#def').html(`<h3> ${definition} </h3>`);
    
    sidebar.show();
  })


  /*
  Will submit information in the form 
  {
    term: 'sun',
    email: 'bobby',
    definition: 'the sun is a big blob of swag'
  }
  */ 
  $('body').on('click', '#submit-def', function() {
    console.log('trying to submit definittion');
    window.email = 'bobby@gmail.com' //haven't figured out how email
    var email = window.email;

    //term 
    var term = $('#term').find('h1').html();    

    var definition = $('#textAreaDefinition').val();
    console.log('definition', definition);


    var type = 'submitDefiniton'
  })

});






