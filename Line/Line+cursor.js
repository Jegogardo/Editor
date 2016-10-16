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
    get text(){ return this.$.content.textContent;}

    // Inizializza le proprietà
    constructor(){

        //Property
        this._isSelected = false;
        this.cursor = new Cursor();

        this.init();
       // this.write("content");

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


        this.$ = $;
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

    // Scrive nella linea
    write( str ){
        this.cursor.stopBlinking = true;


        this.$.content.textContent = this.cursor.columns == this.text.length ?
                                    this.text + str:
                                    this.text.slice(0, this.cursor.columns) + str
                                        + this.text.slice( this.cursor.columns);
        this.cursor.write = this.text;


        this.cursor.stopBlinking = false;

        return this;
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
        return this.$.copy.innerHTML;
    }

    set write( str ){
        str.toString().replace(" ","&nbsp;")
        this.$.copy.innerHTML = str;
        this.columns = str.length;
    }



    constructor(){
        this.isBlinking = false;
        this.stopBlinking = false;
        this._isShowed = true;

        this.columns = 0;

        this.counterWords = 0;
        this.counterLetters = 0;
        this.counterSpaces = 0;
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

        this.$ = $;
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
        if( this.write.length != 0 ){
            this.show();
            this.write = this.write.substring(0, this.write.length-1);
          //  this.columns--;
        }

    }

    right(str){
        if( str.length != this.write.length && str.length > 0 ){
            this.show();
            this.write += str.substring(this.write.length,this.write.length+1);
           // this.columns++;
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
selectedLine.write("provaciaobravo")//lines.length+1
selectedLine.isSelected = true;
lines.push(selectedLine);
document.body.appendChild( selectedLine.$ );

document.addEventListener("keydown",(e)=>{
    switch( e.which ){
        case 13:{   //Enter → carriage return
            lastLine = selectedLine;
            selectedLine.isSelected = false;
            let line = new Line();
            selectedLine = line;
            selectedLine.write(lines.length+1);
            selectedLine.isSelected = true;
            lines.push(line);
            document.body.appendChild( selectedLine.$ );
            break;}
        case 8:{ // Backspace
            e.preventDefault();
            selectedLine.cursor.left();

            selectedLine.write(
                selectedLine.text.substring(
                0, selectedLine.text.length-1))

            break;
        }

        case 32:{ // Space ' '

            e.preventDefault();
            //this.text.textContent += " ";
            //  cursor.right(this.text.textContent);
            selectedLine.cursor.space();
            selectedLine.$.content.textContent+=" ";
            break;
        }
        case 38:{ // ArrowUp ↑
            if( lines.indexOf(selectedLine) == 0 )
                break;

            lastLine = selectedLine.valueOf();
            selectedLine.isSelected = false;
            selectedLine = lines[lines.indexOf(selectedLine)-1];
            selectedLine.isSelected = true;

            if( lastLine.cursor.columns > selectedLine.cursor.columns )
                selectedLine.cursor.columns = selectedLine.cursor.write;
            else
                selectedLine.cursor.columns = lastLine.cursor.columns;


            break;
        }
        case 40:{ // ArrowDown ↓
            if( lines.indexOf(selectedLine) == lines.length-1 )
                break;

            selectedLine.isSelected = false;
            selectedLine = lines[lines.indexOf(selectedLine)+1];
            selectedLine.isSelected = true;

            break;
        }
        case 39:{
            e.preventDefault();
            selectedLine.cursor.right(
                selectedLine.text); // ArrowRight →
            break;}
        case 37:{ 
            e.preventDefault();
            selectedLine.cursor.left(); // ArrowLeft ←
            break;
        }
        default:{
            if( (e.keyCode >= 48 && e.keyCode <= 90) ||  // digit + alphabet
                (e.keyCode >= 96 && e.keyCode <= 111) ||  // numpad + operations
                (e.keyCode >= 186 && e.keyCode <= 192) || // ;=,-./ò'\
                (e.keyCode >= 220 && e.keyCode <= 222) ||
                e.keyCode == 226                          // <
              ){
                selectedLine.write(e.key);
                //this.text.textContent+=e.key
                selectedLine.cursor.right(
                    selectedLine.text);
            }
            //this.selectedSheet.Append(e.key);

        }
    }
   console.clear();
    /*console.log(`Simbolo: '${e.key}'\nCodice ${e.which}\nCTRLKey: ${e.ctrlKey}\nShiftKey: '${e.shiftKey}'`);
    console.dir(e)*/
    console.log(`Line: ${lines.indexOf(selectedLine)+1},${selectedLine.cursor.columns}`)
})


/*
String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
*/
