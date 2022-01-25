// returns the state of *all* features for current user
function fetchAllFeatures() {
    // in reality, this would have been a `fetch` call:
    // `fetch("/api/features/all")`
    console.log("call");
    return new Promise((resolve) => {
        const features = {
            featureFoo: true,
            featureBar: false
        };

        setTimeout(resolve, 100, features);
    });
}

// src/feature-x/summary.js
// getFeatureState("extendedSummary").then(function (isEnabled) {
//     if (isEnabled) {
//         showExtendedSummary();
//     } else {
//         showBriefSummary();
//     }
// });

// src/feature-y/feedback-dialog.js
// getFeatureState("feedbackDialog").then(function (isEnabled) {
//     if (isEnabled) {
//         makeFeedbackButtonVisible();
//     }
// });

let cachedPromise = null;

const getFeatureState = async (featureName) => {
    try {
        if (!cachedPromise) {
            cachedPromise = fetchAllFeatures();
        }

        const features = await cachedPromise;
        cachedPromise = null;
        return features[featureName];
    } catch (error) {
        console.error(error);
        return null;
    }
};

getFeatureState("featureFoo").then((isEnabled) => console.log(`Foo${isEnabled}`));
getFeatureState("featureBar").then((isEnabled) => console.log(`Bar${isEnabled}`));
getFeatureState("featureFool").then((isEnabled) => console.log(`Fool${isEnabled}`));
setTimeout(() => getFeatureState("featureBart").then((isEnabled) => console.log(`Bart${isEnabled}`)), 200);
