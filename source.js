let isRendered = false;
const label = "🧜‍♀️️"
const storageName = 'mermaidScript'

// target selector which contain mermaid description for chatGPT
const selector = 'code.language-mermaid';

function render() {
    // save original mermaid text
    let targets = document.querySelectorAll(selector);
    targets.forEach(code=>{
        code.dataset.original = code.textContent;
    });
    // render (or re-render)
    //mermaid.init(undefined, selector);
    mermaid.run({nodes: targets});
    isRendered = true;
    console.info(label + ' rendered')
}

function restore() {
    // remove all svgs
    let targets = document.querySelectorAll(selector);
    targets.forEach(code=>{
        code.querySelectorAll('svg').forEach(svg=>{ svg.remove(); })
        // restore original data only if the processed flag is true (this is changed by Mermaid)
        if ( code.dataset.processed ) {
            code.textContent = code.dataset.original;
            delete code.dataset.processed
        }
    });
    isRendered = false;
    console.info(label + ' restored')
}

function loadScriptFromStorage() {
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

    script.textContent = localStorage.getItem(storageName);
    document.head.appendChild(script); 

    // default theme does not match the background color of code pane of ChatGPT
    mermaid.initialize({ theme: 'dark' });
    // try `delete localStorage[storageName]` to remove script from storge
    console.info(label + ' script loaded from localStorage.' + storageName);
}

function setupDragDropListener(target) {
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

        const reader = new FileReader();
        reader.onload = function(e) {
            console.info(label + ' file loaded ' + file.name);
            localStorage.setItem(storageName, e.target.result);
            // window.mermaid will be available by calling the next function
            loadScriptFromStorage();
            window.alert('new file is stored and the script is loaded');
        }
        reader.readAsText(file);
    });
}

function setup() {

    if (localStorage.getItem(storageName)) {
        loadScriptFromStorage();
    }

    const buttonId = 'mermaidButton'
    if ( document.querySelector("#" + buttonId) ) {
        ; // skip if button is already setup
    } else {
        let style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule(
            // position and size are tuned so that to locate the button next to the ChatGPT share button
            // display:inline is to overwrite default style in copilot that is display:none
            `#${buttonId} {
                display: inline !important;
                position: fixed;
                top: 50px;
                right: 20px;
                font-size: 18pt;
                border: 1px solid lightgray;
                border-radius: 5px;
                padding: 1px 5px;
            }`,
            style.sheet.cssRules.length
        );
        style.sheet.insertRule(
            // i cannot come up with other color
            `#${buttonId}.dragover {
                background-color: pink;
            }`,
            style.sheet.cssRules.length
        );

        let button = document.createElement('button')
        button.id = buttonId
        button.textContent = label;
        setupDragDropListener(button); // to receive Mermaid javascript file
        document.body.appendChild(button);

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

    console.info(label + " hello!")
}

setup();

