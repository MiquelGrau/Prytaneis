import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  OnDestroy,
  SimpleChanges,
  OnChanges,
  AfterViewInit
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { IWorldMapMarker, WorldMapSettings } from '../../models/world-map-settings.model';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { Router } from '@angular/router';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
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
  isModelLoaded: boolean = false;

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  lastIntersected: THREE.Object3D | null = null;
  shadowMarker: THREE.Mesh | null = null;

  constructor(private router: Router) {
    this.renderer = new THREE.WebGLRenderer();
    this.scene = new THREE.Scene();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff); // soft white light
    this.scene.add(ambientLight);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.scene.background = new THREE.Color('black');
    this.camera.layers.enable(1);
    this.camera.position.set(0, 0, 1500);  // Incrementa la distància de la càmera

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const loader = new THREE.TextureLoader();
    loader.load(
        'assets/images/earth_map.jpeg',
        (texture) => {
          const sphereGeometry = new THREE.SphereGeometry(1000, 32, 32);  // Incrementa el radi de l'esfera
          const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
          this.mesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
          this.scene.add(this.mesh);
          this.isModelLoaded = true;
          this.paintNodesAndPaths();

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
        },
        undefined,
        (error) => {
          console.error('Hi ha hagut un error al carregar la textura', error);
        }
    );
    this.renderer.domElement.addEventListener('click', (event) => this.onMouseClick(event), false);
  }

  ngOnInit() {
    this.settings = { ...this.defaultSettings, ...this.settings };
  }

  ngAfterViewInit() {
    this.renderer.setSize(this.rendererContainer.nativeElement.clientWidth, this.rendererContainer.nativeElement.clientHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.camera.aspect = this.rendererContainer.nativeElement.clientWidth / this.rendererContainer.nativeElement.clientHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.domElement.addEventListener('mousemove', this.onMouseMove.bind(this), false);

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['settings'] && changes['settings'].currentValue && this.isModelLoaded) {
      this.paintNodesAndPaths();
    }
  }

  ngOnDestroy() {
    this.controls.dispose();
  }

  onMouseMove(event: MouseEvent) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.mesh.children);

    // Restore the last intersected object and shadowMarker, if there is one
    if (this.lastIntersected) {
      // Assuming marker is a mesh, we can scale it back
      this.lastIntersected.scale.set(1, 1, 1);
      this.lastIntersected = null;

      // Remove shadowMarker from the scene
      if (this.shadowMarker) {
        this.scene.remove(this.shadowMarker);
        this.shadowMarker = null;
      }
    }

    for (let i = 0; i < intersects.length; i++) {
      // Check if the intersected object is a marker
      if (intersects[i].object.userData['isMarker'] === true) {
        // Change cursor to pointer type
        this.renderer.domElement.style.cursor = 'pointer';

        // Assuming marker is a mesh, we can scale it to make it look bigger
        intersects[i].object.scale.set(1.5, 1.5, 1.5);
        this.lastIntersected = intersects[i].object as THREE.Object3D;

        // Add a shadowMarker
        const shadowGeometry = new THREE.CircleGeometry(8, 32); // You can adjust the size to fit your needs
        const shadowMaterial = new THREE.MeshBasicMaterial({ color: 'white', opacity: 0.2, transparent: true, side: THREE.DoubleSide });  // Material visible from both sides
        this.shadowMarker = new THREE.Mesh(shadowGeometry, shadowMaterial);
        this.shadowMarker.position.copy(intersects[i].object.position);

        // Move shadowMarker a bit closer to the sphere
        let shadowOffset = new THREE.Vector3().copy(this.shadowMarker.position).normalize().multiplyScalar(1);  // Adjust the scalar value to your needs
        this.shadowMarker.position.sub(shadowOffset);

        this.shadowMarker.lookAt(this.shadowMarker.position.clone().multiplyScalar(-1));
        this.scene.add(this.shadowMarker);

        return;
      }
    }

    // If no markers are intersected, change cursor back to default
    this.renderer.domElement.style.cursor = 'default';
  }

  onMouseClick(event: MouseEvent) {
    // Calculem on s'ha fet el clic en coordenades normalitzades (-1 a +1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Utilitzem el raycaster per a trobar els objectes intersectats
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Comprovem si s'ha fet clic a algun marker
    const intersects = this.raycaster.intersectObjects(this.mesh.children);
    if (intersects.length > 0) {
      const firstIntersection = intersects[0];
      const clickedMarker = firstIntersection.object;

      // Si l'objecte clicat és un marker, redirigim a la url corresponent
      if (this.isMarker(clickedMarker)) {
        const cityId = this.getCityIdFromMarker(clickedMarker);
        console.log(cityId);
        if (cityId) {
          this.router.navigate([`/city/${cityId}`]);
          return;
        }
      }
    }
  }

  // Aquest mètode ha de determinar si l'objecte donat és un marker
  isMarker(object: THREE.Object3D): boolean {
    return object.userData['isMarker'] === true;
  }

  // Aquest mètode ha d'obtenir la cityId del marker donat
  getCityIdFromMarker(marker: THREE.Object3D): string {
    return marker.userData['cityId'];
  }

  paintNodesAndPaths(): void {
    this.settings.nodes.forEach(node => {
      const markerSprite = this.createMarker(node.marker.latitude, node.marker.longitude, node.nodeType, node.cityId);
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
  }

  createPathFromPoints(points: Array<IWorldMapMarker>) {
    const radius = 501;  // Adjust this to match the model's scale
    const points3D = points.map(point => this.latLongToVector3(point.latitude, point.longitude, radius));

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
    const phi = (90 - lat - 0.1) * (Math.PI / 180);
    const theta = (lon - 90 + 0.1) * (Math.PI / 180);

    return new THREE.Vector3(
        -(radius * Math.sin(phi) * Math.sin(theta)),
        (radius * Math.cos(phi)),
        -(radius * Math.sin(phi) * Math.cos(theta))
    );
  }

  createMarker(lat: number, lon: number, nodeType: string, cityId: string) {
    const markerSize = 4;  // Increase the size of the marker
    const markerGeometry = new THREE.CircleGeometry(markerSize, 32);

    // Create a texture loader
    const loader = new THREE.TextureLoader();

    // Load the marker image based on nodeType
    let markerImage;
    if (nodeType === 'Islands sea') {
      markerImage = 'assets/images/marker_island.png';
    } else {
      markerImage = 'assets/images/marker_coast.png';
    }
    const markerTexture = loader.load(markerImage);

    // Use the image as a texture for the marker
    const markerMaterial = new THREE.MeshBasicMaterial({
      map: markerTexture,
      side: THREE.DoubleSide
    });

    const markerMesh = new THREE.Mesh(markerGeometry, markerMaterial);

    // Increase the radius so the marker is slightly above the earth's surface
    const position = this.latLongToVector3(lat, lon, 1001);
    markerMesh.position.set(position.x, position.y, position.z);

    // Orient the marker to face outwards
    markerMesh.lookAt(markerMesh.position.clone().multiplyScalar(-1));

    markerMesh.userData['isMarker'] = true;
    markerMesh.userData['cityId'] = cityId;

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

