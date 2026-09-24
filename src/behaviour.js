/* Portside Design System — shared component behaviour.
 *
 * Everything here is wired by event delegation on `document`, so markup added later
 * (rendered by a prototype's own script) works without calling anything. The CSS draws
 * the components; this file only opens, closes, selects and moves focus.
 *
 * Covered: dropdown list, tabs and segmented tabs, date picker, text box clear, alert
 * dismiss, tooltip Escape, dialogs. Page-specific logic (data, filtering, saving) stays
 * in the prototype.
 *
 * Events: a dropdown or date picker that changes value dispatches `psds:change` on its
 * root with `detail.value`; a dismissed alert dispatches `psds:dismiss`.
 */
(function () {
  'use strict';
  if (window.PSDS) return;

  var on = function (type, fn, capture) { document.addEventListener(type, fn, capture); };
  var closest = function (el, sel) { return el && el.closest ? el.closest(sel) : null; };
  var emit = function (el, name, detail) {
    el.dispatchEvent(new CustomEvent(name, { bubbles: true, detail: detail }));
  };
  // A popup inside a scrolling container (e.g. a modal body) can open below the fold;
  // scroll just enough to show all of it.
  var reveal = function (el) {
    if (el.scrollIntoView) el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  /* ------------------------------------------------------------ Dropdown list --- */
  /* Markup: .psds-dropdown > .psds-dropdown__control > button.psds-dropdown__field
   *         + .psds-dropdown__menu[hidden] > .psds-dropdown__option[role=option] */

  var ddMenu = function (root) { return root.querySelector('.psds-dropdown__menu'); };
  var ddOptions = function (menu) {
    return Array.prototype.filter.call(menu.querySelectorAll('.psds-dropdown__option'), function (o) {
      return o.getAttribute('aria-disabled') !== 'true';
    });
  };

  function ddOpen(root) {
    var menu = ddMenu(root);
    var field = root.querySelector('.psds-dropdown__field');
    if (!menu || !field || field.disabled || root.classList.contains('psds-dropdown--readonly')) return;
    closeAllDropdowns(root);
    menu.hidden = false;
    field.setAttribute('aria-expanded', 'true');
    var options = ddOptions(menu);
    options.forEach(function (o) { o.tabIndex = -1; });
    var current = menu.querySelector('.psds-dropdown__option[aria-selected="true"], .psds-dropdown__option.is-selected');
    (current && options.indexOf(current) >= 0 ? current : options[0] || field).focus({ preventScroll: true });
    reveal(menu);
  }

  function ddClose(root, returnFocus) {
    var menu = ddMenu(root);
    if (!menu || menu.hidden) return;
    menu.hidden = true;
    var field = root.querySelector('.psds-dropdown__field');
    if (field) {
      field.setAttribute('aria-expanded', 'false');
      if (returnFocus) field.focus();
    }
  }

  function closeAllDropdowns(except) {
    document.querySelectorAll('.psds-dropdown').forEach(function (root) {
      if (root !== except) ddClose(root, false);
    });
  }

  function ddSelect(root, option) {
    var menu = ddMenu(root);
    menu.querySelectorAll('.psds-dropdown__option').forEach(function (o) {
      o.classList.remove('is-selected');
      o.removeAttribute('aria-selected');
    });
    option.classList.add('is-selected');
    option.setAttribute('aria-selected', 'true');
    var value = option.getAttribute('data-value') || option.textContent.trim();
    var field = root.querySelector('.psds-dropdown__field');
    field.textContent = option.textContent.trim();
    field.setAttribute('data-value', value);
    root.classList.add('psds-dropdown--filled');
    ddClose(root, true);
    emit(root, 'psds:change', { value: value });
  }

  on('click', function (e) {
    var field = closest(e.target, '.psds-dropdown__field');
    if (field) {
      var root = closest(field, '.psds-dropdown');
      var menu = root && ddMenu(root);
      if (menu) { menu.hidden ? ddOpen(root) : ddClose(root, true); }
      return;
    }
    var option = closest(e.target, '.psds-dropdown__option');
    if (option && option.getAttribute('aria-disabled') !== 'true') {
      ddSelect(closest(option, '.psds-dropdown'), option);
      return;
    }
    if (!closest(e.target, '.psds-dropdown')) closeAllDropdowns(null);
  });

  on('keydown', function (e) {
    var root = closest(e.target, '.psds-dropdown');
    if (!root) return;
    var menu = ddMenu(root);
    if (!menu) return;
    var onField = closest(e.target, '.psds-dropdown__field');
    if (onField && menu.hidden && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      e.preventDefault();
      ddOpen(root);
      return;
    }
    if (menu.hidden) return;
    var options = ddOptions(menu);
    var i = options.indexOf(document.activeElement);
    var next = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: options.length - 1 }[e.key];
    if (next !== undefined && options.length) {
      e.preventDefault();
      options[Math.max(0, Math.min(options.length - 1, next))].focus();
    } else if ((e.key === 'Enter' || e.key === ' ') && i >= 0) {
      e.preventDefault();
      ddSelect(root, options[i]);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      ddClose(root, true);
    } else if (e.key === 'Tab') {
      ddClose(root, false);
    }
  });

  /* --------------------------------------------------------------------- Tabs --- */
  /* Any [role=tablist] of [role=tab] buttons: .psds-tabs and tab-style .psds-segmented.
   * Each tab's aria-controls names the panel it shows; the others get `hidden`. */

  var tabsOf = function (list) {
    return Array.prototype.filter.call(list.querySelectorAll('[role="tab"]'), function (t) {
      return closest(t, '[role="tablist"]') === list;
    });
  };
  var tabEnabled = function (t) {
    return t.getAttribute('aria-disabled') !== 'true' && !t.disabled && !t.classList.contains('is-disabled');
  };

  function selectTab(tab) {
    var list = closest(tab, '[role="tablist"]');
    tabsOf(list).forEach(function (t) {
      var selected = t === tab;
      t.setAttribute('aria-selected', String(selected));
      t.tabIndex = selected ? 0 : -1;
      var id = t.getAttribute('aria-controls');
      var panel = id && document.getElementById(id);
      if (panel) panel.hidden = !selected;
    });
    tab.focus();
    if (tab.scrollIntoView) tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    emit(tab, 'psds:change', { value: tab.getAttribute('aria-controls') || tab.textContent.trim() });
  }

  on('click', function (e) {
    var tab = closest(e.target, '[role="tab"]');
    if (tab && tabEnabled(tab) && closest(tab, '[role="tablist"]')) selectTab(tab);
  });

  on('keydown', function (e) {
    var tab = closest(e.target, '[role="tab"]');
    var list = tab && closest(tab, '[role="tablist"]');
    if (!list) return;
    var tabs = tabsOf(list).filter(tabEnabled);
    var i = tabs.indexOf(tab);
    var next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (i < 0 || next === undefined) return;
    e.preventDefault();
    selectTab(tabs[(next + tabs.length) % tabs.length]);
  });

  // Overflow scroll buttons on .psds-tabs: shown only when the list overflows.
  function syncTabScroll(bar) {
    var list = bar.querySelector('.psds-tabs__list');
    var buttons = bar.querySelectorAll('.psds-tabs__scroll');
    if (!list || buttons.length < 2) return;
    var overflow = list.scrollWidth > list.clientWidth + 1;
    buttons[0].hidden = buttons[1].hidden = !overflow;
    buttons[0].disabled = list.scrollLeft <= 0;
    buttons[1].disabled = list.scrollLeft + list.clientWidth >= list.scrollWidth - 1;
  }

  on('click', function (e) {
    var btn = closest(e.target, '.psds-tabs__scroll');
    if (!btn) return;
    var bar = closest(btn, '.psds-tabs');
    var list = bar && bar.querySelector('.psds-tabs__list');
    var dir = Number(btn.getAttribute('data-dir')) || (btn === bar.querySelector('.psds-tabs__scroll') ? -1 : 1);
    if (list) list.scrollBy({ left: dir * list.clientWidth * 0.8 });
  });
  on('scroll', function (e) {
    var bar = e.target.classList && e.target.classList.contains('psds-tabs__list') && closest(e.target, '.psds-tabs');
    if (bar) syncTabScroll(bar);
  }, true);

  /* -------------------------------------------------------------- Date picker --- */
  /* Markup: .psds-datepicker > .psds-datepicker__control > input.psds-datepicker__field
   *         + button.psds-datepicker__toggle. Dates are YYYY/MM/DD, as in the docs. */

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'];
  var WEEKDAYS = [['SU', 'Sunday'], ['MO', 'Monday'], ['TU', 'Tuesday'], ['WE', 'Wednesday'],
    ['TH', 'Thursday'], ['FR', 'Friday'], ['SA', 'Saturday']];
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var formatDate = function (d) { return d.getFullYear() + '/' + pad(d.getMonth() + 1) + '/' + pad(d.getDate()); };
  var sameDay = function (a, b) {
    return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  };
  var parseDate = function (value) {
    var m = /^(\d{4})\/(\d{2})\/(\d{2})$/.exec((value || '').trim());
    if (!m) return null;
    var d = new Date(+m[1], +m[2] - 1, +m[3]);
    return d.getMonth() === +m[2] - 1 ? d : null;
  };
  var el = function (tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  var dpUid = 0;
  var dpState = new WeakMap(); // root -> { view, selected, panel }

  function dpSize(root) {
    var m = root.className.match(/psds-datepicker--(xs|sm|md|lg)\b/);
    return m ? m[1] : 'sm';
  }

  function dpCalendar(root, st, focus) {
    var year = st.view.getFullYear();
    var month = st.view.getMonth();
    var today = new Date();
    var panel = el('div', 'psds-datepicker__calendar');
    panel.setAttribute('role', 'dialog');
    var toggle = root.querySelector('.psds-datepicker__toggle');
    panel.setAttribute('aria-label', (toggle && toggle.getAttribute('aria-label')) || 'Choose date');

    var header = el('div', 'psds-datepicker__header');
    var title = el('h3', 'psds-datepicker__title', MONTHS[month] + ' ' + year);
    title.id = 'psds-cal-' + (++dpUid);
    title.setAttribute('aria-live', 'polite');
    var nav = el('div', 'psds-datepicker__nav');
    var prev = el('button', 'psds-datepicker__prev');
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Previous month');
    prev.setAttribute('data-step', '-1');
    var next = el('button', 'psds-datepicker__next');
    next.type = 'button';
    next.setAttribute('aria-label', 'Next month');
    next.setAttribute('data-step', '1');
    nav.append(prev, next);
    header.append(title, nav);

    var grid = el('table', 'psds-datepicker__grid');
    grid.setAttribute('role', 'grid');
    grid.setAttribute('aria-labelledby', title.id);
    var thead = el('thead');
    var headRow = el('tr');
    WEEKDAYS.forEach(function (w) {
      var th = el('th', 'psds-datepicker__weekday', w[0]);
      th.scope = 'col';
      th.abbr = w[1];
      headRow.append(th);
    });
    thead.append(headRow);

    var tbody = el('tbody');
    var first = new Date(year, month, 1);
    var cursor = new Date(year, month, 1 - first.getDay());
    var last = new Date(year, month + 1, 0);
    var end = new Date(year, month + 1, 6 - last.getDay());
    var focusDate = focus || (st.selected && st.selected.getMonth() === month && st.selected.getFullYear() === year
      ? st.selected
      : (today.getMonth() === month && today.getFullYear() === year ? today : first));
    var row;
    while (cursor <= end) {
      if (cursor.getDay() === 0) { row = el('tr'); tbody.append(row); }
      var td = el('td');
      td.setAttribute('role', 'gridcell');
      var day = el('button', 'psds-datepicker__day', String(cursor.getDate()));
      day.type = 'button';
      day.setAttribute('data-date', formatDate(cursor));
      day.setAttribute('aria-label', cursor.toDateString());
      day.tabIndex = sameDay(cursor, focusDate) ? 0 : -1;
      if (cursor.getMonth() !== month) day.classList.add('psds-datepicker__day--outside');
      if (sameDay(cursor, today)) day.setAttribute('aria-current', 'date');
      day.setAttribute('aria-selected', String(sameDay(cursor, st.selected)));
      td.append(day);
      row.append(td);
      cursor.setDate(cursor.getDate() + 1);
    }
    grid.append(thead, tbody);

    var footer = el('div', 'psds-datepicker__footer');
    var todayBtn = el('button', 'psds-btn psds-btn--' + dpSize(root) + ' psds-btn--primary', 'Today');
    todayBtn.type = 'button';
    todayBtn.setAttribute('data-today', '');
    footer.append(todayBtn);

    panel.append(header, grid, footer);
    return panel;
  }

  function dpRender(root, focus, focusSelector) {
    var st = dpState.get(root);
    var panel = dpCalendar(root, st, focus);
    if (st.panel) st.panel.replaceWith(panel);
    else root.querySelector('.psds-datepicker__control').append(panel);
    st.panel = panel;
    panel.querySelector(focusSelector || '.psds-datepicker__day[tabindex="0"]').focus({ preventScroll: true });
    reveal(panel);
  }

  function dpOpen(root) {
    closeAllDatepickers(root);
    var field = root.querySelector('.psds-datepicker__field');
    var selected = parseDate(field && field.value);
    dpState.set(root, { selected: selected, view: selected ? new Date(selected) : new Date(), panel: null });
    root.querySelector('.psds-datepicker__toggle').setAttribute('aria-expanded', 'true');
    dpRender(root);
  }

  function dpClose(root, returnFocus) {
    var st = dpState.get(root);
    if (!st || !st.panel) return;
    st.panel.remove();
    st.panel = null;
    var toggle = root.querySelector('.psds-datepicker__toggle');
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle.focus();
  }

  function closeAllDatepickers(except) {
    document.querySelectorAll('.psds-datepicker').forEach(function (root) {
      if (root !== except) dpClose(root, false);
    });
  }

  function dpChoose(root, date) {
    var field = root.querySelector('.psds-datepicker__field');
    field.value = formatDate(date);
    root.classList.add('psds-datepicker--filled');
    dpClose(root, false);
    field.focus();
    field.dispatchEvent(new Event('input', { bubbles: true }));
    emit(root, 'psds:change', { value: field.value, date: date });
  }

  on('click', function (e) {
    var root = closest(e.target, '.psds-datepicker');
    if (!root) {
      closeAllDatepickers(null);
      return;
    }
    var toggle = closest(e.target, '.psds-datepicker__toggle');
    if (toggle) {
      if (toggle.disabled) return;
      var st = dpState.get(root);
      st && st.panel ? dpClose(root, true) : dpOpen(root);
      return;
    }
    var day = closest(e.target, '.psds-datepicker__day');
    if (day && dpState.get(root)) return dpChoose(root, parseDate(day.getAttribute('data-date')));
    var step = closest(e.target, '[data-step]');
    if (step && dpState.get(root)) {
      var s = dpState.get(root);
      s.view = new Date(s.view.getFullYear(), s.view.getMonth() + Number(step.getAttribute('data-step')), 1);
      dpRender(root, null, step.getAttribute('data-step') === '-1' ? '.psds-datepicker__prev' : '.psds-datepicker__next');
      return;
    }
    if (closest(e.target, '[data-today]') && dpState.get(root)) dpChoose(root, new Date());
  });

  on('keydown', function (e) {
    var panel = closest(e.target, '.psds-datepicker__calendar');
    if (!panel) return;
    var root = closest(panel, '.psds-datepicker');
    if (e.key === 'Escape') { e.preventDefault(); dpClose(root, true); return; }
    var day = closest(e.target, '.psds-datepicker__day');
    if (!day) return;
    var from = parseDate(day.getAttribute('data-date'));
    var keys = {
      ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [-7, 0], ArrowDown: [7, 0],
      PageUp: [0, -1], PageDown: [0, 1],
      Home: [-from.getDay(), 0], End: [6 - from.getDay(), 0],
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    var d = new Date(from.getFullYear(), from.getMonth() + keys[e.key][1], from.getDate() + keys[e.key][0]);
    dpState.get(root).view = d;
    dpRender(root, d);
  });

  /* ------------------------------------------------------------ Small helpers --- */

  // Text box clear affix empties its field.
  on('click', function (e) {
    var clear = closest(e.target, '.psds-textbox__clear');
    if (!clear) return;
    var field = closest(clear, '.psds-textbox__control');
    field = field && field.querySelector('.psds-textbox__field');
    if (!field) return;
    field.value = '';
    field.focus();
    field.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // Alert close button removes the alert.
  on('click', function (e) {
    var close = closest(e.target, '.psds-alert__close');
    var alert = close && closest(close, '.psds-alert');
    if (!alert) return;
    emit(alert, 'psds:dismiss');
    alert.remove();
  });

  // WCAG 1.4.13: Escape hides an open tooltip until hover and focus leave its anchor.
  on('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.psds-tooltip-anchor:hover, .psds-tooltip-anchor:focus-within')
      .forEach(function (a) { a.classList.add('is-dismissed'); });
  });
  var undismiss = function (e) {
    var a = closest(e.target, '.psds-tooltip-anchor');
    if (a && !a.contains(e.relatedTarget)) a.classList.remove('is-dismissed');
  };
  on('mouseout', undismiss);
  on('focusout', undismiss);

  /* ------------------------------------------------------------------ Dialogs --- */
  /* <button data-psds-open="dialog-id"> opens <dialog id="dialog-id"> as a modal;
   * <button data-psds-close> inside it closes it. showModal() handles focus trapping,
   * Escape and returning focus. A click on the backdrop also closes. */

  on('click', function (e) {
    var opener = closest(e.target, '[data-psds-open]');
    if (opener) {
      var dialog = document.getElementById(opener.getAttribute('data-psds-open'));
      if (dialog && dialog.showModal && !dialog.open) dialog.showModal();
      return;
    }
    var closer = closest(e.target, '[data-psds-close]');
    if (closer) {
      var d = closest(closer, 'dialog');
      if (d) d.close(closer.getAttribute('data-psds-close') || '');
      return;
    }
    if (e.target.tagName === 'DIALOG' && e.target.open) {
      var r = e.target.getBoundingClientRect();
      var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
      if (!inside) e.target.close('');
    }
  });

  /* ---------------------------------------------------------------- Public API --- */

  var FIELDS = ['psds-textbox', 'psds-textarea', 'psds-dropdown', 'psds-datepicker', 'psds-multiselect'];
  var STATES = ['info', 'success', 'warning', 'danger'];

  window.PSDS = {
    version: '__VERSION__',

    /** 'light', 'dark', or null to follow the operating system. */
    setTheme: function (theme) {
      if (theme) document.documentElement.setAttribute('data-theme', theme);
      else document.documentElement.removeAttribute('data-theme');
    },

    /**
     * Shows a validation state on a form field root (.psds-textbox, .psds-textarea,
     * .psds-dropdown, .psds-datepicker, .psds-multiselect).
     * state: 'info' | 'success' | 'warning' | 'danger' | null (clears it).
     * The form decides the rules; this only draws the result.
     *
     * A helper message already in the markup (a hint such as "Used for sign-in") is
     * borrowed for the message and restored on clear; a message element this function
     * had to create is removed on clear.
     */
    setFieldState: function (root, state, message) {
      var base = FIELDS.filter(function (b) { return root.classList.contains(b); })[0];
      if (!base) return;
      STATES.forEach(function (s) { root.classList.remove(base + '--' + s); });
      if (state) root.classList.add(base + '--' + state);
      var input = root.querySelector('input, textarea, button[class$="__field"]');
      if (input) {
        if (state === 'danger') input.setAttribute('aria-invalid', 'true');
        else input.removeAttribute('aria-invalid');
      }
      var alert = root.querySelector('.' + base + '__alert');

      if (state && message) {
        if (!alert) {
          alert = el('p', base + '__alert');
          alert.setAttribute('data-psds-created', '');
          root.append(alert);
        } else if (!alert.hasAttribute('data-psds-created') && !alert.hasAttribute('data-psds-hint')) {
          alert.setAttribute('data-psds-hint', alert.textContent);
          if (alert.hidden) alert.setAttribute('data-psds-hint-hidden', '');
        }
        if (!alert.id) alert.id = 'psds-alert-' + (++dpUid);
        alert.textContent = message;
        alert.hidden = false;
        if (input && !(input.getAttribute('aria-describedby') || '').split(' ').includes(alert.id)) {
          input.setAttribute('aria-describedby', ((input.getAttribute('aria-describedby') || '') + ' ' + alert.id).trim());
          input.setAttribute('data-psds-describedby', alert.id);
        }
      } else if (alert && !state) {
        if (alert.hasAttribute('data-psds-created')) {
          alert.remove();
        } else if (alert.hasAttribute('data-psds-hint')) {
          alert.textContent = alert.getAttribute('data-psds-hint');
          alert.hidden = alert.hasAttribute('data-psds-hint-hidden');
          alert.removeAttribute('data-psds-hint');
          alert.removeAttribute('data-psds-hint-hidden');
        }
        var added = input && input.getAttribute('data-psds-describedby');
        if (added) {
          var ids = (input.getAttribute('aria-describedby') || '').split(' ').filter(function (id) { return id && id !== added; });
          if (ids.length) input.setAttribute('aria-describedby', ids.join(' '));
          else input.removeAttribute('aria-describedby');
          input.removeAttribute('data-psds-describedby');
        }
      }
    },
  };

  // Initial pass for tab overflow buttons, and again on resize.
  var syncAll = function () { document.querySelectorAll('.psds-tabs').forEach(syncTabScroll); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', syncAll);
  else syncAll();
  window.addEventListener('resize', syncAll);
})();
