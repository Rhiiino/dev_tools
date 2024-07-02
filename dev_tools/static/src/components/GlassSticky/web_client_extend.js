/** @odoo-module **/
import { patch } from "@web/core/utils/patch"
import { WebClient } from "@web/webclient/webclient"
import { useService } from "@web/core/utils/hooks";
import { useState, onRendered, onMounted, loadFile } from "@odoo/owl";




// How to patch an existing component (Usually done for the purpose of adding methods/variables to it or to alter existing methods)
patch(WebClient.prototype, "WebClientPatchGlassSticky", {
    async setup(){
        /* xxx */
        this._super.apply(this, arguments); 

        this.orm = useService("orm");
        this.state = useState({'GlassStickyService': useService("GlassStickyService")})

        // Exit if GlassSticky tool is disabled
        if (!this.state.GlassStickyService.tool_configs.glass_sticky_active){return}

        // Set hotkeys
        this.stickyToggleHotkey = this.state.GlassStickyService.hotkeys.toggle
        this.testHotkey = ''

        onMounted(() => {


        
            // General key listener for toggling input shell (This is placed on the DOM itself)
            document.addEventListener('keydown', (ev) => {

                // Method for de/activating sticky
                if (ev.key == this.stickyToggleHotkey) {
                    this.toggleSticky(ev)
                }

                // TESTING toggleable sticky passthrough
                if (ev.key == this.testHotkey) {
                    this.testFunc5(ev)


                }
            });

            // Manage key events for tray input (These are placed on the tray itself)
            var trayInput = document.querySelector('.tray-input')
            trayInput.onkeydown = (ev) => {}



        })
    },




    // ------------------ Custom Methods ------------------
    async toggleSticky(ev){
        /* Only for testing */
        ev.preventDefault()
        var sticky = document.querySelector(".sticky_shell")
        var display = sticky.style.display === 'none' ? 'block' : 'none'
        sticky.style.display = display
        if (display === 'block'){document.querySelector(".sticky_note").focus()}
    },
    
    async saveSticky(ev){
        /* xxxxx */
        $('.sticky_status_icon').css({'animation': 'pulse_yellow 2s infinite'});
        $('.sticky_status_text').css({'display': 'inline-block'});
        var sticky = $('.sticky_note')
        console.log(sticky.val(), this.state.GlassStickyService)
        if (sticky.val()){this.state.GlassStickyService.saveStickyInput(sticky.val())}  
        $('.sticky_status_text').css({'display': 'none'});
        $('.sticky_status_icon').addClass('sticky_status_icon_green');

        // Remove class after x seconds
        setInterval(this.remove_class, 5000)
        
    },

    async remove_class(){
        var sticky_status_icon = $('.sticky_status_icon')
        sticky_status_icon.removeClass('sticky_status_icon_green');
        sticky_status_icon.css({'animation': 'none'});
    },
 



    // ------------------ Test methods ------------------
    async testFunc4(ev){
        /* Only for testing */
        ev.preventDefault()

        var sticky = document.querySelector(".sticky_shell")

        var newPointerEvent = sticky.getAttribute('pointer-events') === 'none' ? 'auto' : 'none'
        sticky.setAttribute('pointer-events', newPointerEvent)
    },

    async testFunc5(ev){
        /* xxx */
        console.log('testFunc5: ')
        // var x = document.querySelector('[for="partner_id"]');
        var x = document.querySelectorAll('label');
        for (var elem of x)console.log(elem)
        x.textContent = 'REPLACED'

    }

})