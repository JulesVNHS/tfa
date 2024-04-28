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
      }, 500);
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
  var color1 = '#09030D';
  var color2 = '#1B0C21';
  
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

/*mouvements survol des tableaux*/
const image = document.querySelector('.hello__me'); // Sélection de l'élément par sa classe

        // Fonction pour mettre à jour l'inclinaison en fonction de la position de la souris
        function updateRotation(event) {
            const imageRect = image.getBoundingClientRect();
            const mouseX = event.clientX - imageRect.left;
            const mouseY = event.clientY - imageRect.top;

            const rotateX = (mouseY / imageRect.height - 0.5) * 30;
            const rotateY = (mouseX / imageRect.width - 0.5) * 30;

            image.style.setProperty('--rotatex', rotateX + 'deg');
            image.style.setProperty('--rotatey', rotateY + 'deg');
        }

        // Écouter les événements de mouvement de la souris sur l'image
        image.addEventListener('mousemove', updateRotation);
        image.addEventListener('mouseleave', () => {
            // Réinitialiser l'inclinaison lorsque la souris quitte l'image
            image.style.setProperty('--rotatex', '0deg');
            image.style.setProperty('--rotatey', '0deg');
        });

/*Parallaxe*/
const parallaxItem = document.querySelector(".hello__follow");

document.addEventListener("mouseleave", function (e) {
    parallaxItem.style.transform = "translate(0%, 0%)";
});

document.addEventListener("mousemove", function (e) {
  if (!isTouchDevice()) {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

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
  }
});

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
            center: h / 5,
            outside: h / 3
        };

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

        draw();

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

        document.querySelector('.home__group').addEventListener('mouseenter', function () {
            flashlight_size.outside *= 2;
            draw();
        });

        document.querySelector('.home__group').addEventListener('mouseleave', function () {
            flashlight_size.outside = h / 3;
            draw();
        });
    }
}

initializeCanvas();*/