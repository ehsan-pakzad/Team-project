document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.counter h1');
  const counterContainer = document.querySelector('.counter-container');

  let animationStarted = false;

  function animateCounters() {
    counters.forEach(counter => {
      let target = parseInt(counter.textContent.replace(/\D+/g, ''));
      let suffix = counter.textContent.replace(/[0-9]/g, '').trim();
      let count = 0;
      
      counter.textContent = '0' + (suffix ? ' ' + suffix : '');
      
      function updateCounter() {
        if (target === 3000000) {
          if (count < 100000) {
            count += 1000;
            counter.textContent = count.toLocaleString();
            setTimeout(updateCounter, 30); // سریع‌تر برای 0 تا 100 هزار
          } else if (count < 3000000) {
            count += 1000000;
            counter.textContent = (count / 1000000) + ' million';
            setTimeout(updateCounter, 300); // سریع‌تر برای میلیون‌ها
          } else {
            counter.textContent = '3 million';
          }
        } else {
          let increment = Math.ceil(target / 100);
          let delay = 20;

          count += increment;

          if (count < target) {
            counter.textContent = count.toLocaleString() + (suffix ? ' ' + suffix : '');
            setTimeout(updateCounter, delay);
          } else {
            counter.textContent = target.toLocaleString() + (suffix ? ' ' + suffix : '');
          }
        }
      }

      updateCounter();
    });
  }

  function checkScroll() {
    let containerPosition = counterContainer.getBoundingClientRect().top;
    let screenPosition = window.innerHeight / 1.3;

    if (containerPosition < screenPosition && !animationStarted) {
      animateCounters();
      animationStarted = true;
    }

    if (containerPosition > screenPosition) {
      animationStarted = false;
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
});

document.addEventListener('DOMContentLoaded', function() {
  const buttons = document.querySelectorAll('.accordion-button');
  buttons.forEach(button => {
      button.addEventListener('click', function() {
          this.classList.toggle('active');
          const content = this.nextElementSibling;
          if (content.style.maxHeight) {
              content.style.maxHeight = null;
          } else {
              content.style.maxHeight = content.scrollHeight + 'px';
          }
          buttons.forEach(otherButton => {
              if (otherButton !== button && otherButton.classList.contains('active')) {
                  otherButton.classList.remove('active');
                  otherButton.nextElementSibling.style.maxHeight = null;
              }
          });
      });
  });
});




