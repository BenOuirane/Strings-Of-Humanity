"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var botiga = botiga || {};
/**
 * Is the DOM ready?
 *
 * This implementation is coming from https://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
 *
 * @param {Function} fn Callback function to run.
 */

botiga.helpers = {
  botigaDomReady: function botigaDomReady(fn) {
    if (typeof fn !== 'function') {
      return;
    }

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      return fn();
    }

    document.addEventListener('DOMContentLoaded', fn, false);
  },
  ajax: function ajax(action, nonce, extraParams, successCallback) {
    var ajax = new XMLHttpRequest();
    ajax.open('POST', botiga.ajaxurl, true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    ajax.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        successCallback.apply(this);
      }
    };

    var extraParamsStr = '';
    extraParams = Object.entries(extraParams);

    for (var i = 0; i < extraParams.length; i++) {
      extraParamsStr += '&' + extraParams[i].join('=');
    }

    ajax.send('action=' + action + '&nonce=' + nonce + extraParamsStr);
  },
  setCookie: function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  },
  getCookie: function getCookie(cname) {
    var name = cname + "=",
        ca = document.cookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }
};
/**
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */

botiga.navigation = {
  init: function init() {
    var siteNavigation = document.getElementById('site-navigation');
    var offCanvas = document.getElementsByClassName('botiga-offcanvas-menu')[0]; // Return early if the navigation don't exist.

    if (!siteNavigation) {
      return;
    }

    var button = document.getElementsByClassName('menu-toggle')[0];
    var closeButton = document.getElementsByClassName('mobile-menu-close')[0]; // Return early if the button don't exist.

    if ('undefined' === typeof button) {
      return;
    }

    var menu = siteNavigation.getElementsByTagName('ul')[0];
    var mobileMenuClose = siteNavigation.getElementsByClassName('mobile-menu-close')[0]; // Hide menu toggle button if menu is empty and return early.

    if ('undefined' === typeof menu) {
      button.style.display = 'none';
      return;
    }

    if (!menu.classList.contains('nav-menu')) {
      menu.classList.add('nav-menu');
    }

    var focusableEls = offCanvas.querySelectorAll('a[href]:not([disabled]):not(.mobile-menu-close)');
    var firstFocusableEl = focusableEls[0];
    button.addEventListener('click', function (e) {
      e.preventDefault();
      button.classList.add('open');
      offCanvas.classList.add('toggled');
      document.body.classList.add('mobile-menu-visible'); //Toggle submenus

      var submenuToggles = offCanvas.querySelectorAll('.dropdown-symbol, .menu-item-has-children > a[href="#"]');

      var _iterator = _createForOfIteratorHelper(submenuToggles),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var submenuToggle = _step.value;
          submenuToggle.addEventListener('touchstart', submenuToggleHandler);
          submenuToggle.addEventListener('click', submenuToggleHandler);
          submenuToggle.addEventListener('keydown', function (e) {
            var isTabPressed = e.key === 'Enter' || e.keyCode === 13;

            if (!isTabPressed) {
              return;
            }

            e.preventDefault();
            var parent = submenuToggle.parentNode.parentNode;
            parent.getElementsByClassName('sub-menu')[0].classList.toggle('toggled');
          });
        } //Trap focus inside modal

      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      firstFocusableEl.focus();
    });

    function submenuToggleHandler(e) {
      e.preventDefault();
      var parent = e.target.closest('li');
      parent.querySelector('.sub-menu').classList.toggle('toggled');
    }

    var focusableEls = offCanvas.querySelectorAll('a[href]:not([disabled])');
    var firstFocusableEl = focusableEls[0];
    var lastFocusableEl = focusableEls[focusableEls.length - 1];
    var KEYCODE_TAB = 9;
    lastFocusableEl.addEventListener('keydown', function (e) {
      var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey)
        /* shift + tab */
        {} else
        /* tab */
        {
          firstFocusableEl.focus();
        }
    });
    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
      button.focus();
      button.classList.remove('open');
      offCanvas.classList.remove('toggled');
      document.body.classList.remove('mobile-menu-visible');
    }); // Get all the link elements within the menu.

    var links = menu.getElementsByTagName('a'); // Get all the link elements with children within the menu.

    var linksWithChildren = menu.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a'); // Toggle focus each time a menu link is focused or blurred.

    var _iterator2 = _createForOfIteratorHelper(links),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var link = _step2.value;
        link.addEventListener('focus', toggleFocus, true);
        link.addEventListener('blur', toggleFocus, true);
      } // Toggle focus each time a menu link with children receive a touch event.

    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    var _iterator3 = _createForOfIteratorHelper(linksWithChildren),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _link = _step3.value;

        _link.addEventListener('touchstart', toggleFocus, false);
      }
      /**
       * Sets or removes .focus class on an element.
       */

    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    function toggleFocus() {
      if (event.type === 'focus' || event.type === 'blur') {
        var self = this; // Move up through the ancestors of the current link until we hit .nav-menu.

        while (!self.classList.contains('nav-menu')) {
          // On li elements toggle the class .focus.
          if ('li' === self.tagName.toLowerCase()) {
            self.classList.toggle('focus');
          }

          self = self.parentNode;
        }
      }

      if (event.type === 'touchstart') {
        var menuItem = this.parentNode;
        event.preventDefault();

        var _iterator4 = _createForOfIteratorHelper(menuItem.parentNode.children),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var link = _step4.value;

            if (menuItem !== link) {
              link.classList.remove('focus');
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        menuItem.classList.toggle('focus');
      }
    } // Menu reverse


    this.checkMenuReverse();
  },

  /* 
  * Check if sub-menu items are visible. If not, reverse the item position 
  */
  checkMenuReverse: function checkMenuReverse() {
    var items = document.querySelectorAll('.header-login-register, .top-bar-login-register');

    for (var i = 0; i < items.length; i++) {
      items[i].removeEventListener('mouseover', this.menuReverseEventHandler);
      items[i].addEventListener('mouseover', this.menuReverseEventHandler);
    }
  },
  menuReverseEventHandler: function menuReverseEventHandler() {
    var submenus = event.currentTarget.querySelectorAll('.header-login-register>nav, .top-bar-login-register>nav');

    for (var i = 0; i < submenus.length; i++) {
      if (isInViewport(submenus[i]) == false) {
        submenus[i].classList.add('sub-menu-reverse');
      }
    }

    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
  }
};
/**
 * Desktop offcanvas menu navigation
 */

botiga.desktopOffcanvasNav = {
  init: function init() {
    var buttons = document.querySelectorAll('.desktop-menu-toggle'),
        closeButton = document.getElementsByClassName('desktop-menu-close')[0],
        offcanvas = document.getElementsByClassName('botiga-desktop-offcanvas')[0];

    if (!buttons.length) {
      return false;
    }

    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function (e) {
        e.preventDefault();

        if (offcanvas.classList.contains('botiga-desktop-offcanvas-show')) {
          offcanvas.classList.remove('botiga-desktop-offcanvas-show');
        } else {
          offcanvas.classList.add('botiga-desktop-offcanvas-show');
        }
      });
    }

    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
      offcanvas.classList.remove('botiga-desktop-offcanvas-show');
    });
  }
};
/**
 * Header search
 */

botiga.headerSearch = {
  init: function init() {
    var self = this,
        button = document.querySelectorAll('.header-search'),
        form = window.matchMedia('(max-width: 1024px)').matches ? document.querySelector('#masthead-mobile .header-search-form') : document.querySelector('#masthead .header-search-form'),
        overlay = document.getElementsByClassName('search-overlay')[0],
        searchInput = form.getElementsByClassName('search-field')[0],
        searchBtn = form.getElementsByClassName('search-submit')[0];

    if (button.length === 0) {
      return;
    }

    var _iterator5 = _createForOfIteratorHelper(button),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var buttonEl = _step5.value;
        buttonEl.addEventListener('click', function (e) {
          e.preventDefault(); // Hide other search icons 

          if (button.length > 1) {
            var _iterator6 = _createForOfIteratorHelper(button),
                _step6;

            try {
              for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
                var btn = _step6.value;
                btn.classList.toggle('hide');
              }
            } catch (err) {
              _iterator6.e(err);
            } finally {
              _iterator6.f();
            }
          }

          form.classList.toggle('active');
          overlay.classList.toggle('active');
          e.target.closest('.header-search').getElementsByClassName('icon-search')[0].classList.toggle('active');
          e.target.closest('.header-search').getElementsByClassName('icon-cancel')[0].classList.toggle('active');
          e.target.closest('.header-search').classList.add('active');
          e.target.closest('.header-search').classList.remove('hide');
          searchInput.focus();

          if (e.target.closest('.botiga-offcanvas-menu') !== null) {
            e.target.closest('.botiga-offcanvas-menu').classList.remove('toggled');
          }
        });
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }

    overlay.addEventListener('click', function () {
      form.classList.remove('active');
      overlay.classList.remove('active'); // Back buttons to default state

      self.backButtonsToDefaultState(button);
    });
    searchBtn.addEventListener('keydown', function (e) {
      var isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      form.classList.remove('active');
      overlay.classList.remove('active'); // Back buttons to default state

      self.backButtonsToDefaultState(button);
      button.focus();
    });
    var desktop_offcanvas = document.getElementsByClassName('header-desktop-offcanvas-layout2')[0] !== null ? document.getElementsByClassName('botiga-desktop-offcanvas')[0] : false;

    if (desktop_offcanvas) {
      desktop_offcanvas.addEventListener('click', function (e) {
        if (e.target.closest('.header-search') === null) {
          form.classList.remove('active');
          overlay.classList.remove('active'); // Back buttons to default state

          self.backButtonsToDefaultState(button);
        }
      });
    }

    return this;
  },
  backButtonsToDefaultState: function backButtonsToDefaultState(button) {
    var _iterator7 = _createForOfIteratorHelper(button),
        _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var btn = _step7.value;
        btn.classList.remove('hide');
        btn.querySelector('.icon-cancel').classList.remove('active');
        btn.querySelector('.icon-search').classList.add('active');
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
  }
};
/**
 * Sticky header
 */

botiga.stickyHeader = {
  init: function init() {
    var sticky = document.getElementsByClassName('sticky-header')[0],
        body = document.getElementsByTagName('body')[0];

    if ('undefined' === typeof sticky) {
      return;
    }

    var topOffset = window.pageYOffset || document.documentElement.scrollTop;

    if (topOffset > 10) {
      sticky.classList.add('is-sticky');
      body.classList.add('sticky-header-active');
    }

    if (sticky.classList.contains('sticky-scrolltop')) {
      var lastScrollTop = 0;
      window.addEventListener('scroll', function () {
        var scroll = window.pageYOffset || document.documentElement.scrollTop;

        if (scroll > lastScrollTop || scroll < 10) {
          sticky.classList.remove('is-sticky');
          body.classList.remove('sticky-header-active');
        } else {
          sticky.classList.add('is-sticky');
          body.classList.add('sticky-header-active');
        }

        lastScrollTop = scroll <= 0 ? 0 : scroll;
      }, false);
    } else {
      window.addEventListener('scroll', function () {
        var vertDist = window.scrollY;

        if (vertDist > 1) {
          sticky.classList.add('sticky-shadow');
          body.classList.add('sticky-header-active');
        } else {
          sticky.classList.remove('sticky-shadow');
          body.classList.remove('sticky-header-active');
        }
      }, false);
    }
  }
};
/**
 * Botiga scroll direction
 */

botiga.scrollDirection = {
  init: function init() {
    var elements = document.querySelectorAll('.botiga-single-sticky-add-to-cart-wrapper.hide-when-scroll'),
        body = document.getElementsByTagName('body')[0];

    if ('null' === typeof elements) {
      return;
    }

    var lastScrollTop = 0;
    window.addEventListener('scroll', function () {
      var scroll = window.pageYOffset || document.documentElement.scrollTop;

      if (scroll > lastScrollTop) {
        body.classList.remove('botiga-scrolling-up');
        body.classList.add('botiga-scrolling-down');
      } else {
        body.classList.remove('botiga-scrolling-down');
        body.classList.add('botiga-scrolling-up');
      }

      lastScrollTop = scroll <= 0 ? 0 : scroll;
    }, false);
  }
};
/**
 * Botiga wishlist
 */

botiga.wishList = {
  init: function init() {
    this.build();
    this.events();
  },
  build: function build() {
    var button = document.querySelectorAll('.botiga-wishlist-button, .botiga-wishlist-remove-item');

    if (!button.length) {
      return false;
    }

    for (var i = 0; i < button.length; i++) {
      button[i].addEventListener('click', function (e) {
        e.preventDefault();
        var button = this,
            productId = this.getAttribute('data-product-id'),
            wishlistLink = this.getAttribute('data-wishlist-link'),
            type = this.getAttribute('data-type'),
            nonce = this.getAttribute('data-nonce');

        if (button.classList.contains('active')) {
          window.location = wishlistLink;
          return false;
        }

        var ajax = new XMLHttpRequest();
        ajax.open('POST', botiga.ajaxurl, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        if ('remove' === type) {
          button.closest('tr').classList.add('removing');
          button.classList.add('botigaAnimRotate');
          button.classList.add('botiga-anim-infinite');
        }

        ajax.onload = function () {
          if (this.status >= 200 && this.status < 400) {
            var response = JSON.parse(this.response),
                icons = document.querySelectorAll('.header-wishlist-icon'),
                qty = response.qty;

            if ('add' === type) {
              button.classList.add('active');

              if (button.closest('.single-product') !== null) {
                var single_wishlist_button_text = button.querySelector('.botiga-wishlist-text');
                single_wishlist_button_text.innerHTML = single_wishlist_button_text.getAttribute('data-wishlist-view-text');
              }
            } else {
              button.closest('tr').classList.add('removing');
              setTimeout(function () {
                button.closest('tr').remove();
              }, 800);
            }

            if (icons.length) {
              for (var i = 0; i < icons.length; i++) {
                icons[i].querySelector('.count-number').innerHTML = qty;
              }
            }
          }
        };

        ajax.send('action=botiga_button_wishlist&product_id=' + productId + '&nonce=' + nonce + '&type=' + type);
      });
    }
  },
  events: function events() {
    var _this = this;

    window.addEventListener('botiga.carousel.initialized', function () {
      _this.build();
    });
  }
};
/**
 * Botiga custom add to cart button
 * 
 */

botiga.customAddToCartButton = {
  init: function init() {
    var button = document.querySelectorAll('.botiga-custom-addtocart');

    if (!button.length) {
      return false;
    }

    for (var i = 0; i < button.length; i++) {
      button[i].addEventListener('click', function (e) {
        e.preventDefault();
        var button = this,
            productId = this.getAttribute('data-product-id'),
            initial_text = this.innerHTML,
            loading_text = this.getAttribute('data-loading-text'),
            added_text = this.getAttribute('data-added-text'),
            nonce = this.getAttribute('data-nonce');
        var ajax = new XMLHttpRequest();
        ajax.open('POST', botiga.ajaxurl, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        button.innerHTML = loading_text;

        ajax.onload = function () {
          if (this.status >= 200 && this.status < 400) {
            button.innerHTML = added_text;
            setTimeout(function () {
              button.innerHTML = initial_text;
            }, 1500);
            jQuery(document.body).trigger('wc_fragment_refresh');
          }
        };

        ajax.send('action=botiga_custom_addtocart&product_id=' + productId + '&nonce=' + nonce);
      });
    }
  }
};
/**
 * Botiga quick view
 */

botiga.quickView = {
  init: function init() {
    this.build();
    this.events();
  },
  build: function build() {
    var button = document.querySelectorAll('.botiga-quick-view'),
        popup = document.querySelector('.botiga-quick-view-popup'),
        closeButton = document.querySelector('.botiga-quick-view-popup-close-button'),
        popupContent = document.querySelector('.botiga-quick-view-popup-content-ajax');

    if (null === popup) {
      return false;
    }

    closeButton.addEventListener('click', function (e) {
      e.preventDefault();
    });
    popup.addEventListener('click', function (e) {
      if (null === e.target.closest('.botiga-quick-view-popup-content-ajax')) {
        popup.classList.remove('opened');
      }
    });

    for (var i = 0; i < button.length; i++) {
      button[i].addEventListener('click', function (e) {
        e.preventDefault();
        var productId = e.target.getAttribute('data-product-id'),
            nonce = e.target.getAttribute('data-nonce');
        popup.classList.add('opened');
        var ajax = new XMLHttpRequest();
        ajax.open('POST', botiga.ajaxurl, true);
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        ajax.onload = function () {
          if (this.status >= 200 && this.status < 400) {
            // If successful
            popupContent.innerHTML = this.response; // Initialize gallery 

            var productGallery = document.querySelector('.woocommerce-product-gallery');

            if ('undefined' !== typeof productGallery) {
              productGallery.dispatchEvent(new Event('wc-product-gallery-before-init'));
              jQuery(productGallery).wc_product_gallery(wc_single_product_params);
              productGallery.dispatchEvent(new Event('wc-product-gallery-after-init'));
            } // Initialize product variable


            var variationsForm = document.querySelector('.botiga-quick-view-summary .variations_form');

            if (typeof wc_add_to_cart_variation_params !== 'undefined') {
              jQuery(variationsForm).wc_variation_form();
            }

            botiga.qtyButton.init('quick-view');
            botiga.wishList.init();
            botiga.productSwatch.init();
          }
        };

        ajax.send('action=botiga_quick_view_content&product_id=' + productId + '&nonce=' + nonce);
      });
    }
  },
  events: function events() {
    var _this = this;

    window.addEventListener('botiga.carousel.initialized', function () {
      _this.build();
    });
  }
};
/**
 * Back to top button
 */

botiga.backToTop = {
  init: function init() {
    this.backToTop();
    window.addEventListener('scroll', function () {
      this.backToTop();
    }.bind(this));
  },
  backToTop: function backToTop() {
    var button = document.getElementsByClassName('back-to-top')[0];

    if ('undefined' !== typeof button) {
      var scrolled = window.scrollY;

      if (scrolled > 300) {
        button.classList.add('display');
      } else {
        button.classList.remove('display');
      }

      button.addEventListener('click', function () {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      });
    }
  }
};
/**
 * Quantity button
 */

botiga.qtyButton = {
  init: function init(type) {
    this.events(type);
    this.wooEvents();
  },
  events: function events(type) {
    var qty = document.querySelectorAll('form.cart .quantity, .botiga-quick-view-popup .quantity, .woocommerce-cart-form__cart-item.cart_item .quantity, .botiga-single-sticky-add-to-cart-wrapper-content .quantity');

    if (type === 'quick-view') {
      qty = document.querySelectorAll('.botiga-quick-view-popup .quantity');
    }

    if (qty.length < 1) {
      return false;
    }

    for (var i = 0; i < qty.length; i++) {
      if (qty[i].classList.contains('hidden')) {
        return false;
      }

      var plus = qty[i].querySelector('.botiga-quantity-plus'),
          minus = qty[i].querySelector('.botiga-quantity-minus');
      plus.classList.add('show');
      minus.classList.add('show');
      plus.addEventListener('click', function (e) {
        var input = this.parentNode.querySelector('.qty'),
            changeEvent = document.createEvent('HTMLEvents');
        e.preventDefault();
        input.value = input.value === '' ? 0 : parseInt(input.value) + 1;
        changeEvent.initEvent('change', true, false);
        input.dispatchEvent(changeEvent);
      });
      minus.addEventListener('click', function (e) {
        var input = this.parentNode.querySelector('.qty'),
            changeEvent = document.createEvent('HTMLEvents');
        e.preventDefault();
        input.value = parseInt(input.value) > 0 ? parseInt(input.value) - 1 : 0;
        changeEvent.initEvent('change', true, false);
        input.dispatchEvent(changeEvent);
      });
    }
  },
  wooEvents: function wooEvents() {
    var _self = this;

    if (typeof jQuery !== 'undefined') {
      jQuery('body').on('updated_cart_totals', function () {
        _self.events();
      });
    }
  }
};
/**
 * Carousel 
 */

botiga.carousel = {
  init: function init() {
    this.build();
    this.events();
  },
  build: function build() {
    if (document.querySelector('.botiga-carousel') === null && document.querySelector('.has-cross-sells-carousel') === null && document.querySelector('.botiga-woocommerce-mini-cart__cross-sell') === null) {
      return false;
    }

    var carouselEls = document.querySelectorAll('.botiga-carousel, #masthead .cross-sells, .cart-collaterals .cross-sells');

    var _iterator8 = _createForOfIteratorHelper(carouselEls),
        _step8;

    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var carouselEl = _step8.value;

        if (carouselEl.querySelector('.botiga-carousel-stage') === null) {
          carouselEl.querySelector('.products').classList.add('botiga-carousel-stage');
        }

        if (carouselEl.getAttribute('data-initialized') !== 'true') {
          var perPage = carouselEl.getAttribute('data-per-page');

          if (perPage === null) {
            var stageClassList = carouselEl.querySelector('.products').classList.value;

            if (stageClassList.indexOf('columns-4') > 0) {
              perPage = 4;
            }
          } // Mount carousel wrapper


          var wrapper = document.createElement('div'),
              stage = carouselEl.querySelector('.botiga-carousel-stage');
          wrapper.className = 'botiga-carousel-wrapper';
          wrapper.innerHTML = stage.outerHTML;
          stage.remove();
          carouselEl.append(wrapper); // Margin

          var margin = 30;

          if (typeof botiga_carousel !== 'undefined') {
            margin = parseInt(botiga_carousel.margin_desktop);
          } else if (carouselEl.closest('.botiga-woocommerce-mini-cart__cross-sell') !== null) {
            margin = 15;
          } // Initialize


          var carousel = new Siema({
            parentSelector: carouselEl,
            selector: '.botiga-carousel-stage',
            duration: 200,
            easing: 'ease-out',
            perPage: perPage !== null ? {
              0: 1,
              768: 2,
              1025: parseInt(perPage)
            } : 2,
            startIndex: 0,
            draggable: true,
            multipleDrag: false,
            threshold: 20,
            loop: true,
            rtl: false,
            // autoplay: true, TO DO
            margin: margin,
            onInit: function onInit() {
              window.dispatchEvent(new Event('botiga.carousel.initialized'));
            }
          });
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
  },
  events: function events() {
    var _this = this;

    if (typeof jQuery !== 'undefined') {
      var onpageload = true;
      jQuery(document.body).on('wc_fragment_refresh added_to_cart removed_from_cart', function () {
        setTimeout(function () {
          var mini_cart = document.getElementById('site-header-cart'),
              mini_cart_list = mini_cart.querySelector('.cart_list');

          if (mini_cart_list !== null) {
            if (mini_cart_list.children.length > 2) {
              mini_cart.classList.remove('mini-cart-has-no-scroll');
              mini_cart.classList.add('mini-cart-has-scroll');
            } else {
              mini_cart.classList.remove('mini-cart-has-scroll');
              mini_cart.classList.add('mini-cart-has-no-scroll');
            }
          }

          _this.build();

          onpageload = false;
        }, onpageload ? 1000 : 0);
      });
    }
  }
};
/**
 * Copy link to clipboard
 */

botiga.copyLinkToClipboard = {
  init: function init(event, el) {
    event.preventDefault();
    navigator.clipboard.writeText(window.location.href);
    el.classList.add('copied');
    el.setAttribute('data-botiga-tooltip', botiga.i18n.botiga_sharebox_copy_link_copied);
    setTimeout(function () {
      el.setAttribute('data-botiga-tooltip', botiga.i18n.botiga_sharebox_copy_link);
      el.classList.remove('copied');
    }, 1000);
  }
};
/**
 * Toggle class
 */

botiga.toggleClass = {
  init: function init(event, el, triggerEvent) {
    event.preventDefault();
    event.stopPropagation();
    var selector = document.querySelector(el.getAttribute('data-botiga-selector')),
        removeClass = el.getAttribute('data-botiga-toggle-class-remove'),
        classname = el.getAttribute('data-botiga-toggle-class'),
        classes = selector.classList;

    if (typeof removeClass === 'string') {
      classes.remove(removeClass);
    }

    classes.toggle(classname);

    if (triggerEvent) {
      var ev = document.createEvent('HTMLEvents');
      ev.initEvent(triggerEvent, true, false);
      window.dispatchEvent(ev);
    }
  }
};
/**
 * Product Swatch
 */

botiga.productSwatch = {
  init: function init() {
    var wrapper = document.querySelectorAll('.botiga-variations-wrapper');

    if (!wrapper.length) {
      return false;
    }

    for (var i = 0; i < wrapper.length; i++) {
      this.variations(wrapper[i]);
    }

    this.resetVariationsEvent();
  },
  variations: function variations(wrapper) {
    var self = this,
        select = wrapper.querySelector('select'),
        items = wrapper.querySelectorAll('.botiga-variation-item');

    for (var i = 0; i < items.length; i++) {
      if (select.value) {
        var variation_item_selected = wrapper.querySelector('.botiga-variation-item[value="' + select.value + '"]');
        variation_item_selected.classList.add('active');
        variation_item_selected.dispatchEvent(new Event('botiga.variations.selected'));
      }

      items[i].addEventListener('click', function (e) {
        e.preventDefault();
        var value = this.getAttribute('value');
        jQuery(select).val(value).trigger('change');
        self.removeActiveClass(this);
        this.classList.add('active');
        self.matchVariations(this);
      });
      items[i].addEventListener('botiga.variations.selected', function (e) {
        var _self = this;

        setTimeout(function () {
          self.matchVariations(_self);
        }, 300);
      });
    }
  },
  matchVariations: function matchVariations(variation) {
    var wrapper = variation.closest('.variations').querySelectorAll('.botiga-variations-wrapper');
    var arr = [];

    for (var i = 0; i < wrapper.length; i++) {
      var items = wrapper[i].querySelectorAll('.botiga-variation-item'),
          selectOptions = wrapper[i].querySelector('select').options;

      for (var u = 0; u < selectOptions.length; u++) {
        arr.push(selectOptions[u].value);
      }

      arr = arr.filter(function (e) {
        return e;
      });

      for (var a = 0; a < items.length; a++) {
        if (arr.includes(items[a].getAttribute('value'))) {
          items[a].classList.remove('disabled');
        } else {
          items[a].classList.add('disabled');
        }
      }
    }
  },
  removeActiveClass: function removeActiveClass(item) {
    var items = typeof item !== 'undefined' ? item.closest('div').querySelectorAll('.botiga-variation-item') : document.querySelectorAll('.botiga-variations-wrapper .botiga-variation-item');

    for (var u = 0; u < items.length; u++) {
      items[u].classList.remove('active');
      items[u].classList.remove('disabled');
    }
  },
  resetVariationsEvent: function resetVariationsEvent() {
    var self = this,
        resetbtn = document.querySelectorAll('.reset_variations');

    for (var i = 0; i < resetbtn.length; i++) {
      resetbtn[i].addEventListener('click', function () {
        self.removeActiveClass(this);
      });
    }
  }
};
/**
 * Misc
 */

botiga.misc = {
  init: function init() {
    this.checkout();
  },
  checkout: function checkout() {
    var is_checkout_page = document.querySelector('body.woocommerce-checkout');

    if (is_checkout_page === null) {
      return false;
    } // There's no woo hook for that, so we need do that with js


    if (typeof jQuery === 'function') {
      jQuery(document).on('updated_checkout', function () {
        document.querySelector('#order_review .woocommerce-shipping-totals > td').setAttribute('colspan', 2);
      });
    }
  }
};
botiga.helpers.botigaDomReady(function () {
  botiga.navigation.init();
  botiga.desktopOffcanvasNav.init();
  botiga.headerSearch.init();
  botiga.customAddToCartButton.init();
  botiga.wishList.init();
  botiga.quickView.init();
  botiga.stickyHeader.init();
  botiga.scrollDirection.init();
  botiga.backToTop.init();
  botiga.qtyButton.init();
  botiga.carousel.init();
  botiga.productSwatch.init();
  botiga.misc.init();
});

window.onload = function () {
  var cart_count = document.querySelectorAll('.cart-count');

  if (cart_count.length) {
    jQuery(document.body).trigger('wc_fragment_refresh');
  }
};