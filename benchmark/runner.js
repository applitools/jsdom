#!/usr/bin/env node
"use strict";
/* eslint-disable no-console */

const consoleReporter = require("./console-reporter");
const pathToSuites = require("./path-to-suites");
const benchmarks = require(".");

let suitesToRun;

suitesToRun = pathToSuites(benchmarks);


suitesToRun.forEach(consoleReporter);

function runNext() {
  /* eslint-disable no-invalid-this */
  if (this && this.off) {
    // there is no .once()
    this.off("complete", runNext);
  }
  /* eslint-enable no-invalid-this */

  const suite = suitesToRun.shift();
  if (!suite) {
    console.log("Done!");
    return;
  }

  suite.off("complete", runNext);
  suite.on("complete", runNext);
  suite.run({ async: true });
}

runNext();
