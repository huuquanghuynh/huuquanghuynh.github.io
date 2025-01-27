/*
	Prologue by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$nav = $('#nav');

	// Breakpoints.
		breakpoints({
			wide:      [ '961px',  '1880px' ],
			normal:    [ '961px',  '1620px' ],
			narrow:    [ '961px',  '1320px' ],
			narrower:  [ '737px',  '960px'  ],
			mobile:    [ null,     '736px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav_a = $nav.find('a');

		$nav_a
			.addClass('scrolly')
			.on('click', function(e) {

				var $this = $(this);

				// External link? Bail.
					if ($this.attr('href').charAt(0) != '#')
						return;

				// Prevent default.
					e.preventDefault();

				// Deactivate all links.
					$nav_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
					$this
						.addClass('active')
						.addClass('active-locked');

			})
			.each(function() {

				var	$this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
					if ($section.length < 1)
						return;

				// Scrollex.
					$section.scrollex({
						mode: 'middle',
						top: '-10vh',
						bottom: '-10vh',
						initialize: function() {

							// Deactivate section.
								$section.addClass('inactive');

						},
						enter: function() {

							// Activate section.
								$section.removeClass('inactive');

							// No locked links? Deactivate all links and activate this section's one.
								if ($nav_a.filter('.active-locked').length == 0) {

									$nav_a.removeClass('active');
									$this.addClass('active');

								}

							// Otherwise, if this section's link is the one that's locked, unlock it.
								else if ($this.hasClass('active-locked'))
									$this.removeClass('active-locked');

						}
					});

			});

	// Scrolly.
		$('.scrolly').scrolly();

	// Header (narrower + mobile).

		// Toggle.
			$(
				'<div id="headerToggle">' +
					'<a href="#header" class="toggle"></a>' +
				'</div>'
			)
				.appendTo($body);

		// Header.
			$('#header')
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'header-visible'
				});

})(jQuery);

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelector('.gallery-slides');
    const slideElements = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.gallery-nav-prev');
    const nextBtn = document.querySelector('.gallery-nav-next');

    let currentIndex = 0; // Index de la slide active
    const totalSlides = slideElements.length;

    const updateSlidePosition = () => {
        const slideWidth = slideElements[0].offsetWidth; // Largeur d'une slide
        const gap = parseInt(window.getComputedStyle(slides).gap || 0); // Espacement entre les slides
        const containerWidth = slides.parentElement.offsetWidth; // Largeur visible du conteneur

        // Calcul de la translation
        let translateX = currentIndex * (slideWidth + gap);

        // Si on est sur la dernière image, ajuster pour qu'elle s'arrête à droite
        const totalContentWidth = totalSlides * (slideWidth + gap);
        const maxTranslate = totalContentWidth - containerWidth;
        translateX = Math.min(translateX, maxTranslate);

        slides.style.transition = 'transform 0.5s ease'; // Transition fluide
        slides.style.transform = `translateX(-${translateX}px)`; // Appliquer la translation
    };

    // Défilement vers la droite
    nextBtn.addEventListener('click', () => {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Revenir à la première image
        }
        updateSlidePosition();
    });

    // Défilement vers la gauche
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Aller à la dernière image
        }
        updateSlidePosition();
    });

    // Réajuster la position lors du redimensionnement de la fenêtre
    window.addEventListener('resize', updateSlidePosition);
});


