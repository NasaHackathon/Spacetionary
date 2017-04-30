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

  function getNumberVotesBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
  }

  function getOthers() {
    let max = 10;
    let out = '';

    while(--max) {
      out += `<div class="hg-other-container">
        <div class="hg-tooltip-content">
          <h3 id="select-term">${selection.search_term}</h3>
          <p>${selection.definition}</p>
        </div>
        <div class="btn-bar-hg-tooltip">
          <div class="btn-bar-hg-tooltip-classification">
            <div data-voteup="${getNumberVotesBetween(50,100)}" class="btn-hg-tooltip see-more-button btn-vote-up">80 👍</div>
            <div data-votedown="${getNumberVotesBetween(0,50)}" class="btn-hg-tooltip see-more-button btn-vote-down">30 👎</div>
          </div>
          <div class="btn-hg-tooltip hg-authour">luizstacio@gmail.com</div>
        </div>
      </div>`
    }

    return out;
  }

  bubbleDOM.innerHTML = (
     `<div class="tool-bar-hg-tooltip">
        <div data-tab="1" class="tab-ctrl btn-tool-bar active">Geral</div>
        <div data-tab="2" class="tab-ctrl btn-tool-bar">Other descriptions</div>
      </div>
      <div data-tab="1" class="tab tab-container">
        <div class="hg-tooltip-content">
          <h3 id="select-term">${selection.search_term}</h3>
          <p>${selection.definition}</p>
          <div style="text-align: center;">
            <img src="https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57723/globe_west_2048.jpg" style="max-width: 100%; height: 280px;"/>
          </div>
        </div>
        <div class="btn-bar-hg-tooltip">
          <div class="btn-bar-hg-tooltip-classification">
            <div class="btn-hg-tooltip see-more-button">120 👍</div>
            <div class="btn-hg-tooltip see-more-button">30 👎</div>
          </div>
          <div class="btn-hg-tooltip see-more-button">See more...</div>
        </div>
      </div>
      <div data-tab="2" class="tab tab-container">
        <div class="hg-others-container">
          ${getOthers()}
        </div>
        <div class="btn-bar-hg-tooltip">
          <div class="btn-hg-tooltip hg-create-description">Create a new description</div>
        </div>
      </div>
      <div data-tab="3" class="tab tab-container description-container">
        <div class="description-container-content">
          <input placeholder="Title" value="${selection.search_term}" class="hg-input" disabled="true">
          <div class="hg-text-editor">
            <div id="hg-editor">
              ${selection.definition}
            </div>
          </div>
        </div>
        <div class="btn-bar-hg-tooltip">
          <div class="btn-hg-tooltip form-cancel-button">Cancel</div>
          <div class="btn-hg-tooltip form-save-button">Save</div>
        </div>
      </div>`
  );

  const quill = new Quill('#hg-editor', {
    theme: 'snow'
  });

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

  $('.tab:not([data-tab=1])').hide();
  $('.tab-ctrl:not([data-tab=1])').removeClass('active');
  
  $(bubbleDOM).on('click', '.hg-create-description', (e) => {
    e.stopPropagation();
    $('.tab').hide();
    $('.tab[data-tab=3]').show();
  });

  $(bubbleDOM).on('click','.btn-vote-up', function (e) {
    e.stopPropagation();
    const btn = $(this);
    let voteup = btn.data('voteup');

    btn.data('voteup', ++voteup);

    btn.text(`${voteup} 👍`);
  });

  $(bubbleDOM).on('click','.btn-vote-down', function (e) {
    e.stopPropagation();
    const btn = $(this);
    let votedown = btn.data('votedown');
    
    btn.data('votedown', --votedown);
    
    btn.text(`${votedown} 👎`);
  });
}
