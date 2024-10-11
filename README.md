# JSONmodExtension
Firefox extension modifies JSON responses on any website by automatically replacing all `false` values with `true`

The extension listens to all outgoing requests of type xmlhttprequest and intercepts the responses.
It reads and decodes the response data, parses it as JSON, recursively replaces all false values with true, and then sends the modified response back to the page.

This should allow you to replace all `false` values with `true` in any JSON response from any website.

## How to install:
1. Clone Reposatory
2. Open Firefox, go to `about:debugging`, and click on `This Firefox`.
3. Click `Load Temporary Add-on`, and select the `manifest.json` file from your extension folder.
4. The extension will be installed temporarily, and you can test its behavior by visiting a website that makes JSON requests.

_You can use this extension in testing or debugging scenarios where you need to simulate certain conditions (e.g., changing boolean values to true) without altering the server code._
