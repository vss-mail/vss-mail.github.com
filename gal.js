function myGallery(g)
{
	var paramSet = { papa: null, // DOM Element, куда привязывают галерею
					NumberInScroll: 3, // количество показываемых картинок в списке
					wid:100,
					hei:100,
					cont:null
					}, // объект с параметрами вызова конструктора
		canScrolled = 1, // может ли вообще скроллироваться			
		iam,   // ссылка на сам объект
		privMass, // внутренний массив имён изображений
		currentImg; // текущий выбранный элемент	
	
	this.showKrivoPic = function(tec, et){
		var s;
		
			
		
		$(tec).removeClass('selectedPic');
		//alert($(iam.currentImg).attr('id'));
		s = Number($(et, paramSet.papa).attr("id").match(/\d+/g)[0]);
			if (!s){$("#bToL", paramSet.papa).removeClass('itCanScrolled'); }
				else{$("#bToL", paramSet.papa).addClass('itCanScrolled');}
		
		if(s== privMass.length-1){$("#bToR", paramSet.papa).removeClass('itCanScrolled'); }
		else{$("#bToR", paramSet.papa).addClass('itCanScrolled');
		}
		$('#curImage',paramSet.papa).attr('src', $(et).attr('src'));
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
					  
			   if (direction){			  
			    $("#spRoller > img:visible:first",contexT).addClass("noneVisImg");
				//$("#cImage_" + paramSet.NumberInScroll - ind - 1,contexT ).addClass("noneVisImg");
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
			
	}

	this.scrollIt = function( oEvent ){
		var strName,
			sss;
			//alert($(oEvent.target).hasClass('itCanScrolled')
		if(!$(oEvent.target).hasClass('itCanScrolled')){return;}
			  sss = Number($(iam.currentImg).attr("id").match(/\d+/g)[0]);
		if (oEvent.target.id =='bToL'){ // влево
			strName = Number($("#spRoller > img:visible:first", oEvent.target.parentNode).attr("id").match(/\d+/g)[0]);
			if (strName){
				iam.shiftMyImg(0,strName,oEvent.target.parentNode); // смещение с сокрытием картинки
			}else{ // проверить случай когда идёт смещение без скрытия картинки
			  // sss = alert($(iam.currentImg).attr("id"));
			 // alert(sss-1);
				if(sss!==strName){ sss= sss-1; iam.showKrivoPic(iam.currentImg, $("#cImage_"+sss,oEvent.target.parentNode));};
			    //sss = alert(iam.currentImg.id);
			}
		}else{   // вправо		
			//context
			strName = Number($("#spRoller > img:visible:last", oEvent.target.parentNode).attr("id").match(/\d+/g)[0]);
			if (sss< strName) {         }
		//	strName = strName.match(/\d+/g)[0]; 
		//	alert(strName);
				if ( strName+1 < privMass.length ) { 
				//	$("#spRoller > img:visible:first",oEvent.target.parentNode).addClass("noneVisImg");					
					iam.shiftMyImg(1,strName,oEvent.target.parentNode);
				//alert("Можно двигать");
				}else{ // если равно
				if (sss!==strName){
				sss=sss+1; iam.showKrivoPic(iam.currentImg, $("#cImage_"+sss,oEvent.target.parentNode));
				}
				
				}
			//if ($(paramSet.papa > dRoller > spRoller:visible:last-child))
			
			
		}
	}
this.getInst = function(args){
	var calcPad,
		calcHei, // вычисляемая высота
		caclWid, // вычисляемая ширина
		temp;
	
	if(args.length<2){
		alert("Должно быть как минимум 2 параметра вызова функции!");
		return null;
	}
	
			if (args[1].isArray == false) {alert(' Не задан массив изображений в параметре конструктора!');return null;} // если второй параметр не является массивом
			else{privMass = args[1]}	
			iam = this;			
			paramSet = args[0];	
			
			paramSet.papa = $('<div></div>', {id:'myContainer'}).css('width', paramSet.wid).css('height', paramSet.hei).appendTo(paramSet.cont); // создали контейнер
			//alert($(paramSet.papa).attr("id"));
			//paramSet.papa = $('#myContainer'); // переопределили родительский нод
			calcPad = (paramSet.hei *0.8) - 10; // 60 % от высоты контейнера		и по 2 пиксела для паддинга	
			$('<div></div>',{id: 'dCI'}).css('height',calcPad+10).appendTo(paramSet.papa); // для паддинга кривизна 			
			$('<img></img>', {src: privMass[0],id:'curImage'}).css('height',calcPad).appendTo($('#dCI', paramSet.papa));
			 // 
			//$('<img>',{	src: privMass[0],id:'curImage'}).appendTo($('#dCI'));			
			if (paramSet.NumberInScroll>privMass.length){
			paramSet.NumberInScroll = privMass.length;}
			calcHei = (paramSet.hei *0.2)- 10; 
			calcWid = paramSet.wid / (paramSet.NumberInScroll +2); // + два для кнопок влево и вправо
			$('<div></div>',{id: 'dRoller'}).css('height',calcHei+10).appendTo(paramSet.papa);
			$('<img>', {src: 'toLeft.png', id: 'bToL'}).css('height',calcHei).css('width',calcWid).appendTo($('#dRoller', paramSet.papa));
			$('#bToL', paramSet.cont).bind('click',iam.scrollIt);
			$('<span></span>', {id: 'spRoller'}).appendTo($('#dRoller',paramSet.papa));		
			
			for(var i=0; i < privMass.length; i+= 1){
				$('<img>', {src: privMass[i], id: 'cImage_'+i}).css('height',calcHei).css('width',calcWid-6).appendTo($('#spRoller', paramSet.papa));
				$('#cImage_'+i,paramSet.cont).addClass('imgCommon');
					if (i >= paramSet.NumberInScroll){  // для тех, которые не должны отображаться
						$('#cImage_'+i, paramSet.papa).addClass('noneVisImg');
					}
				
			// if ($('#cImage_'+i).width() > 100){
					// $('#cImage_'+i).width(100);
					// $('#cImage_'+i).css("overflow","hidden");				
				// } 
				// else{
					// temp = $('#cImage_'+i).width();
					// calcPad = (100 - $('#cImage_'+i).width())/2;
					// $('#cImage_'+i).css("paddingLeft",calcPad);
					// $('#cImage_'+i).css("paddingRight",calcPad);
					// $('#cImage_'+i).css("marginLeft",2);
				// }		//*/		
				$('#cImage_'+i,paramSet.papa).bind('click', iam.showPic);
			}
			$('#cImage_0',paramSet.papa).addClass("selectedPic");
			iam.currentImg =  $('#cImage_0', paramSet.papa)[0];
			$('<img>', {src: 'toR.png', id: 'bToR'}).css('height',calcHei).css('width',calcWid).addClass("itCanScrolled").appendTo($('#dRoller',paramSet.papa));
			//if (paramSet.NumberInScroll==privMass.length){canScrolled =0;$('#bToR').removeClass("itCanScrolled");}; 
			
			$('#bToR',paramSet.cont).bind('click', iam.scrollIt);
		return iam;
		


}
 return this.getInst(arguments); // описан не как синглтон
}

var 
el = document.getElementById("firstGal"),
bl = document.getElementById("secGal"),
ps = {},
ss={},
b;
ps.cont = el; ps.NumberInScroll = 3; ps.wid = 800; ps.hei = 400;
b = new myGallery(ps,["img/1.jpg","img/2.jpg","img/3.JPG", "img/4.JPG"]);


ss.cont = bl; ss.NumberInScroll = 3; ss.wid = 400; ss.hei = 200;
c= new myGallery(ss,["img/1.jpg","img/2.jpg","img/3.JPG", "img/4.JPG"]);