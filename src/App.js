import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import messages from "./messages";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [locale, setLocale] = useState("en");

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Router>
        <Routes setLocale={setLocale} />
      </Router>
    </IntlProvider>
  );
}

export default App;
