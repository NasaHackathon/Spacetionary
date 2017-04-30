const bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection-bubble');
document.body.appendChild(bubbleDOM);

document.addEventListener('mouseup', function (e) {
  const selection = window.getSelection().toString();
  const querySelection = queryHighlightedWord(selection);
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, querySelection);
  }
}, false);

// Close the bubble when we click on the X.
$('body').on('click', '#close-tooltip', () => {
  bubbleDOM.style.visibility = 'hidden';
});

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  const selectionData = selection;
  selectionData.definition = selectionData.definition.length > 96 ?
                             selectionData.definition.slice(0, 94) + '...' :
                             selectionData.definition;
  bubbleDOM.innerHTML = `<h3 id="select-term">${selection.term}</h3>` +
                        '<div id="close-tooltip">&#10006;</div>' +
                        `<p>${selection.definition}</p>` +
                        '<div id="see-more-button">See More...</div>' +
                        `<img src="${selection.imageSource}" />`;
  bubbleDOM.style.top = mouseY - 50 + 'px';
  bubbleDOM.style.left = mouseX - 50 + 'px';
  bubbleDOM.style.visibility = 'visible';
}
