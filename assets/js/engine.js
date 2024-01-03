import * as Utils from "/assets/js/utils.js";


export let engine;

export function loadEngine() {
	engine = new Engine();
}

class Engine {
	// region VARIABLES

	board = null;
	camera = {
		rotationX: 60,
		rotationY: 0,
		rotationZ: 45
	};
	cursor = {
		mouseDown: false,
		mouseSpeed: 10,
		initPositionX: 0,
		initPositionY: 0
	}

	// endregion VARIABLES

	// region CONSTRUCTOR

	constructor() {
		this.initBoard();
		this.initControls();
	}

	// endregion CONSTRUCTOR

	// region METHODS
	// region INIT

	initBoard() {
		this.board = document.getElementById("board");
	}

	initControls() {
		document.addEventListener('mousedown', (e) => {
			this.downListener(e);
		});
		document.addEventListener('mouseup', (e) => {
			this.upListener(e);
		});
		document.addEventListener('mousemove', (e) => {
			this.moveListener(e);
		});
	}

	// endregion INIT

	// region CURSOR

	downListener(event) {
		this.cursor.initPositionX = event.clientX;
		this.cursor.initPositionY = event.clientY;
		this.cursor.mouseDown = true;
	}

	upListener(event) {
		let vectorX = event.clientX - this.cursor.initPositionX;
		let vectorY = event.clientY - this.cursor.initPositionY;

		this.cursor.mouseDown = false;
		this.camera.rotationZ = this.getRotationZ(vectorX);
	}

	moveListener(event) {
		if (this.cursor.mouseDown === true) {
			this.dragMouse(event);
		}
	}

	dragMouse(event) {
		let vectorX = event.clientX - this.cursor.initPositionX;
		let vectorY = event.clientY - this.cursor.initPositionY;

		let newRotationZ = this.getRotationZ(vectorX);

		this.updateBoardRotation(this.camera.rotationX, this.camera.rotationY, newRotationZ);
	}

	getRotationZ(vector) {
		return (this.camera.rotationZ - (vector * this.cursor.mouseSpeed / Utils.MAX_MOUSE_SPEED));
	}

	// endregion CURSOR

	// region BOARD

	updateBoardRotation (rotationX, rotationY, rotationZ) {
		this.board.style.transform = "rotateX(" + rotationX + "deg) rotateY(" + rotationY + "deg) rotateZ(" + rotationZ + "deg)";
	}

	// endregion BOARD
}