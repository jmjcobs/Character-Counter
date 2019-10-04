// D3 Form Submission
d3.select('form').on('submit', () => {
  d3.event.preventDefault();
  let input = d3.select('input');
  let text = input.property('value');

  /* The d3 update pattern
1. Grab the **update** selection
   1. Make any changes unique to that selection
   1. Store the selection in a variable
1. Grab the **exit** selection
   1. Remove any unnecessary elements
1. Grab the **enter** selection
   1. Make any changes unique to that selection
1. **Merge** `.merge()` the enter and update selections
   1. Make changes ytou want to be shared accross both selections
*/

  // Build the bar graph
  // Select the letters currently on the page
  let letters = d3
    .select('#letters')
    .selectAll('.letter')
    .data(countCharacters(text), d => {
      return d.character;
    });

  letters
    .classed('new', false) // any existing letters should not be 'new'
    .exit() // Select elements that are no longer needed
    .remove(); // And remove them

  // Add New Letters
  letters
    .enter()
    .append('div')
    .classed('letter', true)
    .classed('new', true)

    // Updates to be made to both the update and enter selections
    .merge(letters)
    .style('width', '20px')
    .style('line-height', '20px')
    .style('margin-right', '5px')
    .style('height', d => {
      return d.count * 20 + 'px';
    })
    .text(d => {
      return d.character;
    });

  // Display the phrase in the form input
  d3.select('#phrase').text(`Analysis of: ${text}`);

  d3.select('#count').text(
    `(New Characters: ${letters.enter().nodes().length})`
  );

  // Clear the input
  input.property('value', '');
});

// ========================================
// RESET THE FORM
// ========================================
d3.select('#reset').on('click', () => {
  d3.selectAll('.letter').remove();
  d3.select('#phrase').text('');
  d3.select('#count').text('');
});

// ========================================
// COUNT THE CHARACTERS
// ========================================
function countCharacters(string) {
  return string.split('').reduce((letterCountArray, letter) => {
    // Find the object for the given letter if it exists
    letterObj = letterCountArray.find(letterObj => {
      return letterObj.character == letter;
    });

    // Check if a letter object was found,
    if (letterObj) {
      letterObj.count++;
    } else {
      // create a new one if no letter object is found
      letterCountArray.push({
        character: letter,
        count: 1
      });
    }

    return letterCountArray;
  }, []);
}
