import {
    Button,
    FormControl,
    Grid,
    Paper,
    TextField,
    FormLabel,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@material-ui/core";
import React, { Component } from "react";

export default class InputForm extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.props.onChange.bind(this);
        this.handleSubmit = this.props.onSubmit.bind(this);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Paper style={{ padding: 10, margin: 30 }} elevation={3}>
                    <FormControl>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Algorithm</FormLabel>
                            <RadioGroup
                                aria-label="algorithm"
                                name="radioValue"
                                value={this.props.radioValue}
                                onChange={this.handleChange}
                            >
                                <FormControlLabel
                                    value="naive"
                                    control={<Radio />}
                                    label="Brute Force"
                                />
                                <FormControlLabel
                                    value="kmp"
                                    control={<Radio />}
                                    label="Knuth-Morris-Pratt"
                                />
                                <FormControlLabel
                                    value="bm"
                                    control={<Radio />}
                                    label="Boyer-Moore"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Grid
                            direction="row"
                            alignItems="center"
                            style={{ padding: 10 }}
                        >
                            <TextField
                                required
                                name="needleValue"
                                variant="outlined"
                                label="Needle"
                                value={this.props.needleValue}
                                onChange={this.handleChange}
                            ></TextField>
                            <TextField
                                required
                                name="haystackValue"
                                variant="outlined"
                                label="Haystack"
                                value={this.props.haystackValue}
                                onChange={this.handleChange}
                            ></TextField>
                            <Button
                                variant="contained"
                                size="medium"
                                type="submit"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Grid>
                    </FormControl>
                </Paper>
            </form>
        );
    }
}
