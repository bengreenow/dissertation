import "./App.css";
import React from "react";
import { createMuiTheme, Grid } from "@material-ui/core";
import InputForm from "./InputForm";
import AnimationCanvas from "./AnimationCanvas";
import { naiveSearch } from "./algos/naive.js";
import PseudocodeCanvas from "./PseudocodeCanvas";
import Controls from "./Controls";

const scale = (num, in_min, in_max, out_min, out_max) => {
    return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

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
            stepCurrent: 0,
            stepArray: naiveSearch("ABA", "ABBBABA"),
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
        this.handleControlChange = this.handleControlChange.bind(this);

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

    handleControlChange(event) {
        switch (event) {
            case "next":
                this.setState((prevState) => ({
                    stepIndex: Math.min(
                        prevState.stepIndex + 1,
                        prevState.stepArray.length - 1
                    ),
                }));
                console.log(event);
                break;
            case "prev":
                this.setState((prevState) => ({
                    stepIndex: Math.max(prevState.stepIndex - 1, 0),
                }));
                break;
            case "reset":
                this.setState({ stepIndex: 0 });
                break;
            default:
                console.log("this should not have happened", event);
                break;
        }
        console.log(
            this.state.stepIndex,
            "i",
            this.state.stepArray.length,
            "array length"
        );
        console.log(
            scale(this.state.stepIndex, 0, this.state.stepArray.length, 0, 100),
            "percent"
        );
    }

    handleSliderChange(event, newValue) {
        console.log(this.state);
        this.setState({
            sliderValue: newValue,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState((prevState) => ({
            result: [this.state.haystackValue.search(this.state.needleValue)],
        }));

        const s = this.functionMap[this.state.radioValue](
            this.state.needleValue.toUpperCase(),
            this.state.haystackValue.toUpperCase()
        );
        console.log(s, "s");

        this.setState((prevState) => ({
            stepArray: s,
        }));
        event.preventDefault();
    }

    handleChange(event) {
        // console.log(event.target.name + event.target.value);
        console.log(`name: ${event.target.name} value: ${event.target.value}`);
        this.setState({
            [event.target.name]: event.target.value,
        });
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
                            onControlChange={this.handleControlChange}
                            onSliderChange={this.handleSliderChange}
                            sliderValue={this.state.sliderValue}
                            progress={scale(
                                this.state.stepIndex,
                                0,
                                this.state.stepArray.length - 1,
                                0,
                                100
                            )}
                        ></Controls>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        <AnimationCanvas
                            stepArray={this.state.stepArray}
                            stepIndex={this.state.stepIndex}
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
