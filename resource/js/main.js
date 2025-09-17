$(document).ready(function() {
    mainSwiper(); //메인비주얼 슬라이드
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

function scrollAnkerTo(id) {
	const x = document.getElementById(id);
	x.scrollIntoView({ behavior: "smooth", block: "start" });
}