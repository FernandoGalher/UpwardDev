/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Nav.
		var $nav = $('#nav');
		var $subpageLogo = $('.subpage-nav-logo');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

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
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
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

		}

	// Subpage fixed logo.
		if ($subpageLogo.length > 0) {

			$main
				.scrollex({
					mode: 'top',
					enter: function() {
						$body.addClass('subpage-logo-visible');
					},
					leave: function() {
						$body.removeClass('subpage-logo-visible');
					}
				});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

	// Rotating footer quote.
		var purposeQuotes = [
			'"Si no planificas, estás planeando fracasar." | Probablemente Benjamin Franklin',
			'"El azar favorece a la mente preparada." | Louis Pasteur',
			'"Los guerreros victoriosos ganan primero y luego van a la guerra, mientras que los derrotados van primero a la guerra y luego buscan ganar." | Sun Tzu',
			'"Lo que bien empieza, está medio hecho." | Probablemente Aristóteles',
			'"Al no prepararte, te estás preparando para fracasar." | Probablemente Benjamin Franklin'
		];

		var $purposeQuote = $('.js-purpose-quote');

		if ($purposeQuote.length > 0 && purposeQuotes.length > 0) {

			var storageKey = 'upwarddev-purpose-quote-index';
			var previousIndex = window.localStorage ? parseInt(window.localStorage.getItem(storageKey), 10) : -1;
			var nextIndex = Math.floor(Math.random() * purposeQuotes.length);

			if (purposeQuotes.length > 1) {
				while (nextIndex === previousIndex)
					nextIndex = Math.floor(Math.random() * purposeQuotes.length);
			}

			$purposeQuote.text(purposeQuotes[nextIndex]);

			if (window.localStorage)
				window.localStorage.setItem(storageKey, nextIndex);

		}

})(jQuery);
