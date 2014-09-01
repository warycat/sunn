paper.install(window);

var tick = 0;

var SUNN = (function(){
  var currentMoment = function(){
    return moment();
    // return moment().add(10 * tick,'second');
  };
  var width = 768;
  var height = 1024;
  var sunLayers = 4;
  var radius = 150;
  var increment = 10;
  var center = new Point(width/2, height/2);

  var sunColor = '#fee990';
  var lightColor = '#ffffff';
  var skyTopColor = '#104eb3';
  var skyMiddleColor = '#1188f2';
  var skyBottomColor = '#0d73cc';
  var skyColors = [skyTopColor, skyMiddleColor,skyBottomColor];

  var topLeft = new Point(0,0);
  var bottomRight = new Point(width,height);
  var topMiddle = new Point(width/2,0);
  var bottomMiddle = new Point(width/2,height);
  var middleRight = new Point(width, height/2);

  var titleText = 'Lights synched with sunn';
  var titleSize = 40;
  var titleColor = '#ffffff';
  var titlePosition = new Point(width/2, 100);

  var clockText = function(){
    var h = currentMoment().format('hh');
    var m = currentMoment().format('mm');
    var s = moment().format('s');
    return h + ((s%2)?':':' ') + m;
  };
  var clockSize = 80;
  var clockColor = '#e18422';
  var clockPosition = new Point(width/2, height/2);

  var dateText = function(){
    return currentMoment().format('MMM Do, YYYY');
  };
  var dateSize = 20;
  var dateColor = '#e18422';
  var datePosition = new Point(width/2, height/2 + 30);

  var cityText = 'Boulder Colorado';
  var citySize = 30;
  var cityColor = '#ffffff';
  var cityPosition = new Point(width/2, height - 45);

  var iconPosition = new Point(60,80);
  var iconScale = 0.3;

  var globePosition = new Point(200, height - 60);
  var globeScale = 0.1;
  var globeRadius = 40;

  var markPosition = middleRight;
  var markLength = 50;
  var markWidth = 5;
  var markF = new Point(markPosition.x - markLength, markPosition.y);
  var markT = new Point(markPosition.x, markPosition.y);

  var rulerSpacing = 100;
  var rulerLength = 20;
  var rulerWidth = 3;
  var rulerTextSize = 20;
  var rulerTextSpacing = 10;
  var rulerDirection = 1;
  var rulerZeroPosition = new Point(middleRight);

  return {
    currentMoment:currentMoment
  , width:width
  , height:height
  , sunLayers:sunLayers
  , radius:radius
  , center:center
  , increment:increment

  , sunColor:sunColor
  , lightColor:lightColor
  , skyColors:skyColors

  , topLeft:topLeft
  , bottomRight:bottomRight
  , topMiddle:topMiddle
  , bottomMiddle:bottomMiddle
  , middleRight:middleRight


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

console.log(SUNN);

$(function(){
  var canvas = $('canvas')[0];
  paper.setup(canvas);

  new Path.Rectangle({
    topLeft:SUNN.topLeft
  , bottomRight:SUNN.bottomRight
  , fillColor:{
      gradient:{
        stops:SUNN.skyColors
      }
    , origin:SUNN.topMiddle
    , destination:SUNN.bottomMiddle
    }
  });
  
  var sun = new Path.Circle({
    center:SUNN.center
  , radius:SUNN.radius
  , fillColor:SUNN.sunColor
  });

  new PointText({
    point:SUNN.titlePosition
  , content:SUNN.titleText
  , fillColor:SUNN.titleColor
  , justification:'center'
  , fontFamily:'arial,helvetica'
  , fontSize:SUNN.titleSize
  });

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

  new PointText({
    point:SUNN.cityPosition
  , content:SUNN.cityText
  , fillColor:SUNN.cityColor
  , justification:'center'
  , fontFamily:'arial,helvetica'
  , fontSize:SUNN.citySize
  });

  new Raster({
    source:'https://cloud.githubusercontent.com/assets/1858099/3948391/b321a62e-26a4-11e4-98a0-530fe1c5de09.png'
  , position:SUNN.iconPosition
  }).scale(SUNN.iconScale);

  new Path.Circle({
    radius:SUNN.globeRadius
  , center:SUNN.globePosition
  , fillColor:SUNN.lightColor
  , opacity:0.5
  });

  new Raster({
    source:'https://cloud.githubusercontent.com/assets/1858099/3948392/b56e30e6-26a4-11e4-9bcd-7f35cf3e3755.png'
  , position:SUNN.globePosition
  , opacity:0.5
  }).scale(SUNN.globeScale);

  new Path.Line({
    from:SUNN.markF
  , to:SUNN.markT
  , strokeColor: 'white'
  , strokeWidth: SUNN.markWidth
  , strokeCap:'round'
  });

  for(var n = 0;n<=12;n++){
    new Path.Line({
      from: new Point(SUNN.rulerZeroPosition.x - SUNN.rulerLength, SUNN.rulerZeroPosition.y + n * SUNN.rulerDirection * SUNN.rulerSpacing)
    , to: new Point(SUNN.rulerZeroPosition.x, SUNN.rulerZeroPosition.y + n * SUNN.rulerDirection * SUNN.rulerSpacing)
    , strokeColor: 'white'
    , strokeWidth: SUNN.rulerWidth
    , strokeCap:'square'
    });

    new PointText({
      point: new Point(SUNN.rulerZeroPosition.x - SUNN.rulerLength - SUNN.rulerTextSpacing, SUNN.rulerZeroPosition.y + n * SUNN.rulerDirection * SUNN.rulerSpacing + 7)
    , content:n+''
    , justification:'right'
    , fillColor:'white'
    , fontSize:SUNN.rulerTextSize
    });
  }

  view.onFrame = function(event){
    tick = event.count;
    glare();
  };


  function glare(){
    if(tick % 30 === 0){
      var ray = new Path.Circle({
        center:SUNN.center
      , radius:SUNN.radius
      , fillColor:SUNN.lightColor
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
  }



});


