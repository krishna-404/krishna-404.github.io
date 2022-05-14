window.addEventListener("DOMContentLoaded", function(){
  let start = 0;

  if (start ===0) {
    start++;
    let workexElements = document.getElementsByClassName('workitem');
    workexclick(workexElements[0]);
  };
})


function workexclick(clickedElement){
  // console.log(clickedElement);
  let count = clickedElement.getAttribute('count');
  // console.log(count);
  let workmenuElements = document.getElementsByClassName('workitem');
  let workdeetsElements = document.getElementsByClassName('workdeetsitem');

  for(let i=0; i<workdeetsElements.length; i++){
    // console.log(window.innerWidth);
    if (i == count){
      workmenuElements[i].style.color = '#7CAE7A'
      if(window.innerWidth < 960) {
        workmenuElements[i].style['border-bottom']= '2px solid #7CAE7A';
      } else {
        workmenuElements[i].style['border-left']= '2px solid #7CAE7A';
      }
      workdeetsElements[i].style.display = 'block';      
    } else {
      workmenuElements[i].style.color = '#003249'
      if (window.innerWidth < 960) {
        workmenuElements[i].style['border-bottom'] = '2px solid #839073';
      } else {
        workmenuElements[i].style['border-left']= '2px solid #839073';
      }
      workdeetsElements[i].style.display = 'none';
    }
  }
}
let oldElement;

function menuClick(newElement) {
  newElement.style.color = '#007EA7';
  console.log(oldElement);
  if (oldElement) oldElement.style.color = '#003249';
  oldElement = newElement;
}