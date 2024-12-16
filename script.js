var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('typewrite');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-type');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }

  // Inject CSS with font color
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = `
    .typewrite > .wrap {
      border-right: 0.08em solid rgb(255, 255,255); /* Cursor color */
      font-size: clamp(1rem, 2vw, 2rem); /* Responsive font size */
      color:rgb(255, 246, 245); /* Font color here */
      line-height: 1.5;
    }

    /* Media queries for finer control */
    @media (max-width: 768px) {
      .typewrite > .wrap {
        font-size: 1.2rem; /* Smaller font for tablets */
      }
    }

    @media (max-width: 480px) {
      .typewrite > .wrap {
        font-size: 1rem; /* Smaller font for mobile devices */
      }
    }
  `;
  document.body.appendChild(css);
};
