/////////////
// 弹出层
/////////////
    /**
     * [弹窗消息提示，带显示时间]
     * @param  {[String]}   content [消息内容]
     * @param  {[number]}   time    [持续时间]
     */
    dialog.msg = function(content,time){
        var d=window.top.dialog({
            quickClose: true,
            title: '提示',
            content: content
        }).show();
        if (time>0 || time===undefined) {
            setTimeout(function () {
                d.close().remove();
            }, 2000);
        }
    };

    /**
     * [气泡提示，带显示时间]
     * @param  {[String]}               content [消息内容]
     * @param  {[String or element]}    element [DOM元素或ID]
     * @param  {[number]}               time    [持续时间]
     */
    dialog.tipmsg = function(content,element,time){
        var d=dialog({
            quickClose: true,
            align: 'top',
            content: content
        });
        if (element===undefined || element==="number") {
            d.show();
        }else{
            element=$(element)[0];
            d.show(element);
        }
        if (time>0 || time===undefined) {
            setTimeout(function () {
                d.close().remove();
            }, 2000);
        }
    };

    /**
     * [确认对话框]
     * @param  {[fn]}       okfn [传入确认后执行的函数]
     * @param  {[fn]}       nofn [传入取消后执行的函数]
     * @param  {[blooean]}  mask [是否以蒙层方式打开]
     */
    dialog.recheck = function (okfn,nofn,mask){
        if ( okfn === undefined || typeof okfn != "function" ) {
            okfn = function (){};
        }
        if ( nofn === undefined || typeof nofn != "function" ) {
            nofn = function (){};
        }
        var d = dialog({
            title: '消息',
            content: '确认操作吗？',
            okValue:'确认',
            ok: okfn,
            cancelValue:'取消',
            cancel: nofn
        });
        
        if ( mask === false )
            d.show();
        else
            d.showModal();
    };

    /**
     * [弹出阅览大图]
     * @param  {[object]}   options [配置参数]
     */
    dialog.img = function (options){
        var defaults = {
            'img':    false,    //传入图片-必须
            'rotate': false,    //阅览的大图是否可旋转
            'width':  false,    //定义阅览图的宽
            'height': false,     //定义阅览图的高
            'maxWidth':false,
            'maxHeight':false,
            'quickClose':false,
            'clone':true //默认以克隆方式阅览大图
        };
        var opts = $.extend({}, defaults , options||{});
        var img = opts.img;

        if (!img) {
            console.error('需要查看的大图未定义')
            return
        }

        if (opts.clone) {
            img = img.clone().attr('class', '').css({width:'auto',height:'auto'});
        }

        // 如果配置了宽高，则对图片进行强制等比例拉伸
        if (opts.width) {
            img.width(opts.width)
        }
        else if (opts.height) {
            img.height(opts.height)
        }

        // 设置最大宽高
        img.css({
            maxWidth: opts.maxWidth,
            maxHeight: opts.maxHeight
        });

        if (opts.rotate) { //有旋转功能
            var multiple=0;
            var maxlen,w,h;//maxlen:图片最长的一边

            function doRotate(img,multiple){//旋转图片
                img.css({
                    transform: "rotate(" + (multiple*90) + "deg)",
                    marginTop:h/-2,
                    marginLeft:w/-2
                });
                img.parent().css({
                    width: maxlen,
                    height: maxlen
                });
            }
            
            dialog({
                content:img,
                title: opts.title,
                quickClose: opts.quickClose,
                cancel:true,
                onremove: function () { //对话框销毁的时也销毁大图
                    var bigImg = this.original.content[0];
                    bigImg.remove()
                },
                cancelValue:"关闭",
                onshow: function () {//打开时，让大图绝对定位居中
                    w=img.width();
                    h=img.height();
                    img.css({
                        position:'absolute',
                        display:'block',
                        left:'50%',
                        top:'50%',
                        marginLeft:w/-2,
                        marginTop:h/-2,
                        transition:'transform 0.5s, -moz-transform 0.5s, -o-transform 0.5s, -ms-transform 0.5s',
                        webkitTransition:'-webkit-transform 0.5s'
                    });
                    img.parent().css({
                        width: w,
                        height: h
                    });
                    maxlen = w>h ? w:h ;
                    this.reset();
                },
                button: [
                    {
                        value: '左转',
                        callback: function () {
                            multiple --;
                            doRotate(img,multiple);
                            return false;
                        }
                    },
                    {
                        value: '右转',
                        callback: function () {
                            multiple ++;
                            doRotate(img,multiple);
                            return false;
                        }
                    }
                ]
            }).showModal()

        }else{  //default
            img.css({
                position: 'static',
                margin: 0
            });
            dialog({
                content: img,
                title: opts.title,
                quickClose: opts.quickClose,
                onremove: function () { //对话框销毁的时也销毁大图
                    var bigImg = this.original.content[0];
                    bigImg.remove()
                },
            }).showModal()
        }
    };
    