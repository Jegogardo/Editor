"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EDITOR_ID = "editor";
var CURSOR_CLASS = "cursor";
var CURSOR_BLINKED_CLASS = "cursor--blink";
var CURSOR_BLINK_DEFAULT_TIME = 600;

var Editor = function () {
    function Editor() {
        var el = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        _classCallCheck(this, Editor);

        this.el = el || newEl("div," + EDITOR_ID);
        this.text = newEl("p,,scrivi", this.el);
        this.isFocused = false;

        this.text.textContent = "provaprova";

        this.el[this.constructor.name] = this;

        //this.el.addEventListener("focus",this.focus)
        this.focus();
        //this.el.addEventListener("blur",this.blur)

        this.open();
    }

    _createClass(Editor, [{
        key: "open",
        value: function open() {
            document.body.appendChild(this.el);
        }
    }, {
        key: "close",
        value: function close() {
            this.el.parentElement.removeChild(this.el);
        }
    }, {
        key: "clear",
        value: function clear() {
            //this.selectedSheet.clear();
        }
    }, {
        key: "focus",
        value: function focus() {
            var _this = this;

            //this.Editor.isFocused = true;
            this.focusHandler = document.addEventListener("keydown", function (e) {
                //if( this.Editor.isFocused ){
                switch (e.which) {
                    case 38:
                        {
                            //↑

                            break;
                        }
                    case 40:
                        {
                            // ↓

                            break;
                        }
                    case 39:
                        {
                            cursor.right(_this.text.textContent); // →
                            break;
                        }
                    case 37:
                        {
                            cursor.left(); // ←
                            break;
                        }
                    default:
                        {}
                }
                if (EDITOR_LOG_KEYBOARD) console.log("Simbolo: '" + e.key + "'\nCodice " + e.which + "\nCTRLKey: " + e.ctrlKey + "\nShiftKey: '" + e.shiftKey + "'");
                //}
            });
        }
    }, {
        key: "blur",
        value: function blur() {
            // this.Editor.isFocused = false;
            // this.blur();
        }
    }]);

    return Editor;
}();

var Cursor = function () {
    function Cursor() {
        _classCallCheck(this, Cursor);

        this.wrapper = newEl("div,,cursor_wrapper");
        this.copy = newEl("span,,cursor_copy", this.wrapper);
        this.el = newEl("span, ," + CURSOR_CLASS, this.wrapper);

        this.isHidden = false;
        this.isBlinked = false;
    }

    _createClass(Cursor, [{
        key: "init",
        value: function init(str) {
            this.copy.textContent = str;

            this.blinkEventHandler = setInterval(this.blink.bind(this), CURSOR_BLINK_DEFAULT_TIME);
        }
    }, {
        key: "blink",
        value: function blink() {
            if (typeof CURSOR_STOP_BLINK != "undefined" && CURSOR_STOP_BLINK == true) return;

            if (this.isBlinked) classie.remove(this.el, CURSOR_BLINKED_CLASS);else classie.add(this.el, CURSOR_BLINKED_CLASS);

            this.isBlinked = !this.isBlinked;
        }
    }, {
        key: "show",
        value: function show() {
            classie.add(this.el, CURSOR_BLINKED_CLASS);
        }
    }, {
        key: "hide",
        value: function hide() {
            classie.remove(this.el, CURSOR_BLINKED_CLASS);
        }
    }, {
        key: "left",
        value: function left() {
            if (this.copy.textContent.length != 0) {
                this.show();
                this.copy.textContent = this.copy.textContent.substring(0, this.copy.textContent.length - 1);
            }
        }
    }, {
        key: "right",
        value: function right(str) {
            if (str.length != this.copy.textContent.length && str.length > 0) {
                this.show();
                this.copy.textContent += str.substring(this.copy.textContent.length, this.copy.textContent.length + 1);
            }
        }
    }, {
        key: "down",
        value: function down(str) {}
    }, {
        key: "up",
        value: function up(str) {}
    }]);

    return Cursor;
}();

var Sheet = function Sheet() {
    _classCallCheck(this, Sheet);
};
