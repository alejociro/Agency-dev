/* ============================================================
   Precision Dental — Main JS
   Animations (4 layers), interactions, mobile nav, i18n
   Tone: warm, organic, inviting — gentle motion with soft easings
   ============================================================ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════════
     i18n TRANSLATION SYSTEM
     ══════════════════════════════════════════════════════════════ */

  var translations = {
    /* ── Shared: Navigation ── */
    'nav-home': 'Inicio',
    'nav-about': 'Nosotros',
    'nav-services': 'Servicios',
    'nav-contact': 'Contacto',
    'nav-cta': 'Reservar Cita',

    /* ── Shared: Footer ── */
    'footer-brand-text': 'La atención dental de calidad es un derecho humano fundamental. Atención accesible y económica para todos en Greenville, SC.',
    'footer-pages': 'Páginas',
    'footer-services': 'Servicios',
    'footer-contact': 'Contacto',
    'footer-home': 'Inicio',
    'footer-about': 'Nosotros',
    'footer-services-link': 'Servicios',
    'footer-contact-link': 'Contáctenos',
    'footer-whitening': 'Blanqueamiento Dental',
    'footer-implants': 'Implantes Dentales',
    'footer-cosmetic': 'Odontología Estética',
    'footer-family': 'Odontología Familiar',
    'footer-rights': '\u00A9 2026 Precision Dental. Todos los derechos reservados.',
    'footer-privacy': 'Política de Privacidad',
    'footer-hours': 'Lun\u2013Jue: 8:30 AM \u2013 5 PM',

    /* ── Shared: Form options ── */
    'opt-select': 'Seleccione un servicio...',
    'opt-whitening': 'Blanqueamiento Dental',
    'opt-dentures': 'Dentaduras y Parciales',
    'opt-veneers': 'Carillas de Porcelana',
    'opt-crowns': 'Coronas',
    'opt-bonding': 'Adhesión Dental',
    'opt-implants': 'Implantes Dentales',
    'opt-cleaning': 'Limpieza y Examen de Rutina',
    'opt-emergency': 'Emergencia',
    'opt-other': 'Otro',

    /* ══════════════════════════════════════════════════
       INDEX PAGE
       ══════════════════════════════════════════════════ */

    /* Hero */
    'home-hero-tag': 'Consultorio Dental en Greenville, SC',
    'home-hero-title': 'Atención Dental de Alta Calidad Para Todos',
    'home-hero-subtitle': 'Somos un equipo de expertos dentales apasionados, dedicados a asegurar que su sonrisa esté sana y brillante. Todos merecen atención en un ambiente seguro y diverso.',
    'home-hero-book': 'Reservar Cita',
    'home-hero-services': 'Nuestros Servicios \u2192',
    'home-stat-years': 'Años de Experiencia',
    'home-stat-rating': 'Calificación en Google',

    /* Mission */
    'home-mission-tag': 'Nuestra Misión',
    'home-mission-title': 'La Atención Dental es un Derecho Humano Fundamental',
    'home-mission-text': 'La atención dental de calidad es un derecho humano fundamental. Creemos que todos merecen recibir atención dental en un ambiente seguro que refleje la diversidad del mundo en que vivimos. Nuestra misión es llevar atención accesible y económica a personas trabajadoras de todos los tamaños, colores y orígenes.',
    'home-mission-subtext': 'Visite nuestra oficina o contáctenos para ver cómo podemos iluminar su sonrisa.',
    'home-mission-cta': 'Reservar Cita',
    'home-mission-badge': 'Nosotros hablamos español',

    /* Services */
    'home-svc-tag': 'Lo Que Ofrecemos',
    'home-svc-title': 'Nuestros Servicios',
    'home-svc-subtitle': 'Nuestro consultorio ofrece una gama completa de servicios dentales económicos para cuidar su sonrisa.',
    'home-svc-cosmetic': 'Odontología Estética',
    'home-svc-cosmetic-text': 'Blanqueamiento dental, carillas de porcelana, adhesión dental y frenillos invisibles para darle la sonrisa que siempre ha deseado.',
    'home-svc-family': 'Odontología Familiar',
    'home-svc-family-text': 'Limpiezas de rutina, exámenes, radiografías digitales, tratamientos de flúor y selladores para pacientes de todas las edades.',
    'home-svc-reconstructive': 'Reconstrucción',
    'home-svc-reconstructive-text': 'Coronas, implantes dentales, puentes, inlays, onlays y rehabilitación oral completa.',
    'home-svc-cerec': 'Tecnología CEREC',
    'home-svc-cerec-text': 'Modelado digital CAD/CAM para restauraciones cerámicas el mismo día. Restauración Económica Estética de Cerámica.',
    'home-svc-emergency': 'Emergencia y Sedación',
    'home-svc-emergency-text': 'Endodoncias, extracciones, terapia periodontal no quirúrgica, guardas nocturnas y opciones de sedación para pacientes con ansiedad.',
    'home-svc-dentures': 'Dentaduras y Parciales',
    'home-svc-dentures-text': 'Dentaduras y dentaduras parciales hechas a medida para restaurar su sonrisa completa y segura.',
    'home-svc-learn': 'Más Información \u2192',
    'home-svc-view-all': 'Ver Todos los Servicios',

    /* Why Us */
    'home-why-tag': '¿Por Qué Precision Dental?',
    'home-why-title': 'Ya No Tiene Que Ir al Dentista. Ahora, Quiere Ir.',
    'home-why-text': 'Cuando cruce nuestras puertas, sentirá algo diferente a otros consultorios dentales. Además de ser recibido calurosamente en un ambiente cómodo, limpio y profesional, sentirá una energía especial, el tipo de vibra que solo emana de un lugar que está prosperando.',
    'home-why-subtext': 'Realmente encontramos alegría en nuestro trabajo, lo que nos motiva a dar el 100% cada día, utilizando las técnicas más sofisticadas y tecnología actualizada, para asegurar que reciba la atención dental que merece.',
    'home-why-cta': 'Conozca a la Dra. Groce \u2192',

    /* Testimonials */
    'home-test-tag': 'Historias de Pacientes',
    'home-test-title': 'Lo Que Dicen Nuestros Pacientes',
    'home-test-text': 'Siempre me puso nervioso ir al dentista, pero después de ir a Precision Dental, eso cambió. Todos fueron muy amables y fáciles de hablar, y explicaron todo lo que estaban haciendo. Un gran grupo y planeo seguir con mis visitas dentales ahora que estuve allí.',
    'home-test-source': 'Reseña de Google',
    'home-test-rating': '4.8 de 5',
    'home-test-rating-suffix': 'basado en reseñas de Google',

    /* CTA */
    'home-cta-title': '¿Listo Para Transformar Su Sonrisa?',
    'home-cta-text': 'Programe su cita hoy y experimente la diferencia Precision Dental. Nuevos pacientes bienvenidos.',
    'home-cta-book': 'Reservar Cita',
    'home-cta-call': 'Llamar (864) 232-8393',

    /* Contact section */
    'home-contact-tag': 'Contáctenos',
    'home-contact-title': 'Háganos Saber Cómo Podemos Ayudar',
    'home-contact-text': 'Nos encantaría saber de usted. Contáctenos para programar una cita o hacer cualquier pregunta.',
    'home-contact-phone': 'Teléfono',
    'home-contact-email': 'Correo Electrónico',
    'home-contact-address': 'Dirección',
    'home-contact-hours': 'Horario',
    'home-form-name-label': 'Nombre Completo',
    'home-form-email-label': 'Correo Electrónico',
    'home-form-phone-label': 'Teléfono',
    'home-form-service-label': 'Interesado En',
    'home-form-message-label': 'Mensaje',
    'home-form-submit': 'Enviar Mensaje',

    /* ══════════════════════════════════════════════════
       ABOUT PAGE
       ══════════════════════════════════════════════════ */
    'about-hero-tag': 'Sobre Precision Dental',
    'about-hero-title': 'Sonrisas Sin Barreras',
    'about-hero-subtitle': 'Un consultorio dental construido sobre la creencia de que todos merecen atención de calidad, sin importar su origen.',

    'about-vision-tag': 'Nuestra Visión',
    'about-vision-title': 'Soñamos con un día en que cada dentista tenga un equipo diverso, acepte una clientela diversa y esté dispuesto a ver a esos pacientes que a menudo son rechazados.',
    'about-vision-text': 'Soñamos con convertirnos en un consultorio dental de propiedad afroamericana reconocido a nivel nacional, conocido por dar la bienvenida a comunidades subrepresentadas y eliminar barreras para la atención multilingüe.',

    'about-mission-tag': 'Nuestra Misión',
    'about-mission-title': 'Creando Espacios Que Dan la Bienvenida a Todos',
    'about-mission-text': 'Nuestra misión es crear espacios que fomenten la diversidad y den la bienvenida a una sociedad en constante cambio. Nos posicionamos como profesionales accesibles comprometidos con reducir la ansiedad dental.',
    'about-mission-subtext': 'Creemos que los ambientes cómodos son esenciales. Cuando los pacientes se sienten bienvenidos y comprendidos, es más probable que prioricen su salud oral y mantengan visitas regulares.',

    'about-values-tag': 'Lo Que Defendemos',
    'about-values-title': 'Nuestros Valores Fundamentales',
    'about-val-diversity': 'Diversidad',
    'about-val-diversity-text': 'Respetar y abrazar la diversidad en el empleo',
    'about-val-integrity': 'Integridad',
    'about-val-integrity-text': 'Ser siempre honesto con los demás y consigo mismo',
    'about-val-teamwork': 'Trabajo en Equipo',
    'about-val-teamwork-text': 'Aprender de su equipo para ser más fuertes juntos',
    'about-val-empowerment': 'Empoderamiento',
    'about-val-empowerment-text': 'Tomar la iniciativa y tratar los desafíos como oportunidades',
    'about-val-commitment': 'Compromiso',
    'about-val-commitment-text': 'Educación continua y nueva tecnología',

    'about-dr-tag': 'Conozca a Nuestra Fundadora',
    'about-dr-title': 'Dra. Tywana M Groce, DMD',
    'about-dr-text': 'La Dra. Groce decidió estudiar odontología al descubrir que solo el 3% de los dentistas son personas de color. Completó su educación en Hampton University y su título de DMD en Temple University School of Dentistry.',
    'about-dr-subtext': 'Pasó 3 años en salud pública antes de establecer su práctica privada en el área de Upstate South Carolina, donde ha ejercido durante casi 15 años.',
    'about-dr-stat-years': 'Años de Práctica',
    'about-dr-stat-school': 'Temple University',
    'about-dr-cta': 'Reservar Con la Dra. Groce',

    'about-tour-tag': 'Nuestro Espacio',
    'about-tour-title': 'Recorra Nuestra Oficina',
    'about-tour-cap1': 'Salas de tratamiento modernas y cómodas equipadas con la última tecnología',
    'about-tour-cap2': 'Recepción acogedora diseñada para hacer sentir a los pacientes en confianza',
    'about-tour-cap3': 'Equipo dental de última generación incluyendo tecnología CEREC',
    'about-tour-cap4': 'Ambiente limpio y profesional en el que puede confiar',

    'about-cta-title': '¿Listo Para Experimentar la Diferencia?',
    'about-cta-text': 'Únase a la familia Precision Dental. Nuevos pacientes siempre son bienvenidos.',
    'about-cta-btn': 'Reservar Cita',

    /* ══════════════════════════════════════════════════
       SERVICES PAGE
       ══════════════════════════════════════════════════ */
    'svc-hero-tag': 'Nuestros Servicios',
    'svc-hero-title': 'Una Gama Completa de Atención Dental',
    'svc-hero-subtitle': 'Nuestro consultorio ofrece una gama completa de servicios dentales económicos para cuidar su sonrisa, con la última tecnología.',

    'svc-tab-cosmetic': 'Estética',
    'svc-tab-family': 'Familiar',
    'svc-tab-reconstructive': 'Reconstrucción',
    'svc-tab-emergency': 'Emergencia',
    'svc-tab-technology': 'Tecnología',

    /* Cosmetic */
    'svc-whitening': 'Blanqueamiento Dental',
    'svc-whitening-text': 'Tratamientos profesionales de blanqueamiento que iluminan su sonrisa de forma segura y efectiva, con resultados visibles en una sola visita.',
    'svc-veneers': 'Carillas de Porcelana',
    'svc-veneers-text': 'Láminas delgadas hechas a medida, adheridas al frente de los dientes para corregir astillas, manchas, espacios y desalineación.',
    'svc-bonding': 'Adhesión Dental',
    'svc-bonding-text': 'Resina compuesta del color del diente aplicada para reparar dientes astillados, agrietados o decolorados, restaurando un aspecto natural en una sola cita.',
    'svc-braces': 'Frenillos Invisibles',
    'svc-braces-text': 'Terapia con alineadores transparentes para enderezar los dientes discretamente, sin la apariencia de los frenillos metálicos tradicionales.',
    'svc-fillings': 'Empastes del Color del Diente',
    'svc-fillings-text': 'Empastes compuestos de aspecto natural que se integran perfectamente con sus dientes, reemplazando los antiguos empastes de amalgama.',

    /* Family */
    'svc-cleanings': 'Limpiezas y Exámenes de Rutina',
    'svc-cleanings-text': 'Limpiezas dentales completas y exámenes minuciosos para mantener su salud oral y detectar problemas a tiempo.',
    'svc-xrays': 'Radiografías Digitales',
    'svc-xrays-text': 'Imágenes digitales de baja radiación para un diagnóstico preciso, con resultados instantáneos visibles en pantalla.',
    'svc-fluoride': 'Tratamientos de Flúor',
    'svc-fluoride-text': 'Aplicaciones protectoras de flúor para fortalecer el esmalte dental y prevenir caries, especialmente importante para niños.',
    'svc-sealants': 'Selladores',
    'svc-sealants-text': 'Recubrimientos protectores aplicados en las superficies de masticación de los dientes posteriores para prevenir la caries.',

    /* Reconstructive */
    'svc-crowns': 'Coronas',
    'svc-crowns-text': 'Coronas dentales fabricadas a medida que restauran los dientes dañados a su forma, fuerza y apariencia originales.',
    'svc-implants': 'Implantes Dentales',
    'svc-implants-text': 'Soluciones permanentes de reemplazo dental ancladas al hueso de la mandíbula, con apariencia y función de dientes naturales.',
    'svc-bridges': 'Puentes Fijos',
    'svc-bridges-text': 'Puentes dentales no removibles que cubren el espacio dejado por dientes perdidos, anclados a dientes sanos adyacentes.',
    'svc-inlays': 'Inlays y Onlays',
    'svc-inlays-text': 'Restauraciones conservadoras para dientes con daño moderado que no requieren una corona completa.',
    'svc-dentures': 'Dentaduras y Parciales',
    'svc-dentures-text': 'Dentaduras completas y parciales hechas a medida para restaurar su sonrisa y capacidad de masticación con confianza.',

    /* Emergency */
    'svc-rootcanal': 'Endodoncias',
    'svc-rootcanal-text': 'Terapia de conducto suave para salvar dientes infectados y aliviar el dolor, preservando la estructura natural del diente.',
    'svc-periodontal': 'Terapia Periodontal No Quirúrgica',
    'svc-periodontal-text': 'Limpieza profunda y raspado para tratar la enfermedad de las encías sin cirugía, ayudando a restaurar la salud gingival.',
    'svc-extraction': 'Extracción Dental',
    'svc-extraction-text': 'Extracciones dentales seguras y cómodas cuando un diente no puede ser salvado, con opciones de reemplazo posterior.',
    'svc-sedation': 'Odontología con Sedación',
    'svc-sedation-text': 'Opciones de sedación para pacientes ansiosos para asegurar una experiencia dental tranquila y cómoda.',
    'svc-nightguards': 'Guardas Nocturnas',
    'svc-nightguards-text': 'Guardas nocturnas hechas a medida para proteger los dientes del rechinamiento y apretamiento durante el sueño.',

    /* Technology */
    'svc-tech-tag': 'Tecnología Avanzada',
    'svc-tech-title': 'Restauraciones CEREC en el Mismo Día',
    'svc-tech-text': 'La tecnología CEREC utiliza modelado digital y odontología CAD/CAM para crear restauraciones cerámicas económicas directamente en nuestro consultorio.',
    'svc-tech-subtext': 'Lo que anteriormente requería múltiples visitas y coronas temporales ahora puede completarse en una sola cita. Las impresiones digitales significan que no más moldes incómodos.',
    'svc-tech-check1': 'Coronas y restauraciones el mismo día',
    'svc-tech-check2': 'Impresiones digitales (sin moldes incómodos)',
    'svc-tech-check3': 'Fabricación precisa CAD/CAM',
    'svc-tech-check4': 'Material cerámico de aspecto natural',

    /* FAQ */
    'svc-faq-tag': 'Preguntas Frecuentes',
    'svc-faq-title': 'Preguntas Frecuentes',
    'svc-faq-q1': '¿Qué debo esperar en mi primera visita?',
    'svc-faq-a1': 'Su primera visita incluye un examen completo, radiografías digitales y una limpieza profesional. La Dra. Groce discutirá sus objetivos de salud oral y creará un plan de tratamiento personalizado. Nos tomamos el tiempo para responder todas sus preguntas y asegurarnos de que se sienta cómodo.',
    'svc-faq-q2': '¿Aceptan seguro dental?',
    'svc-faq-a2': 'Aceptamos la mayoría de los planes de seguro dental principales. Por favor contacte nuestra oficina con su información de seguro y verificaremos su cobertura antes de su cita. También ofrecemos opciones de pago accesibles para pacientes sin seguro.',
    'svc-faq-q3': '¿Qué pasa si me pone nervioso ir al dentista?',
    'svc-faq-a3': 'La ansiedad dental es completamente normal y tenemos experiencia ayudando a pacientes ansiosos. Ofrecemos opciones de sedación y nuestro equipo tiene un enfoque suave y paciente. Nuestro ambiente acogedor está diseñado para reducir el estrés desde el momento en que entra.',
    'svc-faq-q4': '¿Con qué frecuencia debo visitar al dentista?',
    'svc-faq-a4': 'Recomendamos visitas al menos dos veces al año para limpiezas y exámenes de rutina. Las visitas regulares nos ayudan a detectar posibles problemas temprano cuando son más fáciles y económicos de tratar.',
    'svc-faq-q5': '¿Ofrecen servicios dentales de emergencia?',
    'svc-faq-a5': 'Sí, atendemos emergencias dentales durante nuestro horario (lunes a jueves, 8:30 AM a 5:00 PM). Si experimenta dolor severo, hinchazón o una lesión dental, llámenos al (864) 232-8393 de inmediato.',
    'svc-faq-q6': '¿Ofrecen servicios en español?',
    'svc-faq-a6': '¡Sí! Nosotros hablamos español. Nuestro consultorio está comprometido con eliminar las barreras del idioma en la atención dental. Damos la bienvenida a pacientes hispanohablantes y ofrecemos atención y consultas en español.',

    /* CTA */
    'svc-cta-title': '¿Listo Para Comenzar?',
    'svc-cta-text': 'Reserve su cita hoy y déjenos ayudarle a lograr la sonrisa que merece.',
    'svc-cta-book': 'Reservar Cita',
    'svc-cta-contact': 'Contáctenos',

    /* ══════════════════════════════════════════════════
       CONTACT PAGE
       ══════════════════════════════════════════════════ */
    'contact-hero-tag': 'Contáctenos',
    'contact-hero-title': 'Háganos Saber Cómo Podemos Ayudar',
    'contact-hero-subtitle': 'Nos encantaría saber de usted. Programe una cita, haga una pregunta o simplemente salúdenos.',
    'contact-info-title': 'Información de Contacto',
    'contact-info-text': 'Comuníquese de la forma que más le convenga. Respondemos a todas las consultas dentro de un día hábil.',
    'contact-phone': 'Teléfono',
    'contact-email': 'Correo Electrónico',
    'contact-address': 'Dirección',
    'contact-fax': 'Fax',
    'contact-hours': 'Horario de Oficina',
    'contact-hours-mon': 'Lunes',
    'contact-hours-tue': 'Martes',
    'contact-hours-wed': 'Miércoles',
    'contact-hours-thu': 'Jueves',
    'contact-hours-closed': 'Vie \u2013 Dom',
    'contact-hours-closed-text': 'Cerrado',
    'contact-hours-lunch': 'Receso de almuerzo: 12:30 \u2013 2:00 PM',
    'contact-form-title': 'Envíenos un Mensaje',
    'contact-form-first': 'Nombre',
    'contact-form-last': 'Apellido',
    'contact-form-email': 'Correo Electrónico',
    'contact-form-phone': 'Teléfono',
    'contact-form-service': 'Interesado En',
    'contact-form-message': 'Mensaje Adicional',
    'contact-form-submit': 'Enviar Mensaje',
    'contact-map-tag': 'Encuéntrenos',
    'contact-map-title': 'Visite Nuestra Oficina en Greenville',
    'contact-map-address': '10 Pelham Road, Greenville, SC 29607'
  };

  /* Placeholder translations */
  var placeholders = {
    'ph-name': 'Su nombre',
    'ph-email': 'su@correo.com',
    'ph-phone': '(___) ___-____',
    'ph-message': 'Cuéntenos cómo podemos ayudarle...',
    'ph-first': 'Nombre',
    'ph-last': 'Apellido',
    'ph-contact-email': 'su@correo.com',
    'ph-contact-phone': '(___) ___-____',
    'ph-contact-message': 'Cuéntenos sobre sus necesidades dentales...'
  };

  /* ── i18n State ── */
  var currentLang = localStorage.getItem('pd-lang') || 'en';
  var originals = {};
  var originalPlaceholders = {};
  var originalsHtml = {};

  /* Store originals BEFORE any DOM processing (kinetic text, etc.) */
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    originals[el.dataset.i18n] = el.textContent.trim();
  });
  document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
    originalsHtml[el.dataset.i18nHtml] = el.innerHTML;
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
    originalPlaceholders[el.dataset.i18nPh] = el.placeholder;
  });

  /* ── Kinetic text processor (extracted for reuse) ── */
  function processKinetic(el) {
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map(function (w, i) {
        return '<span class="kw" style="--i:' + i + '"><span class="kw-inner">' + w + '</span></span>';
      })
      .join(' ');
    el.classList.add('kinetic-ready');
  }

  /* ── Apply language ── */
  function applyLanguage(lang) {
    /* Text content */
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.dataset.i18n;
      if (lang === 'es' && translations[key]) {
        el.textContent = translations[key];
      } else if (lang === 'en' && originals[key] !== undefined) {
        el.textContent = originals[key];
      }
      /* Re-process kinetic text if needed */
      if (el.hasAttribute('data-kinetic')) {
        processKinetic(el);
      }
    });

    /* HTML content (for elements with mixed markup) */
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.dataset.i18nHtml;
      if (lang === 'es' && translations[key]) {
        el.innerHTML = translations[key];
      } else if (lang === 'en' && originalsHtml[key] !== undefined) {
        el.innerHTML = originalsHtml[key];
      }
    });

    /* Placeholders */
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.dataset.i18nPh;
      if (lang === 'es' && placeholders[key]) {
        el.placeholder = placeholders[key];
      } else if (lang === 'en' && originalPlaceholders[key] !== undefined) {
        el.placeholder = originalPlaceholders[key];
      }
    });

    /* Update HTML lang */
    document.documentElement.lang = lang;

    /* Update toggle buttons */
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      var enSpan = btn.querySelector('.lang-en');
      var esSpan = btn.querySelector('.lang-es');
      if (enSpan && esSpan) {
        enSpan.classList.toggle('lang-active', lang === 'en');
        enSpan.classList.toggle('lang-inactive', lang !== 'en');
        esSpan.classList.toggle('lang-active', lang === 'es');
        esSpan.classList.toggle('lang-inactive', lang !== 'es');
      }
      btn.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    });

    /* Update bilingual ribbon */
    var ribbon = document.querySelector('.ribbon-bilingual');
    if (ribbon) {
      ribbon.textContent = lang === 'en' ? 'Hablamos Español' : 'We Speak English';
    }

    /* Re-run open/closed indicator */
    updateOpenIndicator(lang);
  }

  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    localStorage.setItem('pd-lang', currentLang);
    applyLanguage(currentLang);
  }

  /* Expose globally */
  window.toggleLanguage = toggleLanguage;

  /* ── Layer 4: Kinetic text — word-by-word reveal for hero titles ── */
  document.querySelectorAll('[data-kinetic]').forEach(function (el) {
    processKinetic(el);
  });

  /* ── Apply saved language on load (after kinetic processing) ── */
  if (currentLang === 'es') {
    applyLanguage('es');
  }

  /* ── Layer 2 Fallback: IntersectionObserver for scroll reveals ── */
  if (!CSS.supports('animation-timeline', 'view()')) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );

    document.querySelectorAll('[data-scroll]').forEach(function (el) { observer.observe(el); });
    document.querySelectorAll('[data-kinetic]').forEach(function (el) { observer.observe(el); });
  }

  /* ── Layer 4: Animated counters ── */
  function animateCounter(el) {
    var target = parseInt(el.dataset.target, 10);
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = 1800;
    var start = performance.now();

    function update(time) {
      var progress = Math.min((time - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 4);
      el.textContent = prefix + Math.floor(ease * target).toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + suffix;
    }

    requestAnimationFrame(update);
  }

  var counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-counter]').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ── Layer 4: Magnetic buttons (desktop only) ── */
  if (matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      var strength = 0.25;
      var radius = 70;

      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        var dist = Math.sqrt(x * x + y * y);
        if (dist < radius) {
          var pull = 1 - dist / radius;
          btn.style.transform =
            'translate(' + x * pull * strength + 'px, ' + y * pull * strength + 'px)';
        }
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        btn.style.transform = '';
        setTimeout(function () {
          btn.style.transition = '';
        }, 500);
      });
    });
  }

  /* ── Navigation: scroll state + mobile toggle ── */
  var nav = document.querySelector('.nav');
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.querySelector('.nav-mobile');

  if (nav) {
    window.addEventListener(
      'scroll',
      function () {
        if (window.scrollY > 60) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      },
      { passive: true }
    );
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navToggle.classList.toggle('open');
      navMobile.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var wasOpen = item.classList.contains('open');

      item.parentElement.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        openItem.classList.remove('open');
      });

      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = nav ? nav.offsetHeight + 16 : 16;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* ══════════════════════════════════════════════════════════════
     INTERACTIVE EXPERIENCES
     ══════════════════════════════════════════════════════════════ */

  /* ── Experience 1: Facility Tour Gallery ── */
  (function () {
    var gallery = document.querySelector('.tour-gallery');
    if (!gallery) return;

    var slides = gallery.querySelectorAll('.tour-slide');
    var dots = gallery.querySelectorAll('.tour-dot');
    var prevBtn = gallery.querySelector('.tour-prev');
    var nextBtn = gallery.querySelector('.tour-next');
    var current = 0;
    var total = slides.length;
    if (total === 0) return;

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = (index + total) % total;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    var startX = 0;
    gallery.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button')) return;
      startX = e.clientX;
    });
    gallery.addEventListener('pointerup', function (e) {
      if (e.target.closest('button')) return;
      var diff = e.clientX - startX;
      if (Math.abs(diff) > 50) {
        goTo(diff > 0 ? current - 1 : current + 1);
      }
    });

    gallery.setAttribute('tabindex', '0');
    gallery.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') goTo(current - 1);
      if (e.key === 'ArrowRight') goTo(current + 1);
    });

    var autoplay = setInterval(function () { goTo(current + 1); }, 5000);
    gallery.addEventListener('mouseenter', function () { clearInterval(autoplay); });
    gallery.addEventListener('mouseleave', function () {
      autoplay = setInterval(function () { goTo(current + 1); }, 5000);
    });
  })();

  /* ── Experience 2: Dynamic open/closed indicator (language-aware) ── */
  function updateOpenIndicator(lang) {
    var indicators = document.querySelectorAll('.open-indicator');
    if (indicators.length === 0) return;

    var now = new Date();
    var day = now.getDay();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var timeNow = hours + minutes / 60;

    var isWeekday = day >= 1 && day <= 4;
    var isMorning = timeNow >= 8.5 && timeNow < 12.5;
    var isAfternoon = timeNow >= 14 && timeNow < 17;
    var isOpen = isWeekday && (isMorning || isAfternoon);

    var l = lang || currentLang;

    indicators.forEach(function (indicator) {
      var statusEl = indicator.querySelector('.open-status');
      var detailEl = indicator.querySelector('.open-detail');

      indicator.classList.remove('is-open', 'is-closed');

      if (isOpen) {
        indicator.classList.add('is-open');
        statusEl.textContent = l === 'es' ? 'Abierto' : 'Open Now';

        if (isMorning) {
          var minsLeft = Math.floor((12.5 - timeNow) * 60);
          if (minsLeft <= 60) {
            detailEl.textContent = l === 'es'
              ? 'Almuerzo en ' + minsLeft + ' min'
              : 'Lunch break in ' + minsLeft + ' min';
          } else {
            detailEl.textContent = l === 'es' ? 'Hasta las 12:30 PM' : 'Until 12:30 PM';
          }
        } else {
          var minsLeft2 = Math.floor((17 - timeNow) * 60);
          if (minsLeft2 <= 60) {
            detailEl.textContent = l === 'es'
              ? 'Cierra en ' + minsLeft2 + ' min'
              : 'Closes in ' + minsLeft2 + ' min';
          } else {
            detailEl.textContent = l === 'es' ? 'Hasta las 5:00 PM' : 'Until 5:00 PM';
          }
        }
      } else {
        indicator.classList.add('is-closed');
        statusEl.textContent = l === 'es' ? 'Cerrado' : 'Closed';

        if (day >= 1 && day <= 4 && timeNow < 8.5) {
          detailEl.textContent = l === 'es' ? 'Abre a las 8:30 AM' : 'Opens at 8:30 AM';
        } else if (day >= 1 && day <= 4 && timeNow >= 12.5 && timeNow < 14) {
          detailEl.textContent = l === 'es' ? 'Regresa a las 2:00 PM' : 'Back at 2:00 PM';
        } else {
          detailEl.textContent = l === 'es' ? 'Abre lunes 8:30 AM' : 'Opens Monday 8:30 AM';
        }
      }
    });
  }

  /* Initialize open/closed */
  updateOpenIndicator(currentLang);

  /* ── Experience 3: Section dot navigation ── */
  (function () {
    var sections = document.querySelectorAll('section[id]');
    var dotsContainer = document.querySelector('.section-dots');
    if (!dotsContainer || sections.length === 0) return;

    dotsContainer.innerHTML = Array.from(sections).map(function (s) {
      var label = s.dataset.label || s.id.replace(/-/g, ' ');
      return '<a href="#' + s.id + '" class="dot" data-section="' + s.id + '" aria-label="' + label + '"><span class="dot-tooltip">' + label + '</span></a>';
    }).join('');

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var dot = dotsContainer.querySelector('[data-section="' + e.target.id + '"]');
        if (dot) dot.classList.toggle('active', e.isIntersecting);
      });
    }, { threshold: 0.35 });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  })();

  /* ── Experience 4: Service tabs with sliding indicator ── */
  (function () {
    var tabsContainer = document.querySelector('.service-tabs');
    if (!tabsContainer) return;

    var tabs = tabsContainer.querySelectorAll('.service-tab');
    var panels = tabsContainer.querySelectorAll('.service-panel');
    var indicator = tabsContainer.querySelector('.tab-indicator');

    function activateTab(index) {
      tabs.forEach(function (t, i) {
        t.classList.toggle('active', i === index);
        t.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });

      panels.forEach(function (p, i) {
        p.classList.toggle('active', i === index);
      });

      if (indicator && tabs[index]) {
        var tabRect = tabs[index].getBoundingClientRect();
        var containerRect = tabsContainer.querySelector('.tabs-header').getBoundingClientRect();
        indicator.style.width = tabRect.width + 'px';
        indicator.style.transform = 'translateX(' + (tabRect.left - containerRect.left) + 'px)';
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activateTab(i); });
    });

    tabsContainer.addEventListener('keydown', function (e) {
      var activeIndex = Array.from(tabs).findIndex(function (t) { return t.classList.contains('active'); });
      if (e.key === 'ArrowRight') activateTab((activeIndex + 1) % tabs.length);
      if (e.key === 'ArrowLeft') activateTab((activeIndex - 1 + tabs.length) % tabs.length);
    });

    if (tabs.length > 0) activateTab(0);
  })();

  /* ── Make bilingual ribbon clickable to toggle language ── */
  var ribbon = document.querySelector('.ribbon-bilingual');
  if (ribbon) {
    ribbon.style.cursor = 'pointer';
    ribbon.addEventListener('click', toggleLanguage);
  }

})();
