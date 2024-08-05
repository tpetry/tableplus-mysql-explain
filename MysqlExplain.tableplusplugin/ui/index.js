import './index.css';

async function sendPlan(data) {
    const response = await fetch('https://api.mysqlexplain.com/v2/explains', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'tpetry/tableplus-mysql-explain@2.0',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        return (await response.json()).url;
    }
    if(response.status === 400) {
        throw new Error((await response.json()).message);
    }
    if(response.status === 422) {
        throw new Error(`Validation Failed: ${JSON.stringify(await response.json())}`);
    }
    if(response.status === 429) {
        throw new Error("Rate Limit Reached: Too many requests. Please try again later.");
    }

    throw new Error(`Unknown Error(${response.status}): ${(await response.text()).substring(0, 250)}`);
}

async function getOembed(url) {
    const response = await fetch('https://api.mysqlexplain.com/v2/oembed.json?showFullscreenButton=false&url=' + encodeURIComponent(url));

    if (response.ok) {
        return (await response.json()).html;
    }

    throw new Error(`Unknown Error(${response.status}): ${(await response.text()).substring(0, 250)}`);
}

window.displayPlan = function (data) {
    const loading = setTimeout(() => document.getElementById('loading').style.display = 'block', 2500);

    sendPlan(data)
      .then(getOembed)
      .then((html) => {
          clearTimeout(loading);
          document.getElementById('loading').style.display = 'none';
          document.getElementById('explain').style.display = 'block';
          document.getElementById('explain').innerHTML = html;
      })
      .catch((e) => {
          clearTimeout(loading);
          document.getElementById('loading').style.display = 'none';
          document.getElementById('error').style.display = 'block';
          document.getElementById('error-message').innerText = e.message;
      });
}
