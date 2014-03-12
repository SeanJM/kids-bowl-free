String.prototype.repeat = function (times) {
  return (new Array(times+1)).join(this);
}

/* Us States */

var selectFillData = {
  'location' : {
    'Us': [
      'Alabama',
      'Alaska',
      'American Samoa',
      'Arizona',
      'Arkansas',
      'California',
      'Colorado',
      'Connecticut',
      'Delaware',
      'District of Columbia',
      'Florida',
      'Georgia',
      'Guam',
      'Hawaii',
      'Idaho',
      'Illinois',
      'Indiana',
      'Iowa',
      'Kansas',
      'Kentucky',
      'Louisiana',
      'Maine',
      'Maryland',
      'Massachusetts',
      'Michigan',
      'Minnesota',
      'Mississippi',
      'Missouri',
      'Montana',
      'Nebraska',
      'Nevada',
      'New Hampshire',
      'New Jersey',
      'New Mexico',
      'New York',
      'North Carolina',
      'North Dakota',
      'Northern Mariana Islands',
      'Ohio',
      'Oklahoma',
      'Oregon',
      'Pennsylvania',
      'Puerto Rico',
      'Rhode Island',
      'South Carolina',
      'South Dakota',
      'Tennessee',
      'Texas',
      'U.S. Virgin Islands',
      'Utah',
      'Vermont',
      'Virginia',
      'Washington',
      'West Virginia',
      'Wisconsin',
      'Wyoming'
      ],
    'Canada': [
      'Alberta',
      'British Columbia',
      'Manitoba',
      'New Brunswick',
      'Newfoundland and Labrador',
      'Northwest Territories',
      'Nova Scotia',
      'Nunavut',
      'Ontario',
      'Prince Edward Island',
      'Quebec',
      'Saskatchewan',
      'Yukon'
    ]
  },
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  years: [
  '1970',
  '1971',
  '1972',
  '1973',
  '1974',
  '1975',
  '1976',
  '1977',
  '1978',
  '1979',
  '1980',
  '1981',
  '1982',
  '1983',
  '1984',
  '1985',
  '1986',
  '1987',
  '1988',
  '1989',
  '1990',
  '1991',
  '1992',
  '1993',
  '1994',
  '1995',
  '1996',
  '1997',
  '1998'
  ]
};

function nullBool(value) {
  if (value) {
    return true;
  } else {
    return false;
  }
}

/*! http://mths.be/placeholder v2.0.7 by @mathias */
;(function(window, document, $) {

  // Opera Mini v7 doesn’t support placeholder although its DOM seems to indicate so
  var isOperaMini = Object.prototype.toString.call(window.operamini) == '[object OperaMini]';
  var isInputSupported = 'placeholder' in document.createElement('input') && !isOperaMini;
  var isTextareaSupported = 'placeholder' in document.createElement('textarea') && !isOperaMini;
  var prototype = $.fn;
  var valHooks = $.valHooks;
  var propHooks = $.propHooks;
  var hooks;
  var placeholder;

  if (isInputSupported && isTextareaSupported) {

    placeholder = prototype.placeholder = function() {
      return this;
    };

    placeholder.input = placeholder.textarea = true;

  } else {

    placeholder = prototype.placeholder = function() {
      var $this = this;
      $this
      .filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
      .not('.placeholder')
      .bind({
        'focus.placeholder': clearPlaceholder,
        'blur.placeholder': setPlaceholder
      })
      .data('placeholder-enabled', true)
      .trigger('blur.placeholder');
      return $this;
    };

    placeholder.input = isInputSupported;
    placeholder.textarea = isTextareaSupported;

    hooks = {
      'get': function(element) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value;
        }

        return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
      },
      'set': function(element, value) {
        var $element = $(element);

        var $passwordInput = $element.data('placeholder-password');
        if ($passwordInput) {
          return $passwordInput[0].value = value;
        }

        if (!$element.data('placeholder-enabled')) {
          return element.value = value;
        }
        if (value == '') {
          element.value = value;
          // Issue #56: Setting the placeholder causes problems if the element continues to have focus.
          if (element != safeActiveElement()) {
          // We can't use `triggerHandler` here because of dummy text/password inputs :(
            setPlaceholder.call(element);
          }
        } else if ($element.hasClass('placeholder')) {
          clearPlaceholder.call(element, true, value) || (element.value = value);
        } else {
          element.value = value;
        }
        // `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
        return $element;
      }
    };

    if (!isInputSupported) {
      valHooks.input = hooks;
      propHooks.value = hooks;
    }
    if (!isTextareaSupported) {
      valHooks.textarea = hooks;
      propHooks.value = hooks;
    }

    $(function() {
        // Look for forms
        $(document).delegate('form', 'submit.placeholder', function() {
                // Clear the placeholder values so they don't get submitted
                var $inputs = $('.placeholder', this).each(clearPlaceholder);
                setTimeout(function() {
                  $inputs.each(setPlaceholder);
                }, 10);
              });
      });

      // Clear placeholder values upon page reload
      $(window).bind('beforeunload.placeholder', function() {
        $('.placeholder').each(function() {
          this.value = '';
        });
      });

    }

    function args(elem) {
      // Return an object of element attributes
      var newAttrs = {};
      var rinlinejQuery = /^jQuery\d+$/;
      $.each(elem.attributes, function(i, attr) {
        if (attr.specified && !rinlinejQuery.test(attr.name)) {
          newAttrs[attr.name] = attr.value;
        }
      });
      return newAttrs;
    }

    function clearPlaceholder(event, value) {
      var input = this;
      var $input = $(input);
      if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
        if ($input.data('placeholder-password')) {
          $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                      // If `clearPlaceholder` was called from `$.valHooks.input.set`
                      if (event === true) {
                        return $input[0].value = value;
                      }
                      $input.focus();
                    } else {
                      input.value = '';
                      $input.removeClass('placeholder');
                      input == safeActiveElement() && input.select();
                    }
                  }
                }

                function setPlaceholder() {
                  var $replacement;
                  var input = this;
                  var $input = $(input);
                  var id = this.id;
                  if (input.value == '') {
                    if (input.type == 'password') {
                      if (!$input.data('placeholder-textinput')) {
                        try {
                          $replacement = $input.clone().attr({ 'type': 'text' });
                        } catch(e) {
                          $replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
                        }
                        $replacement
                        .removeAttr('name')
                        .data({
                          'placeholder-password': $input,
                          'placeholder-id': id
                        })
                        .bind('focus.placeholder', clearPlaceholder);
                        $input
                        .data({
                          'placeholder-textinput': $replacement,
                          'placeholder-id': id
                        })
                        .before($replacement);
                      }
                      $input = $input.removeAttr('id').hide().prev().attr('id', id).show();
                      // Note: `$input[0] != input` now!
                    }
                    $input.addClass('placeholder');
                    $input[0].value = $input.attr('placeholder');
                  } else {
                    $input.removeClass('placeholder');
                  }
                }

                function safeActiveElement() {
      // Avoid IE9 `document.activeElement` of death
      // https://github.com/mathiasbynens/jquery-placeholder/pull/99
      try {
        return document.activeElement;
      } catch (err) {}
    }

  }(this, document, jQuery));

/*
  Template Version 1.0.6
  MIT License
  by Sean MacIsaac & WizzSolutions (http://www.wizzsolutions.com)
*/

var template_store = {};
var template_fn = {};
function template(context) {
  if (typeof context === 'string' && context.match(/^[a-zA-Z0-9_-]+$/)) {
    context = template_store[context];
    if (typeof context === 'object') {
      context = context.content;
    } else {
      context = false;
    }
  }
  return {
    load: function (templateFile,callback) {
      function toObject(xml,i) {
        var xml  = xml.match(/<data>([\s\S]*?)<\/data>/)[1];
        var arr  = xml.match(/<([a-zA-Z0-9_-]+)>([\s\S]*?)<\/([a-zA-Z0-9_-]+)>/g);
        var data = {
          id: i
        };
        var match;
        $.each(arr,function (i,k) {
          match = k.match(/<([a-zA-Z0-9_-]+)>([\s\S]*?)<\/([a-zA-Z0-9_-]+)>/);
          data[match[1]] = match[2].replace(/^\s+|\s+$/g,'');
        });
        return data;
      };
      function toHTML(templateFrame,arr) {
        var out = [];
        $.each(arr,function (i,k) {
          out.push(template(templateFrame).fill(k));
        });
        return out.join('');
      };
      function convert(text) {
        var templateFrame = text.match(/<template>([\s\S]*?)<\/template>/)[1];
        var data = text.match(/<data>[\s\S]*?<\/data>/g);
        var arr = [];
        $.each(data,function (a,b) {
          arr.push(toObject(b,a));
        });
        return toHTML(templateFrame,arr);
      };
      function init() {
        $('<div/>').load(templateFile,function (text,k) {
          var result = convert(text);
          context.append(result);
          if (typeof callback === 'function') {
            callback(result);
          }
        });
      }
      if (context.size() > 0) {
        init();
      }
    },
    get: function (object) {
      function convert(string) {
        if (nullBool(string.match(/\\/))) {
          return string.replace(/\\/,'');
        } else {
          return (object.hasOwnProperty(string))?object[string]:'';
        }
      }

      function condition(string) {
        var variable, alternate;
        var match = string.match(/\{\{([a-zA-Z0-9_-]+)\?([\S\s]*?)}}/);
        if (nullBool(match)) {
          variable  = convert(match[1]);
          alternate = convert(match[2]);
          if (variable.length > 0) {
            return variable;
          } else {
            return alternate;
          }
        } else {
          return string;
        }
      }

      function fill(string) {
        var match = string.match(/(?:\{\{)([a-zA-Z0-9_-]+)(?:\}\})/);
        if (nullBool(match)) {
          string = convert($.trim(match[1]));
        }
        return string;
      }

      function pass(processed) {
        processed = $(processed);
        // Pass to the template function
        if (typeof template_fn[context] === 'function') {
          template_fn[context](object,processed);
        }
        dingo.bind(processed);
        return processed;
      }

      function init() {
        if (typeof context === 'string') {
          return pass(
            context.replace(/\{\{[\?\\a-zA-Z0-9_-]+\}\}/g,function (m) {
              m = condition(m);
              m = fill(m);
              return m;
            })
          );
        } else {
          return context;
        }
      }

      return init();
    },
    init: function (callback) {
      function getData(string) {
        var contents = string.match(/^(\s+|)[a-zA-Z0-9_-]+(\s+|):(\s+|)([\s\S]*?$)/gm);
        var out = {};
        if (contents !== null) {
          $.each(contents,function (i,k) {
            if ($.trim(k).length > 0) {
              var match = k.match(/([a-zA-Z0-9_-]+)(?:\s+|):(?:\s+|)([^}]*)/);
              out[match[1]] = $.trim(match[2]);
            }
          });
        }
        return out;
      };
      function scan(string,file) {
        var temp = string.match(/<template name="[a-zA-Z0-9_-]+">[\s\S]*?<\/template>/g);
        var out = {};
        if (temp) {
          $.each(temp,function (i,k) {
            var match   = k.match(/<template name="([a-zA-Z0-9_-]+)">([\s\S]*?)<\/template>/);
            var name    = $.trim(match[1]);
            var content = match[2];
            template_store[name] = {
              file: file,
              content: content
            }
          });
        }
        return false;
      }

      function load(callback) {
        var arr = [];
        $('link[rel="template"]').each(function () {
          arr.push($.trim($(this).attr('href')));
        });
        function loadIt(i) {
          $('<div/>').load(arr[i],function (a,b) {
            scan(a,arr[i]);
            if (i+1 === arr.length) {
              callback();
            } else {
              loadIt(i+1);
            }
          });
        }
        loadIt(0);
      }

      /* Initializing the loading of the template */

      load(function () {
        function append(object) {
          var processed = template(object.which).get(object.data);
          if (typeof processed === 'object') {
            object.el.replaceWith(processed);
          }
        }
        $('[data-template]').each(function () {
          var el     = $(this);
          var out    = {
            el    : el,
            which : el.attr('data-template'),
            data  : getData(el.html())
          }
          append(out);
        });
        if (typeof callback === 'function') {
          callback();
        }
      });
    } // Function init();
  }
};

template_fn.header = function (object,processed) {
  processed.find('[data-nav="' + object['active-page'] + '"]').addClass('_active');
}

/* ------------- Animate v1.1.6 */
// MIT License
// Original Code by Sean MacIsaac

function animate(el) {
  return {
    getCssProperty: function (property) {
      var arr     = ['','ms','webkit','Moz','O'];
      var style   = window.getComputedStyle(el[0]);
      var r;
      function capitalize(str) {
        return str[0].toUpperCase()+str.substr(1,str.length-1);
      }
      if (style !== null) {
        for (var i=0;i < arr.length;i++) {
          if (arr[i].length < 1) {
            r = property;
          } else {
            r = arr[i]+capitalize(property);
          }
          if (typeof style[r] === 'string') {
            return style[r];
          }
        }
      }
      return false;
    },
    getTime: function () {
      var obj = {
        duration : 0,
        delay    : 0
      };
      // For IE 8
      if (typeof window.getComputedStyle === 'function') {
        obj.duration  = animate(el).jsTime(animate(el).getCssProperty('transitionDuration'));
        obj.delay     = animate(el).jsTime(animate(el).getCssProperty('transitionDelay'));

        if (obj.delay === 0 && obj.duration === 0) {
          obj.duration  = animate(el).jsTime(animate(el).getCssProperty('animationDuration'));
          obj.delay     = animate(el).jsTime(animate(el).getCssProperty('animationDelay'));
        }
      }
      return obj;
    },
    jsTime: function (style) {
      if (style) {
        return parseFloat(style.match(/([0-9]+(\.[0-9]+|))s/)[1])*1000;
      } else {
        return 0;
      }
    },
    start: function (callback) {
      return animate(el).init('in',callback);
    },
    end: function (callback) {
      return animate(el).init('out',callback);
    },
    custom: function (name,callback) {
      el.addClass(name);
      var time = animate(el).getTime();
      setTimeout(function () {
        el.removeClass(name);
        if (typeof callback === 'function') {
          callback(el);
        }
      },time.duration+time.delay);
      return el;
    },
    customToggle: function (string) {
      if (el.hasClass(string)) {
        animate(el).end(function () {
          el.removeClass(string);
        });
      } else {
        animate(el).start().addClass(string);
      }
    },
    toggle: function () {
      if (el.hasClass('_animated-in')) {
        animate(el).end();
      } else {
        animate(el).start();
      }
    },
    classSwitch: function (arr) {
      el.removeClass('_animated-'+arr[1]);
      el.addClass('_animated-'+arr[0]);
      return animate(el);
    },
    ifOut: function (direction,arr,callback) {
      var time = animate(el).getTime();
      setTimeout(function () {
        if (direction === 'out') {
          el.removeClass('_animated-'+arr[0]);
        }
        if (typeof callback === 'function') {
          callback(el);
        }
      },time.duration+time.delay);
      return animate(el);
    },
    init: function (direction,callback) {
      if (typeof el[0] === 'undefined') {
        return false;
      } else {
        var arr = (direction === 'out')?['out','in']:['in','out'];
        function exe() {
          animate(el).classSwitch(arr).ifOut(direction,arr,callback);
        }
        if (direction === 'in') {
          exe();
        } else if (direction === 'out' && el.hasClass('_animated-in')) {
          exe();
        }
        return el;
      }
    },
    scroll: function () {
      function init() {
        var time   = 300;
        var pos    = (el.offset().top-(el.outerHeight()/2))-($(window).height()/2);
        var start  = window.pageYOffset;
        var i      = 1;
        var frames = 300;
        var timer  = '';

        function ceiling (a,b) {
          if (a > b) {
            return b;
          } else {
            return a;
          }
        }

        function s() {
          i = ceiling((i+1)*i,frames);
          window.scrollTo(0,(start-((start/frames)*i))+((pos/frames)*i));
          if (i<frames) {
            timer = setTimeout(function () {
              s();
            },(time/frames));
          } else {
            clearTimeout(timer);
          }
        };
        s();
      } /* init */

      if (el.size()) {
        init();
      }
    }
  }
};

/*
  Form Validate Version 1.0.3
  MIT License
  by Sean MacIsaac
*/

function formValidate(el) {
  var form = el.closest('.form-validate-container');
  if (typeof el[0] !== 'undefined' && el[0].tagName.toLowerCase() === 'form') {
    form = el;
  } else {
    var baseName = (el.attr('name'))?el.attr('name').replace(/^confirm-/g,''):'';
    var base     = form.find('[name="' + baseName + '"]');
    var confirm  = form.find('[name="confirm-' + baseName + '"]');
  }

  function camelCase(string) {
    string = string||'';
    string = string.replace(/\(|\)/,'').split(/-|\s/);
    var out = [];
    for (var i = 0;i<string.length;i++) {
      if (i<1) {
        out.push(string[i].toLowerCase());
      } else {
        out.push(string[i][0].toUpperCase() + string[i].substr(1,string[i].length).toLowerCase());
      }
    }
    return out.join('');
  }

  function nullBool(value) {
    if (value) {
      return true;
    } else {
      return false;
    }
  }

  return {
    captcha: function () {
      // Returns a random number between min and max
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
      function getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min);
      }
      var captcha = [{
        question: 'Is the sun hot or cold?',
        answer: 'hot'
      },{
        question: 'What is 2+2?',
        answer: '4'
      },{
        question: 'What is 2+3?',
        answer: '5'
      },{
        question: 'What is the missing letter: B-wling?',
        answer: 'o'
      },{
        question: 'What is the name of our planet?',
        answer: 'Earth'
      }][getRandomArbitrary(0,4)];

      el.each(function () {
        $(this).find('#form-validate-question').html(captcha.question);
        $(this).find('[data-form-validate-question]').attr('data-form-validate-question',captcha.answer);
      });
    },
    confirm: function (condition) {

      function region() {
        return form.attr('data-region')||'United States of America';
      }

      function convert (el) {
        var attr = camelCase(el.attr('name')).toLowerCase();
        var tag  = (el.attr('type') === 'checkbox') ? 'checkbox' : el[0].tagName.toLowerCase();
        if (tag === 'input' || tag === 'textarea') {
          if (attr.match(/^zip(code|)$/)) {
            return 'zipCode';
          } else if (attr.match(/^zippostal$/)) {
            return 'zipPostal';
          } else if (attr.match(/^(confirm|)(new|old|current|)password$/)) {
            return 'password'
          } else if (attr.match(/^(confirm|)([a-zA-Z0-9_-]+|)email$/)) {
            return 'email';
          } else if (attr.match(/^(confirm|)([a-zA-Z0-9_-]+|)(phone)(number|)$/)) {
            return 'phone';
          } else if (attr.match(/^merchantid$/)) {
            return 'merchantId';
          } else if (attr.match(/^marketplaceid$/)) {
            return 'marketplaceId';
          } else if (attr.match(/number/)) {
            return 'number';
          } else if (attr.match(/^(captcha|form-validate-question)$/)) {
            return 'captcha';
          } else {
            return 'text';
          }
        } else {
          return tag;
        }
      }

      function rules (el) {
        var string = el.val()||'';
        return {
          captcha: function () {
            return (string.replace(/^\s+|\s+$/g,'').toLowerCase() === el.attr('data-form-validate-question').toLowerCase());
          },
          text: function () {
            return (string.length > 0);
          },
          password: function () {
            return (string.length > 6 && nullBool(string.match(/^[\!\@\#\$\%\^\&\*\(\)a-zA-Z0-9_-]+$/)));
          },
          zipCode: function () {
            return (nullBool(string.match(/^[0-9]{5}$/)));
          },
          zipPostal: function () {
            return (nullBool(string.match(/^([0-9]{5}|[a-zA-Z][0-9][a-zA-Z](\s|)[0-9][a-zA-Z][0-9])$/)));
          },
          email: function () {
            return (nullBool(string.match(/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.([a-z]{2}|[a-z]{3})/)));
          },
          merchantId: function () {
            var match = string.match(/^[A-Z0-9]+$/);
            return ((match) && (match[0].length > 9 && match[0].length < 22));
          },
          marketplaceId: function () {
            var match  = string.match(/^[A-Z0-9]+$/);
            var length = {'United States of America':13}[region()];
            return ((match) && (match[0].length === length));
          },
          select: function () {
            return (el[0].selectedIndex > 0);
          },
          checkbox: function () {
            return el[0].checked;
          },
          phone: function () {
            return (nullBool(string.replace(/\s|\(|\)|\-/g,'').match(/^([0-9]{7}|[0-9]{10})$/)));
          },
          number: function () {
            return nullBool(string.match(/^[0-9\.\,]+$/));
          }
        }
      }; // Rules

      function fullfill(el,bool) {

        function getGroup(el) {
          return {
            label: $('[for="' + el.attr('name') + '"]'),
            prompt: el.closest('.form-validate-group').find('.form-validate-prompt')
          }
        }

        function isValid(el) {
          var group = getGroup(el);
          el.removeClass('form-validate');
          group.label.addClass('_fulfilled');
          animate(group.prompt).end();
        }

        function isInvalid(el) {
          var group = getGroup(el);
          el.addClass('form-validate');
          group.label.removeClass('_fulfilled');
        }

        function clear(el) {
          if (el.size()) {
            var group = getGroup(el);
            el.removeClass('form-validate');
            group.label.removeClass('_fulfilled');
          }
        }

        function standard(el) {
          if (bool) {
            isValid(el);
          } else {
            isInvalid(el);
          }
        }

        /* Conditional on validating if there's content in it */

        if (nullBool(el.attr('data-dingo').match(/form-validate{condition:active}/))) {
          if (el[0] === base[0]) {
            /* Clear validation if the form is empty */
            if (el.val().length < 1) {
              clear(base);
              clear(confirm);
            } else {
              standard(el);
            }
          } else if (el[0] === confirm[0]) {
            if (base.val().length > 0) {
              standard(el);
            } else {
              clear(base);
              clear(confirm);
            }
          }
        } else {
          /* if it's not a conditional form validation perform standard functions */
          standard(el);
        }

      };
      // Confirmation field check, checks is first condition is truthy then
      // checks if the fields are mirrors

      // Make sure that base & confirm satisfies rules

      fullfill(base,rules(base)[convert(base)]());

      if (confirm.size() > 0) {
        fullfill(confirm,(rules(confirm)[convert(base)]() && base.val() === confirm.val()));
      }
    },
    init: function (base, confirm) {
      if (el.size() > 0) {
        parameters.bool = bool;
        formValidate(el).fufilled();
        return formValidate(el);
      } else {
        return false;
      }
    },
    is: function () {
      return (form.find('.form-validate').size() < 1);
    },
    check: function () {
      var el;
      form.find('[data-dingo*="form-validate"]').each(function () {
        el = $(this);
        if (!nullBool(el.attr('data-dingo').match(/form-validate-submit/)) && !nullBool(el.attr('data-dingo').match(/form-validate{condition:active}/))) {
          formValidate(el).confirm();
        }
      });
      return form.find('.form-validate');
    },
    submit: function (event) {
      var requiredField = formValidate(form).check();
      var prompt;
      if (requiredField.size() > 0) {
        event.preventDefault();
        requiredField.each(function () {
          prompt = $(this).closest('.form-validate-group').find('.form-validate-prompt');
          prompt.addClass('form-validate-prompt_is-active');
          animate(prompt).start();
        });
        if (requiredField.eq(0).closest('[class*="modal"]').size() < 1) {
          animate(requiredField.eq(0)).scroll();
        }
      }
    },
    clear: function (event) {
      var requiredField = form.find('input,textarea');
      var prompt;
      requiredField.each(function () {
        prompt = $(this).closest('.form-validate-group').find('.form-validate-prompt');
        prompt.removeClass('form-validate-prompt_is-active').removeClass('is-animated_in');
        $(this).val('');
      });
    }
  }
};

/* A function that automatically fills the select element with the correct age range */

function childrenAges() {
  function convert() {
    var arr = $('[data-age-range]').attr('data-age-range').split(',').sort();
    return [parseInt(arr[0]),parseInt(arr[1])];
  }
  function createRange(range) {
    var year  = new Date().getFullYear();
    var arr = [];
    for (var i=0;i<=(range[0]-range[1]);i++) {
      arr.push((year-range[0]+i).toString());
    }
    return arr.reverse();
  }
  function init(bool) {
    if (bool) {
      selectFillData['child-years'] = createRange(convert());
    }
  }
  init(($('[data-age-range]').size()));
}

/* A function that takes an object and converts into a select element with options */

function selectFill() {
  var select = $('select');
  var html;
  function fill(el,target) {
    html = [];
    for (k in selectFillData[target]) {
      if (typeof selectFillData[target][k] === 'object') {
        html.push('<optgroup label="' + k + '">\n');
        $.each(selectFillData[target][k],function (i,j) {
          html.push('\t<option value="' + j.toLowerCase() + '">' + j + '</option>\n');
        });
        html.push('</optgroup>\n');
      } else {
        html.push('\t<option value="' + selectFillData[target][k].toLowerCase() + '">' + selectFillData[target][k] + '</option>\n');
      }
    }
    el.append(html.join(''));
  }
  select.each(function () {
    if (typeof $(this).attr('data-fill') === 'string') {
      fill($(this),$(this).attr('data-fill'));
    }
  });
};

/*
  Carousel v1.1
  Sean MacIsaac
  MIT License
*/

function carousel(el) {
  el = $(el);
  var container = el.find('.carousel-item-container');
  var items     = el.find('.carousel-item');
  var index     = items.filter('._animated-in').index();
  var nav       = el.find('.carousel-nav');
  var navItem   = '<div class="carousel-nav-item" data-dingo="carouselNav"><div class="carousel-nav-item_face"></div></div>';
  return {
    select: function (newIndex) {
      if (newIndex > items.size()-1) {
        newIndex = 0;
      } else if (newIndex < 0) {
        newIndex = items.size()-1;
      }
      var activePill = nav.find('._animated-in');
      var newPill    = nav.find('[data-dingo*="carouselNav"]').eq(newIndex);
      if (index > -1) {
        animate(items.eq(index)).end()
        animate(items.eq(newIndex)).start();
      } else {
        animate(items.eq(newIndex)).start();
      }
      animate(activePill).end();
      animate(newPill).start();
    },
    next: function () {
      carousel(el).select(index+1);
    },
    prev: function () {
      carousel(el).select(index-1);
    },
    init: function () {
      container.css('width',(items.size()*100) + '%');
      items.css('width',(100/items.size()) + '%');
      nav.append((new Array(items.size()+1)).join(navItem));
      animate(nav.find('.carousel-nav-item').eq(0)).start();
      animate(items.eq(0)).start();
      dingo.on(nav.find('[data-dingo]'));
    }
  }
};

function sticky() {
  var scroll   = $(window).scrollTop();
  var sticky   = '_is-sticky';
  var stickyEl = $('.sticky');

  function get(el) {
    var top    = el.offset().top;
    var bottom = top+el.outerHeight();

    function result(attr,pos) {
      if (typeof el.attr(attr) === 'string') {
        return parseInt(el.attr(attr),10);
      } else {
        el.attr(attr,pos);
        return parseInt(pos,10);
      }
    }

    return {
      top: result('data-sticky-top',top),
      bottom: result('data-sticky-bottom',bottom)
    }
  }

  function stick(el) {
    var top    = get(el).top;
    var bottom = get(el).bottom;
    if (scroll > top && !el.hasClass(sticky)) {
      $(el).addClass(sticky);
    } else if (scroll < bottom && $(el).hasClass(sticky)) {
      $(el).removeClass(sticky);
    }
  }

  function init() {
    $(stickyEl).each(function () {
      stick($(this));
    });
  }

  if (!dingo.isMobile()) {
    init();
  }
}

function fixHeader() {
  var top = $(window).scrollTop();
  var body = $('body');
  if (top > 44) {
    body.addClass('_header-fixed');
  } else {
    body.removeClass('_header-fixed');
  }
}

/* Expanders */

function expander(el) {
  return {
    toggle: function () {
      var expander = el.closest('.expander');
      var section  = expander.find('.expander_section').eq(0);
      var btn      = expander.find('.expander_btn').eq(0);
      expander.toggleClass('_active');
      section.toggleClass('_active')
      btn.toggleClass('_active');
    }
  };
};

var dingoEvents = {
  closePopouts: function (options) {
    var active = $('._popout._animated-in');
    var target = $(options.event.target);
    if (active.size() && $('body').hasClass('_popout-safe')) {
      animate(active).end();
      $('body').removeClass('_popout-safe')
    } else {
      $('body').addClass('_popout-safe')
    }
    if (target.closest('.header_nav').size() < 1 && target.closest('.header_nav_control').size() < 1) {
      $('#app-container').removeClass('_nav-open');
    }
  },
  'form-validate_keyup': function (options) {
    var condition = options.condition||'';
    formValidate(options.el).confirm(condition);
  },
  'form-validate_click': function (options) {
    if (options.el.attr('type') === 'checkbox') {
      formValidate(options.el).confirm(options.el.attr('type'));
    }
  },
  'form-validate_change': function (options) {
    if (options.el[0].tagName === 'SELECT') {
      formValidate(options.el).confirm(options.el[0].tagName.toLowerCase());
    }
  },
  'form-validate-submit': function (options) {
    formValidate(options.el.closest('.form-validate-container')).submit(options.event);
  },
  generateSearchLink: function (options) {
    /* Generates the search link to the search page when a selection is made */
    var text = 'search.html#' + options.el[0].value.replace(/\s/g,'-');
    $('#search-link').attr('href',text);
  },
  searchSelect: function (options) {
    var selected = $('#' + options.el[0].value.replace(/\s/g,'-'));
    animate(selected).scroll();
  },
  carouselPrev: function (options) {
    carousel(options.el.closest('.carousel')).prev();
  },
  carouselNext: function (options) {
    carousel(options.el.closest('.carousel')).next();
  },
  carouselNav: function (options) {
    carousel(options.el.closest('.carousel')).select(options.el.index());
  },
  expander: function (options) {
    expander(options.el).toggle();
  },
  text: function (options) {
    var limit = parseInt(options.limit,10);
    options.el.val(options.el.val().substr(0,limit));
    $('[data-limit="' + options.el.attr('name') + '"]').html(limit - options.el.val().length)
  },
  help: function (options) {
    animate(options.el).start();
  },
  'header_nav_control': function (options) {
    $('#app-container').toggleClass('_nav-open');
    options.event.preventDefault();
  }
};

// Click

dingo.click['closePopouts'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.click['form-validate'] = function (options) {
  dingoEvents[options.dingo+'_click'](options);
}
dingo.click['form-validate-submit'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.click['carouselNext'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.click['carouselPrev'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.click['carouselNav'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.click['expander'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.click['help'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.click['header_nav_control'] = function (options) {
  dingoEvents[options.dingo](options);
}

// Touchstart

dingo.touchstart['form-validate'] = function (options) {
  dingoEvents[options.dingo + '_click'](options);
}
dingo.touchstart['form-validate-submit'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.touchstart['carouselNext'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.touchstart['carouselPrev'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.touchstart['carouselNav'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.touchstart['expander'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.touchstart['help'] = function (options) {
  dingoEvents[options.dingo](options);
}
dingo.touchstart['header_nav_control'] = function (options) {
  dingoEvents[options.dingo](options);
}

// Touchend

dingo.touchstart['closePopouts'] = function (options) {
  dingoEvents[options.dingo](options);
}

// Touchmove

dingo.touchmove['closePopouts'] = function (options) {
  fixHeader();
}

// Change

dingo.change['form-validate'] = function (options) {
  dingoEvents[options.dingo + '_change'](options);
}

dingo.change['generateSearchLink'] = function (options) {
  dingoEvents[options.dingo](options);
}

dingo.change['searchSelect'] = function (options) {
  dingoEvents[options.dingo](options);
}

// Keyup

dingo.keyup['form-validate'] = function (options) {
  dingoEvents[options.dingo + '_keyup'](options);
}

dingo.keyup['text'] = function (options) {
  dingoEvents[options.dingo](options);
}

// Scroll

dingo.scroll = {
  window: function (event) {
    sticky(event);
  }
};

$(function () {
  dingo.init();
  template().init(function () {
    sticky();
    childrenAges();
    selectFill();
    carousel('.carousel').init();
    $('textarea,input').placeholder();
    formValidate($('form')).captcha();
  });
});