[![Warframe-Nexus](/banner.png)](https://github.com/nexus-devs)

## 

[![Discord](https://img.shields.io/discord/195582152849620992.svg)](https://discord.gg/AG8RPZ8) [![GitHub release](https://img.shields.io/github/release/nexus-devs/nexus-stats.svg)]()

Nexus-Stats is an online service which provides insights on game economics and other ingame data with the use of cutting edge technology. This repo contains application logic for our servers, including all the statistics calculations. For data-tracking via OCR, please see [nexus-sentry](https://github.com/nexus-devs/nexus-sentry).

<br>

## API
[Provisional docs](https://drive.google.com/open?id=16rbyQAG1cgQhwfFfXcHqn-o8txZ5dAZBf4hzr3VeJJE)

<br>

## Build Information
**This build is part of the Nexus Rework and still misses some features.**
Old development builds can be found in the commit history starting at #271
<br>
<br>
<br>

## What's working so far?
- [x] **API-Node:** HTTP/Socket.io Web-API which automatically exposes Resource-Node methods. Also handles authorization.
- [x] **Core-Node:** Resource-Node with all application Logic. Statistics are calculated here.
- [ ] **Web-Node:** View Layer for End-User.
<br>

## Quickstart
>`npm install && npm start`
=> then go to `localhost:3010/foo` to get your `bar`
<br>

## Testing
>`node testserver.js && npm test`

<br>

## Requirements
- Redis
- Mongodb
<br>

**Note:** You can change default ports and more via the standard [blitz.js](https://github.com/nexus-devs/blitz.js) config.

<br>

## License
[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
