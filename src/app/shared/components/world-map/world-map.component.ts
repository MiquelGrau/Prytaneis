import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { WorldMapSettings } from '../../models/world-map-settings.model';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit, OnDestroy {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  @Input() settings: WorldMapSettings = new WorldMapSettings();

  defaultSettings: WorldMapSettings = new WorldMapSettings();

  renderer = new THREE.WebGLRenderer();
  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  mesh!: THREE.Object3D;  // Change Mesh to Object3D as GLTFLoader will load Object3D
  controls!: OrbitControls;
  composer!: EffectComposer;
  bloomLayer = new THREE.Layers();

  constructor() {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();


    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(ambientLight);

    // // Add lights
    // const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    // this.scene.add(ambientLight);

    // const pointLight = new THREE.PointLight(0xffffff, 5, 300);
    // pointLight.position.set(0, 0, 20);
    // this.scene.add(pointLight);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene.background = new THREE.Color('black');
    this.camera.layers.enable(1);
    this.camera.position.set(0, 0, 25)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('assets/3dmodel/earth.glb', (gltf) => {
      this.mesh = gltf.scene;
      this.mesh.scale.set(0.02, 0.02, 0.02);
      this.mesh.rotation.y += THREE.MathUtils.degToRad(180);

      this.scene.add(this.mesh);

      this.settings.cities.forEach(city => {
        const markerSprite = this.createMarker(city.marker.lat, city.marker.lon);
        markerSprite.layers.enable(0);  // Assign to default layer
        this.mesh.add(markerSprite);
      });

      this.settings.nodes.forEach(node => {
        node.connectionsId.forEach(connectionId => {
          // Troba l'objecte de ruta corresponent
          const pathObj = this.settings.paths.find(path => path.id === connectionId);
          if (pathObj) {
            const pathMarkerArray = pathObj.path;
            const curve = this.createPathFromPoints(pathMarkerArray);
            const line = this.createPathLine(curve);
            this.mesh.add(line);
          }
        });
      });

      // Setup EffectComposer and UnrealBloomPass
      this.composer = new EffectComposer(this.renderer);

      const renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
      bloomPass.threshold = 0.95;
      bloomPass.strength = 1.5;
      bloomPass.radius = 0;
      this.composer.addPass(bloomPass);

      this.animateRotation();
    });
  }

  ngOnInit() {
    this.settings = { ...this.defaultSettings, ...this.settings };
  }

  ngAfterViewInit() {
    this.renderer.setSize(this.rendererContainer.nativeElement.clientWidth, this.rendererContainer.nativeElement.clientHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.camera.aspect = this.rendererContainer.nativeElement.clientWidth / this.rendererContainer.nativeElement.clientHeight;
    this.camera.updateProjectionMatrix();
  }

  ngOnDestroy() {
    this.controls.dispose();
  }

  createPathFromPoints(points: Array<{lat: number, lon: number}>) {
    const radius = 501;  // Adjust this to match the model's scale
    const points3D = points.map(point => this.latLongToVector3(point.lat, point.lon, radius));

    // Create a curve from the points
    const curve = new THREE.CatmullRomCurve3(points3D);

    return curve;
  }

  animateRotation() {
    window.requestAnimationFrame(() => this.animateRotation());
    this.controls.update();

    // Render the bloom layer
    this.renderer.autoClear = true;
    this.camera.layers.set(1);
    this.composer.render();

    // Render everything else
    this.renderer.autoClear = false;
    this.camera.layers.set(0);
    this.renderer.render(this.scene, this.camera);
  }

  latLongToVector3(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = lon * (Math.PI / 180);

    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.sin(theta)),
      (radius * Math.cos(phi)),
      -(radius * Math.sin(phi) * Math.cos(theta))
    );
  }

  createMarker(lat: number, lon: number) {
    const markerSize = 1;  // Increase the size of the marker
    const markerGeometry = new THREE.CircleGeometry(markerSize, 32);

    // Use a simple color for the marker
    const markerMaterial = new THREE.MeshBasicMaterial({ color: '#fefefe', side: THREE.DoubleSide });

    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

    // Increase the radius so the marker is slightly above the earth's surface
    const position = this.latLongToVector3(lat, lon, 501);
    markerMesh.position.set(position.x, position.y, position.z);

    // Orient the marker to face upwards
    markerMesh.lookAt(this.mesh.position);
    markerMesh.rotateZ(Math.PI / 2);
    return markerMesh;
  }

  createSurfacePath(lat1: number, lon1: number, lat2: number, lon2: number) {
    const radius = 501;  // Adjust this to match the model's scale
    const start = this.latLongToVector3(lat1, lon1, radius);
    const end = this.latLongToVector3(lat2, lon2, radius);

    // Calculate the angle between start and end vectors
    const angle = start.angleTo(end);

    // Calculate the number of intermediate points based on the angle
    const smoothingFactor = 20;  // Increase this to make the paths smoother
    const segments = Math.ceil(smoothingFactor * angle / (Math.PI / 180));  // One point per degree

    // Create an array to hold the points of the path
    const points = [];

    for (let i = 0; i <= segments; i++) {
      // Create a point along the shortest path on the sphere's surface between start and end
      const t = i / segments;
      const point = start.clone().lerp(end, t).normalize().multiplyScalar(radius);

      points.push(point);
    }

    // Create a curve from the points
    const curve = new THREE.CatmullRomCurve3(points);

    return curve;
  }


  createPathLine(curve: THREE.Curve<THREE.Vector3>) {
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Define a basic line material with a bright color
    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color('#d2fdfd'),
      linewidth: 5,
    });

    const line = new THREE.Line(geometry, material);

    // Add the line to the bloom layer so it will glow
    line.layers.enable(1);

    return line;
  }

}

