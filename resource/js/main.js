// 프로그래스 바
const skillsSection = document.querySelector('#skills');
let isAnimated = false;

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting && !isAnimated) {
			isAnimated = true;

			$('.progress-bar').each(function() {
				var percent = $(this).find('.progress-per').text().trim();
				$(this).find('.progress-fill').animate({
					width: percent + '%'
				}, 1000);
			});
		}
	});
}, {
	threshold: 0.3 // 30% 보이면 실행
});

observer.observe(skillsSection);


$(document).ready(function() {
    let activeFilters = [];
    const typeMap = {
        "홈페이지": "home",
        "쇼핑몰": "shop",
        "CMS": "cms",
        "자사솔루션": "solution"
    };

    // 필터 버튼 클릭
    $('.project-filter__wrap .btn').click(function() {
        const filterType = typeMap[$(this).text()];

        if (activeFilters.includes(filterType)) {
            activeFilters = activeFilters.filter(f => f !== filterType);
            $(this).removeClass('active');
        } else {
            activeFilters.push(filterType);
            $(this).addClass('active');
        }

        filterProjects();
    });

    // 초기화 버튼 클릭
    $('.btn-reset').click(function() {
        // 회전 애니메이션 클래스 추가
        $(this).addClass('rotate');
        // 애니메이션 끝나면 클래스 제거
        setTimeout(() => {
            $(this).removeClass('rotate');
        }, 500); // 애니메이션 시간과 동일

        // 필터 초기화
        activeFilters = [];
        $('.project-filter__wrap .btn').removeClass('active');
        $('.project-list__content').show();
    });

    // 필터링 함수
    function filterProjects() {
        if (activeFilters.length === 0) {
            $('.project-list__content').show();
        } else {
            $('.project-list__content').each(function() {
                const projectTypes = $(this).data('project-type').split(',');
                const show = activeFilters.some(f => projectTypes.includes(f));
                if (show) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    }
});