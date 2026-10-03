(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var label = toggle ? toggle.querySelector('.label') : null;

  function setOpen(open, returnFocus) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (label) label.textContent = open ? 'Close menu' : 'Menu';
    nav.classList.toggle('open', open);
    if (!open && returnFocus) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if ((e.key === 'Escape' || e.key === 'Esc') && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false, true);
      }
    });
    window.matchMedia('(min-width: 860px)').addEventListener('change', function (mq) {
      if (mq.matches) setOpen(false);
    });
  }

  var form = document.getElementById('estimate-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var status = document.getElementById('form-status');
      var v = function (id) { return (document.getElementById(id).value || '').trim(); };
      var name = v('f-name'), phone = v('f-phone'), email = v('f-email');
      if (!name || (!phone && !email)) {
        status.textContent = 'Please add your name and a phone number or email so we can reach you.';
        (name ? document.getElementById(phone ? 'f-email' : 'f-phone') : document.getElementById('f-name')).focus();
        return;
      }
      var service = v('f-service'), city = v('f-city'), msg = v('f-msg');
      var subject = 'Free estimate request: ' + service + ' (' + city + ')';
      var body = [
        'Hi Maria,', '',
        'I would like a free estimate.', '',
        'Name: ' + name,
        'Phone: ' + (phone || '-'),
        'Email: ' + (email || '-'),
        'Service: ' + service,
        'City: ' + city, '',
        'About my home:', (msg || '-')
      ].join('\n');
      status.textContent = 'Opening your email app…';
      window.location.href = 'mailto:mariamariamusiq2@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
