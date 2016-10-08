const EDITOR_ID = "editor";
const CURSOR_CLASS = "cursor";
const CURSOR_BLINKED_CLASS = "cursor--blink";
const CURSOR_BLINK_DEFAULT_TIME = 600;

class Editor{

    constructor( el = null ){


        //this.el = el || newEl(`div,${EDITOR_ID}`);

        //this.text = newEl("p,,scrivi",this.el)
        this.isFocused = false;

        this.sheets = [];
        this.selectedSheet = null;


        //this.text.textContent="provaprova";







        //this.el.addEventListener("focus",this.focus)

        //this.el.addEventListener("blur",this.blur)

        this.init().open();

        this.newSheet().select();
        this.focus();
        //        this.el[this.constructor.name] = this;
    }

    newSheet( data = {} ){
        let newSheet = new Sheet( data.name || `Sheet${this.sheets.length}`, data );

        this.initSheet( newSheet );

        newSheet.open();

        this.sheets.push(newSheet);
        return newSheet;

    }

    selectSheet( sheetToSelect ){
        // Deseleziono l'attuale sheet, se presente, e seleziono quello scelto.
        // Selezionare significa colorare il div del titolo del foglio e mostrare quest'ultimo

        if( this.selectedSheet != null ){
            this.selectedSheet.isSelected = false;
        }
        this.selectedSheet = sheetToSelect;
        sheetToSelect.isSelected = true;

        return sheetToSelect;

    }

    initSheet( page ){
        page.select = this.selectSheet.bind(this, page);
        page.open = function( page ){
            this.el.wrapper.portfolio.appendChild( page.el.body );
        }.bind(this, page);
    }

    init(){
        let el = {};

        el.wrapper = newEl(`editor, ,${EDITOR_ID}_wrapper`);
        ;;;;el.wrapper.header = newEl(`header, , ${EDITOR_ID}_header`,el.wrapper);
        ;;;;el.wrapper.counter = newEl(`counter,, ${EDITOR_ID}_counter`,el.wrapper);
        ;;;;el.wrapper.portfolio = newEl(`body, , ${EDITOR_ID}_body`,el.wrapper);

        this.__proto__.el = el;

        return this;
    }

    open(){
        document.body.appendChild(this.el.wrapper);
    }

    close(){
        this.el.parentElement.removeChild(this.el.wrapper);
    }

    show(){}

    hide(){}

    save(){}

    clear(){
        //this.selectedSheet.clear();
    }

    focus(){
<<<<<<< HEAD
        this.el.wrapper.focus();
        //this.Editor.isFocused = true;
        this.focusHandler = document.addEventListener("keydown",(e)=>{
            //if( this.Editor.isFocused ){
            if( typeof EDITOR_STOP_LISTENING_EVENTS != null && EDITOR_STOP_LISTENING_EVENTS != true){
                switch( e.which ){
                    case 13:{   //Enter
                        this.selectedSheet.newline();
                        break;}
                    case 8:{ // Backspace
                        e.preventDefault();
                        this.selectedSheet.selectedLine.textContent =
                            this.selectedSheet.selectedLine.textContent.substring(
                                0, this.selectedSheet.selectedLine.textContent.length-1)
                        
                        this.selectedSheet.cursor.left();
                        break;
                    }

                    case 32:{ // Space ' '
                        e.preventDefault();
                        //this.text.textContent += " ";
                        //  cursor.right(this.text.textContent);
                        this.selectedSheet.cursor.space();
                        this.selectedSheet.selectedLine.textContent+=" ";
                        break;
                    }
                    case 38:{ // ArrowUp ↑

                        break;
                    }
                    case 40:{ // ArrowDown ↓
                        break;
                    }
                    case 39:{ 
                        this.selectedSheet.cursor.right(
                            this.selectedSheet.selectedLine.textContent); // ArrowRight →
                             break;}
                    case 37:{ 
                        this.selectedSheet.cursor.left(); // ArrowLeft ←
                             break;
                            }
                    default:{
                        if( (e.keyCode >= 48 && e.keyCode <= 90) ||
                           (e.keyCode >= 96 && e.keyCode <= 111)
                          ){
                            this.selectedSheet.selectedLine.textContent += e.key;
                            //this.text.textContent+=e.key
                            this.selectedSheet.cursor.right(
                                this.selectedSheet.selectedLine.textContent);
=======
        //this.Editor.isFocused = true;
        this.focusHandler = document.addEventListener("keydown",(e)=>{
            //if( this.Editor.isFocused ){
            switch( e.which ){
                case 32:{ // Space ' '
                    //this.text.textContent += " ";
                  //  cursor.right(this.text.textContent);
                    cursor.space();
                    break;
                }
                case 38:{ // ArrowUp ↑

                    break;
                }
                case 40:{ // ArrowDown ↓
                    break;
                }
                case 39:{ cursor.right(this.text.textContent); // ArrowRight →
                         break;}
                case 37:{ cursor.left(); // ArrowLeft ←
                         break;
>>>>>>> parent of 1df1e1e... Added space and alphanumeric key
                        }
                default:{
                    if( e.code.startsWith("Key") && !e.metaKey && !e.ctrlKey ){
                        this.text.textContent+=e.key
                        cursor.right(this.text.textContent);
                    }
                    //this.selectedSheet.Append(e.key);

                }
            }
            if( typeof EDITOR_LOG_KEYBOARD != null && EDITOR_LOG_KEYBOARD == true){
                if( typeof EDITOR_LOG_CLEAN_KEYBOARD != null &&  EDITOR_LOG_CLEAN_KEYBOARD == true)
                    console.clear();
                console.log(`Simbolo: '${e.key}'\nCodice ${e.which}\nCTRLKey: ${e.ctrlKey}\nShiftKey: '${e.shiftKey}'`);
                console.dir(e)
            }
            //}
        })
    }

    blur(){
        // this.Editor.isFocused = false;
        // this.blur();
    }

}



class Sheet{

    get isSelected(){ return this._isSelected }

    set isSelected( value ){
        this._isSelected = value;


        if( typeof SHEET_LOG_ONCREATE != null &&
           SHEET_LOG_ONCREATE == true ){
            console.info( `${this.name} has been created` );
        }

        if( typeof SHEET_LOG_ONSELECT != null &&
           SHEET_LOG_ONSELECT == true ){
            console.info( `${this.name} has been selected` );
        }
    }

    get selectedLine(){ return this._selectedLine }

    set selectedLine( line ){
        this._selectedLine = line;
        this.cursor.init( this._selectedLine.textContent )
        return this._selectedLine
    }

    constructor( name = null, data = null ){
        if( name ){
            this.name = name;
            this.lines = [];
            this._selectedLine = null;
            this._isSelected = false;
            this._isFocused = false;
            
            if( data.length != 0 )
                this.fetchInfo( data );
        }
        else{
            console.error("--- Need a name for a sheet");
        }




        this.init();
    }




    init(){

        let el = {}

        // Init della struttura
        // <header>
        el.header = newEl("div,,sheet_header");
        ;;;;el.headerContent = newEl("span,, sheet_header_content", el.titleWrapper);
        ;;;;el.headerContent = newEl("button,, sheet_header_close", el.titleWrapper);
        // </header>

        // <body>
        el.body = newEl("div,,sheet_view");
        el.body.appendChild( this.cursor.wrapper );
        // </body>



        // Popola la struttura
        el.headerContent.textContent = this.name;

        this.__proto__.el = el;

        this.selectedLine = this.newline();
        
    }

    newline(){
        let newline = new Line(this.lines.length+1);
        this.lines.push(newline);
        this.el.body.appendChild(newline.el);
        this.linew
        return newline;
    }

    fetchInfo( data ){
        // this.constructor.prototype.data = data;
    }

    open(){

    }

    close(){

    }

    show(){
        // add title class and body of file too
    }

    hide(){
        // remove title class and body of file too
    }
}


class Line{
    
    // Restituisce il contenuto della linea
    get write(){ return this.el.textContent;}
    // Scrive nella linea
    set write( str ){
        this.el.textContent = str;
        return this.el.textContent;
    }
    
    get isSelected(){ return this._isSelected; }
    
    set isSelected( value ){
        if( typeof value == "boolean" ){
            this._isSelected = value;
        }
        return this._isSelected; }
        
    constructor( str = false ){
        
        this.init();
        
        if( !str )
            this.write = str;
        else
            this.clear();
        
        this._isEmpty = false;
        this._isSelected = false;
        this.cursor = new Cursor();
        
        this.counterWords = 0;
        this.counterLetters = 0;
        this.counterSpaces = 0;
    }
    
    init( index ){               
        this.el = newEl(`p, line_${index} ,scrivi`);
      //  this.el.counter = this.cursor.
    }
    
    
    
    // Pulisci il contenuto. Equivale ad un enter
    clear(){
        this.write = "";
    }
    
}

class Cursor{

    constructor(){
        this.wrapper = newEl(`div,,cursor_wrapper`);
        this.copy = newEl(`p,,cursor_copy`,this.wrapper);
        this.el = newEl(`span, ,${CURSOR_CLASS}`,this.wrapper);

        this.isHidden = false;
        this.isBlinked = false;
        this.stopBlink = false;
        if( typeof CURSOR_ALWAYS_SHOWED != null && CURSOR_ALWAYS_SHOWED ==true)
            this.show();
    }

    init( str ){
        this.copy.textContent = str;

        this.blinkEventHandler = setInterval(this.blink.bind(this),CURSOR_BLINK_DEFAULT_TIME);
    }

    blink(){
        if( typeof CURSOR_STOP_BLINK != "undefined" && CURSOR_STOP_BLINK == true )
            return;
        
        if( this.stopBlink )
            return;

        if( this.isBlinked )
            classie.remove(this.el, CURSOR_BLINKED_CLASS);
        else
            classie.add(this.el, CURSOR_BLINKED_CLASS);

        this.isBlinked = !this.isBlinked;
    }

    show(){
        classie.add( this.el, CURSOR_BLINKED_CLASS );
    }

    hide(){
        classie.remove( this.el, CURSOR_BLINKED_CLASS );
    }

    space(){
        this.copy.textContent += "a";
    }

    left(){
        if( this.copy.textContent.length != 0 ){
            this.show();
            this.copy.textContent = this.copy.textContent.substring(0, this.copy.textContent.length-1);

        }

    }

    right(str){
        if( str.length != this.copy.textContent.length && str.length > 0 ){
            this.show();
            this.copy.textContent += str.substring(this.copy.textContent.length,this.copy.textContent.length+1)
            
            

        }
    }

    down(str){

    }

    up(str){

    }
}

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


