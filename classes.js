window.App = {};
App.editForm = function(){
	return $(".md-edit-form");
};
App.initModel = function(){
	var model = new Backbone.Model({
		id:"md-portal",
		subtitle:"test Subtitle"
	});
	model.url = "data/file_rest.php?f=md-portal.json"
	App.model = model;
	model.fetch({
		success:function(){
			model.trigger("sync");
		}
	});	
	return model;
};
App.MDSectionView = Backbone.View.extend({
	tmplActions:'<p class="actions">'
			+'<a href="" class="btn btn-mini btn-edit">Edit</a>'
		+'</p>',
	initialize:function(){
		App.model.on("sync",function(){
			updateDom($el,model);
		});
		$el.on("click",".btn-edit",function(e){
			e.preventDefault();
			editMarkdown($el);
		});
		this.key = $el.attr("data-markdown");
	},
	update:function(){
		var key = this.key;
		var value = App.model.get(key);
		var content = $("<div>",{"class":"md-content"})
		$el.empty();
		if(!value){
			value="*Empty*";
			content.addClass("muted");
		}
		var html = markdown.toHTML(value);
		content.append(html).appendTo($el);
		$el.append(this.tmplActions);
	},
	edit:function(){	
		var key = this.key;
		var content = App.model.get(key);
		var data = {
			key:key,
			content:content||""
		};
		var editForm = App.editForm();
		editForm.ldatabind(data);
		editForm.quickmodal({
			title:editForm.attr("title"),
			actions:{
				Save:function(){
					var _data = editForm.ldata();
					var data = {};data[key] = _data.content;
					App.model.save(data,{success:function(){
						App.model.trigger("sync");
					}});
					editForm.quickmodal("hide");
				},
				Cancel:function(){
					editForm.quickmodal("hide");
				}
			}
		});
	}
});