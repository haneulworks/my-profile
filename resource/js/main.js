$(function() {
	// 메인 섹션 스크롤 휠
	const $sections = $('.main-section');
	let currentIndex = 0;
	let isScrolling = false;

	function scrollToSection(index) {
		if (index < 0 || index >= $sections.length) return;
		isScrolling = true;
		$('html, body').stop().animate({
			scrollTop: $sections.eq(index).offset().top
		}, 800, function() {
			isScrolling = false;
		});
		currentIndex = index;
	}

	$(window).on('wheel', function(e) {
		if (isScrolling) return;

		const delta = e.originalEvent.deltaY;
		const scrollTop = $(window).scrollTop();
		const windowHeight = $(window).height();
		const sectionTop = $sections.eq(currentIndex).offset().top;
		const sectionHeight = $sections.eq(currentIndex).outerHeight();

		if (delta > 0) {
			// 아래로 스크롤
			const scrollBottom = scrollTop + windowHeight;
			const sectionBottom = sectionTop + sectionHeight;

			// 현재 섹션의 맨 아래 근처까지 내렸을 때만 다음 섹션으로 이동
			if (scrollBottom >= sectionBottom - 10) {
				scrollToSection(currentIndex + 1);
			}
		} else if (delta < 0) {
			// 위로 스크롤
			// 현재 섹션의 맨 위 근처에서만 이전 섹션으로 이동
			if (scrollTop <= sectionTop + 10) {
				scrollToSection(currentIndex - 1);
			}
		}
	});
});