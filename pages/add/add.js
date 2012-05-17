var time = require("../../utils/util");
Page({
    data:{
        isShow:true
    },
    onLoad(e){//e-url传参
        var id = e.id;
        if(id){//有id为修改
            getData(id,this);
        }else{// 添加
            this.setData({
                id:+new Date(),
                isShow:false
            })
        }
      //console.log(this.data)
        
    },
    change(e){//e-表单对象(bindinput事件下)
       var val = e.detail.value;
       
       this.setData({
           content:val
       })
    },
    cancel(){
        wx.navigateBack()
    },
    sure(){
       var re = /^\s*$/g;
       if(!this.data.content || re.test(this.data.content)){
           wx.showModal({
                title: '请填写内容',
                showCancel:false
            })
           return;
       } 
       this.setData({
           time:+new Date()
       })
       setValue(this);
       wx.navigateBack() 
    }
})

function getData(id,page){
    var arr = wx.getStorageSync('txt');
    if(arr.length){
        arr.forEach((item)=>{
           
            if(item.id == id){
                var t=new Date(item.time);
                item.time=time.formatTime(t)
                page.setData({
                    id:item.id,
                    content:item.content,
                    time:item.time
                })
            }
        })
    }
}

function setValue(page){
    var arr = wx.getStorageSync('txt');
    var data = [],flag = true;
    if(arr.length){
        arr.forEach((item) => {
            if(item.id == page.data.id){
                item.time = +new Date();
                item.content = page.data.content;
                flag = false;
            }
            data.push(item);
        })
    }
    if(flag){
        data.push(page.data);
    }
    wx.setStorageSync('txt', data);
    //wx.clearStorage()
}