![GitHub issues](https://img.shields.io/github/issues/strandgeek/scannerbot) ![GitHub last commit](https://img.shields.io/github/last-commit/strandgeek/scannerbot) [![npm version](https://badge.fury.io/js/@scannerbot%2Fcli.svg)](https://badge.fury.io/js/@scannerbot%2Fcli)

# ScannerBot

ScannerBot is a Smart Contract code scanner designed specifically for Solidity on TRON VM. It uses Static Analysis techniques and generates insightful AI-driven feedbacks based on the scan results.

![Logo + Slogan](https://github.com/strandgeek/scannerbot/assets/101031495/af3798d5-5431-4cd6-bd0a-48c3630ff331)

## Quick Links
- [📹 Video Presentation](https://www.youtube.com/watch?v=89Oi5iuyO9Q)
- [📕 Pitch Deck](https://github.com/strandgeek/scannerbot/files/12811891/ScannerBot.Presentation.PDF.pdf)
- [⚡️ Live Demo](https://scannerbot.xyz/)


## Technical Flow
![5](https://github.com/strandgeek/scannerbot/assets/101031495/093f143b-ea3d-4a5b-9e5c-deed990ea695)
![8](https://github.com/strandgeek/scannerbot/assets/101031495/8c69fd56-3e60-4fe5-998d-ac7de08dd3c4)
![9](https://github.com/strandgeek/scannerbot/assets/101031495/c7a0a90e-730a-4fa5-858b-e9beb365ad54)

## Quick Start - Deploying a Hosted Community Edition (CE)

#### Requirements

- Docker
- Docker-Compose

#### 1 - Clone this repository:

```
git clone git@github.com:strandgeek/scannerbot.git
```

#### 2 - Update the following needed variables on `docker-compose.yaml`:

- JWT_SECRET
- OPENAI_API_KEY 




#### 3 - Run the docker-compose

```
docker-compose up

Creating scannerbot-db     ... done
Creating scannerbot-webapp ... done
Creating scannerbot-api    ... done
Creating scannerbot-nginx  ... done
Attaching to scannerbot-webapp, scannerbot-db, scannerbot-api, scannerbot-nginx
```

The ScannerBot should be running at http://localhost
