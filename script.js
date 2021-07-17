var app = new Vue({
  el:'#app',
  data:{

    foldername: "2021.07.08 Night Walking #2",
    f:0,
    foldermaxCount:3,
    path: "/photo?",
    count: 1, //何分の何と表示される
    maxcount:13,
    imageURL:"2021.07.08_Night_Walking_%232/IMG_2910.jpg"
  },
  created: function(){
    //jsonから画像リスト読み込み
    axios.get('./img/img_list.json').then(response => (this.imglist=response))
  },
  mounted: function(){
    //this.changeImg(1,0) ← なぜかここではimglistが読み込まれない。とりあえずonloadに置いてる
  },
  methods:{
    changeImg: function(f,p){
      //fは何フォルダ目か、pは何枚目か
      this.foldername=this.imglist['data'][f][0]

      this.f=f //この辺なんとかしよう
      this.foldermaxCount=this.imglist['data'].length //本来はここではない、初期化のところ

      this.imageURL=encodeURIComponent(this.imglist['data'][f][0]+'/'+this.imglist['data'][f][1][p])
      this.path='/photo?'+'folder='+f+'&photo='+p
      this.count=p+1; //今何枚目？
      this.maxcount=this.imglist['data'][f][1].length //何枚中？
    },
    nextFolder: function(i){
      this.f+=i
      if (this.f<0) {
        this.f=this.foldermaxCount
      }else if (this.f>=this.foldermaxCount) {
        this.f=0
      }

      this.foldername=this.imglist['data'][this.f][0]
      this.maxcount=this.imglist['data'][this.f][1].length //何枚中？フォルダが変わるので
      this.p=0
      this.count=1
      p=this.p

      this.imageURL=encodeURIComponent(this.imglist['data'][this.f][0]+'/'+this.imglist['data'][this.f][1][p])
      this.path='/photo?'+'folder='+this.f+'&photo='+p


    },
    nextPhoto: function(i){
      this.count+=i
      if (this.count<1) {
        this.count=this.maxcount
      }else if (this.count>this.maxcount) {
        this.count=1
      }
      p=this.count-1
      this.imageURL=encodeURIComponent(this.imglist['data'][this.f][0]+'/'+this.imglist['data'][this.f][1][p])
      this.path='/photo?'+'folder='+this.f+'&photo='+p
    }
  }
})
