var app = new Vue({
  el:'#app',
  data:{
    imglist: {},
    foldername: "2021.07.08 Night Walking #2",
    path: "/photo?",
    count: 1,
    maxcount:13,
    imageURL:"2021.07.08_Night_Walking_%232/IMG_2910.jpg"
  },
  mounted: function(){
    //jsonから画像リスト読み込み
    axios.get('./img/img_list.json').then(response => (this.imglist=response))
  },
  methods:{
    changeImg: function(){
      this.imageURL=this.urls[i]
    }
  }
})
