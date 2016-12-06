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

function createBox (name, color, width, height, border) {
    var graphics = new PIXI.Graphics();
    graphics.beginFill(color);
    graphics.drawRect(0, 0, width, height);
    graphics.endFill();
    graphics.name = name;
    graphics.hitArea = new PIXI.Rectangle(0, 0, width, height);
    return graphics;
}

function getSpriteByGraphics (graphics) {
    var texture = graphics.generateCanvasTexture();
    var sprite = new PIXI.Sprite(texture);
    return sprite;
}


function routerMouseOver() {
    this.texture = routerHoverTexture;
}

function routerMouseOut() {
    this.texture = routerTexture;
}

function routerMouseMove() {
    if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.position.x = newPosition.x - this.dragPoint.x;
        this.position.y = newPosition.y - this.dragPoint.y;
    }

}

function routerOnDragStart (event) {
    this.data = event.data;
    this.texture = routerHoverTexture;
    this.dragging = true;
    this.dragPoint = event.data.getLocalPosition(this.parent);
    this.dragPoint.x -= this.position.x;
    this.dragPoint.y -= this.position.y;
}

function routerOnDragEnd() {
    this.dragging = false;
    this.data = null;
}

function createRouter() {
    // router init
    router = new PIXI.Sprite(routerTexture);
    router.interactive = true;
    router.buttonMode = true;
    router.mouseover = routerMouseOver;
    router.mouseout = routerMouseOut;
    router.mousedown = routerOnDragStart;
    router.touchstart = routerOnDragStart;
    router.mouseup = routerOnDragEnd;
    router.mouseupoutside = routerOnDragEnd;
    router.touchendoutside = routerOnDragEnd;
    router.touchend = routerOnDragEnd;
    router.mousemove = routerMouseMove;
}

function createSwitch(text, macText) {
    var topOffset = 10;
    var middleOffset = 6;
    sw = new PIXI.Container();
    var info = new PIXI.Text(text, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'});
    var wall = new PIXI.Sprite(tweedTexture);
    var box = createBox("info", 0x00D2FF, info.width+4, info.height);
    var mac = new PIXI.Text(macText, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'});
    var boxMac = createBox("mac", 0x00D2FF, info.width+4, mac.height);
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
    arrow.y -= topOffset + 30;
    arrow.x = (sw.width/2) - (arrow.width/2);
    box.x = (sw.width/2) - (box.width/2);
    info.x = (sw.width/2) - (info.width/2);
    boxMac.x = (sw.width/2) - (box.width/2)
    mac.x = (sw.width/2) - (mac.width/2)
    boxMac.y += middleOffset + info.y+ info.height;
    mac.y += middleOffset + info.y+ info.height;
    wall.height = info.height + box.height + boxMac.height;
    wall.buttonMode = true;
    wall.interactive = true;
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
        createRouter();
        // create siwtch
        createSwitch("D-Link DES-10 Fast Ethernet\n Switch", "00:26:A5:39:6E:80");

        sw.y += 100;

        router.x = 400;
        router.y = 200;
        stage.addChild(router);
        stage.addChild(sw);

        update();
        function update() {
            renderer.render(stage);
            requestAnimationFrame(update);
        }

    }



};
