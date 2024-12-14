import React, { useEffect } from "react";
import $ from "jquery"; // Make sure jQuery is installed
import "../../css/underConstruction.css"; // Create this file for styles

const UnderConstruction = () => {
  useEffect(() => {
    // Rotate the first image
    setInterval(() => {
      $("#image").rotate({
        count: 99999,
        forceJS: true,
        duration: 4,
      });
    }, 52);

    // Rotate the second image
    setInterval(() => {
      $("#image2").rotate({
        count: 99999,
        forceJS: true,
        endDeg: -360,
        duration: 4,
      });
    }, 52);

    // jQuery Rotate Plugin
    $.fn.rotate = function (options) {
      const $this = $(this),
        prefixes = ["-Webkit-", "-Moz-", "-O-", "-ms-", ""],
        opts = $.extend(
          {
            startDeg: false,
            endDeg: 360,
            duration: 1,
            count: 1,
            easing: "linear",
            animate: {},
            forceJS: false,
          },
          options
        );

      const supports = (prop) => {
        const style = document.createElement("div").style;
        return prefixes.some((prefix) => style[prefix.replace(/\-/g, "") + prop] === "");
      };

      const prefixed = (prop, value) => {
        const css = {};
        prefixes.forEach((prefix) => {
          css[prefix.toLowerCase() + prop] = value || "";
        });
        return css;
      };

      if (supports("Transform")) {
        $this.css(prefixed("transform", "rotate(" + opts.startDeg + "deg)"));
      }

      $this.animate(opts.animate, {
        duration: opts.duration * 1000,
        easing: $.easing[opts.easing] ? opts.easing : "",
        step: (perc, fx) => {
          if (fx.prop === "perc") {
            const deg = opts.startDeg + (opts.endDeg - opts.startDeg) * perc / 100;
            $this.css(prefixed("transform", "rotate(" + deg + "deg)"));
          }
        },
      });

      return $this;
    };
  }, []);

  return (
  <>
    <center className="my-3">
      <div id="mid" >
        <p className="">
          <img src={"/image/settingGear-icon.png"} id="image" alt="Rotating Gear" />
          <img src={"/image/settingGear-icon.png"} id="image2" alt="Rotating Gear 2" />
        </p>
      </div>
    </center>
    <div id="gate" className="mt-3">Under Construction</div>
  </>
  );
};

export default UnderConstruction;
