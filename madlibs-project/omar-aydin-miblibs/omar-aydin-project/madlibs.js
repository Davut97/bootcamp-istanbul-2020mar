/**
 * Complete the implementation of parseStory.
 *
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 *
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 *
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 *
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 *
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
 */
function parseStory(rawStory) {
  // Your code here.
  console.log(rawStory);
  const RegNVA = /(?:^|\W)[n|v|a](?:$|\W)/g;
  const RegPC = /\.|,/;

  const arr = rawStory.split(' ');
  console.log(arr);
  let result = [];
  arr.forEach((el) => {
    if (RegNVA.test(el)) {
      if (RegPC.test(el)) {
        checkCP(el);
      } else {
        Check(el);
      }
    } else {
      result.push({
        word: el,
      });
    }
  });
  function Check(el) {
    if (el.match(RegNVA)[0] === '[n]') {
      el = el.replace(RegNVA, '');
      result.push({
        word: el,
        pos: 'noun',
      });
    } else if (el.match(RegNVA)[0] === '[v]') {
      el = el.replace(RegNVA, '');
      result.push({
        word: el,
        pos: 'verb',
      });
    } else if (el.match(RegNVA)[0] === '[a]') {
      el = el.replace(RegNVA, '');
      result.push({
        word: el,
        pos: 'adj',
      });
    }
  }
  function checkCP(el) {
    let cp = el.match(RegPC)[0];
    el = el.replace(RegPC, '');
    Check(el);
    result.push({
      word: cp,
    });
  }
  console.log(result);
  return result;
  // return {}; // This line is currently wrong :)
}

/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 *
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
  });
