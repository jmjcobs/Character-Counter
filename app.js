// D3 Form Submission
d3.select('form').on('submit', () => {
  d3.event.preventDefault();
  let input = d3.select('input');
  let text = input.property('value');

  // Build the bar graph
  d3.select('#letters')
    .selectAll('.letter')
    .data(countCharacters(text))
    .enter()
    .append('div')
    .classed('letter', true)
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

  // Clear the input
  input.property('value', '');
});

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
