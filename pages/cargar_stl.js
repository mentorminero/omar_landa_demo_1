function cargarSTL(rutaSTL) {
    var loader = new THREE.STLLoader();
    loader.load(rutaSTL, function(geometry) {
        geometry.center();
        var material = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.01, 0.01, 0.01);
        mesh.position.set(0, 0, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
    });
}

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2.3;
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 4;
controls.update();

var ambientLight = new THREE.HemisphereLight(0xFFEEB1, 0x080820, 1);
scene.add(ambientLight);

var spotlight = new THREE.SpotLight(0xFFA95C, 1);
spotlight.castShadow = true;
spotlight.shadow.bias = -0.001;
spotlight.shadow.mapSize.width = 1024 * 4;
spotlight.shadow.mapSize.height = 1024 * 4;
scene.add(spotlight);

var update = function() {
    // Aquí puedes añadir lógica de actualización si es necesario
};

var render = function() {
    renderer.render(scene, camera);
};

var gameLoop = function() {
    spotlight.position.set(
        camera.position.x + 10,
        camera.position.y + 10,
        camera.position.z + 10
    );
    requestAnimationFrame(gameLoop);
    update();
    render();
};

gameLoop();
