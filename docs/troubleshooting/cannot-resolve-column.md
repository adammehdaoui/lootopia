# Cannot resolve column name in id

If you are getting an error like this:

```
Cannot resolve column 'hunt_id'
```

With this code:

```java
@Table(uniqueConstraints = {
@UniqueConstraint(name = "uc_hunt_like", columnNames = {"hunt_id", "member_id"})
})
```

I resolved the problem by adding a table name to the `@Table` annotation:

```java
@Table(name = "hunt_like", uniqueConstraints = {
        @UniqueConstraint(name = "uc_hunt_like", columnNames = {"hunt_id", "member_id"})
})
```

With that, JPA will be able to resolve the column name correctly.
