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