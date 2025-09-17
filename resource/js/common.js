
// header
$(document).ready(function () {
	// GNB
	$('.depth_01 > li')
		.on('mouseenter focusin', function () {
		$(this).addClass('is-hover');
	})
		.on('mouseleave focusout', function () {
		$(this).removeClass('is-hover');
	});
	
	// GNB tabindex
	$('.gnb .depth_01 > li > a').on('focus', function(){
		// 현재 포커스된 메뉴의 depth_02__wrap 찾기
		const $depthWrap = $(this).closest('li').find('.depth_02__wrap');

		// depth_02__wrap이 있으면 내부의 링크들에 tabindex 추가
		if ($depthWrap.length > 0) {
			$depthWrap.find('a').attr('tabindex', '0');
		}
	});
	$('.gnb .depth_01 > li > a').on('blur', function(){
		const $depthWrap = $(this).closest('li').find('.depth_02__wrap');
		if ($depthWrap.length > 0) {
			$depthWrap.find('a').removeAttr('tabindex');
		}
	});

	// 햄버거버튼
	$('.sitemap-trigger').on('click', function () {
		$(this).toggleClass('is-active is-hover');
		$(this).next('.sitemap-wrap').stop().slideToggle(300);
		
		// body overflow 토글
		if ($(this).hasClass('is-active')) {
			$('body').css('overflow', 'hidden');
		} else {
			$('body').css('overflow', '');
		}
	});
});

//사이트맵(햄버거메뉴)
$(function () {
	if (window.innerWidth <= 720) {
		// 모바일(≤ 480px)일 때만 실행
		$('.site-map .depth1 > a.active').each(function () {
			$(this).closest('.depth1').find('> ul').show();
		});
	}
});
//사이트맵(햄버거메뉴)
function handleSiteMapState() {
	const $siteMap = $('.site-map');

	if (window.innerWidth <= 720) {
		// 모바일: 아코디언 열기 + 이벤트 바인딩
		$('.site-map .depth1 > a').off('click').on('click', function (e) {
			e.preventDefault();

			const $this = $(this);
			const $parent = $this.closest('.depth1');
			const $submenu = $parent.find('> ul');

			if ($this.hasClass('active')) {
				$('.site-map .depth1 > a').removeClass('active');
				$('.site-map .depth1 > ul').slideUp();
			} else {
				$('.site-map .depth1 > a').removeClass('active');
				$('.site-map .depth1 > ul').slideUp();
				$this.addClass('active');
				$submenu.stop(true, true).slideDown();
			}
		});

		// 초기에 active된 메뉴 열기
		$('.site-map .depth1 > a.active').each(function () {
			$(this).closest('.depth1').find('> ul').show();
		});

	} else {
		// PC: 아코디언 이벤트 제거
		$('.site-map .depth1 > a').off('click');

		// PC에서도 active된 메뉴는 항상 보여야 함
		$('.site-map .depth1 > ul').show();
	}
}
$(function () {
	handleSiteMapState(); // 초기 실행
	$(window).on('resize', handleSiteMapState); // 창 크기 바뀔 때도 실행
});

$('.btn-print').on('click', function () {
    $('[data-aos]').css({
        'opacity': '1',
        'transform': 'none'
    });
	
	window.print();
});


// URL 복사
$('.btn-urlCopy').on('click', function() {
	var url = window.location.href;

	if (navigator.clipboard && navigator.clipboard.writeText) {
		navigator.clipboard.writeText(url)
		.then(function() {
			alert('URL이 복사되었습니다!');
		})
		.catch(function() {
			alert('복사에 실패했습니다.');
		});
	} else {
		var $temp = $('<textarea>');
		$('body').append($temp);
		$temp.val(url).select();
		try {
			var successful = document.execCommand('copy');
			if(successful) {
				alert('URL이 복사되었습니다!');
			} else {
				alert('복사에 실패했습니다.');
			}
		} catch (err) {
			alert('복사에 실패했습니다.');
		}
		$temp.remove();
	}
});

//게시판 탭 현재위치로 스크롤 이동
$(function () {
	const $tabList = $('.board-tab-list01');

	// all-cate가 아닌 active 탭 우선
	let $activeTab = $tabList.find('li.active').not('.all-cate');

	// 없으면 all-cate fallback
	if ($activeTab.length === 0) {
		$activeTab = $tabList.find('li.all-cate.active');
	}

	if ($activeTab.length) {
		const scrollLeft =
			$activeTab.position().left + $tabList.scrollLeft()
			- ($tabList.width() / 2)
			+ ($activeTab.outerWidth() / 2);

		// 부드럽지 않고 빠르게 이동
		$tabList.scrollLeft(scrollLeft);
	}
});

//비밀번호 입력값 show/hide
$(document).ready(function () {
	const $input = $('.inpuFnChk');
	const $eyeIcon = $('.icoPassEye');

	// 입력값 있으면 아이콘 활성화
	$input.on('input', function () {
		if ($(this).val().trim() !== '') {
			$eyeIcon.addClass('active'); // 시각적으로 활성화만 하고
		} else {
			$eyeIcon.removeClass('active on'); // .on도 제거
			$input.attr('type', 'password');
		}
	});

	// 아이콘 클릭 시 보이기/가리기 토글
	$eyeIcon.on('click', function () {
		if (!$input.val().trim()) return; // 입력값 없으면 무시

		if ($(this).hasClass('on')) {
			$(this).removeClass('on');
			$input.attr('type', 'password');
		} else {
			$(this).addClass('on');
			$input.attr('type', 'text');
		}
	});
});

// 접근성 탭 기능 - 사용중인곳 :: 메인페이지 미니보드(.main-board), 
$(function(){
	const $tabWrap = $('.tab-wrap');
	const $tabs = $tabWrap.find('.tab-item');
	const $panels = $tabWrap.find('.tab-content');

	// 접근성 속성 자동 생성
	$tabs.each(function(i){
		const tabId = 'tab' + (i+1);
		const panelId = 'panel' + (i+1);

		$(this)
			.attr({
				id: tabId,
				role: 'tab',
				'aria-controls': panelId,
				'aria-selected': i === 0 ? 'true' : 'false',
				tabindex: i === 0 ? '0' : '-1'
			})
			.parent().attr('role', 'presentation');

		$panels.eq(i)
			.attr({
				id: panelId,
				role: 'tabpanel',
				'aria-labelledby': tabId
			})
			.prop('hidden', i !== 0);
	});

	// 탭 클릭 이벤트
	$tabs.on('click', function(){
		const $this = $(this);
		const targetPanel = $this.attr('aria-controls');

		// 모든 탭 상태 초기화
		$tabs
			.attr({'aria-selected': 'false', tabindex: '-1'})
			.parent().removeClass('active');

		// 선택 탭 활성화
		$this
			.attr({'aria-selected': 'true', tabindex: '0'})
			.parent().addClass('active');

		// 패널 전환
		$panels
			.removeClass('active')
			.prop('hidden', true);

		$('#' + targetPanel)
			.addClass('active')
			.prop('hidden', false);
	});

	// 키보드 접근성 (←, →)
	$tabs.on('keydown', function(e){
		let idx = $tabs.index(this);

		if(e.key === 'ArrowRight'){
			e.preventDefault();
			$tabs.eq((idx + 1) % $tabs.length).focus().click();
		}
		else if(e.key === 'ArrowLeft'){
			e.preventDefault();
			$tabs.eq((idx - 1 + $tabs.length) % $tabs.length).focus().click();
		}
	});
});

$(function () {
	let isKeyboard = false;

	// 키보드 사용 여부 체크
	$(document).on('keydown', function (e) {
		if (e.key === 'Tab') {
			isKeyboard = true;
		}
	});

	$(document).on('mousedown', function () {
		isKeyboard = false;
	});

	// 모든 포커스 가능한 요소에 적용
	$(document).on('focusin', function (e) {
		if (isKeyboard) {
			$(e.target).addClass('is-focus');
		}
	});

	$(document).on('focusout', function (e) {
		$(e.target).removeClass('is-focus');
	});
});

$(document).ready(function() {
	//물방울 마우스 효과 (S)
	$('.water-drop-effect').on('mouseenter', '.water-drop-inner', function(e){
		x = e.pageX - $(this).offset().left,
			y = e.pageY - $(this).offset().top;
		$(this).find('span').css({top: y, left: x});
		$(this).find('span').addClass('active');
	});

	$('.water-drop-effect').on('mouseleave', '.water-drop-inner', function(e){
		x = e.pageX - $(this).offset().left,
			y = e.pageY - $(this).offset().top;
		$(this).find('span').css({top: y, left: x});
		$(this).find('span').removeClass('active');
	});
	//물방울 마우스 효과 (E)
});

// 스크롤 이벤트 라이브러리 AOS 사용
AOS.init({
	duration: 1000,
	disable: function() { // 모바일에서 AOS 사용안함
		var maxWidth = 991; // 모바일 기기 너비 기준 (예: 768px)
		return window.innerWidth < maxWidth;
	}
});