import './index.css';

import Alpine from 'alpinejs';
import Clipboard from '@ryangjchandler/alpine-clipboard';
import Tooltip from '@ryangjchandler/alpine-tooltip';

let initialized = false;
document.addEventListener('alpine:init', () => {
    initialized = true;
    Alpine.store('state', 'loading');
});

window.submitPlan = async function (data) {
    if (!initialized) {
        document.addEventListener('alpine:init', () => {
            initialized = true;
            submitPlan(data);
        });

        return;
    }

    try {
        const response = await fetch('https://explainmysql.com/api/v1/plans', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'tpetry/tableplus-mysql-explain@1.0',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            Alpine.store('state', 'success');
            Alpine.store('url', (await response.json()).url);
        } else {
            const status = { 422: 'Validation Failed', 429: 'Too Many Requests', 503: 'Service Unavailable'}[response.status] || 'Unknown';
            Alpine.store('state', 'error');
            Alpine.store('errorTitle', `HTTP ${response.status} (${status})`);
            Alpine.store('errorMessage', await response.text());
        }
    } catch (e) {
        Alpine.store('state', 'error');
        Alpine.store('errorTitle', 'Unknown Error');
        Alpine.store('errorMessage', e.message);
    }
}

window.Alpine = Alpine;
Alpine.plugin(Clipboard);
Alpine.plugin(Tooltip);
Alpine.start();
