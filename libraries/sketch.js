/*
By Okazz
*/
let colors = [];
let ctx;
let centerX, centerY;
let shapes = [];
let canSpawn = true;
let selectedMenu = null;
let iframeUrl = '';
let textY = 0;
let textDirection = 1;

function setup() {
	createCanvas(windowWidth, windowHeight); // 滿版畫布
	rectMode(CENTER);
	colorMode(HSB, 360, 100, 100, 100);
	ctx = drawingContext;
	centerX = width / 2;
	centerY = height / 2;
	divideRect(width / 2, -height / 2, width, height);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	centerX = width / 2;
	centerY = height / 2;
}

function drawMenu() {
	push();
	noStroke();
	colorMode(RGB, 255, 255, 255, 255);
	fill(200, 200, 200, 60);
	rectMode(CORNER);
	rect(0, 0, 180, height);
	colorMode(HSB, 360, 100, 100, 100);
	textSize(28);
	textAlign(LEFT, TOP);

	let menuItems = ["回到首頁", "單元一", "教育測驗", "期中筆記", "自我介紹", "淡江大學"];
	let itemY = [50, 110, 170, 230, 290, 410]; // 調整淡江大學位置，為子選單預留空間
	let itemHeight = 40;
	let showSubMenu = selectedMenu === 4;
	for (let i = 0; i < menuItems.length; i++) {
		let x = 30, y = itemY[i];
		if (mouseX >= 0 && mouseX <= 180 && mouseY >= y && mouseY <= y + itemHeight) {
			fill(0, 100, 100); // 紅色文字（HSB紅色）
			text(menuItems[i], x, y);
		} else {
			fill(30, 100, 100); // 亮橘色
			text(menuItems[i], x, y);
		}
		// 滑鼠點擊選單
		if (mouseIsPressed && mouseX >= 0 && mouseX <= 180 && mouseY >= y && mouseY <= y + itemHeight) {
			selectedMenu = i;
			if (i === 0) {
				// 回到首頁 - 關閉所有頁面
				iframeUrl = '';
				let iframe = document.getElementById('custom-iframe');
				if (iframe) iframe.remove();
				let closeBtn = document.getElementById('iframe-close-btn');
				if (closeBtn) closeBtn.remove();
			}
			if (i === 1) {
				iframeUrl = 'https://413737171.github.io/1024/';
			}
			if (i === 2) {
				iframeUrl = 'https://413737171.github.io/5555/';
			}
			if (i === 3) {
				iframeUrl = 'https://hackmd.io/@sita1024/HJ-bEFgxZx';
			}
			if (i === 5) {
				iframeUrl = 'https://www.tku.edu.tw/';
			}
			// 自我介紹不自動關閉 iframe，只能透過叉叉按鈕關閉
			// 這裡可根據需求設定其他按鈕的 iframeUrl 或功能
		}
	}
	// 顯示自我介紹子選單
	if (showSubMenu) {
		let subItems = ["猜猜我是誰"];
		let subY = itemY[4] + itemHeight + 10;
		let subHeight = 32;
		textSize(22); // 比主選單小
		for (let j = 0; j < subItems.length; j++) {
			let x = 50, y = subY + j * (subHeight + 8);
			if (mouseX >= 0 && mouseX <= 180 && mouseY >= y && mouseY <= y + subHeight) {
				fill(200, 0, 100); // 子選單高亮
				text(subItems[j], x, y);
			} else {
				fill(30, 80, 80);
				text(subItems[j], x, y);
			}
			// 子選單點擊事件
			if (mouseIsPressed && mouseX >= 0 && mouseX <= 180 && mouseY >= y && mouseY <= y + subHeight) {
				if (j === 0) { // 猜猜我是誰
					iframeUrl = 'https://413737171.github.io/-who-/';
				}
			}
		}
		textSize(28); // 恢復主選單字體
	}
	pop();
}

function drawIframe() {
	if (iframeUrl) {
		let w = width * 0.8;
		let h = height * 0.8;
		let x = (width - w) / 2;
		let y = (height - h) / 2;
		let iframe = document.getElementById('custom-iframe');
		let closeBtn = document.getElementById('iframe-close-btn');
		if (!iframe) {
			iframe = document.createElement('iframe');
			iframe.id = 'custom-iframe';
			iframe.style.position = 'absolute';
			iframe.style.left = x + 'px';
			iframe.style.top = y + 'px';
			iframe.style.width = w + 'px';
			iframe.style.height = h + 'px';
			iframe.style.border = 'none'; // 移除橘色外框
			iframe.style.zIndex = 9999;
			document.body.appendChild(iframe);
			iframe.src = iframeUrl;
		} else {
			// 只在 URL 改變時才重新設定 src，避免重複載入
			if (iframe.src !== iframeUrl) {
				iframe.src = iframeUrl;
			}
			// 更新位置和大小（視窗改變時需要）
			iframe.style.left = x + 'px';
			iframe.style.top = y + 'px';
			iframe.style.width = w + 'px';
			iframe.style.height = h + 'px';
		}

		if (!closeBtn) {
			closeBtn = document.createElement('button');
			closeBtn.id = 'iframe-close-btn';
			closeBtn.innerText = '✕';
			closeBtn.style.position = 'absolute';
			closeBtn.style.left = (x + w - 40) + 'px';
			closeBtn.style.top = (y + 10) + 'px';
			closeBtn.style.width = '30px';
			closeBtn.style.height = '30px';
			closeBtn.style.fontSize = '22px';
			closeBtn.style.background = 'rgba(0,0,0,0.7)';
			closeBtn.style.color = '#fff';
			closeBtn.style.border = 'none';
			closeBtn.style.borderRadius = '15px';
			closeBtn.style.cursor = 'pointer';
			closeBtn.style.zIndex = 10000;
			closeBtn.onclick = function() {
				iframeUrl = '';
				selectedMenu = null;
				let iframe = document.getElementById('custom-iframe');
				if (iframe) iframe.remove();
				this.remove();
			};
			document.body.appendChild(closeBtn);
		} else {
			closeBtn.style.left = (x + w - 40) + 'px';
			closeBtn.style.top = (y + 10) + 'px';
		}
	} else {
		let iframe = document.getElementById('custom-iframe');
		if (iframe) iframe.remove();
		let closeBtn = document.getElementById('iframe-close-btn');
		if (closeBtn) closeBtn.remove();
	}
}

function draw() {
	background('#000000');
	// 在背景正中間加上會移動的「淡江大學」
	push();
	textAlign(CENTER, CENTER);
	textSize(150000000); // 字體調得更大
	fill(30, 100, 100); // 亮橘色（HSB）
	textFont('Microsoft JhengHei', 1); // 微軟正黑體，可自行更換
	// 計算上下移動的位置
	textY += textDirection * 2;
	if (textY > 30 || textY < -30) { // 移動範圍縮小到30像素
		textDirection *= -1; // 改變移動方向
	}
	text('淡江大學', width / 2, height / 2 + textY);
	pop();
	canSpawn = true;
	for (let i of shapes) {
		i.run();
	}
	for (let i = 0; i < shapes.length; i++) {
		let s = shapes[i];
		if (s.isDead) {
			shapes.splice(i, 1);
		}
	}
	for (let i = 0; i < shapes.length; i++) {
		let s = shapes[i];
		if ((s.currentY - (s.h / 2) + s.velocityY) < 0) {
			canSpawn = false;
			break;
		}
	}
	if (canSpawn) {
		divideRect(width / 2, -height/2, width, height);
	}
	if (mouseX < 100) {
		drawMenu();
	}
	drawIframe();
}

function divideRect(x, y, w, h) {
	let ww = random(0.25, 0.75) * w;
	let hh = random(0.25, 0.75) * h;
	let xx = x - (w / 2) + ww;
	let yy = y - (h / 2) + hh;
	let minSize = width * 0.1;
	if (minSize < w && minSize < h) {
		if (h < w) {
			divideRect(xx - ww / 2, y, ww, h);
			divideRect(xx + (w - ww) / 2, y, (w - ww), h);
		} else {
			divideRect(x, yy - hh / 2, w, hh);
			divideRect(x, yy + (h - hh) / 2, w, h - hh);
		}
	} else {
		shapes.push(new Shape(x, y, w, h));
	}
}

function easeInOutQuart(x) {
	return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}


class Shape {
	constructor(x, y, w, h) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.currentX = x;
		this.currentY = y;
		this.direction = PI*1.5;
		this.shiftX = width * cos(this.direction);
		this.shiftY = width * sin(this.direction);
		this.shiftX0 = this.shiftX;
		this.shiftY0 = this.shiftY;
		this.shiftX1 = 0;
		this.shiftY1 = 0;
		this.velocityY = height / 500;
		this.timer = 0;
		this.phase1 = 180;
		this.border = height * random(0.2, 0.3);
		this.isDead = false;
		this.scaleX = 1;
		this.scaleY = 1;
	}

	show() {
		push();
		translate(this.currentX, this.currentY);
		scale(this.scaleX, this.scaleY);
		stroke('#fff');
		fill('#fff');
		rect(this.shiftX, this.shiftY, this.w, this.h);
		pop();
	}

	update() {
		this.currentY += this.velocityY
		if (this.currentY > this.border) {
			if (0 < this.timer && this.timer < this.phase1) {
				let nrm = norm(this.timer, 0, this.phase1 - 1);
				let ease = easeInOutQuart(nrm);
				this.shiftX = lerp(this.shiftX0, this.shiftX1, ease);
				this.shiftY = lerp(this.shiftY0, this.shiftY1, ease);

				if (this.direction == 0 || this.direction == PI) {
					this.scaleX = lerp(1, 2, sin(ease * PI));
					this.scaleY = lerp(1, 0, sin(ease * PI));
				} else {
					this.scaleY = lerp(1, 2, sin(ease * PI));
					this.scaleX = lerp(1, 0, sin(ease * PI));
				}
			}
			this.timer++;
		}

		if ((this.currentY - (this.h / 2)) > height) {
			this.isDead = true;
		}
	}

	run() {
		this.show();
		this.update();
	}
}