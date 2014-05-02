function myGallery(g)
{
	var paramSet = { papa: null, // DOM Element, куда привязывают галерею
					NumberInScroll: 3 // количество показываемых картинок в списке
					}, // объект с параметрами вызова конструктора
		canScrolled = 1, // может ли вообще скроллироваться			
		iam,   // ссылка на сам объект
		privMass, // внутренний массив имён изображений
		currentImg; // текущий выбранный элемент	
	
	this.showKrivoPic = function(ci,et){
		$(ci).removeClass('selectedPic');
		$('#curImage').attr('src', $(et).attr('src'));
		$(et).addClass('selectedPic');
		iam.currentImg = et;
	}
	
	this.showPic = function(oEvent){
		iam.showKrivoPic(iam.currentImg, oEvent.target);
	}
	
	this.shiftMyImg = function(direction,ind, contexT){ //первый задает направление, второй - индекс крайнего видимого рисунка
		var str,
			n;		
		 // если не равно нулю
			// скрыть крайний левый 
			if (canScrolled){ 			  
			   if (direction){			  
			    $("#spRoller > img:visible:first",contexT).addClass("noneVisImg");
				$("#cImage_" + paramSet.NumberInScroll - ind - 1,contexT ).addClass("noneVisImg");
				n =  ind + 1; // хитрое приведение типов
				//alert("Пизда! Тут должна появиться картинка = "+ n);				
				$("#cImage_"+n, contexT).removeClass("noneVisImg");
				str = $(iam.currentImg).attr("id");
				n = Number(str.match(/\d+/g)[0]) + 1;
				//alert(n);
				
				}
				else{
				$("#spRoller > img:visible:last",contexT).addClass("noneVisImg");
				n =  ind - 1; // хитрое приведение типов
				$("#cImage_"+n, contexT).removeClass("noneVisImg");
				str = $(iam.currentImg).attr("id");
				n = Number(str.match(/\d+/g)[0]) - 1;	
				}
				
				iam.showKrivoPic(iam.currentImg, $('#cImage_' + n ,contexT));				
			} ;
			
			
		
	
	}

	this.scrollIt = function( oEvent ){
		var strName,
			context_;
		if (oEvent.target.id ==$('#bToL').attr("id")){ // влево
			strName = Number($("#spRoller > img:visible:first", oEvent.target.parentNode).attr("id").match(/\d+/g)[0]);
			if (strName){
				iam.shiftMyImg(0,strName,oEvent.target.parentNode);
			}


		}else{   // вправо		
			//context
			strName = Number($("#spRoller > img:visible:last", oEvent.target.parentNode).attr("id").match(/\d+/g)[0]);
		//	strName = strName.match(/\d+/g)[0]; 
		//	alert(strName);
				if ( Number(strName)+1 < privMass.length ) { 
				//	$("#spRoller > img:visible:first",oEvent.target.parentNode).addClass("noneVisImg");					
					iam.shiftMyImg(1,strName,oEvent.target.parentNode);
				//alert("Можно двигать");
				}
			//if ($(paramSet.papa > dRoller > spRoller:visible:last-child))
			
			
		}
	}
this.getInst = function(args){
	var calcPad,
		temp;
	
	if(args.length<2){
		alert("Должно быть как минимум 2 параметра вызова функции!");
		return null;
	}
	if (iam===undefined){
			if (args[1].isArray == false) {alert(' Не задан массив изображений в параметре конструктора!');return null;} // если второй параметр не является массивом
			else{privMass = args[1]}	
			iam = this;			
			paramSet = args[0];	
			if (paramSet.NumberInScroll>privMass.length){paramSet.NumberInScroll = privMass.length; canScrolled =0}; 
			$('<div></div>',{id: 'dCI'}).addClass('dCenterImg').appendTo(paramSet.papa); // 
			$('<img>',{	src: privMass[0],id:'curImage'}).appendTo($('#dCI'));
			
			$('<div></div>',{id: 'dRoller'}).appendTo(paramSet.papa);
			$('<img>', {src: 'toLeft.png', id: 'bToL'}).appendTo($('#dRoller'));
			$('#bToL').bind('click',iam.scrollIt);
			$('<span></span>', {id: 'spRoller'}).appendTo($('#dRoller'));
			
			
			for(var i=0; i < privMass.length; i+= 1){
			
				$('<img>', {src: privMass[i], id: 'cImage_'+i}).appendTo($('#spRoller'));
				$('#cImage_'+i).addClass('imgCommon');

					if (i >= paramSet.NumberInScroll){  // для тех, которые не должны отображаться
						$('#cImage_'+i).addClass('noneVisImg');
					}
				
			if ($('#cImage_'+i).width() > 100){
					$('#cImage_'+i).width(100);
					$('#cImage_'+i).css("overflow","hidden");				
				} 
				else{
					temp = $('#cImage_'+i).width();
					calcPad = (100 - $('#cImage_'+i).width())/2;
					$('#cImage_'+i).css("paddingLeft",calcPad);
					$('#cImage_'+i).css("paddingRight",calcPad);
					$('#cImage_'+i).css("marginLeft",2);
				}		//*/		
				$('#cImage_'+i).bind('click', iam.showPic);
			}
			$('#cImage_0').addClass("selectedPic");
			iam.currentImg =  $('#cImage_0', paramSet.papa)[0];
			$('<img>', {src: 'toR.png', id: 'bToR'}).appendTo($('#dRoller'));
			$('#bToR').bind('click', iam.scrollIt);
		return iam;
		}else{
		return iam;
		}


}
 return this.getInst(arguments);
}

var 
el = document.getElementById("firstGal"),
ps = {},
b;
ps.papa = el; ps.NumberInScroll = 3;
b = new myGallery(ps,["img/1.jpg","img/2.jpg","img/3.JPG", "img/4.JPG"]);