# Undefined template 'std::char_traits<unsigned char>' prevent building the app

Github issue : https://github.com/facebook/react-native/issues/50411

## Problem

When building the app, you may encounter the following error:

```
Undefined template 'std::char_traits<unsigned char>'
```

## Solution

Downgrade Xcode to 16.2 because we can't upgrade react native to
0.76.9 because of viro react peer dependency.

How to downgrade Xcode:

https://stackoverflow.com/questions/14756026/how-to-downgrade-xcode-to-previous-version
