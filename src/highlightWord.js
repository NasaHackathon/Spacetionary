var head= document.getElementsByTagName('head')[0];

var context = document.querySelector("body");
console.log('context', context);
var instance = new Mark(context);
console.log('instance', instance);
var words = ['moon', 'blue'];

function handleSetQuery(findWords) {
    instance.mark(findWords);
}
handleSetQuery(words);
