"use strict";

        var canvas;
        var graphics;
        var pixelSize;

        function draw() {
            /*
                Making a cross of rectangles
            */
            graphics.fillStyle = "red";

            /*
                First rectangle
            */
            graphics.fillRect(150, 100, 100, 100);

            // Set border color and thickness
            graphics.strokeStyle = "black";
            graphics.lineWidth = 2.5;

            // Draw the top border
            graphics.beginPath();
            graphics.moveTo(150, 100);          // Top-left corner
            graphics.lineTo(250, 100);          // Top-right corner

            // Draw the right border
            graphics.lineTo(250, 200);          // Bottom-right corner

            // Draw the left border
            graphics.moveTo(150, 100);          // Back to top-left
            graphics.lineTo(150, 200);          // Bottom-left corner

            // Stroke all the lines
            graphics.stroke();

            /*
                Second rectangle
            */
            graphics.fillRect(50, 200, 300, 100);

            graphics.beginPath();

            // Top border (with a gap in the center)
            graphics.moveTo(50, 200);
            graphics.lineTo(150, 200);  // Left part of top border
            graphics.moveTo(250, 200);  // Right part of top border (after gap)
            graphics.lineTo(350, 200);

            // Bottom border (with a gap in the center)
            graphics.moveTo(50, 300);
            graphics.lineTo(150, 300);  // Left part of bottom border
            graphics.moveTo(250, 300);  // Right part of bottom border (after gap)
            graphics.lineTo(350, 300);

            // Left border (full)
            graphics.moveTo(50, 200);
            graphics.lineTo(50, 300);

            // Right border (full)
            graphics.moveTo(350, 200);
            graphics.lineTo(350, 300);

            graphics.stroke();

            /*
                Third rectangle
            */
            graphics.fillRect(150, 300, 100, 100);

            // Draw the left, right, and bottom borders of the third rectangle
            graphics.beginPath();

            // Left border
            graphics.moveTo(150, 300); // Top-left corner
            graphics.lineTo(150, 400); // Bottom-left corner

            // Right border
            graphics.moveTo(250, 300); // Top-right corner
            graphics.lineTo(250, 400); // Bottom-right corner

            // Bottom border
            graphics.moveTo(150, 400); // Left-bottom corner
            graphics.lineTo(250, 400); // Right-bottom corner

            graphics.stroke();

            /*
                Face
            */

            // Open Mouth (black semi-circle for bottom)
            graphics.fillStyle = "black";
            graphics.beginPath();
            graphics.ellipse(200, 230, 50, 60, 0, 0, Math.PI);
            graphics.fill();

            graphics.beginPath();
            graphics.arc(200, 230, 50, 0.15 * Math.PI, 0.85 * Math.PI, false); // Bottom curve
            graphics.fill();

            // Teeth (white rectangle inside the mouth)
            graphics.fillStyle = "white";
            graphics.fillRect(190, 270, 20, 8);

            // Tooth Separation Line (middle black line)
            graphics.strokeStyle = "black";
            graphics.lineWidth = 2.5;
            graphics.beginPath();
            graphics.moveTo(200, 230);
            graphics.lineTo(200, 278);
            graphics.stroke();

            graphics.fillStyle = "red";
            graphics.beginPath();
            graphics.ellipse(200, 225, 60, 45, 0, 0, 2 * Math.PI);
            graphics.fill();

            graphics.fillStyle = "white";

            // Eyes
            graphics.fillCircle(180, 230, 15);  // Left eye
            graphics.lineWidth = 1;
            graphics.stroke();
            graphics.strokeStyle = "black";
            graphics.fillCircle(220, 230, 15);  // Right eye
            graphics.lineWidth = 1;
            graphics.stroke();
            graphics.strokeStyle = "black";

            // Pupils
            graphics.fillStyle = "black";
            graphics.fillCircle(180, 230, 5);  
            graphics.fillCircle(220, 230, 5);  

            // Glows (using rgba for transparency)
            graphics.fillStyle = "rgba(250, 250, 250, 0.89)";
            graphics.fillCircle(178, 228, 2);  
            graphics.fillCircle(218, 228, 2);  

            // Mouth lines at the angles
            // Left angle
            graphics.beginPath();
            graphics.moveTo(156, 256); // Start Point
            graphics.lineTo(150, 262); // End point
            graphics.lineWidth = 2;
            graphics.stroke();
            
            graphics.beginPath();
            graphics.moveTo(156, 256); // Start Point
            graphics.lineTo(157, 248); // End point
            graphics.lineWidth = 2;
            graphics.stroke();

            // Right angle
            graphics.beginPath();
            graphics.moveTo(245, 256); // Start Point
            graphics.lineTo(251, 262); // End point
            graphics.lineWidth = 2;
            graphics.stroke();
            
            graphics.beginPath();
            graphics.moveTo(245, 256); // Start Point
            graphics.lineTo(244, 248); // End point
            graphics.lineWidth = 2;
            graphics.stroke();
        }

        function applyWindowToViewportTransformation(left, right, bottom, top, preserveAspect) {
            var displayAspect, windowAspect;
            var excess;
            var pixelwidth, pixelheight;

            if (preserveAspect) {
                displayAspect = Math.abs(canvas.height / canvas.width);
                windowAspect = Math.abs((top - bottom) / (right - left));
                if (displayAspect > windowAspect) {
                    excess = (top - bottom) * (displayAspect / windowAspect - 1);
                    top = top + excess / 2;
                    bottom = bottom - excess / 2;
                } else if (displayAspect < windowAspect) {
                    excess = (right - left) * (windowAspect / displayAspect - 1);
                    right = right + excess / 2;
                    left = left - excess / 2;
                }
            }

            graphics.scale(canvas.width / (right - left), canvas.height / (bottom - top));
            graphics.translate(-left, -top);
            pixelwidth = Math.abs((right - left) / canvas.width);
            pixelheight = Math.abs((bottom - top) / canvas.height);
            pixelSize = Math.max(pixelwidth, pixelheight);
        }

        function addGraphicsContextExtras(graphics) {
            graphics.strokeLine = function (x1, y1, x2, y2) {
                this.beginPath();
                this.moveTo(x1, y1);
                this.lineTo(x2, y2);
                this.stroke();
            };
            graphics.fillCircle = function (x, y, r) {
                this.beginPath();
                this.arc(x, y, r, 0, 2 * Math.PI, false);
                this.fill();
            };
            graphics.strokeCircle = function (x, y, radius) {
                this.beginPath();
                this.arc(x, y, radius, 0, 2 * Math.PI, false);
                this.stroke();
            };
            graphics.fillPoly = function () {
                if (arguments.length < 6) return;
                this.beginPath();
                this.moveTo(arguments[0], arguments[1]);
                for (var i = 2; i + 1 < arguments.length; i = i + 2) {
                    this.lineTo(arguments[i], arguments[i + 1]);
                }
                this.closePath();
                this.fill();
            };
            graphics.strokePoly = function () {
                if (arguments.length < 4) return;
                this.beginPath();
                this.moveTo(arguments[0], arguments[1]);
                for (var i = 2; i + 1 < arguments.length; i = i + 2) {
                    this.lineTo(arguments[i], arguments[i + 1]);
                }
                this.closePath();
                this.stroke();
            };
            graphics.fillOval = function (x, y, horizontalRadius, verticalRadius) {
                this.save();
                this.translate(x, y);
                this.scale(horizontalRadius, verticalRadius);
                this.beginPath();
                this.arc(0, 0, 1, 0, 2 * Math.PI, false);
                this.restore();
                this.fill();
            };
            graphics.strokeOval = function (x, y, horizontalRadius, verticalRadius) {
                this.save();
                this.translate(x, y);
                this.scale(horizontalRadius, verticalRadius);
                this.beginPath();
                this.arc(0, 0, 1, 0, 2 * Math.PI, false);
                this.restore();
                this.stroke();
            };
            graphics.getRGB = function (x, y) {
                var color = this.getImageData(x, y, 1, 1);
                return color.data;
            };
        }

        function init() {
            try {
                canvas = document.getElementById("canvas");
                graphics = canvas.getContext("2d");
            } catch (e) {
                document.getElementById("canvasholder").innerHTML =
                    "Canvas graphics is not supported.<br>" +
                    "An error occurred while initializing graphics.";
            }
            addGraphicsContextExtras(graphics);
            draw();
        }