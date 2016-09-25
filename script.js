const EDITOR_ID = "editor";
const CURSOR_CLASS = "cursor";
const CURSOR_BLINKED_CLASS = "cursor--blink";
const CURSOR_BLINK_DEFAULT_TIME = 600;

class Editor{

    constructor( el = null ){

        this.el = el || newEl(`div,${EDITOR_ID}`);
        this.text = newEl("p,,scrivi",this.el)
        this.isFocused = false;

        this.text.textContent="provaprova";



        this.el[this.constructor.name] = this;

        //this.el.addEventListener("focus",this.focus)
        this.focus();
        //this.el.addEventListener("blur",this.blur)

        this.open();



    }

    open(){
        document.body.appendChild(this.el);
    }

    close(){
        this.el.parentElement.removeChild(this.el);
    }

    clear(){
        //this.selectedSheet.clear();
    }

    focus(){
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

class Cursor{

    constructor(){
        this.wrapper = newEl(`div,,cursor_wrapper`);
        this.copy = newEl(`p,,cursor_copy`,this.wrapper);
        this.el = newEl(`span, ,${CURSOR_CLASS}`,this.wrapper);

        this.isHidden = false;
        this.isBlinked = false;

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

        if( this.isBlinked )
            classie.remove(this.el, CURSOR_BLINKED_CLASS);
        else
            classie.add(this.el, CURSOR_BLINKED_CLASS);

        this.isBlinked = ! this.isBlinked;
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

class Sheet{

}



