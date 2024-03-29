/**
 * Blurb - Javascript Notification Library.
 * 
 * Copyright (C) 2011 Alexandros Michael.
 * First Revision: 24 May 2011.
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 **/

var Blurb = function(userOptions)
{
    /* Privates */
    var visible = false;
    var elem = null;
    var timeoutId = 0;
    var defCSS = {
        backgroundColor : "#222",
        opacity : "0.8",
        padding : "5px 20px 5px 20px",
        color : "white",
        textShadow : "1px 2px black",
        fontFamily : "Helvetica Neue",
        fontSize : "0.86em"
    };
    
    /* Notifier Options */
    this.options = {
        position : "right-top",
        fadeInDuration : 200,
        fadeOutDuration : 100,
        displayDuration : 3000,
        cssClass : "",
        cssStyle : defCSS,
        content : "This is a nice notification.",
        showCloseButton: true
    };
    
    /* Private API */
    
    /**
     * Copies all the properties from the supplied arguments
     * to the supplied object.
     */
    this._extend = function(obj)
    {
        if (!obj) {
            return;
        }
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (prop in source) {
                if (source.hasOwnProperty(prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    };

    /**
     * Appends a message to an open notification popup.
     */
    this._appendMessage = function(msg, putTopBorder)
    {
        var newMessage = $("<div/>").html(msg || this.options.content).css({
            margin : "5px 0px 5px 0px",
            padding : "7px 0px 7px 0px"
        });
        if (putTopBorder) {
            newMessage.css({
                borderTop : "1px solid #ddd"
            });
        };
        elem.append(newMessage);
    };

    /**
     * Makes the notification popup visible.
     */
    this._makeVisible = function()
    {
        this._setPosition();
        if (this.options.showCloseButton) {
            this._appendCloseBtn();
        }
        elem.fadeIn(this.options.fadeInDuration);
    };

    /**
     * Waits for a given time before fading out.
     */
    this._wait = function()
    {
        window.clearTimeout(timeoutId);
        if (this.options.displayDuration < 0) {
            return;
        }
        timeoutId 
            = window.setTimeout($.proxy(function() { this.close(); }, this), 
                                this.options.displayDuration);
    };

    /**
     * Makes the base element of the notification popup and applies 
     * any styling.
     */
    this._makeBase = function()
    {
        elem = $("<div/>");
        var cssClass = this.options.cssClass, cssStyle = this.options.cssStyle;
        if (cssClass) {
            elem.addClass(cssClass);
        } else {
            elem.css(cssStyle || defCSS);
        }
    };

    /**
     * Appends a close button to the notification popup.
     */
    this._appendCloseBtn = function()
    {
        var klass = ((this.options.cssClass)? this.options.cssClass + "-": "") + "blurb-close-btn";
        var closeBtn = $("<div/>").addClass(klass).click(
                $.proxy(function()
                {
                    this.close();
                }, this));
        elem.append(closeBtn);
    };
    
    /**
     * Sets the position of the notification popup.
     */
    this._setPosition = function()
    {
        var x = 0;
        var y = 0;
        elem.css({
            display : "none",
            position : "fixed"
        });
        $("body").append(elem);
        elem.css(this._getCoords(this.options.position));
    };
    
    this._getCoords = function(position)
    {
        if (!position) {
            position = "right-top";
        }
       
        var w = elem.outerWidth(), 
            h = elem.outerHeight(), 
            pad = 10, 
            center_y = $(window).height() / 2 - h / 2 - pad, 
            center_x = $(window).width() / 2 - w / 2 - pad, 
            x_ = "right", 
            y_ = "top", 
            x  = 0,
            y  = 0,
            posTokens = position.split(/-/),
            pixTokens = position.split(/\s+/);
        
        if (posTokens.length === 2) {
            if (posTokens[0] in ["right, center, left"]) {
                x_ = (posTokens[0] === "center") ? "left" : posTokens[0];
            }
            if (posTokens[1] in ["top, bottom, center"]) {
                y_ = (posTokens[1] === "center") ? "top" : posTokens[1];
            }
            switch (position) {
                case "center-center":
                    x = center_x;
                    y = center_y;
                    break;
                case "left-top":
                case "right-top":
                case "left-bottom":
                case "right-bottom":
                case "left-top":
                    x = pad;
                    y = pad;
                    break;
                case "center-top":
                case "center-bottom":
                    x = center_x;
                    y = pad;
                    break;
                case "left-center":
                case "right-center":
                    x = pad;
                    y = center_y;
                    break;
            }
        } else if (pixTokens.length == 2) {
            x = parseFloat(pixTokens[0]);
            y = parseFloat(pixTokens[1]);
            if (!x || !y){
                x = pad;
                y = pad;
            } else {
                x_ = "left";
            }
        } else {
            x = pad;
            y = pad;
        }
        
        var pos = {};
        pos[x_] = x;
        pos[y_] = y;
        return pos;
    };
    
    /* Public API */
    
    /**
     * Closes the notification popup.
     */
    this.close = function()
    {
        elem.fadeOut(this.options.fadeOutDuration, function()
        {
            elem.find("div").remove();
            window.clearTimeout(timeoutId);
            visible = false;
            elem.remove();
        });
    };

    /**
     * Appends a message and shows the notification popup.
     */
    this.show = function(msg)
    {
        this._appendMessage(msg, visible);
        if (!visible) {
            visible = true;
            this._makeVisible();
        }
        this._wait();
    };
    
    /**
     * Returns the HTML element.
     */
    this.elem = function()
    {
        return elem;
    };

    /* Init code. */
    
    if (userOptions) {
        this._extend(this.options, userOptions);
    }
    this._makeBase();
};