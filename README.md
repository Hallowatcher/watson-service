# watson-service

## Synopsis

A **Windows** service that gathers .WER files and sends them to the Watson API

## Motivation

- Windows Service written entirely in JavaScript with TypeScript layer
- Unit testing in NodeJS

## Installation

First, install the package globally
`npm install hallowatcher/watson-service -g`

Then, install the windows service
`watson-service --install`

The service will now run every time you start up your pc or if you start the service manually

If you change your mind, uninstall
`watson-service --uninstall`

## Tests

To run tests, run
`npm test`