const queryHighlightedWord = (highlightedWord, callback) => {
  // TODO: query API endpoint with highlightedWord for data
  // mock data
  
  callback({"search_term":"Absolute brightness (absolute magnitude)","definition":"A measure of the true brightness of an object. The absolute brightness or magnitude of an object is the apparent brightness or magnitude it would have if it were located exactly 32.6 light-years (10 parsecs) away. For example, the apparent brightness of our Sun is much greater than that of the star Rigel in the constellation Orion because it is so close to us. However, if both objects were placed at the same distance from us, Rigel would appear much brighter than our Sun because its absolute brightness is much larger.","image_url":"https://images-assets.nasa.gov/image/'Witch Head' Brews Baby Stars_10592267924_o/'Witch Head' Brews Baby Stars_10592267924_o~thumb.jpg"});

  // $.ajax({
  //   url: 'https://fierce-hamlet-13380.herokuapp.com/search',
  //   type: 'GET',
  //   data: {
  //     q: highlightedWord
  //   },
  //   success: (queryResults) => {
  //     if (callback) {
  //       callback(queryResults);
  //     }
  //   },
  //   error: () => {
  //     $(document).html('<div>500 Internal Server Error</div>');
  //   },
  // });
};
