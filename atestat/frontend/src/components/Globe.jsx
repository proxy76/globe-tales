import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Globe = () => {
    const mountRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const mount = mountRef.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.setClearColor(0x000000, 0);
        renderer.outputEncoding = THREE.sRGBEncoding;
        mount.appendChild(renderer.domElement);

        const geometry = new THREE.SphereGeometry(1.5, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('/earth3.png');
        texture.encoding = THREE.sRGBEncoding;
        const material = new THREE.MeshBasicMaterial({ map: texture, color: new THREE.Color(1, 1, 1) });
        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);

        const animate = () => {
            if (!isSticky) {
                globe.rotation.y -= 0.001;
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

        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
            mount.removeChild(renderer.domElement);
        };
    }, [isSticky]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        const globeElement = mountRef.current;

        if (globeElement) {
            observer.observe(globeElement);
        }

        return () => {
            if (globeElement) {
                observer.unobserve(globeElement); 
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className={`globe ${isSticky ? 'sticky' : ''}`}
            style={{ width: '100%', height: '500px' }}>

            <div className="globeText">Călătorește cu NOI!</div>

        </div>
    );
};

export default Globe;
