document.getElementById('themeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-theme');
  // Update the button text accordingly
  if (document.body.classList.contains('dark-theme')) {
    this.textContent = 'Switch to Day';
  } else {
    this.textContent = 'Switch to Night';
  }
});

window.onload = function () {
  var elm = document.querySelector('#progress');
  setInterval(function () {
    if (!elm.innerHTML.match(/100%/gi)) {
      elm.innerHTML = parseInt(elm.innerHTML) + 10 + '%';
    } else {
      clearInterval();
    }
  }, 18);
};
