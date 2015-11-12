# artDialog.extend
artDialog网页对话框组件功能扩展

<p>1.常用功能封装</p>
<p>2.图片旋转阅览</p>

<br>

<h3>DEMO</h3>
暂无

<br>

<h3>Getting Started</h3>
在使用前，你需要引入jQuery和artDialog


	<!-- dialog的样式文件 -->
	<link rel="stylesheet" href="lib/ui-dialog.css">

	<!-- jQuery -->
	<script src="lib/jquery-1.11.1.min.js"></script>

	<!-- artDialog网页对话框组件 -->
	<script src="lib/dialog-min.js"></script>
	
	<!-- artDialog.extend -->
	<script src="dialog.extend.js"></script>

<br>

<h3>API</h3>

<b>消息提示</b>

	dialog.msg( content, time )

	/**
	 * [弹窗消息提示，带显示时间]
	 * @param  {[String]}   content [消息内容]
	 * @param  {[number]}   time    [持续时间]
	 */

<b>气泡提示</b>

	dialog.tipmsg( content, element, time )

	/**
	 * [气泡提示，带显示时间]
	 * @param  {[String]}               content [消息内容]
	 * @param  {[String or element]}    element [DOM元素或ID]
	 * @param  {[number]}               time    [持续时间]
	 */
	
<b>确认对话框</b>
	
	dialog.recheck( okfn, nofn, mask )

	/**
	 * [确认对话框]
	 * @param  {[fn]}       okfn [传入确认后执行的函数]
	 * @param  {[fn]}       nofn [传入取消后执行的函数]
	 * @param  {[blooean]}  mask [是否以蒙层方式打开]
	 */
	

<b>带旋转功能的图片阅览</b>

	dialog.img( options )

	/**
	 * [弹出阅览大图]
	 * @param  {[object]}   options [配置参数]
	 */
	
	// 默认参数
	var defaults = {
	    'img':    false,    //传入图片-必须，可以是jQuery对象
	    'rotate': false,    //阅览的大图是否可旋转
	    'width':  false,    //定义阅览图的宽
	    'height': false,     //定义阅览图的高
	    'maxWidth':false,
	    'maxHeight':false,
	    'quickClose':false,
	    'clone':true //默认以克隆方式阅览大图
	};

<br>
<h3>Let's work together</h3>
http://moerj.com
