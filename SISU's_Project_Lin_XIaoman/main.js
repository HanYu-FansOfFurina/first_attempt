// 菜单栏交互：移动端展开/收起
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // 点击菜单项后自动收起移动端菜单
  navLinks.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// 导航高亮：根据当前页面设置“首页 / 校园信息 / 和学姐聊聊”高亮
const pathName = window.location.pathname;
const isCampusPage = pathName.indexOf('campus') !== -1;
const isChatPage = pathName.indexOf('chat.html') !== -1;
const homeLink = document.querySelector('.nav-link[data-nav="home"]');
const campusLink = document.querySelector('.nav-link[data-nav="campus"]');
const chatLink = document.querySelector('.nav-link[data-nav="chat"]');

if (isCampusPage) {
  if (campusLink) campusLink.classList.add('active');
} else if (isChatPage) {
  if (chatLink) chatLink.classList.add('active');
} else {
  if (homeLink) homeLink.classList.add('active');
}


// ========== 首页人物轮播图 ==========
const carouselImages = document.querySelectorAll('.hero-carousel .carousel-img');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
const carouselDots = document.getElementById('carouselDots');

if (carouselImages.length > 0 && carouselPrev && carouselNext && carouselDots) {
  let currentSlide = 0;
  const totalSlides = carouselImages.length;

  // 动态生成指示圆点
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.type = 'button';
    dot.setAttribute('aria-label', '第 ' + (i + 1) + ' 张');
    dot.addEventListener('click', () => goTo(i));
    carouselDots.appendChild(dot);
  }

  const dots = carouselDots.querySelectorAll('.dot');

  function goTo(index) {
    currentSlide = (index + totalSlides) % totalSlides;
    carouselImages.forEach((img, i) => {
      img.classList.toggle('active', i === currentSlide);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  carouselPrev.addEventListener('click', () => goTo(currentSlide - 1));
  carouselNext.addEventListener('click', () => goTo(currentSlide + 1));

  // 自动轮播，鼠标悬停暂停
  let timer = setInterval(() => goTo(currentSlide + 1), 4000);
  const carousel = document.querySelector('.hero-carousel');

  carousel.addEventListener('mouseenter', () => clearInterval(timer));
  carousel.addEventListener('mouseleave', () => {
    clearInterval(timer);
    timer = setInterval(() => goTo(currentSlide + 1), 4000);
  });

  // 移动端左右滑动切换
  let startX = 0;
  carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) goTo(currentSlide + 1);
      else goTo(currentSlide - 1);
    }
  }, { passive: true });
}


// ========== 地图/图片点击放大 ==========
const zoomableImages = document.querySelectorAll('.zoomable-image');

if (zoomableImages.length > 0) {
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', '图片放大查看');
  lightbox.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="关闭">&times;</button>' +
    '<div class="lightbox-stage"><img class="lightbox-img" alt="放大的地图图片"></div>';
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const closeBtn = lightbox.querySelector('.lightbox-close');

    const lightboxStage = lightbox.querySelector('.lightbox-stage');
    let zoom = 1;
    let panX = 0;
    let panY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let startPanX = 0;
    let startPanY = 0;

    function updateTransform() {
      lightboxImg.style.transform = 'translate(' + panX + 'px, ' + panY + 'px) scale(' + zoom + ')';
    }

    function resetTransform() {
      zoom = 1;
      panX = 0;
      panY = 0;
      updateTransform();
    }

    function clampPan() {
      const baseW = lightboxImg.clientWidth;
      const baseH = lightboxImg.clientHeight;
      const maxX = (baseW * (zoom - 1)) / 2 + 60;
      const maxY = (baseH * (zoom - 1)) / 2 + 60;
      panX = Math.max(-maxX, Math.min(maxX, panX));
      panY = Math.max(-maxY, Math.min(maxY, panY));
    }

    // 鼠标滚轮缩放
    lightboxStage.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      zoom = Math.min(8, Math.max(1, zoom * factor));
      clampPan();
      updateTransform();
    }, { passive: false });

    // 鼠标拖拽平移
    lightboxStage.addEventListener('mousedown', (e) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      startPanX = panX;
      startPanY = panY;
      lightboxStage.classList.add('dragging');
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      panX = startPanX + (e.clientX - dragStartX);
      panY = startPanY + (e.clientY - dragStartY);
      clampPan();
      updateTransform();
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      lightboxStage.classList.remove('dragging');
    });

    // 双击重置缩放
    lightboxStage.addEventListener('dblclick', () => {
      resetTransform();
    });

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '放大的地图图片';
    resetTransform();
      lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    resetTransform();
      lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  zoomableImages.forEach((img) => {
    img.addEventListener('click', () => {
      openLightbox(img.dataset.full || img.src, img.alt);
    });

    // 支持键盘操作
    img.setAttribute('tabindex', '0');
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img.dataset.full || img.src, img.alt);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);

  // 点击遮罩空白处关闭
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Esc 关闭
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}
