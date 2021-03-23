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

the algorithm:

def search(pat, txt): 
    M = len(pat) 
    N = len(txt) 
  
    # A loop to slide pat[] one by one */
// for i in range(N - M + 1):
//     j = 0

//     # For current index i, check
//     # for pattern match */
//     while(j < M):
//         if (txt[i + j] != pat[j]):
//             break
//         j += 1

//     if (j == M):
//         print("Pattern found at index ", i)

// for each step for each char

function createStep(
    needle,
    haystack,
    needleOffset,
    needleHighlightArray,
    haystackHighlightArray,
    description = "No Description",
    codeLine = 0,
    extra = {}
) {
    let initialStep = {
        haystack: haystack.split("").map((char) => {
            return { char: char, highlight: false };
        }),
        needle: needle.split("").map((char, index) => {
            return { char: char, highlight: false };
        }),
        needleOffset: needleOffset,
        found: false,
        ...extra,
    };
    if (haystackHighlightArray) {
        initialStep.haystack = initialStep.haystack.map((char, i) => {
            if (haystackHighlightArray.includes(i)) {
                return { ...char, highlight: true };
            } else {
                return char;
            }
        });
    }
    if (needleHighlightArray) {
        console.log("if needlehighligharray");
        initialStep.needle = initialStep.needle.map((char, i) => {
            console.log(needleHighlightArray);
            if (needleHighlightArray.includes(i)) {
                console.log({ ...char, highlight: true });
                return { ...char, highlight: true };
            } else {
                return char;
            }
        });
    }
    return initialStep;
}

export function naiveSearch(needle, haystack) {
    // let initialStep = {
    //     haystack: haystack.split("").map((char) => {
    //         return { char: char, highlight: false };
    //     }),
    //     needle: needle.split("").map((char, index) => {
    //         return { char: char, highlight: false };
    //     }),
    //     needleOffset: 0,
    // };

    let stepOutput = [];
    let M = needle.length;
    let N = haystack.length;

    for (let i = 0; i < N - M + 1; i++) {
        let j = 0;
        // runs through word

        let highlightArray = [];
        stepOutput.push(createStep(needle, haystack, i, [0], [i]));
        while (j < M) {
            if (haystack[i + j] !== needle[j]) {
                // runs when character NOT found. i.e "change needleoffset now if character found"
                break;
            }
            j++; // char is correct, go to next in needle
            highlightArray = [];
            for (let n = 0; n < j; n++) {
                highlightArray.push(n + 1);
                console.log(highlightArray, "inside loop");
            }
            stepOutput.push(
                createStep(needle, haystack, i, highlightArray, [])
            );
        }
        if (j === M) {
            console.log("found at index" + i);
            createStep(needle, haystack, i, highlightArray, [], "", 0, {
                found: true,
            });
        }
        console.log(i);
    }

    console.log(stepOutput, "STEPS");

    return stepOutput;
}
