# ember-metrics-chameleon-adapter

This addon provides a simple adapter for [ember-metrics](https://github.com/poteto/ember-metrics/)
that wraps the [chameleon](https://www.trychameleon.com/) onboarding library.

The chameleon library is not **exactly** a metrics platform, but the functionality it does
track user activity to decide when to help the user, and implement it as adapter for ember-metrics
ended up being quite nice.

### Features

- **Lazy intialization**: The chameleon library is big enough to not want to load it for
every user. With `ember-metrics` lazy initialization, you can load it only when you have to.

- **Fastboot aware**: The library simply won't load if your app is running in fastboot.

### Usage:

Configure it in the `config/environment.js` as any other adapter for ember-metrics:

```js
    metricsAdapters: { // or `lazyMetricsAdapters`
      chameleon: {
        name: 'chameleon',
        environments: ['all'], // No need of avoid development/test. Methods are noops.
        config: {
          token: 'your-token-here'
        }
      }
    }
```