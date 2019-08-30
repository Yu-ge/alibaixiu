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