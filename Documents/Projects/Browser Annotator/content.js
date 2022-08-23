function addElement(element, string) {
    const style = document.createElement(element);
    style.textContent = string;
    document.body.append(style);
}

styleString = `
*{
    margin: 0;
    padding: 0;
}

.nav{
    width: 310px;
    height: 50px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: space-around;
    opacity: .3;
    transition: opacity .5s;
}
.nav:hover{
    opacity: 1;
}

.clr{
    height: 30px;
    width: 30px;
    background-color: blue;
    border-radius: 50%;
    border: 3px solid rgb(214, 214, 214);
    transition: transform .5s;
}
.clr:hover{
    transform: scale(1.2);
}
.clr:nth-child(1){
    background-color: #000;
}
.clr:nth-child(2){
    background-color: #EF626C;
}
.clr:nth-child(3){
    background-color: #fdec03;
}
.clr:nth-child(4){
    background-color: #24d102;
}
.clr:nth-child(5){
    background-color: #fff;
}

button{
    border: none;
    outline: none;
    padding: .6em 1em;
    border-radius: 3px;
    background-color: #03bb56;
    color: #fff;
}
.save{
    background-color: #0f65d4;
}
`


function activateCanvas() {
    var context = document.getElementById('canvas').getContext("2d");
    var canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");
    context.strokeStyle = "#ff0000";
    context.lineJoin = "round";
    context.lineWidth = 5;

    var clickX = [];
    var clickY = [];
    var clickDrag = [];
    var paint;

    /**
     * Add information where the user clicked at.
     * @param {number} x
     * @param {number} y
     * @return {boolean} dragging
     */
    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

    /**
     * Redraw the complete canvas.
     */
    function redraw() {
        // Clears the canvas
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (var i = 0; i < clickX.length; i += 1) {
            if (!clickDrag[i] && i == 0) {
                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else if (!clickDrag[i] && i > 0) {
                context.closePath();

                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else {
                context.lineTo(clickX[i], clickY[i]);
                context.stroke();
            }
        }
    }

    /**
     * Draw the newly added point.
     * @return {void}
     */
    function drawNew() {
        var i = clickX.length - 1
        if (!clickDrag[i]) {
            if (clickX.length == 0) {
                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            } else {
                context.closePath();

                context.beginPath();
                context.moveTo(clickX[i], clickY[i]);
                context.stroke();
            }
        } else {
            context.lineTo(clickX[i], clickY[i]);
            context.stroke();
        }
    }

    function mouseDownEventHandler(e) {
        paint = true;
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, false);
            drawNew();
        }
    }

    function touchstartEventHandler(e) {
        paint = true;
        if (paint) {
            addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, false);
            drawNew();
        }
    }

    function mouseUpEventHandler(e) {
        context.closePath();
        paint = false;
    }

    function mouseMoveEventHandler(e) {
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;
        if (paint) {
            addClick(x, y, true);
            drawNew();
        }
    }

    function touchMoveEventHandler(e) {
        if (paint) {
            addClick(e.touches[0].pageX - canvas.offsetLeft, e.touches[0].pageY - canvas.offsetTop, true);
            drawNew();
        }
    }

    function setUpHandler(isMouseandNotTouch, detectEvent) {
        removeRaceHandlers();
        if (isMouseandNotTouch) {
            canvas.addEventListener('mouseup', mouseUpEventHandler);
            canvas.addEventListener('mousemove', mouseMoveEventHandler);
            canvas.addEventListener('mousedown', mouseDownEventHandler);
            mouseDownEventHandler(detectEvent);
        } else {
            canvas.addEventListener('touchstart', touchstartEventHandler);
            canvas.addEventListener('touchmove', touchMoveEventHandler);
            canvas.addEventListener('touchend', mouseUpEventHandler);
            touchstartEventHandler(detectEvent);
        }
    }

    function mouseWins(e) {
        setUpHandler(true, e);
    }

    function touchWins(e) {
        setUpHandler(false, e);
    }

    function removeRaceHandlers() {
        canvas.removeEventListener('mousedown', mouseWins);
        canvas.removeEventListener('touchstart', touchWins);
    }

    canvas.addEventListener('mousedown', mouseWins);
    canvas.addEventListener('touchstart', touchWins);
}


function injectAnnotationBtn() {
    const btn = document.createElement('div');
    btn.classList.add("annotation-box");
    btn.textContent = "Annotate"
    btn.addEventListener('click', transformHtmlToCanvas);
    document.body.append(btn);
}

function transformHtmlToCanvas() {
    document.body.getElementsByClassName("annotation-box")[0].remove();
    html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
    })
        .then(async function (canvas) {
            injectAnnotationBtn()
            var w = window.open("");
            w.location.hash = "annotation"
            canvas.style.width = "100vw";
            canvas.style.height = "auto";
            canvas.id = "canvas";
            w.document.body.style.margin = "0";
            w.document.body.appendChild(canvas);
        })
}


if (window.location.hash === "#annotation") {
    addElement('style', styleString);

    const nav = document.createElement("div");
    nav.classList.add("nav");
    document.body.appendChild(nav)
    nav.innerHTML = `
        <div class="clr" data-clr="#000"></div>
        <div class="clr" data-clr="#EF626C"></div>
        <div class="clr" data-clr="#fdec03"></div>
        <div class="clr" data-clr="#24d102"></div>
        <div class="clr" data-clr="#fff"></div>
        <button class="clear">clear</button>
        <button class="save">save</button>
    `

    activateCanvas()
}
else {
    injectAnnotationBtn()
}