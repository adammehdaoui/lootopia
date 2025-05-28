# Invalid Source Release 21 Error in IntelliJ

When didn't launch the IntelliJ app since a long time, you may encounter the following error:

```sh
java: invalid source release 21 with --enable-preview
(preview language features are only supported for release 23)
```

This error occurs because sometimes IntelliJ change the SDK version to the last one available on your machine, which may not be compatible with the project settings.

To fix this issue, you need to change the project SDK version to Java 21 (in our case Microsoft Java v.21) in project structures settings.
