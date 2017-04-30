const queryHighlightedWord = (highlightedWord, callback) => {
  // TODO: query API endpoint with highlightedWord for data
  // mock data
  $.ajax({
    url: 'https://fierce-hamlet-13380.herokuapp.com/search',
    type: 'GET',
    data: {
      q: highlightedWord
    },
    success: (queryResults) => {
      if (callback) {
        callback(queryResults);
      }
    },
    error: () => {
      $(document).html('<div>500 Internal Server Error</div>');
    },
  });
};
