What is this?
=============

This micro-library provides a way to reset any pending asynchronous actions in the browser. This is how you use it:

```javascript
Clean.slate();
```

Why does this exist?
====================

I was using [Turbolinks](https://github.com/rails/turbolinks) and discovered that my calls to `setTimeout` were persisting between page changes.

I [opened a pull request](https://github.com/rails/turbolinks/pull/268) to change this behavior, but the maintainers (rightly) pointed out that you may *want* persistent asynchronous operations between page changes.

Of course, you might not. So this library is for anyone using a system of simulating page refreshes using AJAX requests (Turbolinks, pjax, jQuery Mobile, etc.) who wants a page *change* to act like a page *refresh*.

What gets reset?
================

All of this stuff:

- Callbacks passed to `setTimeout`
- Callbacks passed to `setInterval`
- Pending AJAX requests (`XMLHttpRequest` objects)
- Currently running web workers (`Worker` objects)

Do I have to reset everything?
==============================

Nope. You can also just reset the stuff you want to reset.

```javascript
// Just clear the setTimeout callbacks
Clean.timeouts();

// Just clear the setInterval callbacks
Clean.intervals();

// Just abort the pending AJAX requests
Clean.requests();

// Just terminate any running web workers
Clean.workers();
```

Is that it?
===========

Yep!
