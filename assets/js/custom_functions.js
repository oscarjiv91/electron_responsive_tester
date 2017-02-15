function scaleFrames(){
  var items = $( "#page-content-wrapper" ).find( "iframe" );

  items.each(function(index) {
      var item = items[index];
      var img = $("#image_" + item.id);

      var jObject = $(item);//convert to jQuery Element
      var max_width = jObject.parent().width();
      var max_height = jObject.parent().height();

      var scale_factor;


      if(parseInt(item.height) >  parseInt(item.width)){

        if(max_height > img[0].height){
            scale_factor = max_height/img[0].height;
        }else{
            scale_factor = img[0].height/max_height;
        }
          // img.css("webkitTransform", "scale(" + scale_factor  + ") rotate(90dg)");

        scale_factor = max_height/img[0].getBoundingClientRect().height;


        img.css("webkitTransform", "scale(" + scale_factor * 0.9 + ")");

        img.css("margin-top", "0px");

        iframe_scale_factor = (img[0].getBoundingClientRect().height - img[0].getBoundingClientRect().height * (parseFloat(jObject.attr("top")) + parseFloat(jObject.attr("bottom"))))/item.height;
        jObject.css("margin-top", img[0].getBoundingClientRect().height * jObject.attr("top") + "px");
        jObject.css("margin-left", img[0].getBoundingClientRect().height * (parseFloat(jObject.attr("left")) / 2) + "px");
        item.style.webkitTransform = "scale(" + iframe_scale_factor  + ")";

      }else{

        if(max_width > img[0].width){
            scale_factor = max_width/img[0].width;
        }else{
            scale_factor = img[0].width/max_width;
        }

        img.css("width", "100%");
        img.css("height", "auto");

        img.css("webkitTransform", "scale(" + scale_factor  + ")");


        iframe_scale_factor = (img[0].getBoundingClientRect().width - img[0].getBoundingClientRect().width * ((parseFloat(jObject.attr("top"))) + parseFloat(jObject.attr("bottom"))))/item.width;

        jObject.css("margin-top",  img[0].getBoundingClientRect().width *  jObject.attr("top")  + "px");
        jObject.css("margin-left", img[0].getBoundingClientRect().width *  jObject.attr("bottom") + "px");
        item.style.webkitTransform = "scale(" + iframe_scale_factor  + ")";

      }

      }else{
        scale_factor = max_height/img.height;
        // img.css("webkitTransform", "rotate(270deg)");
        // img.css("left", "0px");
        // img.css("top", "0px");

        // img.css("webkitTransform", "rotate(270deg)");

        // img.css("margin-left", "0%");
        // img.height(h);
        // img.width(w);

                    img.css("webkitTransform", "scale(" + scale_factor  + ")");

                    iframe_scale_factor = (img[0].getBoundingClientRect().height - img[0].getBoundingClientRect().height * 0.39)/item.height;
                    console.log(iframe_scale_factor);
                    jObject.css("margin-top", img[0].getBoundingClientRect().height * 0.2 + "px");
                    jObject.css("margin-left", img[0].getBoundingClientRect().height * 0.06 + "px");
                    item.style.webkitTransform = "scale(" + iframe_scale_factor  + ")";
      }



      console.log(item.getBoundingClientRect().height);

      img.css("height", "100%");
      img.css("background-image", "url(./assets/images/devices/iphone_4.svg)");
      img.css("background-repeat", "no-repeat");
      img.css("margin", "0 auto 30px");
      img.css("position", "absolute");
      img.css("background-position", "0 0");

      console.log(newImgHeight);
      console.log(newImgWidth);

      img.css("height", "70%");


      img.css("height", newImgHeight + "px");
      img.css("width", newImgWidth + "px");



      img.css("height", item.getBoundingClientRect().height + 200);
      img.css("width", item.getBoundingClientRect().width + 200);
      img.css("width", item.getBoundingClientRect().width + 200);

      var frame_w;
      var frame_h;

      var border_top = 0.20 *  $(item).height();
      var border_bottom = 0.20 *  $(item).height();
      var border_left = 0.20 *  $(item).width();
      var border_right = 0.20 *  $(item).width();


      if(max_height/$(item).height() < max_width / $(item).width()){

        console.log("height: " + $(item).height());
        console.log("width: " + $(item).width());
        console.log(border_top);
        console.log(border_bottom);
        console.log(border_right);
        console.log(border_left);
        // console.log("top: " + height_top);
        // console.log("bottom: " + height_bottom);

        frame_w_px = parseInt($(item).attr("original-width")) +   parseInt(border_left) +  parseInt(border_right);
        frame_h_px = parseInt($(item).attr("original-height")) +  parseInt(border_top) +  parseInt(border_bottom);

        //
        // console.log("w: " + frame_w_px);
        // console.log("h: " + frame_h_px);
        //
        // $(item).attr("width", frame_w_px);
        // $(item).attr("height", frame_h_px);
        $(item).css("border-width", border_top + "px " + border_right + "px " + border_bottom + "px " + border_left + "px");
        $(item).css("border-image", "url(\"./assets/images/devices/iphone_4.svg\") 20% 13.5% 20% 12% stretch stretch");

        // console.log(border_top + "px " + border_right + "px " + border_bottom + "px " + border_left + "px");
        // Cambari atributo width y height del iframe

      }else{
        $(item).css("border-width","30px 30px 30px 30px");
      }



  });
}

function showIndicator(){

  $('#url').css("background-image", "url(\"./assets/images/indicator.gif\")");

  var count = 0;
  var items = $( "#page-content-wrapper" ).find( "iframe" );
  items.each(function(index) {
      var item = items[index];
      if($(item).attr('loaded') == 'true'){
        count ++;
      }
      // Check if last item had finished

      $(item).load(function() {
          count++;
          $(item).attr('loaded', 'true');
          if(count == items.size()){
            console.log("finished");
            $('#url').css("background-image", "url(\"./assets/images/paper.svg\")");
          }
      });
  });
}

function refreshFrames(url){
  var items = $( "#page-content-wrapper" ).find( "iframe" );
  items.each(function(index){
    var item = items[index];
    item.src = url;
  });
}

function changeStateOfFrames(){
  var items = $( "#page-content-wrapper" ).find( "iframe" );
  items.each(function(index) {
    var item = items[index];
    $(item).attr('loaded', 'false');
  });
}

function addhttp(url) {
   if (!/^(f|ht)tps?:\/\//i.test(url)) {
      url = "http://" + url;
   }
   return url;
}

function refreshDevice(id, url) {
   var items = $("#"+id).find('iframe');
   items.each(function(index){
     var item = items[index];
     item.src = url;
   });
}

function scrollToDevice(id){
  $('body').animate({
      scrollTop: $("#"+id).offset().top - 30
  }, 0);
}
