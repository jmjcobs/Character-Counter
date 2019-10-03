function handleSubmit(e) {
    // Find the value
    console.log(e);
}



function countCharacters(string) {
    return string.split("").reduce((accumulatorObj, letter) => {
        // Check if the accumulator object has the key
        if (accumulatorObj[letter]) {
            // Increment the count by one
            accumulatorObj[letter]++;
        } else {
            // If the key is not in the object add it with a count of 1
            accumulatorObj[letter] = 1;
        }
        return accumulatorObj;
    }, {});
}
