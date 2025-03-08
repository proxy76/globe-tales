import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Globe = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 3; // Move the camera back to fit the larger globe

        // Renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // Enable transparency
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0); // Set background color to transparent

        mount.appendChild(renderer.domElement);

        // Globe
        const geometry = new THREE.SphereGeometry(1.5, 32, 32); // Increase the radius of the globe
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/earth.jpg'); // Replace with the path to your texture
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            globe.rotation.y -= 0.001; // Rotate the globe
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        // Force initial resize
        handleResize();

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            mount.removeChild(renderer.domElement);
        };
    }, []);

    return <div className="globe" ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default Globe;