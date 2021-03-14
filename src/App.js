import "./App.css";
import React from "react";
import { createMuiTheme, Grid } from "@material-ui/core";
import InputForm from "./InputForm";
import AnimationCanvas from "./AnimationCanvas";
import { naiveSearch } from "./algos/naive.js";
import PseudocodeCanvas from "./PseudocodeCanvas";
import Controls from "./Controls";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            result: 0,
            radioValue: "Naive Search",
            needleValue: "ABA",
            haystackValue: "ABBBABA",
            dropdownFields: [
                "Naive Search",
                "Knuth-Morris-Pratt",
                "Boyer-Moore",
            ],
            sliderValue: 1,
            code: "test",
            stepDuration: 300,
            stepIndex: 0,
            stepCurrent: 0, // could just be the step object
            stepMax: 0,
            stepArray: [],
            isPlaying: false,
        };

        // used to map the name of each algorithm to their respective helper functions
        this.functionMap = {
            "Naive Search": naiveSearch,
            "Knuth-Morris-Pratt": () => "knphere",
            "Boyer-Moore": () => "boyerhere",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);

        this.theme = createMuiTheme({
            spacing: 8,
            overrides: {
                MuiTextField: {
                    variant: "filled",
                },
                MuiFormControl: {
                    variant: "filled",
                },
            },
        });
    }

    handlePlayPause() {
        this.setState((prevState) => ({
            isPlaying: !prevState.isPlaying,
        }));
    }

    handleControlChange(event) {}

    handleSliderChange(event, newValue) {
        // console.log(newValue);
        this.setState({
            sliderValue: newValue,
        });
    }

    handleSubmit(event) {
        this.setState({
            result: [this.state.haystackValue.search(this.state.needleValue)],
        });

        console.log(
            this.functionMap[this.state.radioValue](
                this.state.needleValue,
                this.state.haystackValue
            )
        );

        event.preventDefault();
    }

    handleChange(event) {
        // console.log(event.target.name + event.target.value);
        console.log(`name: ${event.target.name} value: ${event.target.value}`);
        this.setState({
            [event.target.name]: event.target.value,
        });
        // console.log
    }

    render() {
        return (
            <div className="App" style={{ maxWidth: "1080px", margin: "auto" }}>
                <InputForm
                    onSubmit={this.handleSubmit}
                    onChange={this.handleChange}
                    needleValue={this.state.needleValue}
                    haystackValue={this.state.haystackValue}
                    radioValue={this.state.radioValue}
                    dropdownFields={this.state.dropdownFields}
                    theme={this.theme}
                />
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Controls
                            theme={this.theme}
                            onPlayPause={this.handlePlayPause}
                            isPlaying={this.state.isPlaying}
                            onSliderChange={this.handleSliderChange}
                            sliderValue={this.state.sliderValue}
                        ></Controls>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <AnimationCanvas
                            stepArray={this.state.stepArray}
                            needle={this.state.needleValue.toUpperCase()}
                            haystack={this.state.haystackValue.toUpperCase()}
                            result={this.state.result}
                            theme={this.theme}
                            slider={this.state.sliderValue}
                        ></AnimationCanvas>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <PseudocodeCanvas
                            theme={this.theme}
                            code={this.state.code}
                        ></PseudocodeCanvas>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default App;
