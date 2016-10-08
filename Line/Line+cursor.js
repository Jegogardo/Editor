class Line{

    get isSelected(){return this._isSelected;}
    set isSelected( value ){
        if( typeof value != "boolean")
            throw new Error("Invalid value, must be a boolean");

        // To add event onselected line

        this._isSelected = value;

        // if true add class, otherwise remove it
        if( this._isSelected )
            classie.add( this.$, 'line-selected' );
        else
            classie.remove( this.$, 'line-selected' );

        this.cursor.isShowed = this._isSelected;

        return this._isSelected;
    }


    // Restituisce il contenuto della linea
    get write(){ return this.$.content.textContent;}
    // Scrive nella linea
    set write( str ){
        this.cursor.stopBlinking = true;


        this.$.content.textContent = str;
        this.cursor.write = str;


        this.cursor.stopBlinking = false;

        return this.$.content.textContent;
    }


    // Inizializza le proprietà
    constructor(){

        //Property
        this._isSelected = false;
        this.cursor = new Cursor();

        this.init();
        this.write="content";

        //Event Handling



        // this.$.addEventListener("mouseenter", _=>{ this.isSelected = true });
        //this.$.addEventListener("mouseleave", _=>{ this.isSelected = false });
    }

    // Crea l'elemento HTML
    init(){

        let $ = {};

        $ = newEl("div,,line");
        ;;;;$.content = newEl("p,,line_content",$);
        ;;;;$.cursor = this.cursor.$;


        $.appendChild($.cursor)        


        this.__proto__.$ = $;
        this.$[this.constructor.name] = this;
    }

    show(){}
    hide(){}
    open(){}
    close(){}
    select( value = true ){
        if( typeof value != "boolean")
            throw new Error("Invalid value, must be a boolean");

        this.isSelected = value;
    }


}

class Cursor{

    get isShowed(){return this._isShowed;}
    set isShowed( value ){
        if( typeof value != "boolean")
            throw new Error("Invalid value, must be a boolean");

        this._isShowed = value
        if( this._isShowed )
            this.show();
        else
            this.hide();
    }

    get write(){
        return this.$.copy.textContent;
    }

    set write( str ){
        this.$.copy.textContent = str;
    }

    constructor(){
        this.isBlinking = false;
        this.stopBlinking = false;
        this._isShowed = true;
        /*if( typeof CURSOR_ALWAYS_SHOWED != null && CURSOR_ALWAYS_SHOWED ==true)
            this.show();*/

        this.init();

        this.blinkEventHandler = null
    }

    init(){
        let $;

        $=newEl("div,,line_cursor_wrapper");
        ;;;;$.copy = newEl("p,,line_cursor_copy",$);
        ;;;;$.cursor = newEl("span,,line_cursor",$);

        this.__proto__.$ = $;
        this.$[this.constructor.name] = this;
    }
    blink(){
        if( this.stopBlinking )
            return;

        if( this.isBlinking )
            classie.remove(this.$.cursor, "line_cursor-blink");
        else
            classie.add(this.$.cursor, "line_cursor-blink");

        this.isBlinking = !this.isBlinking;
    }
    show(){
        classie.remove(this.$.cursor, "line_cursor-blink");
        if( this.blinkEventHandler == null )
            this.blinkEventHandler = setInterval(this.blink.bind(this),600);
    }
    hide(){
        classie.add(this.$.cursor, "line_cursor-blink");
        clearInterval(this.blinkEventHandler);
        this.blinkEventHandler = null;
    }

    left(){
        if( this.$.textContent.length != 0 ){
            this.show();
            this.write = this.write.substring(0, this.write.length-1);

        }

    }

    right(str){
        if( str.length != this.write.length && str.length > 0 ){
            this.show();
            this.write += str.substring(this.write.length,this.write.length+1)



        }
    }

    space(){
        this.$.copy.innerHTML+="&nbsp;"
        
    }
    tab(){
        this.$.copy.innerHTML+="&#09;"
    }

}

var lines = [];
var lastLine = new Line();
var selectedLine = lastLine;
selectedLine.write=lines.length+1
selectedLine.isSelected = true;
lines.push(lastLine);
document.body.appendChild( selectedLine.$ );

document.addEventListener("keydown",(e)=>{
    switch( e.which ){
        case 13:{   //Enter → carriage return
            selectedLine.isSelected = false;
            let line = new Line();
            selectedLine = line;
            selectedLine.write=lines.length+1;
            selectedLine.isSelected = true;
            lines.push(line);
            document.body.appendChild( selectedLine.$ );
            break;}
        case 8:{ // Backspace
            e.preventDefault();
            selectedLine.write =
                selectedLine.write.substring(
                0, selectedLine.write.length-1)

            selectedLine.cursor.left();
            break;
        }

        case 32:{ // Space ' '
            e.preventDefault();
            //this.text.textContent += " ";
            //  cursor.right(this.text.textContent);
            selectedLine.cursor.space();
            selectedLine.write+=" ";
            break;
        }
        case 38:{ // ArrowUp ↑

            break;
        }
        case 40:{ // ArrowDown ↓
            break;
        }
        case 39:{ 
            selectedLine.cursor.right(
                selectedLine.write); // ArrowRight →
            break;}
        case 37:{ 
            selectedLine.cursor.left(); // ArrowLeft ←
            break;
        }
        default:{
            if( (e.keyCode >= 48 && e.keyCode <= 90) ||
               (e.keyCode >= 96 && e.keyCode <= 111)
              ){
                selectedLine.write += e.key;
                //this.text.textContent+=e.key
                selectedLine.cursor.right(
                    selectedLine.write);
            }
            //this.selectedSheet.Append(e.key);

        }
    }
 /*   console.clear();
    console.log(`Simbolo: '${e.key}'\nCodice ${e.which}\nCTRLKey: ${e.ctrlKey}\nShiftKey: '${e.shiftKey}'`);
    console.dir(e)*/
})