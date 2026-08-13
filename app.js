/* ============================================================
   HYOGA — app.js
   JavaScript puro, organizado em módulos pequenos:
   navigation · mobile-menu · faq · tracking · form · animations
   (faq, form e animations ganham código junto com suas seções)
============================================================ */
(() => {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  /* Animações LIGADAS por padrão — mesmo quando o sistema operacional
     tem "Efeitos de animação" desligados (prefers-reduced-motion).
     Para restaurar o modo acessível sem animações: ?motion=off no endereço. */
  if (new URLSearchParams(location.search).get('motion') !== 'off') {
    document.documentElement.classList.add('force-motion');
  }

  /* ============================================================
     NAVIGATION — estado do header ao rolar
  ============================================================ */
  const header = $('[data-header]');

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
  };

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* Scroll suave para âncoras (logo, menu, "ver como funciona").
     Feito em JS porque alguns navegadores ignoram o scroll-behavior
     do CSS quando o sistema operacional tem animações desativadas.
     Continua respeitando prefers-reduced-motion (salto instantâneo). */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const forceMotion = () => document.documentElement.classList.contains('force-motion');

  const smoothScroll = (target) => {
    if (reduceMotion.matches && !forceMotion()) {
      target.scrollIntoView(); // modo acessível: salto direto
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  /* URL sempre limpa: remove qualquer # do endereço sem recarregar.
     (try/catch por segurança no modo file://) */
  const cleanUrl = () => {
    try {
      history.replaceState(null, '', location.pathname + location.search);
    } catch {}
  };

  /* Clicou num link de âncora: rola suave e NÃO suja a URL com # */
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    e.preventDefault();

    const id = anchor.getAttribute('href').slice(1);
    const target = id ? document.getElementById(id) : null;

    if (target) {
      smoothScroll(target);
    } else {
      // Logo (href="#") ou âncora sem destino: volta ao topo
      if (reduceMotion.matches && !forceMotion()) {
        window.scrollTo({ top: 0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    cleanUrl();
  });

  /* Chegou com # no endereço (ex.: link compartilhado com #coaching):
     rola até a seção e limpa a URL em seguida. */
  if (location.hash) {
    const target = document.getElementById(location.hash.slice(1));

    if (target) {
      const rect = target.getBoundingClientRect();
      const alreadyInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      if (!alreadyInView) smoothScroll(target);
    }

    cleanUrl();
  }

  /* ============================================================
     MOBILE MENU — abrir/fechar com teclado
  ============================================================ */
  const menuToggle = $('[data-menu-toggle]');
  const menuMobile = $('[data-menu-mobile]');

  const setMenu = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuMobile.hidden = !open;
  };

  menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  // Fecha com Esc e devolve o foco ao botão
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menuMobile.hidden) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  // Fecha ao clicar em qualquer link do menu
  $$('a', menuMobile).forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  /* ============================================================
     TRACKING — cliques medidos (Vercel Analytics)
     Uso: <a data-track="discord"> — nomes: discord, twitch,
     liquipedia, deeplol, instagram, x, form
  ============================================================ */
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (!el) return;

    const name = el.dataset.track;

    // Envia o evento para o Vercel Analytics (se estiver instalado)
    if (typeof window.va === 'function') {
      window.va('event', { name });
    }

    // Em desenvolvimento local, mostra no console para conferência
    if (location.protocol === 'file:' || location.hostname === 'localhost') {
      console.debug('[track]', name);
    }
  });
  /* ============================================================
     FAQ — accordion acessível (um item aberto por vez)
  ============================================================ */
  const faqButtons = $$('.faq-q');

  const closeFaq = () => {
    faqButtons.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      document.getElementById(btn.getAttribute('aria-controls')).hidden = true;
    });
  };

  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const wasOpen = btn.getAttribute('aria-expanded') === 'true';
      closeFaq();
      if (!wasOpen) {
        btn.setAttribute('aria-expanded', 'true');
        document.getElementById(btn.getAttribute('aria-controls')).hidden = false;
      }
    });
  });

  /* ============================================================
     FORM — envio para a função serverless (sem recarregar a página)
  ============================================================ */
  const form = $('[data-form]');

  if (form) {
    const errBox = $('[data-form-error]');
    const successBox = $('[data-form-success]');
    const submitBtn = form.querySelector('[type="submit"]');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      errBox.hidden = true;

      // Validação nativa do navegador (o servidor valida de novo)
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';

      const body = Object.fromEntries(new FormData(form).entries());

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        const json = await res.json().catch(() => ({}));

        if (res.ok) {
          form.hidden = true;
          successBox.hidden = false;
        } else {
          errBox.textContent = json.error || 'Não foi possível enviar. Tente novamente.';
          errBox.hidden = false;
        }
      } catch {
        errBox.textContent = 'Falha de conexão. Verifique sua internet e tente de novo.';
        errBox.hidden = false;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }

  /* ============================================================
     ANIMATIONS — revelação suave ao rolar (IntersectionObserver)
     Elementos com data-reveal ficam visíveis quando entram na tela.
     Sem IntersectionObserver (navegadores antigos), fica tudo visível.
  ============================================================ */
  // Grupos: filhos ganham revelação em sequência (stagger)
  $$('[data-reveal-group]').forEach((group) => {
    Array.from(group.children).forEach((child, i) => {
      if (!child.hasAttribute('data-reveal')) {
        child.setAttribute('data-reveal', '');
      }
      child.style.setProperty('--i', i);
    });
  });

  // Barra de progresso de leitura
  const progressBar = $('[data-scroll-progress]');
  if (progressBar) {
    const updateProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      progressBar.style.width = (max > 0 ? (doc.scrollTop / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  const revealEls = $$('[data-reveal]');

  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      revealEls.forEach((el) => io.observe(el));
    } else {
      // Fallback: sem suporte, mostra tudo imediatamente
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }
})();
