var heiindex = ["車","马","相","士","将","士","相","马","車"];
var hongindex = ["車","馬","象","仕","帅","仕","象","馬","車"];
var xseperate = 110;
var yseperate = 110;
var xmargin = 25;
var ymargin = 40;
//棋盘数组
var qipan = [];
$(function(){
	var width = $(window).width();
	var height = $(window).height();
	$("#content").css("top","200px").css("left",(width*0.05)/2+"px");
	
	//初始化棋盘
	initQipan();
	
	//棋子添加点击事件，点击事件只对红方有效，因为黑方是电脑，不需要点击
	$(".qz").click(function(){
		var clazz = $(this).attr("player");
		if(clazz=="hongfang"){
			for(var i=0;i<$(".hongf_qz").length;i++){
				var obj = $(".hongf_qz").eq(i); 
				if(obj.attr("status")=="selected"){
					cancleQize(obj);
				}
			}
			var status = $(this).attr("status");
			if(status==undefined || status=="notSelected"){
				selectedQizi($(this));
			}else if(status=="selected"){
				cancleQize($(this));
			}	
		}
	});
	
	//每个格子的点击事件
	$(".danyuange").click(function(){
		var selectedObj = $("div[status='selected']");
		var currentObj = $(this);
		checkDownQizi(selectedObj,currentObj);
	});
});

//选中棋子
var selectedQizi = function(obj){
	obj.addClass("qz_selected");
	obj.attr("status","selected");
};

//取消选中
var cancleQize = function(obj){
	obj.removeClass("qz_selected");
	obj.attr("status","notSelected");
};


//初始化棋盘
var initQipan = function(){
	//初始化棋盘数组
    for(var i=0;i<10;i++){
    	var rows = [];
		for(var j=0;j<9;j++){
			var obj = {};
			obj.x = j*xseperate -xmargin;
			obj.y = i*yseperate -ymargin;
			rows.push(obj);
		}
		qipan.push(rows);
	}
    //初始化每个格子
    for(var i=0;i<qipan.length;i++){
    	for(var j=0;j<qipan[i].length;j++){
    		var point = qipan[i][j];
    		$("<div class='danyuange' point='"+i+"-"+j+"' style='left:"+point.x+"px;top:"+point.y+"px;'>&nbsp;</div>").appendTo("#content");
    	}
    }
    
	//初始化棋盘
	for(var i=0;i<qipan.length;i++){
		for(var j=0;j<qipan[i].length;j++){
			var point = qipan[i][j];
			if(i==0){	//黑方
				$("<div class='qz heif_qz' player='heifang' style='left:"+point.x+"px;top:"+point.y+"px;'>"+heiindex[j]+"</div>").appendTo("#content");
			}
			if(i==2 && (j==1||j==7)){	//黑方炮
				$("<div class='qz heif_qz' player='heifang' style='left:"+point.x+"px;top:"+point.y+"px;'>炮</div>").appendTo("#content");
			}
			if(i==3 && (j%2==0)){	//黑方卒
				$("<div class='qz heif_qz' player='heifang' style='left:"+point.x+"px;top:"+point.y+"px;'>卒</div>").appendTo("#content");
			}
			if(i==9){	//红方
				$("<div class='qz hongf_qz' player='hongfang' style='left:"+point.x+"px;top:"+point.y+"px;'>"+hongindex[j]+"</div>").appendTo("#content");
			}
			if(i==7 && (j==1||j==7)){	//红方炮
				$("<div class='qz hongf_qz' player='hongfang' style='left:"+point.x+"px;top:"+point.y+"px;'>炮</div>").appendTo("#content");
			}
			if(i==6 && (j%2==0)){	//红方兵
				$("<div class='qz hongf_qz' player='hongfang' style='left:"+point.x+"px;top:"+point.y+"px;'>兵</div>").appendTo("#content");
			}
		}
	}
};

//校验规则，检验选中棋子是否可以落到目标位置
var checkDownQizi = function(selectedObj,targetObj){
	var val = selectedObj.html();
	if(val=="車"){
		checkJuAndExecutor(selectedObj,targetObj);
	}else if(val=="馬"){
		checkMaAndExecutor(selectedObj,targetObj);
	}else if(val=="象"){
		checkXiangAndExecutor(selectedObj,targetObj);
	}else if(val=="仕"){
		checkShiAndExecutor(selectedObj,targetObj);
	}else if(val=="帅"){
		checkShuaiAndExecutor(selectedObj,targetObj);
	}else if(val=="兵"){
		checkBingAndExecutor(selectedObj,targetObj);
	}else if(val=="炮"){
		checkPaoAndExecutor(selectedObj,targetObj);
	}
};

//检验車
var checkJuAndExecutor = function(selectedObj,targetObj){
	var selectedX = parseInt(selectedObj.css("left").replace("px",""));
	var selectedY = parseInt(selectedObj.css("top").replace("px",""));
	var targetX = parseInt(targetObj.css("left").replace("px",""));
	var targetY = parseInt(targetObj.css("top").replace("px",""));
	if(selectedX==targetX){		//纵向
		var num = Math.abs(selectedY-targetY)/yseperate - 1; //两个节点之间共有多少个点
		var isAllBank = true;
		for(var i=0;i<num;i++){
			var min = Math.min(selectedY,targetY);
			if(hasQizi("qz",selectedX,min+(i+1)*yseperate)){
				isAllBank = false;
				return ;
			}
		}
	}else if(selectedY==targetY){	//横向
		var num = Math.abs(selectedX-targetX)/xseperate - 1; //两个节点之间共有多少个点
		var isAllBank = true;
		for(var i=0;i<num;i++){
			var min = Math.min(selectedX,targetX);
			if(hasQizi("qz",min+(i+1)*xseperate,selectedY)){
				isAllBank = false;
				return ;
			}
		}
	}else{
		return;
	}
	//符合条件，则落子到目标位置
	luoZi(selectedObj,targetX,targetY);
};

//检验马
var checkMaAndExecutor = function(selectedObj,targetObj){
	var selectedX = parseInt(selectedObj.css("left").replace("px",""));
	var selectedY = parseInt(selectedObj.css("top").replace("px",""));
	var targetX = parseInt(targetObj.css("left").replace("px",""));
	var targetY = parseInt(targetObj.css("top").replace("px",""));
	//判断马走的路线是否正确，是否有绊马腿的情况
	var canmove = ((targetX==(selectedX+1*xseperate)||targetX==(selectedX-1*xseperate)) 
					&& targetY==(selectedY-2*yseperate) && !hasQizi("qz",selectedX,selectedY-1*yseperate))	
			|| ((targetX==(selectedX+1*xseperate)||targetX==(selectedX-1*xseperate))
					&& targetY==(selectedY+2*yseperate) && !hasQizi("qz",selectedX,selectedY+1*yseperate))
			||	
				((targetY==(selectedY-1*yseperate)||targetY==(selectedY+1*yseperate))
					&& targetX==(selectedX+2*xseperate) && !hasQizi("qz",selectedX+1*xseperate,selectedY))
			||	
				((targetY==(selectedY-1*yseperate)||targetY==(selectedY+1*yseperate)) 
					&& targetX==(selectedX-2*xseperate) && !hasQizi("qz",selectedX-1*xseperate,selectedY)); 
	if(canmove){
	}else{
		return;
	}
	//符合条件，则落子到目标位置
	luoZi(selectedObj,targetX,targetY);
};

//检验象
var checkXiangAndExecutor = function(selectedObj,targetObj){
	var selectedX = parseInt(selectedObj.css("left").replace("px",""));
	var selectedY = parseInt(selectedObj.css("top").replace("px",""));
	var targetX = parseInt(targetObj.css("left").replace("px",""));
	var targetY = parseInt(targetObj.css("top").replace("px",""));
	var point = targetObj.attr("point");
	var x = point.split("-")[1];
	var y = point.split("-")[0];
	//判断象的线路，并且判断象是否有绊腿
	var canmove = y>=5 && (Math.abs(selectedX-targetX)== xseperate * 2) && (Math.abs(selectedY-targetY) == yseperate * 2) 	//可以移动
				  //判断是否有绊腿
	              &&( ((targetX > selectedX && targetY < selectedY) && !hasQizi("qz",selectedX+1*xseperate,selectedY-1*yseperate))
	            	||((targetX > selectedX && targetY > selectedY) && !hasQizi("qz",selectedX+1*xseperate,selectedY+1*yseperate))
	            	||((targetX < selectedX && targetY < selectedY) && !hasQizi("qz",selectedX-1*xseperate,selectedY-1*yseperate))
	            	||((targetX < selectedX && targetY > selectedY) && !hasQizi("qz",selectedX-1*xseperate,selectedY+1*yseperate))
	            	);
	
	if(canmove){
	}else{
		return;
	}
	//符合条件，则落子到目标位置
	luoZi(selectedObj,targetX,targetY);
};

//检验仕
var checkShiAndExecutor = function(selectedObj,targetObj){
	var selectedX = parseInt(selectedObj.css("left").replace("px",""));
	var selectedY = parseInt(selectedObj.css("top").replace("px",""));
	var targetX = parseInt(targetObj.css("left").replace("px",""));
	var targetY = parseInt(targetObj.css("top").replace("px",""));
	var point = targetObj.attr("point");
	var x = point.split("-")[1];
	var y = point.split("-")[0];
	if(x>2 && x<6 && y>6 && y<10 
			&& Math.abs(targetX-selectedX)==xseperate && Math.abs(targetY-selectedY)==yseperate){
	}else{
		return;
	}
	//符合条件，则落子到目标位置
	luoZi(selectedObj,targetX,targetY);
};

//检验帅
var checkShuaiAndExecutor = function(selectedObj,targetObj){
	var selectedX = parseInt(selectedObj.css("left").replace("px",""));
	var selectedY = parseInt(selectedObj.css("top").replace("px",""));
	var targetX = parseInt(targetObj.css("left").replace("px",""));
	var targetY = parseInt(targetObj.css("top").replace("px",""));
	var point = targetObj.attr("point");
	var x = point.split("-")[1];
	var y = point.split("-")[0];
	if(x>2 && x<6 && y>6 && y<10 
			&& ((Math.abs(targetX-selectedX)==xseperate && targetY==selectedY)
				|| (Math.abs(targetY-selectedY)==yseperate && targetX==selectedX)
			   )
	   ){
		
	}else{
		return;
	}
	//符合条件，则落子到目标位置
	luoZi(selectedObj,targetX,targetY);
};

//检验兵
var checkBingAndExecutor = function(selectedObj,targetObj){
	var selectedX = parseInt(selectedObj.css("left").replace("px",""));
	var selectedY = parseInt(selectedObj.css("top").replace("px",""));
	var targetX = parseInt(targetObj.css("left").replace("px",""));
	var targetY = parseInt(targetObj.css("top").replace("px",""));
	var point = targetObj.attr("point");
	var x = point.split("-")[1];
	var y = point.split("-")[0];
	if((y>=5 && selectedX==targetX && (selectedY-targetY==yseperate))
		|| (y<5 && (Math.abs(targetX-selectedX)==xseperate || Math.abs(targetX-selectedX)==0) 
				&& (selectedY-targetY==yseperate || selectedY==targetY )
			)
	   ){		
	}else{
		return;
	}
	//符合条件，则落子到目标位置
	luoZi(selectedObj,targetX,targetY);
};

//检验炮
var checkPaoAndExecutor = function(selectedObj,targetObj){
	var selectedX = parseInt(selectedObj.css("left").replace("px",""));
	var selectedY = parseInt(selectedObj.css("top").replace("px",""));
	var targetX = parseInt(targetObj.css("left").replace("px",""));
	var targetY = parseInt(targetObj.css("top").replace("px",""));
	if(selectedX==targetX){		//纵向
		if(hasQizi("qz",targetX,targetY) && hasQizi("heif_qz",targetX,targetY)){	//点击的是黑子
			var num = Math.abs(selectedY-targetY)/yseperate - 1; //两个节点之间共有多少个点
			var qzBetweenNum = 0;
			for(var i=0;i<num;i++){
				var min = Math.min(selectedY,targetY);
				if(hasQizi("qz",selectedX,min+(i+1)*yseperate)){
					qzBetweenNum ++;
				}
			}
			if(qzBetweenNum!=1){		//违反炮吃子必须隔一个子的规则时终止操作
				return;
			}
		}else{	//没有棋子
			var num = Math.abs(selectedY-targetY)/yseperate - 1; //两个节点之间共有多少个点
			var isAllBank = true;
			for(var i=0;i<num;i++){
				var min = Math.min(selectedY,targetY);
				if(hasQizi("qz",selectedX,min+(i+1)*yseperate)){
					isAllBank = false;
					return ;
				}
			}
		}
	}else if(selectedY==targetY){	//横向
		if(hasQizi("qz",targetX,targetY) && hasQizi("heif_qz",targetX,targetY)){	//点击的是黑子
			var num = Math.abs(selectedX-targetX)/xseperate - 1; //两个节点之间共有多少个点
			var qzBetweenNum = 0;
			for(var i=0;i<num;i++){
				var min = Math.min(selectedX,targetX);
				if(hasQizi("qz",min+(i+1)*xseperate,selectedY)){
					qzBetweenNum ++;
				}
			}
			if(qzBetweenNum!=1){		//违反炮吃子必须隔一个子的规则时终止操作
				return;
			}
		}else{	//没有棋子
			var num = Math.abs(selectedX-targetX)/xseperate - 1; //两个节点之间共有多少个点
			var isAllBank = true;
			for(var i=0;i<num;i++){
				var min = Math.min(selectedX,targetX);
				if(hasQizi("qz",min+(i+1)*xseperate,selectedY)){
					isAllBank = false;
					return ;
				}
			}
		}
	}else{
		return;
	}
	//符合条件，则落子到目标位置
	luoZi(selectedObj,targetX,targetY);
};

//检验指定位置是否有棋子	x/y是实际坐标，不是index
var hasQizi = function(clazz,x,y){
	var objArr = $("."+clazz);
	for(var i=0;i<objArr.length;i++){
		var obj = objArr.eq(i);
		if(obj.css("left").replace("px","")==x
				&& obj.css("top").replace("px","")==y){
			return true;		//指定位置有棋子
		}
	}
	return false;	//没有棋子
};

//吃掉棋子	x/y是实际坐标，不是index
var eatQz = function(clazz,x,y){
	var objArr = $("."+clazz);
	for(var i=0;i<objArr.length;i++){
		var obj = objArr.eq(i);
		if(obj.css("left").replace("px","")==x
				&& obj.css("top").replace("px","")==y){
			obj.remove();
		}
	}
};

//落子	落子，取消当前棋子的选择，并且移除被吃掉的棋子
var luoZi = function(selectedObj,targetX,targetY){
	//符合条件，则落子到目标位置
	selectedObj.css("left",targetX+"px").css("top",targetY+"px");
	//吃子
	if(hasQizi("heif_qz",targetX,targetY)){	//目标位置有黑子
		eatQz("heif_qz",targetX,targetY);
	}
	cancleQize(selectedObj);
	//获取当前棋盘状态，发送给后台，让后台来落子
	getQpStatus();
};

//获取棋盘数组
var getQpStatus = function(){
	var qipanArr = [];
	for(var i=0;i<10;i++){
    	var rows = [];
		for(var j=0;j<9;j++){
//			rows.push("0_一");
			rows.push(0);
		}
		qipanArr.push(rows);
	}	
	var objArr = $(".qz");
	for(var i=0;i<objArr.length;i++){
		var obj = objArr.eq(i);
		var x = (parseInt(obj.css("left").replace("px",""))+xmargin)/xseperate;
		var y = (parseInt(obj.css("top").replace("px",""))+ymargin)/yseperate;
		if(obj.attr("player")=="heifang"){
			qipanArr[y][x] = "0_"+obj.html();	//黑子
		}else{
			qipanArr[y][x] = "1_"+obj.html();	//红子
		}
	}
	
	//console,显示当前棋盘
//	var str = "";
//	for(var i=0;i<qipanArr.length;i++){
//		var rows = qipanArr[i];
//		for(var j=0;j<9;j++){
//			if(j==8){
//				str += rows[j]+"\r\n";
//			}else{
//				str += rows[j]+",";
//			}
//		}
//	}
//	console.log(str);
};