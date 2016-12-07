/**
 * Created by ava on 12/6/16.
 */
var routerTexture  = null;
var routerHoverTexture  = null;
var router  = null;
var sw = null;
var switchArrowTexture = null;
var tweedTexture = null;
var renderer = null;
var stage  = null;
var tmp = null;
var tmp1 = null;
var portStatus = true;
var portEnableColor = 0x1EE22C;
var portDisableColor = 0xFFFF00;
var swPort = null;
var routerPort = null;
var line = null;
var lineColor = null;
var speed = null;

function createBox (name, color, width, height, border) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawRect(0, 0, width, height);
    graphics.endFill();
    graphics.name = name;
    graphics.hitArea = new PIXI.Rectangle(0, 0, width, height);
    return graphics;
}

function getGlobalPosition(element) {
    var x = element.worldTransform.tx;
    var y = element.worldTransform.ty;
    return {x:x, y: y};
}


function createLine() {
    line = new PIXI.Graphics();
    line.lineStyle(4, 0x0, 1);
    var from = getGlobalPosition(swPort);
    var to = getGlobalPosition(router);
    line.moveTo(from.x, from.y);
    line.lineTo(to.x, to.y);
    line.endFill();
    line.buttonMode = true;
    line.interactive = true;
    line.mousedown = lineMouseDown;
}

function lineMouseDown() {

}

function updateLIne() {
    var size = 5;
    line.clear();
    line.beginFill(0x808080);
    line.lineStyle(6, 0x808080, 1);
    var from = getGlobalPosition(swPort);
    var to = getGlobalPosition(routerPort);
    line.moveTo(from.x+swPort.width, from.y+ swPort.height/2);
    line.lineTo(to.x, to.y+routerPort.height/2);
    //line.lineTo(to.x, to.y+routerPort.height/2+size);
    //line.lineTo(from.x+swPort.width, from.y+ swPort.height/2+size);
    line.endFill();
}

function getSpriteByGraphics (graphics) {
    var texture = graphics.generateCanvasTexture();
    var sprite = new PIXI.Sprite(texture);
    return sprite;
}

function changePortStatus() {
    var width = this.width;
    var height = this.height;
    portStatus = portStatus == true ? false : true;
    var color = portStatus == true ? portEnableColor : portDisableColor;
    this.clear();
    this.beginFill(color);
    this.drawRect(0, 0, width, height);
    this.endFill();
    this.hitArea = new PIXI.Rectangle(0, 0, width, height);
}

function updateSpeedBoxPosition() {
    var swP = getGlobalPosition(swPort);
    var roP = getGlobalPosition(routerPort);
    if(swP.x >= roP.x)  {
        var x = (Math.abs(swP.x - roP.x)/2)+roP.x;
    } else {
        var x = (Math.abs(swP.x - roP.x)/2)+swP.x;
    }

    if(swP.y >= roP.y)  {
        var y = (Math.abs(swP.y - roP.y)/2)+roP.y;
    } else {
        var y = (Math.abs(swP.y - roP.y)/2)+swP.y;
    }
    speed.x = x;
    speed.y = y;
}

function createSpeed(speedText) {
    speed = new PIXI.Container();
    var text = new PIXI.Text(speedText, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'} );
    var speedBox = createBox("speedBox", 0x00D2FF, text.width, text.height);
    speed.addChild(speedBox);
    speed.addChild(text);
}

function routerMouseOver() {
    this.texture = routerHoverTexture;
}

function routerMouseOut() {
    this.texture = routerTexture;
}

function routerMouseMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent.parent);
        this.parent.position.x = newPosition.x - this.dragPoint.x;
        this.parent.position.y = newPosition.y - this.dragPoint.y;
    }

}

function routerOnDragStart (event) {
    this.data = event.data;
    this.texture = routerHoverTexture;
    this.dragging = true;
    this.dragPoint = event.data.getLocalPosition(this.parent.parent);
    this.dragPoint.x -= this.parent.position.x;
    this.dragPoint.y -= this.parent.position.y;
}

function routerOnDragEnd() {
    this.dragging = false;
    this.data = null;
}

////// switch
function switchMouseOver() {
    //this.texture = routerHoverTexture;
}

function switchMouseOut() {
    //this.texture = routerTexture;
}

function switchMouseMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent.parent);
        this.parent.position.x = newPosition.x - this.dragPoint.x;
        this.parent.position.y = newPosition.y - this.dragPoint.y;
    }

}

function switchOnDragStart (event) {
    this.data = event.data;
    this.dragging = true;
    this.dragPoint = event.data.getLocalPosition(this.parent.parent);
    this.dragPoint.x -= this.parent.position.x;
    this.dragPoint.y -= this.parent.position.y;
}

function switchOnDragEnd() {
    this.dragging = false;
    this.data = null;
}

/// end of switch

function createRouter(macText) {
    // router init
    router = new PIXI.Container();
    var routerSprite = new PIXI.Sprite(routerTexture);
    routerSprite.interactive = true;
    routerSprite.buttonMode = true;
    routerSprite.mouseover = routerMouseOver;
    routerSprite.mouseout = routerMouseOut;
    routerSprite.mousedown = routerOnDragStart;
    routerSprite.touchstart = routerOnDragStart;
    routerSprite.mouseup = routerOnDragEnd;
    routerSprite.mouseupoutside = routerOnDragEnd;
    routerSprite.touchendoutside = routerOnDragEnd;
    routerSprite.touchend = routerOnDragEnd;
    routerSprite.mousemove = routerMouseMove;
    var mac = new PIXI.Text(macText, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'});
    var boxMac = createBox("mac", 0x00D2FF, mac.width+4, mac.height);
    routerPort = boxMac;
    router.addChild(routerSprite);
    router.addChild(boxMac);
    boxMac.y += 36;
    mac.y += 36;
    boxMac.x -=  29
    mac.x -= 29;
    router.addChild(mac);
}

function createSwitch(text, macText, portNumber) {
    var topOffset = 10;
    var middleOffset = 6;
    sw = new PIXI.Container();
    var info = new PIXI.Text(text, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'});
    var wall = new PIXI.Sprite(tweedTexture);
    var box = createBox("info", 0x00D2FF, info.width+4, info.height);
    var mac = new PIXI.Text(macText, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'});
    var boxMac = createBox("mac", 0x00D2FF, info.width+4, mac.height);
    var portText = new PIXI.Text(portNumber, {fontFamily : 'Arial', fontSize: '18px Snippet' , fill : 'bleck', align : 'center'});
    swPort = createBox("swPort", portEnableColor, portText.width+4, portText.height);
    swPort.interactive = true;
    swPort.buttonMode = true;
    swPort.mousedown = changePortStatus;
    var arrow  = new PIXI.Sprite(switchArrowTexture);
    arrow.width = 50;
    arrow.height = 35;
    wall.width = box.width + 20;
    info.y += topOffset;
    box.y +=  topOffset;
    sw.addChild(arrow);
    sw.addChild(wall);
    sw.addChild(box);
    sw.addChild(info);
    sw.addChild(boxMac);
    sw.addChild(mac);
    sw.addChild(swPort);
    sw.addChild(portText);

    arrow.y -= topOffset + 30;
    arrow.x = (sw.width/2) - (arrow.width/2);
    box.x = (sw.width/2) - (box.width/2);
    info.x = (sw.width/2) - (info.width/2);
    boxMac.x = (sw.width/2) - (box.width/2)
    mac.x = (sw.width/2) - (mac.width/2)
    boxMac.y += middleOffset + info.y+ info.height;
    mac.y += middleOffset + info.y+ info.height;
    wall.height = info.height + box.height + boxMac.height;
    swPort.y = wall.height/2-(swPort.height/2);
    portText.y = wall.height/2 - (portText.height/2);
    swPort.x = wall.width+2;
    portText.x = wall.width+2+2;
    wall.buttonMode = true;
    wall.interactive = true;
    wall.mouseover = switchMouseOver;
    wall.mouseout = switchMouseOut;
    wall.mousedown = switchOnDragStart;
    wall.touchstart = switchOnDragStart;
    wall.mouseup = switchOnDragEnd;
    wall.mouseupoutside = switchOnDragEnd;
    wall.touchendoutside =switchOnDragEnd;
    wall.touchend = switchOnDragEnd;
    wall.mousemove = switchMouseMove;
}


window.onload = function () {
    renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
        backgroundColor: 0xFFFFFF,
        resolution: window.devicePixelRatio || 1
    });
    //var collision = new Bump(PIXI);
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container(0xFFFFFF, true);

    // resize
    window.addEventListener('resize', function () {
        renderer.resize(window.innerWidth, window.innerHeight);
    });


    var loader = new PIXI.loaders.Loader();
    loader.add("router", 'assets/img/router.png')
        .add("routerHover", 'assets/img/router-hover.png')
        .add("switchArrow", 'assets/img/switch-arrow.png')
        .add("tweed", 'assets/img/tweed.png')
        .add("routerSelect", 'assets/img/router-select.png').load(main);

    function main(loader, res) {
        routerTexture =  res['router'].texture;
        routerHoverTexture =  res['routerHover'].texture;
        switchArrowTexture =  res['switchArrow'].texture;
        tweedTexture = res['tweed'].texture;

        // router init
        createRouter("9C:D6:43:83:12:7B");
        // create siwtch
        createSwitch("D-Link DES-10 Fast Ethernet\n Switch", "00:26:A5:39:6E:80", 8);
        // create line
        createLine();
        // create speed
        createSpeed("100000000");
        sw.y += 100;

        router.x = 400;
        router.y = 200;
        stage.addChild(router);
        stage.addChild(sw);
        stage.addChild(line);
        stage.addChild(speed);

        update();
        function update() {
            updateLIne();
            updateSpeedBoxPosition();
            renderer.render(stage);
            requestAnimationFrame(update);
        }

    }



};
