const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.links');

navToggle.addEventListener('click', function () {
  links.classList.toggle('show-links');
});

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.number');
  let hasAnimated = false;

  const updateCount = (counter) => {
    const target = +counter.getAttribute('data-target');
    const currentText = counter.innerText.replace(/\D/g, '');
    const current = currentText ? parseInt(currentText, 10) : 0;
    const increment = target / 200;

    if (current < target) {
      let newCount = Math.ceil(current + increment);
      if (newCount > target) newCount = target;

      if (counter.innerText.includes('%')) {
        counter.innerText = newCount + '%';
      } else if (counter.innerText.includes('+')) {
        counter.innerText = newCount + '+';
      } else {
        counter.innerText = newCount.toLocaleString();
      }

      setTimeout(() => updateCount(counter), 10);
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !hasAnimated) {
        counters.forEach((counter) => updateCount(counter));
        hasAnimated = true;
        observer.disconnect();
      }
    },
    {
      threshold: 0.3,
    }
  );

  const statsSection = document.querySelector('#stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
});

function filterImages(category) {
  const allImages = document.querySelectorAll('.img_con');

  allImages.forEach((img) => {
    const imgCategory = img.getAttribute('data-category');
    img.style.display =
      category === 'All' || imgCategory === category ? 'block' : 'none';
  });

  const dropdownButton = document.getElementById('new_dropdown');
  if (dropdownButton) {
    dropdownButton.textContent = category === 'All' ? 'Show All' : category;
  }
  const allCategoryElements = document.querySelectorAll('.sec11_txt');
  allCategoryElements.forEach((el) => el.classList.remove('active'));

  const matchingElements = Array.from(allCategoryElements).filter((el) => {
    return (
      el.textContent.trim().startsWith(category) ||
      (category === 'All' && el.classList.contains('sec11_show'))
    );
  });

  matchingElements.forEach((el) => el.classList.add('active'));
  window.addEventListener('DOMContentLoaded', () => {
    filterImages('All');
  });
}
function validateForm(event, formType) {
  event.preventDefault();

  const email = document.getElementById('email' + formType);
  const subject = document.getElementById('subject' + formType);
  const message = document.getElementById('message' + formType);

  const emailError = document.getElementById('emailError' + formType);
  const subjectError = document.getElementById('subjectError' + formType);
  const messageError = document.getElementById('messageError' + formType);

  emailError.textContent = '';
  subjectError.textContent = '';
  messageError.textContent = '';

  let isValid = true;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value.trim()) {
    emailError.textContent = 'Email is required.';
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    emailError.textContent = 'Please enter a valid email.';
    isValid = false;
  }

  if (!subject.value) {
    subjectError.textContent = 'Please select a subject.';
    isValid = false;
  }

  if (!message.value.trim()) {
    messageError.textContent = 'Message cannot be empty.';
    isValid = false;
  }

  if (isValid) {
    console.log('Form Submitted:');
    console.log('Email:', email.value);
    console.log('Subject:', subject.value);
    console.log('Message:', message.value);

    event.target.reset();
  }
}

