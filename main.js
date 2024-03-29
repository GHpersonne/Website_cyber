class Galaxy {
    constructor() {
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;

        this.time = 0;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.ww / this.wh, 0.1, 1000);
        this.camera.position.z = 100;

        this.controls = new THREE.OrbitControls(this.camera);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(this.ww, this.wh);

        window.addEventListener('resize', this.resize.bind(this));
        document.body.appendChild(this.renderer.domElement);

        this.stars();
        this.animate();
    }

    resize() {
        this.ww = window.innerWidth;
        this.wh = window.innerHeight;
        this.camera.aspect = this.ww / this.wh;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.ww, this.wh);
    }

    stars() {
        let starVert = document.getElementById('starVert').textContent;
        let starFrag = document.getElementById('starFrag').textContent;

        let starsGeometry = new THREE.Geometry();

        for (let i = 0; i < 100000; i++) {
            let star = new THREE.Vector3();
            this.alpha = Math.random() * (Math.PI * 2);
            this.theta = Math.random() * (Math.PI);

            star.x = Math.cos(this.alpha) * Math.sin(this.theta);
            star.y = Math.sin(this.alpha) * Math.sin(this.theta);
            star.z = Math.cos(this.theta);

            starsGeometry.vertices.push(star);
        }

        var uniforms = {
            u_time: { type: "f", value: 1.0 },
        };

        this.starsMaterial = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: starVert,
            fragmentShader: starFrag
        });

        this.starField = new THREE.Points(starsGeometry, this.starsMaterial);
        this.scene.add(this.starField);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.time += 0.01;

        this.starsMaterial.uniforms.u_time.value = this.time;
        this.renderer.render(this.scene, this.camera);
    }
}

let galaxy = new Galaxy();