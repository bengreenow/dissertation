import { motion } from "framer-motion";
import React, { Component } from "react";

export default class Character extends Component {
    constructor(props) {
        super(props);

        this.state = {};
        console.log(this.props.highlight);
        this.classes = this.props.className + " letter";
    }

    render() {
        return (
            <motion.span
                animate={{
                    x: this.props.slider * 100,
                }}
                className={
                    this.props.highlight
                        ? `${this.classes} highlight`
                        : this.classes
                }
            >
                {this.props.value}
            </motion.span>
        );
    }
}
