# AngularJS Redux Client

[![GitHub last commit](https://img.shields.io/github/last-commit/MichaelKaaden/redux-client-ng.svg)](https://github.com/MichaelKaaden/redux-client-ng/commits/master)
[![GitHub tag](https://img.shields.io/github/tag/MichaelKaaden/redux-client-ng.svg)](https://github.com/MichaelKaaden/redux-client-ng/releases)
[![GitHub version](https://img.shields.io/github/package-json/v/MichaelKaaden/redux-client-ng.svg)](https://github.com/MichaelKaaden/redux-client-ng/blob/master/package.json)
[![dependencies](https://img.shields.io/david/MichaelKaaden/redux-client-ng.svg)](https://david-dm.org/MichaelKaaden/redux-client-ng)
[![devDependencies](https://img.shields.io/david/dev/MichaelKaaden/redux-client-ng.svg)](https://david-dm.org/MichaelKaaden/redux-client-ng?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/MichaelKaaden/redux-client-ng.svg)](https://github.com/MichaelKaaden/redux-client-ng/issues)
[![license](https://img.shields.io/github/license/MichaelKaaden/redux-client-ng.svg)](https://github.com/MichaelKaaden/redux-client-ng)

This is a single-page applicaton written in TypeScript
using AngularJS. It retrieves counters from a REST service
and displays them. You can increase and decrease each counter's
value. A second page displays a little dashboard that does
some analytics on your counters and their values.

For an app with a prettier UI, have a look at the
[implementation](https://github.com/MichaelKaaden/redux-client-ng5)
using Angular instead.

![Screenshot of the app running in the Browser](images/screenshot1.png)

## Purpose

I wanted to learn more about the Redux architectural pattern
to solve common problems like the same data being used in
multiple components. Changes in one component would not update
the other component's data, so one would either have to deal
with this chaos or notify the other components about change
with e. g. events. This is complicated, error-prone and very
ugly. Redux perfectly solves this problem. So I wrote this
app together with the server side which you can find
[here](https://github.com/MichaelKaaden/redux-server).

The app utilizes
[ng-redux](https://github.com/angular-redux/ng-redux).
For asynchronous action like loading and saving counters
from and to the REST service, it uses
[redux-thunk](https://github.com/gaearon/redux-thunk).

## Reselect Demo Mode

This app uses the reselect package for memoizing selectors. Set
`configuration.isReselectDemoMode` to `true` to demonstrate the
effect. You will see that triggering errors won't recalculate
the counters.

Press the button to trigger some (false) errors and watch the
`CounterContainer.mapStateToTarget() has been called` count. It
is increasing with every error being generated. The
`The state has been recalculated` count will stay the same, though,
which demonstrates the memoizing effect.

## Development server

Run `yarn dev` to run the app in development mode
or `yarn prod` for production mode.
