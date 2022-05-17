
$(document).ready(function(){

  let start = 0;

  if (start === 0) {
    start++;
    let firstNav = $('#menu a:first-child');
    firstNav.addClass('display');
    firstNav.children().addClass('active');

    let workexElements = $('.workitem');
    workexclick(workexElements[0]);
  };

  let sectionIds = $('#menu a');

  $(document).scroll(function() {
    console.log("scrollllllll");
    sectionIds.each(function(a){
      console.log($(this).children());
      let container = $(this).attr('href');
      let containerOffset = $(container).offset().top;
      let containerHeight = $(container).outerHeight();
      let containerBottom = containerOffset+containerHeight;
      let scrollPosition = $(document).scrollTop();

      if(scrollPosition < containerBottom-20 && scrollPosition>=containerOffset-20) {
        $(this).children().addClass('active');
        $(this).addClass('display');
      } else {
        $(this).children().removeClass('active');
        $(this).removeClass('display');
      };
    });
  });
});

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
let open=false;
function menuToggle() {
  // console.log(open)
  let elements = $('#menu').children();
  let arrowElement = $('#menu-container p');

  if(open) {
    open = false;
    arrowElement.text('▽');
    elements.each(function(idx, val) {
      if(!$(this).children("h4").hasClass('active')) {
        $(this).removeClass('display');
      }
    })
  } else {
    open = true;
    arrowElement.text('△');
    elements.addClass('display');
  }
}
