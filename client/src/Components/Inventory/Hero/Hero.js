import React from "react";
import { useSelector } from "react-redux";

function Hero() {
  const items = useSelector(state => state.item);
    return (
        <div class="content">
            <header class="content-header">
                <h2>
                    Welcome NAME,
                    <br /> you've {items} items in your inventory.
                </h2>
            </header>
        </div>
    );
}

export default Hero;
