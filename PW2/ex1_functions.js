import * as THREE from 'three';

export function addBasicBox(group) {
    var boxGeometry = new THREE.BoxGeometry(10, 10, 10);
	var boxMaterial = new THREE.MeshStandardMaterial( { color: (0.5,0.5,0.5), side : THREE.DoubleSide, transparent: true, opacity: 0.025 } );

    group.add(new THREE.GridHelper());
	var boxMesh = new THREE.Mesh( boxGeometry, boxMaterial );
	boxMesh.position.set(0, 5, 0);
  	group.add(boxMesh);
}

export function setupVisualizationSpace(scene) {

    const arrowOrigin = new THREE.Vector3(-5, 0, -5); 
    const arrowLength = 11;
    const headLength = 0.5;
    const headWidth = 0.2;

    var v_LinearRGB = new THREE.Group();
    var v_HSV = new THREE.Group();
    var v_CIEXYZ = new THREE.Group();
    var v_CIExyY = new THREE.Group();
    var v_CIELAB = new THREE.Group();
    var v_CIELCH = new THREE.Group();

    /* ------------------------------------------ LinearRGB ------------------------------------------ */

    addBasicBox(v_LinearRGB);

    v_LinearRGB.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), arrowOrigin, arrowLength, 0xff0000, headLength, headWidth));
    v_LinearRGB.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), arrowOrigin, arrowLength, 0x00ff00, headLength, headWidth));
    v_LinearRGB.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), arrowOrigin, arrowLength, 0x0000ff, headLength, headWidth));

    v_LinearRGB.add(createTextLabel("Red", new THREE.Vector3(7, 0, -5), 'red'));
    v_LinearRGB.add(createTextLabel("Green", new THREE.Vector3(-5, 12, -5), 'green'));
    v_LinearRGB.add(createTextLabel("Blue", new THREE.Vector3(-5, 0, 7), 'blue'));

/* ------------------------------------------ HSV ------------------------------------------ */
    addBasicBox(v_HSV);
    v_HSV.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), arrowOrigin, arrowLength, 0xff0000, headLength, headWidth));
    v_HSV.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), arrowOrigin, arrowLength, 0x00ff00, headLength, headWidth));
    v_HSV.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), arrowOrigin, arrowLength, 0x0000ff, headLength, headWidth));

    v_HSV.add(createTextLabel("Hue", new THREE.Vector3(7, 0, -5), 'red'));
    v_HSV.add(createTextLabel("Sat", new THREE.Vector3(-5, 12, -5), 'green')); // Vertical axis
    v_HSV.add(createTextLabel("Val", new THREE.Vector3(-5, 0, 7), 'blue'));

    /* ------------------------------------------ CIEXYZ ------------------------------------------ */
    addBasicBox(v_CIEXYZ);
    v_CIEXYZ.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), arrowOrigin, arrowLength, 0xff0000, headLength, headWidth));
    v_CIEXYZ.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), arrowOrigin, arrowLength, 0x00ff00, headLength, headWidth));
    v_CIEXYZ.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), arrowOrigin, arrowLength, 0x0000ff, headLength, headWidth));

    v_CIEXYZ.add(createTextLabel("X", new THREE.Vector3(7, 0, -5), 'red'));
    v_CIEXYZ.add(createTextLabel("Y", new THREE.Vector3(-5, 12, -5), 'green')); // Luminance
    v_CIEXYZ.add(createTextLabel("Z", new THREE.Vector3(-5, 0, 7), 'blue'));

    /* ------------------------------------------ CIExyY ------------------------------------------ */
    addBasicBox(v_CIExyY);
    v_CIExyY.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), arrowOrigin, arrowLength, 0xff0000, headLength, headWidth));
    v_CIExyY.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), arrowOrigin, arrowLength, 0x00ff00, headLength, headWidth));
    v_CIExyY.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), arrowOrigin, arrowLength, 0x0000ff, headLength, headWidth));

    v_CIExyY.add(createTextLabel("x", new THREE.Vector3(7, 0, -5), 'red'));
    v_CIExyY.add(createTextLabel("Y", new THREE.Vector3(-5, 12, -5), 'green')); // Brightness
    v_CIExyY.add(createTextLabel("y", new THREE.Vector3(-5, 0, 7), 'blue'));

    /* ------------------------------------------ CIELAB ------------------------------------------ */
    addBasicBox(v_CIELAB);
    v_CIELAB.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), arrowOrigin, arrowLength, 0xff0000, headLength, headWidth));
    v_CIELAB.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), arrowOrigin, arrowLength, 0x00ff00, headLength, headWidth));
    v_CIELAB.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), arrowOrigin, arrowLength, 0x0000ff, headLength, headWidth));

    v_CIELAB.add(createTextLabel("L*", new THREE.Vector3(7, 0, -5), 'red'));
    v_CIELAB.add(createTextLabel("a*", new THREE.Vector3(-5, 12, -5), 'green'));
    v_CIELAB.add(createTextLabel("b*", new THREE.Vector3(-5, 0, 7), 'blue'));

    /* ------------------------------------------ CIELCH ------------------------------------------ */
    addBasicBox(v_CIELCH);
    v_CIELCH.add(new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), arrowOrigin, arrowLength, 0xff0000, headLength, headWidth));
    v_CIELCH.add(new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), arrowOrigin, arrowLength, 0x00ff00, headLength, headWidth));
    v_CIELCH.add(new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), arrowOrigin, arrowLength, 0x0000ff, headLength, headWidth));

    v_CIELCH.add(createTextLabel("L*", new THREE.Vector3(7, 0, -5), 'red'));
    v_CIELCH.add(createTextLabel("C*", new THREE.Vector3(-5, 12, -5), 'green'));
    v_CIELCH.add(createTextLabel("h", new THREE.Vector3(-5, 0, 7), 'blue'));


    scene.add(v_LinearRGB);
    scene.add(v_HSV);
    scene.add(v_CIEXYZ);
    scene.add(v_CIExyY);
    scene.add(v_CIELAB);
    scene.add(v_CIELCH);

    return [v_LinearRGB, v_HSV, v_CIEXYZ, v_CIExyY, v_CIELAB, v_CIELCH];
}

export function createTextLabel(text, position, fillColor) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 128;

    context.fillStyle = 'rgba(0, 0, 0, 0)'; // define a transparent background
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.font = 'Bold 80px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = fillColor;
    context.strokeStyle = 'black';
    context.lineWidth = 4;
    context.strokeText(text, 128, 64);
    context.fillText(text, 128, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.position.copy(position);
    sprite.scale.set(1.5, 0.75, 1); // adjust size a bit

    return sprite;
}