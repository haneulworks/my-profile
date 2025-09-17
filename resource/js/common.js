(() => {
	const target = 'a, button';   // 적용할 요소
	let isTabFocus = false;       // 최근 포커스가 Tab 키로 이동했는지 여부

	/* ──────────────────────────────
	* 1) 키 입력·마우스 클릭 구분
	* ────────────────────────────── */
	document.addEventListener('keydown', e => {
		if (e.key === 'Tab') isTabFocus = true;   // Tab 키 눌림 → 키보드 포커스
	});
	document.addEventListener('mousedown', () => {
		isTabFocus = false;                       // 마우스 클릭 → 키보드 아님
	});

	/* ──────────────────────────────
	* 2) 마우스 Hover
	* ────────────────────────────── */
	document.addEventListener('mouseover', e => {
		if (e.target.matches(target)) e.target.classList.add('is-hover');
	});
	document.addEventListener('mouseout', e => {
		if (e.target.matches(target)) e.target.classList.remove('is-hover');
	});

	/* ──────────────────────────────
	* 3) 키보드(Tab) Focus
	* ────────────────────────────── */
	document.addEventListener('focusin', e => {
		if (isTabFocus && e.target.matches(target)) {
			e.target.classList.add('is-focus');
		}
	});
	document.addEventListener('focusout', e => {
		if (e.target.matches(target)) e.target.classList.remove('is-focus');
	});
})();

// header
// 스크롤 이동
function scrollAnkerTo(id) {
	const x = document.getElementById(id);
	x.scrollIntoView({ behavior: "smooth", block: "start" });
}

// 스크롤 이벤트 라이브러리 AOS 사용
AOS.init({
	duration: 1000,
	disable: function() { // 모바일에서 AOS 사용안함
		var maxWidth = 991; // 모바일 기기 너비 기준 (예: 768px)
		return window.innerWidth < maxWidth;
	}
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


//페이지 프린트
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
