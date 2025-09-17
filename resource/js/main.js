$(document).ready(function() {
    mainSwiper(); //메인비주얼 슬라이드
	eventSwiper(); //메인 이벤트존 슬라이드
});
//메인 비주얼 슬라이드 (S)
function mainSwiper() {

    const swiperOptions = {
        loop: false,
        effect: 'fade',
		fadeEffect: { 
			crossFade: true 
		},
		observer: true,  
		observeParents: true,
		speed: 2000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false
        },
        // custom pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            /*renderBullet: function (i, className) {
                return `
                <button class="${className}">
                <svg class="progress"><circle class="circle-origin" r="9" cx="10" cy="10"></circle></svg><span></span>
                </button>
                `;
            }*/
        },
		navigation: {
			nextEl: '.mainVisual .swiper-button-next',
			prevEl: '.mainVisual .swiper-button-prev',
		},
    };

    const mainSwiper = new Swiper(".mainVisual .swiper-container", swiperOptions);

    // 자동재생 제어 버튼
    $('.mainVisual .btn-autoplay').click(function () {
        const $btn = $(this);

		if ($btn.hasClass('on')) {
			mainSwiper.autoplay.start();
			$btn.attr('aria-label', '정지'); // 🔹 상태를 정지로 변경
		} else {
			mainSwiper.autoplay.stop();
			$btn.attr('aria-label', '재생'); // 🔹 상태를 재생으로 변경
		}

		$btn.toggleClass('on');
    });
}
//메인비주얼 슬라이드 (E)

// 자동 아코디언 - 사용중인곳 :: 메인비주얼 내 절차안내 (S)
$(function(){
	const $items = $('.step-acodian .item');
	let currentIndex = $items.index($items.filter('.active'));
	let timer;

	function moveActive() {
		currentIndex = (currentIndex + 1) % $items.length;
		$items.removeClass('active').eq(currentIndex).addClass('active');
	}

	function startTimer() {
		if ($(window).width() >= 992) {
			timer = setInterval(moveActive, 4000);
		}
	}

	function stopTimer() {
		clearInterval(timer);
	}

	function init() {
		stopTimer();
		$items.off('click'); // 기존 이벤트 해제

		if ($(window).width() >= 992) {
			// 초기 진입 시 첫 번째 요소에 active 추가
			if (!$items.filter('.active').length) {
				currentIndex = 0;
				$items.removeClass('active').eq(currentIndex).addClass('active');
			}

			startTimer();
			$items.on('click', function(){
				stopTimer();
				currentIndex = $items.index(this);
				$items.removeClass('active').eq(currentIndex).addClass('active');
				startTimer();
			});
		} else {
			// 992 미만일 때 active 초기화
			$items.removeClass('active');
		}
	}

	init();

	// 창 크기 바뀔 때마다 재실행
	$(window).on('resize', function(){
		init();
	});
});
// 자동 아코디언 - 사용중인곳 :: 메인비주얼 내 절차안내 (E)

// 이벤트존 (S)
function eventSwiper() {

    const swiperOptions = {
		slidesPerView: 1,
		spaceBetween: 16,
        loop: true,
        effect: 'slide',
		observer: true,  
		observeParents: true,
		speed: 1200,
        autoplay: true,
		
        // custom pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
		
		navigation: {
			nextEl: '.eventSwiper .swiper-button-next',
			prevEl: '.eventSwiper .swiper-button-prev',
		},
    };

    const eventSwiper = new Swiper(".eventSwiper", swiperOptions);
	
	// 자동재생 제어 버튼
	$('.eventSwiper .btn-autoplay').click(function () {
		const $btn = $(this);

		if ($btn.hasClass('on')) {
			eventSwiper.autoplay.start();
			$btn.attr('aria-label', '정지'); // 🔹 상태를 정지로 변경
		} else {
			eventSwiper.autoplay.stop();
			$btn.attr('aria-label', '재생'); // 🔹 상태를 재생으로 변경
		}

		$btn.toggleClass('on');
	});
}
// 이벤트존 (E)

// 무한배너 (S)
let flowSwiper;
let originalSlidesHTML = '';
let originalSlideCount = 0;

function freeFlowSwiper() {
	const isMobile = window.innerWidth <= 991;

	flowSwiper = new Swiper('.freeFlowSwiper', {
		spaceBetween: isMobile ? 8 : 0,
		centeredSlides: isMobile ? false :true,
		speed: isMobile ? 500 : 6e3,
		autoplay: isMobile
			? false
			: {
					delay: 1,
					disableOnInteraction: false,
			  },
		loop: true,
		loopedSlides: 20,
		initialSlide: 0,
		slidesPerView: 'auto',
		allowTouchMove: true,
		grabCursor: !isMobile,
	});
}

/* 복제된 슬라이드의 포커스 가능한 요소를 모두 tabindex=-1 로 만든다 */
function disableTabOnClones() {
	document
		.querySelectorAll('.freeFlowSwiper .swiper-slide[data-clone="true"]')
		.forEach((clone) => {
			clone
				.querySelectorAll('a, button, input, [tabindex]')
				.forEach((el) => {
					// 원래 tabindex를 보관할 필요가 있으면 data 속성에 저장 가능
					if (!el.hasAttribute('data-saved-tabindex')) {
						el.setAttribute('data-saved-tabindex', el.hasAttribute('tabindex') ? el.getAttribute('tabindex') : '');
					}
					el.setAttribute('tabindex', '-1');
				});
		});
}

window.addEventListener('load', function () {
	const swiperWrapper = document.querySelector('.freeFlowSwiper .swiper-wrapper');
	if (!swiperWrapper) return;

	// 현재 DOM에 있는 슬라이드들을 원본으로 표시하고 HTML 저장
	const initialSlides = Array.from(swiperWrapper.querySelectorAll('.swiper-slide'));
	originalSlideCount = initialSlides.length;
	initialSlides.forEach((sl) => sl.setAttribute('data-original', 'true'));
	originalSlidesHTML = initialSlides.map((s) => s.outerHTML).join('');

	// PC에서만 복제해서 빈 공간을 채움 (여기서 한 번만 복제)
	if (window.innerWidth > 991 && originalSlideCount > 0) {
		// 원본 + 복제(한번)
		swiperWrapper.innerHTML = originalSlidesHTML + originalSlidesHTML;
		// 두번째 블록(인덱스 >= originalSlideCount)을 clone으로 표시
		Array.from(swiperWrapper.querySelectorAll('.swiper-slide')).forEach((sl, idx) => {
			if (idx < originalSlideCount) {
				sl.setAttribute('data-original', 'true');
			} else {
				sl.setAttribute('data-clone', 'true');
			}
		});
	} else {
		// 모바일 또는 원본이 없으면 원본만 유지
		swiperWrapper.innerHTML = originalSlidesHTML;
		Array.from(swiperWrapper.querySelectorAll('.swiper-slide')).forEach((sl) => sl.setAttribute('data-original', 'true'));
	}

	// Swiper 초기화
	freeFlowSwiper();

	// 복제 슬라이드 포커스 비활성화
	disableTabOnClones();

	// 안전망: 만약 포커스가 복제 슬라이드로 잡히면(브라우저 이슈 등),
	// 복제 제거 후 원본만 남기고 Swiper 재초기화, 대응 원본으로 포커스 이동
	document.addEventListener('focusin', function (e) {
		const cloneSlide = e.target.closest('.freeFlowSwiper .swiper-slide[data-clone="true"]');
		if (!cloneSlide) return;

		// 복제 슬라이드 인덱스 -> 대응 원본 index 계산
		const allSlides = Array.from(document.querySelectorAll('.freeFlowSwiper .swiper-slide'));
		const clones = allSlides.filter((s) => s.getAttribute('data-clone') === 'true');
		const originals = allSlides.filter((s) => s.getAttribute('data-original') === 'true');

		const cloneIndex = clones.indexOf(cloneSlide);
		const targetOriginal = originals[cloneIndex % originals.length];

		// wrapper를 원본 상태로 복원 (복제 제거)
		const wrapper = document.querySelector('.freeFlowSwiper .swiper-wrapper');
		wrapper.innerHTML = originalSlidesHTML;
		Array.from(wrapper.querySelectorAll('.swiper-slide')).forEach((sl) => sl.setAttribute('data-original', 'true'));

		// Swiper 재초기화
		if (flowSwiper) flowSwiper.destroy(true, true);
		freeFlowSwiper();

		// 대응되는 원본 요소로 포커스 이동 (가능하다면)
		// 주의: DOM이 재생성 되었으므로 targetOriginal 참조는 이전 DOM의 것임.
		// 여기서는 간단히 첫번째 원본의 포커서블 요소로 이동.
		const firstFocusable = document.querySelector('.freeFlowSwiper .swiper-slide[data-original] a, .freeFlowSwiper .swiper-slide[data-original] button, .freeFlowSwiper .swiper-slide[data-original] [tabindex]');
		if (firstFocusable) firstFocusable.focus();
	});
});

window.addEventListener('resize', function () {
	// 화면 크기 바뀌면 기존 Swiper 제거하고 (원본 HTML 기준) 다시 구성
	if (!originalSlidesHTML) return; // 아직 초기화 안된 경우 안전 처리
	if (flowSwiper) flowSwiper.destroy(true, true);

	const wrapper = document.querySelector('.freeFlowSwiper .swiper-wrapper');
	if (window.innerWidth > 991 && originalSlideCount > 0) {
		wrapper.innerHTML = originalSlidesHTML + originalSlidesHTML;
		Array.from(wrapper.querySelectorAll('.swiper-slide')).forEach((sl, idx) => {
			sl.removeAttribute('data-original');
			sl.removeAttribute('data-clone');
			if (idx < originalSlideCount) sl.setAttribute('data-original', 'true');
			else sl.setAttribute('data-clone', 'true');
		});
	} else {
		wrapper.innerHTML = originalSlidesHTML;
		Array.from(wrapper.querySelectorAll('.swiper-slide')).forEach((sl) => {
			sl.removeAttribute('data-clone');
			sl.setAttribute('data-original', 'true');
		});
	}

	freeFlowSwiper();
	disableTabOnClones();
});

// 무한배너 (E)