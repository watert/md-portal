window.App = {};
App.editForm = function(){
	return $(".md-edit-form");
};
App.PageModel = Backbone.Model.extend({
	defaults:{	
		id:"md-portal",
		subtitle:"*This is an Empty Page, Edit it.*"
	},
	setPage:function(pagename){
		pagename = pagename||"md-portal";
		var that = this;
		this.url = "data/file_rest.php?f="+pagename+".json"
		// console.log("setpage",pagename);
		this.clear({silent:true});
		this.fetch({error:function(){
			console.log("error");
			that.set(that.defaults);
			that.trigger("change");
		}});
		return this;
	}
});
App.getModel = function(name){
	if(App.model){
		var model = App.model;
		// if(name)model.setPage(name)
		return model;
	}

	var model = new App.PageModel();
	// model.setPage();

	App.model = model;
	return model;
};
App.MDSectionView = Backbone.View.extend({
	tmplActions:'<p class="actions">'
			+'<a href="" class="btn btn-mini btn-edit">Edit</a>'
		+'</p>',
	initialize:function(options){
		var that = this;
		var $el = this.$el;
		this.initDom();
		this.key = $el.attr("data-markdown");
		if(options.model)this.setModel(options.model);
		$el.on("click",".btn-edit",function(e){
			e.preventDefault();
			that.edit();
		});
	},
	setModel:function(model){
		var that = this;
		model.on("change",function(){
			that.update(that.$el,model);
		});
	},
	initDom:function(){
		var content = this.$(".md-content");
		if(!content.length){
			content = $("<div>",{"class":"md-content"})
				.appendTo(this.$el);
		}
		if(!this.$(".actions").length){
			content.after(this.tmplActions);
		}
	},
	update:function(){
		var key = this.key;
		var value = this.model.get(key);
		// console.log();

		var content = this.$(".md-content");
		if(!value){
			// console.warn("empty value",key);
			value="*Empty*";
			content.addClass("muted");
		}else {
			content.removeClass("muted");
		}
		var html = marked.parse(value);
		console.log("update",key,value,html,content);
		// console.log(html,content);
		content.html(html);
	},
	edit:function(){	
		var key = this.key;
		var content = this.model.get(key);
		var data = {
			key:key,
			content:content||""
		};
		var editForm = App.editForm();
		editForm.ldatabind(data);
		editForm.quickmodal({
			title:editForm.attr("title"),
			actions:{
				Save:function(e){
					console.log("save",e,e.target);
					// $(e.target).addClass("btn-primary");

					var _data = editForm.ldata();
					var data = {};data[key] = _data.content;
					App.model.save(data);
					editForm.quickmodal("hide");
				},
				Cancel:function(e){
					editForm.quickmodal("hide");
				}
			},
			callback:function(dom){
				dom.find("[data-action=Save]")
					.addClass("btn-primary");
			}
		});
	}
});