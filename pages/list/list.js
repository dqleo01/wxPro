var time = require("../../utils/util");

Page({
    data:{
        lists:[
            {
                content:'wechat program',
                time:"2016,1,1",
                id:1
            }

        ]
    },
    onLoad(){
        initData(this);
    },
    onShow(){
        initData(this)
    },
    edit(e){
        var id=e.currentTarget.dataset.id;
        wx.navigateTo({
            url:"../add/add?id="+id

        })
    },
    add(){
        wx.navigateTo({
            url:"../add/add"
        })
    },
    delet(e){
        var page=this;
        var newData=[];
        var arr=wx.getStorageSync("txt");
        var did=e.currentTarget.dataset.did;
        if(arr.length){
            arr.forEach((item) =>{
                if(item.id!=did){
                    var t=new Date(item.time);
                    item.time=time.formatTime(t);
                    newData.push(item)
                }
            })
        }

        //console.log(newData)
        wx.setStorageSync('txt', newData);
        
        this.setData({
            lists:newData
        })
        wx.showToast({
            title:"删除成功!"
        })
    }
})


function initData(page){
    var arr=wx.getStorageSync("txt");
    if(arr.length){
        arr.forEach((item,i) =>{
            var t=new Date(item.time);
            item.time=time.formatTime(t);
        })
        page.setData({
            lists:arr
        })
    }

}



