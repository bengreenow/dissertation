/*
Step Array Interface:
[
    {
        haystack:[
            {
                char:"A"
                highlight:false
            }
        ]
        needle:[
            {
                char:"A"
                highlight:false
        }
        ]
        needleOffset:"the index of the first character of the needle compared to the haystack"
        AABAA
          AB
             = offset of 2
},
    {}
]


*/

// for each step for each char

export function naiveSearch(needle, haystack) {
    let initialStep = {
        haystack: haystack.split("").map((char) => {
            return { char: char, highlight: false };
        }),
        needle: needle.split("").map((char) => {
            return { char: char, highlight: false };
        }),
        needleOffset: 0,
    };
    let stepOutput = [];
    while (true) {
        // keep adding steps until complete (dangerous)
        stepOutput.push(initialStep);
        stepOutput.push({ ...initialStep, needleOffset: 7 });
        stepOutput.push({
            ...initialStep,
            needleOffset: 8,
            haystack: [...haystack, { char: "A", highlight: true }],
        });
        stepOutput.push({ ...initialStep, needleOffset: 1 });
        stepOutput.push({ ...initialStep, needleOffset: 3 });
        stepOutput.push({ ...initialStep, needleOffset: 4 });
        stepOutput.push({ ...initialStep, needleOffset: 36 });
        break;
    }

    return stepOutput;
}
