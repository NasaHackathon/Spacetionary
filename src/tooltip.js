const bubbleDOM = document.createElement('div');
bubbleDOM.setAttribute('class', 'selection-bubble');
document.body.appendChild(bubbleDOM);

document.addEventListener('click', function (e) {
  const selection = window.getSelection().toString();
  console.log(window.getSelection());
  const querySelection = queryHighlightedWord(selection);
  
  if (selection.length > 0) {
    renderBubble(e.clientX, e.clientY, querySelection);
  }
}, false);

// Move that bubble to the appropriate location.
function renderBubble(mouseX, mouseY, selection) {
  const selectionData = selection;
  const fontSize = parseInt($(window.getSelection().anchorNode.parentElement).css('font-size'));

  window.selectionData = selectionData;

  selectionData.definition = selectionData.definition.length > 96 ?
                             selectionData.definition.slice(0, 94) + '...' :
                             selectionData.definition;
 
  bubbleDOM.innerHTML = `<div class="selection-bubble-content">
                          <h3 id="select-term">${selection.term}</h3>
                          <p>${selection.definition}</p>
                         </div>
                         <div class="btn-bar-selection-bubble">
                          <div class="btn-bar-selection-bubble-classification">
                            <div class="btn-selection-bubble see-more-button">👍</div>
                            <div class="btn-selection-bubble see-more-button">👎</div>
                          </div>
                          <div class="btn-selection-bubble see-more-button">See more...</div>
                        </div>`;

  const instance = new Mark(window.getSelection().baseNode);
  instance.mark(selection.term, {
    "element": "span",
    "className": "us-highlight"
  });

  bubbleDOM.style.top = mouseY - (bubbleDOM.offsetHeight + fontSize + 10) + 'px';
  bubbleDOM.style.left = mouseX + 'px';
  bubbleDOM.style.transform = 'translateX(-50%)';
  bubbleDOM.style.visibility = 'visible';
}