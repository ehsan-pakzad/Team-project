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

const listOfCardElements = document.querySelectorAll('.card');
const cardContainer = document.querySelector('.card-container');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// تابع برای بررسی وضعیت اسکرول و فعال/غیرفعال کردن دکمه‌ها
function updateButtonStates() {
  const scrollLeft = cardContainer.scrollLeft;
  const maxScroll = cardContainer.scrollWidth - cardContainer.clientWidth;
  
  leftBtn.disabled = scrollLeft <= 0;
  rightBtn.disabled = scrollLeft >= maxScroll;
}

// کلیک روی کارت‌ها
listOfCardElements.forEach((cardElement, index) => {
  cardElement.addEventListener('click', () => {
    const scrollLeft = index * listOfCardElements[0].offsetWidth;
    cardContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  });
});

// کلیک روی دکمه چپ
leftBtn.addEventListener('click', () => {
  cardContainer.scrollBy({
    left: -listOfCardElements[0].offsetWidth,
    behavior: 'smooth'
  });
});

// کلیک روی دکمه راست
rightBtn.addEventListener('click', () => {
  cardContainer.scrollBy({
    left: listOfCardElements[0].offsetWidth,
    behavior: 'smooth'
  });
});

// رویداد اسکرول برای بررسی وضعیت دکمه‌ها
cardContainer.addEventListener('scroll', updateButtonStates);

// مقداردهی اولیه وضعیت دکمه‌ها
updateButtonStates();