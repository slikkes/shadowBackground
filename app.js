!function(){
	let displayManager = {
		defVal: 0,
		hashId: "",
		bg:null,
		style: ".shbg-item{position: fixed;z-index: 9999;}.shbg-bg{background-color: black; width: 100vw; height: 100%; top: 0; left: 0; opacity: .0; pointer-events: none;}.shbg-range{top: 0; transition-property: left, opacity, width;transition-duration: 0.5s;transition-delay: 2.2s, 2s, 2s;width: 16px;opacity: .4;}.shbg-range:hover{top: 0;left: 0; width: 130px;opacity: 1;transition: none;}",

		start(){
			this.procDefVal();
			this.generateHash();

			this.bg = this.createBackground();
			let r = this.createRange();
			let s = this.createStyle();

			document.body.append(this.bg, r, s);
		},
		
		generateHash(){
			this.hashId = Math.random().toString(36).slice(2)
		},
		createBackground(){
			let bg = document.createElement("div");
			bg.className = this.assignHash("shbg-item shbg-bg");
			bg.style.opacity = this.defVal / 100;

			return bg;
		},
		createRange(){
			let r = document.createElement("input");
			r.type = "range";
			r.className = this.assignHash("shbg-item shbg-range");
			r.value = this.defVal;

			r.oninput = event => {
				this.bg.style.opacity = event.target.value / 100;
				localStorage.setItem("shbg-def-val", event.target.value)
			}

			return r;
		},
		createStyle(){
			let s = document.createElement("style");
			s.innerHTML = this.assignHash(this.style);

			return s;
		},
		assignHash(str){
			return str.replaceAll(/shbg-/g, `shbg-${this.hashId}-`)
		},
		procDefVal(){
			let val = JSON.parse(localStorage.getItem("shbg-def-val"));
			this.defVal = typeof val === 'number' ? val : 0;
		}
	}

	displayManager.start();
}()