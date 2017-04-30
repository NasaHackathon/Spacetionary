$('body').on('click', '.downvote', handleDownvote);
$('body').on('click', '.upvote', handleUpvote);

function handleDownvote() {
  console.log('downvote');
  // update count
  const term = $('#term > h1').text();
  $.ajax({
    url: 'http://localhost:1337/api/downvote',
    type: 'PUT',
    data: {
      term
    },
    success: () => {
      console.log('updated downvote');
    },
    error: (error) => {
      console.error(error);
      console.log('did not update downvote');
    }
  });
  // TODO: update front-end
}

function handleUpvote() {
  console.log('upvote');
  // update vote count
  const term = $('#term > h1').text();
  $.ajax({
    url: 'http://localhost:1337/api/upvote',
    type: 'PUT',
    data: {
      term
    },
    success: () => {
      console.log('updated upvote');
    },
    error: () => {
      console.log('did not update upvote');
    }
  });
  // TODO: update front-end
}
