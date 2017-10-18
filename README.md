## Node Lamdba Bundler

I've been working with AWS Lambda lately and decided I wanted to try make a tool to streamline pushing up new versions.

### How to use:

Write each of your Lambda scripts in a seperate folder with the script named index.js

then you can run:

```bash
$ bundle <directory_name>
```
this will find your script folder, copy your node_modules into that folder and then zip it.


TO DO:

- aws command line/API integration for pushing it up to Lambda
- tests
- support for bundling multiple functions at once. I can imagine it being called 'bundle deploy' or somethiing like that
