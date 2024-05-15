"use strict";

/*Sticky Menu*/
let lastScrollTop = 0;
const menu = document.querySelector('.menu');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    menu.classList.add('menu--hidden');
  } else if(!document.body.classList.contains('stop-hidden')) {
    menu.classList.remove('menu--hidden');
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

document.querySelectorAll('.menu__list a').forEach(function(link) {
  link.addEventListener('click', function() {
      document.body.classList.add('stop-hidden');
      setTimeout(function() {
        document.body.classList.remove('stop-hidden');
      }, 1000);
      menu.classList.add('menu--hidden');
  });
});

/*Etat Actif*/
const menuItems = document.querySelectorAll('.menu__el');

menuItems.forEach(item => {
  item.addEventListener('click', () => {
    menuItems.forEach(item => {
      item.classList.remove('menu__el--active');
    });

    item.classList.add('menu__el--active');
  });
});

/*Couleur Menu*/
document.addEventListener('scroll', function() {
  var scrollTop = window.scrollY;
  var windowHeight = window.innerHeight;
  var documentHeight = document.body.scrollHeight;
  var scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;
  var color2 = '#09030D';
  var color1 = '#1B0C21';
  
  var newColor = mixColors(color1, color2, scrollPercentage / 100);
  var menu = document.querySelector('.menu');
  menu.style.background = newColor;
});

function mixColors(color1, color2, ratio) {
  var r1 = parseInt(color1.substring(1, 3), 16);
  var g1 = parseInt(color1.substring(3, 5), 16);
  var b1 = parseInt(color1.substring(5, 7), 16);

  var r2 = parseInt(color2.substring(1, 3), 16);
  var g2 = parseInt(color2.substring(3, 5), 16);
  var b2 = parseInt(color2.substring(5, 7), 16);

  var r = Math.round(r1 * (1 - ratio) + r2 * ratio);
  var g = Math.round(g1 * (1 - ratio) + g2 * ratio);
  var b = Math.round(b1 * (1 - ratio) + b2 * ratio);

  return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}

/*Mouvements survol des tableaux*/
const images = document.querySelectorAll('.move');
let initialBeta = null;
let initialGamma = null;

function isMouseEventOrTrackpad(event) {
    return event.clientX !== undefined && event.clientY !== undefined;
}

function updateRotation(event) {
    if (!isMouseEventOrTrackpad(event)) return;
    const imageRect = this.getBoundingClientRect();
    const mouseX = event.clientX - imageRect.left;
    const mouseY = event.clientY - imageRect.top;
    const rotateX = (mouseY / imageRect.height - 0.5) * 30;
    const rotateY = (mouseX / imageRect.width - 0.5) * 30;
    this.style.setProperty('--rotatex', rotateX + 'deg');
    this.style.setProperty('--rotatey', rotateY + 'deg');
}

function resetRotation() {
    this.style.setProperty('--rotatex', '0deg');
    this.style.setProperty('--rotatey', '0deg');
}

images.forEach(image => {
    image.addEventListener('mousemove', updateRotation);
    image.addEventListener('mouseleave', resetRotation);
});

if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        const beta = event.beta;
        const gamma = event.gamma;
        
        if (initialBeta === null || initialGamma === null) {
            initialBeta = beta;
            initialGamma = gamma;
        }

        let rotateX = ((beta - initialBeta) / 90) * 30;
        let rotateY = ((gamma - initialGamma) / 90) * 30;

        rotateX = Math.max(-30, Math.min(30, rotateX));
        rotateY = Math.max(-30, Math.min(30, rotateY));

        images.forEach(image => {
            image.style.setProperty('--rotatex', rotateX + 'deg');
            image.style.setProperty('--rotatey', rotateY + 'deg');
        });
    });
}

/*Parallaxe*/
const parallaxItems = document.querySelectorAll(".follow");

document.addEventListener("mouseleave", function (e) {
    parallaxItems.forEach(item => {
        item.style.transform = "translate(0%, 0%)";
    });
});

document.addEventListener("mousemove", function (e) {
    if (isDesktop()) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        parallaxItems.forEach(parallaxItem => {
            const parallaxItemRect = parallaxItem.getBoundingClientRect();
            const parallaxItemCenterX = parallaxItemRect.left + parallaxItemRect.width / 2;
            const parallaxItemCenterY = parallaxItemRect.top + parallaxItemRect.height / 2;

            const deltaX = parallaxItemCenterX - mouseX;
            const deltaY = parallaxItemCenterY - mouseY;

            const newX = parallaxItemCenterX + deltaX * 0.03;
            const newY = parallaxItemCenterY + deltaY * 0.03;

            const translateX = (parallaxItemCenterX - newX) / parallaxItemRect.width * 100;
            const translateY = (parallaxItemCenterY - newY) / parallaxItemRect.height * 100;

            parallaxItem.style.transform = `translate(${translateX}%, ${translateY}%)`;
        });
    }
});

function isDesktop() {
    return !isTouchDevice();
}

function isTouchDevice() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

/*lampe torche*/
/*try {
    var __canvas_DOM = document.createElement('canvas'),
        __content = document.getElementsByTagName('body')[0];
    if (window.getComputedStyle(__content).getPropertyValue('position') !== 'relative') {
        __content.style.position = 'relative';
    }
    __canvas_DOM.setAttribute("style", "position: fixed; top: 0; left: 0; pointer-events: none; z-index: 1;");
    __content.appendChild(__canvas_DOM);
} catch (e) {
    console.info("Une exception s'est produite : " + e);
}

function initializeCanvas() {
    __canvas_DOM.width = window.innerWidth;
    __canvas_DOM.height = window.innerHeight;

    if (__canvas_DOM.getContext) {
        var c = __canvas_DOM.getContext('2d'),
            w = __canvas_DOM.width,
            h = __canvas_DOM.height;

        var centerPoint = {
            x: w / 2,
            y: h / 2
        };

        var pointerEvent = ('ontouchstart' in window) ? 'touchmove' : 'mousemove';

        var mousePosition = {
            x: centerPoint.x,
            y: centerPoint.y
        };

        var flashlight_size = {
            center: h / 6,
            outside: h / 3
        };

        var original_flashlight_size = flashlight_size.outside;

        var gradient_color = {
            first: "rgba(0,0,0,0.8)",
            second: "rgba(0,0,0,0)"
        };

        var gradient;

        function draw() {
            c.save();
            c.clearRect(0, 0, w, h);
            gradient = c.createRadialGradient(mousePosition.x, mousePosition.y, flashlight_size.center, mousePosition.x, mousePosition.y, flashlight_size.outside);
            gradient.addColorStop(0, gradient_color.first);
            gradient.addColorStop(1, gradient_color.second);

            c.fillStyle = '#000';
            c.fillRect(0, 0, w, h);

            c.globalCompositeOperation = 'destination-out';
            c.fillStyle = gradient;
            c.beginPath();
            c.arc(mousePosition.x, mousePosition.y, flashlight_size.outside, 0, Math.PI * 2, false);
            c.fill();
            c.restore();
        }

        function animateSize(targetSize) {
            var startTime = performance.now();
            var startSize = flashlight_size.outside;

            function updateSize(timestamp) {
                var progress = timestamp - startTime;
                if (progress < 300) { // Durée de l'animation en millisecondes
                    flashlight_size.outside = startSize + (targetSize - startSize) * (progress / 500);
                    draw();
                    requestAnimationFrame(updateSize);
                } else {
                    flashlight_size.outside = targetSize;
                    draw();
                }
            }

            requestAnimationFrame(updateSize);
        }

        function updatePosition(x, y) {
            mousePosition.x = x;
            mousePosition.y = y;
            draw();
        }

        window.addEventListener(pointerEvent, function (e) {
            if (pointerEvent === 'touchmove') {
                var touch = e.touches[0];
                updatePosition(touch.clientX, touch.clientY);
            } else {
                updatePosition(e.clientX, e.clientY);
            }
        });

        __canvas_DOM.addEventListener('mouseleave', function () {
            mousePosition.x = centerPoint.x;
            mousePosition.y = centerPoint.y;
            draw();
        });

        window.addEventListener('resize', function () {
            initializeCanvas();
        });

        var expandElements = document.querySelectorAll('.expand');
        expandElements.forEach(function (element) {
            element.addEventListener('mouseenter', function () {
                var targetSize = original_flashlight_size * 4;
                animateSize(targetSize);
            });

            element.addEventListener('mouseleave', function () {
                var targetSize = original_flashlight_size * 2;
                animateSize(targetSize);
            });
        });

        var inspectElements = document.querySelectorAll('.inspect');
        inspectElements.forEach(function (element) {
            element.addEventListener('mouseenter', function () {
                var targetSize = original_flashlight_size;
                animateSize(targetSize);
            });

            element.addEventListener('mouseleave', function () {
                var targetSize = original_flashlight_size * 2;
                animateSize(targetSize);
            });
        });

        draw();
    }
}

initializeCanvas();*/

/*Le Jeu*/
var $board = $('.card__list'),
    $card = $('.card__el'),
    $itemCount = $('info__list span'),
    $wins = $('.wins span'),
    $turns = $('.turns span'),
    $attempts = $('.attempts span'),
    $attemptsOverall = $('.attempts-overall span'),
    $success = $('.success'),
    $successMsg = $('.success__message'),
    $btnContinue = $('.success__btn'),
    selectedClass = 'is-selected',
    visibleClass = 'is-visible',
    scoreUpdateClass = 'is-updating',
    lastTurnClass = 'last-turn',
    dataMatch = 'data-matched',
    dataType = 'data-type',
    turnsCount = 2,
    winsCount = 0,
    attemptsCount = 0,
    attemptsOverallCount = 0,
    tooManyAttempts = 8,
    timeoutLength = 600,
    card1, card2, msg;

shuffleCards();

$card.on('click', function() {
  if ($(this).attr(dataMatch) == 'false') {
    $(this).addClass(selectedClass);
  }

  var selectedCards = $('.' + selectedClass);

  if (selectedCards.length == 2) {
    card1 = selectedCards.eq(0).attr(dataType);
    card2 = selectedCards.eq(1).attr(dataType);

    if (card1 == card2) {
      selectedCards
        .attr(dataMatch, true)
        .removeClass(selectedClass)
        .addClass('matched');

    } else {
      setTimeout(function() {
        turnsCount--;
        $turns
          .addClass(scoreUpdateClass)
          .html(turnsCount);
        selectedCards.removeClass(selectedClass);
      }, timeoutLength);

      if(turnsCount === 1) {
        setTimeout(function() {
          $turns.addClass(lastTurnClass);
        }, timeoutLength);
      }

      if(turnsCount <= 0) {
        setTimeout(function() {
          turnsCount = 2;
          $turns
            .removeClass(lastTurnClass)
            .html(turnsCount);
          $card.attr(dataMatch, false);
          attemptsCount += 1;
          $attempts
            .addClass(scoreUpdateClass)
            .html(attemptsCount);
          $card.removeClass('matched');
        }, timeoutLength);
      }

    }
  }

  if ($('[' + dataMatch + '="true"]').length == $card.length) {
    $success.addClass(visibleClass);
    $card.removeClass('matched');

    switch(true) {
      case (attemptsCount <= 2):
        msg = "Parfait !!!";
        break;
      case (attemptsCount > 2 && attemptsCount <= 5):
        msg = "Super !!";
        break;
      case (attemptsCount > 5 && attemptsCount <= 8):
        msg = "Bravo !";
        break;
      case (attemptsCount > tooManyAttempts):
        msg = "Tu peux t'améliorer...";
        break;
    }
    $successMsg.text(msg);

    setTimeout(function() {
      attemptsOverallCount += attemptsCount;
      $attemptsOverall
        .addClass(scoreUpdateClass)
        .html(attemptsOverallCount);
      winsCount += 1;
      $wins
        .addClass(scoreUpdateClass)
        .html(winsCount);
      $card.attr(dataMatch, false);
    }, 1200);
  }

});

$itemCount.on(
  "webkitAnimationEnd oanimationend msAnimationEnd animationend",
  function() {
    $itemCount.removeClass(scoreUpdateClass);
  }
);

$btnContinue.on('click', function() {
  $success.removeClass(visibleClass);
  $('body').removeClass('no-scroll');
  shuffleCards();
  setTimeout(function() {
    turnsCount = 2;
    $turns
      .removeClass(lastTurnClass)
      .html(turnsCount);
    attemptsCount = 0;
    $attempts.html(attemptsCount);
  }, 300);
});

$success.on('transitionend', function() {
  if ($success.hasClass(visibleClass)) {
    $('body').addClass('no-scroll');
  } else {
    $('body').removeClass('no-scroll');
  }
});

function shuffleCards() {
  var cards = $board.children();
  while (cards.length) {
    $board.append(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
  }
}


/*Apparitions Cartes*/
document.addEventListener('DOMContentLoaded', function() {
  const cardElements = Array.from(document.querySelectorAll('.card__pop'));

  function revealElements() {
    const shuffledElements = shuffleArray(cardElements);
    
    shuffledElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 50);
    });
  }

  revealElements();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
});

/*Chargement*/
$(document).ready(function() {
	$('.skip').click(function() {
		$('.overlay, body').addClass('loaded');
	})

	$(window).bind('load', function() {
		$('.overlay, body').addClass('loaded');
		setTimeout(function() {
			$('.overlay').css({'display':'none'})
		}, 2000)
	});
	
	setTimeout(function() {
		$('.overlay, body').addClass('loaded');
	}, 60000);
})