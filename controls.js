$(document).ready(function(){
  var n = parseInt($("#slider").val());
  var data = vals.data.slice(0,10000);

  var setN =  function(){
    $("#slider").val(n);
    $('#num').val(n);
  };
  var graph = function(){
    var ax=1;
    var tix=1;
    w = $("#graph").width();
    h = $("#graph").height();
    $('#graph').html('');
    if(n>10){
      tix=0;
    }
    if(n>1500){
      ax=0;
    }
    plot(n, data, 6*n,tix,ax, w, h);
  };
  setN();
  graph();
  $(document).on("change", "#num", function(){
    n = parseInt($("#num").val());
    setN();
    graph();
  });
  $(document).on("change", "#slider", function(){
    n = parseInt($("#slider").val());
    setN();
    graph();
  });
  $(document).on("click", "#sub", function(){
    // n=Math.floor(n*0.90);
    n=n-5;
    if(n<1){
      n=1;
    }
    setN();
    graph();
  });
  $(document).on("click", "#add", function(){
    // n=Math.ceil(n*1.10);
    n=n+5;
    if(n>10000){
      n=10000;
    }
    setN();
    graph();
  });
  $(document).on("click", "#zoomout", function(){
    var slowzoom = setInterval(function(){
      if(parseInt(n)>=10000){
        clearInterval(slowzoom);
      }
      n=n+200;
      if(n>=10000){
        n=10000;
      }
      setN();
      graph();
    }, 200);
  });
  $(document).on("wheel", "#graph", function(e){
    dy=e.originalEvent.deltaY;
    console.log(dy);
    n=n+parseInt(dy);
    if(n>10000){
      n=10000;
    }
    if(n<1){
      n=1;
    }
    setN();
    graph();
  });


});
