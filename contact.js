/* Contact form: sends the message to your email through FormSubmit (no server needed). */
(function () {
    'use strict';
    var f = document.getElementById('f'); if (!f) return;
    var st = document.getElementById('st');
    var EMAIL = 'prudentndeba@gmail.com';
    function say(msg, ok) {
        if (!st) return;
        st.style.display = 'block'; st.textContent = msg;
        st.style.color = ok ? '#1a7f37' : '#b3261e';
    }
    f.addEventListener('submit', function (e) {
        e.preventDefault();
        var btn = f.querySelector('button[type="submit"]');
        var d = new FormData(f), body = {};
        d.forEach(function (v, k) { body[k] = v; });
        if (body.msg && !body.message) body.message = body.msg;
        body._subject = 'New message from portfolio!';
        body._captcha = 'false';
        if (btn) btn.disabled = true;
        say('Sending\u2026', true);
        fetch('https://formsubmit.co/ajax/' + EMAIL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(body)
        }).then(function (r) { return r.json(); }).then(function (j) {
            if (j && (j.success === 'true' || j.success === true)) {
                say('Thank you! Your message was sent. I will reply soon.', true); f.reset();
            } else { throw new Error('failed'); }
        }).catch(function () {
            say('Sorry, the message could not be sent. Please call or WhatsApp +256 761 013 170.', false);
        }).then(function () { if (btn) btn.disabled = false; });
    });
})();
