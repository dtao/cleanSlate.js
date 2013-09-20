What is this?
=============

This micro-library provides a way to reset any pending asynchronous actions in the browser. This is how you use it:

```javascript
Clean.slate();
```

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
