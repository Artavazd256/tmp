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
var portEnableColor = 0x1EE22C;
var portDisableColor = 0xFFFF00;
var lineColor = null;
var speed = null;
var switchInfo1 = null;
var tableFlag = true;
var div = null;
var lineList = [];
var switchConnectionsData = null;



function splitText(text, n) {
    var t = '';
    var counter = 0;
    for(var i = 0; i < text.length; i++) {
        t += text[i];
        if(counter === n) {
            counter = 0;
            t += "\n";
        }
        counter++;
    }
    return t;
};



function getSwtichInfo(mac) {
    if(tableFlag) {
        showSwitchInfoByMac(mac);
        $(div).show();
        tableFlag = false;
    } else {
        $(div).hide();
        tableFlag = true;
    }
}


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


function createLine(from, to) {
    var line = new PIXI.Graphics();
    line.lineStyle(4, 0x0, 1);
    line.moveTo(from.x, from.y);
    line.lineTo(to.x, to.y);
    line.endFill();
    line.buttonMode = true;
    line.interactive = true;
    line.mousedown = lineMouseDown;
    line.from = from;
    line.to = to;
    return line;
}

function lineMouseDown() {

}

function updateLine() {
    var size = 5;
    for(var i = 0; i < lineList.length; i++) {
        lineList[i].clear();
        lineList[i].beginFill(0x808080);
        lineList[i].lineStyle(6, 0x808080, 1);
        var from = getGlobalPosition(lineList[i].from);
        var to = getGlobalPosition(lineList[i].to);
        var fromX = from.portPosition == 'left' ? from.x : from.x + lineList[i].from.width  ;
        var fromY = from.y + (lineList[i].from.height/2);
        lineList[i].moveTo(fromX, fromY);
        var toX = to.portPosition == 'left' ? to.x - lineList[i].to.width : to.x ;
        var toY = to.y + (lineList[i].to.height/2);
        lineList[i].lineTo(toX, toY);
        //line.lineTo(to.x, to.y+routerPort.height/2+size);
        //line.lineTo(from.x+swPort.width, from.y+ swPort.height/2+size);
        lineList[i].endFill();
        updateSpeedBoxPosition(lineList[i].from, lineList[i].to, lineList[i].speed);

    }
}

function getSpriteByGraphics (graphics) {
    var texture = graphics.generateCanvasTexture();
    var sprite = new PIXI.Sprite(texture);
    return sprite;
}

function changePortStatus() {
    var width = this.width;
    var height = this.height;
    this.portStatus = this.portStatus == true ? false : true;
    var color = this.portStatus == true ? portEnableColor : portDisableColor;
    this.clear();
    this.beginFill(color);
    this.drawRect(0, 0, width, height);
    this.endFill();
    this.hitArea = new PIXI.Rectangle(0, 0, width, height);
}

function updateSpeedBoxPosition(swPort1, swPort2, speed) {
    var from = getGlobalPosition(swPort1);
    var to = getGlobalPosition(swPort2);
    if(from.x >= to.x)  {
        var x = (Math.abs(from.x - to.x)/2)+to.x;
    } else {
        var x = (Math.abs(from.x - to.x)/2)+from.x;
    }

    if(from.y >= to.y)  {
        var y = (Math.abs(from.y - to.y)/2)+to.y;
    } else {
        var y = (Math.abs(from.y - to.y)/2)+from.y;
    }
    speed.x = x;
    speed.y = y;
}

function createSpeed(speedText, line) {
    var speed = new PIXI.Container();
    var text = new PIXI.Text(speedText, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'} );
    var speedBox = createBox("speedBox", 0x00D2FF, text.width, text.height);
    speed.addChild(speedBox);
    speed.addChild(text);
    line.speed = speed;
    return speed;
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
        if(newPosition.y <= this.height/2 || newPosition.x <= this.width/2 || newPosition.x >= window.innerWidth - this.width || newPosition.y >= window.innerHeight-this.height) {
            return;
        }
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
    getSwtichInfo(this.parent.name);
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
    var router = new PIXI.Container();
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
    router.addChild(routerSprite);
    router.addChild(boxMac);
    boxMac.y += 36;
    mac.y += 36;
    boxMac.x -=  29
    mac.x -= 29;
    router.addChild(mac);
    boxMac.portPosition = 'left';
    return {router: router, port: boxMac};
}

function createSwitch(text, macText, portNumber, twoPortNumber) {
    text = splitText(text, 24);
    var topOffset = 10;
    var middleOffset = 6;
    var sw = new PIXI.Container();
    sw.name = macText;
    var info = new PIXI.Text(text, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'});
    var wall = new PIXI.Sprite(tweedTexture);
    var box = createBox("info", 0x00D2FF, info.width+4, info.height);
    var mac = new PIXI.Text(macText, {fontFamily : 'Arial', fontSize: '12px Snippet' , fill : 'bleck', align : 'center'});
    var boxMac = createBox("mac", 0x00D2FF, info.width+4, mac.height);
    var portText = new PIXI.Text(portNumber, {fontFamily : 'Arial', fontSize: '18px Snippet' , fill : 'bleck', align : 'center'});
    var swPort = createBox("swPort", portEnableColor, portText.width+4, portText.height);
    var twoPortText = new PIXI.Text(twoPortNumber, {fontFamily : 'Arial', fontSize: '18px Snippet' , fill : 'bleck', align : 'center'});
    var twoSwPort = createBox("twoSwPort", portEnableColor, twoPortText.width+4, twoPortText.height);
    twoSwPort.interactive = true;
    twoSwPort.buttonMode = true;
    twoSwPort.mousedown = changePortStatus;
    twoSwPort.portStatus = true;
    swPort.interactive = true;
    swPort.portStatus = true;
    swPort.buttonMode = true;
    swPort.mousedown = changePortStatus;
    swPort.portStatus = true;
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
    if(twoPortNumber !== undefined) {
        sw.addChild(twoSwPort);
        sw.addChild(twoPortText);
    }
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
    twoSwPort.y = wall.height/2-(swPort.height/2);
    twoPortText.y = wall.height/2 - (portText.height/2);
    twoPortText.x -= twoSwPort.width +2 - twoPortText.width/2;
    twoSwPort.x -=   twoSwPort.width +2;
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
    swPort.portPosition = "right";
    twoSwPort.portPosition = 'left';
    return {port1 : swPort, port2 : twoSwPort, switch: sw};
}


function showSwitchInfoByMac(mac) {
    $.post( "switchInfo.php", { mac : mac }, function(data ) {
        div.innerHTML = data;
    });
}


window.onload = function () {
    var routerMac = $('#macForSNMP').attr('value');
    div = document.createElement("div");
    $('body').append(div);
    $(div).hide();

    $.post( "switchInfo.php", { routerMac : routerMac }, function(data ) {
        switchInfo1 = JSON.parse(data);
        $.post( "switchInfo.php", { connectionMac : switchInfo1.MAC}, function( data ) {
            try {
                switchConnectionsData = JSON.parse(data);
            } catch(SyntaxError) {
            }
        });
    });

    renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight, {
        backgroundColor: 0xFFFFFF,
        resolution: window.devicePixelRatio || 1
    });
    //var collision = new Bump(PIXI);
    $('#view').append(renderer.view);
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
        // Get router mac address

        // router init
        var router = createRouter(routerMac);
        // add router object to stage
        stage.addChild(router.router);
        // create switch
        var sw = null;
        if(switchConnectionsData != null) {
            sw = createSwitch(switchInfo1.name, switchInfo1.MAC, switchInfo1.number, switchConnectionsData[0].connection['port_to']);
        } else {
            sw = createSwitch(switchInfo1.name, switchInfo1.MAC, switchInfo1.number);
        }
        stage.addChild(sw.switch);
        // create line
        var line = createLine(sw.port1, router.port);
        // add line to stage
        stage.addChild(line);
        // create speed
        var speed = createSpeed(switchInfo1.ifspeed, line);
        stage.addChild(speed);
        // push line to list
        lineList.push(line);
        if(switchConnectionsData != null) {
            var lPort = sw.port2;
            for(var i = 1; i < switchConnectionsData.length; i++) {
                var name =  switchConnectionsData[i].device['name'];
                var mac =  switchConnectionsData[i].device['MAC'];
                var portNumberTo =  switchConnectionsData[i-1].connection['port_to'];
                var portNumberFrom =  switchConnectionsData[i].connection['port_from'];
                var sw1 = createSwitch(name, mac, portNumberFrom, portNumberTo);
                var line1 = createLine(sw1.port1, lPort);
                var speed1 = createSpeed(switchConnectionsData[i].device['ifspeed'], line1); // TODO need to ttttt change to variable
                lPort = sw1.port2;
                lineList.push(line1);
                stage.addChild(line1);
                stage.addChild(sw1.switch);
                stage.addChild(speed1);
            }

        }
        update();
        function update() {
            updateLine();
            renderer.render(stage);
            requestAnimationFrame(update);
        }

    }

};
