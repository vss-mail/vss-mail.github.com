function  myTaskList() // singletone
{
var iam,    //instance of object
	tasks1, // массив строк, который преобразуется в массив TElement
	_tablet,// сслыка на элемент <TABLE>
	_ppSum, // ссылка на строку с суммой
	_bDel,  // кнопка удалить	
	_actTasks, // сумма задач актуальных
	_mas={}, // массив пользовательского типа данных
	_tex;   // ссылка на текстбокс
	

	
	
	
this.waitEnter = function(oEvent){
	if (oEvent.keyCode ==13){
		if (_tex.value !="" ){
			iam.insertNewNode(-1);
	   }
	}
}
this.prepare = function()
{
		var body = document.getElementsByTagName("body")[0],
			addkey;

			_tex = document.createElement("input");
			_tex.type = "text";
			_tex.id = "txtName";
			_tex.name = "txtName";
			_tex.onkeypress = this.waitEnter;				
			body.appendChild(_tex);

			addkey = document.createElement("input");
			addkey.type = "button";
			addkey.id = "badd";
			addkey.onclick = this.onClickHandler;
			addkey.value = "Add new";			
			body.appendChild(addkey);
			
			_tablet = document.createElement("table");
			body.appendChild(_tablet);			
			
			_ppSum = document.createElement("p");	
			body.appendChild(_ppSum);
			
			_bDel = document.createElement("input");
			_bDel.type = "button";
			_bDel.id = "delButton";
			_bDel.value = "Убрать сделанные";
			_bDel.onclick = this.delCompleteTasks;
			body.appendChild(_bDel);
			_actTasks = 0;
}
// удаление сделанных задач
this.delCompleteTasks = function(){
	var i,j,
		secondLevel;
		
		j = 0;
		do{
			secondLevel = tasks1[j].parentNode;
		if (tasks1[j].checked==true){
		
			secondLevel.parentNode.removeChild(tasks1[j].parentNode);
			tasks1.splice(j,1);
			_mas.splice(j,1);
			
			localStorage.foo = JSON.stringify(_mas); // сохранили локал стораж
			j=j-1;
		}
		
		j+=1;		
		}while(j<tasks1.length);



}


this.onClickHandler = function(){
	//var i = -1,
			iam.insertNewNode(-1);

}


this.changeStyle = function(oEvent){
    var i,
		NewTex,
		tsp;
	//	alert(tasks1.length);
	//	alert(tasks1.length);
		if(oEvent.target.checked===true){
		oEvent.target.parentNode.id = "st1";
			for(i=0; i<tasks1.length;i=i+1){
				if(tasks1[i] === oEvent.target){
					_mas[i].ch = 1;
				}		
			}
		_actTasks = _actTasks - 1 ;		
		}
		else{
			for(i=0; i<tasks1.length;i=i+1){
				if(tasks1[i] === oEvent.target){
					_mas[i].ch = 0;
					
				}		
			}
			
			_actTasks = _actTasks + 1;
			oEvent.target.parentNode.id = "st2";
		}
		
					localStorage.foo = JSON.stringify(_mas); // сохранили локал стораж
		
					NewTex = document.createElement("p");				
					NewTex.appendChild(document.createTextNode("vsego zadach = " + _actTasks));				
					_ppSum.parentNode.replaceChild(NewTex,_ppSum);
					_ppSum = NewTex;				

/* 	for( i = 0; i < tasks1.length; i+=1){		
		tsp = tasks1[i].parentNode;		// массив дивов - парент Табля
		if(tasks1[i].checked ===true){		
			tsp.id = "st1";
		}
		else{
			tsp.id = "st2";
		}
	} */
}

this.show = function(){
		var i;
		
	//	alert(_mas.length);
		
		for(i = 0; i < _mas.length; i+=1){
			this.insertNewNode(i); 
			}

		//_actTasks = tasks1.length; // криво
		_ppSum.appendChild(document.createTextNode("vsego zadach = "+ _actTasks));

}

this.addNew = function(s)
	{
		var v = {};
		v.str = s;
		v.ch = 0;
		tasks1.push(s);
		_mas.push(v);
		localStorage.foo = JSON.stringify(_mas);
	}

this.insertNewNode = function( i ){ // -1 если вызов идет из обработчика текстбокса
	 var new_checkbox,
		 new_span,
		 new_tr,
		 NewTex,
		 v = {}, // переменная пользовательского типа содержит строку и признак чекед
		 index_of_mass;
		 
		 index_of_mass = i;
		 //i = i||-1;
		 if (((_tex.value==="")&&(i<0))) { return;}
				
				if(i<0){ 
				
				tasks1.push(_tex.value);
				i = tasks1.length-1;
				
				v.str = tasks1[i];
				v.ch = 0;
				_mas.push(v);	
				}
				
				new_span = document.createElement("div");
				if(_mas[i].ch === 0){
				new_span.id = "st2";}
					else {
					new_span.id = "st1";_actTasks = _actTasks - 1; }

				new_checkbox = document.createElement("input");
				new_checkbox.type = "checkbox";			
				new_checkbox.onclick =this.changeStyle;
				
				new_checkbox.checked = _mas[i].ch;
				
				new_span.appendChild(new_checkbox);			
				
				
				new_span.appendChild(document.createTextNode(_mas[i].str));
		 
				
				
				_tablet.appendChild(new_span);
				// сохраняем в массиве
				

				localStorage.foo = JSON.stringify(_mas);	
				
				tasks1[i] = new_checkbox;
				//_tablet.appendChild(new_tr);
				
				_tex.value = "";
				
				_actTasks= _actTasks+1;
				
				if (index_of_mass < 0){
					NewTex = document.createElement("p");				
					NewTex.appendChild(document.createTextNode("Всего задач = " + _actTasks));				
					_ppSum.parentNode.replaceChild(NewTex,_ppSum);
					_ppSum = NewTex;				
				}
				
				
}
	  
 
 
this.getIns = function(){
	if (iam == undefined){
		iam = this;
		_mas = localStorage.foo ? JSON.parse(localStorage.foo) : [];
		tasks1 = [];
		return iam;  
	}
		else  return iam; 
}

 return this.getIns(); 
}

//localStorage.clear();
 var temptl = new myTaskList; 
 
 temptl.prepare();
// temptl.addNew('zadacha 1');
// temptl.addNew('zadacha 2');
 //temptl.addNew('zadacha 3');
 temptl.show();
 
 //var t2 = new myTaskList;
 //if (temptl ===t2){alert("Равны");}else{alert("Не равно");}
 
 
 
