function insertAD(type,_ads,index){
  if(type == "VIDEO"){
    on_ad_loaded(`<div class="video-container"><iframe width="100%" height="315"
    src="${_ads.video_url}" frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><div>`,index);
  }else if(type == "BANNER"){
    on_ad_loaded(`<div class="banner-container" 
    style="background:Url('${_ads.image}');background-size:cover;background-repeat:no-repeat;background-position:center;"><div>`,index);
  }
  ad_blocks[index].getElementsByClassName("ad-info")[0].getElementsByClassName("title")[0].innerHTML=`<div class="title-word">${_ads.description}</div>`
}
//抓廣告欄位
function setAd(){
  let wantedType = ad_box.getAttribute("ad-type");  
  //有指定廣告類型？
  let _ads;
  if(wantedType){
    //濾掉指定類型以外的廣告
    _ads = ads.filter((item,index,array)=>{
      if(item.success){
        if(item.type === wantedType){
          return item;
        }     
      }
    })
  }else{
    //沒有指定就全部帶進來
    _ads = ads;
  }
  //準備建立廣告
  for(let i = 0;i<_ads.length;i++){
    //廣告是否成功？
    if(_ads[i].success){
      //插入dom
      ad_blocks[i] = addADBlock(ad_blocks[i]);

      ad_blocks[i].children["ad-media"].addEventListener("addAD",function(e){
        ad_blocks[i].children["ad-media"].innerHTML = e.detail.html;
      })
      insertAD(_ads[i].type,_ads[i],i);
    }else{
      ad_blocks[i].addEventListener("faillAD",function(e){
        ad_blocks[i].innerHTML = e.detail.html;
      })
      on_ad_failed('<div>載入失敗</div>',i);
    }
  }
  //廣告載完了
  ad_box.addEventListener("finishAD",function(e){
    ad_box.setAttribute("is-success",e.detail.attr);
  })  
  on_ad_impression("y",_ads[0].impression_url,2000);
}

var ad_box;
var ad_blocks;
document.addEventListener("DOMContentLoaded", function(event) { 
  // console.log("ready!");
  (function initalAd(){
    //確認ad-box在不在
    //底下有幾個ad-block
    ad_box = document.getElementById("ad_box")===undefined?null:document.getElementById("ad_box");
    if(ad_box){
      ad_blocks = ad_box.children[0].getElementsByClassName("ad-block");
      //取廣告資訊
      getAd();
      //把廣告渲染上去
      setAd();
    }
  })();
});
// (function initalAd(){
//   if(adElm){
//     let media = document.createElement("div");
//     media.id = "media";
//     media.className = "media";

//     let info = document.createElement("div");
//     info.className = "info";
//     let word = document.createElement("div");
//     word.className = "word";
//     word.textContent = "AGIRLS.AOTTER.NET";
//     let title = document.createElement("div");
//     title.id = "title";
//     title.className = "title";
//     info.append(word);
//     info.append(title);

//     adElm.append(media)
//     adElm.append(info);

//     adElm.children["media"].addEventListener("addAD",function(e){
//       adElm.children["media"].innerHTML = e.detail.html;
//     })
//     adElm.children["media"].addEventListener("faillAD",function(e){
//       adElm.children["media"].innerHTML = e.detail.html;
//     })
//     getAd();

//   }
// })();
//on-ad-loaded 廣告載入成功
function on_ad_loaded(source,i){
  const event = new CustomEvent("addAD",{
    detail:{
      html:source
    }
  });
  console.log("第"+i+"個廣告載入成功");
  ad_blocks[i].children["ad-media"].dispatchEvent(event);
}
//on-ad-failed 廣告載入失敗
function on_ad_failed(source,i){
  const event = new CustomEvent("faillAD",{
    detail:{
      html:source
    }
  });
  console.log("第"+i+"個廣告載入失敗");
  ad_blocks[i].dispatchEvent(event);
}
//on-ad-impression 廣告出現在畫面上超過 50%至少一秒。
function on_ad_impression(_attr,url,sec){
  const event = new CustomEvent("finishAD",{
    detail:{
      attr:_attr
    }
  });
  console.log("廣告觀看超過"+sec+"毫秒");
  ad_box.dispatchEvent(event);
  setTimeout(()=>{
    // window.open(url,"_self");
  },sec);
}
//取廣告資訊
var xhttp = [];
var ads = new Array();
function getAd(){
  for(let i = 0;i<ad_blocks.length;i++){
    (function(i){
      xhttp[i] = new XMLHttpRequest();
      xhttp[i].open("GET","http://localhost:3000/ads",false);
      xhttp[i].onreadystatechange = function(){
          if (xhttp[i].readyState === 4 && xhttp[i].status === 200){
              ads.push(JSON.parse(xhttp[i].responseText));
          }
      };
      xhttp[i].send();
    })(i);
  }
}

//插入廣告的DOM
function addADBlock(dom){
  let media = document.createElement("div");
  media.id = "ad-media";
  media.className = "ad-media";

  let info = document.createElement("div");
  info.className = "ad-info";
  let word = document.createElement("div");
  word.className = "word";
  word.textContent = "AGIRLS.AOTTER.NET";
  let title = document.createElement("div");
  title.id = "title";
  title.className = "title";
  info.append(word);
  info.append(title);

  dom.append(media)
  dom.append(info);
  return dom;
}
