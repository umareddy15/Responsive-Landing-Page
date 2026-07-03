document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Fixed Navigation Scroll Effect
  // ==========================================
  const navbar = document.getElementById('navbar');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Call once on load in case page is refreshed already scrolled down
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  // ==========================================
  // 2. Hamburger Mobile Drawer Menu
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile drawer when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close mobile drawer if clicking outside the menu
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // ==========================================
  // 3. ScrollSpy: Highlight Active Menu Item
  // ==========================================
  const sections = document.querySelectorAll('section');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -40% 0px', // Trigger when section occupies mid-viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ==========================================
  // 4. Feature Cards Spotlight mouse gradient
  // ==========================================
  const cards = document.querySelectorAll('.feature-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // ==========================================
  // 5. Interactive Chat Console simulation
  // ==========================================
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatBody = document.getElementById('chat-body');

  const botResponses = {
    greeting: [
      "Hello, explorer. I am operating within normal parameters. What shall we build today?",
      "Welcome back. Heart rate and focus telemetry calibrated. Ready for action."
    ],
    features: "My primary modules include Cognitive Sync (tracking performance metrics to schedule blocks), Spatial Layout Map (projecting interface cards on horizontal surfaces), and Associative Instant Recall.",
    pricing: "We offer three levels of integration: Explorer (free localized access), Pro Synchrony ($29/month with ultra-low latency & cloud continuum), and Architect ($89/month for dedicated compute threads).",
    speed: "Our response time is clocked under 5ms, with direct neural device queries returning in approximately 1.2ms. Spatial adjustments perform at 90Hz refresh rate.",
    default: [
      "Processing spatial query. I have updated your layout model with that instruction.",
      "Input logged to our temporary local workspace. Would you like me to map that to a holographic card?",
      "Interesting perspective. Incorporating this cognitive trend into your personal focus feedback loop.",
      "I've configured a visual node for this query in your secondary visual periphery. Let me know if you wish to expand it."
    ]
  };

  let defaultResponseIndex = 0;

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // 1. Add User Message
    addMessage(query, 'user');
    chatInput.value = '';

    // 2. Add Typing Indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-msg bot typing-indicator';
    typingIndicator.innerHTML = '<span style="display:inline-block; animation: pulse-dot 1.2s infinite alternate">Thinking...</span>';
    chatBody.appendChild(typingIndicator);
    scrollToBottom();

    // 3. Generate and Delay Bot response
    setTimeout(() => {
      // Remove typing indicator
      typingIndicator.remove();

      let reply = "";
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('price') || lowerQuery.includes('pricing') || lowerQuery.includes('cost') || lowerQuery.includes('plan')) {
        reply = botResponses.pricing;
      } else if (lowerQuery.includes('feature') || lowerQuery.includes('what can you do') || lowerQuery.includes('module')) {
        reply = botResponses.features;
      } else if (lowerQuery.includes('speed') || lowerQuery.includes('latency') || lowerQuery.includes('fast') || lowerQuery.includes('hz')) {
        reply = botResponses.speed;
      } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi ') || lowerQuery.includes('hey')) {
        reply = botResponses.greeting[Math.floor(Math.random() * botResponses.greeting.length)];
      } else {
        reply = botResponses.default[defaultResponseIndex];
        defaultResponseIndex = (defaultResponseIndex + 1) % botResponses.default.length;
      }

      addMessage(reply, 'bot');
    }, 1000 + Math.random() * 800);
  });

  function addMessage(text, sender) {
    const msgElement = document.createElement('div');
    msgElement.className = `chat-msg ${sender}`;
    msgElement.textContent = text;
    chatBody.appendChild(msgElement);
    scrollToBottom();
  }

  function scrollToBottom() {
    chatBody.scrollTop = chatBody.scrollHeight;
  }
});
