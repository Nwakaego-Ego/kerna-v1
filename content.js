 function detectHighlight () {
   
document.addEventListener("mouseup", function(){
    const saveWords = window.getSelection().toString()
    if(saveWords.length > 0){
        console.log(saveWords)
    } else {return}
}) 
 }

  detectHighlight()




 