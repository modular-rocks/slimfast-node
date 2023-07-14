export default `// Load parameters from either local storage or the URL
import function19 from "./functions/function19.";
import function18 from "./functions/function18.";
import function17 from "./functions/function17.";
import Function16 from "./functions/function16.";
import Function15 from "./functions/function15.";
import Component14 from "./components/component14.";
import Component13 from "./components/component13.";
import Component12 from "./components/component12.";
import function11 from "./functions/function11.";
import function10 from "./functions/function10.";
import function9 from "./functions/function9.";
import function8 from "./functions/function8.";
import function7 from "./functions/function7.";
import function6 from "./functions/function6.";
import function5 from "./functions/function5.";
import function4 from "./functions/function4.";
import function3 from "./functions/function3.";
import function2 from "./functions/function2.";
import function1 from "./functions/function1.";
import { registerApp } from "app/dim-api/register-app";
import React, { useState } from "react";
const createAppUrl = "https://www.bungie.net/en/Application/Create";

export default function Developer() {
    const urlParams = new URLSearchParams(window.location.search);

    function useDevParam(param: string) {
        return function1(param, urlParams);
    }

    const [apiKey, setApiKey] = useDevParam("apiKey");
    const [clientId, setClientId] = useDevParam("oauthClientId");
    const [clientSecret, setClientSecret] = useDevParam("oauthClientSecret");
    const [dimApiKey, setDimApiKey] = useDevParam("dimApiKey");
    const [dimAppName, setDimAppName] = useDevParam("dimAppName");
    const URL = window.location.origin;
    const URLRet = URL + "/return.html";
    let warning;

    if (window.location.protocol === "http:") {
        warning = "Bungie.net will not accept the http protocol. Serve over https:// and try again.";
    }

    const prefillLink = URL;

    const save = (e: React.FormEvent) => {
        e.preventDefault();

        if (function4(apiKey, clientId, clientSecret, dimAppName) && dimApiKey) {
            localStorage.setItem("apiKey", apiKey);
            localStorage.setItem("oauthClientId", clientId);
            localStorage.setItem("oauthClientSecret", clientSecret);
            localStorage.setItem("dimAppName", dimAppName);
            localStorage.setItem("dimApiKey", dimApiKey);
            localStorage.removeItem("dimApiToken");
            localStorage.removeItem("authorization");
            window.location.href = window.location.origin;
        } else {
            alert("You need to fill in the whole form");
        }
    };

    const onChange = function5(setter, e);

    const getDimApiKey = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (function6(dimAppName, apiKey)) {
            return;
        }

        try {
            const app = await function7(dimAppName, apiKey);
            function8(setDimApiKey, app, dimApiKey);
        } catch (e) {
            alert(e.message);
        }
    };

    return (<div className="dim-page">
        <h1>Developer Settings</h1>
        <p>To run DIM locally, you need to create and register your own personal app with both the
                    Bungie.net and DIM APIs.</p>
        {function11(apiKey, clientId, clientSecret, dimAppName) && dimApiKey && (<a href={prefillLink}>Open this link in another browser to clone these settings to DIM there</a>)}
        {warning ? (<div>
            <h3>Configuration Error</h3>
            <span>{warning}</span>
        </div>) : (<form onSubmit={save}>
            <h3>Bungie.net API Key</h3>
            <ol>
                <li>Visit{" "}
                    <a href={createAppUrl} target="_blank">
                        {createAppUrl}
                    </a>
                </li>
                <li>Paste{" "}
                    <input name="redirectUrl" type="text" value={URLRet} readOnly={true} size={30} />into
                                  the "Redirect URL" section under "App Authentication".</li>
                <li>Paste<input name="originHeader" type="text" value={URL} readOnly={true} size={20} />{" "}into the "Origin Header" section under "Browser Based Apps".</li>
                <li>Select "Confidential" OAuth type.</li>
                <Component12 apiKey={apiKey} onChange={onChange} setApiKey={setApiKey} />
                <Component13 clientId={clientId} onChange={onChange} setClientId={setClientId} />
                <Component14
                    clientSecret={clientSecret}
                    onChange={onChange}
                    setClientSecret={setClientSecret} />
            </ol>
            <h3>DIM API Key</h3>
            <ol>
                <li>Choose a name for your DIM API app (only required to create or recover your API key).
                                  This should be in the form of "yourname-dev" and will show up in API audit logs. (min
                                  length: 3, chars allowed [a-z0-9-])<br />
                    <Function15 dimAppName={dimAppName} onChange={onChange} setDimAppName={setDimAppName} />
                    <Function16 getDimApiKey={getDimApiKey} apiKey={apiKey} dimAppName={dimAppName} />
                </li>
                <li>DIM API key<br />
                    <input
                        name="clientSecret"
                        type="dimApiKey"
                        value={dimApiKey}
                        size={36}
                        readOnly={true} />
                </li>
            </ol>
            <button
                type="submit"
                className="dim-button"
                disabled={!(function19(apiKey, clientId, clientSecret, dimAppName) && dimApiKey)}>Save API Keys</button>
        </form>)}
    </div>);
}`;
