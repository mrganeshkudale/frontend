import { After } from "cucumber";
import { reporting } from 'qcoe-fedex-ui-test-common';

After(async function(scenario) {
    if (scenario.result.status === 'failed') {
        await reporting.reportFailure(this, scenario)
    }
})
