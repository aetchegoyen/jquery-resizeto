/*
 * jQuery ResizeTo plug-in 1.0
 *
 * Copyright (c) 2012 Alejandro Etchegoyen 
 *
 * http://www.etchegoyen.net/jquery/jquery-resizeto/
 *
 * Depends:
 * - jQuery
 *
 * Dual licensed under the MIT and GPL licences:
 * 	http://www.opensource.org/licenses/mit-license.php
 *	http://www.gnu.org/licenses/gpl.html
 *
 */

(function($){

    $.fn.reizeTo = function(options) {
        var defaults = {
            target: $(this).parent(),
            center: true
        }

        var config = $.extend(defaults, options);

        return this.each(function() {
            var wconfig = config;
            var $this = $(this);
            var $target = wconfig.target;

            //The plugin acts when the image is loaded or the load event is triggered
            $this.load(function() {
                // Target dimensions
                var tWidth = $target.width();
                var tHeight = $target.height();

                // Image dimensions
                var iWidth = $this.width();
                var iHeight = $this.height();

                // Calculates the ratio
                var ratio = iWidth / tWidth;

                // Checks if resize will be relative to width or height
                if ((iHeight / ratio) < tHeight){
                    $this.css({
                        'width': 'auto', 
                        'height': tHeight
                    });

                    // Updates vars
                    iWidth = iWidth / (iHeight / tHeight);
                    iHeight = tHeight;
                }else{
                    $this.css({
                        'height': 'auto', 
                        'width': tWidth
                    });

                    // Updates vars
                    iWidth = tWidth;
                    iHeight = iHeight / ratio;
                }

                //Centers the image if desired
                if(wconfig.center){

                    var leftOffset = (iWidth - tWidth) / -2;
                    var topOffset = (iHeight - tHeight) / -2;

                    $this.css({
                        'left': leftOffset, 
                        'top': topOffset
                    }); 
                }

            });

            //Triggers the load event
            if (this.complete) {
                $this.trigger('load');
            }
        });
    }
})(jQuery);