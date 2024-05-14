let isRendered = false;
const label = "🧜‍♀️️"
const version = "ver. 2024 Apr 30"
const storageName = 'mermaidScript'
const storageDate = 'mermaidScriptDate'
const storagePosition = 'mermaidIconPosition'

// target selector which contain mermaid description for chatGPT
const selector = 'code.language-mermaid';

// list up trgets supporting shadowdom (copilot)
function listupTargets(base=document.body) {
    const results = [];

    // query targets element on the Light DOM
    results.push(...base.querySelectorAll(selector));

    // look for targets on the Shadow DOM recursively
    const elems = base.querySelectorAll('*');
    elems.forEach(e => {
        if (e.shadowRoot) {
            results.push(...listupTargets(e.shadowRoot));
        }
    });

    return results;
}


function render() {
    // save original mermaid text
    let targets = listupTargets();
    targets.forEach(code=>{
        code.dataset.original = code.textContent;
    });
    // render (or re-render)
    mermaid.run({nodes: targets, suppressErrors:true});
    isRendered = true;
    console.info(`${label} rendered`)
}

function restore() {
    // remove all svgs
    let targets = listupTargets();
    targets.forEach(code=>{
        code.querySelectorAll('svg').forEach(svg=>{ svg.remove(); })
        // restore original data only if the processed flag is true (this is changed by Mermaid)
        if ( code.dataset.processed ) {
            code.textContent = code.dataset.original;
            delete code.dataset.processed
        }
        code.contentEditable = true;
    });
    isRendered = false;
    console.info(`${label} restored`)
}

function loadScriptFromStorage() {
    let scriptText = localStorage.getItem(storageName);
    let date = new Date(localStorage.getItem(storageDate));

    loadScript(scriptText);
    
    console.info(`${label} script loaded from localStorage.${storageName}, stored on ${date.toISOString()}`);
}

function loadScript(scriptText) {
    // unload mermaid first
    if (window.mermaid) {
        delete window.mermaid;
    }

    const id = 'mermaid-onthefly'

    // remove script tag
    let old = document.head.querySelector('#' + id);
    if ( old ) {
        document.head.removeChild(old);
    }

    // script.src is prohibited by chatGPT's CSP. also, fetch(url) is not allowed.
    const script = document.createElement('script');
    script.id = id;

    script.textContent = scriptText;
    document.head.appendChild(script); // window.mermaid will be available

    // default theme does not match the background color of code pane of ChatGPT
    mermaid.initialize({ theme: 'dark' });
}

function setupDraggable(target, storage) {

    target.draggable = true;
    target.addEventListener("dragstart", ondragstart);

    function restoreInset(storageName) {
        let prev = localStorage.getItem(storageName);
        if (!prev) {
            return null;
        }
        let [top, right, bottom, left] = prev.split(",");
        if ( top !="auto" && top > window.innerHeight ) return null;
        if ( bottom !="auto" && bottom > window.innerHeight ) return null;
        if ( left !="auto" && left > window.innerWidth ) return null;
        if ( right !="auto" && right > window.innerWidth ) return null;

        return [top, right, bottom, left];
    }

    function storeInset(storageName, inset) {
        localStorage.setItem(storageName, inset.join(","));
    }

    // set inset. top_right_bottom_left is array of number or "auto"
    function setInset(target, top_right_bottom_left) {
        let inset = top_right_bottom_left.map((v)=>v==='auto' ? v : v + 'px');
        console.log(inset)
        target.style.inset = inset.join(" ");
    }
    
    // load position from localStorage. default is 50px,20px,auto,auto
    let startInset = restoreInset() || [50, 20, "auto", "auto"];
    //console.info(`${label} appears at ${startInset}`);
    setInset(target, startInset);

    // dragging status
    var pos = {};

    function ondragover(ev) {
        ev.preventDefault();
    }

    function ondragstart(ev) {
        //console.debug("ondragstart")
        pos.dragging = true;
        pos.startClientX = ev.clientX;
        pos.startClientY = ev.clientY;
        pos.startTargetLeft = target.offsetLeft;
        pos.startTargetTop = target.offsetTop;

        target.addEventListener("dragend", ondragend);
        target.addEventListener("drag", ondrag);
        target.addEventListener('dragover', ondragover); // cancel flickering
        //target.addEventListener('dragleave', (event) => event.preventDefault());
    }

    function ondrag(ev) {
        ev.preventDefault();
        //console.debug("ondrag")
        // move the target if dragging
        if (pos.dragging) {

            // if the mouse is outside of the window, stop dragging
            if ( ev.clientX < 0 || ev.clientY < 0 
                || ev.clientX > window.innerWidth
                || ev.clientY > window.innerHeight ) { 
                console.log("outside of window")
                ondragend(ev);
                return;
            }

            let left = pos.startTargetLeft + (ev.clientX - pos.startClientX);
            let top = pos.startTargetTop + (ev.clientY - pos.startClientY);
            // limit the position within the window
            let x = Math.max(0, Math.min(left, window.innerWidth - target.offsetWidth));
            let y = Math.max(0, Math.min(top, window.innerHeight - target.offsetHeight));

            //console.debug(`left:${left}, top:${top}, cx:${ev.clientX}, cy:${ev.clientY} x:${x}, y:${y}`)
           
            // get closer offset to the window edge
            function closerOffset(pos, windowSize, targetSize) {
                if (pos < (windowSize - targetSize)/2 ) {
                    return [pos, 'auto'];
                } else {
                    return ['auto', windowSize - pos - targetSize];
                }
            }

            let [t, b] = closerOffset(y, window.innerHeight, target.offsetHeight);
            let [l, r] = closerOffset(x, window.innerWidth, target.offsetWidth);
    
            pos.trbl = [t, r, b, l];
            //console.debug(pos.trbl);
            setInset(target, pos.trbl);
        }
    }

    function ondragend(ev) {
        ev.preventDefault();
        //console.debug("ondragend")
        pos.dragging = false;
        target.removeEventListener("dragend", ondragend);
        target.removeEventListener("drag", ondrag);
        target.removeEventListener('dragover', ondragover);
        try  {
            storeInset(storage, pos.trbl);
        } catch (e) {
            console.error(e);
        }
    }
}

function setupFileReciever(target, postLoadCallback=null) {
    // just to apeal where the script file should be dropped
    target.addEventListener('dragover', function(event) {
        event.preventDefault();
        target.classList.add('dragover')
    });

    target.addEventListener('dragleave', function(event) {
        target.classList.remove('dragover')
    });

    target.addEventListener('drop', function(event) {
        event.preventDefault();
        target.classList.remove('dragover')

        // load file into localstorage (even if file is already loaded)
        // THE FILE MUST BE A SIGNLE MERMAID JAVASCRIPT FILE
        const file = event.dataTransfer.files[0];
        if (!file) return;

        // Set UseStorage to false if script is too large to store in localStorage
        const UseStorage = false;

        const reader = new FileReader();
        reader.onload = function(e) {
            let date = new Date();

            if ( UseStorage ) {
                localStorage.setItem(storageName, e.target.result);
                localStorage.setItem(storageDate, date);
                console.info(`${label} content is stored at ${storageName} (${date})`);

                loadScriptFromStorage();
            } else {
                let scriptText = e.target.result;
                loadScript(scriptText);
            }
            console.info(`${label} Script is reloaded.`);
            window.alert('Script is reloaded.');

            if ( postLoadCallback ) {
                postLoadCallback();
            }
        }
        reader.readAsText(file);
    });
}

function setup() {

    if (localStorage.getItem(storageName)) {
        loadScriptFromStorage();
    }

    const buttonId = 'mermaidButton'
    const dialogId = 'dialog';
    const cancelId = 'cancel';
    const dropareaId = 'droparea';

    if ( document.querySelector("#" + buttonId) ) {
        ; // skip if button is already setup
    } else {
        let style = document.createElement('style');
        document.head.appendChild(style);

        style.textContent =
// position and size are tuned so that to locate the button next to the ChatGPT share button
// display:inline is to overwrite default style in copilot that is display:none
`#${buttonId} {
    display: inline !important;
    position: fixed;
    font-size: 18pt;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 1px 5px;
    z-index: 1000;
}` + 
`#${dialogId} {
    visibility: visible;
    width: 400px;
    height: 300px;
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1000;
    border: 1px solid lightgray;
    background-color: white;
    border-radius: 5px;
    padding: 20px;
}` +
`#${dropareaId} {
    width: 80%;
    height: 50%;
    margin: auto;
    padding: 20px;
    border: 1px solid lightgray;
    background-color: lightgray;
    border-radius: 5px;
}` +
`#${dropareaId}.dragover {
    background-color: pink;
}`;
        function text(str) {
            return document.createTextNode(str);
        }

        function create(tag, {id=null, klass=null, html=null, text=null, attr={}, style={}, handler={}, child=[]}) {
            let elem = document.createElement(tag);
            if (klass) elem.className = klass;
            if (id) elem.id = id;
            if (html) elem.innerHTML = html;
            if (text) elem.textContent = text;
            for (let key in attr) elem[key] = attr[key];
            for (let key in style) elem.style[key] = style[key];
            for (let key in handler) elem.addEventListener(key, handler[key]);
            for (let c of child) elem.appendChild(c);
            return elem;
        }

        /*

        elements:
            - button#mermaidButton
            - div#dialog
                - text: Drag & Drop Mermaid JS here
                - div#droparea
                - button#cancel

        actions:
            mermaidButton.leftclick -> flip mermaid status
            mermaidButton.rightclick -> show dialog

            droparea.drop -> upload mermaid script & load it & hide dialog
            cancel.click -> hide dialog
        */

        // actions
        function showDialog() {
            // ref. var dialog
            dialog.style.visibility = 'visible';
        }
        function hideDialog() {
            // ref. var dialog
            dialog.style.visibility = 'hidden';
        }
        function toggleDialog() {
            // ref. var dialog
            dialog.style.visibility = dialog.style.visibility === 'visible' ? 'hidden' : 'visible';
        }


        let button = create('button', {id: buttonId, text: label});
        button.style.visibility = "hidden";

        //let markletroot = document.body.attachShadow({mode: 'open'}); //TODO
        let markletroot = document.body;

        markletroot.appendChild(button); // to get offsetWidth/Height
        setupDraggable(button, storagePosition);
        button.style.visibility = "visible";

        let droparea = create('div', { id: dropareaId, attr: { textContent: 'Drag & Drop Mermaid JS here' }});
        let cancelbutton = create('button', { id:cancelId, handler: { click: hideDialog }, text: '✖' })
        var dialog = create('div', { id: dialogId, child: [
            cancelbutton,
            create('span', {html: "Mermaid JS registrationr" }),
            create('p', {html:`
<ol>
    <li> Download Mermaid JS from
        <ul>
        <li> <a href='https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js'>Official CDN</a></li>
        <li> <a href='https://sou3ilow.github.io/chatgpt-mermaid-bookmarklet/mermaid-patched/mermaid.min-11.0.0-alpha.7-patched.js'>Patched version</a></li>
        </ul>
    </li>
    <li> Drag & drop the script file on below rectangle</li>
</ol>`}),
            droparea
        ]});

        markletroot.appendChild(dialog);

        // to receive Mermaid javascript file
        setupFileReciever(droparea, hideDialog);

        button.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            toggleDialog();
        });

        button.addEventListener('click', function() {
            if ( !window.mermaid ) {
                const usage = "Mermaid is not loaded. Please follow the steps below to set it up.\n\n" +
                "1. Download Mermaid JS from https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js\n" +
                "2. Drag & drop the script file on the mermaid button on this page.";
                window.alert(usage);
                throw usage;
            }
            
            // flip status
            if (!isRendered) {
                render();
                button.style.backgroundColor = "gray";
            } else {
                restore();
                button.style.backgroundColor = "white";
            }
        });
    }
    
    let date = localStorage.getItem(storageDate);
    console.info(`${label} hello! bookmarklet:${version} script: ${date}`)

    window.uninstallMermaid = function() {
        delete window.mermaid;
        localStorage.removeItem(storageName);
        localStorage.removeItem(storageDate);
        localStorage.removeItem(storagePosition);
        console.info(`${label} Mermaid is uninstalled`);
    }
    console.info("execute `uninstallMermaid()` to uninstall saved data by this script");
}

setup();
