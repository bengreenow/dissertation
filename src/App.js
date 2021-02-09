import "./App.css";
import React from "react";
import {
    Button,
    Container,
    FormControl,
    InputLabel,
    TextField,
} from "@material-ui/core";
import InputForm from "./InputForm";
import AnimationCanvas from "./AnimationCanvas";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: 0,
            radioValue: "naive",
            needleValue: "ABA",
            haystackValue: "ABBBABA",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({
            result: [this.state.haystackValue.search(this.state.needleValue)],
        });
        // console.log(event);
        event.preventDefault();
    }

    handleChange(event) {
        // console.log(event.target.name + event.target.value);
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        return (
            <div className="App">
                <InputForm
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    needleValue={this.state.needleValue}
                    haystackValue={this.state.haystackValue}
                    radioValue={this.state.radioValue}
                />
                <AnimationCanvas result={this.state.result}></AnimationCanvas>
            </div>
        );
    }
}

export default App;
