Modernizr.addTest('iphone', function () {
  return !!navigator.userAgent.match(/iPhone/i);
});

paper.install(window);

var tick = 0;

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

var _width = $(window).width();
var _height = $(window).height();

var SUNN = (function(){
  var currentMoment = function(){
    // return moment();
    return moment().add(50 * tick,'second');
  };

  var sunriseHour = 6;
  var sunriseMinute = 28;
  var sunsetHour = 7;
  var sunsetMinute = 18;

  var width = function(){
    return _width;
  };
  var height = function(){
    return _height;
  };
  var size = function(){
    return new Point(_width,_height);
  };
  var sunLayers = 4;
  var radius = Modernizr.iphone?75:150;
  var increment = Modernizr.iphone?5:10;
  var center = new Point(width()/2, height()/2);

  var sunColors = [
    '#ff0000','#ff2200','#ff4400','#ff6600', '#ff8800','#ffaa00'
  , '#ffcc00','#ffee00','#ffff22','#ffff44', '#ffff66','#ffffff'
  , '#ffffff','#ffffff','#ffffff','#ffff22', '#ffee00','#ffcc00'
  , '#ffaa00','#ff8800','#ff6600','#ff4400', '#ff2200','#ff0000'
  ];

  var lightColors = [
    '#ff0000','#ff2200','#ff4400','#ff6600', '#ff8800','#ffaa00'
  , '#ffcc00','#ffee00','#ffff22','#ffff44', '#ffff66','#ffffff'
  , '#ffffff','#ffffff','#ffffff','#ffff22', '#ffee00','#ffcc00'
  , '#ffaa00','#ff8800','#ff6600','#ff4400', '#ff2200','#ff0000'
  ];

  var linearColor = function (colors){
    var h = currentMoment().hour();
    var m = currentMoment().minute();
    var c1 = hexToRgb(colors[h]);
    var c2 = hexToRgb(colors[(h+1)%24]);
    function q(a,b,c,d,e){
      return (a + (b-a)*(d-c)/d)/e;
    }
    return new Color(q(c1.r,c2.r,m,60,255),q(c1.g,c2.g,m,60,255),q(c1.b,c2.b,m,60,255));
  };

  var sunColor = function(){
    return linearColor(sunColors);
  };

  var lightColor = function(){
    return linearColor(lightColors);
  };

  var skyTopColor = '#104eb3';
  var skyMiddleColor = '#1188f2';
  var skyBottomColor = '#0d73cc';
  var skyColors = [skyTopColor, skyMiddleColor,skyBottomColor];

  var topLeft = function(){
    return new Point(0,0);
  };
  var topMiddle = function(){
    return new Point(width()/2,0);
  };
  var topRight = function(){
    return new Point(width(),0);
  };

  var middleLeft = function(){
    return new Point(0,height()/2);
  };
  var middleMiddle = function(){
    return new Point(width()/2,height()/2);
  };
  var middleRight = function(){
    return new Point(width(),height()/2);
  };

  var bottomLeft = function(){
    return new Point(0,height());
  };
  var bottomMiddle = function(){
    return new Point(width()/2,height());
  };
  var bottomRight = function(){
    return new Point(width(),height());
  };

  var titleText = 'Lights synched with sunn';
  var titleSize = Modernizr.iphone?16:40;
  var titleColor = '#ffffff';
  var titlePosition = new Point(width()/2, Modernizr.iphone?50:100);

  var clockText = function(){
    var h = currentMoment().format('hh');
    var m = currentMoment().format('mm');
    var s = moment().format('s');
    return h + ((s%2)?':':' ') + m;
  };
  var clockSize = Modernizr.iphone?40:80;
  var clockColor = '#e18422';
  var clockPosition = new Point(width()/2, height()/2);

  var dateText = function(){
    return currentMoment().format('MMM Do, YYYY');
  };
  var dateSize = Modernizr.iphone?10:20;
  var dateColor = '#e18422';
  var datePosition = new Point(width()/2, height()/2 + (Modernizr.iphone?15:30));

  var cityText = 'Boulder Colorado';
  var citySize = Modernizr.iphone?15:30;
  var cityColor = '#ffffff';
  var cityPosition = new Point(width()/2, height() - (Modernizr.iphone?25:45));

  var iconPosition = new Point(Modernizr.iphone?30:60,Modernizr.iphone?40:80);
  var iconScale = Modernizr.iphone?0.15:0.3;

  var globePosition = new Point(width()/2 - (Modernizr.iphone?100:200), height() - (Modernizr.iphone?30:60));
  var globeScale = Modernizr.iphone?0.05:0.1;
  var globeRadius = Modernizr.iphone?20:40;

  var campfirePosition = [width()/2,height()/2+(Modernizr.iphone?50:100)];
  var campfireScale = Modernizr.iphone?0.05:0.1;


  var markPosition = middleRight();
  var markLength = Modernizr.iphone?25:50;
  var markWidth = Modernizr.iphone?2:5;
  var markF = new Point(markPosition.x - markLength, markPosition.y);
  var markT = new Point(markPosition.x, markPosition.y);

  var rulerSpacing = Modernizr.iphone?75:150;
  var rulerLength = Modernizr.iphone?10:20;
  var rulerWidth = Modernizr.iphone?2:3;
  var rulerTextSize = Modernizr.iphone?12:20;
  var rulerTextSpacing = Modernizr.iphone?5:10;
  var rulerDirection = 1;
  var rulerZeroPosition = new Point(middleRight());

  return {
    currentMoment:currentMoment
  , sunriseHour:sunriseHour
  , sunriseMinute:sunriseMinute
  , sunsetHour:sunsetHour
  , sunsetMinute:sunsetMinute

  , width:width
  , height:height
  , size:size
  , sunLayers:sunLayers
  , radius:radius
  , center:center
  , increment:increment

  , sunColor:sunColor
  , lightColor:lightColor
  , skyColors:skyColors

  , topLeft:topLeft
  , topMiddle:topMiddle
  , topRight:topRight

  , middleLeft:middleLeft
  , middleMiddle:middleMiddle
  , middleRight:middleRight

  , bottomLeft:bottomLeft
  , bottomMiddle:bottomMiddle
  , bottomRight:bottomRight

  , titleText:titleText
  , titlePosition:titlePosition
  , titleSize:titleSize
  , titleColor:titleColor

  , clockText:clockText
  , clockSize:clockSize
  , clockColor:clockColor
  , clockPosition:clockPosition

  , dateText:dateText
  , dateSize:dateSize
  , dateColor:dateColor
  , datePosition:datePosition

  , cityText:cityText
  , citySize:citySize
  , cityColor:cityColor
  , cityPosition:cityPosition

  , iconPosition:iconPosition
  , iconScale:iconScale

  , globePosition:globePosition
  , globeScale:globeScale
  , globeRadius:globeRadius

  , campfirePosition:campfirePosition
  , campfireScale:campfireScale

  , markF:markF
  , markT:markT
  , markWidth:markWidth

  , rulerZeroPosition:rulerZeroPosition
  , rulerSpacing:rulerSpacing
  , rulerWidth:rulerWidth
  , rulerLength:rulerLength
  , rulerTextSize:rulerTextSize
  , rulerTextSpacing:rulerTextSpacing
  , rulerDirection:rulerDirection
  };

})();

$(function(){
  $('<canvas resize></canvas>').appendTo($('body'));
  var canvas = $('canvas')[0];
  paper.setup(canvas);

  Path.Rectangle({
    point:[0,0]
  , size:SUNN.size()
  , fillColor:{
      gradient:{
        stops:[['#162883',0],['#1983db',0.5]]
      }
    , origin:SUNN.topMiddle()
    , destination:SUNN.bottomMiddle()
    }
  }).onFrame = function(){
    this.size = SUNN.size();
  };

  var sunriseSky = new Path.Rectangle({
    point:SUNN.middleLeft()
  , size:[SUNN.width(),-100]
  , fillColor:{
      gradient:{
        stops:[['#000000',0],[new Color(0,0,1,0),1]]
      }
    , origin:SUNN.middleMiddle()
    , destination:[SUNN.width()/2,SUNN.height()/2-100]
    }
  });

  sunriseSky.offset = 0;

  var sunsetSky = new Path.Rectangle({
    point:SUNN.middleLeft()
  , size:[SUNN.width(),-100]
  , fillColor:{
      gradient:{
        stops:[['#000000',0],[new Color(0,0,1,0),1]]
      }
    , origin:SUNN.middleMiddle()
    , destination:[SUNN.width()/2,SUNN.height()/2-100]
    }
  });
  sunsetSky.offset = 0;

  var sun = new Path.Circle({
    center:SUNN.middleMiddle()
  , radius:SUNN.radius
  , fillColor:SUNN.sunColor()
  , onFrame:function(){
      this.center = SUNN.middleMiddle();
      this.fillColor = SUNN.sunColor();
    }
  });

  var sunriseBlack = new Path.Rectangle({
    point:SUNN.middleLeft()
  , size:[SUNN.width(),SUNN.height()*2]
  , strokeColor: 'black'
  , strokeWidth: SUNN.markWidth
  , fillColor:'black'
  });

  sunriseBlack.offset = 0;

  var sunsetBlack = new Path.Rectangle({
    point:SUNN.middleLeft()
  , size:[SUNN.width(),SUNN.height()*2]
  , strokeColor: 'black'
  , strokeWidth: SUNN.markWidth
  , fillColor:'black'
  });

  sunsetBlack.offset = 0;

  new Path.Line({
    from:SUNN.markF
  , to:SUNN.markT
  , strokeColor: 'white'
  , strokeWidth: SUNN.markWidth
  , strokeCap:'round'
  });

  var rulerA = new Group();
  var rulerB = new Group();

  function hide(){
    var h = SUNN.currentMoment().hour() % 12;
    if(this.h - 1 < h){
      this.visible = false;
    }else{
      this.visible = true;
    }
  }

  for(var n = 0;n<=12;n++){
    var lineA = new Path.Line({
      from: new Point(SUNN.rulerZeroPosition.x - SUNN.rulerLength, SUNN.rulerZeroPosition.y + n * SUNN.rulerDirection * SUNN.rulerSpacing)
    , to: new Point(SUNN.rulerZeroPosition.x, SUNN.rulerZeroPosition.y + n * SUNN.rulerDirection * SUNN.rulerSpacing)
    , strokeColor: 'white'
    , strokeWidth: SUNN.rulerWidth
    , strokeCap:'square'
    });

    var textA = new PointText({
      point: new Point(SUNN.rulerZeroPosition.x - SUNN.rulerLength - SUNN.rulerTextSpacing, SUNN.rulerZeroPosition.y + n * SUNN.rulerDirection * SUNN.rulerSpacing + 7)
    , content:n+''
    , justification:'right'
    , fillColor:'white'
    , fontSize:SUNN.rulerTextSize
    });

    rulerA.addChild(lineA);
    rulerA.addChild(textA);

    var lineB = new Path.Line({
      from: new Point(SUNN.rulerZeroPosition.x - SUNN.rulerLength, SUNN.rulerZeroPosition.y - n * SUNN.rulerDirection * SUNN.rulerSpacing)
    , to: new Point(SUNN.rulerZeroPosition.x, SUNN.rulerZeroPosition.y - n * SUNN.rulerDirection * SUNN.rulerSpacing)
    , strokeColor: 'white'
    , strokeWidth: SUNN.rulerWidth
    , strokeCap:'square'
    });

    var textB = new PointText({
      point: new Point(SUNN.rulerZeroPosition.x - SUNN.rulerLength - SUNN.rulerTextSpacing, SUNN.rulerZeroPosition.y - n * SUNN.rulerDirection * SUNN.rulerSpacing + 7)
    , content:n+''
    , justification:'right'
    , fillColor:'white'
    , fontSize:SUNN.rulerTextSize
    });

    rulerB.addChild(lineB);
    rulerB.addChild(textB);

    lineA.h = n;
    lineB.h = n;
    textA.h = n;
    textB.h = n;
    lineA.onFrame = hide;
    lineB.onFrame = hide;
    textA.onFrame = hide;
    textB.onFrame = hide;
  }

  rulerA.offset = 0;
  rulerB.offset = 0;

  rulerA.onFrame = function(){
    rulerA.translate(new Point(0, + rulerA.offset));
    rulerA.offset = SUNN.rulerSpacing * 12 * (SUNN.currentMoment().minute() + SUNN.currentMoment().hour()%12 * 60) / 720;
    rulerA.translate(new Point(0, - rulerA.offset));
  };

  rulerB.onFrame = function(){
    rulerB.translate(new Point(0, - rulerB.offset));
    rulerB.offset = SUNN.rulerSpacing * 12 * (SUNN.currentMoment().minute() + SUNN.currentMoment().hour()%12 * 60) / 720;
    rulerB.translate(new Point(0, + rulerB.offset));
  };

  var fire3 = new Path.Circle({
    center:SUNN.middleMiddle()
  , radius:SUNN.radius + SUNN.increment * 3
  , fillColor:'#bf1a22'
  , opacity:1
  });

  var fire2 = new Path.Circle({
    center:SUNN.middleMiddle()
  , radius:SUNN.radius + SUNN.increment * 2
  , fillColor:'#ed6725'
  , opacity:1
  });

  var fire1 = new Path.Circle({
    center:SUNN.middleMiddle()
  , radius:SUNN.radius + SUNN.increment
  , fillColor:'#fbcf28'
  , opacity:1
  });

  var fire0 = new Path.Circle({
    center:SUNN.middleMiddle()
  , radius:SUNN.radius
  , fillColor:'black'
  , opacity:1
  });

  var campfire = new Raster({
    source:'https://cloud.githubusercontent.com/assets/1858099/4113110/87d74662-3244-11e4-86df-c2f2ce42d585.png'
  , position:SUNN.campfirePosition
  }).scale(SUNN.campfireScale);

  var fire = new Group([fire3, fire2, fire1, fire0,campfire]);

  new PointText({
    point:SUNN.clockPosition
  , content:SUNN.clockText()
  , fillColor:SUNN.clockColor
  , justification:'center'
  , fontFamily:'arial,helvetica'
  , fontSize:SUNN.clockSize
  , onFrame:function(){
      this.content = SUNN.clockText();
    }
  });

  new PointText({
    point:SUNN.datePosition
  , content:SUNN.dateText()
  , fillColor:SUNN.dateColor
  , justification:'center'
  , fontFamily:'arial,helvetica'
  , fontSize:SUNN.dateSize
  , onFrame:function(){
      this.content = SUNN.dateText();
    }
  });

  new Raster({
    source:'https://cloud.githubusercontent.com/assets/1858099/3948391/b321a62e-26a4-11e4-98a0-530fe1c5de09.png'
  , position:SUNN.iconPosition
  }).scale(SUNN.iconScale);

  new PointText({
    point:SUNN.titlePosition
  , content:SUNN.titleText
  , fillColor:SUNN.titleColor
  , justification:'center'
  , fontFamily:'arial,helvetica'
  , fontSize:SUNN.titleSize
  });

  new Path.Circle({
    radius:SUNN.globeRadius
  , center:SUNN.globePosition
  , fillColor:'white'
  , opacity:0.5
  });

  new PointText({
    point:SUNN.cityPosition
  , content:SUNN.cityText
  , fillColor:SUNN.cityColor
  , justification:'center'
  , fontFamily:'arial,helvetica'
  , fontSize:SUNN.citySize
  });

  new Raster({
    source:'https://cloud.githubusercontent.com/assets/1858099/3948392/b56e30e6-26a4-11e4-9bcd-7f35cf3e3755.png'
  , position:SUNN.globePosition
  , opacity:0.5
  }).scale(SUNN.globeScale);

  sunriseSky.onFrame = function(){
    this.point = SUNN.middleLeft();
    this.size = [SUNN.width(),-100];
    sunriseSky.translate(new Point(0, - sunriseSky.offset));
    sunriseSky.offset = SUNN.rulerSpacing * 12 * (SUNN.currentMoment().minute()-SUNN.sunriseMinute + (SUNN.currentMoment().hour()%12 - SUNN.sunriseHour) * 60) / 720;
    sunriseSky.translate(new Point(0, + sunriseSky.offset));
  };

  sunsetSky.onFrame = function(){
    this.point = SUNN.middleLeft();
    this.size = [SUNN.width(),-100];
    sunsetSky.translate(new Point(0, + sunsetSky.offset));
    sunsetSky.offset = SUNN.rulerSpacing * 12 * (SUNN.currentMoment().minute()-SUNN.sunsetMinute + (SUNN.currentMoment().hour()%12 - SUNN.sunsetHour) * 60) / 720;
    sunsetSky.translate(new Point(0, - sunsetSky.offset));
  };

  sunriseBlack.onFrame = function(){
    this.point = SUNN.middleLeft();
    this.size = [SUNN.width(),SUNN.height()*2];
    sunriseBlack.translate(new Point(0, - sunriseBlack.offset));
    sunriseBlack.offset = SUNN.rulerSpacing * 12 * (SUNN.currentMoment().minute()-SUNN.sunriseMinute + (SUNN.currentMoment().hour()%12 - SUNN.sunriseHour) * 60) / 720;
    sunriseBlack.translate(new Point(0, + sunriseBlack.offset));
  };
  
  sunsetBlack.onFrame = function(){
    this.point = SUNN.middleLeft();
    this.size = [SUNN.width(),SUNN.height()*2];
    sunsetBlack.translate(new Point(0, + sunsetBlack.offset));
    sunsetBlack.offset = SUNN.rulerSpacing * 12 * (SUNN.currentMoment().minute()-SUNN.sunsetMinute + (SUNN.currentMoment().hour()%12 - SUNN.sunsetHour) * 60) / 720;
    sunsetBlack.translate(new Point(0, - sunsetBlack.offset));
  };

  view.onFrame = function(event){
    tick = event.count;

    (function glare(){
      if(tick % 30 === 0){
        var ray = new Path.Circle({
          center:SUNN.center
        , radius:SUNN.radius
        , fillColor:SUNN.lightColor()
        , opacity:1
        , onFrame:function(){
            this.scale(1.003);
            this.life--;
            this.opacity = this.life / 100;
            if(this.life === 0){
              this.remove();
            }
          }
        });
        ray.life = 100;
        ray.insertBelow(sun);
      }
    })();

    var h = SUNN.currentMoment().hour();
    if(h<12){
      rulerA.visible = false;
      rulerB.visible = true;
      sunriseSky.visible = true;
      sunriseBlack.visible = true;
      sunsetSky.visible = false;
      sunsetBlack.visible = false;
    }else{
      rulerB.visible = false;
      rulerA.visible = true;
      sunriseSky.visible = false;
      sunriseBlack.visible = false;
      sunsetSky.visible = true;
      sunsetBlack.visible = true;
    }

    if(h<SUNN.sunriseHour || h> 12 + SUNN.sunsetHour){
      fire.visible = true;
    }else{
      fire.visible = false;
    }
  };

});

function getParameterByName(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
    results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var ip = getParameterByName('ip');
console.log(ip);
