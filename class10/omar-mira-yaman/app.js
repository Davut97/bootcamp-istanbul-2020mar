const capitalize = function(string){
    const str = string.split('');
    let result = str.map(el=> {
     return  el.toUpperCase();
    })
   return  result.join("");
  }
  
  //console.log(capitalize('who'));
  
  
  const swapCase = function(string){
    const str = string.split(' ');
    let result = str.map((el , index)=> {
      if(index === 0 || index % 2 === 0){
          return capitalize(el);
      }else{
        return el
      }
    })
   return  result.join(" ");
  }
  
  //console.log(swapCase('hey gurl, lets javascript together sometime'));
  
  
  const shiftLetters = function(string){
    const str = string.split('');
    let word = [] 
    let result= str.map(el=>{
      let letterCode = el.charCodeAt()+1
      word.push(String.fromCharCode(letterCode));
    });
    return word.join('')
  }
  //console.log(shiftLetters('hello'))
  
  
  const countLetters = function(string){
  
  return string.split("").reduce((accumulator, currentValue) => {
  accumulator.hasOwnProperty(currentValue) ?
  accumulator[currentValue]++ :
  accumulator[currentValue] = 1
  return accumulator
  }, {})
  };
  
  console.log(countLetters('aaabbbbbccceee'));