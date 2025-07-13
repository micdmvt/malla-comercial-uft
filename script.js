document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  // Estado inicial: bloquear los que tengan prereqs
  ramos.forEach(r => {
    const prereqs = r.dataset.prereqs.split(',').filter(x => x);
    if (prereqs.length) r.classList.add('locked');
  });

  // Al hacer click en un ramo
  ramos.forEach(r => {
    r.addEventListener('click', () => {
      if (r.classList.contains('locked')) return;
      r.classList.toggle('passed');
      actualizarBloqueos();
    });
  });

  function actualizarBloqueos() {
    ramos.forEach(r => {
      if (!r.classList.contains('locked')) return;
      const prereqs = r.dataset.prereqs.split(',').filter(x => x);
      // desbloquear si **todos** los prereqs están aprobados
      const ok = prereqs.every(id => {
        const pre = document.querySelector(`.ramo[data-id="${id}"]`);
        return pre && pre.classList.contains('passed');
      });
      if (ok) r.classList.remove('locked');
    });
  }
});
