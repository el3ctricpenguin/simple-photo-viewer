var app = new Vue({
  el:'#app',
  data:{

    foldername: "----.--.--",
    f:0,//フォルダ何個目か
    foldermaxCount:1,//全部でフォルダ何個
    path: "/photo?",
    p:0,//写真が何枚目か count:p+1
    count: 1,//何分の何と表示される
    maxcount:13,//フォルダ内の写真数
    imageURL:"loading.jpg",
    imglist:[],
    img:[]//IMG入れ
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
      this.f=f
      this.p=p
      this.foldername=this.imglist['data'][this.f][0]
      this.foldermaxCount=this.imglist['data'].length //フォルダが全部で何個あるか
      this.bottomUI()
      this.preloadImg()
    },
    nextFolder: function(i){
      this.f+=i
      if (this.f<0) {
        this.f=this.foldermaxCount-1//この辺見直してあとで(7/18)->直さなくていいような(7/28)
      }else if (this.f>this.foldermaxCount-1) {
        this.f=0
      }
      this.foldername=this.imglist['data'][this.f][0]
      this.p=0
      this.bottomUI()
      this.preloadImg()
    },
    nextPhoto: function(i){
      this.p+=i
      if (this.p<0) {
        this.p=this.maxcount-1
      }else if (this.p>this.maxcount-1) {
        this.p=0
      }
      this.bottomUI()
    },
    bottomUI: function(){//下部分のUI更新+画像切り替え
      this.count=this.p+1 //今何枚目？
      this.maxcount=this.imglist['data'][this.f][1].length //何枚中？
      this.imageURL=encodeURIComponent(this.foldername+'/'+this.imglist['data'][this.f][1][this.p])
      this.path='/photo?'+'folder='+this.f+'&photo='+this.p
    },
    preloadImg: function(){
      imgs=[]
      //imgs.push(this.imglist['data'][this.f][1])
      //imgs.push(this.imglisa in rmaxCount-1)][1][0],this.imglist['data'][(this.f-1)%(this.foldermaxCount-1)][1][0])
      for (i in this.imglist['data'][this.f][1]) {
        imgs.push('./img/'+encodeURIComponent(this.foldername+'/'+this.imglist['data'][this.f][1][i]))
      }
      imgs.push('./img/'+encodeURIComponent(this.imglist['data'][(this.f+1)%(this.foldermaxCount)][0]+'/'+this.imglist['data'][(this.f+1)%(this.foldermaxCount)][1][0]))
      imgs.push('./img/'+encodeURIComponent(this.imglist['data'][(this.f-1+this.foldermaxCount)%(this.foldermaxCount)][0]+'/'+this.imglist['data'][(this.f-1+this.foldermaxCount)%(this.foldermaxCount)][1][0]))
      for (i in imgs) {
        this.img[i] = new Image()
        this.img[i].src = imgs[i]
        console.log(imgs[i])
      }
    },
    keydown: function(e){
      if (e.keyCode=="37") {
        this.nextPhoto(-1)//←
      }else if (e.keyCode=="39") {
        this.nextPhoto(1)//→
      }else if (e.keyCode=="38") {
        app.nextFolder(-1)//↑
      }else if (e.keyCode=="40") {
        app.nextFolder(1)//↓
      }
    }
  }
})
document.onkeydown=app.keydown;
