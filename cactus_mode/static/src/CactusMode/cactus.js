/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { WebClient } from "@web/webclient/webclient"
import { useService } from "@web/core/utils/hooks";
import { useState, onRendered, onMounted, loadFile } from "@odoo/owl";




// xxx
patch(WebClient.prototype, "CactusModePatch", {
    async setup(){
        /* xxx */
        this._super.apply(this, arguments); 


        onMounted(() => {
  
            // xxx
            // document.addEventListener('keydown', (ev) => {

            //     // Method for de/activating sticky
            //     if (ev.key == this.stickyToggleHotkey) {
            //         this.toggleSticky(ev)
            //     }

            //     // TESTING toggleable sticky passthrough
            //     if (ev.key == this.testHotkey) {
            //         this.testFunc5(ev)
            //     }

            // });

        
        var x = 123;



            
        const cactusImgPath = '/cactus_mode/static/img/cactus.svg';
        let keys = {};
        let direction = { x: 0, y: -1 };  // Default direction (up)
        let destroyedCount = 0;  // Counter for destroyed cacti

        document.addEventListener('keydown', function(event) {
            keys[event.key] = true;
            updateDirection();
        });

        document.addEventListener('keyup', function(event) {
            keys[event.key] = false;
            updateDirection();
        });

        document.addEventListener('click', function(event) {
            shootLaser(event.pageX, event.pageY, { ...direction });
        });

        function updateDirection() {
            let x = 0, y = 0;
            if (keys['w']) y -= 1;
            if (keys['s']) y += 1;
            if (keys['a']) x -= 1;
            if (keys['d']) x += 1;

            const length = Math.sqrt(x * x + y * y);
            if (length > 0) {
                direction.x = x / length;
                direction.y = y / length;
            }
        }

        function shootLaser(startX, startY, laserDirection) {
            const laser = document.createElement('div');
            laser.className = 'laser';
            laser.style.left = startX + 'px';
            laser.style.top = startY + 'px';
            document.body.appendChild(laser);

            const laserSpeed = 10;  // Speed of the laser

            function moveLaser() {
                const currentLeft = parseInt(laser.style.left);
                const currentTop = parseInt(laser.style.top);
                laser.style.left = currentLeft + (laserSpeed * laserDirection.x) + 'px';
                laser.style.top = currentTop + (laserSpeed * laserDirection.y) + 'px';

                if (currentLeft >= 0 && currentLeft <= window.innerWidth && currentTop >= 0 && currentTop <= window.innerHeight) {
                    requestAnimationFrame(moveLaser);
                } else {
                    laser.remove();
                }

                checkCollision(laser);
            }

            moveLaser();
        }

        function spawnCactus() {
            const cactus = document.createElement('img');
            cactus.src = cactusImgPath;
            cactus.className = 'cactus';
            cactus.style.left = Math.random() * (window.innerWidth - 50) + 'px';  // Adjust for cactus width
            cactus.style.top = Math.random() * (window.innerHeight - 50) + 'px'; // Adjust for cactus height
            document.body.appendChild(cactus);

            // Remove cactus after 5 seconds if not hit by a laser
            setTimeout(() => {
                if (document.body.contains(cactus)) {
                    cactus.remove();
                }
            }, 5000);
        }

        function checkCollision(laser) {
            const laserRect = laser.getBoundingClientRect();
            document.querySelectorAll('.cactus').forEach(cactus => {
                const cactusRect = cactus.getBoundingClientRect();
                if (
                    laserRect.left < cactusRect.left + cactusRect.width &&
                    laserRect.left + laserRect.width > cactusRect.left &&
                    laserRect.top < cactusRect.top + cactusRect.height &&
                    laserRect.top + laserRect.height > cactusRect.top
                ) {
                    cactus.classList.add('hit');
                    laser.remove();
                    setTimeout(() => {
                        cactus.remove();
                        updateDestroyedCounter();
                    }, 100);  // Delay to allow flashing effect and update counter
                }
            });
        }

        function updateDestroyedCounter() {
            destroyedCount++;
            document.getElementById('destroyedCounter').textContent = destroyedCount;
        }

        // Spawn a cactus every 3 seconds
        setInterval(spawnCactus, 3000);

        })
    },

})