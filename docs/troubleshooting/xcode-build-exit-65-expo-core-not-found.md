## Problem

After downgrading react native ver & expo, when building your app in Xcode, you may encounter the following error:
https://github.com/expo/expo/issues/15696 with xcode build exiting with code 65.

## Solution

Add in ios build in the `Podfile` file, the following line in the `post_install` block:

```ruby
# Fix building failures on ARM processors
    installer.pods_project.targets.each do |target|
      target.build_configurations.each do |config|
        config.build_settings['EXCLUDED_ARCHS[sdk=iphonesimulator*]'] = 'arm64'
      end
    end
```
