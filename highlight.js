window.terms = [
  "Mars", "Moon", "Earth", "planet"
]


var context = document.querySelector("body");
console.log('context', context);
var instance = new Mark(context);
console.log('instance', instance);


function handleSetQuery(findWords) {
    instance.mark(findWords);
}


//sidebar
var sideBarHtmlString = "<div id='sidebar'><div id='term'><h1>Sun</h1> </div><div id='pic'>PICTURE </div><div id='def'><h3>The definition of the sun is this massive red ball whats gucci </h3></div></div>"
var sidebar;

$(document).ready(function() {

  var body = $('body').text();
  // console.log('BODY ', body);
  // console.log('BODY TEXT', body[0].innerText);
  console.log('running request');
  $.ajax({
    method: 'POST',
    url: 'http://localhost:1337/api/user/words',
    data: {body: body},
    success: function(result) {
      console.log('result in client', result);
      window.pageResults = result;
      window.terms = window.pageResults.reduce((acc, curr) => {
        acc.push(curr.search_term);
        return acc;
      }, [])

      handleSetQuery(window.terms);
    }
  })

  
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

  $('body').on('click', '.btn-bar-hg-tooltip', function(e) {
    $('.hg-tooltip').hide();
    sidebar.show();
  });

  $('body').on('click', '.see-more-button', function() {
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
  });


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






