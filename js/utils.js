const createElement=function(tagName,className,content){

  const newElement=document.createElement(tagName);

  if(className){
    newElement.setAttribute('class', className);
  }
  if(content){
    newElement.innerHTML=`${content}`;
  }

  return newElement
}