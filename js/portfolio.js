$(document).ready(function(){
    const header = $('header'),
          main = $('main'),
          menu = $('header .depth1 li'),
          content = $('main .item'),
          mainOffsetTop = main.offset().top;

    // $(window).resize(function(){
    //     mainOffsetTop = main.offset().top;
    // })

    $(window).scroll(function(){
        const scrolled = $(window).scrollTop() >= mainOffsetTop
        header.toggleClass('down', scrolled)
        $('.depth1 > li > a').toggleClass('color', scrolled);
    })
    
    // header border
    // $('.depth1 li a').click(function(){
    //    $('.depth1 li a').not(this).find('span:first').removeClass('act')
    //    $('.depth1 li a').not(this).find('span:last').removeClass('acc')
    //    $(this).find('span:first').addClass('act')
    //    $(this).find('span:last').addClass('acc')
    // })
    
    menu.click(function(e){
        e.preventDefault();
        $(this).addClass('on')
        $(this).siblings().removeClass('on')
        const idx = $(this).index();
        const section = content.eq(idx)
        let sectionDistance = section.offset().top-(106)
        $('html, body').animate({
            scrollTop : sectionDistance
        })  
    })

    $(window).scroll(function(){
        content.each(function(){
            if($(this).offset().top <= $(window).scrollTop()+106){
                const idx = $(this).index()
                menu.removeClass('on')
                menu.eq(idx).addClass('on')
            }
        })
    })
})

const items = document.querySelectorAll('.gallery li')
const close = document.querySelector('.pop-up .btn button')
const videos = document.querySelector('.pop-up figure video')
const popUp = document.querySelector('.pop-up')

items.forEach((el, index) => {

    el.addEventListener('click', (e) => {
        let videoSrc = e.currentTarget.querySelector('video').getAttribute('src')

        popUp.querySelector('video').setAttribute('src', videoSrc)
        // popUp.classList.add('active')
        popUp.querySelector('video').play()
        
        $('.pop-up').css({
          'top': (($(window).height()-$('.pop-up').outerHeight())/2+$(window).scrollTop())+'px',
          'left': (($(window).width()-$('.pop-up').outerWidth())/2+$(window).scrollLeft())+'px'
        })

        $('.pop-up').css({'display': 'block'})

        close.onclick = () => {
          // popUp.classList.remove('active')
          $('.pop-up').css('display', 'none')
          popUp.querySelector('video').pause();
      }
    })


})




const scroller = document.querySelector('.scroller--var');
const docEl = document.documentElement;
const scrollHeight = docEl.scrollHeight - docEl.clientHeight;

window.addEventListener('scroll', (event) => {
    let scrollTop = docEl.scrollTop;
    let scrollPercent = (scrollTop/scrollHeight) * 100 + '%';
    scroller.style.width = scrollPercent;
  });


$('.count').each(function() { 
    var $this = $(this),
        countTo = $this.attr('data-count');
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
    {
      duration: 3000, 
      easing:'swing',
      step: function(index) {
        $this.text(Math.floor(this.countNum));
        $this.delay(index*500);
      },
      complete: function() { 
        $this.text(this.countNum);
      }
    });  
  });


// 커서

  var $cursor = $('.cursor');

function moveCursor(e) {
  $cursor.addClass('is-moving');
  $cursor.css({"top": e.pageY, "left": e.pageX});


  clearTimeout(timer2);

   var timer2 = setTimeout(function() {
       $cursor.removeClass('is-moving');
   }, 800);

}

$(window).on('mousemove', moveCursor);



// quick menu

$('.quick .depth2 li a').click(function(e) {
  var href = $(this).attr('href');
  
  var targetTop = $(href).offset().top-106;
  
  /*
  // 한번에 가도록 하는 방법
  $(window).scrollTop(targetTop);
  */
  
  $('html').stop().animate({scrollTop:targetTop}, 500);
  
  e.preventDefault();
});

function Page__updateIndicatorActive() {
  var scrollTop = $(window).scrollTop();
  
  // 역순으로 검색해야 편하다
  $($('.item').get().reverse()).each(function(index, node) {
      var $node = $(this);
      var offsetTop = parseInt($node.attr('data-offset-top'));
      
      if ( scrollTop >= offsetTop ) {
          // 기존 녀석에게 활성화 풀고
          $('.quick .depth2 li a.active').removeClass('active');
          // 해당하는 녀석에게 활성화 넣고
          
          var currentPageIndex = $node.index();
          $('.quick .depth2 li a').eq(currentPageIndex).addClass('active');
          
          $('html').attr('data-current-page-index', currentPageIndex);
          
          return false; // 더 이상 다른 페이지를 검사하지 않는다.
      }
  });
}

// 각 페이지의 offsetTop 속성을 업데이트
function Page__updateOffsetTop() {
  
  $('.item').each(function(index, node) {
      var $page = $(node);
      var offsetTop = $page.offset().top-106;
      
      $page.attr('data-offset-top', offsetTop);
  });
  
  // 계산이 바뀌었으니까, 다시 상태 업데이트
  Page__updateIndicatorActive();
}

function Page__init() {
  Page__updateOffsetTop();
}

// 초기화
Page__init();

// 화면이 리사이즈 할 때 마다, offsetTop을 다시계산
$(window).resize(Page__updateOffsetTop);

// 스크롤이 될 때 마다, 인디케이터의 상태를 갱신
$(window).scroll(Page__updateIndicatorActive);


(function(){
  //function으로 감싸면 내영역이 확보되어 오염시키지 않고 타이핑 효과 적용 가능
  const spanEl = document.querySelector('.main .bg .text span')
  const txtArr = ["Welcome to","Je Hotae's","Portfolio"]
  
  // console.log(spanE1)
  index = 0
  let currentTxt = txtArr[index].split('')// 화면에 표시할 문장 배열에서 요소를 하나 가져온 뒤 배열로 만들기 => 단어를 하나하나 추출함

  function writeTxt(){
      spanEl.textContent += currentTxt.shift();
      // 배열 요소를 앞에서부터 하나씩 출력 shift : 배열 맨 앞 요소를 가져와서 원본 배열에서 삭제
      // +=  ex) a += 1 ==>  a = a+1

      if(currentTxt.length !== 0){
      //currenTxt의 길이가 (배열이)0 이 아니라면 == 출력해야할 단아가 남았다.
      // !== 아니다 ||    = 오른쪽것을 왼쪽에   ||  대입 == 같다

      setTimeout(writeTxt, Math.floor(Math.random() * 100))
      // 무작위로 글자의 타이핑 속도를 정함
      //setTimeout(딜레이(시작시간을 정함)),setInterval(반복),clear(반복제거)
      } else {
          //currentTxt 길이가 0이다 == 배열 안에 있는 모든 텍스트가 전부 출력이 되었다.
          currentTxt = spanEl.textContent.split("");
          //텍스트를 지우기 위해서 화면에 표시된 텍스트를 가져와서 단어단어를 분리
          setTimeout(deleteTxt, 1000)
          //3초 후 텍스트 지우기
      }
  }
  function deleteTxt(){
      //shift <-----> pop
      currentTxt.pop() //배열에 있는 요소를 끝에서부터 하나씩 삭제
      spanEl.textContent = currentTxt.join('') // 현재 배열에 있는 요소를 하나의 문자열로 합쳐서 삭제된것처럼 보임
      if(currentTxt.length !==0){
          setTimeout(deleteTxt, Math.floor(Math.random()*100))
          // 만약에 값이 남아있으면 deleteTxt()함수를 호출하고 호출시간은 0~100 랜덤으로 돌리겠다.
      }else {
          //모든 배열이 pop에 의해서 삭제되면 실행
          index = (index + 1) % txtArr.length;
          // %(나머지), /(나누기)
          currentTxt = txtArr[index].split("")
          writeTxt();
      }
  }
  writeTxt()
})();


//hamburger

const toggleBtn = document.querySelector('.header .header-inner .gnb .fa-bars')
const resmenu = document.querySelector('.header .header-inner .gnb .depth1')

toggleBtn.addEventListener('click', () => {
  resmenu.classList.toggle('active')
  toggleBtn.classList.toggle('active')
})

resmenu.addEventListener('click', () => {
  resmenu.classList.remove('active')
})