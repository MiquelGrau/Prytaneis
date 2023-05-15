import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import * as THREE from 'three';
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
  camera!: THREE.Camera;
  mesh!: THREE.Mesh;
  controls!: OrbitControls;
  composer!: EffectComposer;
  bloomLayer = new THREE.Layers();

  constructor() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.layers.enable(1);
    this.camera.position.z = 2;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setPath('assets/images/');
    textureLoader.load('earth_map.jpeg', (texture) => {
      texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;

      const material = new THREE.MeshBasicMaterial({ map: texture });
      this.mesh = new THREE.Mesh(geometry, material);
      this.mesh.layers.enable(1);  // Enable bloom layer
      this.scene.add(this.mesh);

      this.settings.markers.forEach(marker => {
        const markerSprite = this.createMarker(marker.lat, marker.lon);
        markerSprite.layers.enable(1);  // Enable bloom layer
        this.mesh.add(markerSprite);
      });

      for (let i = 0; i < this.settings.markers.length; i++) {
        for (let j = i + 1; j < this.settings.markers.length; j++) {
          const marker1 = this.settings.markers[i];
          const marker2 = this.settings.markers[j];
          const curve = this.createSurfacePath(marker1.lat, marker1.lon, marker2.lat, marker2.lon);
          const line = this.createPathLine(curve);
          this.scene.add(line);
        }
      }

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
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
  }

  ngOnDestroy() {
    this.controls.dispose();
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
    const theta = (lon + 180) * (Math.PI / 180);

    return new THREE.Vector3(
      -(radius * Math.sin(phi) * Math.cos(theta)),
      (radius * Math.cos(phi)),
      (radius * Math.sin(phi) * Math.sin(theta))
    );
  }

  createMarker(lat: number, lon: number) {
    const markerSize = 0.01;  // Adjust the size of the marker here
    const markerGeometry = new THREE.CircleGeometry(markerSize, 32);

    // Use a simple color for the marker
    const markerMaterial = new THREE.MeshBasicMaterial({ color: '#fefefe', side: THREE.DoubleSide });

    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

    // We set the radius to 1, the same as the earth's radius in our scene,
    // so the marker is in direct contact with the earth's surface
    const position = this.latLongToVector3(lat, lon, 1);
    markerMesh.position.set(position.x, position.y, position.z);

    // Orient the marker to face upwards
    markerMesh.lookAt(this.mesh.position);
    markerMesh.rotateZ(Math.PI / 2);
    return markerMesh;
  }

  createSurfacePath(lat1: number, lon1: number, lat2: number, lon2: number) {
    const start = this.latLongToVector3(lat1, lon1, 1);
    const end = this.latLongToVector3(lat2, lon2, 1);

    // Calculate the angle between start and end vectors
    const angle = start.angleTo(end);

    // Calculate the number of intermediate points based on the angle
    const smoothingFactor = 10;  // Increase this to make the paths smoother
    const segments = Math.ceil(smoothingFactor * angle / (Math.PI / 180));  // One point per degree

    // Create an array to hold the points of the path
    const points = [];

    for (let i = 0; i <= segments; i++) {
      // Create a point along the shortest path on the sphere's surface between start and end
      const t = i / segments;
      const point = start.clone().lerp(end, t).normalize().multiplyScalar(1.01);

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
      color: new THREE.Color('#E9C46A'),
      linewidth: 1,
    });

    const line = new THREE.Line(geometry, material);

    // Add the line to the bloom layer so it will glow
    line.layers.enable(1);

    return line;
  }

}
