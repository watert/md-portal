
marked.setOptions({
	breaks:true,
	sanitize:false
});
window.App = {};
App.editForm = function(){
	return $(".md-edit-form");
};
App.initPage = function initPage(dom,callback){
	if(!dom)dom=$("#content");
	var model = App.getModel();
	var layout = model.get("layout")||"portal";
	var layoutUrl = "layouts/"+layout+".html";
	// console.log(layoutUrl,model.toJSON());
	dom.load(layoutUrl,function(){
		$("[data-markdown]").each(function(){
			new App.MDSectionView({
				el:this,
				model:model
			});
		});	
		if(_.isFunction(callback))callback();
	});
}
App.PageRouter = Backbone.Router.extend({
	routes:{
		"*page":"page"
	},
	page:function(name){
		App.getModel().setPage(name||false);
	}
});
App.PageModel = Backbone.Model.extend({
	defaults:{	
		id:"md-portal",
		layout:"portal",
		title:"Default Page Title",
		subtitle:"*This is an Empty Page, Edit it.*"
	},
	parse:function(res,options){
		return _.defaults(res,this.defaults);
		return res;
	},
	setPage:function(pagename){
		pagename = pagename||"md-portal";
		var that = this;
		that.trigger("beforeSetPage");
		this.url = "data/item/"+pagename+".json"
		// console.log("setpage",pagename);
		this.clear({silent:true});
		this.fetch({
			success:function(){
				that.trigger("setPage");
			},
			error:function(){
				that.set(that.defaults);
				that.trigger("change");
			}
		});
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
		that.update(that.$el,model);
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
		// console.log("update",key,value,html,content);
		// console.log(html,content);
		content.html(html);
		content.find("a").attr("target","_blank");
		content.find("table").addClass("table");

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
					// console.log("save",e,e.target);
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