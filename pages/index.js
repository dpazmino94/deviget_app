import { Page } from "@shopify/polaris";
import React, { useState } from "react";
import { ResourcePicker } from "@shopify/app-bridge-react";

const NGROK_SERVER =
  "https://340d73a79ed6.ngrok.io/david-pazmino-server/us-central1/app/shopify/admin-url";

const generateURL = (variantID, timeStamp, token) => {
  return `${NGROK_SERVER}?tms=${timeStamp}&id=${variantID}&tk=${token}`;
};

const Index = () => {
  const [open, setOpen] = useState(false);
  const [generatedURL, setGeneratedURL] = useState("-");
  let removableString = "gid://shopify/ProductVariant/";

  return (
    <Page title="Product Selector">
      <button onClick={() => setOpen(true)}>Generate link for product</button>
      <br /> <br />
      <div>Generated URL:</div> <br />
      {generatedURL}
      <ResourcePicker
        resourceType="Product"
        open={open}
        onSelection={(data) => {
          let variantID = data.selection[0].variants[0].id,
            timeStamp = new Date().valueOf(),
            token = Number(timeStamp.toString().substring(0, 3)) - 10;
          variantID = variantID.replace(removableString, "");
          setGeneratedURL(generateURL(variantID, timeStamp, token));
          setOpen(false);
        }}
      />
    </Page>
  );
};

export default Index;

// https://deviget-challenge.myshopify.com/cart/add?id=7526176358638&quantity=1

// https://deviget-challenge.myshopify.com/cart/add?id=42305603666158&quantity=1
