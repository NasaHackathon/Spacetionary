const bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'hg-tooltip');
document.body.appendChild(bubbleDOM);

document.addEventListener('click', function (e) {
  const selection = window.getSelection().toString();
  queryHighlightedWord(selection, (queryResults) => {
    if (queryResults && selection !== '') {
      renderBubble(e.clientX, e.clientY, queryResults);
    }
  });
}, false);

function renderBubble(mouseX, mouseY, selection) {
  const selectionData = selection;
  const fontSize = parseInt($(window.getSelection().anchorNode.parentElement).css('font-size'));

  window.selectionData = selectionData;

  selectionData.definition = selectionData.definition.length > 96 ?
                             selectionData.definition.slice(0, 94) + '...' :
                             selectionData.definition;
  bubbleDOM.innerHTML = `<div class="selection-bubble-content">
                          <h3 id="select-term">${selection.search_term}</h3>
                          <p>${selection.definition}</p>
                         </div>
                         <div class="btn-bar-hg-tooltip">
                          <div class="btn-bar-hg-tooltip-classification">
                            <div class="btn-hg-tooltip see-more-button">👍</div>
                            <div class="btn-hg-tooltip see-more-button">👎</div>
                          </div>
                          <div class="btn-hg-tooltip see-more-button">See more...</div>
                        </div>`;

  const instance = new Mark(window.getSelection().baseNode);
  instance.mark(selection.search_term, {
    "element": "span",
    "className": "us-highlight",
    "separateWordSearch": false
  });

  bubbleDOM.style.top = mouseY - (bubbleDOM.offsetHeight + fontSize + 10) + 'px';
  bubbleDOM.style.left = mouseX + 'px';
  bubbleDOM.style.transform = 'translateX(-50%)';
  bubbleDOM.style.visibility = 'visible';
}
