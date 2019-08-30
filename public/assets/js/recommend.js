//热门推荐
$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(res){
        var recomendTpl = `
        {{each list}}
        <li>
        <a href="detail.html?id={{$value._id}}">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
        </li>
        {{/each}}
        `
       var html =  template.render(recomendTpl,{list:res})
       $('#recommendBox').html(html)
    }   
  })

  //随机推荐
  $.ajax({
      url:'/posts/random',
      type:'get',
      success:function(res){
        //   console.log(res);
          
          var str = `
          {{each list}}
          <li>
          <a href="detail.html?id={{$value._id}}">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
              <img src="{{$value.thumbnail}}" alt="">
            </div>
          </a>
          </li>
          {{/each}}
          `
          var html = template.render(str,{list:res})
          $('#ramdoms').html(html)
      }
  })
//   template.defaults.imports.dataFormat = dataFormat;
  //最新评论
  $.ajax({
      type:'get',
      url:'/comments/lasted',
      success:function(res){
          var str = `
          {{each list}}
          <li>
          <a href="javascript:;">
            <div class="avatar">
              <img src="{{$value.author.avatar}}" alt="">
            </div>
            <div class="txt">
              <p>
                <span>{{$value.author.nickName}}</span>{{dataFormat($value.createAt)}}说:
              </p>
              <p>{{$value.content}}</p>
            </div>
          </a>
        </li>
        {{/each}}
          `
         var html =  template.render(str,{list:res})
         $('#commentBox').html(html)
      }
  })

  function dataFormat(data) {
    var nDate = new Date(data);
    // padStart(字符串的位数,需要填充的字符串) 这个方法是属于字符串的方法 它主要作用就是用于字符串前面填充字符串  
    var str = nDate.getFullYear() + '-' + (nDate.getMonth() + 1).toString().padStart(2, 0) + (nDate.getDate()).toString().padStart(2, 0);
    return str;
  }

  //文章分类导航
  $.ajax({
      url:'/categories',
      type:'get',
      success:function(res){
        var str = `
        {{each list}}
        <li><a href="list.html?categoryId={{$value._id}}">
        <i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `
        var html = template.render(str,{list:res})
        $('#navBox').html(html)
        $('#topnavBox').html(html)

      }
  })

  //从浏览器地址栏查询参数
  function getUrlParmas(name){
    // location.search
    var paramsAry = location.search.substr(1).split('&')
    for(var i = 0 ; i<paramsAry.length;i++){
      var tmp = paramsAry[i].split('=')
      if(tmp[0]==name){
        return tmp[1]
      }
    }
    return -1;
  }