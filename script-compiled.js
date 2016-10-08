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

        this.sheets = [];
        this.selectedSheet = null;

        //this.text.textContent="provaprova";


        this.newSheet().select();

        this.el[this.constructor.name] = this;

        //this.el.addEventListener("focus",this.focus)
        //this.focus();
        //this.el.addEventListener("blur",this.blur)

        this.open();
    }

    _createClass(Editor, [{
        key: "newSheet",
        value: function newSheet() {
            var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var newSheet = new Sheet(data.name || "Sheet" + this.sheets.length, data);

            this.initSheet(newSheet);

            newSheet.open();

            this.sheets.push(newSheet);
            return newSheet;
        }
    }, {
        key: "selectSheet",
        value: function selectSheet(sheetToSelect) {
            // Deseleziono l'attuale sheet, se presente, e seleziono quello scelto.
            // Selezionare significa colorare il div del titolo del foglio e mostrare quest'ultimo

            if (this.selectedSheet != null) {
                this.selectedSheet.isSelected = false;
            }
            this.selectedSheet = sheetToSelect;
            sheetToSelect.isSelected = true;

            return sheetToSelect;
        }
    }, {
        key: "initSheet",
        value: function initSheet(page) {
            page.select = this.selectSheet.bind(this, page);
        }
    }, {
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
        key: "newline",
        value: function newline() {}
    }, {
        key: "focus",
        value: function focus() {
            var _this = this;

            this.el.focus();
            //this.Editor.isFocused = true;
            this.focusHandler = document.addEventListener("keydown", function (e) {
                //if( this.Editor.isFocused ){
<<<<<<< HEAD
                if (typeof EDITOR_STOP_LISTENING_EVENTS != null && EDITOR_STOP_LISTENING_EVENTS != true) {
                    switch (e.which) {
                        case 13:
                            {
                                //Enter

                                break;
                            }
                        case 8:
                            {
                                // Backspace
                                e.preventDefault();
                                _this.text.textContent = _this.text.textContent.substring(0, _this.text.textContent.length - 1);
                                cursor.left();
                                break;
                            }

                        case 32:
                            {
                                // Space ' '
                                e.preventDefault();
                                //this.text.textContent += " ";
                                //  cursor.right(this.text.textContent);
                                cursor.space();
                                _this.text.textContent += " ";
                                break;
                            }
                        case 38:
                            {
                                // ArrowUp ↑

                                break;
                            }
                        case 40:
                            {
                                // ArrowDown ↓
                                break;
                            }
                        case 39:
                            {
                                cursor.right(_this.text.textContent); // ArrowRight →
                                break;
                            }
                        case 37:
                            {
                                cursor.left(); // ArrowLeft ←
                                break;
                            }
                        default:
                            {
                                if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode >= 96 && e.keyCode <= 111) {
                                    _this.text.textContent += e.key;
                                    cursor.right(_this.text.textContent);
                                }
                                //this.selectedSheet.Append(e.key);
                            }
                    }
                }
                if (typeof EDITOR_LOG_KEYBOARD != null && EDITOR_LOG_KEYBOARD == true) {
                    if (typeof EDITOR_LOG_CLEAN_KEYBOARD != null && EDITOR_LOG_CLEAN_KEYBOARD == true) console.clear();
                    console.log("Simbolo: '" + e.key + "'\nCodice " + e.which + "\nCTRLKey: " + e.ctrlKey + "\nShiftKey: '" + e.shiftKey + "'");
                    console.dir(e);
=======
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
<<<<<<< HEAD
>>>>>>> parent of 1df1e1e... Added space and alphanumeric key
=======
>>>>>>> parent of 1df1e1e... Added space and alphanumeric key
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
<<<<<<< HEAD
<<<<<<< HEAD
        key: "space",
        value: function space() {
            this.copy.innerHTML += "&nbsp;";
        }
    }, {
=======
>>>>>>> parent of 1df1e1e... Added space and alphanumeric key
=======
>>>>>>> parent of 1df1e1e... Added space and alphanumeric key
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

var Sheet = function () {
    _createClass(Sheet, [{
        key: "isSelected",
        get: function get() {
            return this._isSelected;
        },
        set: function set(value) {
            this._isSelected = value;

            if (typeof SHEET_LOG_ONCREATE != null && SHEET_LOG_ONCREATE == true) {
                console.info(this.name + " has been created");
            }

            if (typeof SHEET_LOG_ONSELECT != null && SHEET_LOG_ONSELECT == true) {
                console.info(this.name + " has been selected");
            }
        }
    }]);

    function Sheet() {
        var name = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, Sheet);

        if (name) {
            this.name = name;
            this.lines = [];

            if (data.length != 0) this.fetchInfo(data);
        } else {
            console.error("--- Need a name for a sheet");
        }

        this.init();
    }

    _createClass(Sheet, [{
        key: "newline",
        value: function newline() {
            var newLine = newEl("p,,line");
            this.selectedLine = newLine;
            this.lines.push(newLine);
        }
    }, {
        key: "init",
        value: function init() {
            this._isSelected = false;
            this._isFocused = false;
            this.cursor = new Cursor();

            var el = {};

            // Init della struttura
            // <header>
            el.header = newEl("div,,sheet_header");
            ;;;;el.headerContent = newEl("span,, sheet_header_content", el.titleWrapper);
            ;;;;el.headerContent = newEl("button,, sheet_header_close", el.titleWrapper);
            // </header>

            // <body>
            el.body = newEl("div,,sheet_view");
            el.body.appendChild(this.cursor.wrapper);
            // </body>


            // Popola la struttura
            el.headerContent.textContent = this.name;

            this.__proto__.el = el;
        }
    }, {
        key: "fetchInfo",
        value: function fetchInfo(data) {
            // this.constructor.prototype.data = data;
        }
    }, {
        key: "open",
        value: function open() {}
    }, {
        key: "close",
        value: function close() {}
    }, {
        key: "show",
        value: function show() {
            // add title class and body of file too
        }
    }, {
        key: "hide",
        value: function hide() {
            // remove title class and body of file too
        }
    }]);

    return Sheet;
}();

/*
    --- Possibile interface di un file
    file{
        name: 'Sheet0',
        filename: 'Sheet0.txt',
        extension: '.txt',
        path: '/public_html/file/Sheet0.txt',
        parentDir: '/public_html/file/',
        lastModified: 1475337851,
            //lastModified: '01/10/2016 18:00',
        createDate: 1473958220 ,
            //createDate: '15/09/2016  16:54',
        content: -- a string in UTF-8 --
    }
*/
