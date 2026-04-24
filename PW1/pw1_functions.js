import * as THREE from 'three';

export function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

export function makeInstance(scene, texture, geometry, color, x) {
    const material = new THREE.MeshBasicMaterial({color, map: texture});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
  }

export function placeObject(scene, material, geometry, castShadow, receiveShadow, position, rotation, scale) {
  const o = new THREE.Mesh( geometry, material );
  scene.add(o);

  o.position.set(position.x, position.y, position.z);
  o.rotation.set(rotation.x, rotation.y, rotation.z);
  o.scale.set(scale.x, scale.y, scale.z);

  o.castShadow = castShadow;
  o.receiveShadow = receiveShadow;

  return o;
}

export function addKitchen(scene) {

    /* ---------- DEFINE TEXTURES ---------- */
    const loader = new THREE.TextureLoader();
    const woodTexture = loader.load('./wood.jpg');
    const marbleTexture = loader.load('./marble.jpg'); marbleTexture.repeat.set(5,1); marbleTexture.wrapS = THREE.RepeatWrapping; marbleTexture.wrapT = THREE.RepeatWrapping;
    const plasterTexture = loader.load('./plaster.jpg');
    const glassTexture = loader.load('./glass.jpg');
    const plateTexture = loader.load('./plate.png');
    const counterTexture = loader.load('./counter.jpg');  counterTexture.repeat.set(5,1); counterTexture.wrapS = THREE.RepeatWrapping; counterTexture.wrapT = THREE.RepeatWrapping;
    /* ---------- DEFINE MATERIALS ---------- */
    const woodMaterial = new THREE.MeshStandardMaterial ( { color: 0xffffff, map: woodTexture, side: THREE.DoubleSide, roughness: 0.4 } );
    const marbleMaterial = new THREE.MeshStandardMaterial ( { color: 0xffffff, map: marbleTexture, side: THREE.DoubleSide, roughness: 0.4, metalness: 0.4 } );
    const plasterMaterial = new THREE.MeshStandardMaterial ( { color: 0xffffff, map: plasterTexture, side: THREE.DoubleSide, roughness: 1, metalness: 0 } );
    const glassMaterial = new THREE.MeshStandardMaterial ( { color: 0xffffff, map: glassTexture, side: THREE.DoubleSide, transparent: true, opacity: 0.5 } );
    const plateMaterial = new THREE.MeshStandardMaterial ( { color: 0xffffff, map: plateTexture, side: THREE.DoubleSide } );
    const counterMaterial = new THREE.MeshStandardMaterial ( { color: 0xffffff, map: counterTexture, side: THREE.DoubleSide, roughness: 0.25, metalness: 0.4 } );
    
    /* ---------- DEFINE GEOMETRIES ---------- */
    const planeGeometry = new THREE.PlaneGeometry( 1, 1 );
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    const glassGeometry = new THREE.CylinderGeometry( 0.5, 0.3, 1, 32 );
    const cylinderGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 1, 32 );

    /* ---------- ADD THE KITCHEN ---------- */
    /* ---------- ADD GROUND ---------- */
    const groundPlane = placeObject(scene, woodMaterial, planeGeometry, false, true, new THREE.Vector3(0,0,0), new THREE.Vector3(Math.PI / 2, 0, 0), new THREE.Vector3(1,1,1));
    /* ---------- ADD WALLS ---------- */
    const wall1 = placeObject(scene, plasterMaterial, boxGeometry, false, true, new THREE.Vector3(-0.5,0.5,0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.05,1,1));
    const wall2 = placeObject(scene, plasterMaterial, boxGeometry, false, true, new THREE.Vector3(0,0.5,-0.5), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(0.05,1,1));
    /* ---------- ADD KITCHEN COUNTER ---------- */
    const counter = placeObject(scene, marbleMaterial, boxGeometry, false, true, new THREE.Vector3(-0.35,0.125,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,0.25,0.3));
    const counterTop = placeObject(scene, counterMaterial, boxGeometry, false, true, new THREE.Vector3(-0.35,0.25,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1.02,0.035,0.32));
    /* ---------- ADD OBJECTS (GLASS AND PLATE) ---------- */
    const glass = placeObject(scene, glassMaterial, glassGeometry, true, false, new THREE.Vector3(-0.35,0.3,-0.1), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(0.1,0.1,0.1));
    const plate = placeObject(scene, plateMaterial, cylinderGeometry, true, false, new THREE.Vector3(-0.35,0.27,-0.35), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(0.15,0.01,0.15));

    /* ------- ADD A BASIC AMBIENT LIGHT --------- */
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    return [wall1, wall2];
}

export function addRobot(scene, addAxesHelper, hoveringHands) {
  
  /* ---------- DEFINE TEXTURE ---------- */
  const loader = new THREE.TextureLoader();
  const metalTexture = loader.load('./metal.jpg');
  /* ---------- DEFINE MATERIAL ---------- */
  const metalMaterial = new THREE.MeshStandardMaterial ( { color: 0xffffff, map: metalTexture, side: THREE.DoubleSide, roughness: 0.262, metalness: 0.656 } );

  /* ---------- DEFINE GEOMETRIES ---------- */
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const sphereGeometry = new THREE.SphereGeometry( 1, 16, 16 );
  const jointSphereGeometry = new THREE.SphereGeometry( 0.2, 16, 16 );
  const armCylinderGeometry = new THREE.CylinderGeometry( 0.15, 0.15, 1, 32 );

  /* ---------- ROBOT BASE ---------- */
  const robotTorso = placeObject(scene, metalMaterial, boxGeometry, true, false, new THREE.Vector3(0.2,0.25,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(0.15,0.15,0.15));
  const robotWheel = placeObject(robotTorso, metalMaterial, sphereGeometry, true, false, new THREE.Vector3(0,-1,0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.3, 0.65, 0.65));
  const robotHead = placeObject(robotTorso, metalMaterial, sphereGeometry, true, false, new THREE.Vector3(0,1,0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0.5, 0.5, 0.5));
  
  if (!hoveringHands) {
    /* ---------- ROBOT LEFT ARM ---------- */
    const robotShoulderL =  placeObject(robotTorso, metalMaterial, jointSphereGeometry, true, false, new THREE.Vector3(-0.7,0.45,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,1,1));
    const robotUpperArmL =  placeObject(robotShoulderL, metalMaterial, armCylinderGeometry, true, false, new THREE.Vector3(0,-0.5,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,1,1));
    const robotElbowL =  placeObject(robotUpperArmL, metalMaterial, jointSphereGeometry, true, false, new THREE.Vector3(0,-0.5,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,1,1));
    const robotForearmL =  placeObject(robotElbowL, metalMaterial, armCylinderGeometry, true, false, new THREE.Vector3(0,-0.5,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,1,1));
    const robotHandL =  placeObject(robotForearmL, metalMaterial, boxGeometry, true, false, new THREE.Vector3(0,-0.5,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(0.5,0.2,0.5));
    /* ---------- ROBOT RIGHT ARM ---------- */
    const robotShoulderR =  placeObject(robotTorso, metalMaterial, jointSphereGeometry, true, false, new THREE.Vector3(0.7,0.45,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,1,1));
    const robotUpperArmR =  placeObject(robotShoulderR, metalMaterial, armCylinderGeometry, true, false, new THREE.Vector3(0,-0.5,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,1,1));
    const robotElbowR =  placeObject(robotUpperArmR, metalMaterial, jointSphereGeometry, true, false, new THREE.Vector3(0,-0.5,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,1,1));
    const robotForearmR =  placeObject(robotElbowR, metalMaterial, armCylinderGeometry, true, false, new THREE.Vector3(0,-0.5,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(1,1,1));
    const robotHandR =  placeObject(robotForearmR, metalMaterial, boxGeometry, true, false, new THREE.Vector3(0,-0.5,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(0.5,0.2,0.5));
  
    if (addAxesHelper) {
      const axesHelper1 = new THREE.AxesHelper( 5 ); robotShoulderL.add(axesHelper1);
      const axesHelper2 = new THREE.AxesHelper( 5 ); robotElbowL.add(axesHelper2);
    }

    return { metalMaterial, robotShoulderL, robotElbowL, robotShoulderR, robotElbowR };
  }
  else {
    const robotHandL =  placeObject(robotTorso, metalMaterial, sphereGeometry, true, false, new THREE.Vector3(-1,0,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(0.25,0.25,0.25));
    const robotHandR =  placeObject(robotTorso, metalMaterial, sphereGeometry, true, false, new THREE.Vector3(1,0,0), new THREE.Vector3(0, Math.PI / 2, 0), new THREE.Vector3(0.25,0.25,0.25));
  
    return { metalMaterial, robotHandL, robotHandR };
  }
}

export function addLighting(scene) {

  const ambientLight = new THREE.AmbientLight( 0x404040, 0.5); // soft white light
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x404040, 10);
  pointLight.castShadow = true;
  pointLight.position.set(0, 0.8, 0);
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 5000;
  pointLight.shadow.bias = 0.00001;
  pointLight.shadow.autoUpdate = true;
  scene.add(pointLight);

  return { pointLight };
}
