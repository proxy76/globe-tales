import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Globe = () => {
    const mountRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const mount = mountRef.current;

        // Scene setup for the globe
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 3; // Move the camera back to fit the globe

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0); // Set transparent background
        mount.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/earth.jpg'); // Globe texture
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        const animate = () => {
            if (!isSticky) {
                globe.rotation.y -= 0.001; // Rotate the globe unless sticky
            }
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = mount.clientWidth / mount.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(mount.clientWidth, mount.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        handleResize(); // Initial resize

        return () => {
            window.removeEventListener('resize', handleResize);
            mount.removeChild(renderer.domElement);
        };
    }, [isSticky]);

    // IntersectionObserver to detect when the globe should become sticky
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If the globe is not intersecting (i.e., it reaches the top), make it sticky
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        const globeElement = mountRef.current;

        if (globeElement) {
            observer.observe(globeElement); // Start observing the globe element
        }

        return () => {
            if (globeElement) {
                observer.unobserve(globeElement); // Clean up observer
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`globe ${isSticky ? 'sticky' : ''}`}
            style={{ width: '100%', height: '500px' }}
        />
    );
};

export default Globe;
