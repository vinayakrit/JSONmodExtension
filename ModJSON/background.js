// Function to modify the JSON response by replacing all "false" values with "true"
function modifyResponse(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);

  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();

  let data = [];

  filter.ondata = (event) => {
    // Decode the response chunk and push to data
    data.push(decoder.decode(event.data, { stream: true }));
  };

  filter.onstop = () => {
    // Combine all chunks and parse the JSON
    let str = data.join("");
    try {
      let json = JSON.parse(str);

      // Recursive function to replace all false values with true
      const replaceFalse = (obj) => {
        for (let key in obj) {
          if (typeof obj[key] === "boolean" && obj[key] === false) {
            obj[key] = true;
          } else if (typeof obj[key] === "object") {
            replaceFalse(obj[key]);
          }
        }
      };

      replaceFalse(json);

      // Re-encode the modified JSON and send it
      const modifiedData = encoder.encode(JSON.stringify(json));
      filter.write(modifiedData);
    } catch (e) {
      // If parsing fails, pass the original data
      filter.write(encoder.encode(str));
    }
    filter.disconnect();
  };

  return {};
}

// Add a listener to intercept JSON responses
browser.webRequest.onBeforeRequest.addListener(
  modifyResponse,
  { urls: ["<all_urls>"], types: ["xmlhttprequest"] },
  ["blocking"]
);
