var heiindex = ["܇","��","��","ʿ","��","ʿ","��","��","܇"];
var hongindex = ["܇","�R","��","��","˧","��","��","�R","܇"];
var xseperate = 110;
var yseperate = 110;
//��������
var qipan = [];
$(function(){
	var width = $(window).width();
	var height = $(window).height();
	$("#content").css("top","200px").css("left",(width*0.05)/2+"px");
	
	//��ʼ������
	initQipan();
	
	//������ӵ���¼�������¼�ֻ�Ժ췽��Ч����Ϊ�ڷ��ǵ��ԣ�����Ҫ���
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
	
	//ÿ�����ӵĵ���¼�
	$(".danyuange").click(function(){
		var selectedObj = $("div[status='selected']");
		var currentObj = $(this);
		checkDownQizi(selectedObj,currentObj);
	});
});

//ѡ������
var selectedQizi = function(obj){
	obj.addClass("qz_selected");
	obj.attr("status","selected");
};

//ȡ��ѡ��
var cancleQize = function(obj){
	obj.removeClass("qz_selected");
	obj.attr("status","notSelected");
};


//��ʼ������
var initQipan = function(){
	//��ʼ����������
    for(var i=0;i<10;i++){
    	var rows = [];
		for(var j=0;j<9;j++){
			var obj = {};
			obj.x = j*xseperate -25;
			obj.y = i*yseperate -40;
			rows.push(obj);
		}
		qipan.push(rows);
	}
    //��ʼ��ÿ������
    for(var i=0;i<qipan.length;i++){
    	for(var j=0;j<qipan[i].length;j++){
    		var point = qipan[i][j];
    		$("<div class='danyuange' point='"+i+"-"+j+"' style='left:"+point.x+"px;top:"+point.y+"px;'>&nbsp;</div>").appendTo("#content");
    	}
    }
    
	//��ʼ������
	for(var i=0;i<qipan.length;i++){
		for(var j=0;j<qipan[i].length;j++){
			var point = qipan[i][j];
			if(i==0){	//�ڷ�
				$("<div class='qz heif_qz' player='heifang' style='left:"+point.x+"px;top:"+point.y+"px;'>"+heiindex[j]+"</div>").appendTo("#content");
			}
			if(i==2 && (j==1||j==7)){	//�ڷ���
				$("<div class='qz heif_qz' player='heifang' style='left:"+point.x+"px;top:"+point.y+"px;'>��</div>").appendTo("#content");
			}
			if(i==3 && (j%2==0)){	//�ڷ���
				$("<div class='qz heif_qz' player='heifang' style='left:"+point.x+"px;top:"+point.y+"px;'>��</div>").appendTo("#content");
			}
			if(i==9){	//�췽
				$("<div class='qz hongf_qz' player='hongfang' style='left:"+point.x+"px;top:"+point.y+"px;'>"+hongindex[j]+"</div>").appendTo("#content");
			}
			if(i==7 && (j==1||j==7)){	//�췽��
				$("<div class='qz hongf_qz' player='hongfang' style='left:"+point.x+"px;top:"+point.y+"px;'>��</div>").appendTo("#content");
			}
			if(i==6 && (j%2==0)){	//�췽��
				$("<div class='qz hongf_qz' player='hongfang' style='left:"+point.x+"px;top:"+point.y+"px;'>��</div>").appendTo("#content");
			}
		}
	}
};

//У����򣬼���ѡ�������Ƿ�����䵽Ŀ��λ��
var checkDownQizi = function(selectedObj,targetObj){
	var val = selectedObj.html();
	if(val=="܇"){
		checkJuAndExecutor(selectedObj,targetObj);
	}else if(val=="�R"){
		checkMaAndExecutor(selectedObj,targetObj);
	}else if(val=="��"){
		checkXiangAndExecutor(selectedObj,targetObj);
	}else if(val=="��"){
		checkShiAndExecutor(selectedObj,targetObj);
	}else if(val=="˧"){
		checkShuaiAndExecutor(selectedObj,targetObj);
	}else if(val=="��"){
		checkBingAndExecutor(selectedObj,targetObj);
	}else if(val=="��"){
		checkPaoAndExecutor(selectedObj,targetObj);
	}
};

//����܇
var checkJuAndExecutor = function(selectedObj,targetObj){
	var selectedX = selectedObj.css("left").replace("px","");
	var selectedY = selectedObj.css("top").replace("px","");
	var targetX = targetObj.css("left").replace("px","");
	var targetY = targetObj.css("top").replace("px","");
	if(selectedX==targetX){		//����
		
	}else if(selectedY==targetY){	//����
		
	}else{
		return;
	}
	//���������������ӵ�Ŀ��λ��
	selectedObj.css("left",targetX+"px").css("top",targetY+"px");
	cancleQize(selectedObj);
};

//������
var checkMaAndExecutor = function(selectedObj,targetObj){
	var selectedX = parseInt(selectedObj.css("left").replace("px",""));
	var selectedY = parseInt(selectedObj.css("top").replace("px",""));
	var targetX = parseInt(targetObj.css("left").replace("px",""));
	var targetY = parseInt(targetObj.css("top").replace("px",""));
	//�ж����ߵ�·���Ƿ���ȷ���Ƿ��а����ȵ����
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
	//���������������ӵ�Ŀ��λ��
	selectedObj.css("left",targetX+"px").css("top",targetY+"px");
	cancleQize(selectedObj);
};

//������
var checkXiangAndExecutor = function(selectedObj,targetObj){
	
};

//������
var checkShiAndExecutor = function(selectedObj,targetObj){
	
};

//����˧
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
	//���������������ӵ�Ŀ��λ��
	selectedObj.css("left",targetX+"px").css("top",targetY+"px");
	cancleQize(selectedObj);
};

//�����
var checkBingAndExecutor = function(selectedObj,targetObj){
	
};

//������
var checkPaoAndExecutor = function(selectedObj,targetObj){
	var selectedX = selectedObj.css("left").replace("px","");
	var selectedY = selectedObj.css("top").replace("px","");
	var targetX = targetObj.css("left").replace("px","");
	var targetY = targetObj.css("top").replace("px","");
	if(selectedX==targetX){		//����
		
	}else if(selectedY==targetY){	//����
		
	}else{
		return;
	}
	//���������������ӵ�Ŀ��λ��
	selectedObj.css("left",targetX+"px").css("top",targetY+"px");
	cancleQize(selectedObj);
};

//����ָ��λ���Ƿ�������
var hasQizi = function(clazz,x,y){
	var objArr = $("."+clazz);
	for(var i=0;i<objArr.length;i++){
		var obj = objArr.eq(i);
		if(obj.css("left").replace("px","")==x
				&& obj.css("top").replace("px","")==y){
			return true;		//ָ��λ��������
		}
	}
	return false;	//û������
};